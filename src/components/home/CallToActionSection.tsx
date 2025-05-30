
import React from 'react';
import { Rocket, Eye } from 'lucide-react';
import AnimatedButton from '@/components/enhanced-ui/AnimatedButton';

const CallToActionSection = () => {
  return (
    <div className="container mx-auto px-6 mb-16 octa-fade-in-up">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 octa-text-glow">
          جاهز لتجربة المستقبل؟
        </h3>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          ادخل إلى عالم التقنية المتطورة واكتشف قوة OCTA NETWORK الحقيقية
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedButton 
            size="lg" 
            effect="pulse-blue"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
          >
            <Rocket className="h-5 w-5 mr-2" />
            ابدأ الآن
          </AnimatedButton>
          <AnimatedButton 
            size="lg" 
            variant="outline" 
            effect="glow"
            className="border-2 border-gray-300 hover:border-gray-400 px-8 py-4 text-lg"
          >
            <Eye className="h-5 w-5 mr-2" />
            شاهد العرض التوضيحي
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;
