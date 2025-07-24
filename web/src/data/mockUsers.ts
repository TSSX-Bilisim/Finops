export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'admin' | 'finance_manager' | 'it_manager' | 'asset_manager' | 'analyst' | 'viewer' | 'approver';
  department: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  permissions: Permission[];
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  managerId?: string;
  location: string;
  employeeId: string;
  costCenter: string;
  salary?: {
    amount: number;
    currency: string;
    effectiveDate: string;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: 'en' | 'tr';
    notifications: {
      email: boolean;
      push: boolean;
      slack: boolean;
    };
  };
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve')[];
}

export interface UserActivity {
  userId: string;
  action: string;
  resource: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export const mockUsers: User[] = [
  {
    id: 'usr-001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '+1-555-0101',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    role: 'admin',
    department: 'IT Administration',
    status: 'active',
    permissions: [
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'assets', actions: ['create', 'read', 'update', 'delete', 'approve'] },
      { resource: 'reports', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'settings', actions: ['create', 'read', 'update', 'delete'] }
    ],
    lastLogin: '2024-01-15T09:30:00Z',
    createdAt: '2022-01-15T08:00:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
    location: 'New York, NY',
    employeeId: 'EMP-001',
    costCenter: 'IT-ADMIN',
    salary: {
      amount: 120000,
      currency: 'USD',
      effectiveDate: '2024-01-01'
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        slack: true
      }
    }
  },
  {
    id: 'usr-002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1-555-0102',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    role: 'finance_manager',
    department: 'Finance',
    status: 'active',
    permissions: [
      { resource: 'reports', actions: ['create', 'read', 'update'] },
      { resource: 'budgets', actions: ['create', 'read', 'update', 'approve'] },
      { resource: 'costs', actions: ['read', 'update', 'approve'] },
      { resource: 'assets', actions: ['read', 'approve'] }
    ],
    lastLogin: '2024-01-15T10:15:00Z',
    createdAt: '2022-03-20T08:00:00Z',
    updatedAt: '2024-01-15T10:15:00Z',
    managerId: 'usr-001',
    location: 'New York, NY',
    employeeId: 'EMP-002',
    costCenter: 'FIN-OPS',
    salary: {
      amount: 95000,
      currency: 'USD',
      effectiveDate: '2024-01-01'
    },
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: {
        email: true,
        push: false,
        slack: true
      }
    }
  },
  {
    id: 'usr-003',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@company.com',
    phone: '+1-555-0103',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'it_manager',
    department: 'IT Infrastructure',
    status: 'active',
    permissions: [
      { resource: 'assets', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'licenses', actions: ['create', 'read', 'update'] },
      { resource: 'reports', actions: ['create', 'read'] },
      { resource: 'users', actions: ['read', 'update'] }
    ],
    lastLogin: '2024-01-15T08:45:00Z',
    createdAt: '2022-02-10T08:00:00Z',
    updatedAt: '2024-01-15T08:45:00Z',
    managerId: 'usr-001',
    location: 'San Francisco, CA',
    employeeId: 'EMP-003',
    costCenter: 'IT-INFRA',
    salary: {
      amount: 110000,
      currency: 'USD',
      effectiveDate: '2024-01-01'
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        slack: false
      }
    }
  },
  {
    id: 'usr-004',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@company.com',
    phone: '+1-555-0104',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    role: 'asset_manager',
    department: 'Operations',
    status: 'active',
    permissions: [
      { resource: 'assets', actions: ['create', 'read', 'update'] },
      { resource: 'inventory', actions: ['create', 'read', 'update'] },
      { resource: 'reports', actions: ['read'] }
    ],
    lastLogin: '2024-01-14T16:20:00Z',
    createdAt: '2022-05-15T08:00:00Z',
    updatedAt: '2024-01-14T16:20:00Z',
    managerId: 'usr-003',
    location: 'Austin, TX',
    employeeId: 'EMP-004',
    costCenter: 'OPS-ASSET',
    salary: {
      amount: 75000,
      currency: 'USD',
      effectiveDate: '2024-01-01'
    },
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        slack: true
      }
    }
  },
  {
    id: 'usr-005',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@company.com',
    phone: '+1-555-0105',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'analyst',
    department: 'Finance',
    status: 'active',
    permissions: [
      { resource: 'reports', actions: ['create', 'read'] },
      { resource: 'analytics', actions: ['read'] },
      { resource: 'assets', actions: ['read'] }
    ],
    lastLogin: '2024-01-15T11:00:00Z',
    createdAt: '2023-01-10T08:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
    managerId: 'usr-002',
    location: 'Chicago, IL',
    employeeId: 'EMP-005',
    costCenter: 'FIN-ANALYTICS',
    salary: {
      amount: 68000,
      currency: 'USD',
      effectiveDate: '2024-01-01'
    },
    preferences: {
      theme: 'system',
      language: 'en',
      notifications: {
        email: true,
        push: false,
        slack: false
      }
    }
  },
  {
    id: 'usr-006',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@company.com',
    phone: '+1-555-0106',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    role: 'approver',
    department: 'Executive',
    status: 'active',
    permissions: [
      { resource: 'budgets', actions: ['read', 'approve'] },
      { resource: 'assets', actions: ['read', 'approve'] },
      { resource: 'reports', actions: ['read'] }
    ],
    lastLogin: '2024-01-15T07:30:00Z',
    createdAt: '2021-12-01T08:00:00Z',
    updatedAt: '2024-01-15T07:30:00Z',
    location: 'New York, NY',
    employeeId: 'EMP-006',
    costCenter: 'EXEC',
    salary: {
      amount: 180000,
      currency: 'USD',
      effectiveDate: '2024-01-01'
    },
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: {
        email: true,
        push: false,
        slack: false
      }
    }
  },
  {
    id: 'usr-007',
    firstName: 'James',
    lastName: 'Thompson',
    email: 'james.thompson@company.com',
    phone: '+1-555-0107',
    role: 'viewer',
    department: 'HR',
    status: 'pending',
    permissions: [
      { resource: 'reports', actions: ['read'] },
      { resource: 'assets', actions: ['read'] }
    ],
    lastLogin: '2024-01-10T14:30:00Z',
    createdAt: '2024-01-08T08:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    managerId: 'usr-002',
    location: 'Remote',
    employeeId: 'EMP-007',
    costCenter: 'HR-OPS',
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: {
        email: false,
        push: false,
        slack: false
      }
    }
  },
  {
    id: 'usr-008',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@company.com',
    phone: '+1-555-0108',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
    role: 'analyst',
    department: 'IT Security',
    status: 'suspended',
    permissions: [
      { resource: 'security', actions: ['read'] },
      { resource: 'reports', actions: ['read'] }
    ],
    lastLogin: '2024-01-05T09:15:00Z',
    createdAt: '2023-06-15T08:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
    managerId: 'usr-001',
    location: 'Miami, FL',
    employeeId: 'EMP-008',
    costCenter: 'IT-SEC',
    preferences: {
      theme: 'dark',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        slack: true
      }
    }
  }
];

