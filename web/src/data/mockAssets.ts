export interface Asset {
  id: string;
  name: string;
  type: 'server' | 'workstation' | 'network' | 'software' | 'storage' | 'mobile' | 'printer';
  category: string;
  status: 'active' | 'inactive' | 'maintenance' | 'decommissioned' | 'pending';
  location: string;
  department: string;
  owner: string;
  discoveredDate: string;
  lastSeen: string;
  ipAddress?: string;
  macAddress?: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  operatingSystem?: string;
  version?: string;
  cost: {
    initial: number;
    monthly: number;
    maintenance: number;
    total: number;
  };
  license?: {
    type: 'perpetual' | 'subscription' | 'concurrent' | 'named_user';
    count: number;
    used: number;
    expirationDate?: string;
    cost: number;
    vendor: string;
  };
  specifications?: {
    cpu?: string;
    memory?: string;
    storage?: string;
    network?: string;
  };
  riskScore: number;
  compliance: 'compliant' | 'non_compliant' | 'needs_review';
}

export interface AssetHistory {
  assetId: string;
  date: string;
  event: 'discovered' | 'status_change' | 'configuration_change' | 'license_update' | 'cost_update';
  previousValue?: string;
  newValue: string;
  details: string;
}

export interface CostTrend {
  month: string;
  totalCost: number;
  licenseCost: number;
  maintenanceCost: number;
  newAssets: number;
  decommissioned: number;
}

