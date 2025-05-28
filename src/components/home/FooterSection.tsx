
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center mb-6">
          <Globe className="h-8 w-8 mr-3 text-blue-400" />
          <span className="text-2xl font-bold">OCTA NETWORK</span>
        </div>
        <p className="text-gray-400 mb-4">
          النظام الأكثر تقدماً في العالم لمراقبة وتأمين الشبكات
        </p>
        <div className="flex justify-center space-x-6">
          <Badge className="bg-blue-600 text-white">تطوير: Sajad Kadhim</Badge>
          <Badge className="bg-green-600 text-white">إصدار: 3.0.0</Badge>
          <Badge className="bg-purple-600 text-white">2024 ©</Badge>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
