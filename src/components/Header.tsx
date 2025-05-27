
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
  Shield,
  Star,
  Wifi,
  Activity
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
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 border-b border-slate-700 px-4 py-3 sticky top-0 z-50 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Logo Section - New Design */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/20 shadow-lg">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <Wifi className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-xl tracking-wide">OCTA NETWORK</div>
              <div className="text-blue-200 text-xs font-medium">{t('developedBy')}</div>
            </div>
          </div>
        </div>

        {/* Center Status - New Design */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-400 animate-pulse" />
              <span className="text-white font-semibold">Professional System</span>
            </div>
            <div className="w-px h-6 bg-white/30"></div>
            <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold px-3 py-1 rounded-full">
              <Star className="h-3 w-3 mr-1" />
              PREMIUM
            </Badge>
          </div>
        </div>

        {/* Right Navigation - Enhanced */}
        <div className="flex items-center space-x-3">
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button 
              variant="ghost"
              className="text-white hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent hover:border-white/30"
              onClick={() => handleNavigation('dashboard')}
            >
              <BarChart3 className="h-4 w-4 ml-2" />
              {t('dashboard')}
            </Button>

            <Button 
              variant="ghost"
              className="text-white hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent hover:border-white/30"
              onClick={() => handleNavigation('tools')}
            >
              <Zap className="h-4 w-4 ml-2" />
              {t('tools')}
            </Button>

            <Button 
              variant="ghost"
              className="text-white hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent hover:border-white/30"
              onClick={() => handleNavigation('security')}
            >
              <Shield className="h-4 w-4 ml-2" />
              {t('security')}
            </Button>

            <Button 
              variant="ghost"
              className="text-white hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent hover:border-white/30"
              onClick={() => handleNavigation('help')}
            >
              <HelpCircle className="h-4 w-4 ml-2" />
              {t('help')}
            </Button>
          </div>

          {/* Controls Section */}
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 border border-white/20">
            <LanguageToggle />
            <div className="w-px h-6 bg-white/30"></div>
            <ThemeToggle />
          </div>

          {/* Mobile menu */}
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-3 text-white hover:bg-white/20 rounded-xl border border-white/20">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-b from-slate-900 to-blue-900 text-white border-l border-white/20">
                <SheetHeader>
                  <SheetTitle className="text-right text-xl text-white flex items-center justify-end space-x-3">
                    <span>قائمة التنقل المتطورة</span>
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <Wifi className="h-5 w-5 text-white" />
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col space-y-3 mt-8">
                  {[
                    { id: 'dashboard', name: t('dashboard'), icon: BarChart3 },
                    { id: 'tools', name: t('tools'), icon: Zap },
                    { id: 'security', name: t('security'), icon: Shield },
                    { id: 'ai-assistant', name: t('aiAssistant'), icon: Bot },
                    { id: 'help', name: t('help'), icon: HelpCircle },
                    { id: 'settings', name: t('settings'), icon: Settings }
                  ].map((item) => (
                    <Button 
                      key={item.id}
                      variant="ghost" 
                      className="w-full justify-start text-right h-14 px-4 text-white hover:bg-white/20 rounded-xl border border-transparent hover:border-white/30 transition-all duration-200"
                      onClick={() => handleNavigation(item.id)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="mr-4 flex-1 text-right font-medium text-lg">{item.name}</span>
                    </Button>
                  ))}
                </div>

                <div className="absolute bottom-6 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                    <div className="text-white font-semibold">OCTA NETWORK</div>
                    <div className="text-blue-200 text-sm">Professional Edition</div>
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
