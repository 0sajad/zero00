
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PasswordModal from './PasswordModal';
import ModeCard from './ModeCard';
import { 
  Shield,
  Globe,
  Server,
  Zap
} from 'lucide-react';

interface ModeSwitcherProps {
  onModeSelect: (mode: 'client' | 'developer') => void;
}

const ModeSwitcher = ({ onModeSelect }: ModeSwitcherProps) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleDeveloperMode = (password: string) => {
    if (password === '1996') {
      onModeSelect('developer');
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="w-full max-w-5xl relative z-10">
        <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-xl border border-white/20">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto w-28 h-28 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl relative">
              <Shield className="h-14 w-14 text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-5xl font-bold text-white mb-4 tracking-wide">
                OCTA NETWORK
              </CardTitle>
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-4 py-2">
                  <Server className="h-4 w-4 mr-2" />
                  Enterprise Edition
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-2">
                  <Zap className="h-4 w-4 mr-2" />
                  Professional
                </Badge>
              </div>
              <p className="text-blue-200 text-xl font-medium">اختر وضع الدخول المناسب</p>
              <p className="text-blue-300 text-base mt-2">منصة مراقبة الشبكات المتطورة والذكية</p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8 px-8 pb-8">
            {!showPasswordInput ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ModeCard 
                  mode="client"
                  onSelect={() => onModeSelect('client')}
                />
                <ModeCard 
                  mode="developer"
                  onSelect={() => setShowPasswordInput(true)}
                />
              </div>
            ) : (
              <PasswordModal
                onSubmit={handleDeveloperMode}
                onCancel={() => setShowPasswordInput(false)}
              />
            )}

            <div className="text-center pt-6 border-t border-white/20">
              <p className="text-white/90 text-lg font-bold">
                OCTA NETWORK
              </p>
              <p className="text-white/70 text-sm mt-2">
                مطور بواسطة Sajad Kadhim
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModeSwitcher;
