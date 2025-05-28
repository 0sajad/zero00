
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Wifi, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Gauge,
  Thermometer,
  BatteryCharging,
  Monitor,
  Smartphone,
  Server,
  Database,
  Globe,
  Timer,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface PerformanceMetrics {
  cpu: {
    usage: number;
    temperature: number;
    cores: number;
    speed: number;
  };
  memory: {
    used: number;
    total: number;
    cached: number;
    available: number;
  };
  network: {
    download: number;
    upload: number;
    latency: number;
    quality: string;
  };
  system: {
    uptime: number;
    processes: number;
    loadAverage: number[];
    score: number;
  };
}

const IntelligentPerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cpu: { usage: 45, temperature: 62, cores: 8, speed: 3.2 },
    memory: { used: 8.2, total: 16, cached: 2.1, available: 5.7 },
    network: { download: 125.6, upload: 23.4, latency: 12, quality: 'ممتاز' },
    system: { uptime: 15.5, processes: 342, loadAverage: [0.45, 0.38, 0.42], score: 94 }
  });

  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    // محاكاة البيانات التاريخية
    const generateHistoricalData = () => {
      const data = [];
      for (let i = 0; i < 24; i++) {
        data.push({
          time: `${String(i).padStart(2, '0')}:00`,
          cpu: Math.floor(Math.random() * 40) + 20,
          memory: Math.floor(Math.random() * 30) + 40,
          network: Math.floor(Math.random() * 50) + 50
        });
      }
      setHistoricalData(data);
    };

    generateHistoricalData();

    // تحديث المقاييس في الوقت الفعلي
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: {
          ...prev.cpu,
          usage: Math.max(10, Math.min(90, prev.cpu.usage + (Math.random() - 0.5) * 10)),
          temperature: Math.max(35, Math.min(85, prev.cpu.temperature + (Math.random() - 0.5) * 3))
        },
        memory: {
          ...prev.memory,
          used: Math.max(2, Math.min(15, prev.memory.used + (Math.random() - 0.5) * 0.5))
        },
        network: {
          ...prev.network,
          download: Math.max(50, Math.min(200, prev.network.download + (Math.random() - 0.5) * 20)),
          latency: Math.max(5, Math.min(50, prev.network.latency + (Math.random() - 0.5) * 5))
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const optimizeSystem = async () => {
    setIsOptimizing(true);
    
    // محاكاة تحسين النظام
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      if (i === 100) {
        setMetrics(prev => ({
          ...prev,
          cpu: { ...prev.cpu, usage: Math.max(15, prev.cpu.usage - 15) },
          memory: { ...prev.memory, used: Math.max(3, prev.memory.used - 2) },
          system: { ...prev.system, score: Math.min(98, prev.system.score + 2) }
        }));
      }
    }
    
    setIsOptimizing(false);
  };

  const getPerformanceGrade = (score: number) => {
    if (score >= 95) return { grade: 'A+', color: 'bg-green-500' };
    if (score >= 90) return { grade: 'A', color: 'bg-green-400' };
    if (score >= 85) return { grade: 'B+', color: 'bg-blue-500' };
    if (score >= 80) return { grade: 'B', color: 'bg-blue-400' };
    if (score >= 70) return { grade: 'C', color: 'bg-yellow-500' };
    return { grade: 'D', color: 'bg-red-500' };
  };

  const performanceGrade = getPerformanceGrade(metrics.system.score);

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Gauge className="h-6 w-6 mr-3" />
            مراقب الأداء الذكي - Intelligent Performance Monitor
            <Badge className="ml-3 bg-blue-600 text-white">AI-Optimized</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {metrics.system.score}
              </div>
              <Badge className={`${performanceGrade.color} text-white text-lg px-4 py-2`}>
                {performanceGrade.grade}
              </Badge>
              <div className="text-sm text-gray-600 mt-1">نقاط الأداء</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {metrics.cpu.usage}%
              </div>
              <div className="text-sm text-gray-600">استخدام المعالج</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {metrics.memory.used}GB
              </div>
              <div className="text-sm text-gray-600">استخدام الذاكرة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {metrics.network.download}
              </div>
              <div className="text-sm text-gray-600">سرعة الشبكة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">
                {metrics.cpu.temperature}°C
              </div>
              <div className="text-sm text-gray-600">درجة الحرارة</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button
          onClick={optimizeSystem}
          disabled={isOptimizing}
          className="h-16 bg-green-600 hover:bg-green-700 text-white"
        >
          <div className="flex items-center">
            <Zap className={`h-5 w-5 mr-2 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'جاري التحسين...' : 'تحسين تلقائي'}</span>
          </div>
        </Button>

        <Button className="h-16 bg-blue-600 hover:bg-blue-700 text-white">
          <div className="flex items-center">
            <MemoryStick className="h-5 w-5 mr-2" />
            <span>تنظيف الذاكرة</span>
          </div>
        </Button>

        <Button className="h-16 bg-purple-600 hover:bg-purple-700 text-white">
          <div className="flex items-center">
            <HardDrive className="h-5 w-5 mr-2" />
            <span>تنظيف القرص</span>
          </div>
        </Button>

        <Button className="h-16 bg-orange-600 hover:bg-orange-700 text-white">
          <div className="flex items-center">
            <Wifi className="h-5 w-5 mr-2" />
            <span>تحسين الشبكة</span>
          </div>
        </Button>
      </div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              أداء النظام على مدار 24 ساعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="المعالج" />
                <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="الذاكرة" />
                <Line type="monotone" dataKey="network" stroke="#ffc658" name="الشبكة" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              توزيع الموارد الحالي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historicalData.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="memory" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="network" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <Cpu className="h-5 w-5 mr-2" />
              المعالج
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>الاستخدام:</span>
              <div className="flex items-center space-x-2">
                <Progress value={metrics.cpu.usage} className="w-20" />
                <span className="text-sm font-medium">{metrics.cpu.usage}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>درجة الحرارة:</span>
              <div className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">{metrics.cpu.temperature}°C</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>عدد الأنوية:</span>
              <span className="text-sm font-medium">{metrics.cpu.cores}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>السرعة:</span>
              <span className="text-sm font-medium">{metrics.cpu.speed} GHz</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <MemoryStick className="h-5 w-5 mr-2" />
              الذاكرة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>المستخدمة:</span>
              <span className="text-sm font-medium">{metrics.memory.used} GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span>الإجمالية:</span>
              <span className="text-sm font-medium">{metrics.memory.total} GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span>التخزين المؤقت:</span>
              <span className="text-sm font-medium">{metrics.memory.cached} GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span>المتاحة:</span>
              <span className="text-sm font-medium">{metrics.memory.available} GB</span>
            </div>
            <Progress 
              value={(metrics.memory.used / metrics.memory.total) * 100} 
              className="w-full" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-600">
              <Wifi className="h-5 w-5 mr-2" />
              الشبكة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>التحميل:</span>
              <div className="flex items-center space-x-1">
                <TrendingDown className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">{metrics.network.download} Mbps</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>الرفع:</span>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">{metrics.network.upload} Mbps</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>زمن الاستجابة:</span>
              <span className="text-sm font-medium">{metrics.network.latency} ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span>الجودة:</span>
              <Badge className="bg-green-100 text-green-700">
                {metrics.network.quality}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-orange-600">
              <Monitor className="h-5 w-5 mr-2" />
              النظام
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>وقت التشغيل:</span>
              <span className="text-sm font-medium">{metrics.system.uptime} يوم</span>
            </div>
            <div className="flex justify-between items-center">
              <span>العمليات:</span>
              <span className="text-sm font-medium">{metrics.system.processes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>متوسط التحميل:</span>
              <span className="text-sm font-medium">
                {metrics.system.loadAverage.join(', ')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>نقاط الأداء:</span>
              <Badge className={`${performanceGrade.color} text-white`}>
                {metrics.system.score}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IntelligentPerformanceMonitor;
