
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '../Header';
import NavigationSidebar from '../NavigationSidebar';
import ContentRenderer from '../ContentRenderer';
import MobileMenuButton from '../MobileMenuButton';

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

  return (
    <div className="min-h-screen bg-background w-full">
      <Header onNavigate={onTabChange} />
      
      <div className="flex min-h-screen bg-gray-900 relative">
        {/* Mobile Overlay */}
        {sidebarOpen && isMobile && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <NavigationSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          userMode={userMode}
          onTabChange={onTabChange}
          currentUser={currentUser}
          onLogout={onLogout}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-white relative">
          {/* Mobile sidebar trigger */}
          <MobileMenuButton
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          
          <div className="w-full overflow-x-hidden">
            <ContentRenderer
              activeTab={activeTab}
              userMode={userMode}
              onTabChange={onTabChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
