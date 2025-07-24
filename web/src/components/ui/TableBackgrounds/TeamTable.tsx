import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import {
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { mockUsers, type User } from '../../../data/mockUsers';

interface TeamTableProps {
  onEdit?: (user: User) => void;
  onView?: (user: User) => void;
  onDelete?: (user: User) => void;
  showActions?: boolean;
  data?: User[];
}

const TeamTable: React.FC<TeamTableProps> = ({
  onEdit,
  onView,
  onDelete,
  showActions = true,
  data = mockUsers,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'pending':
        return 'warning';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'finance_manager':
        return 'primary';
      case 'it_manager':
        return 'secondary';
      case 'asset_manager':
        return 'info';
      case 'analyst':
        return 'success';
      case 'approver':
        return 'warning';
      case 'viewer':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatRole = (role: User['role']) => {
    return role
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatLastLogin = (lastLogin?: string) => {
    if (!lastLogin) return 'Never';
    const date = new Date(lastLogin);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'User',
        size: 160,
        minSize: 140,
        maxSize: 180,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              src={row.original.avatar}
              alt={`${row.original.firstName} ${row.original.lastName}`}
              sx={{ width: 32, height: 32 }}
            >
              {row.original.firstName.charAt(0)}{row.original.lastName.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="medium" sx={{ fontSize: '0.875rem', lineHeight: 1.2 }}>
                {row.original.firstName} {row.original.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                {row.original.employeeId}
              </Typography>
            </Box>
          </Box>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Contact',
        size: 160,
        minSize: 140,
        maxSize: 200,
        Cell: ({ row }) => (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
              <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                {row.original.email.length > 20 
                  ? `${row.original.email.substring(0, 20)}...` 
                  : row.original.email}
              </Typography>
            </Box>
            {row.original.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                  {row.original.phone}
                </Typography>
              </Box>
            )}
          </Box>
        ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 130,
        minSize: 120,
        maxSize: 160,
        Cell: ({ cell }) => (
          <Chip
            label={formatRole(cell.getValue<User['role']>())}
            color={getRoleColor(cell.getValue<User['role']>())}
            size="small"
            variant="outlined"
          />
        ),
      },
      {
        accessorKey: 'department',
        header: 'Department',
        size: 130,
        minSize: 110,
        maxSize: 160,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        minSize: 90,
        maxSize: 120,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue<string>().charAt(0).toUpperCase() + cell.getValue<string>().slice(1)}
            color={getStatusColor(cell.getValue<User['status']>())}
            size="small"
          />
        ),
      },
      {
        accessorKey: 'location',
        header: 'Location',
        size: 120,
        minSize: 100,
        maxSize: 150,
      },
      {
        accessorKey: 'lastLogin',
        header: 'Last Login',
        size: 110,
        minSize: 100,
        maxSize: 130,
        Cell: ({ cell }) => (
          <Typography variant="body2" color="text.secondary">
            {formatLastLogin(cell.getValue<string>())}
          </Typography>
        ),
      },
      {
        accessorKey: 'salary.amount',
        header: 'Salary',
        size: 100,
        minSize: 90,
        maxSize: 120,
        Cell: ({ row }) => (
          <Typography variant="body2">
            {row.original.salary
              ? `$${row.original.salary.amount.toLocaleString()}`
              : 'N/A'
            }
          </Typography>
        ),
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: showActions,
    positionActionsColumn: 'last',
    enableHiding: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        {onView && (
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => onView(row.original)}
              sx={{ color: 'primary.main' }}
            >
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {onEdit && (
          <Tooltip title="Edit User">
            <IconButton
              size="small"
              onClick={() => onEdit(row.original)}
              sx={{ color: 'info.main' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip title="Delete User">
            <IconButton
              size="small"
              onClick={() => onDelete(row.original)}
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="h6" component="h2">
          Team Members ({data.length})
        </Typography>
      </Box>
    ),
    renderBottomToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {table.getPrePaginationRowModel().rows.length} user(s) total
        </Typography>
      </Box>
    ),
    onRowSelectionChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        const newSelection = updaterOrValue({});
        const selectedUserIds = Object.keys(newSelection);
        const selectedUserData = data.filter((_, index) =>
          selectedUserIds.includes(index.toString())
        );
        setSelectedUsers(selectedUserData);
      }
    },
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-select', 'firstName'],
        right: ['mrt-row-actions'],
      },
      pagination: {
        pageIndex: 0,
        pageSize: window.innerWidth > 768 ? 10 : 5, // Smaller page size on mobile
      },
      sorting: [
        {
          id: 'firstName',
          desc: false,
        },
      ],
      density: 'compact',
      columnVisibility: {
        'salary.amount': window.innerWidth > 1400, // Show salary only on very large screens
        'location': window.innerWidth > 1200, // Show location only on large desktop
        'lastLogin': window.innerWidth > 1024, // Show last login on desktop
        'department': window.innerWidth > 768, // Show department on tablet and up
      },
    },
    muiTableProps: {
      sx: {
        backgroundColor: 'var(--color-card)',
        tableLayout: 'fixed',
      },
    },
    muiTableContainerProps: {
      sx: {
        maxWidth: '100%',
        width: '100%',
        overflowX: 'auto',
        overflowY: 'auto',
        maxHeight: {
          xs: 'calc(100vh - 300px)', // Mobile
          sm: 'calc(100vh - 250px)', // Tablet
          md: 'calc(100vh - 200px)', // Desktop
        },
        // Ensure smooth scrolling
        scrollBehavior: 'smooth',
        // Hide scrollbar on webkit browsers for cleaner look
        '&::-webkit-scrollbar': {
          height: '8px',
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'var(--color-background)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'var(--color-border)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'var(--color-text-secondary)',
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        fontWeight: 600,
      },
    },
    muiTableBodyCellProps: {
      sx: {
        backgroundColor: 'var(--color-card)',
        color: 'var(--color-text)',
      },
    },
    muiTablePaperProps: {
      sx: {
        boxShadow: 'var(--shadow-sm)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
      },
    },
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'primary',
      rowsPerPageOptions: [5, 10, 20, 50],
      shape: 'rounded',
      variant: 'outlined',
    },
  });

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: {
        xs: 'calc(100vw - 40px)', // Mobile with padding
        sm: 'calc(100vw - 60px)', // Tablet with padding  
        md: 'calc(100vw - 300px)', // Desktop with sidebar
      },
      overflow: 'hidden',
      '& .MuiPaper-root': {
        maxWidth: '100%',
        overflow: 'hidden',
      },
      '& .MuiTableContainer-root': {
        maxWidth: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
      }
    }}>
      <MaterialReactTable table={table} />
      
      {selectedUsers.length > 0 && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: 'var(--color-primary-50)',
            border: '1px solid var(--color-primary-200)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <Typography variant="body2" fontWeight="medium" gutterBottom>
            Selected Users ({selectedUsers.length}):
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {selectedUsers.map((user) => (
              <Chip
                key={user.id}
                label={`${user.firstName} ${user.lastName}`}
                size="small"
                avatar={<Avatar src={user.avatar} sx={{ width: 24, height: 24 }}>
                  {user.firstName.charAt(0)}
                </Avatar>}
                onDelete={() => {
                  setSelectedUsers(prev => prev.filter(u => u.id !== user.id));
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default TeamTable;