export const mockAssets: Asset[] = [
  {
    id: 'SRV-001',
    name: 'prod-web-01.company.com',
    type: 'server',
    category: 'Physical Server',
    status: 'active',
    location: 'Data Center A - Rack 12',
    department: 'IT Infrastructure',
    owner: 'John Smith',
    discoveredDate: '2023-01-15',
    lastSeen: '2024-01-15',
    ipAddress: '192.168.1.100',
    macAddress: '00:1B:44:11:3A:B7',
    serialNumber: 'DL360-2023-001',
    manufacturer: 'HPE',
    model: 'ProLiant DL360 Gen10',
    operatingSystem: 'Red Hat Enterprise Linux',
    version: '8.5',
    cost: {
      initial: 8500,
      monthly: 450,
      maintenance: 1200,
      total: 15900
    },
    specifications: {
      cpu: 'Intel Xeon Gold 6226R (2.9GHz, 16-core)',
      memory: '64GB DDR4',
      storage: '2x 480GB SSD + 4x 2TB HDD',
      network: '4x 1GbE + 2x 10GbE'
    },
    riskScore: 25,
    compliance: 'compliant'
  },
  {
    id: 'WS-001',
    name: 'DEV-LAPTOP-ALICE',
    type: 'workstation',
    category: 'Laptop',
    status: 'active',
    location: 'Office Building A - Floor 3',
    department: 'Software Development',
    owner: 'Alice Johnson',
    discoveredDate: '2023-08-10',
    lastSeen: '2024-01-14',
    ipAddress: '192.168.1.45',
    macAddress: '00:1B:44:11:3A:C8',
    serialNumber: 'LT-2023-045',
    manufacturer: 'Dell',
    model: 'Latitude 7420',
    operatingSystem: 'Windows 11 Pro',
    version: '22H2',
    cost: {
      initial: 1800,
      monthly: 0,
      maintenance: 180,
      total: 1980
    },
    specifications: {
      cpu: 'Intel Core i7-1185G7',
      memory: '32GB DDR4',
      storage: '1TB NVMe SSD'
    },
    riskScore: 15,
    compliance: 'compliant'
  },
  {
    id: 'SW-001',
    name: 'Microsoft Office 365 E5',
    type: 'software',
    category: 'Productivity Suite',
    status: 'active',
    location: 'Cloud',
    department: 'IT',
    owner: 'IT Admin',
    discoveredDate: '2022-06-01',
    lastSeen: '2024-01-15',
    serialNumber: 'O365-E5-2022',
    manufacturer: 'Microsoft',
    model: 'Office 365 E5',
    version: '2024.1',
    cost: {
      initial: 0,
      monthly: 22,
      maintenance: 0,
      total: 264
    },
    license: {
      type: 'subscription',
      count: 150,
      used: 142,
      expirationDate: '2024-06-01',
      cost: 3300,
      vendor: 'Microsoft'
    },
    riskScore: 10,
    compliance: 'compliant'
  },
  {
    id: 'NET-001',
    name: 'Core Switch - Building A',
    type: 'network',
    category: 'Network Switch',
    status: 'active',
    location: 'Network Closet A1',
    department: 'Network Operations',
    owner: 'Network Team',
    discoveredDate: '2022-03-20',
    lastSeen: '2024-01-15',
    ipAddress: '192.168.1.1',
    macAddress: '00:1B:44:11:3A:01',
    serialNumber: 'CS-2022-001',
    manufacturer: 'Cisco',
    model: 'Catalyst 9300-48P',
    cost: {
      initial: 12000,
      monthly: 200,
      maintenance: 1500,
      total: 15900
    },
    specifications: {
      network: '48x 1GbE + 4x 10GbE Uplinks'
    },
    riskScore: 30,
    compliance: 'compliant'
  },
  {
    id: 'STG-001',
    name: 'Primary Storage Array',
    type: 'storage',
    category: 'SAN Storage',
    status: 'active',
    location: 'Data Center A - Rack 5',
    department: 'Storage Team',
    owner: 'Storage Admin',
    discoveredDate: '2021-11-15',
    lastSeen: '2024-01-15',
    ipAddress: '192.168.2.100',
    serialNumber: 'SAN-2021-001',
    manufacturer: 'NetApp',
    model: 'FAS8300',
    cost: {
      initial: 45000,
      monthly: 800,
      maintenance: 4500,
      total: 59100
    },
    specifications: {
      storage: '120TB Raw Capacity',
      network: '16Gb FC + 10GbE iSCSI'
    },
    riskScore: 45,
    compliance: 'needs_review'
  },
  {
    id: 'SW-002',
    name: 'VMware vSphere Enterprise Plus',
    type: 'software',
    category: 'Virtualization',
    status: 'active',
    location: 'Data Center A',
    department: 'Virtualization',
    owner: 'VMware Admin',
    discoveredDate: '2022-01-10',
    lastSeen: '2024-01-15',
    serialNumber: 'VM-ENT-2022',
    manufacturer: 'VMware',
    model: 'vSphere Enterprise Plus',
    version: '8.0',
    cost: {
      initial: 0,
      monthly: 0,
      maintenance: 2400,
      total: 2400
    },
    license: {
      type: 'perpetual',
      count: 32,
      used: 28,
      cost: 18000,
      vendor: 'VMware'
    },
    riskScore: 20,
    compliance: 'compliant'
  },
  {
    id: 'MOB-001',
    name: 'iPhone 14 Pro - Sales Team',
    type: 'mobile',
    category: 'Smartphone',
    status: 'active',
    location: 'Sales Department',
    department: 'Sales',
    owner: 'Bob Wilson',
    discoveredDate: '2023-09-15',
    lastSeen: '2024-01-14',
    serialNumber: 'IP14-2023-001',
    manufacturer: 'Apple',
    model: 'iPhone 14 Pro',
    operatingSystem: 'iOS',
    version: '17.2',
    cost: {
      initial: 1099,
      monthly: 85,
      maintenance: 199,
      total: 2318
    },
    riskScore: 35,
    compliance: 'compliant'
  },
  {
    id: 'PRT-001',
    name: 'Office Printer - Floor 2',
    type: 'printer',
    category: 'Multifunction Printer',
    status: 'maintenance',
    location: 'Office Building A - Floor 2',
    department: 'General Office',
    owner: 'Office Manager',
    discoveredDate: '2022-05-20',
    lastSeen: '2024-01-10',
    ipAddress: '192.168.1.200',
    macAddress: '00:1B:44:11:3A:D0',
    serialNumber: 'HP-MFP-001',
    manufacturer: 'HP',
    model: 'LaserJet Enterprise MFP M528dn',
    cost: {
      initial: 2200,
      monthly: 45,
      maintenance: 250,
      total: 2990
    },
    riskScore: 60,
    compliance: 'non_compliant'
  }
];

