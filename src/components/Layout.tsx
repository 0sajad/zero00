
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import NewDashboard from './NewDashboard';
import Header from './Header';
import ModeSwitcher from './ModeSwitcher';
import LicenseValidation from './LicenseValidation';
import NavigationSidebar from './NavigationSidebar';
import ContentRenderer from './ContentRenderer';
import MobileMenuButton from './MobileMenuButton';

const Layout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMode, setUserMode] = useState<'client' | 'developer' | null>(null);
  const [isLicenseValid, setIsLicenseValid] = useState(false);
  const [currentUser, setCurrentUser] = useState<{name: string, key: string} | null>(null);
  const isMobile = useIsMobile();

  // Check if user has valid session
  useEffect(() => {
    const savedMode = localStorage.getItem('octaUserMode');
    const savedLicense = localStorage.getItem('octaLicense');
    
    if (savedMode && savedLicense) {
      setUserMode(savedMode as 'client' | 'developer');
      setIsLicenseValid(true);
      setCurrentUser(JSON.parse(savedLicense));
    }
  }, []);

  const handleModeSelect = (mode: 'client' | 'developer') => {
    setUserMode(mode);
    localStorage.setItem('octaUserMode', mode);
    
    if (mode === 'developer') {
      // Developer mode doesn't require license validation
      setIsLicenseValid(true);
      setCurrentUser({ name: 'Developer', key: 'DEV-ACCESS' });
    }
  };

  const handleLicenseValidation = (name: string, key: string) => {
    setIsLicenseValid(true);
    setCurrentUser({ name, key });
    localStorage.setItem('octaLicense', JSON.stringify({ name, key }));
  };

  const handleLogout = () => {
    setUserMode(null);
    setIsLicenseValid(false);
    setCurrentUser(null);
    localStorage.removeItem('octaUserMode');
    localStorage.removeItem('octaLicense');
    setActiveTab('dashboard');
  };

  // If no mode selected, show mode switcher
  if (!userMode) {
    return <ModeSwitcher onModeSelect={handleModeSelect} />;
  }

  // If client mode and no valid license, show license validation
  if (userMode === 'client' && !isLicenseValid) {
    return <LicenseValidation onValidLicense={handleLicenseValidation} />;
  }

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
          onLogout={handleLogout}
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

export default Layout;
