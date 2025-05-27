
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Monitor, Smartphone } from 'lucide-react';

interface CompatibilityScoreCardProps {
  overallScore: number;
}

const getScoreColor = (score: number) => {
  if (score >= 95) return 'text-green-600 bg-green-50';
  if (score >= 85) return 'text-blue-600 bg-blue-50';
  if (score >= 70) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

export const CompatibilityScoreCard = ({ overallScore }: CompatibilityScoreCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>تقييم التوافق الشامل</span>
          <Badge className={`text-2xl px-4 py-2 ${getScoreColor(overallScore)}`}>
            {overallScore}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Server className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="font-semibold">خوادم الاستضافة</div>
            <div className="text-green-600">متوافق 100%</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Monitor className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="font-semibold">المتصفحات</div>
            <div className="text-blue-600">دعم شامل</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Smartphone className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="font-semibold">الأجهزة</div>
            <div className="text-purple-600">متجاوب تماماً</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
