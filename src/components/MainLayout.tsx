
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import NavigationSidebar from './NavigationSidebar';
import ContentRenderer from './ContentRenderer';
import MobileMenuButton from './MobileMenuButton';
import NewDashboard from './NewDashboard';

interface MainLayoutProps {
  userMode: 'client' | 'developer';
  currentUser: {name: string, key: string} | null;
  onLogout: () => void;
}

const MainLayout = ({ userMode, currentUser, onLogout }: MainLayoutProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleTabChange = (tabId: string) => {
    console.log('تغيير التبويب إلى:', tabId);
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  // Dashboard gets its own layout without sidebar
  if (activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-background w-full">
        <Header onNavigate={handleTabChange} />
        <NewDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full">
      <Header onNavigate={handleTabChange} />
      
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
          onTabChange={handleTabChange}
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
              onTabChange={handleTabChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
