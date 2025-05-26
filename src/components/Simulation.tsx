import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Globe, Play, Square, Settings, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

const Simulation = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [running, setRunning] = useState(false);
  const [scenario, setScenario] = useState('');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);

  const scenarios = [
    { 
      id: 'ddos', 
      name: 'محاكاة هجوم DDoS', 
      description: 'اختبار مقاومة الشبكة للهجمات',
      duration: 5000,
      risk: 'high'
    },
    { 
      id: 'bandwidth', 
      name: 'اختبار النطاق الترددي', 
      description: 'فحص حدود سعة الشبكة',
      duration: 3000,
      risk: 'medium'
    },
    { 
      id: 'latency', 
      name: 'محاكاة التأخير', 
      description: 'اختبار أداء الشبكة مع زمن استجابة عالي',
      duration: 4000,
      risk: 'low'
    },
    { 
      id: 'failure', 
      name: 'محاكاة أعطال الأجهزة', 
      description: 'اختبار استقرار الشبكة عند تعطل أجهزة',
      duration: 6000,
      risk: 'medium'
    }
  ];

  const startSimulation = async () => {
    if (!scenario) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار سيناريو المحاكاة",
        variant: "destructive",
      });
      return;
    }

    if (!navigator.onLine) {
      toast({
        title: "لا يوجد اتصال",
        description: "يرجى التحقق من اتصال الإنترنت",
        variant: "destructive",
      });
      return;
    }

    const selectedScenario = scenarios.find(s => s.id === scenario);
    setRunning(true);
    setProgress(0);
    setResults(null);

    toast({
      title: "بدء المحاكاة",
      description: `جاري تشغيل: ${selectedScenario?.name}`,
    });

    const duration = selectedScenario?.duration || 5000;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setRunning(false);
          
          const simulationResults = generateResults(scenario);
          setResults(simulationResults);
          
          toast({
            title: "المحاكاة مكتملة",
            description: `تم إنجاز ${selectedScenario?.name} بنجاح`,
          });
          
          return 100;
        }
        return prev + (100 / (duration / 200));
      });
    }, 200);
  };

  const generateResults = (scenarioId: string) => {
    const baseResults = {
      scenario: scenarios.find(s => s.id === scenarioId)?.name,
      startTime: new Date().toLocaleTimeString('ar-SA'),
      duration: Math.floor(Math.random() * 10 + 5) + ' ثانية'
    };

    switch (scenarioId) {
      case 'ddos':
        return {
          ...baseResults,
          packetsBlocked: Math.floor(Math.random() * 1000 + 500),
          responseTime: Math.floor(Math.random() * 50 + 20) + 'ms',
          successRate: Math.floor(Math.random() * 20 + 75) + '%',
          recommendation: 'تحديث إعدادات جدار الحماية'
        };
      case 'bandwidth':
        return {
          ...baseResults,
          maxBandwidth: Math.floor(Math.random() * 100 + 50) + ' Mbps',
          utilizationPeak: Math.floor(Math.random() * 30 + 85) + '%',
          bottleneck: 'Router Port 1',
          recommendation: 'ترقية سعة الشبكة'
        };
      case 'latency':
        return {
          ...baseResults,
          avgLatency: Math.floor(Math.random() * 200 + 100) + 'ms',
          maxLatency: Math.floor(Math.random() * 500 + 300) + 'ms',
          packetLoss: Math.floor(Math.random() * 5 + 1) + '%',
          recommendation: 'تحسين مسار الشبكة'
        };
      case 'failure':
        return {
          ...baseResults,
          failedDevices: Math.floor(Math.random() * 3 + 1),
          recoveryTime: Math.floor(Math.random() * 30 + 10) + ' ثانية',
          redundancyStatus: 'نشط',
          recommendation: 'إضافة أجهزة احتياطية'
        };
      default:
        return baseResults;
    }
  };

  const stopSimulation = () => {
    setRunning(false);
    setProgress(0);
    toast({
      title: "توقف المحاكاة",
      description: "تم إيقاف المحاكاة بواسطة المستخدم",
    });
  };

  const selectedScenario = scenarios.find(s => s.id === scenario);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            {t('simulation')}
            <Badge className="ml-2 bg-blue-100 text-blue-700">Beta</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium">اختر سيناريو المحاكاة:</label>
            <Select value={scenario} onValueChange={setScenario} disabled={running}>
              <SelectTrigger>
                <SelectValue placeholder="اختر سيناريو..." />
              </SelectTrigger>
              <SelectContent>
                {scenarios.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{s.name}</span>
                      <Badge 
                        className={`ml-2 text-xs ${
                          s.risk === 'high' ? 'bg-red-100 text-red-700' :
                          s.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}
                      >
                        {s.risk === 'high' ? 'عالي' : s.risk === 'medium' ? 'متوسط' : 'منخفض'}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedScenario && (
            <div className="p-3 bg-muted/20 rounded-lg">
              <div className="flex items-start space-x-2">
                {selectedScenario.risk === 'high' && <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {selectedScenario.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    المدة المتوقعة: {selectedScenario.duration / 1000} ثانية
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            {!running ? (
              <Button 
                onClick={startSimulation} 
                disabled={!scenario || !navigator.onLine}
                className="flex items-center"
              >
                <Play className="h-4 w-4 mr-2" />
                بدء المحاكاة
              </Button>
            ) : (
              <Button 
                onClick={stopSimulation}
                variant="destructive"
                className="flex items-center"
              >
                <Square className="h-4 w-4 mr-2" />
                إيقاف المحاكاة
              </Button>
            )}
            
            <Button variant="outline" disabled={running}>
              <Settings className="h-4 w-4 mr-2" />
              إعدادات متقدمة
            </Button>
          </div>

          {running && (
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>تقدم المحاكاة:</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm">المحاكاة قيد التشغيل... يتم تحليل النتائج...</p>
              </div>
            </div>
          )}

          {results && (
            <div className="space-y-3">
              <h4 className="font-medium">نتائج المحاكاة:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(results).map(([key, value]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      {key === 'scenario' ? 'السيناريو' :
                       key === 'startTime' ? 'وقت البداية' :
                       key === 'duration' ? 'المدة' :
                       key === 'packetsBlocked' ? 'الحزم المحجوبة' :
                       key === 'responseTime' ? 'زمن الاستجابة' :
                       key === 'successRate' ? 'معدل النجاح' :
                       key === 'maxBandwidth' ? 'أقصى نطاق ترددي' :
                       key === 'utilizationPeak' ? 'ذروة الاستخدام' :
                       key === 'bottleneck' ? 'عقدة الازدحام' :
                       key === 'avgLatency' ? 'متوسط التأخير' :
                       key === 'maxLatency' ? 'أقصى تأخير' :
                       key === 'packetLoss' ? 'فقدان الحزم' :
                       key === 'failedDevices' ? 'الأجهزة المعطلة' :
                       key === 'recoveryTime' ? 'وقت الاستعادة' :
                       key === 'redundancyStatus' ? 'حالة الاحتياط' :
                       key === 'recommendation' ? 'التوصية' : key}
                    </div>
                    <div className="font-medium">{String(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!navigator.onLine && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">
                ⚠️ لا يوجد اتصال بالإنترنت. يرجى التحقق من الاتصال لإجراء المحاكاة.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Simulation;
