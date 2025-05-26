
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
import Header from './Header';

const Layout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: <Activity className="h-5 w-5" />, badge: null },
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
                <Card className="p-8 text-center shadow-lg">
                  <Shield className="h-16 w-16 mx-auto mb-4 text-green-600" />
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">أمان الشبكة المتقدم</h2>
                  <p className="text-gray-600 mb-6">نظام الأمان يعمل بكفاءة عالية</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-center mb-2">
                        <Shield className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-green-800 font-medium">جدار الحماية</span>
                      </div>
                      <p className="text-green-700 text-sm">✅ نشط ومحدث</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-center mb-2">
                        <Scan className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-green-800 font-medium">فحص الفيروسات</span>
                      </div>
                      <p className="text-green-700 text-sm">✅ فحص مستمر</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-center mb-2">
                        <Wifi className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-blue-800 font-medium">تشفير الشبكة</span>
                      </div>
                      <p className="text-blue-700 text-sm">🔒 WPA3 محدث</p>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-center mb-2">
                        <Settings className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="text-yellow-800 font-medium">كلمات المرور</span>
                      </div>
                      <p className="text-yellow-700 text-sm">⚠️ يُنصح بالتحديث</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">نقاط الأمان العامة</h3>
                    <div className="text-3xl font-bold text-green-600">94/100</div>
                    <p className="text-sm text-gray-600 mt-1">أمان ممتاز</p>
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
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
          <Card className="p-8 text-center">
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

  if (activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-background">
        <Header onNavigate={handleTabChange} />
        <NewDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleTabChange} />
      
      <div className="flex h-screen bg-gray-900">
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-50 w-64 transition-transform duration-300 bg-white border-r border-gray-200 flex flex-col shadow-lg`}>
          
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">OCTA GRAM</h1>
                  <p className="text-xs text-blue-100">مراقب الشبكة المتقدم</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto bg-gray-50">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start h-12 px-4 text-right transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
                onClick={() => handleTabChange(item.id)}
              >
                <div className="flex items-center w-full">
                  {item.icon}
                  <span className="mr-3 flex-1 text-right font-medium">{item.name}</span>
                  {item.badge && (
                    <Badge 
                      variant={activeTab === item.id ? 'secondary' : 'outline'} 
                      className="mr-auto text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="text-center">
              <p className="text-xs text-gray-500">الإصدار 2.0</p>
              <p className="text-xs text-gray-400">جميع الحقوق محفوظة</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative bg-white">
          <Button
            variant="outline"
            size="sm"
            className="fixed top-4 left-4 z-30 lg:hidden bg-white shadow-lg border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Layout;
