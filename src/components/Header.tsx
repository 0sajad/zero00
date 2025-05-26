
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Settings, 
  HelpCircle, 
  Activity,
  User,
  Bell,
  Download,
  Link,
  ChevronDown,
  Menu
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavigationItems = () => (
    <>
      <Button variant="ghost" className="text-foreground hover:text-primary text-sm">
        <Activity className="h-4 w-4 mr-2" />
        {t('dashboard')}
      </Button>
      <Button variant="ghost" className="text-foreground hover:text-primary text-sm">
        <Settings className="h-4 w-4 mr-2" />
        {t('tools')}
        <ChevronDown className="h-3 w-3 ml-1" />
      </Button>
      <Button variant="ghost" className="text-foreground hover:text-primary text-sm">
        <Activity className="h-4 w-4 mr-2" />
        {t('aiAssistant')}
      </Button>
      <Button variant="ghost" className="text-foreground hover:text-primary text-sm">
        <Settings className="h-4 w-4 mr-2" />
        {t('settings')}
      </Button>
      <Button variant="ghost" className="text-foreground hover:text-primary text-sm">
        <HelpCircle className="h-4 w-4 mr-2" />
        {t('help')} Center
      </Button>
      <Button variant="ghost" className="text-foreground hover:text-primary text-sm">
        <Link className="h-4 w-4 mr-2" />
        License
      </Button>
    </>
  );

  return (
    <header className="bg-background border-b border-border px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">OCTA</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">OCTA</h1>
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
            
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50 hidden lg:flex">
              <Download className="h-4 w-4 mr-2" />
              تراخيص
            </Button>
            
            <Button variant="outline" size="sm">
              <Link className="h-4 w-4 mr-2" />
            </Button>
            
            <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-4 sm:px-6">
              عمل
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                1
              </Badge>
            </Button>
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6">
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
              <div className="flex flex-col space-y-4 mt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <NavigationItems />
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <Button variant="outline" className="w-full text-blue-600 border-blue-600">
                    <Download className="h-4 w-4 mr-2" />
                    تراخيص
                  </Button>
                  
                  <Button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                    عمل
                  </Button>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
