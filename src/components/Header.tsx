
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useTranslation } from 'react-i18next';
import { 
  Settings, 
  User,
  Bell,
  Menu,
  Zap,
  Bot,
  HelpCircle,
  Globe,
  BarChart3,
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
  const { t } = useTranslation();

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
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            <div className="text-right">
              <div className="text-white font-bold text-lg">OCTA NETWORK</div>
              <div className="text-blue-100 text-xs">{t('developedBy')}</div>
            </div>
          </div>
        </div>

        {/* Center - Premium Status */}
        <div className="hidden lg:block">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-white font-medium">Professional License</span>
              <Badge className="bg-yellow-400 text-black text-xs">Premium</Badge>
            </div>
          </div>
        </div>

        {/* Right side - Navigation */}
        <div className="flex items-center space-x-2">
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button 
              variant="ghost"
              className="text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium"
              onClick={() => handleNavigation('dashboard')}
            >
              <BarChart3 className="h-4 w-4 ml-1" />
              {t('dashboard')}
            </Button>

            <Button 
              variant="ghost"
              className="text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium"
              onClick={() => handleNavigation('tools')}
            >
              <Zap className="h-4 w-4 ml-1" />
              {t('tools')}
            </Button>

            <Button 
              variant="ghost"
              className="text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium"
              onClick={() => handleNavigation('ai-assistant')}
            >
              <Bot className="h-4 w-4 ml-1" />
              {t('aiAssistant')}
            </Button>

            <Button 
              variant="ghost"
              className="text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium"
              onClick={() => handleNavigation('help')}
            >
              <HelpCircle className="h-4 w-4 ml-1" />
              {t('help')}
            </Button>
          </div>

          {/* Language and Theme */}
          <div className="flex items-center space-x-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile menu */}
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2 text-white hover:bg-white/20">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-b from-blue-600 to-purple-600 text-white">
                <SheetHeader>
                  <SheetTitle className="text-right text-lg text-white flex items-center justify-end space-x-2">
                    <span>قائمة التنقل</span>
                    <Crown className="h-5 w-5 text-yellow-400" />
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col space-y-4 mt-6">
                  {[
                    { id: 'dashboard', name: t('dashboard'), icon: BarChart3 },
                    { id: 'tools', name: t('tools'), icon: Zap },
                    { id: 'ai-assistant', name: t('aiAssistant'), icon: Bot },
                    { id: 'help', name: t('help'), icon: HelpCircle },
                    { id: 'settings', name: t('settings'), icon: Settings }
                  ].map((item) => (
                    <Button 
                      key={item.id}
                      variant="ghost" 
                      className="w-full justify-start text-right h-12 px-4 text-white hover:bg-white/20"
                      onClick={() => handleNavigation(item.id)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="mr-3 flex-1 text-right font-medium">{item.name}</span>
                    </Button>
                  ))}
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
