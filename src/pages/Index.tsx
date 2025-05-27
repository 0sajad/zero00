
import React, { useState } from 'react';
import ModeSwitcher from '@/components/ModeSwitcher';
import ClientMode from '@/components/ClientMode';
import EnhancedDeveloperMode from '@/components/EnhancedDeveloperMode';
import LanguageToggle from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Index = () => {
  const [currentMode, setCurrentMode] = useState<'client' | 'developer' | null>(null);

  const handleModeSelect = (mode: 'client' | 'developer') => {
    setCurrentMode(mode);
  };

  const handleLogout = () => {
    setCurrentMode(null);
  };

  if (!currentMode) {
    return <ModeSwitcher onModeSelect={handleModeSelect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                OCTA NETWORK
              </h1>
              <span className="text-sm text-gray-500">
                {currentMode === 'client' ? 'وضع العميل' : 'وضع المطور المحسن'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button 
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>تسجيل خروج</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentMode === 'client' ? (
          <ClientMode />
        ) : (
          <EnhancedDeveloperMode />
        )}
      </main>
    </div>
  );
};

export default Index;
