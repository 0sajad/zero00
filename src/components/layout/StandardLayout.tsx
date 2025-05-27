
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '../Header';
import NavigationSidebar from '../NavigationSidebar';
import { MobileOverlay } from './MobileOverlay';
import { MainContentArea } from './MainContentArea';

interface StandardLayoutProps {
  activeTab: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userMode: 'client' | 'developer';
  currentUser: {name: string, key: string} | null;
  onTabChange: (tabId: string) => void;
  onLogout: () => void;
}

export const StandardLayout = ({
  activeTab,
  sidebarOpen,
  setSidebarOpen,
  userMode,
  currentUser,
  onTabChange,
  onLogout
}: StandardLayoutProps) => {
  const isMobile = useIsMobile();

  const handleOverlayClose = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-background w-full">
      <Header onNavigate={onTabChange} />
      
      <div className="flex min-h-screen bg-gray-900 relative">
        <MobileOverlay 
          isVisible={sidebarOpen && isMobile} 
          onClose={handleOverlayClose} 
        />

        <NavigationSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          userMode={userMode}
          onTabChange={onTabChange}
          currentUser={currentUser}
          onLogout={onLogout}
        />

        <MainContentArea
          activeTab={activeTab}
          userMode={userMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onTabChange={onTabChange}
        />
      </div>
    </div>
  );
};
