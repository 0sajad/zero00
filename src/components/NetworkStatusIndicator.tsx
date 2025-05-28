
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, Activity, CheckCircle } from 'lucide-react';

const NetworkStatusIndicator = () => {
  const connectionStatus = {
    isOnline: navigator.onLine,
    quality: 'ممتاز',
    signalStrength: 95,
    latency: '12ms',
    bandwidth: '850 Mbps'
  };

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center">
          <Wifi className="h-5 w-5 mr-2 text-green-600" />
          حالة الاتصال المباشر
          <Badge className="ml-2 bg-green-100 text-green-700">
            مباشر
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">حالة الشبكة:</span>
            <div className="flex items-center">
              {connectionStatus.isOnline ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-semibold">متصل</span>
                </>
              ) : (
                <>
                  <Activity className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-600 font-semibold">غير متصل</span>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-lg font-bold text-blue-600">{connectionStatus.signalStrength}%</div>
              <div className="text-xs text-gray-600">قوة الإشارة</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-lg font-bold text-green-600">{connectionStatus.latency}</div>
              <div className="text-xs text-gray-600">زمن الاستجابة</div>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="text-sm font-medium text-blue-800 mb-1">معلومات الاتصال:</div>
            <div className="text-xs text-blue-700">
              <div>السرعة: {connectionStatus.bandwidth}</div>
              <div>الجودة: {connectionStatus.quality}</div>
              <div>النوع: {(navigator as any).connection?.effectiveType || 'غير محدد'}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatusIndicator;
