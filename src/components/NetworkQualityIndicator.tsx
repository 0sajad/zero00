
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

const NetworkQualityIndicator = () => {
  const qualityScore = 87;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (qualityScore / 100) * circumference;

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-600" />
          مؤشر جودة الشبكة
        </CardTitle>
        <p className="text-sm text-gray-600">تحليل مفصل لحالة وأداء الشبكة الحالية</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-8">
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#10b981"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">{qualityScore}</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-green-600 font-semibold">ممتاز</p>
          <p className="text-sm text-gray-500">الجودة:</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkQualityIndicator;
