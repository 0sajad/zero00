
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Shield, 
  Zap, 
  Network, 
  Globe, 
  Gauge,
  Server,
  Wifi,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  Download,
  Upload,
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Settings,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { audioSystem } from '@/utils/audioSystem';
import { useToast } from '@/hooks/use-toast';

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: string;
  temperature: number;
  powerConsumption: number;
}

interface NetworkStats {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  packetsLost: number;
  connectedDevices: number;
  signalStrength: number;
}

interface SecurityStatus {
  firewallStatus: boolean;
  intrusions: number;
  vulnerabilities: number;
  lastScan: Date;
  threatLevel: 'low' | 'medium' | 'high';
}

const SmartDashboard = () => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    uptime: '0:00:00',
    temperature: 0,
    powerConsumption: 0
  });

  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    downloadSpeed: 0,
    uploadSpeed: 0,
    ping: 0,
    packetsLost: 0,
    connectedDevices: 0,
    signalStrength: 0
  });

  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    firewallStatus: true,
    intrusions: 0,
    vulnerabilities: 0,
    lastScan: new Date(),
    threatLevel: 'low'
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const [qualityScore, setQualityScore] = useState(87);
  const { toast } = useToast();

  useEffect(() => {
    // محاكاة البيانات الحية
    const interval = setInterval(() => {
      updateSystemMetrics();
      updateNetworkStats();
      updateSecurityStatus();
    }, 2000);

    // تشغيل صوت البدء
    audioSystem.playSound('startup');

    return () => clearInterval(interval);
  }, []);

  const updateSystemMetrics = () => {
    setSystemMetrics(prev => ({
      cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
      memory: Math.max(20, Math.min(90, prev.memory + (Math.random() - 0.5) * 8)),
      disk: Math.max(30, Math.min(85, prev.disk + (Math.random() - 0.5) * 3)),
      network: Math.max(5, Math.min(100, prev.network + (Math.random() - 0.5) * 15)),
      uptime: new Date(Date.now() - Math.random() * 86400000).toLocaleTimeString('ar-IQ'),
      temperature: Math.max(35, Math.min(75, 45 + Math.random() * 20)),
      powerConsumption: Math.max(50, Math.min(200, 120 + Math.random() * 40))
    }));
  };

  const updateNetworkStats = () => {
    setNetworkStats(prev => ({
      downloadSpeed: Math.max(50, Math.min(200, prev.downloadSpeed + (Math.random() - 0.5) * 20)),
      uploadSpeed: Math.max(20, Math.min(100, prev.uploadSpeed + (Math.random() - 0.5) * 15)),
      ping: Math.max(10, Math.min(100, prev.ping + (Math.random() - 0.5) * 10)),
      packetsLost: Math.max(0, Math.min(5, prev.packetsLost + (Math.random() - 0.7) * 2)),
      connectedDevices: Math.max(5, Math.min(25, prev.connectedDevices + Math.floor((Math.random() - 0.5) * 3))),
      signalStrength: Math.max(60, Math.min(100, prev.signalStrength + (Math.random() - 0.5) * 10))
    }));
  };

  const updateSecurityStatus = () => {
    setSecurityStatus(prev => ({
      ...prev,
      intrusions: Math.max(0, prev.intrusions + Math.floor(Math.random() * 2)),
      vulnerabilities: Math.max(0, Math.min(10, prev.vulnerabilities + Math.floor((Math.random() - 0.8) * 3))),
      threatLevel: Math.random() > 0.9 ? 'medium' : 'low'
    }));
  };

  const startMonitoring = async () => {
    setIsMonitoring(true);
    await audioSystem.playSound('scan');
    
    toast({
      title: "بدء المراقبة الذكية 🚀",
      description: "تم تفعيل نظام المراقبة المتقدم بنجاح",
    });

    // محاكاة عملية المراقبة
    setTimeout(async () => {
      await audioSystem.playSound('taskComplete');
      setIsMonitoring(false);
      
      toast({
        title: "اكتملت المراقبة بنجاح ✅",
        description: `تم فحص النظام - نقاط الجودة: ${qualityScore}/100`,
      });
    }, 5000);
  };

  const getStatusColor = (value: number, reverse = false) => {
    if (reverse) {
      if (value > 80) return 'text-red-500';
      if (value > 60) return 'text-yellow-500';
      return 'text-green-500';
    } else {
      if (value > 80) return 'text-green-500';
      if (value > 60) return 'text-yellow-500';
      return 'text-red-500';
    }
  };

  const getProgressColor = (value: number, reverse = false) => {
    if (reverse) {
      if (value > 80) return 'bg-red-500';
      if (value > 60) return 'bg-yellow-500';
      return 'bg-green-500';
    } else {
      if (value > 80) return 'bg-green-500';
      if (value > 60) return 'bg-yellow-500';
      return 'bg-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🌐 OCTA NETWORK
            </h1>
            <p className="text-purple-300 text-lg">
              لوحة التحكم الذكية المتقدمة - نظام المراقبة العالمي
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-600 text-white px-4 py-2 text-lg">
              <Activity className="h-5 w-5 mr-2" />
              نشط ومتصل
            </Badge>
            <Button
              onClick={startMonitoring}
              disabled={isMonitoring}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3"
            >
              {isMonitoring ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  جاري المراقبة...
                </>
              ) : (
                <>
                  <Eye className="h-5 w-5 mr-2" />
                  بدء المراقبة الذكية
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* مؤشر الجودة الرئيسي */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1 bg-gradient-to-br from-green-900/20 to-green-600/20 border-green-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-white flex items-center justify-center">
              <Gauge className="h-6 w-6 mr-2 text-green-400" />
              مؤشر جودة الشبكة
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-green-900/30"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${qualityScore * 3.14} 314`}
                  className="text-green-400 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{qualityScore}</span>
              </div>
            </div>
            <div className="text-green-400 font-bold text-xl">ممتاز</div>
            <div className="text-green-300 text-sm">أداء الشبكة مستقر</div>
          </CardContent>
        </Card>

        {/* إحصائيات سريعة */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-900/20 to-purple-600/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-blue-400" />
              الإحصائيات الحية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <Download className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold text-white">{networkStats.downloadSpeed.toFixed(1)}</div>
                <div className="text-blue-300 text-sm">Mbps تنزيل</div>
              </div>
              <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                <Upload className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold text-white">{networkStats.uploadSpeed.toFixed(1)}</div>
                <div className="text-green-300 text-sm">Mbps رفع</div>
              </div>
              <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
                <Activity className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold text-white">{networkStats.ping.toFixed(0)}</div>
                <div className="text-yellow-300 text-sm">ms استجابة</div>
              </div>
              <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <Network className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold text-white">{networkStats.connectedDevices}</div>
                <div className="text-purple-300 text-sm">جهاز متصل</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* معلومات النظام */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {/* أداء النظام */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Cpu className="h-5 w-5 mr-2 text-blue-400" />
              أداء النظام
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">المعالج (CPU)</span>
                <span className={`font-bold ${getStatusColor(systemMetrics.cpu, true)}`}>
                  {systemMetrics.cpu.toFixed(1)}%
                </span>
              </div>
              <Progress value={systemMetrics.cpu} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">الذاكرة (RAM)</span>
                <span className={`font-bold ${getStatusColor(systemMetrics.memory, true)}`}>
                  {systemMetrics.memory.toFixed(1)}%
                </span>
              </div>
              <Progress value={systemMetrics.memory} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">التخزين (Disk)</span>
                <span className={`font-bold ${getStatusColor(systemMetrics.disk, true)}`}>
                  {systemMetrics.disk.toFixed(1)}%
                </span>
              </div>
              <Progress value={systemMetrics.disk} className="h-2" />
            </div>
            <div className="pt-2 border-t border-gray-600">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">درجة الحرارة:</span>
                <span className="text-orange-400 font-bold">{systemMetrics.temperature.toFixed(0)}°C</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">استهلاك الطاقة:</span>
                <span className="text-green-400 font-bold">{systemMetrics.powerConsumption.toFixed(0)}W</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* حالة الأمان */}
        <Card className="bg-gradient-to-br from-red-900/20 to-orange-600/20 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-400" />
              حالة الأمان
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">جدار الحماية:</span>
              <div className="flex items-center">
                {securityStatus.firewallStatus ? (
                  <CheckCircle className="h-5 w-5 text-green-400 mr-1" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400 mr-1" />
                )}
                <span className={securityStatus.firewallStatus ? 'text-green-400' : 'text-red-400'}>
                  {securityStatus.firewallStatus ? 'نشط' : 'معطل'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">محاولات الاختراق:</span>
              <span className="text-red-400 font-bold">{securityStatus.intrusions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">الثغرات المكتشفة:</span>
              <span className="text-yellow-400 font-bold">{securityStatus.vulnerabilities}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">مستوى التهديد:</span>
              <Badge className={
                securityStatus.threatLevel === 'high' ? 'bg-red-600' :
                securityStatus.threatLevel === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
              }>
                {securityStatus.threatLevel === 'high' ? 'عالي' :
                 securityStatus.threatLevel === 'medium' ? 'متوسط' : 'منخفض'}
              </Badge>
            </div>
            <div className="pt-2 border-t border-gray-600">
              <div className="text-sm text-gray-400">
                آخر فحص: {securityStatus.lastScan.toLocaleTimeString('ar-IQ')}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* إحصائيات الشبكة */}
        <Card className="bg-gradient-to-br from-green-900/20 to-teal-600/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Wifi className="h-5 w-5 mr-2 text-green-400" />
              تفاصيل الشبكة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">قوة الإشارة</span>
                <span className={`font-bold ${getStatusColor(networkStats.signalStrength)}`}>
                  {networkStats.signalStrength.toFixed(0)}%
                </span>
              </div>
              <Progress value={networkStats.signalStrength} className="h-2" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">البيانات المفقودة:</span>
              <span className="text-red-400 font-bold">{networkStats.packetsLost.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">الأجهزة المتصلة:</span>
              <span className="text-blue-400 font-bold">{networkStats.connectedDevices}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">وقت التشغيل:</span>
              <span className="text-green-400 font-bold">{systemMetrics.uptime}</span>
            </div>
            <div className="pt-2 border-t border-gray-600">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-green-500/50 text-green-400 hover:bg-green-500/20"
                onClick={() => audioSystem.playSound('speedTest')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                اختبار السرعة المتقدم
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* شريط الحالة السفلي */}
      <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-400 font-medium">نظام نشط</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-blue-400">متصل عالمياً</span>
              </div>
              <div className="flex items-center">
                <Lock className="h-4 w-4 text-purple-400 mr-2" />
                <span className="text-purple-400">مشفر ومحمي</span>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              OCTA NETWORK v2.0 - تطوير: سجاد كاظم
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartDashboard;
