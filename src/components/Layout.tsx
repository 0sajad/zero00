
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Shield, 
  Settings, 
  HelpCircle, 
  Bot, 
  Scan,
  Zap,
  Menu,
  X,
  Globe,
  FileText,
  Cable,
  Terminal,
  Code,
  Key
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import NewDashboard from './NewDashboard';
import AIAssistant from './AIAssistant';
import NetworkScanner from './NetworkScanner';
import Simulation from './Simulation';
import EnhancedTools from './EnhancedTools';
import FiberOpticTools from './FiberOpticTools';
import License from './License';
import SettingsPage from './Settings';
import EnhancedHelpCenter from './EnhancedHelpCenter';
import Header from './Header';
import ModeSwitcher from './ModeSwitcher';
import LicenseValidation from './LicenseValidation';
import DeveloperMode from './DeveloperMode';
import CMD from './CMD';

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

  const navigationItems = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: <Activity className="h-5 w-5" />, badge: null },
    { id: 'tools', name: 'أدوات الفحص المتطورة', icon: <Zap className="h-5 w-5" />, badge: 'جديد' },
    { id: 'fiber-tools', name: 'فحص الكابل الضوئي', icon: <Cable className="h-5 w-5" />, badge: 'Pro' },
    { id: 'network-scanner', name: 'ماسح الشبكة', icon: <Scan className="h-5 w-5" />, badge: null },
    { id: 'cmd', name: 'وحدة التحكم CMD', icon: <Terminal className="h-5 w-5" />, badge: 'Terminal' },
    { id: 'simulation', name: 'المحاكاة', icon: <Globe className="h-5 w-5" />, badge: 'Beta' },
    { id: 'ai-assistant', name: 'مساعد ذكي', icon: <Bot className="h-5 w-5" />, badge: 'AI' },
    { id: 'security', name: 'الأمان المتقدم', icon: <Shield className="h-5 w-5" />, badge: '94%' },
    ...(userMode === 'developer' ? [
      { id: 'developer', name: 'وضع المطور', icon: <Code className="h-5 w-5" />, badge: 'DEV' }
    ] : []),
    { id: 'settings', name: 'الإعدادات', icon: <Settings className="h-5 w-5" />, badge: null },
    { id: 'help', name: 'مركز المساعدة', icon: <HelpCircle className="h-5 w-5" />, badge: 'عراقي' },
    { id: 'license', name: 'الترخيص', icon: <FileText className="h-5 w-5" />, badge: null },
  ];

  const handleTabChange = (tabId: string) => {
    console.log('تغيير التبويب إلى:', tabId);
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    console.log('عرض المحتوى للتبويب:', activeTab);
    
    try {
      switch (activeTab) {
        case 'dashboard':
          return <NewDashboard />;
        case 'tools':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-7xl mx-auto">
                <EnhancedTools />
              </div>
            </div>
          );
        case 'fiber-tools':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-7xl mx-auto">
                <FiberOpticTools />
              </div>
            </div>
          );
        case 'network-scanner':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <NetworkScanner />
              </div>
            </div>
          );
        case 'cmd':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <CMD isDeveloper={userMode === 'developer'} />
              </div>
            </div>
          );
        case 'simulation':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <Simulation />
              </div>
            </div>
          );
        case 'ai-assistant':
          return (
            <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-3 sm:p-4 lg:p-6">
              <div className="h-full max-w-5xl mx-auto">
                <AIAssistant />
              </div>
            </div>
          );
        case 'developer':
          if (userMode === 'developer') {
            return (
              <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
                <div className="max-w-7xl mx-auto">
                  <DeveloperMode />
                </div>
              </div>
            );
          }
          return null;
        case 'settings':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <SettingsPage />
              </div>
            </div>
          );
        case 'help':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-6xl mx-auto">
                <EnhancedHelpCenter />
              </div>
            </div>
          );
        case 'license':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <License />
              </div>
            </div>
          );
        case 'security':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <Card className="p-4 sm:p-6 lg:p-8 text-center shadow-lg">
                  <Shield className="h-16 w-16 mx-auto mb-4 text-green-600" />
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">نظام الأمان المتطور</h2>
                  <p className="text-gray-600 mb-6">حماية شاملة مع مراقبة مستمرة</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-center mb-2">
                        <Shield className="h-5 w-5 text-green-600 ml-2" />
                        <span className="text-green-800 font-medium">جدار الحماية المتقدم</span>
                      </div>
                      <p className="text-green-700 text-sm">✅ نشط مع AI Detection</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-center mb-2">
                        <Scan className="h-5 w-5 text-green-600 ml-2" />
                        <span className="text-green-800 font-medium">فحص التهديدات</span>
                      </div>
                      <p className="text-green-700 text-sm">✅ مراقبة 24/7</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-center mb-2">
                        <Activity className="h-5 w-5 text-blue-600 ml-2" />
                        <span className="text-blue-800 font-medium">تشفير WPA3</span>
                      </div>
                      <p className="text-blue-700 text-sm">🔒 أعلى مستوى أمان</p>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-center mb-2">
                        <Settings className="h-5 w-5 text-yellow-600 ml-2" />
                        <span className="text-yellow-800 font-medium">إعدادات الأمان</span>
                      </div>
                      <p className="text-yellow-700 text-sm">⚡ محدث تلقائياً</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">نقاط الأمان العامة</h3>
                    <div className="text-4xl font-bold text-green-600 mb-2">96/100</div>
                    <p className="text-sm text-gray-600">أمان متطور جداً</p>
                    <Badge className="mt-2 bg-green-100 text-green-700">محمي بالكامل</Badge>
                  </div>
                </Card>
              </div>
            </div>
          );
        default:
          return <NewDashboard />;
      }
    } catch (error) {
      console.error('خطأ في عرض المحتوى:', error);
      return (
        <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md mx-auto">
            <h2 className="text-xl font-bold text-red-600 mb-4">خطأ في التحميل</h2>
            <p className="text-gray-600 mb-4">حدث خطأ أثناء تحميل هذه الصفحة</p>
            <Button onClick={() => handleTabChange('dashboard')} className="bg-blue-600 hover:bg-blue-700">
              العودة للرئيسية
            </Button>
          </Card>
        </div>
      );
    }
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
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } xl:translate-x-0 fixed xl:relative inset-y-0 right-0 z-50 w-64 xl:w-72 transition-transform duration-300 bg-white border-l border-gray-200 flex flex-col shadow-lg`}>
          
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                  {userMode === 'developer' ? (
                    <Code className="h-6 w-6 text-red-600" />
                  ) : (
                    <Activity className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg font-bold text-white truncate">OCTA NETWORK</h1>
                  <p className="text-xs text-blue-100 truncate">
                    {userMode === 'developer' ? 'Developer Mode' : 'Client Mode'}
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="xl:hidden text-white hover:bg-white/10 p-2"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* User Info */}
            {currentUser && (
              <div className="mt-3 p-2 bg-white/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs text-white font-medium truncate">{currentUser.name}</p>
                    <p className="text-xs text-blue-200 font-mono truncate">{currentUser.key}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-white hover:bg-white/20 text-xs px-2 py-1"
                  >
                    خروج
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto bg-gray-50">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start h-12 px-4 text-right transition-all ${
                  activeTab === item.id 
                    ? userMode === 'developer' 
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
                onClick={() => handleTabChange(item.id)}
              >
                <div className="flex items-center w-full min-w-0">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <span className="ml-3 flex-1 text-right font-medium text-sm truncate">{item.name}</span>
                  {item.badge && (
                    <Badge 
                      variant={activeTab === item.id ? 'secondary' : 'outline'} 
                      className="text-xs px-2 py-0 flex-shrink-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                الإصدار 3.0 - {userMode === 'developer' ? 'Developer' : 'Professional'}
              </p>
              <p className="text-xs text-gray-400">جميع الحقوق محفوظة © 2024</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-white relative">
          {/* Mobile sidebar trigger */}
          <Button
            variant="outline"
            size="sm"
            className="fixed top-20 right-3 z-30 xl:hidden bg-white shadow-lg border-blue-600 text-blue-600 hover:bg-blue-50 p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          <div className="w-full overflow-x-hidden">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
