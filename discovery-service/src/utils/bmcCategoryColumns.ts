// BMC Discovery kategorileri ve her kategori için tablo sütunları

export const BMC_CATEGORIES = {
  CLOUD_CONTAINER: "Cloud & Container Orchestration",
  MISCELLANEOUS: "Miscellaneous",
  NETWORK_PRINTERS: "Network & Printers",
  DIRECTLY_DISCOVERED: "Directly Discovered Data",
  HOSTS_CONTAINERS: "Hosts & Host Containers",
  STORAGE: "Storage",
  SOFTWARE_DATABASES: "Software & Databases",
  SERVICES_APPLICATIONS: "Services & Applications",
  CONTEXT_METADATA: "Context & Metadata",
  DISCOVERY_OPERATION: "Discovery Operation",
  INTERNAL: "Internal",
  INTEGRATION: "Integration",
  BMC_HELIX_OPS: "BMC Helix Operations Management",
  BMC_HELIX_OPTIMIZATION: "BMC Helix Continuous Optimization",
} as const;

export type BMCCategory = (typeof BMC_CATEGORIES)[keyof typeof BMC_CATEGORIES];

// Her kategori için tablo sütun konfigürasyonları
export const CATEGORY_TABLE_COLUMNS = {
  [BMC_CATEGORIES.CLOUD_CONTAINER]: [
    { name: "container_id", type: "VARCHAR(255)" },
    { name: "image_name", type: "VARCHAR(255)" },
    { name: "namespace", type: "VARCHAR(255)" },
    { name: "deployment_name", type: "VARCHAR(255)" },
    { name: "cloud_provider", type: "VARCHAR(255)" },
    { name: "cloud_region", type: "VARCHAR(255)" },
    { name: "orchestrator", type: "VARCHAR(100)" },
    { name: "status", type: "VARCHAR(50)" },
    { name: "cpu_limit", type: "VARCHAR(50)" },
    { name: "memory_limit", type: "VARCHAR(50)" },
  ],

  [BMC_CATEGORIES.HOSTS_CONTAINERS]: [
    { name: "hostname", type: "VARCHAR(255)" },
    { name: "ip_address", type: "INET" },
    { name: "operating_system", type: "VARCHAR(255)" },
    { name: "os_version", type: "VARCHAR(100)" },
    { name: "cpu_count", type: "INTEGER" },
    { name: "memory_gb", type: "INTEGER" },
    { name: "disk_space_gb", type: "INTEGER" },
    { name: "architecture", type: "VARCHAR(50)" },
    { name: "domain", type: "VARCHAR(255)" },
    { name: "last_boot_time", type: "TIMESTAMP" },
    { name: "host_type", type: "VARCHAR(50)" },
  ],

  [BMC_CATEGORIES.NETWORK_PRINTERS]: [
    { name: "device_name", type: "VARCHAR(255)" },
    { name: "ip_address", type: "INET" },
    { name: "mac_address", type: "VARCHAR(17)" },
    { name: "device_type", type: "VARCHAR(100)" },
    { name: "manufacturer", type: "VARCHAR(100)" },
    { name: "model", type: "VARCHAR(100)" },
    { name: "firmware_version", type: "VARCHAR(100)" },
    { name: "port_count", type: "INTEGER" },
    { name: "vlan_id", type: "INTEGER" },
    { name: "subnet", type: "VARCHAR(18)" },
    { name: "snmp_community", type: "VARCHAR(100)" },
  ],

  [BMC_CATEGORIES.STORAGE]: [
    { name: "storage_name", type: "VARCHAR(255)" },
    { name: "storage_type", type: "VARCHAR(100)" },
    { name: "capacity_gb", type: "BIGINT" },
    { name: "used_space_gb", type: "BIGINT" },
    { name: "free_space_gb", type: "BIGINT" },
    { name: "raid_level", type: "VARCHAR(20)" },
    { name: "filesystem", type: "VARCHAR(50)" },
    { name: "mount_point", type: "VARCHAR(255)" },
    { name: "vendor", type: "VARCHAR(100)" },
    { name: "serial_number", type: "VARCHAR(100)" },
    { name: "connection_type", type: "VARCHAR(50)" },
  ],

  [BMC_CATEGORIES.SOFTWARE_DATABASES]: [
    { name: "software_name", type: "VARCHAR(255)" },
    { name: "version", type: "VARCHAR(100)" },
    { name: "vendor", type: "VARCHAR(100)" },
    { name: "install_path", type: "VARCHAR(500)" },
    { name: "install_date", type: "TIMESTAMP" },
    { name: "license_type", type: "VARCHAR(100)" },
    { name: "database_type", type: "VARCHAR(50)" },
    { name: "database_size_mb", type: "BIGINT" },
    { name: "port_number", type: "INTEGER" },
    { name: "service_name", type: "VARCHAR(100)" },
    { name: "is_clustered", type: "BOOLEAN" },
  ],

  [BMC_CATEGORIES.SERVICES_APPLICATIONS]: [
    { name: "service_name", type: "VARCHAR(255)" },
    { name: "application_name", type: "VARCHAR(255)" },
    { name: "service_type", type: "VARCHAR(100)" },
    { name: "port", type: "INTEGER" },
    { name: "protocol", type: "VARCHAR(20)" },
    { name: "status", type: "VARCHAR(50)" },
    { name: "start_mode", type: "VARCHAR(50)" },
    { name: "pid", type: "INTEGER" },
    { name: "cpu_usage", type: "DECIMAL(5,2)" },
    { name: "memory_usage_mb", type: "INTEGER" },
    { name: "business_criticality", type: "VARCHAR(20)" },
  ],

  [BMC_CATEGORIES.MISCELLANEOUS]: [
    { name: "element_name", type: "VARCHAR(255)" },
    { name: "element_type", type: "VARCHAR(100)" },
    { name: "description", type: "TEXT" },
    { name: "properties", type: "JSONB" },
    { name: "tags", type: "VARCHAR(500)" },
    { name: "metadata", type: "JSONB" },
  ],

  [BMC_CATEGORIES.CONTEXT_METADATA]: [
    { name: "context_name", type: "VARCHAR(255)" },
    { name: "context_type", type: "VARCHAR(100)" },
    { name: "location", type: "VARCHAR(255)" },
    { name: "organization_unit", type: "VARCHAR(255)" },
    { name: "owner", type: "VARCHAR(100)" },
    { name: "environment", type: "VARCHAR(50)" },
    { name: "lifecycle_status", type: "VARCHAR(50)" },
    { name: "priority", type: "INTEGER" },
  ],

  [BMC_CATEGORIES.DIRECTLY_DISCOVERED]: [
    { name: "discovery_source", type: "VARCHAR(100)" },
    { name: "discovery_method", type: "VARCHAR(100)" },
    { name: "raw_data", type: "JSONB" },
    { name: "discovered_at", type: "TIMESTAMP" },
    { name: "confidence_level", type: "DECIMAL(3,2)" },
    { name: "data_quality", type: "VARCHAR(20)" },
  ],
};

// Standart sütunlar - her tabloda olacak
export const STANDARD_COLUMNS = [
  { name: "id", type: "SERIAL PRIMARY KEY" },
  { name: "node_id", type: "VARCHAR(255) UNIQUE NOT NULL" },
  { name: "name", type: "VARCHAR(255)" },
  { name: "display_name", type: "VARCHAR(255)" },
  { name: "kind", type: "VARCHAR(100)" },
  { name: "category", type: "VARCHAR(100)" },
  { name: "section", type: "VARCHAR(50)" },
  { name: "ui_quick_selection", type: "BOOLEAN DEFAULT false" },
  { name: "category_priority", type: "INTEGER DEFAULT 0" },
  { name: "created_at", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" },
  { name: "updated_at", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" },
];

// Kategori adından tablo adı oluştur
export function getCategoryTableName(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

// Node kategorilerini say
export function countCategories(nodesData: any[]): { [category: string]: number } {
  const categoryCounts: { [category: string]: number } = {};
  
  for (const node of nodesData) {
    const category = node.category || 'Unknown';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  }
  
  return categoryCounts;
}