export const mockAssetHistory: AssetHistory[] = [
  {
    assetId: 'SRV-001',
    date: '2024-01-10',
    event: 'configuration_change',
    previousValue: '32GB DDR4',
    newValue: '64GB DDR4',
    details: 'Memory upgrade performed during maintenance window'
  },
  {
    assetId: 'WS-001',
    date: '2024-01-05',
    event: 'status_change',
    previousValue: 'maintenance',
    newValue: 'active',
    details: 'Returned to service after Windows updates'
  },
  {
    assetId: 'SW-001',
    date: '2024-01-01',
    event: 'license_update',
    previousValue: '140 licenses',
    newValue: '150 licenses',
    details: 'Added 10 additional Office 365 licenses for new hires'
  },
  {
    assetId: 'NET-001',
    date: '2023-12-20',
    event: 'cost_update',
    previousValue: '$180/month',
    newValue: '$200/month',
    details: 'Support contract renewal with increased coverage'
  },
  {
    assetId: 'STG-001',
    date: '2023-12-15',
    event: 'status_change',
    previousValue: 'active',
    newValue: 'needs_review',
    details: 'Compliance review required due to upcoming warranty expiration'
  },
  {
    assetId: 'PRT-001',
    date: '2024-01-08',
    event: 'status_change',
    previousValue: 'active',
    newValue: 'maintenance',
    details: 'Scheduled maintenance for paper jam issues'
  }
];

export const mockCostTrends: CostTrend[] = [
  {
    month: '2023-07',
    totalCost: 85000,
    licenseCost: 25000,
    maintenanceCost: 15000,
    newAssets: 5,
    decommissioned: 2
  },
  {
    month: '2023-08',
    totalCost: 88000,
    licenseCost: 26500,
    maintenanceCost: 15200,
    newAssets: 8,
    decommissioned: 1
  },
  {
    month: '2023-09',
    totalCost: 92000,
    licenseCost: 28000,
    maintenanceCost: 15500,
    newAssets: 12,
    decommissioned: 3
  },
  {
    month: '2023-10',
    totalCost: 89000,
    licenseCost: 27000,
    maintenanceCost: 15800,
    newAssets: 6,
    decommissioned: 8
  },
  {
    month: '2023-11',
    totalCost: 94000,
    licenseCost: 29500,
    maintenanceCost: 16000,
    newAssets: 15,
    decommissioned: 4
  },
  {
    month: '2023-12',
    totalCost: 96500,
    licenseCost: 30000,
    maintenanceCost: 16200,
    newAssets: 10,
    decommissioned: 6
  },
  {
    month: '2024-01',
    totalCost: 98000,
    licenseCost: 31000,
    maintenanceCost: 16500,
    newAssets: 7,
    decommissioned: 3
  }
];

// Helper functions for data analysis
export const getAssetsByType = () => {
  const typeCount = mockAssets.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(typeCount).map(([type, count]) => ({
    type,
    count,
    percentage: Math.round((count / mockAssets.length) * 100)
  }));
};

export const getAssetsByStatus = () => {
  const statusCount = mockAssets.reduce((acc, asset) => {
    acc[asset.status] = (acc[asset.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(statusCount).map(([status, count]) => ({
    status,
    count,
    percentage: Math.round((count / mockAssets.length) * 100)
  }));
};

export const getTotalCosts = () => {
  const totals = mockAssets.reduce((acc, asset) => {
    acc.initial += asset.cost.initial;
    acc.monthly += asset.cost.monthly;
    acc.maintenance += asset.cost.maintenance;
    acc.total += asset.cost.total;
    return acc;
  }, { initial: 0, monthly: 0, maintenance: 0, total: 0 });
  
  return totals;
};

export const getLicenseUtilization = () => {
  const softwareAssets = mockAssets.filter(asset => asset.license);
  return softwareAssets.map(asset => ({
    name: asset.name,
    total: asset.license!.count,
    used: asset.license!.used,
    available: asset.license!.count - asset.license!.used,
    utilization: Math.round((asset.license!.used / asset.license!.count) * 100),
    cost: asset.license!.cost,
    expirationDate: asset.license?.expirationDate
  }));
};

export const getHighRiskAssets = () => {
  return mockAssets
    .filter(asset => asset.riskScore > 40)
    .sort((a, b) => b.riskScore - a.riskScore);
};

export const getRecentActivity = () => {
  return mockAssetHistory
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
}; 