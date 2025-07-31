import { Request, Response } from "express";
import { bmcDiscoveryClient } from "../utils/bmcDiscovery";
import { 
  BMC_CATEGORIES, 
  CATEGORY_TABLE_COLUMNS, 
  STANDARD_COLUMNS,
  countCategories 
} from "../utils/bmcCategoryColumns";
import database from "../config/database";
import { logger } from "../utils/logger";

// Helper function to sanitize table names and handle reserved keywords
function sanitizeTableName(nodeName: string): string {
    let tableName = nodeName.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    
    // Handle PostgreSQL reserved keywords by adding prefix
    const reservedKeywords = ['group', 'user', 'order', 'table', 'index', 'view', 'key', 'value', 'type', 'data'];
    if (reservedKeywords.includes(tableName)) {
        tableName = `bmc_${tableName}`;
    }
    
    return tableName;
}

// 1. Adım: Node türlerine göre tablolar oluştur
export const createNodeTypeTables = async (_req: Request, res: Response): Promise<any> => {
  const startTime = Date.now();
  
  try {
    logger.info("Creating node type tables");

    // BMC'den tüm node türlerini ve kategorilerini çek
    const nodeTypes = await bmcDiscoveryClient.getNodesWithCategories();
    
    if (!nodeTypes || nodeTypes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No node types found from BMC Discovery"
      });
    }

    const tablesCreated: string[] = [];
    const tableErrors: string[] = [];

    // Her node türü için ayrı tablo oluştur
    for (const nodeType of nodeTypes) {
      try {
        const tableName = sanitizeTableName(nodeType.name);
        
        // Kategori özel sütunları al
        const categoryColumns = (CATEGORY_TABLE_COLUMNS as any)[nodeType.category] || [];
        
        // Prevent duplicate column names
        const standardColumnNames = STANDARD_COLUMNS.map(col => col.name);
        const uniqueCategoryColumns = categoryColumns.filter((col: any) => 
          !standardColumnNames.includes(col.name)
        );
        
        const allColumns = [...STANDARD_COLUMNS, ...uniqueCategoryColumns];
        
        await database.createNodeTable(tableName, allColumns);
        tablesCreated.push(tableName);
        
        logger.info(`Table created for node type: ${nodeType.name}`, { 
          tableName, 
          category: nodeType.category 
        });
      } catch (error) {
        logger.error(`Failed to create table for node type: ${nodeType.name}`, { error });
        tableErrors.push(nodeType.name);
      }
    }

    const processingTime = Date.now() - startTime;

    logger.info("Node type tables creation completed", {
      totalNodeTypes: nodeTypes.length,
      tablesCreated: tablesCreated.length,
      tableErrors: tableErrors.length,
      processingTime
    });

    res.status(200).json({
      success: true,
      message: `Successfully created ${tablesCreated.length} tables for node types`,
      data: {
        totalNodeTypes: nodeTypes.length,
        tablesCreated,
        tableErrors,
        processingTime
      }
    });

  } catch (error) {
    logger.error("Node type tables creation failed", { error });
    res.status(500).json({
      success: false,
      message: "Failed to create node type tables",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// 2. Adım: Tüm node verilerini senkronize et (3 aşamalı süreç)
export const syncAllNodeData = async (_req: Request, res: Response): Promise<any> => {
  const startTime = Date.now();

  try {
    logger.info("Starting comprehensive node data synchronization");

    // AŞAMA 1: Tüm node türlerini ve kategorilerini çek
    logger.info("Phase 1: Fetching all node types and categories");
    const nodeTypes = await bmcDiscoveryClient.getNodesWithCategories();
    
    if (!nodeTypes || nodeTypes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No node types found from BMC Discovery"
      });
    }

    const syncResults: { 
      [nodeType: string]: { 
        nodeIds: number; 
        nodeDetails: number; 
        synced: number; 
        errors: number;
        category: string;
      } 
    } = {};

    // Her node türü için senkronizasyon yap
    for (const nodeType of nodeTypes) {
      try {
        logger.info(`Processing node type: ${nodeType.name} (Category: ${nodeType.category})`);
        
        const tableName = sanitizeTableName(nodeType.name);
        
        // AŞAMA 2: Bu node türündeki tüm node ID'leri çek
        logger.info(`Phase 2: Fetching node IDs for ${nodeType.name}`);
        const nodeIds = await bmcDiscoveryClient.getNodeIds(nodeType.name);
        
        let detailsFetched = 0;
        let syncedCount = 0;
        let errorCount = 0;

        // AŞAMA 3: Her node ID için detaylı bilgiyi çek ve veritabanına yaz
        logger.info(`Phase 3: Fetching details for ${nodeIds.length} nodes of type ${nodeType.name}`);
        
        for (const nodeId of nodeIds) {
          try {
            // Node detaylarını çek
            const nodeDetails = await bmcDiscoveryClient.getNode(nodeId);
            detailsFetched++;
            
            if (nodeDetails) {
              // Veritabanı formatına dönüştür
              const nodeData = {
                name: nodeDetails.name || nodeId,
                display_name: nodeDetails.display_name || nodeDetails.name || nodeId,
                kind: nodeType.name,
                category: nodeType.category,
                section: nodeType.section || 'default',
                ui_quick_selection: nodeType.ui_quick_selection || false,
                category_priority: nodeType.category_priority || 0,
                // Node'dan gelen detaylı veriler
                ...extractNodeDataByCategory(nodeDetails, nodeType.category)
              };

              // Veritabanına yaz (UPSERT)
              await database.upsertNodeData(tableName, nodeId, nodeData);
              syncedCount++;
              
              if (syncedCount % 10 === 0) {
                logger.info(`Progress: ${syncedCount}/${nodeIds.length} nodes synced for ${nodeType.name}`);
              }
            }
            
          } catch (nodeError) {
            logger.error(`Failed to process node: ${nodeId}`, { 
              error: nodeError, 
              nodeType: nodeType.name 
            });
            errorCount++;
          }
        }

        syncResults[nodeType.name] = { 
          nodeIds: nodeIds.length,
          nodeDetails: detailsFetched,
          synced: syncedCount, 
          errors: errorCount,
          category: nodeType.category
        };
        
        logger.info(`Node type completed: ${nodeType.name}`, { 
          nodeIds: nodeIds.length,
          detailsFetched,
          syncedCount, 
          errorCount
        });

      } catch (error) {
        logger.error(`Failed to process node type: ${nodeType.name}`, { error });
        syncResults[nodeType.name] = { 
          nodeIds: 0,
          nodeDetails: 0,
          synced: 0, 
          errors: 1,
          category: nodeType.category
        };
      }
    }

    const processingTime = Date.now() - startTime;
    const totalNodeIds = Object.values(syncResults).reduce((sum, result) => sum + result.nodeIds, 0);
    const totalDetails = Object.values(syncResults).reduce((sum, result) => sum + result.nodeDetails, 0);
    const totalSynced = Object.values(syncResults).reduce((sum, result) => sum + result.synced, 0);
    const totalErrors = Object.values(syncResults).reduce((sum, result) => sum + result.errors, 0);

    logger.info("Comprehensive node data synchronization completed", { 
      totalNodeTypes: Object.keys(syncResults).length,
      totalNodeIds,
      totalDetails,
      totalSynced, 
      totalErrors, 
      processingTime 
    });

    res.status(200).json({
      success: true,
      message: `Successfully synced ${totalSynced} nodes across ${Object.keys(syncResults).length} node types`,
      data: {
        totalNodeTypes: Object.keys(syncResults).length,
        totalNodeIds,
        totalDetailsFetched: totalDetails,
        totalSynced,
        totalErrors,
        processingTime,
        nodeTypeResults: syncResults
      }
    });

  } catch (error) {
    logger.error("Comprehensive node data synchronization failed", { error });
    res.status(500).json({
      success: false,
      message: "Failed to synchronize node data",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Node detaylarını kategoriye göre işle
function extractNodeDataByCategory(nodeDetails: any, category: string): Record<string, any> {
  const data: Record<string, any> = {};
  
  // Kategori bazlı özel alanları map et
  switch (category) {
    case 'Hosts & Host Containers':
      // BMC Discovery API data is in nodeDetails.state object
      const state = nodeDetails.state || {};
      data.hostname = state.hostname || state.name || nodeDetails.name;
      data.ip_address = state.__all_ip_addrs?.[0] || nodeDetails.ip_address || nodeDetails.primaryIpAddress;
      data.operating_system = state.os || nodeDetails.operatingSystem || nodeDetails.operating_system;
      data.os_version = state.os_version || nodeDetails.osVersion || nodeDetails.os_version;
      data.cpu_count = state.num_logical_processors || state.num_cores || nodeDetails.cpuCount || nodeDetails.processors;
      data.memory_gb = Math.round((state.logical_ram || state.ram || 0) / 1024) || Math.round((nodeDetails.memoryMB || 0) / 1024);
      data.disk_space_gb = nodeDetails.diskSpaceGB || nodeDetails.disk_space_gb;
      data.architecture = state.os_arch || nodeDetails.architecture;
      data.domain = state.domain || state.dns_domain || nodeDetails.domain;
      data.last_boot_time = state.boot_time || nodeDetails.lastBootTime || nodeDetails.last_boot_time;
      data.host_type = state.host_type || state.type || nodeDetails.hostType || nodeDetails.kind;
      break;

    case 'Network & Printers':
      data.device_name = nodeDetails.deviceName || nodeDetails.device_name || nodeDetails.name;
      data.ip_address = nodeDetails.ipAddress || nodeDetails.ip_address || nodeDetails.primaryIpAddress;
      data.mac_address = nodeDetails.macAddress || nodeDetails.mac_address;
      data.device_type = nodeDetails.deviceType || nodeDetails.device_type || nodeDetails.kind;
      data.manufacturer = nodeDetails.manufacturer || nodeDetails.vendor;
      data.model = nodeDetails.model;
      data.firmware_version = nodeDetails.firmwareVersion || nodeDetails.firmware_version;
      data.port_count = nodeDetails.portCount || nodeDetails.port_count;
      data.vlan_id = nodeDetails.vlanId || nodeDetails.vlan_id;
      data.subnet = nodeDetails.subnet;
      data.snmp_community = nodeDetails.snmpCommunity || nodeDetails.snmp_community;
      break;

    case 'Storage':
      data.storage_name = nodeDetails.storageName || nodeDetails.storage_name || nodeDetails.name;
      data.storage_type = nodeDetails.storageType || nodeDetails.storage_type || nodeDetails.kind;
      data.capacity_gb = nodeDetails.capacityGB || Math.round((nodeDetails.capacityMB || 0) / 1024) || nodeDetails.capacity_gb;
      data.used_space_gb = nodeDetails.usedSpaceGB || nodeDetails.used_space_gb;
      data.free_space_gb = nodeDetails.freeSpaceGB || nodeDetails.free_space_gb;
      data.raid_level = nodeDetails.raidLevel || nodeDetails.raid_level;
      data.filesystem = nodeDetails.filesystem;
      data.mount_point = nodeDetails.mountPoint || nodeDetails.mount_point;
      data.vendor = nodeDetails.vendor;
      data.serial_number = nodeDetails.serialNumber || nodeDetails.serial_number;
      data.connection_type = nodeDetails.connectionType || nodeDetails.connection_type;
      break;

    case 'Software & Databases':
      data.software_name = nodeDetails.softwareName || nodeDetails.software_name || nodeDetails.name;
      data.version = nodeDetails.version;
      data.vendor = nodeDetails.vendor;
      data.install_path = nodeDetails.installPath || nodeDetails.install_path;
      data.install_date = nodeDetails.installDate || nodeDetails.install_date;
      data.license_type = nodeDetails.licenseType || nodeDetails.license_type;
      data.database_type = nodeDetails.databaseType || nodeDetails.database_type;
      data.database_size_mb = nodeDetails.databaseSizeMB || nodeDetails.database_size_mb;
      data.port_number = nodeDetails.portNumber || nodeDetails.port_number || nodeDetails.port;
      data.service_name = nodeDetails.serviceName || nodeDetails.service_name;
      data.is_clustered = nodeDetails.isClustered || nodeDetails.is_clustered || false;
      break;

    case 'Services & Applications':
      data.service_name = nodeDetails.serviceName || nodeDetails.service_name || nodeDetails.name;
      data.application_name = nodeDetails.applicationName || nodeDetails.application_name;
      data.service_type = nodeDetails.serviceType || nodeDetails.service_type || nodeDetails.kind;
      data.port = nodeDetails.port || nodeDetails.portNumber;
      data.protocol = nodeDetails.protocol;
      data.status = nodeDetails.status;
      data.start_mode = nodeDetails.startMode || nodeDetails.start_mode;
      data.pid = nodeDetails.processId || nodeDetails.pid;
      data.cpu_usage = nodeDetails.cpuUsage || nodeDetails.cpu_usage;
      data.memory_usage_mb = nodeDetails.memoryUsageMB || nodeDetails.memory_usage_mb;
      data.business_criticality = nodeDetails.businessCriticality || nodeDetails.business_criticality;
      break;

    case 'Cloud & Container Orchestration':
      data.container_id = nodeDetails.containerId || nodeDetails.container_id;
      data.image_name = nodeDetails.imageName || nodeDetails.image_name;
      data.namespace = nodeDetails.namespace;
      data.deployment_name = nodeDetails.deploymentName || nodeDetails.deployment_name;
      data.cloud_provider = nodeDetails.cloudProvider || nodeDetails.cloud_provider;
      data.cloud_region = nodeDetails.cloudRegion || nodeDetails.cloud_region;
      data.orchestrator = nodeDetails.orchestrator;
      data.status = nodeDetails.status;
      data.cpu_limit = nodeDetails.cpuLimit || nodeDetails.cpu_limit;
      data.memory_limit = nodeDetails.memoryLimit || nodeDetails.memory_limit;
      break;

    default:
      // For other categories, only map known safe fields to prevent schema mismatches
      // This prevents 42703 errors from undefined columns
      if (nodeDetails.status !== undefined) data.status = nodeDetails.status;
      if (nodeDetails.version !== undefined) data.version = nodeDetails.version;
      if (nodeDetails.vendor !== undefined) data.vendor = nodeDetails.vendor;
      if (nodeDetails.description !== undefined) data.description = nodeDetails.description;
      break;
  }
  
  return data;
}

// Discovery istatistiklerini getir
export const getDiscoveryStats = async (_req: Request, res: Response): Promise<any> => {
  try {
    logger.info("Fetching discovery statistics");

    // BMC'den node türlerini çek
    const nodeTypes = await bmcDiscoveryClient.getNodesWithCategories();
    const categoryCounts = countCategories(nodeTypes);

    // BMC bağlantı durumunu kontrol et
    const isConnected = await bmcDiscoveryClient.healthCheck();

    res.status(200).json({
      success: true,
      data: {
        bmcConnectionStatus: isConnected ? 'connected' : 'disconnected',
        totalCategories: Object.keys(categoryCounts).length,
        totalNodeTypes: nodeTypes.length,
        categoryCounts,
        availableCategories: Object.values(BMC_CATEGORIES)
      }
    });

  } catch (error) {
    logger.error("Failed to get discovery stats", { error });
    res.status(500).json({
      success: false,
      message: "Failed to get discovery statistics",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

