
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
  ChevronDown,
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
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  onNavigate?: (tab: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const NavigationItems = ({ isMobile = false }) => (
    <>
      {navigationItems.map((item) => (
        <Button 
          key={item.id}
          variant="ghost" 
          className={`${
            isMobile 
              ? 'w-full justify-start text-right' 
              : 'text-foreground hover:text-primary text-sm'
          }`}
          onClick={() => handleNavigation(item.id)}
        >
          {item.icon}
          <span className="mr-2">{item.name}</span>
          {item.badge && (
            <Badge variant="secondary" className="mr-auto text-xs">
              {item.badge}
            </Badge>
          )}
        </Button>
      ))}
    </>
  );

  return (
    <header className="bg-background border-b border-border px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center cursor-pointer"
            onClick={() => handleNavigation('dashboard')}
          >
            <span className="text-white font-bold text-xs sm:text-sm">OCTA</span>
          </div>
          <div className="hidden sm:block">
            <h1 
              className="text-lg font-semibold text-foreground cursor-pointer hover:text-primary"
              onClick={() => handleNavigation('dashboard')}
            >
              OCTA
            </h1>
            <p className="text-xs text-muted-foreground">NETWORK</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
          <NavigationItems />
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden sm:flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          
          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 text-white text-xs p-0 flex items-center justify-center">
                2
              </Badge>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-blue-600 border-blue-600 hover:bg-blue-50 hidden lg:flex"
              onClick={() => handleNavigation('license')}
            >
              <Download className="h-4 w-4 mr-2" />
              تراخيص
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigation('settings')}
            >
              <Link className="h-4 w-4 mr-2" />
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-4 sm:px-6"
              onClick={() => handleNavigation('tools')}
            >
              عمل
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                1
              </Badge>
            </Button>
            
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6"
              onClick={() => handleNavigation('login')}
            >
              <User className="h-4 w-4 mr-2" />
              Log In
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-right">القائمة الرئيسية</SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col space-y-4 mt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <NavigationItems isMobile={true} />
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full text-blue-600 border-blue-600"
                    onClick={() => handleNavigation('license')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    تراخيص
                  </Button>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white"
                    onClick={() => handleNavigation('tools')}
                  >
                    عمل
                  </Button>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleNavigation('login')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Log In
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
