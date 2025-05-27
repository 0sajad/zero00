
import React, { useState } from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import { StandardLayout } from './layout/StandardLayout';

interface MainLayoutProps {
  userMode: 'client' | 'developer';
  currentUser: {name: string, key: string} | null;
  onLogout: () => void;
}

const MainLayout = ({ userMode, currentUser, onLogout }: MainLayoutProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (tabId: string) => {
    console.log('تغيير التبويب إلى:', tabId);
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  // Dashboard gets its own layout without sidebar
  if (activeTab === 'dashboard') {
    return <DashboardLayout onNavigate={handleTabChange} />;
  }

  return (
    <StandardLayout
      activeTab={activeTab}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      userMode={userMode}
      currentUser={currentUser}
      onTabChange={handleTabChange}
      onLogout={onLogout}
    />
  );
};

export default MainLayout;
