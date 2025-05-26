import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cable, 
  Zap, 
  Eye, 
  Gauge, 
  Activity, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Search,
  Lightbulb,
  Radio,
  Settings,
  TrendingUp,
  BarChart3,
  Signal,
  Wifi,
  Router,
  Monitor
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

const FiberOpticTools = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [otdrResults, setOtdrResults] = useState<any[]>([]);
  const [powerMeterResults, setPowerMeterResults] = useState<any>(null);
  const [visualInspectionResults, setVisualInspectionResults] = useState<any[]>([]);
  const [fiberLength, setFiberLength] = useState('');
  const [testWavelength, setTestWavelength] = useState('1550');
  const [isTestingOTDR, setIsTestingOTDR] = useState(false);
  const [isTestingPower, setIsTestingPower] = useState(false);
  const [testProgress, setTestProgress] = useState(0);

  const runOTDRTest = async () => {
    if (!fiberLength || parseFloat(fiberLength) <= 0) {
      toast({
        title: "خطأ في المدخلات",
        description: "يرجى إدخال طول الكابل الضوئي",
        variant: "destructive",
      });
      return;
    }

    setIsTestingOTDR(true);
    setTestProgress(0);
    setOtdrResults([]);

    toast({
      title: "بدء فحص OTDR",
      description: "جاري تحليل الكابل الضوئي...",
    });

    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTestingOTDR(false);
          
          const testResults = [
            {
              distance: '0.0 km',
              event: 'بداية الكابل',
              loss: '0.00 dB',
              reflection: '-65.2 dB',
              status: 'طبيعي',
              type: 'start'
            },
            {
              distance: `${(parseFloat(fiberLength) * 0.3).toFixed(1)} km`,
              event: 'وصلة ميكانيكية',
              loss: '0.05 dB',
              reflection: '-45.8 dB',
              status: 'طبيعي',
              type: 'splice'
            },
            {
              distance: `${(parseFloat(fiberLength) * 0.7).toFixed(1)} km`,
              event: 'انحناء كبير',
              loss: '0.12 dB',
              reflection: '-38.5 dB',
              status: 'تحذير',
              type: 'bend'
            },
            {
              distance: `${parseFloat(fiberLength)} km`,
              event: 'نهاية الكابل',
              loss: '0.08 dB',
              reflection: '-14.2 dB',
              status: 'طبيعي',
              type: 'end'
            }
          ];

          setOtdrResults(testResults);
          
          const totalLoss = testResults.reduce((sum, result) => sum + parseFloat(result.loss), 0);
          const warnings = testResults.filter(r => r.status === 'تحذير').length;
          
          toast({
            title: "فحص OTDR مكتمل",
            description: `إجمالي الفقدان: ${totalLoss.toFixed(2)} dB | تحذيرات: ${warnings}`,
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const runPowerMeterTest = async () => {
    setIsTestingPower(true);
    setPowerMeterResults(null);

    toast({
      title: "قياس القدرة البصرية",
      description: "جاري قياس مستوى الإشارة...",
    });

    setTimeout(() => {
      const powerResults = {
        wavelength: testWavelength,
        power: (Math.random() * -5 - 10).toFixed(2),
        snr: (Math.random() * 10 + 20).toFixed(1),
        ber: (Math.random() * 9 + 1).toExponential(2),
        q_factor: (Math.random() * 5 + 15).toFixed(1),
        temperature: (Math.random() * 10 + 20).toFixed(1),
        status: parseFloat((Math.random() * -5 - 10).toFixed(2)) > -13 ? 'ممتاز' : 'جيد'
      };

      setPowerMeterResults(powerResults);
      setIsTestingPower(false);

      toast({
        title: "قياس القدرة مكتمل",
        description: `القدرة: ${powerResults.power} dBm | الحالة: ${powerResults.status}`,
      });
    }, 3000);
  };

  const runVisualInspection = async () => {
    toast({
      title: "الفحص البصري",
      description: "جاري فحص نظافة الموصلات...",
    });

    setTimeout(() => {
      const inspectionResults = [
        {
          connector: 'SC/UPC - Port A',
          cleanliness: 'نظيف',
          scratch: 'لا يوجد',
          contamination: 'خفيف',
          grade: 'A',
          status: 'جيد'
        },
        {
          connector: 'SC/UPC - Port B',
          cleanliness: 'متسخ قليلاً',
          scratch: 'خدش صغير',
          contamination: 'متوسط',
          grade: 'B',
          status: 'يحتاج تنظيف'
        },
        {
          connector: 'LC/APC - Port C',
          cleanliness: 'نظيف جداً',
          scratch: 'لا يوجد',
          contamination: 'لا يوجد',
          grade: 'A+',
          status: 'ممتاز'
        }
      ];

      setVisualInspectionResults(inspectionResults);

      const needsCleaning = inspectionResults.filter(r => r.status.includes('تنظيف')).length;
      
      toast({
        title: "الفحص البصري مكتمل",
        description: `${inspectionResults.length} موصل تم فحصه | ${needsCleaning} يحتاج تنظيف`,
      });
    }, 2000);
  };

  const runFiberCharacterization = () => {
    toast({
      title: "تحليل خصائص الألياف",
      description: "جاري تحليل الخصائص الفيزيائية للكابل...",
    });

    setTimeout(() => {
      const characteristics = {
        coreSize: '9.2 μm',
        claddingSize: '125.0 μm',
        na: '0.14',
        cutoffWavelength: '1260 nm',
        dispersion: '17.5 ps/nm/km',
        attenuation: '0.36 dB/km',
        bendRadius: '15 mm',
        fiberType: 'G.652.D'
      };

      console.log('Fiber Characteristics:', characteristics);
      
      toast({
        title: "تحليل الخصائص مكتمل",
        description: `نوع الألياف: ${characteristics.fiberType} | التوهين: ${characteristics.attenuation}`,
      });
    }, 3000);
  };

  const runReflectometryTest = () => {
    toast({
      title: "اختبار الانعكاس",
      description: "جاري قياس معامل الانعكاس...",
    });

    setTimeout(() => {
      const reflectometry = {
        returnLoss: (-Math.random() * 20 - 40).toFixed(1),
        reflectance: (-Math.random() * 30 - 50).toFixed(1),
        insertionLoss: (Math.random() * 0.5).toFixed(2),
        uniformity: (Math.random() * 0.1 + 0.9).toFixed(3)
      };

      console.log('Reflectometry Results:', reflectometry);
      
      toast({
        title: "اختبار الانعكاس مكتمل",
        description: `Return Loss: ${reflectometry.returnLoss} dB | Insertion Loss: ${reflectometry.insertionLoss} dB`,
      });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Cable className="h-5 w-5 mr-2" />
            أدوات فحص الكابلات الضوئية المتقدمة
            <Badge className="ml-2 bg-purple-100 text-purple-700">Professional</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="otdr" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="otdr">OTDR</TabsTrigger>
              <TabsTrigger value="power">Power Meter</TabsTrigger>
              <TabsTrigger value="visual">Visual Test</TabsTrigger>
              <TabsTrigger value="characterization">خصائص الألياف</TabsTrigger>
              <TabsTrigger value="reflectometry">Reflectometry</TabsTrigger>
              <TabsTrigger value="analysis">تحليل متقدم</TabsTrigger>
            </TabsList>

            <TabsContent value="otdr" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">طول الكابل (km)</label>
                    <Input
                      type="number"
                      placeholder="أدخل طول الكابل"
                      value={fiberLength}
                      onChange={(e) => setFiberLength(e.target.value)}
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الطول الموجي (nm)</label>
                    <Input
                      value={testWavelength}
                      onChange={(e) => setTestWavelength(e.target.value)}
                      placeholder="1550"
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={runOTDRTest} 
                    disabled={isTestingOTDR || !fiberLength}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    {isTestingOTDR ? 'جاري الفحص...' : 'بدء فحص OTDR'}
                  </Button>
                  
                  <Button variant="outline" onClick={runReflectometryTest}>
                    <Signal className="h-4 w-4 mr-2" />
                    اختبار الانعكاس
                  </Button>
                </div>

                {isTestingOTDR && (
                  <div className="space-y-2">
                    <Progress value={testProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground">{testProgress}% - جاري تحليل الكابل الضوئي</p>
                  </div>
                )}

                {otdrResults.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">نتائج فحص OTDR:</h4>
                    <div className="space-y-2">
                      {otdrResults.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {result.type === 'start' && <CheckCircle className="h-4 w-4 text-green-600" />}
                            {result.type === 'splice' && <Cable className="h-4 w-4 text-blue-600" />}
                            {result.type === 'bend' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                            {result.type === 'end' && <XCircle className="h-4 w-4 text-gray-600" />}
                            <div>
                              <div className="font-medium">{result.event}</div>
                              <div className="text-sm text-muted-foreground">المسافة: {result.distance}</div>
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="text-sm">الفقدان: {result.loss}</div>
                            <div className="text-xs text-muted-foreground">الانعكاس: {result.reflection}</div>
                            <Badge className={result.status === 'طبيعي' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                              {result.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="power" className="space-y-4">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">مقياس القدرة البصرية</h3>
                  <p className="text-muted-foreground">قياس دقيق لمستوى الإشارة الضوئية</p>
                </div>

                <Button 
                  onClick={runPowerMeterTest} 
                  disabled={isTestingPower}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Gauge className="h-5 w-5 mr-2" />
                  {isTestingPower ? 'جاري القياس...' : 'بدء قياس القدرة'}
                </Button>

                {powerMeterResults && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card className="border-2 border-green-200">
                        <CardContent className="p-4 text-center">
                          <Lightbulb className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <div className="text-2xl font-bold text-green-600">{powerMeterResults.power}</div>
                          <div className="text-sm text-muted-foreground">dBm القدرة</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-blue-200">
                        <CardContent className="p-4 text-center">
                          <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <div className="text-2xl font-bold text-blue-600">{powerMeterResults.snr}</div>
                          <div className="text-sm text-muted-foreground">dB SNR</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-purple-200">
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <div className="text-2xl font-bold text-purple-600">{powerMeterResults.q_factor}</div>
                          <div className="text-sm text-muted-foreground">Q-Factor</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold">{powerMeterResults.wavelength} nm</div>
                        <div className="text-xs text-muted-foreground">الطول الموجي</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold">{powerMeterResults.ber}</div>
                        <div className="text-xs text-muted-foreground">BER</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold">{powerMeterResults.temperature}°C</div>
                        <div className="text-xs text-muted-foreground">درجة الحرارة</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold">{powerMeterResults.status}</div>
                        <div className="text-xs text-muted-foreground">الحالة</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="visual" className="space-y-4">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">الفحص البصري للموصلات</h3>
                  <p className="text-muted-foreground mb-4">فحص نظافة وحالة الموصلات الضوئية</p>
                  
                  <Button onClick={runVisualInspection} className="bg-purple-600 hover:bg-purple-700">
                    <Eye className="h-4 w-4 mr-2" />
                    بدء الفحص البصري
                  </Button>
                </div>

                {visualInspectionResults.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">نتائج الفحص البصري:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {visualInspectionResults.map((result, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium">{result.connector}</h5>
                              <Badge className={`${
                                result.grade === 'A+' ? 'bg-green-100 text-green-700' :
                                result.grade === 'A' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                Grade {result.grade}
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>النظافة:</span>
                                <span className="font-medium">{result.cleanliness}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>الخدوش:</span>
                                <span className="font-medium">{result.scratch}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>التلوث:</span>
                                <span className="font-medium">{result.contamination}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>الحالة:</span>
                                <span className={`font-medium ${
                                  result.status === 'ممتاز' ? 'text-green-600' :
                                  result.status === 'جيد' ? 'text-blue-600' :
                                  'text-yellow-600'
                                }`}>
                                  {result.status}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="characterization" className="space-y-4">
              <div className="text-center space-y-6">
                <h3 className="text-xl font-bold">تحليل خصائص الألياف الضوئية</h3>
                <p className="text-muted-foreground">تحليل شامل للخصائص الفيزيائية والبصرية</p>
                
                <Button onClick={runFiberCharacterization} className="bg-indigo-600 hover:bg-indigo-700">
                  <Search className="h-4 w-4 mr-2" />
                  بدء تحليل الخصائص
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Radio className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <div className="text-sm font-medium">قطر النواة</div>
                      <div className="text-xs text-muted-foreground">Core Diameter</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Monitor className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-sm font-medium">قطر الكسوة</div>
                      <div className="text-xs text-muted-foreground">Cladding Diameter</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Settings className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                      <div className="text-sm font-medium">الفتحة العددية</div>
                      <div className="text-xs text-muted-foreground">Numerical Aperture</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Zap className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                      <div className="text-sm font-medium">التوهين</div>
                      <div className="text-xs text-muted-foreground">Attenuation</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reflectometry" className="space-y-4">
              <div className="text-center space-y-6">
                <h3 className="text-xl font-bold">اختبار الانعكاس المتقدم</h3>
                <p className="text-muted-foreground">قياس معاملات الانعكاس وفقدان الإدراج</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Signal className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                      <h4 className="font-semibold mb-2">Return Loss</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        قياس فقدان الإرجاع
                      </p>
                      <Button onClick={runReflectometryTest} className="w-full">
                        قياس Return Loss
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Activity className="h-12 w-12 mx-auto mb-4 text-green-600" />
                      <h4 className="font-semibold mb-2">Insertion Loss</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        قياس فقدان الإدراج
                      </p>
                      <Button onClick={runReflectometryTest} variant="outline" className="w-full">
                        قياس Insertion Loss
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-center">تحليل متقدم للشبكة الضوئية</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-sm">
                        <Cable className="h-4 w-4 mr-2" />
                        تحليل الطوبولوجيا
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3">
                        تحليل هيكل الشبكة الضوئية
                      </p>
                      <Button size="sm" className="w-full">تشغيل التحليل</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-sm">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        مراقبة الأداء
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3">
                        مراقبة مستمرة لأداء الشبكة
                      </p>
                      <Button size="sm" variant="outline" className="w-full">بدء المراقبة</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-sm">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        كشف الأعطال
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3">
                        كشف تلقائي للأعطال والمشاكل
                      </p>
                      <Button size="sm" variant="destructive" className="w-full">فحص الأعطال</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FiberOpticTools;
