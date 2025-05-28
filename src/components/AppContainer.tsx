
import React from 'react';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import EnhancedModeSwitcher from './auth/EnhancedModeSwitcher';
import MainLayout from './MainLayout';

const AppContainer = () => {
  const { isAuthenticated, user, currentMode, login, logout } = useAuthSystem();

  console.log('🏠 حالة التطبيق:', { isAuthenticated, currentMode, userName: user?.name });

  // إذا لم يسجل المستخدم دخوله، اعرض شاشة اختيار الوضع
  if (!isAuthenticated || !user || !currentMode) {
    return <EnhancedModeSwitcher onLogin={login} />;
  }

  // إذا سجل المستخدم دخوله، اعرض التطبيق الرئيسي
  return (
    <MainLayout 
      userMode={currentMode}
      currentUser={user}
      onLogout={logout}
    />
  );
};

export default AppContainer;
