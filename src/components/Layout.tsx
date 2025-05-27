
import React from 'react';
import UserSessionManager from './UserSessionManager';
import MainLayout from './MainLayout';

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
