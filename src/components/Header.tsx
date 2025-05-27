
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { 
  Settings, 
  HelpCircle, 
  Activity,
  User,
  Bell,
  Download,
  Link,
  Menu,
  Wifi,
  Shield,
  Zap,
  Cable,
  Scan,
  Globe,
  FileText,
  Bot
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  onNavigate?: (tab: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleNavigation = (tab: string) => {
    console.log('التنقل إلى:', tab);
    if (onNavigate) {
      onNavigate(tab);
    }
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: <Activity className="h-4 w-4" />, badge: null },
    { id: 'tools', name: 'أدوات الفحص', icon: <Zap className="h-4 w-4" />, badge: null },
    { id: 'fiber-tools', name: 'فحص الكابل الضوئي', icon: <Cable className="h-4 w-4" />, badge: 'جديد' },
    { id: 'network-scanner', name: 'ماسح الشبكة', icon: <Scan className="h-4 w-4" />, badge: null },
    { id: 'simulation', name: 'المحاكاة', icon: <Globe className="h-4 w-4" />, badge: 'Beta' },
    { id: 'ai-assistant', name: 'مساعد ذكي', icon: <Bot className="h-4 w-4" />, badge: 'AI' },
    { id: 'security', name: 'الأمان', icon: <Shield className="h-4 w-4" />, badge: '94%' },
    { id: 'settings', name: 'الإعدادات', icon: <Settings className="h-4 w-4" />, badge: null },
    { id: 'help', name: 'مركز المساعدة', icon: <HelpCircle className="h-4 w-4" />, badge: null },
    { id: 'license', name: 'الترخيص', icon: <FileText className="h-4 w-4" />, badge: null },
  ];

  return (
    <header className="bg-background border-b border-border px-3 sm:px-4 lg:px-6 py-3 sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <div 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleNavigation('dashboard')}
          >
            <span className="text-white font-bold text-xs sm:text-sm">OCTA</span>
          </div>
          {!isMobile && (
            <div>
              <h1 
                className="text-base sm:text-lg font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleNavigation('dashboard')}
              >
                OCTA NETWORK
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">مراقب الشبكة المتقدم</p>
            </div>
          )}
        </div>

        {/* Desktop Navigation - Hidden on mobile/tablet */}
        {!isMobile && (
          <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-2 flex-1 justify-center max-w-4xl mx-4">
            {navigationItems.slice(0, 6).map((item) => (
              <Button 
                key={item.id}
                variant="ghost" 
                size="sm"
                className="text-foreground hover:text-primary text-xs 2xl:text-sm px-2 2xl:px-3 h-8 2xl:h-9 transition-all"
                onClick={() => handleNavigation(item.id)}
              >
                {item.icon}
                <span className="mr-1 2xl:mr-2 hidden lg:inline">{item.name}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-1 text-xs px-1 py-0">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>
        )}

        {/* Right side actions */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          {/* Theme and Language toggles - Desktop only */}
          {!isMobile && (
            <div className="hidden lg:flex items-center space-x-2 mr-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          )}
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
              3
            </Badge>
          </Button>
          
          {/* Desktop action buttons */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-blue-600 border-blue-600 hover:bg-blue-50 text-xs px-3"
                onClick={() => handleNavigation('license')}
              >
                <Download className="h-3 w-3 mr-1" />
                تراخيص
              </Button>
              
              <Button 
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-3 sm:px-4 text-xs sm:text-sm h-8 sm:h-9"
                onClick={() => handleNavigation('tools')}
              >
                أدوات الفحص
              </Button>
              
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 text-xs sm:text-sm h-8 sm:h-9"
                onClick={() => handleNavigation('login')}
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                دخول
              </Button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="xl:hidden p-2">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 sm:w-96">
              <SheetHeader>
                <SheetTitle className="text-right text-lg">القائمة الرئيسية</SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col space-y-4 mt-6">
                {/* Mobile theme/language controls */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="text-sm font-medium">الإعدادات</span>
                  <div className="flex items-center space-x-3">
                    <ThemeToggle />
                    <LanguageToggle />
                  </div>
                </div>
                
                {/* Navigation items */}
                <div className="flex flex-col space-y-1">
                  {navigationItems.map((item) => (
                    <Button 
                      key={item.id}
                      variant="ghost" 
                      className="w-full justify-start text-right h-12 px-4"
                      onClick={() => handleNavigation(item.id)}
                    >
                      <div className="flex items-center w-full">
                        {item.icon}
                        <span className="mr-3 flex-1 text-right font-medium">{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs px-2 py-1">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
                
                {/* Mobile action buttons */}
                <div className="border-t pt-4 space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full text-blue-600 border-blue-600 h-11"
                    onClick={() => handleNavigation('license')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    تحميل التراخيص
                  </Button>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white h-11"
                    onClick={() => handleNavigation('tools')}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    أدوات الفحص
                  </Button>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11"
                    onClick={() => handleNavigation('login')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    تسجيل الدخول
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
