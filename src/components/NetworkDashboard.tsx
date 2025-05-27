
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wifi, 
  Activity, 
  Users,
  Server,
  CheckCircle
} from 'lucide-react';

const NetworkDashboard = () => {
  const [networkStats, setNetworkStats] = useState({
    isOnline: true,
    speed: 850,
    ping: 12,
    uptime: 99.8,
    connectedDevices: 24
  });

  return (
    <div className="space-y-6">
      {/* Network Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">حالة الاتصال</p>
                <div className="flex items-center mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-lg font-bold text-green-700">متصل</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {networkStats.speed} Mbps
                </p>
              </div>
              <Wifi className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">زمن الاستجابة</p>
                <p className="text-2xl font-bold text-blue-700">{networkStats.ping}ms</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">ممتاز</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">الأجهزة المتصلة</p>
                <p className="text-2xl font-bold text-purple-700">{networkStats.connectedDevices}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  جهاز نشط
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">وقت التشغيل</p>
                <p className="text-2xl font-bold text-orange-700">{networkStats.uptime}%</p>
                <p className="text-xs text-muted-foreground mt-1">72 ساعة</p>
              </div>
              <Server className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            ملخص الشبكة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">استخدام النطاق الترددي</span>
              <Badge variant="outline">67%</Badge>
            </div>
            <Progress value={67} className="h-2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">850</div>
                <div className="text-sm text-blue-700">Mbps سرعة التحميل</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">400</div>
                <div className="text-sm text-green-700">Mbps سرعة الرفع</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">99.8%</div>
                <div className="text-sm text-purple-700">استقرار الاتصال</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkDashboard;
