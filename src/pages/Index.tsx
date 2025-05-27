import React, { useState, useEffect } from 'react';
import ModeSwitcher from '@/components/ModeSwitcher';
import EnhancedClientMode from '@/components/EnhancedClientMode';
import EnhancedDeveloperMode from '@/components/EnhancedDeveloperMode';
import HelpCenter from '@/components/HelpCenter';
import LanguageToggle from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { LogOut, HelpCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const [currentMode, setCurrentMode] = useState<'client' | 'developer' | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const handleModeSelect = (mode: 'client' | 'developer') => {
    setCurrentMode(mode);
  };

  const handleLogout = () => {
    setCurrentMode(null);
  };

  useEffect(() => {
    // Add any necessary side effects here
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-150">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                OCTA NETWORK
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentMode === 'client' ? t('clientMode') : t('developerMode')}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button 
                onClick={() => setShowHelp(true)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <HelpCircle className="h-4 w-4" />
                <span>{t('help')}</span>
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>{t('logout')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showHelp ? (
          <HelpCenter onBack={() => setShowHelp(false)} />
        ) : !currentMode ? (
          <ModeSwitcher onModeSelect={handleModeSelect} />
        ) : currentMode === 'client' ? (
          <EnhancedClientMode />
        ) : (
          <EnhancedDeveloperMode />
        )}
      </main>
    </div>
  );
};

export default Index;
