
import React from 'react';
import UserSessionManager from './UserSessionManager';
import MainLayout from './MainLayout';
import DashboardLayout from './DashboardLayout';

const Layout = () => {
  return (
    <UserSessionManager>
      {({ userMode, currentUser, onLogout }) => (
        <MainLayout
          userMode={userMode}
          currentUser={currentUser}
          onLogout={onLogout}
        />
      )}
    </UserSessionManager>
  );
};

export default Layout;
