
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Router } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BandwidthTab = () => {
  const { toast } = useToast();
  const [bandwidthResults, setBandwidthResults] = useState<any>(null);

  const runBandwidthMonitor = async () => {
    toast({
      title: "مراقبة النطاق الترددي",
      description: "جاري تحليل استخدام النطاق الترددي...",
    });

    setTimeout(() => {
      const bandwidth = {
        totalBandwidth: (Math.random() * 100 + 50).toFixed(1),
        usedBandwidth: (Math.random() * 50 + 20).toFixed(1),
        availableBandwidth: (Math.random() * 30 + 20).toFixed(1),
        topUsers: [
          { device: 'Laptop-Ahmed', usage: '15.2 Mbps', percentage: 25 },
          { device: 'iPhone-Sara', usage: '8.7 Mbps', percentage: 14 },
          { device: 'Smart-TV', usage: '12.1 Mbps', percentage: 20 },
          { device: 'Gaming-PC', usage: '6.3 Mbps', percentage: 10 }
        ]
      };

      setBandwidthResults(bandwidth);
      
      toast({
        title: "مراقبة النطاق الترددي مكتملة",
        description: `إجمالي الاستخدام: ${bandwidth.usedBandwidth} Mbps من ${bandwidth.totalBandwidth} Mbps`,
      });
    }, 3000);
  };

  return (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-bold">مراقبة النطاق الترددي</h3>
      <p className="text-muted-foreground">تحليل استخدام النطاق الترددي في الوقت الفعلي</p>
      
      <Button onClick={runBandwidthMonitor} className="bg-blue-600 hover:bg-blue-700">
        <BarChart3 className="h-4 w-4 mr-2" />
        بدء مراقبة النطاق الترددي
      </Button>

      {bandwidthResults && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{bandwidthResults.totalBandwidth}</div>
                <div className="text-sm text-muted-foreground">Mbps إجمالي النطاق</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{bandwidthResults.usedBandwidth}</div>
                <div className="text-sm text-muted-foreground">Mbps مستخدم</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{bandwidthResults.availableBandwidth}</div>
                <div className="text-sm text-muted-foreground">Mbps متاح</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">أكبر المستخدمين للنطاق الترددي:</h4>
            {bandwidthResults.topUsers.map((user: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Router className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{user.device}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{user.usage}</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${user.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{user.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BandwidthTab;
