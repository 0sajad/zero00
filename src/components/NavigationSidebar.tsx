
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import LanguageToggle from './LanguageToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  LayoutDashboard,
  Wrench,
  Scan,
  Shield,
  Bot,
  Play,
  Terminal,
  Code,
  Settings,
  HelpCircle,
  CreditCard,
  LogOut,
  X,
  Menu,
  Activity,
  Zap,
  CheckCircle
} from 'lucide-react';

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

  const mainNavItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'system-test', label: 'الفحص الشامل', icon: CheckCircle, badge: 'جديد' },
    { id: 'tools', label: 'أدوات الشبكة', icon: Wrench },
    { id: 'fiber-tools', label: 'أدوات الألياف البصرية', icon: Zap },
    { id: 'network-scanner', label: 'فاحص الشبكة', icon: Scan },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'ai-assistant', label: 'المساعد الذكي', icon: Bot },
    { id: 'simulation', label: 'المحاكاة', icon: Play },
    { id: 'cmd', label: 'سطر الأوامر', icon: Terminal },
  ];

  const bottomNavItems = [
    { id: 'settings', label: 'الإعدادات', icon: Settings },
    { id: 'help', label: 'المساعدة', icon: HelpCircle },
    { id: 'license', label: 'الترخيص', icon: CreditCard },
  ];

  if (userMode === 'developer') {
    mainNavItems.push({ id: 'developer', label: 'وضع المطور', icon: Code });
  }

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        ${isMobile ? 'w-full max-w-sm' : 'relative transform-none'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6" />
              <div>
                <h2 className="font-bold text-lg">OCTA NETWORK</h2>
                <p className="text-xs opacity-90">منصة مراقبة الشبكات</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          {currentUser && (
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userMode === 'developer' ? 'مطور' : 'عميل'}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700 text-xs">
                  نشط
                </Badge>
              </div>
            </div>
          )}

          {/* Language Toggle */}
          <div className="p-4 border-b">
            <LanguageToggle />
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Main Navigation */}
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start text-right h-12 ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => {
                      onTabChange(item.id);
                      if (isMobile) setSidebarOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5 ml-3" />
                    <span className="flex-1 text-right">{item.label}</span>
                    {item.badge && (
                      <Badge className="bg-red-100 text-red-700 text-xs mr-2">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            <Separator className="my-4" />

            {/* Bottom Navigation */}
            <div className="space-y-1">
              {bottomNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start text-right h-12 ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => {
                      onTabChange(item.id);
                      if (isMobile) setSidebarOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5 ml-3" />
                    <span className="flex-1 text-right">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50 space-y-3">
            {/* System Status */}
            <Card className="p-3 bg-green-50 border-green-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">النظام يعمل بشكل طبيعي</span>
              </div>
            </Card>

            {/* Logout Button */}
            <Button
              variant="outline"
              className="w-full justify-start text-right text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 ml-2" />
              تسجيل الخروج
            </Button>

            {/* Developer Credit */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                تطوير: سجاد كاظم
              </p>
              <p className="text-xs text-gray-400">
                v2.0.0 - 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationSidebar;
