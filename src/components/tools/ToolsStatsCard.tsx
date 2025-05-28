
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

const ToolsStatsCard = () => {
  const stats = [
    { label: 'أدوات الشبكة', count: 6, color: 'bg-blue-50' },
    { label: 'أدوات الأمان', count: 6, color: 'bg-red-50' },
    { label: 'أدوات النظام', count: 6, color: 'bg-purple-50' },
    { label: 'أدوات التحليل', count: 6, color: 'bg-orange-50' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          إحصائيات الأدوات المتقدمة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center p-4 ${stat.color} rounded-lg`}>
              <div className="text-2xl font-bold text-blue-600">{stat.count}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolsStatsCard;
