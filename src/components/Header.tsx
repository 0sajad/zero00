
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { 
  Settings, 
  User,
  Bell,
  Download,
  Menu,
  Zap,
  Bot,
  HelpCircle,
  Globe,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  onNavigate?: (tab: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleNavigation = (tab: string) => {
    console.log('التنقل إلى:', tab);
    if (onNavigate) {
      onNavigate(tab);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-background border-b border-border px-4 lg:px-6 py-3 sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Right side - Logo and main navigation */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleNavigation('dashboard')}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-lg font-semibold text-foreground">OCTA NETWORK</span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden lg:flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => handleNavigation('dashboard')}
              >
                لوحة التحكم
              </Button>
              
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4"
                onClick={() => handleNavigation('tools')}
              >
                <Zap className="h-4 w-4 mr-1" />
                عمل
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => handleNavigation('license')}
              >
                <Download className="h-4 w-4 mr-1" />
                تراخيص
              </Button>
            </nav>
          )}
        </div>

        {/* Center - Main action buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button 
            variant="outline"
            size="sm"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => handleNavigation('simulation')}
          >
            <Globe className="h-4 w-4 mr-1" />
            مركز المساعدة
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            className="border-gray-300"
            onClick={() => handleNavigation('ai-assistant')}
          >
            <Bot className="h-4 w-4 mr-1" />
            المساعد الذكي
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            className="border-gray-300"
            onClick={() => handleNavigation('settings')}
          >
            <Settings className="h-4 w-4 mr-1" />
            الإعدادات
          </Button>
        </div>

        {/* Left side - User actions and controls */}
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <LanguageToggle />
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
              1
            </Badge>
          </Button>
          
          {/* Admin Panel - Desktop */}
          {!isMobile && (
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4"
              onClick={() => handleNavigation('login')}
            >
              <User className="h-4 w-4 mr-1" />
              Log In
            </Button>
          )}

          {/* Mobile menu trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden p-2">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 sm:w-96">
              <SheetHeader>
                <SheetTitle className="text-right text-lg">القائمة الرئيسية</SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col space-y-4 mt-6">
                {/* Mobile navigation items */}
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-right h-12 px-4"
                    onClick={() => handleNavigation('dashboard')}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="mr-3 flex-1 text-right font-medium">لوحة التحكم</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-right h-12 px-4"
                    onClick={() => handleNavigation('tools')}
                  >
                    <Zap className="h-4 w-4" />
                    <span className="mr-3 flex-1 text-right font-medium">أدوات الفحص</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-right h-12 px-4"
                    onClick={() => handleNavigation('ai-assistant')}
                  >
                    <Bot className="h-4 w-4" />
                    <span className="mr-3 flex-1 text-right font-medium">المساعد الذكي</span>
                    <Badge variant="secondary" className="text-xs">AI</Badge>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-right h-12 px-4"
                    onClick={() => handleNavigation('simulation')}
                  >
                    <Globe className="h-4 w-4" />
                    <span className="mr-3 flex-1 text-right font-medium">مركز المساعدة</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-right h-12 px-4"
                    onClick={() => handleNavigation('settings')}
                  >
                    <Settings className="h-4 w-4" />
                    <span className="mr-3 flex-1 text-right font-medium">الإعدادات</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-right h-12 px-4"
                    onClick={() => handleNavigation('license')}
                  >
                    <Download className="h-4 w-4" />
                    <span className="mr-3 flex-1 text-right font-medium">التراخيص</span>
                  </Button>
                </div>
                
                {/* Mobile action buttons */}
                <div className="border-t pt-4 space-y-3">
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