export const mockUserActivity: UserActivity[] = [
  {
    userId: 'usr-001',
    action: 'login',
    resource: 'system',
    details: 'User logged in successfully',
    timestamp: '2024-01-15T09:30:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    userId: 'usr-002',
    action: 'create',
    resource: 'budget',
    details: 'Created Q2 2024 IT Budget',
    timestamp: '2024-01-15T10:15:00Z',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  },
  {
    userId: 'usr-003',
    action: 'update',
    resource: 'asset',
    details: 'Updated server configuration for SRV-001',
    timestamp: '2024-01-15T08:45:00Z',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
  },
  {
    userId: 'usr-004',
    action: 'create',
    resource: 'asset',
    details: 'Added new laptop LT-2024-001',
    timestamp: '2024-01-14T16:20:00Z',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    userId: 'usr-005',
    action: 'generate',
    resource: 'report',
    details: 'Generated monthly cost analysis report',
    timestamp: '2024-01-15T11:00:00Z',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  }
];

// Helper functions
export const getUsersByRole = (role: User['role']) => {
  return mockUsers.filter(user => user.role === role);
};

export const getUsersByStatus = (status: User['status']) => {
  return mockUsers.filter(user => user.status === status);
};

export const getUsersByDepartment = (department: string) => {
  return mockUsers.filter(user => user.department === department);
};

export const getActiveUsers = () => {
  return mockUsers.filter(user => user.status === 'active');
};

export const getUsersWithRecentActivity = (days: number = 7) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return mockUsers.filter(user => {
    if (!user.lastLogin) return false;
    return new Date(user.lastLogin) >= cutoffDate;
  });
};

export const getUserPermissions = (userId: string) => {
  const user = mockUsers.find(u => u.id === userId);
  return user?.permissions || [];
};

export const hasPermission = (userId: string, resource: string, action: 'create' | 'read' | 'update' | 'delete' | 'approve') => {
  const permissions = getUserPermissions(userId);
  const resourcePermission = permissions.find(p => p.resource === resource);
  return resourcePermission?.actions.includes(action) || false;
};

export const getRoleStats = () => {
  const roleCount = mockUsers.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(roleCount).map(([role, count]) => ({
    role,
    count,
    percentage: Math.round((count / mockUsers.length) * 100)
  }));
};

export const getStatusStats = () => {
  const statusCount = mockUsers.reduce((acc, user) => {
    acc[user.status] = (acc[user.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(statusCount).map(([status, count]) => ({
    status,
    count,
    percentage: Math.round((count / mockUsers.length) * 100)
  }));
};

export const getDepartmentStats = () => {
  const deptCount = mockUsers.reduce((acc, user) => {
    acc[user.department] = (acc[user.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(deptCount).map(([department, count]) => ({
    department,
    count,
    percentage: Math.round((count / mockUsers.length) * 100)
  }));
};

export const getTotalSalaryCost = () => {
  return mockUsers.reduce((total, user) => {
    return total + (user.salary?.amount || 0);
  }, 0);
};

export const getAverageSalaryByRole = () => {
  const roleData = mockUsers.reduce((acc, user) => {
    if (!user.salary) return acc;
    
    if (!acc[user.role]) {
      acc[user.role] = { total: 0, count: 0 };
    }
    
    acc[user.role].total += user.salary.amount;
    acc[user.role].count += 1;
    
    return acc;
  }, {} as Record<string, { total: number; count: number }>);
  
  return Object.entries(roleData).map(([role, data]) => ({
    role,
    averageSalary: Math.round(data.total / data.count),
    employeeCount: data.count
  }));
}; 