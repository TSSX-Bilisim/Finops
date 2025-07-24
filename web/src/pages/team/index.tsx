import React from 'react';
import { TeamTable } from '../../components/ui';
import { type User } from '../../data/mockUsers';
import { useTranslation } from 'react-i18next';
  
const TeamPage: React.FC = () => {
  const { t } = useTranslation('team');

  const handleEditUser = (user: User) => {
    console.log('Edit user:', user);
    // TODO: Implement edit user functionality
  };

  const handleViewUser = (user: User) => {
    console.log('View user:', user);
    // TODO: Implement view user functionality
  };

  const handleDeleteUser = (user: User) => {
    console.log('Delete user:', user);
    // TODO: Implement delete user functionality
  };

  return (
    <div className="py-6 px-6 w-full max-w-full overflow-hidden">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          {t("title")}
        </h1>
        <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
          {t("description")}
        </p>
      </div>

      <TeamTable
        onEdit={handleEditUser}
        onView={handleViewUser}
        onDelete={handleDeleteUser}
        showActions={true}
      />
    </div>
  );
};

export default TeamPage;