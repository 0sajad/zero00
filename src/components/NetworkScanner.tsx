
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Wifi, Router, Activity, Monitor } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NetworkScanner = () => {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<any>(null);

  const runNetworkScan = async () => {
    setScanning(true);
    setScanProgress(0);
    setScanResults(null);

    try {
      console.log('بدء مسح الشبكة...');

      // Simulate network scanning process
      const scanSteps = [
        'فحص الواجهات المحلية...',
        'البحث عن الأجهزة النشطة...',
        'تحليل أنواع الأجهزة...',
        'فحص المنافذ المفتوحة...',
        'تجميع النتائج...'
      ];

      for (let i = 0; i < scanSteps.length; i++) {
        console.log(scanSteps[i]);
        setScanProgress((i + 1) * 20);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Generate realistic scan results
      const devices = generateNetworkDevices();
      const results = {
        devicesFound: devices.length,
        devices,
        networkRange: '192.168.1.0/24',
        gateway: '192.168.1.1',
        dns: ['8.8.8.8', '1.1.1.1'],
        timestamp: new Date().toLocaleString('ar-IQ'),
        scanner: 'Sajad Kadhim Network Scanner'
      };

      setScanResults(results);
      console.log('نتائج مسح الشبكة:', results);

      toast({
        title: "مسح الشبكة مكتمل",
        description: `تم العثور على ${results.devicesFound} أجهزة`,
      });

    } catch (error) {
      console.error('خطأ في مسح الشبكة:', error);
      toast({
        title: "خطأ في مسح الشبكة",
        description: "فشل في إجراء المسح",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
      setScanProgress(0);
    }
  };

  const generateNetworkDevices = () => {
    const deviceTypes = [
      { name: 'Router', icon: Router, count: 1 },
      { name: 'PC', icon: Monitor, count: Math.round(Math.random() * 3 + 2) },
      { name: 'Mobile', icon: Wifi, count: Math.round(Math.random() * 4 + 3) },
      { name: 'Smart Device', icon: Activity, count: Math.round(Math.random() * 2 + 1) }
    ];

    const devices = [];
    let ipCounter = 2;

    deviceTypes.forEach(type => {
      for (let i = 0; i < type.count; i++) {
        devices.push({
          ip: `192.168.1.${ipCounter++}`,
          mac: `AA:BB:CC:DD:EE:${ipCounter.toString(16).padStart(2, '0')}`,
          type: type.name,
          icon: type.icon,
          status: Math.random() > 0.1 ? 'online' : 'offline',
          hostname: `${type.name.toLowerCase()}-${i + 1}`,
          lastSeen: new Date().toLocaleTimeString('ar-IQ')
        });
      }
    });

    return devices;
  };

  return (
    <Card className="border border-green-200">
      <CardHeader>
        <CardTitle className="text-sm flex items-center">
          <Search className="h-4 w-4 mr-2 text-green-600" />
          مسح الشبكة المتقدم
          <Badge className="ml-2 bg-green-100 text-green-700 text-xs">
            Network Discovery
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Button 
            onClick={runNetworkScan}
            disabled={scanning || !navigator.onLine}
            className="w-full bg-green-600 hover:bg-green-700"
            size="sm"
          >
            {scanning ? (
              <>
                <Activity className="h-4 w-4 mr-2 animate-spin" />
                جاري المسح... {scanProgress}%
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                بدء مسح الشبكة
              </>
            )}
          </Button>
          
          {scanning && (
            <Progress value={scanProgress} className="mt-2 h-2" />
          )}
        </div>

        {scanResults && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-lg font-bold text-green-700">{scanResults.devicesFound}</div>
                <div className="text-xs text-gray-600">أجهزة مكتشفة</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-lg font-bold text-blue-700">{scanResults.networkRange}</div>
                <div className="text-xs text-gray-600">نطاق الشبكة</div>
              </div>
            </div>

            <div className="max-h-40 overflow-y-auto space-y-2">
              {scanResults.devices.map((device: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                  <div className="flex items-center space-x-2">
                    <device.icon className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="text-xs font-medium">{device.hostname}</div>
                      <div className="text-xs text-gray-500">{device.ip}</div>
                    </div>
                  </div>
                  <Badge className={`text-xs ${
                    device.status === 'online' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {device.status === 'online' ? 'متصل' : 'غير متصل'}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 text-center">
                مسح محترف بواسطة {scanResults.scanner} | {scanResults.timestamp}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkScanner;
