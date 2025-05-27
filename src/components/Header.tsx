
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
  Moon
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
    <header className="bg-white border-b border-gray-200 px-4 py-2 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Right side - Main buttons matching the image */}
        <div className="flex items-center space-x-2">
          {/* Log In Button */}
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            onClick={() => handleNavigation('login')}
          >
            <User className="h-4 w-4 ml-1" />
            Log In
          </Button>

          {/* Notification */}
          <Button variant="ghost" size="sm" className="relative p-2 rounded-lg">
            <Bell className="h-4 w-4 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
              1
            </Badge>
          </Button>

          {/* عمل (Work/Tools) */}
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            onClick={() => handleNavigation('tools')}
          >
            عمل
          </Button>

          {/* تراخيص (Licenses) */}
          <Button 
            variant="outline"
            className="border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
            onClick={() => handleNavigation('license')}
          >
            <Download className="h-4 w-4 ml-1" />
            تراخيص
          </Button>

          {/* Language/Region selector */}
          <div className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-gray-300">
            <span className="text-sm">SA</span>
            <Globe className="h-4 w-4 text-gray-600" />
          </div>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>

        {/* Center - License field */}
        <div className="hidden lg:block">
          <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 min-w-[200px] text-center">
            <span className="text-sm text-gray-600">License</span>
          </div>
        </div>

        {/* Left side - Navigation and tools */}
        <div className="flex items-center space-x-2">
          {/* مركز المساعدة (Help Center) */}
          <Button 
            variant="outline"
            className="border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
            onClick={() => handleNavigation('help')}
          >
            <HelpCircle className="h-4 w-4 ml-1" />
            مركز المساعدة
          </Button>

          {/* الإعدادات (Settings) */}
          <Button 
            variant="outline"
            className="border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
            onClick={() => handleNavigation('settings')}
          >
            <Settings className="h-4 w-4 ml-1" />
            الإعدادات
          </Button>

          {/* المساعد الذكي (AI Assistant) */}
          <Button 
            variant="outline"
            className="border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
            onClick={() => handleNavigation('ai-assistant')}
          >
            <Bot className="h-4 w-4 ml-1" />
            المساعد الذكي
          </Button>

          {/* الأدوات (Tools dropdown) */}
          <div className="relative">
            <Button 
              variant="outline"
              className="border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
              onClick={() => handleNavigation('tools')}
            >
              الأدوات
              <Settings className="h-4 w-4 mr-1" />
            </Button>
          </div>

          {/* لوحة التحكم (Dashboard) */}
          <Button 
            variant="outline"
            className="border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
            onClick={() => handleNavigation('dashboard')}
          >
            لوحة التحكم
          </Button>

          {/* Mobile menu trigger */}
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader>
                  <SheetTitle className="text-right text-lg">القائمة الرئيسية</SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col space-y-4 mt-6">
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
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-right h-12 px-4"
                      onClick={() => handleNavigation('help')}
                    >
                      <HelpCircle className="h-4 w-4" />
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
