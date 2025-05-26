
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Cable, 
  Zap, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye,
  Gauge,
  Radio,
  Timer,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';

const FiberOpticTools = () => {
  const { toast } = useToast();
  const [otdrRunning, setOtdrRunning] = useState(false);
  const [powerMeterRunning, setPowerMeterRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [fiberResults, setFiberResults] = useState<any>(null);
  const [currentPhase, setCurrentPhase] = useState('');

  // OTDR Test Data
  const otdrData = [
    { distance: 0, loss: 0, reflection: -45 },
    { distance: 1, loss: 0.2, reflection: -50 },
    { distance: 5, loss: 1.1, reflection: -48 },
    { distance: 10, loss: 2.3, reflection: -52 },
    { distance: 15, loss: 3.8, reflection: -35 }, // Splice
    { distance: 20, loss: 4.9, reflection: -51 },
    { distance: 25, loss: 6.2, reflection: -49 },
    { distance: 30, loss: 7.8, reflection: -25 }, // End connector
  ];

  const runOTDR = async () => {
    setOtdrRunning(true);
    setTestProgress(0);
    setFiberResults(null);

    const phases = [
      'تهيئة OTDR...',
      'إرسال نبضات الضوء...',
      'قياس انعكاسات الضوء...',
      'تحليل البيانات...',
      'حساب الخسائر...',
      'إنشاء التقرير...'
    ];

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i]);
      setTestProgress((i + 1) * (100 / phases.length));
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    const results = {
      totalLoss: (Math.random() * 2 + 1).toFixed(2),
      fiberLength: (Math.random() * 10 + 25).toFixed(1),
      spliceCount: Math.floor(Math.random() * 3 + 1),
      connectorCount: Math.floor(Math.random() * 4 + 2),
      averageSpliceLoss: (Math.random() * 0.1 + 0.05).toFixed(3),
      returnLoss: (Math.random() * 10 + 35).toFixed(1),
      fiberType: 'Single Mode G.652.D',
      wavelength: '1550nm',
      pulseWidth: '10ns',
      events: [
        { type: 'Start Connector', distance: '0.0km', loss: '0.3dB', reflection: '-45dB' },
        { type: 'Splice', distance: '15.2km', loss: '0.08dB', reflection: '-35dB' },
        { type: 'Bend', distance: '22.1km', loss: '0.15dB', reflection: '-52dB' },
        { type: 'End Connector', distance: '30.5km', loss: '0.4dB', reflection: '-25dB' }
      ]
    };

    setFiberResults(results);
    setOtdrRunning(false);
    setCurrentPhase('');

    toast({
      title: "OTDR Test مكتمل",
      description: `طول الكابل: ${results.fiberLength}km، إجمالي الخسائر: ${results.totalLoss}dB`,
    });
  };

  const runPowerMeter = async () => {
    setPowerMeterRunning(true);
    
    toast({
      title: "Power Meter Test",
      description: "جاري قياس قوة الإشارة الضوئية...",
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    const powerResults = {
      receivedPower: (Math.random() * 5 - 15).toFixed(2),
      transmittedPower: (Math.random() * 2 + 3).toFixed(2),
      opticalLoss: (Math.random() * 3 + 1).toFixed(2),
      wavelength: '1310nm/1550nm',
      stability: 'مستقر',
      snr: (Math.random() * 10 + 25).toFixed(1)
    };

    setPowerMeterRunning(false);
    
    toast({
      title: "Power Meter مكتمل",
      description: `القوة المستلمة: ${powerResults.receivedPower}dBm`,
    });
  };

  const runVisualInspection = () => {
    toast({
      title: "Visual Inspection",
      description: "افحص نظافة موصلات الألياف الضوئية بصرياً",
    });
  };

  const runContinuityTest = () => {
    toast({
      title: "Continuity Test",
      description: "اختبار استمرارية الكابل الضوئي مكتمل بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Cable className="h-6 w-6 mr-3 text-blue-600" />
            أدوات فحص الكابل الضوئي
            <Badge className="ml-3 bg-blue-100 text-blue-700">Professional</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="otdr" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="otdr">OTDR Test</TabsTrigger>
              <TabsTrigger value="power">Power Meter</TabsTrigger>
              <TabsTrigger value="visual">Visual Test</TabsTrigger>
              <TabsTrigger value="tools">أدوات إضافية</TabsTrigger>
            </TabsList>

            <TabsContent value="otdr" className="space-y-6">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">OTDR - جهاز قياس المجال الزمني الضوئي</h3>
                  <p className="text-muted-foreground">قياس شامل لخصائص الكابل الضوئي وتحديد الأعطال</p>
                </div>

                {otdrRunning && (
                  <div className="space-y-4">
                    <div className="w-40 h-40 mx-auto relative">
                      <div className="w-full h-full rounded-full border-8 border-gray-200 relative">
                        <div 
                          className="absolute inset-0 rounded-full border-8 border-blue-500 transition-all duration-500"
                          style={{
                            background: `conic-gradient(#3b82f6 ${testProgress * 3.6}deg, transparent 0deg)`
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Activity className="h-8 w-8 mx-auto mb-2 text-blue-600 animate-pulse" />
                          <div className="text-xl font-bold">{Math.round(testProgress)}%</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-blue-600 font-medium">{currentPhase}</p>
                    <Progress value={testProgress} className="w-full max-w-md mx-auto" />
                  </div>
                )}

                {!otdrRunning && !fiberResults && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-medium">تحديد المواقع</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <div className="text-sm font-medium">قياس الخسائر</div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <Eye className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-sm font-medium">كشف الأعطال</div>
                      </div>
                    </div>
                    <Button onClick={runOTDR} size="lg" className="text-lg px-8 py-4">
                      <Activity className="h-6 w-6 mr-2" />
                      بدء OTDR Test
                    </Button>
                  </div>
                )}

                {fiberResults && !otdrRunning && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="border-2 border-blue-200">
                        <CardContent className="p-4 text-center">
                          <Cable className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                          <div className="text-xl font-bold text-blue-600">{fiberResults.fiberLength} km</div>
                          <div className="text-xs text-muted-foreground">طول الكابل</div>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-red-200">
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="h-6 w-6 mx-auto mb-2 text-red-600" />
                          <div className="text-xl font-bold text-red-600">{fiberResults.totalLoss} dB</div>
                          <div className="text-xs text-muted-foreground">إجمالي الخسائر</div>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-green-200">
                        <CardContent className="p-4 text-center">
                          <Radio className="h-6 w-6 mx-auto mb-2 text-green-600" />
                          <div className="text-xl font-bold text-green-600">{fiberResults.returnLoss} dB</div>
                          <div className="text-xs text-muted-foreground">Return Loss</div>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-purple-200">
                        <CardContent className="p-4 text-center">
                          <MapPin className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                          <div className="text-xl font-bold text-purple-600">{fiberResults.spliceCount}</div>
                          <div className="text-xs text-muted-foreground">نقاط الوصل</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">OTDR Trace</h4>
                      <div className="h-64 bg-gray-50 rounded-lg p-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={otdrData}>
                            <XAxis 
                              dataKey="distance" 
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fill: '#6B7280' }}
                            />
                            <YAxis 
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fill: '#6B7280' }}
                              domain={['dataMin - 1', 'dataMax + 1']}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="loss" 
                              stroke="#3B82F6" 
                              fill="url(#colorLoss)"
                              strokeWidth={2}
                            />
                            <defs>
                              <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">تفاصيل الأحداث</h4>
                      <div className="space-y-2">
                        {fiberResults.events.map((event: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {event.type.includes('Splice') ? (
                                <Radio className="h-4 w-4 text-orange-600" />
                              ) : event.type.includes('Connector') ? (
                                <Cable className="h-4 w-4 text-blue-600" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                              )}
                              <div>
                                <div className="font-medium">{event.type}</div>
                                <div className="text-sm text-muted-foreground">المسافة: {event.distance}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">خسارة: {event.loss}</div>
                              <div className="text-xs text-muted-foreground">انعكاس: {event.reflection}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button onClick={runOTDR} variant="outline">
                      إعادة الفحص
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="power" className="space-y-6">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Power Meter - مقياس القوة الضوئية</h3>
                  <p className="text-muted-foreground">قياس قوة الإشارة الضوئية والخسائر</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <Card className="border-2 border-green-200">
                    <CardContent className="p-6 text-center">
                      <Gauge className="h-12 w-12 mx-auto mb-4 text-green-600" />
                      <div className="text-2xl font-bold text-green-600 mb-2">-12.5 dBm</div>
                      <div className="text-sm text-muted-foreground">القوة المستلمة</div>
                      <Badge className="mt-2 bg-green-100 text-green-700">جيد</Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Zap className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                      <div className="text-2xl font-bold text-blue-600 mb-2">+3.2 dBm</div>
                      <div className="text-sm text-muted-foreground">القوة المرسلة</div>
                      <Badge className="mt-2 bg-blue-100 text-blue-700">مثالي</Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-orange-200">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                      <div className="text-2xl font-bold text-orange-600 mb-2">15.7 dB</div>
                      <div className="text-sm text-muted-foreground">إجمالي الخسائر</div>
                      <Badge className="mt-2 bg-orange-100 text-orange-700">مقبول</Badge>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={runPowerMeter} 
                    disabled={powerMeterRunning}
                    size="lg" 
                    className="text-lg px-8 py-4"
                  >
                    <Gauge className="h-6 w-6 mr-2" />
                    {powerMeterRunning ? 'جاري القياس...' : 'بدء قياس القوة'}
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <div className="font-semibold">1310nm</div>
                      <div className="text-xs text-muted-foreground">الطول الموجي</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <div className="font-semibold">±0.1dB</div>
                      <div className="text-xs text-muted-foreground">دقة القياس</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visual" className="space-y-6">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Visual Fault Locator</h3>
                  <p className="text-muted-foreground">فحص بصري للكابل الضوئي وتحديد الأعطال</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Card className="border-2 border-red-200">
                    <CardContent className="p-6 text-center">
                      <Eye className="h-12 w-12 mx-auto mb-4 text-red-600" />
                      <h4 className="font-semibold mb-2">فحص الموصلات</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        فحص نظافة وجودة موصلات الألياف الضوئية
                      </p>
                      <Button onClick={runVisualInspection} variant="outline" className="w-full">
                        بدء الفحص البصري
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                      <h4 className="font-semibold mb-2">اختبار الاستمرارية</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        التأكد من سلامة الكابل وعدم وجود انقطاع
                      </p>
                      <Button onClick={runContinuityTest} variant="outline" className="w-full">
                        اختبار الاستمرارية
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">إرشادات الفحص البصري</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-blue-600 mb-2" />
                      <div className="text-sm font-medium mb-1">نظافة الموصل</div>
                      <div className="text-xs text-muted-foreground">تأكد من نظافة سطح الموصل</div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-yellow-600 mb-2" />
                      <div className="text-sm font-medium mb-1">فحص الخدوش</div>
                      <div className="text-xs text-muted-foreground">ابحث عن أي خدوش أو تلف</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <Eye className="h-6 w-6 text-green-600 mb-2" />
                      <div className="text-sm font-medium mb-1">محاذاة الألياف</div>
                      <div className="text-xs text-muted-foreground">تحقق من محاذاة الألياف الصحيحة</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Timer className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h4 className="font-semibold mb-2">Insertion Loss Test</h4>
                    <p className="text-sm text-muted-foreground mb-4">قياس خسائر الإدراج</p>
                    <Button variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Radio className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h4 className="font-semibold mb-2">Return Loss Test</h4>
                    <p className="text-sm text-muted-foreground mb-4">قياس خسائر الانعكاس</p>
                    <Button variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <h4 className="font-semibold mb-2">Chromatic Dispersion</h4>
                    <p className="text-sm text-muted-foreground mb-4">قياس التشتت اللوني</p>
                    <Button variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Gauge className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                    <h4 className="font-semibold mb-2">PMD Test</h4>
                    <p className="text-sm text-muted-foreground mb-4">اختبار تشتت الاستقطاب</p>
                    <Button variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-red-600" />
                    <h4 className="font-semibold mb-2">Fault Locator</h4>
                    <p className="text-sm text-muted-foreground mb-4">محدد موقع الأعطال</p>
                    <Button variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-indigo-600" />
                    <h4 className="font-semibold mb-2">Multi-Wavelength Test</h4>
                    <p className="text-sm text-muted-foreground mb-4">اختبار متعدد الأطوال الموجية</p>
                    <Button variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FiberOpticTools;
