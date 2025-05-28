
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle, Zap, Shield, Eye } from 'lucide-react';

const SystemStatusSection = () => {
  return (
    <div className="container mx-auto px-6 mb-16">
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl md:text-3xl font-bold flex items-center justify-center">
            <Activity className="h-8 w-8 mr-3 text-green-400" />
            حالة النظام المباشرة
            <div className="ml-3 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-gray-300">وقت التشغيل</div>
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mt-2" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">2.3ms</div>
              <div className="text-gray-300">زمن الاستجابة</div>
              <Zap className="h-6 w-6 text-blue-400 mx-auto mt-2" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">847</div>
              <div className="text-gray-300">تهديدات محظورة</div>
              <Shield className="h-6 w-6 text-purple-400 mx-auto mt-2" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">15,432</div>
              <div className="text-gray-300">عمليات تحليل</div>
              <Eye className="h-6 w-6 text-orange-400 mx-auto mt-2" />
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Badge className="bg-green-500 text-white px-6 py-3 text-lg">
              <CheckCircle className="h-5 w-5 mr-2" />
              جميع الأنظمة تعمل بكفاءة مثلى
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatusSection;
