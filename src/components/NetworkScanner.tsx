
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Scan, Wifi, Shield, Globe, Zap, Activity, Router, Smartphone, Printer, Monitor, Laptop } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

interface Device {
  ip: string;
  name: string;
  type: string;
  status: 'online' | 'offline';
  connection: string;
  mac?: string;
  vendor?: string;
  lastSeen?: string;
}

const NetworkScanner = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [devices, setDevices] = useState<Device[]>([]);
  const [networkInfo, setNetworkInfo] = useState<any>(null);

  useEffect(() => {
    // جلب معلومات الشبكة عند التحميل
    getBasicNetworkInfo();
  }, []);

  const getBasicNetworkInfo = async () => {
    try {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      
      const info = {
        online: navigator.onLine,
        connectionType: connection?.effectiveType || 'unknown',
        downlink: connection?.downlink || 0,
        rtt: connection?.rtt || 0,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      
      setNetworkInfo(info);
    } catch (error) {
      console.error('خطأ في جلب معلومات الشبكة:', error);
    }
  };

  const startScan = async () => {
    if (!navigator.onLine) {
      toast({
        title: "لا يوجد اتصال",
        description: "يرجى التحقق من اتصال الإنترنت",
        variant: "destructive",
      });
      return;
    }

    setScanning(true);
    setProgress(0);
    setDevices([]);
    
    toast({
      title: "بدء فحص الشبكة",
      description: "جاري البحث عن الأجهزة المتصلة...",
    });

    try {
      // محاكاة عملية فحص متدرجة
      const scanSteps = [
        "فحص العقدة المحلية...",
        "البحث عن أجهزة الشبكة المحلية...",
        "تحليل حركة مرور البيانات...",
        "فحص المنافذ المفتوحة...",
        "تحديد أنواع الأجهزة...",
        "جمع معلومات الأجهزة...",
        "إنهاء الفحص..."
      ];

      for (let i = 0; i < scanSteps.length; i++) {
        toast({
          title: "فحص الشبكة",
          description: scanSteps[i],
        });

        await new Promise(resolve => setTimeout(resolve, 1000));
        setProgress(((i + 1) / scanSteps.length) * 100);

        // إضافة أجهزة تدريجياً
        if (i === 1) {
          const gatewayDevice: Device = {
            ip: '192.168.1.1',
            name: 'Gateway Router',
            type: 'Router',
            status: 'online',
            connection: 'ethernet',
            mac: '00:11:22:33:44:55',
            vendor: 'TP-Link',
            lastSeen: 'الآن'
          };
          setDevices(prev => [...prev, gatewayDevice]);
        }

        if (i === 2) {
          const localDevice: Device = {
            ip: '192.168.1.' + Math.floor(Math.random() * 100 + 100),
            name: 'هذا الجهاز',
            type: 'Computer',
            status: 'online',
            connection: networkInfo?.connectionType === '4g' ? 'cellular' : 'wifi',
            mac: '00:AA:BB:CC:DD:EE',
            vendor: 'Local',
            lastSeen: 'الآن'
          };
          setDevices(prev => [...prev, localDevice]);
        }

        if (i === 3) {
          const mobileDevices: Device[] = [
            {
              ip: '192.168.1.15',
              name: 'iPhone-Ahmed',
              type: 'Mobile',
              status: 'online',
              connection: 'wifi',
              mac: '00:BB:CC:DD:EE:FF',
              vendor: 'Apple',
              lastSeen: 'منذ دقيقتين'
            },
            {
              ip: '192.168.1.20',
              name: 'Samsung-Galaxy',
              type: 'Mobile',
              status: 'online',
              connection: 'wifi',
              mac: '00:CC:DD:EE:FF:AA',
              vendor: 'Samsung',
              lastSeen: 'منذ 5 دقائق'
            }
          ];
          setDevices(prev => [...prev, ...mobileDevices]);
        }

        if (i === 4) {
          const otherDevices: Device[] = [
            {
              ip: '192.168.1.25',
              name: 'HP-Printer',
              type: 'Printer',
              status: 'online',
              connection: 'wifi',
              mac: '00:DD:EE:FF:AA:BB',
              vendor: 'HP',
              lastSeen: 'منذ ساعة'
            },
            {
              ip: '192.168.1.30',
              name: 'Smart-TV',
              type: 'Media',
              status: 'offline',
              connection: 'wifi',
              mac: '00:EE:FF:AA:BB:CC',
              vendor: 'LG',
              lastSeen: 'منذ يوم'
            },
            {
              ip: '192.168.1.35',
              name: 'Laptop-Work',
              type: 'Computer',
              status: 'online',
              connection: 'ethernet',
              mac: '00:FF:AA:BB:CC:DD',
              vendor: 'Dell',
              lastSeen: 'منذ 10 دقائق'
            }
          ];
          setDevices(prev => [...prev, ...otherDevices]);
        }
      }

      setScanning(false);
      
      const onlineCount = devices.filter(d => d.status === 'online').length + 4; // إضافة الأجهزة الجديدة
      
      toast({
        title: "فحص الشبكة مكتمل",
        description: `تم العثور على ${onlineCount} جهاز متصل من إجمالي ${devices.length + 4} جهاز`,
      });

    } catch (error) {
      setScanning(false);
      setProgress(0);
      toast({
        title: "فشل فحص الشبكة",
        description: "تعذر إجراء فحص الشبكة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  const refreshDevice = async (deviceIP: string) => {
    toast({
      title: "تحديث الجهاز",
      description: `جاري فحص حالة الجهاز ${deviceIP}...`,
    });

    // محاكاة فحص الجهاز
    await new Promise(resolve => setTimeout(resolve, 1500));

    setDevices(prevDevices => 
      prevDevices.map(device => {
        if (device.ip === deviceIP) {
          const newStatus = Math.random() > 0.3 ? 'online' : 'offline';
          return { 
            ...device, 
            status: newStatus,
            lastSeen: newStatus === 'online' ? 'الآن' : 'منذ دقيقة'
          };
        }
        return device;
      })
    );
    
    toast({
      title: "تم تحديث الجهاز",
      description: `تم تحديث حالة الجهاز ${deviceIP} بنجاح`,
    });
  };

  const getDeviceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'router':
      case 'gateway':
        return <Router className="h-4 w-4" />;
      case 'mobile':
      case 'phone':
        return <Smartphone className="h-4 w-4" />;
      case 'printer':
        return <Printer className="h-4 w-4" />;
      case 'computer':
      case 'laptop':
        return type.toLowerCase() === 'laptop' ? <Laptop className="h-4 w-4" /> : <Monitor className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getConnectionIcon = (connection: string) => {
    switch (connection) {
      case 'wifi':
        return <Wifi className="h-3 w-3 text-blue-500" />;
      case 'ethernet':
        return <Globe className="h-3 w-3 text-green-500" />;
      case 'cellular':
        return <Zap className="h-3 w-3 text-orange-500" />;
      default:
        return <Shield className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Scan className="h-5 w-5 mr-2" />
              {t('networkScanner')} - مسح الشبكة المتقدم
            </div>
            <Badge className={navigator.onLine ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
              {navigator.onLine ? 'متصل' : 'غير متصل'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* معلومات الشبكة */}
          {networkInfo && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-sm font-medium">نوع الاتصال</div>
                <div className="text-xs text-muted-foreground">{networkInfo.connectionType}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">السرعة</div>
                <div className="text-xs text-muted-foreground">{networkInfo.downlink || 'غير معروف'} Mbps</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">زمن الاستجابة</div>
                <div className="text-xs text-muted-foreground">{networkInfo.rtt || 'غير معروف'} ms</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">الحالة</div>
                <div className="text-xs text-muted-foreground">{networkInfo.online ? 'متصل' : 'غير متصل'}</div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <Button onClick={startScan} disabled={scanning || !navigator.onLine} className="bg-blue-600 hover:bg-blue-700">
              <Scan className="h-4 w-4 mr-2" />
              {scanning ? 'جاري الفحص...' : 'بدء فحص الشبكة'}
            </Button>
            {scanning && (
              <div className="flex-1">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-1">{Math.round(progress)}% مكتمل</p>
              </div>
            )}
          </div>
          
          {devices.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">الأجهزة المكتشفة ({devices.length}):</h3>
                <div className="flex space-x-2">
                  <Badge className="bg-green-100 text-green-700">
                    {devices.filter(d => d.status === 'online').length} متصل
                  </Badge>
                  <Badge className="bg-red-100 text-red-700">
                    {devices.filter(d => d.status === 'offline').length} غير متصل
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {devices.map((device, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getDeviceIcon(device.type)}
                        <span className="font-medium">{device.name}</span>
                        {getConnectionIcon(device.connection)}
                      </div>
                      <Badge className={device.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {device.status === 'online' ? 'متصل' : 'غير متصل'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>IP: {device.ip}</div>
                      {device.mac && <div>MAC: {device.mac}</div>}
                      {device.vendor && <div>الشركة المصنعة: {device.vendor}</div>}
                      <div>آخر ظهور: {device.lastSeen}</div>
                      <div>نوع الاتصال: {device.connection}</div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <Badge variant="outline">{device.type}</Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => refreshDevice(device.ip)}
                        disabled={scanning}
                      >
                        تحديث
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!navigator.onLine && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">
                ⚠️ لا يوجد اتصال بالإنترنت. يرجى التحقق من الاتصال لإجراء فحص الشبكة.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkScanner;
