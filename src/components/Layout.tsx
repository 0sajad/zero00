
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Wifi, 
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
  Cable
} from 'lucide-react';
import Dashboard from './Dashboard';
import NewDashboard from './NewDashboard';
import AIAssistant from './AIAssistant';
import NetworkScanner from './NetworkScanner';
import Simulation from './Simulation';
import Tools from './Tools';
import FiberOpticTools from './FiberOpticTools';
import License from './License';
import SettingsPage from './Settings';
import HelpCenter from './HelpCenter';

const Layout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <Activity className="h-5 w-5" />, badge: null },
    { id: 'tools', name: 'أدوات الفحص', icon: <Zap className="h-5 w-5" />, badge: null },
    { id: 'fiber-tools', name: 'فحص الكابل الضوئي', icon: <Cable className="h-5 w-5" />, badge: 'جديد' },
    { id: 'network-scanner', name: 'ماسح الشبكة', icon: <Scan className="h-5 w-5" />, badge: null },
    { id: 'simulation', name: 'المحاكاة', icon: <Globe className="h-5 w-5" />, badge: 'Beta' },
    { id: 'ai-assistant', name: 'مساعد ذكي', icon: <Bot className="h-5 w-5" />, badge: 'AI' },
    { id: 'security', name: 'الأمان', icon: <Shield className="h-5 w-5" />, badge: '94%' },
    { id: 'settings', name: 'الإعدادات', icon: <Settings className="h-5 w-5" />, badge: null },
    { id: 'help', name: 'مركز المساعدة', icon: <HelpCircle className="h-5 w-5" />, badge: null },
    { id: 'license', name: 'الترخيص', icon: <FileText className="h-5 w-5" />, badge: null },
  ];

  const handleTabChange = (tabId: string) => {
    console.log('Changing tab to:', tabId);
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    console.log('Rendering content for tab:', activeTab);
    
    switch (activeTab) {
      case 'dashboard':
        return <NewDashboard />;
      case 'tools':
        return (
          <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
              <Tools />
            </div>
          </div>
        );
      case 'fiber-tools':
        return (
          <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
              <FiberOpticTools />
            </div>
          </div>
        );
      case 'network-scanner':
        return (
          <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
              <NetworkScanner />
            </div>
          </div>
        );
      case 'simulation':
        return (
          <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
              <Simulation />
            </div>
          </div>
        );
      case 'ai-assistant':
        return (
          <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6">
            <div className="h-full max-w-4xl mx-auto">
              <AIAssistant />
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
              <SettingsPage />
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
              <HelpCenter />
            </div>
          </div>
        );
      case 'license':
        return (
          <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
              <License />
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 text-center">
                <Shield className="h-16 w-16 mx-auto mb-4 text-green-600" />
                <h2 className="text-2xl font-bold mb-4">أمان الشبكة</h2>
                <p className="text-gray-600 mb-6">نظام الأمان يعمل بكفاءة 94%</p>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800">✓ جدار الحماية نشط</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800">✓ فحص الفيروسات نشط</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800">⚠️ يُنصح بتحديث كلمات المرور</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      default:
        return <NewDashboard />;
    }
  };

  if (activeTab === 'dashboard') {
    return <NewDashboard />;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-50 w-64 transition-transform duration-300 bg-card/30 backdrop-blur-sm border-r border-border/50 flex flex-col`}>
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">OCTA GRAM</h1>
                <p className="text-xs text-muted-foreground">مراقب الشبكة</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className="w-full justify-start h-12 px-4 text-right"
              onClick={() => handleTabChange(item.id)}
            >
              {item.icon}
              <span className="ml-3 flex-1 text-right">{item.name}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <Button
          variant="outline"
          size="sm"
          className="fixed top-4 left-4 z-30 lg:hidden bg-background"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default Layout;
