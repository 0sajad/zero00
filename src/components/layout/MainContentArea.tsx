
import React from 'react';
import ContentRenderer from '../ContentRenderer';
import MobileMenuButton from '../MobileMenuButton';

interface MainContentAreaProps {
  activeTab: string;
  userMode: 'client' | 'developer';
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onTabChange: (tabId: string) => void;
}

export const MainContentArea = ({
  activeTab,
  userMode,
  sidebarOpen,
  setSidebarOpen,
  onTabChange
}: MainContentAreaProps) => {
  return (
    <div className="flex-1 min-w-0 bg-white relative">
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
  );
};
