
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Radar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TrafficTab = () => {
  const { toast } = useToast();

  const runTrafficAnalysis = () => {
    toast({
      title: "تحليل حركة المرور",
      description: "جاري تحليل أنماط حركة البيانات...",
    });

    setTimeout(() => {
      const traffic = {
        totalPackets: Math.floor(Math.random() * 10000 + 50000),
        protocols: {
          http: Math.floor(Math.random() * 40 + 30),
          https: Math.floor(Math.random() * 30 + 40),
          ftp: Math.floor(Math.random() * 5 + 2),
          ssh: Math.floor(Math.random() * 3 + 1),
          dns: Math.floor(Math.random() * 10 + 5)
        },
        anomalies: Math.floor(Math.random() * 5),
        suspicious: Math.floor(Math.random() * 2)
      };

      console.log('Traffic Analysis:', traffic);
      
      toast({
        title: "تحليل المرور مكتمل",
        description: `تم تحليل ${traffic.totalPackets.toLocaleString()} حزمة، ${traffic.anomalies} شذوذ مكتشف`,
      });
    }, 3500);
  };

  return (
    <div className="text-center space-y-6">
      <h3 className="text-xl font-bold">تحليل حركة مرور الشبكة</h3>
      <p className="text-muted-foreground">مراقبة وتحليل أنماط حركة البيانات</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Activity className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h4 className="font-semibold mb-2">تحليل المرور</h4>
            <p className="text-sm text-muted-foreground mb-4">
              تحليل حزم البيانات والبروتوكولات
            </p>
            <Button onClick={runTrafficAnalysis} className="w-full">
              بدء التحليل
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Radar className="h-12 w-12 mx-auto mb-4 text-orange-600" />
            <h4 className="font-semibold mb-2">كشف الشذوذ</h4>
            <p className="text-sm text-muted-foreground mb-4">
              اكتشاف الأنشطة المشبوهة
            </p>
            <Button variant="outline" className="w-full">
              كشف التهديدات
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrafficTab;
