
import React from 'react';
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
  X,
  Globe,
  FileText,
  Cable,
  Terminal,
  Code
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  userMode: 'client' | 'developer';
  onTabChange: (tabId: string) => void;
  currentUser: {name: string, key: string} | null;
  onLogout: () => void;
}

const NavigationSidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeTab, 
  userMode, 
  onTabChange, 
  currentUser, 
  onLogout 
}: NavigationSidebarProps) => {
  const isMobile = useIsMobile();

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

  return (
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
                onClick={onLogout}
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
            onClick={() => onTabChange(item.id)}
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
  );
};

export default NavigationSidebar;
