
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Globe, Sparkles } from 'lucide-react';
import EnhancedModeSwitcher from '@/components/auth/EnhancedModeSwitcher';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <Globe className="h-12 w-12 text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          OCTA NETWORK
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-200 max-w-4xl mx-auto">
          النظام الأكثر تقدماً في التاريخ الرقمي لمراقبة وتأمين وتحليل الشبكات باستخدام الذكاء الاصطناعي المتطور
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 text-lg">
            ✅ AI-Powered
          </Badge>
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 text-lg">
            🔒 Military-Grade Security
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 text-lg">
            ⚡ Real-Time Monitoring
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 text-lg">
            🚀 Future Technology
          </Badge>
        </div>
        
        <EnhancedModeSwitcher onLogin={async () => true} />
      </div>
    </div>
  );
};

export default HeroSection;
