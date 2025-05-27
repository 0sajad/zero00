
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
  Lightbulb,
  Languages,
  Sun,
  Moon,
  Crown,
  Star
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
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 border-b border-blue-300 px-4 py-3 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Right side - Logo and Creator */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            <div className="text-right">
              <div className="text-white font-bold text-lg">OCTA NETWORK</div>
              <div className="text-blue-100 text-xs">by Sajad Kadhim</div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm"
              onClick={() => handleNavigation('login')}
            >
              <User className="h-4 w-4 ml-1" />
              تسجيل الدخول
            </Button>

            <Button variant="ghost" size="sm" className="relative p-2 rounded-lg text-white hover:bg-white/20">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
          </div>
        </div>

        {/* Center - Premium Status */}
        <div className="hidden lg:block">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 min-w-[250px] text-center">
            <div className="flex items-center justify-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-white font-medium">Professional License</span>
              <Badge className="bg-yellow-400 text-black text-xs">
                Premium
              </Badge>
            </div>
            <div className="text-blue-100 text-xs mt-1">
              Developed by Sajad Kadhim
            </div>
          </div>
        </div>

        {/* Left side - Navigation */}
        <div className="flex items-center space-x-2">
          {/* Main Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button 
              variant="ghost"
              className="text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium"
              onClick={() => handleNavigation('help')}
            >
              <HelpCircle className="h-4 w-4 ml-1" />
              مركز المساعدة
            </Button>

            <Button 
              variant="ghost"
              className="text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium"
              onClick={() => handleNavigation('settings')}
            >
              <Settings className="h-4 w-4 ml-1" />
              الإعدادات
            </Button>

            <Button 
              variant="ghost"
              className="text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium"
              onClick={() => handleNavigation('ai-assistant')}
            >
              <Bot className="h-4 w-4 ml-1" />
              المساعد الذكي
            </Button>

            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg"
              onClick={() => handleNavigation('tools')}
            >
              <Zap className="h-4 w-4 ml-1" />
              أدوات الفحص
            </Button>

            <Button 
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg"
              onClick={() => handleNavigation('dashboard')}
            >
              <BarChart3 className="h-4 w-4 ml-1" />
              لوحة التحكم
            </Button>
          </div>

          {/* Settings */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white text-sm">SA</span>
              <Globe className="h-4 w-4 text-white" />
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile menu trigger */}
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2 text-white hover:bg-white/20">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96 bg-gradient-to-b from-blue-600 to-purple-600 text-white border-l border-white/20">
                <SheetHeader>
                  <SheetTitle className="text-right text-lg text-white flex items-center justify-end space-x-2">
                    <span>قائمة التنقل</span>
                    <Crown className="h-5 w-5 text-yellow-400" />
                  </SheetTitle>
                  <div className="text-center mt-4 p-3 bg-white/10 rounded-lg">
                    <div className="text-yellow-300 font-bold">Sajad Kadhim</div>
                    <div className="text-blue-100 text-sm">مطور النظام</div>
                  </div>
                </SheetHeader>
                
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-right h-12 px-4 text-white hover:bg-white/20"
                      onClick={() => handleNavigation('dashboard')}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="mr-3 flex-1 text-right font-medium">لوحة التحكم</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-right h-12 px-4 text-white hover:bg-white/20"
                      onClick={() => handleNavigation('tools')}
                    >
                      <Zap className="h-4 w-4" />
                      <span className="mr-3 flex-1 text-right font-medium">أدوات الفحص</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-right h-12 px-4 text-white hover:bg-white/20"
                      onClick={() => handleNavigation('ai-assistant')}
                    >
                      <Bot className="h-4 w-4" />
                      <span className="mr-3 flex-1 text-right font-medium">المساعد الذكي</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-right h-12 px-4 text-white hover:bg-white/20"
                      onClick={() => handleNavigation('help')}
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span className="mr-3 flex-1 text-right font-medium">مركز المساعدة</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-right h-12 px-4 text-white hover:bg-white/20"
                      onClick={() => handleNavigation('settings')}
                    >
                      <Settings className="h-4 w-4" />
                      <span className="mr-3 flex-1 text-right font-medium">الإعدادات</span>
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-3 bg-white/10 rounded-lg text-center">
                    <div className="text-sm text-blue-100">تطوير وتصميم</div>
                    <div className="text-yellow-300 font-bold">Sajad Kadhim</div>
                    <Badge className="mt-2 bg-yellow-400 text-black">
                      Professional Developer
                    </Badge>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
