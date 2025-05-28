
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Network, 
  Wifi, 
  Router, 
  Server,
  Monitor,
  Smartphone,
  Laptop,
  Tablet,
  Printer,
  Camera,
  Shield,
  Eye,
  Activity,
  Signal,
  Globe,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { audioSystem } from '@/utils/audioSystem';
import { useToast } from '@/hooks/use-toast';

interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  mac: string;
  type: 'router' | 'computer' | 'phone' | 'tablet' | 'printer' | 'camera' | 'unknown';
  status: 'online' | 'offline' | 'warning';
  bandwidth: number;
  signalStrength: number;
  security: 'secure' | 'vulnerable' | 'unknown';
  os: string;
  vendor: string;
  lastSeen: Date;
}

interface NetworkPort {
  port: number;
  protocol: 'TCP' | 'UDP';
  service: string;
  status: 'open' | 'closed' | 'filtered';
  version: string;
}

interface SecurityThreat {
  id: string;
  type: 'intrusion' | 'malware' | 'suspicious' | 'vulnerability';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  source: string;
  timestamp: Date;
  resolved: boolean;
}

const AdvancedNetworkMonitor = () => {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [threats, setThreats] = useState<SecurityThreat[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null);
  const [devicePorts, setDevicePorts] = useState<NetworkPort[]>([]);
  const [filter, setFilter] = useState<'all' | 'online' | 'offline' | 'threats'>('all');
  const { toast } = useToast();

  useEffect(() => {
    // تحديث البيانات كل 5 ثوانٍ
    const interval = setInterval(() => {
      if (!isScanning) {
        updateDeviceStatus();
        updateThreats();
      }
    }, 5000);

    // تحميل البيانات الأولية
    loadInitialData();

    return () => clearInterval(interval);
  }, [isScanning]);

  const loadInitialData = () => {
    // محاكاة الأجهزة المتصلة
    const mockDevices: NetworkDevice[] = [
      {
        id: '1',
        name: 'راوتر رئيسي',
        ip: '192.168.1.1',
        mac: '00:11:22:33:44:55',
        type: 'router',
        status: 'online',
        bandwidth: 85.5,
        signalStrength: 95,
        security: 'secure',
        os: 'OpenWrt 22.03',
        vendor: 'TP-Link',
        lastSeen: new Date()
      },
      {
        id: '2',
        name: 'كمبيوتر العمل',
        ip: '192.168.1.100',
        mac: '00:11:22:33:44:56',
        type: 'computer',
        status: 'online',
        bandwidth: 45.2,
        signalStrength: 88,
        security: 'secure',
        os: 'Windows 11 Pro',
        vendor: 'Dell',
        lastSeen: new Date()
      },
      {
        id: '3',
        name: 'هاتف ذكي',
        ip: '192.168.1.101',
        mac: '00:11:22:33:44:57',
        type: 'phone',
        status: 'online',
        bandwidth: 12.8,
        signalStrength: 72,
        security: 'secure',
        os: 'Android 14',
        vendor: 'Samsung',
        lastSeen: new Date()
      },
      {
        id: '4',
        name: 'كاميرا مراقبة',
        ip: '192.168.1.150',
        mac: '00:11:22:33:44:58',
        type: 'camera',
        status: 'warning',
        bandwidth: 8.5,
        signalStrength: 45,
        security: 'vulnerable',
        os: 'Linux Embedded',
        vendor: 'Hikvision',
        lastSeen: new Date(Date.now() - 300000)
      },
      {
        id: '5',
        name: 'طابعة لاسلكية',
        ip: '192.168.1.120',
        mac: '00:11:22:33:44:59',
        type: 'printer',
        status: 'offline',
        bandwidth: 0,
        signalStrength: 0,
        security: 'unknown',
        os: 'Printer OS',
        vendor: 'HP',
        lastSeen: new Date(Date.now() - 1800000)
      }
    ];

    setDevices(mockDevices);

    // محاكاة التهديدات الأمنية
    const mockThreats: SecurityThreat[] = [
      {
        id: '1',
        type: 'intrusion',
        severity: 'medium',
        description: 'محاولة دخول غير مصرح بها من عنوان IP خارجي',
        source: '203.0.113.45',
        timestamp: new Date(Date.now() - 600000),
        resolved: false
      },
      {
        id: '2',
        type: 'vulnerability',
        severity: 'high',
        description: 'ثغرة أمنية في كاميرا المراقبة - تحديث البرنامج مطلوب',
        source: '192.168.1.150',
        timestamp: new Date(Date.now() - 1200000),
        resolved: false
      }
    ];

    setThreats(mockThreats);
  };

  const updateDeviceStatus = () => {
    setDevices(prev => prev.map(device => ({
      ...device,
      bandwidth: Math.max(0, device.bandwidth + (Math.random() - 0.5) * 10),
      signalStrength: Math.max(0, Math.min(100, device.signalStrength + (Math.random() - 0.5) * 5)),
      lastSeen: device.status === 'online' ? new Date() : device.lastSeen
    })));
  };

  const updateThreats = () => {
    // إضافة تهديدات عشوائية أحياناً
    if (Math.random() > 0.95) {
      const newThreat: SecurityThreat = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'suspicious' : 'intrusion',
        severity: Math.random() > 0.7 ? 'high' : 'medium',
        description: 'نشاط مشبوه تم اكتشافه في الشبكة',
        source: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
        timestamp: new Date(),
        resolved: false
      };

      setThreats(prev => [newThreat, ...prev].slice(0, 10));
      audioSystem.playSound('warning');
      
      toast({
        title: "تحذير أمني! ⚠️",
        description: newThreat.description,
        variant: "destructive",
      });
    }
  };

  const startNetworkScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    await audioSystem.playSound('scan');

    toast({
      title: "بدء فحص الشبكة 🔍",
      description: "جاري فحص جميع الأجهزة والمنافذ...",
    });

    // محاكاة عملية الفحص
    for (let i = 0; i <= 100; i += 2) {
      setScanProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // إضافة أجهزة جديدة أحياناً
    if (Math.random() > 0.7) {
      const newDevice: NetworkDevice = {
        id: Date.now().toString(),
        name: `جهاز جديد ${Math.floor(Math.random() * 1000)}`,
        ip: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
        mac: `00:${Math.floor(Math.random() * 255).toString(16)}:${Math.floor(Math.random() * 255).toString(16)}:${Math.floor(Math.random() * 255).toString(16)}:${Math.floor(Math.random() * 255).toString(16)}:${Math.floor(Math.random() * 255).toString(16)}`,
        type: 'unknown',
        status: 'online',
        bandwidth: Math.random() * 50,
        signalStrength: Math.random() * 100,
        security: 'unknown',
        os: 'غير معروف',
        vendor: 'غير معروف',
        lastSeen: new Date()
      };

      setDevices(prev => [...prev, newDevice]);
    }

    setIsScanning(false);
    await audioSystem.playSound('taskComplete');

    toast({
      title: "اكتمل فحص الشبكة ✅",
      description: `تم العثور على ${devices.length} جهاز متصل`,
    });
  };

  const scanDevicePorts = async (device: NetworkDevice) => {
    setSelectedDevice(device);
    await audioSystem.playSound('scan');

    // محاكاة فحص المنافذ
    const mockPorts: NetworkPort[] = [
      { port: 22, protocol: 'TCP', service: 'SSH', status: 'open', version: 'OpenSSH 8.9' },
      { port: 80, protocol: 'TCP', service: 'HTTP', status: 'open', version: 'nginx 1.20' },
      { port: 443, protocol: 'TCP', service: 'HTTPS', status: 'open', version: 'nginx 1.20' },
      { port: 8080, protocol: 'TCP', service: 'HTTP-Alt', status: 'closed', version: '' },
      { port: 3389, protocol: 'TCP', service: 'RDP', status: 'filtered', version: '' },
    ];

    setDevicePorts(mockPorts);

    toast({
      title: "فحص المنافذ مكتمل 🔍",
      description: `تم فحص ${mockPorts.length} منفذ على ${device.name}`,
    });
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'router': return <Router className="h-5 w-5" />;
      case 'computer': return <Monitor className="h-5 w-5" />;
      case 'phone': return <Smartphone className="h-5 w-5" />;
      case 'tablet': return <Tablet className="h-5 w-5" />;
      case 'printer': return <Printer className="h-5 w-5" />;
      case 'camera': return <Camera className="h-5 w-5" />;
      default: return <Network className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getSecurityColor = (security: string) => {
    switch (security) {
      case 'secure': return 'text-green-400';
      case 'vulnerable': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getThreatColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      default: return 'bg-blue-600';
    }
  };

  const filteredDevices = devices.filter(device => {
    switch (filter) {
      case 'online': return device.status === 'online';
      case 'offline': return device.status === 'offline';
      case 'threats': return device.security === 'vulnerable';
      default: return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🔍 مراقب الشبكة المتقدم
            </h1>
            <p className="text-blue-300 text-lg">
              مراقبة شاملة للأجهزة والأمان والتهديدات في الوقت الفعلي
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={startNetworkScan}
              disabled={isScanning}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  جاري الفحص... {scanProgress}%
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  فحص شامل للشبكة
                </>
              )}
            </Button>
          </div>
        </div>
        
        {isScanning && (
          <div className="mt-4">
            <Progress value={scanProgress} className="h-2" />
          </div>
        )}
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-900/20 to-green-600/20 border-green-500/30">
          <CardContent className="p-6 text-center">
            <Network className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">{devices.filter(d => d.status === 'online').length}</div>
            <div className="text-green-300 text-sm">أجهزة متصلة</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-900/20 to-red-600/20 border-red-500/30">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-400" />
            <div className="text-2xl font-bold text-white">{threats.filter(t => !t.resolved).length}</div>
            <div className="text-red-300 text-sm">تهديدات نشطة</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-600/20 border-yellow-500/30">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-white">{devices.filter(d => d.security === 'vulnerable').length}</div>
            <div className="text-yellow-300 text-sm">أجهزة معرضة للخطر</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-600/20 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">{devices.reduce((sum, d) => sum + d.bandwidth, 0).toFixed(1)}</div>
            <div className="text-blue-300 text-sm">Mbps إجمالي الاستخدام</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قائمة الأجهزة */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Network className="h-6 w-6 mr-2 text-blue-400" />
                  الأجهزة المتصلة ({filteredDevices.length})
                </CardTitle>
                <div className="flex space-x-2">
                  {['all', 'online', 'offline', 'threats'].map((f) => (
                    <Button
                      key={f}
                      variant={filter === f ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter(f as typeof filter)}
                      className="text-xs"
                    >
                      {f === 'all' ? 'الكل' : 
                       f === 'online' ? 'متصل' :
                       f === 'offline' ? 'غير متصل' : 'تهديدات'}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDevices.map((device) => (
                  <div 
                    key={device.id}
                    className="p-4 bg-slate-900/50 rounded-lg border border-slate-600/50 hover:border-blue-500/50 transition-colors cursor-pointer"
                    onClick={() => scanDevicePorts(device)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`${getStatusColor(device.status)}`}>
                          {getDeviceIcon(device.type)}
                        </div>
                        <div>
                          <div className="text-white font-medium">{device.name}</div>
                          <div className="text-gray-400 text-sm">{device.ip} • {device.vendor}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            device.status === 'online' ? 'bg-green-600' :
                            device.status === 'offline' ? 'bg-red-600' : 'bg-yellow-600'
                          }>
                            {device.status === 'online' ? 'متصل' :
                             device.status === 'offline' ? 'غير متصل' : 'تحذير'}
                          </Badge>
                          <div className={`${getSecurityColor(device.security)}`}>
                            {device.security === 'secure' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                          </div>
                        </div>
                        <div className="text-gray-400 text-sm mt-1">
                          {device.bandwidth.toFixed(1)} Mbps • {device.signalStrength}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* التهديدات الأمنية */}
        <div>
          <Card className="bg-gradient-to-br from-red-900/20 to-orange-600/20 border-red-500/30 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-red-400" />
                التهديدات الأمنية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {threats.filter(t => !t.resolved).slice(0, 5).map((threat) => (
                  <div key={threat.id} className="p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge className={getThreatColor(threat.severity)}>
                          {threat.severity === 'critical' ? 'حرج' :
                           threat.severity === 'high' ? 'عالي' :
                           threat.severity === 'medium' ? 'متوسط' : 'منخفض'}
                        </Badge>
                        <div className="text-white text-sm mt-2">{threat.description}</div>
                        <div className="text-gray-400 text-xs mt-1">
                          {threat.source} • {threat.timestamp.toLocaleTimeString('ar-IQ')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* تفاصيل الجهاز المحدد */}
          {selectedDevice && (
            <Card className="bg-gradient-to-br from-blue-900/20 to-purple-600/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Eye className="h-6 w-6 mr-2 text-blue-400" />
                  تفاصيل {selectedDevice.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="text-gray-400">عنوان IP:</div>
                    <div className="text-white">{selectedDevice.ip}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-400">عنوان MAC:</div>
                    <div className="text-white">{selectedDevice.mac}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-400">نظام التشغيل:</div>
                    <div className="text-white">{selectedDevice.os}</div>
                  </div>
                  
                  {devicePorts.length > 0 && (
                    <div className="mt-4">
                      <div className="text-gray-400 text-sm mb-2">المنافذ المفتوحة:</div>
                      {devicePorts.map((port, index) => (
                        <div key={index} className="flex justify-between text-xs py-1">
                          <span className="text-white">{port.port}/{port.protocol}</span>
                          <Badge variant={port.status === 'open' ? 'default' : 'secondary'}>
                            {port.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedNetworkMonitor;
