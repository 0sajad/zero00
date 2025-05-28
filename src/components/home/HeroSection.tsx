
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Globe, Sparkles } from 'lucide-react';
import EnhancedModeSwitcher from '@/components/auth/EnhancedModeSwitcher';
import LoadingAnimation from '@/components/enhanced-ui/LoadingAnimation';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative octa-fade-in-up">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center octa-pulse-blue">
              <Globe className="h-12 w-12 text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 octa-text-glow octa-fade-in-up">
          OCTA NETWORK
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-200 max-w-4xl mx-auto octa-fade-in-up">
          النظام الأكثر تقدماً في التاريخ الرقمي لمراقبة وتأمين وتحليل الشبكات باستخدام الذكاء الاصطناعي المتطور
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8 octa-fade-in-up">
          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 text-lg octa-pulse-green">
            ✅ AI-Powered
          </Badge>
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 text-lg octa-pulse-red">
            🔒 Military-Grade Security
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 text-lg octa-pulse-blue">
            ⚡ Real-Time Monitoring
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 text-lg">
            🚀 Future Technology
          </Badge>
        </div>
        
        <div className="mb-8 octa-fade-in-up">
          <LoadingAnimation type="server" size="md" />
        </div>
        
        <EnhancedModeSwitcher onLogin={async () => true} />
      </div>
    </div>
  );
};

export default HeroSection;
