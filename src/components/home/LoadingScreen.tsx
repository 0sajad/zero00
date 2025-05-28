
import React from 'react';
import LoadingAnimation from '@/components/enhanced-ui/LoadingAnimation';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="text-center space-y-8">
        <LoadingAnimation type="infinity" size="lg" />
        <div className="text-white space-y-4">
          <div className="text-3xl font-bold octa-text-glow">OCTA NETWORK</div>
          <div className="text-blue-300 text-lg">جاري تهيئة النظام المتقدم...</div>
          <LoadingAnimation type="robot" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
