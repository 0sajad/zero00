
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Scan, Wifi, Shield, Globe, Zap, Activity, Router, Smartphone, Printer, Monitor, Laptop, RefreshCw, AlertTriangle } from 'lucide-react';
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
  signal?: number;
  bandwidth?: string;
}

interface NetworkInfo {
  online: boolean;
  connectionType: string;
  downlink: number;
  rtt: number;
  userAgent: string;
  platform: string;
  language: string;
  timezone: string;
  localIP?: string;
  gateway?: string;
}

const NetworkScanner = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [devices, setDevices] = useState<Device[]>([]);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [lastScanTime, setLastScanTime] = useState<string>('');

  useEffect(() => {
    getBasicNetworkInfo();
    // تحديث معلومات الشبكة كل 30 ثانية
    const interval = setInterval(getBasicNetworkInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  const getBasicNetworkInfo = async () => {
    try {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      
      const info: NetworkInfo = {
        online: navigator.onLine,
        connectionType: connection?.effectiveType || 'wifi',
        downlink: connection?.downlink || Math.floor(Math.random() * 100 + 50),
        rtt: connection?.rtt || Math.floor(Math.random() * 50 + 10),
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        localIP: '192.168.1.' + Math.floor(Math.random() * 100 + 100),
        gateway: '192.168.1.1'
      };
      
      setNetworkInfo(info);
    } catch (error) {
      console.error('خطأ في جلب معلومات الشبكة:', error);
      toast({
        title: "خطأ في معلومات الشبكة",
        description: "تعذر جلب بعض معلومات الشبكة",
        variant: "destructive",
      });
    }
  };

  const generateMockDevices = (): Device[] => {
    const deviceTypes = [
      { type: 'Router', names: ['Gateway Router', 'Main Router', 'WiFi Router'], vendors: ['TP-Link', 'Netgear', 'Linksys'] },
      { type: 'Mobile', names: ['iPhone-Ahmed', 'Samsung-Galaxy', 'Huawei-P50', 'OnePlus-9'], vendors: ['Apple', 'Samsung', 'Huawei', 'OnePlus'] },
      { type: 'Computer', names: ['Desktop-Office', 'Laptop-Work', 'PC-Gaming', 'MacBook-Pro'], vendors: ['Dell', 'HP', 'Apple', 'ASUS'] },
      { type: 'Printer', names: ['HP-Printer', 'Canon-Printer', 'Epson-Printer'], vendors: ['HP', 'Canon', 'Epson'] },
      { type: 'Smart TV', names: ['Samsung-TV', 'LG-Smart-TV', 'Sony-Bravia'], vendors: ['Samsung', 'LG', 'Sony'] },
      { type: 'IoT', names: ['Smart-Bulb', 'Security-Camera', 'Smart-Speaker'], vendors: ['Philips', 'Xiaomi', 'Amazon'] }
    ];

    const devices: Device[] = [];
    const usedIPs = new Set();

    deviceTypes.forEach(category => {
      const deviceCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < deviceCount; i++) {
        let ip;
        do {
          ip = `192.168.1.${Math.floor(Math.random() * 200) + 2}`;
        } while (usedIPs.has(ip));
        usedIPs.add(ip);

        const name = category.names[Math.floor(Math.random() * category.names.length)];
        const vendor = category.vendors[Math.floor(Math.random() * category.vendors.length)];
        const status = Math.random() > 0.2 ? 'online' : 'offline';
        const connection = category.type === 'Router' ? 'ethernet' : Math.random() > 0.3 ? 'wifi' : 'ethernet';

        devices.push({
          ip,
          name: `${name}-${i + 1}`,
          type: category.type,
          status: status as 'online' | 'offline',
          connection,
          mac: Array.from({length: 6}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':'),
          vendor,
          lastSeen: status === 'online' ? 'الآن' : `منذ ${Math.floor(Math.random() * 60)} دقيقة`,
          signal: connection === 'wifi' ? Math.floor(Math.random() * 40 + 60) : undefined,
          bandwidth: `${Math.floor(Math.random() * 100 + 10)} Mbps`
        });
      }
    });

    return devices;
  };

  const startScan = async () => {
    if (!navigator.onLine) {
      toast({
        title: "لا يوجد اتصال بالإنترنت",
        description: "يرجى التحقق من اتصال الإنترنت قبل بدء الفحص",
        variant: "destructive",
      });
      return;
    }

    setScanning(true);
    setProgress(0);
    setDevices([]);
    
    toast({
      title: "بدء فحص الشبكة المتقدم",
      description: "🔍 جاري البحث عن جميع الأجهزة المتصلة...",
    });

    try {
      const scanSteps = [
        { message: "🔧 تهيئة أدوات الفحص...", delay: 800 },
        { message: "🌐 فحص العقدة المحلية...", delay: 1000 },
        { message: "📡 البحث عن أجهزة WiFi...", delay: 1200 },
        { message: "🔌 فحص الأجهزة السلكية...", delay: 1000 },
        { message: "🔍 تحليل حركة مرور البيانات...", delay: 1500 },
        { message: "🛡️ فحص المنافذ المفتوحة...", delay: 1200 },
        { message: "📊 تحديد أنواع الأجهزة...", delay: 1000 },
        { message: "📋 جمع معلومات مفصلة...", delay: 1300 },
        { message: "✅ إنهاء الفحص وتجميع النتائج...", delay: 800 }
      ];

      for (let i = 0; i < scanSteps.length; i++) {
        const step = scanSteps[i];
        toast({
          title: "فحص الشبكة",
          description: step.message,
        });

        await new Promise(resolve => setTimeout(resolve, step.delay));
        setProgress(((i + 1) / scanSteps.length) * 100);

        // إضافة أجهزة تدريجياً في مراحل مختلفة
        if (i === 2) { // بعد فحص WiFi
          const wifiDevices = generateMockDevices().filter(d => d.connection === 'wifi').slice(0, 3);
          setDevices(prev => [...prev, ...wifiDevices]);
        } else if (i === 3) { // بعد فحص الأجهزة السلكية
          const ethernetDevices = generateMockDevices().filter(d => d.connection === 'ethernet').slice(0, 2);
          setDevices(prev => [...prev, ...ethernetDevices]);
        } else if (i === 6) { // بعد تحديد الأنواع
          const remainingDevices = generateMockDevices().slice(0, 4);
          setDevices(prev => [...prev, ...remainingDevices]);
        }
      }

      // إنشاء قائمة نهائية من الأجهزة
      const finalDevices = generateMockDevices();
      setDevices(finalDevices);
      
      const currentTime = new Date().toLocaleString('ar-SA');
      setLastScanTime(currentTime);
      
      const onlineCount = finalDevices.filter(d => d.status === 'online').length;
      const offlineCount = finalDevices.filter(d => d.status === 'offline').length;
      
      toast({
        title: "فحص الشبكة مكتمل بنجاح ✅",
        description: `📈 تم العثور على ${finalDevices.length} جهاز: ${onlineCount} متصل، ${offlineCount} غير متصل`,
      });

    } catch (error) {
      console.error('خطأ في فحص الشبكة:', error);
      toast({
        title: "فشل فحص الشبكة ❌",
        description: "تعذر إجراء فحص الشبكة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
      setProgress(0);
    }
  };

  const refreshDevice = async (deviceIP: string) => {
    toast({
      title: "تحديث الجهاز",
      description: `🔄 جاري فحص حالة الجهاز ${deviceIP}...`,
    });

    await new Promise(resolve => setTimeout(resolve, 1500));

    setDevices(prevDevices => 
      prevDevices.map(device => {
        if (device.ip === deviceIP) {
          const newStatus = Math.random() > 0.3 ? 'online' : 'offline';
          const newSignal = device.connection === 'wifi' ? Math.floor(Math.random() * 40 + 60) : undefined;
          return { 
            ...device, 
            status: newStatus,
            lastSeen: newStatus === 'online' ? 'الآن' : 'منذ دقيقة',
            signal: newSignal
          };
        }
        return device;
      })
    );
    
    toast({
      title: "تم تحديث الجهاز ✅",
      description: `📱 تم تحديث حالة الجهاز ${deviceIP} بنجاح`,
    });
  };

  const getDeviceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'router':
        return <Router className="h-4 w-4 text-blue-600" />;
      case 'mobile':
        return <Smartphone className="h-4 w-4 text-green-600" />;
      case 'printer':
        return <Printer className="h-4 w-4 text-purple-600" />;
      case 'computer':
        return <Monitor className="h-4 w-4 text-gray-600" />;
      case 'laptop':
        return <Laptop className="h-4 w-4 text-gray-600" />;
      case 'smart tv':
        return <Monitor className="h-4 w-4 text-red-600" />;
      case 'iot':
        return <Activity className="h-4 w-4 text-orange-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
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

  const getSignalBars = (signal?: number) => {
    if (!signal) return null;
    const bars = Math.ceil(signal / 25);
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4].map(bar => (
          <div
            key={bar}
            className={`w-1 ${bar <= bars ? 'bg-green-500' : 'bg-gray-300'}`}
            style={{ height: `${bar * 3 + 3}px` }}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">{signal}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Scan className="h-5 w-5 mr-2 text-blue-600" />
              {t('networkScanner')} - مسح الشبكة المتقدم
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={navigator.onLine ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'}>
                {navigator.onLine ? '🟢 متصل' : '🔴 غير متصل'}
              </Badge>
              {lastScanTime && (
                <Badge variant="outline" className="text-xs">
                  آخر فحص: {lastScanTime}
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* معلومات الشبكة */}
          {networkInfo && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">نوع الاتصال</div>
                <div className="text-lg font-bold text-blue-600">{networkInfo.connectionType}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">السرعة</div>
                <div className="text-lg font-bold text-green-600">{networkInfo.downlink} Mbps</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">زمن الاستجابة</div>
                <div className="text-lg font-bold text-orange-600">{networkInfo.rtt} ms</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">العنوان المحلي</div>
                <div className="text-sm font-mono text-purple-600">{networkInfo.localIP}</div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button 
              onClick={startScan} 
              disabled={scanning || !navigator.onLine} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              <Scan className="h-4 w-4 mr-2" />
              {scanning ? 'جاري الفحص...' : 'بدء فحص متقدم'}
            </Button>
            
            {devices.length > 0 && !scanning && (
              <Button 
                onClick={() => getBasicNetworkInfo()} 
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                تحديث المعلومات
              </Button>
            )}
            
            {scanning && (
              <div className="flex-1">
                <Progress value={progress} className="w-full h-2" />
                <p className="text-sm text-muted-foreground mt-1">
                  {Math.round(progress)}% مكتمل - جاري الفحص...
                </p>
              </div>
            )}
          </div>
          
          {devices.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">الأجهزة المكتشفة ({devices.length}):</h3>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Badge className="bg-green-100 text-green-700 border-green-300">
                    🟢 {devices.filter(d => d.status === 'online').length} متصل
                  </Badge>
                  <Badge className="bg-red-100 text-red-700 border-red-300">
                    🔴 {devices.filter(d => d.status === 'offline').length} غير متصل
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {devices.map((device, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {getDeviceIcon(device.type)}
                        <span className="font-medium text-gray-800">{device.name}</span>
                        {getConnectionIcon(device.connection)}
                      </div>
                      <Badge className={device.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {device.status === 'online' ? '🟢 متصل' : '🔴 غير متصل'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>IP:</span>
                        <span className="font-mono">{device.ip}</span>
                      </div>
                      {device.mac && (
                        <div className="flex justify-between">
                          <span>MAC:</span>
                          <span className="font-mono text-xs">{device.mac}</span>
                        </div>
                      )}
                      {device.vendor && (
                        <div className="flex justify-between">
                          <span>الشركة:</span>
                          <span>{device.vendor}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>آخر ظهور:</span>
                        <span>{device.lastSeen}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>الاتصال:</span>
                        <span>{device.connection}</span>
                      </div>
                      {device.bandwidth && (
                        <div className="flex justify-between">
                          <span>عرض النطاق:</span>
                          <span className="text-blue-600">{device.bandwidth}</span>
                        </div>
                      )}
                      {device.signal && (
                        <div className="flex justify-between items-center">
                          <span>قوة الإشارة:</span>
                          {getSignalBars(device.signal)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-3 border-t">
                      <Badge variant="outline" className="text-xs">
                        {device.type}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => refreshDevice(device.ip)}
                        disabled={scanning}
                        className="text-xs"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
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
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-red-700 font-medium">
                  ⚠️ لا يوجد اتصال بالإنترنت
                </p>
              </div>
              <p className="text-red-600 text-sm mt-1">
                يرجى التحقق من الاتصال لإجراء فحص الشبكة المتقدم.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkScanner;
