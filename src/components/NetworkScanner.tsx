
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Scan, Wifi, Shield, Globe, Zap, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NetworkScanner = () => {
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [devices, setDevices] = useState([]);

  const startScan = () => {
    setScanning(true);
    setProgress(0);
    setDevices([]);
    
    // Simulate scanning process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          // Add mock devices
          setDevices([
            { ip: '192.168.1.1', name: 'Router', type: 'Gateway', status: 'online' },
            { ip: '192.168.1.10', name: 'Laptop', type: 'Computer', status: 'online' },
            { ip: '192.168.1.15', name: 'Phone', type: 'Mobile', status: 'online' },
            { ip: '192.168.1.20', name: 'Printer', type: 'Device', status: 'offline' }
          ]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Scan className="h-5 w-5 mr-2" />
            {t('networkScanner')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button onClick={startScan} disabled={scanning}>
              {scanning ? 'جاري الفحص...' : 'بدء فحص الشبكة'}
            </Button>
            {scanning && (
              <div className="flex-1">
                <Progress value={progress} className="w-full" />
              </div>
            )}
          </div>
          
          {devices.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">الأجهزة المكتشفة:</h3>
              {devices.map((device, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-4 w-4" />
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-sm text-muted-foreground">{device.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={device.status === 'online' ? 'default' : 'secondary'}>
                      {device.type}
                    </Badge>
                    <Badge className={device.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {device.status === 'online' ? 'متصل' : 'غير متصل'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkScanner;
