
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
  MapPin,
  Thermometer,
  Waves,
  Target,
  Microscope,
  Ruler,
  BarChart3,
  Lightbulb,
  Settings,
  FileText,
  Camera,
  Laser,
  Crosshair
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const FiberOpticTools = () => {
  const { toast } = useToast();
  const [otdrRunning, setOtdrRunning] = useState(false);
  const [powerMeterRunning, setPowerMeterRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [fiberResults, setFiberResults] = useState<any>(null);
  const [currentPhase, setCurrentPhase] = useState('');
  const [powerResults, setPowerResults] = useState<any>(null);
  const [visualResults, setVisualResults] = useState<any>(null);
  const [fiberLength, setFiberLength] = useState('30.0');
  const [wavelength, setWavelength] = useState('1550');
  const [pulseWidth, setPulseWidth] = useState('10');

  // OTDR Test Data
  const otdrData = [
    { distance: 0, loss: 0, reflection: -45, event: 'Start' },
    { distance: 1, loss: 0.2, reflection: -50, event: null },
    { distance: 5, loss: 1.1, reflection: -48, event: null },
    { distance: 10, loss: 2.3, reflection: -52, event: null },
    { distance: 15, loss: 3.8, reflection: -35, event: 'Splice' },
    { distance: 20, loss: 4.9, reflection: -51, event: null },
    { distance: 25, loss: 6.2, reflection: -49, event: null },
    { distance: 30, loss: 7.8, reflection: -25, event: 'End' },
  ];

  const reflectometerData = [
    { frequency: 850, power: -15.2, quality: 'ممتاز' },
    { frequency: 1300, power: -12.8, quality: 'جيد جداً' },
    { frequency: 1310, power: -11.5, quality: 'ممتاز' },
    { frequency: 1490, power: -13.2, quality: 'جيد' },
    { frequency: 1550, power: -10.8, quality: 'ممتاز' },
    { frequency: 1625, power: -14.1, quality: 'جيد' }
  ];

  const runOTDR = async () => {
    setOtdrRunning(true);
    setTestProgress(0);
    setFiberResults(null);

    const phases = [
      'تهيئة OTDR...',
      'ضبط المعايرة...',
      'إرسال نبضات الضوء...',
      'قياس انعكاسات الضوء...',
      'تحليل البيانات...',
      'حساب الخسائر...',
      'تحديد المواقع...',
      'إنشاء التقرير...'
    ];

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i]);
      setTestProgress((i + 1) * (100 / phases.length));
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    const results = {
      totalLoss: (Math.random() * 2 + 1).toFixed(2),
      fiberLength: parseFloat(fiberLength).toFixed(1),
      spliceCount: Math.floor(Math.random() * 3 + 1),
      connectorCount: Math.floor(Math.random() * 4 + 2),
      averageSpliceLoss: (Math.random() * 0.1 + 0.05).toFixed(3),
      returnLoss: (Math.random() * 10 + 35).toFixed(1),
      fiberType: 'Single Mode G.652.D',
      wavelength: wavelength + 'nm',
      pulseWidth: pulseWidth + 'ns',
      attenuation: (Math.random() * 0.05 + 0.15).toFixed(3),
      nonLinearity: (Math.random() * 2 + 1).toFixed(1),
      dispersion: (Math.random() * 5 + 15).toFixed(1),
      temperature: (Math.random() * 10 + 20).toFixed(1),
      events: [
        { type: 'Start Connector', distance: '0.0km', loss: '0.3dB', reflection: '-45dB', status: 'good' },
        { type: 'Macro Bend', distance: '8.5km', loss: '0.05dB', reflection: '-55dB', status: 'warning' },
        { type: 'Splice', distance: '15.2km', loss: '0.08dB', reflection: '-35dB', status: 'good' },
        { type: 'Micro Bend', distance: '22.1km', loss: '0.12dB', reflection: '-52dB', status: 'warning' },
        { type: 'Connector', distance: '28.8km', loss: '0.25dB', reflection: '-40dB', status: 'good' },
        { type: 'End Connector', distance: parseFloat(fiberLength).toFixed(1) + 'km', loss: '0.4dB', reflection: '-25dB', status: 'good' }
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
    setPowerResults(null);
    
    toast({
      title: "Power Meter Test",
      description: "جاري قياس قوة الإشارة الضوئية...",
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    const results = {
      receivedPower: (Math.random() * 5 - 15).toFixed(2),
      transmittedPower: (Math.random() * 2 + 3).toFixed(2),
      opticalLoss: (Math.random() * 3 + 1).toFixed(2),
      wavelengths: [
        { wavelength: '850nm', power: (Math.random() * 3 - 18).toFixed(2), status: 'جيد' },
        { wavelength: '1300nm', power: (Math.random() * 3 - 16).toFixed(2), status: 'ممتاز' },
        { wavelength: '1310nm', power: (Math.random() * 3 - 14).toFixed(2), status: 'ممتاز' },
        { wavelength: '1550nm', power: (Math.random() * 3 - 12).toFixed(2), status: 'ممتاز' }
      ],
      stability: Math.random() > 0.7 ? 'مستقر' : 'غير مستقر',
      snr: (Math.random() * 10 + 25).toFixed(1),
      extinction: (Math.random() * 5 + 10).toFixed(1),
      eyeDiagram: 'ممتاز',
      temperature: (Math.random() * 10 + 20).toFixed(1)
    };

    setPowerResults(results);
    setPowerMeterRunning(false);
    
    toast({
      title: "Power Meter مكتمل",
      description: `القوة المستلمة: ${results.receivedPower}dBm، الاستقرار: ${results.stability}`,
    });
  };

  const runVisualInspection = async () => {
    toast({
      title: "Visual Inspection",
      description: "جاري الفحص البصري للموصلات...",
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    const results = {
      connectorCleanliness: Math.random() > 0.7 ? 'نظيف' : 'يحتاج تنظيف',
      scratchLevel: Math.random() > 0.8 ? 'لا يوجد' : 'خدوش طفيفة',
      coreDamage: Math.random() > 0.9 ? 'لا يوجد' : 'تلف طفيف',
      alignmentScore: Math.floor(Math.random() * 20 + 80),
      polishQuality: Math.random() > 0.6 ? 'ممتاز' : 'جيد',
      contaminationLevel: Math.random() > 0.7 ? 'منخفض' : 'متوسط',
      recommendations: [
        'نظف الموصل باستخدام منظف متخصص',
        'تحقق من محاذاة الألياف',
        'استخدم غطاء واقي للموصل'
      ]
    };

    setVisualResults(results);

    toast({
      title: "Visual Inspection مكتمل",
      description: `نظافة الموصل: ${results.connectorCleanliness}، نقاط المحاذاة: ${results.alignmentScore}/100`,
    });
  };

  const runContinuityTest = () => {
    toast({
      title: "Continuity Test",
      description: "اختبار استمرارية الكابل الضوئي مكتمل بنجاح ✓",
    });
  };

  const runInsertionLoss = () => {
    toast({
      title: "Insertion Loss Test",
      description: "قياس خسائر الإدراج: 0.85dB - ضمن المعايير المقبولة",
    });
  };

  const runReturnLoss = () => {
    toast({
      title: "Return Loss Test", 
      description: "قياس خسائر الانعكاس: -42dB - ممتاز",
    });
  };

  const runChromaticDispersion = () => {
    toast({
      title: "Chromatic Dispersion Test",
      description: "التشتت اللوني: 17.2 ps/nm/km - ضمن المواصفات",
    });
  };

  const runPMDTest = () => {
    toast({
      title: "PMD Test",
      description: "تشتت الاستقطاب: 0.15 ps/√km - ممتاز",
    });
  };

  const runFaultLocator = () => {
    toast({
      title: "Fault Locator",
      description: "لم يتم العثور على أعطال - الكابل سليم",
    });
  };

  const runMultiWavelength = () => {
    toast({
      title: "Multi-Wavelength Test",
      description: "اختبار متعدد الأطوال الموجية مكتمل - جميع الأطوال ضمن المعايير",
    });
  };

  const runTemperatureTest = () => {
    toast({
      title: "Temperature Stability Test",
      description: "اختبار الاستقرار الحراري: مستقر عند 23.5°C",
    });
  };

  const runBandwidthTest = () => {
    toast({
      title: "Optical Bandwidth Test",
      description: "النطاق الترددي الضوئي: 850 MHz·km - ممتاز",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Cable className="h-6 w-6 mr-3 text-blue-600" />
            أدوات فحص الكابل الضوئي المتقدمة
            <Badge className="ml-3 bg-blue-100 text-blue-700">Professional+</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="otdr" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="otdr">OTDR</TabsTrigger>
              <TabsTrigger value="power">Power Meter</TabsTrigger>
              <TabsTrigger value="visual">Visual Test</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="otdr" className="space-y-6">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">OTDR - جهاز قياس المجال الزمني الضوئي</h3>
                  <p className="text-muted-foreground">قياس شامل لخصائص الكابل الضوئي وتحديد الأعطال بدقة عالية</p>
                </div>

                {/* إعدادات OTDR */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">طول الكابل (km)</label>
                    <Input 
                      value={fiberLength} 
                      onChange={(e) => setFiberLength(e.target.value)}
                      placeholder="30.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الطول الموجي (nm)</label>
                    <Input 
                      value={wavelength} 
                      onChange={(e) => setWavelength(e.target.value)}
                      placeholder="1550"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">عرض النبضة (ns)</label>
                    <Input 
                      value={pulseWidth} 
                      onChange={(e) => setPulseWidth(e.target.value)}
                      placeholder="10"
                    />
                  </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-medium">تحديد المواقع</div>
                        <div className="text-xs text-muted-foreground">دقة ±1m</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <div className="text-sm font-medium">قياس الخسائر</div>
                        <div className="text-xs text-muted-foreground">±0.01dB</div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <Eye className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-sm font-medium">كشف الأعطال</div>
                        <div className="text-xs text-muted-foreground">تلقائي</div>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <FileText className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <div className="text-sm font-medium">تقرير شامل</div>
                        <div className="text-xs text-muted-foreground">PDF/Excel</div>
                      </div>
                    </div>
                    <Button onClick={runOTDR} size="lg" className="text-lg px-8 py-4">
                      <Activity className="h-6 w-6 mr-2" />
                      بدء OTDR Test المتقدم
                    </Button>
                  </div>
                )}

                {fiberResults && !otdrRunning && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="border-2 border-blue-200">
                        <CardContent className="p-4 text-center">
                          <Ruler className="h-6 w-6 mx-auto mb-2 text-blue-600" />
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
                          <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                          <div className="text-xl font-bold text-purple-600">{fiberResults.attenuation}</div>
                          <div className="text-xs text-muted-foreground">dB/km</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* معلومات تقنية إضافية */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="font-semibold">{fiberResults.dispersion} ps/nm/km</div>
                        <div className="text-xs text-muted-foreground">التشتت اللوني</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="font-semibold">{fiberResults.nonLinearity} W⁻¹km⁻¹</div>
                        <div className="text-xs text-muted-foreground">اللاخطية</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="font-semibold">{fiberResults.temperature}°C</div>
                        <div className="text-xs text-muted-foreground">درجة الحرارة</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">OTDR Trace المحسن</h4>
                      <div className="h-80 bg-gray-50 rounded-lg p-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={otdrData}>
                            <XAxis 
                              dataKey="distance" 
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fill: '#6B7280' }}
                              label={{ value: 'المسافة (km)', position: 'insideBottom', offset: -10 }}
                            />
                            <YAxis 
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fill: '#6B7280' }}
                              domain={['dataMin - 1', 'dataMax + 1']}
                              label={{ value: 'الخسارة (dB)', angle: -90, position: 'insideLeft' }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="loss" 
                              stroke="#3B82F6" 
                              fill="url(#colorLoss)"
                              strokeWidth={3}
                            />
                            <defs>
                              <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                              </linearGradient>
                            </defs>
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">تفاصيل الأحداث المكتشفة</h4>
                      <div className="space-y-2">
                        {fiberResults.events.map((event: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {event.type.includes('Splice') ? (
                                <Radio className="h-4 w-4 text-orange-600" />
                              ) : event.type.includes('Connector') ? (
                                <Cable className="h-4 w-4 text-blue-600" />
                              ) : event.type.includes('Bend') ? (
                                <TrendingUp className="h-4 w-4 text-yellow-600" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                              )}
                              <div>
                                <div className="font-medium">{event.type}</div>
                                <div className="text-sm text-muted-foreground">المسافة: {event.distance}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">خسارة: {event.loss}</div>
                              <div className="text-xs text-muted-foreground">انعكاس: {event.reflection}</div>
                              <Badge className={event.status === 'good' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                                {event.status === 'good' ? 'طبيعي' : 'تحذير'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={runOTDR} variant="outline">
                        إعادة الفحص
                      </Button>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        تصدير التقرير
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="power" className="space-y-6">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Power Meter المتقدم - مقياس القوة الضوئية</h3>
                  <p className="text-muted-foreground">قياس دقيق لقوة الإشارة الضوئية على جميع الأطوال الموجية</p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={runPowerMeter} 
                    disabled={powerMeterRunning}
                    size="lg" 
                    className="text-lg px-8 py-4"
                  >
                    <Gauge className="h-6 w-6 mr-2" />
                    {powerMeterRunning ? 'جاري القياس المتقدم...' : 'بدء قياس القوة المتقدم'}
                  </Button>

                  {powerMeterRunning && (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                    </div>
                  )}

                  {powerResults && !powerMeterRunning && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="border-2 border-green-200">
                          <CardContent className="p-6 text-center">
                            <Gauge className="h-12 w-12 mx-auto mb-4 text-green-600" />
                            <div className="text-2xl font-bold text-green-600 mb-2">{powerResults.receivedPower} dBm</div>
                            <div className="text-sm text-muted-foreground">القوة المستلمة</div>
                            <Badge className="mt-2 bg-green-100 text-green-700">ممتاز</Badge>
                          </CardContent>
                        </Card>

                        <Card className="border-2 border-blue-200">
                          <CardContent className="p-6 text-center">
                            <Zap className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                            <div className="text-2xl font-bold text-blue-600 mb-2">{powerResults.transmittedPower} dBm</div>
                            <div className="text-sm text-muted-foreground">القوة المرسلة</div>
                            <Badge className="mt-2 bg-blue-100 text-blue-700">مثالي</Badge>
                          </CardContent>
                        </Card>

                        <Card className="border-2 border-orange-200">
                          <CardContent className="p-6 text-center">
                            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                            <div className="text-2xl font-bold text-orange-600 mb-2">{powerResults.opticalLoss} dB</div>
                            <div className="text-sm text-muted-foreground">إجمالي الخسائر</div>
                            <Badge className="mt-2 bg-orange-100 text-orange-700">مقبول</Badge>
                          </CardContent>
                        </Card>

                        <Card className="border-2 border-purple-200">
                          <CardContent className="p-6 text-center">
                            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                            <div className="text-2xl font-bold text-purple-600 mb-2">{powerResults.snr} dB</div>
                            <div className="text-sm text-muted-foreground">SNR</div>
                            <Badge className="mt-2 bg-purple-100 text-purple-700">ممتاز</Badge>
                          </CardContent>
                        </Card>
                      </div>

                      {/* قياسات متعددة الأطوال الموجية */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold">قياسات متعددة الأطوال الموجية</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {powerResults.wavelengths.map((wl: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Lightbulb className="h-4 w-4 text-blue-600" />
                                <span className="font-medium">{wl.wavelength}</span>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{wl.power} dBm</div>
                                <Badge className="text-xs bg-green-100 text-green-700">{wl.status}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* معلومات إضافية */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg text-center">
                          <div className="font-semibold">{powerResults.stability}</div>
                          <div className="text-sm text-muted-foreground">استقرار الإشارة</div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                          <div className="font-semibold">{powerResults.extinction} dB</div>
                          <div className="text-sm text-muted-foreground">نسبة الانطفاء</div>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg text-center">
                          <div className="font-semibold">{powerResults.temperature}°C</div>
                          <div className="text-sm text-muted-foreground">درجة الحرارة</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visual" className="space-y-6">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">الفحص البصري المتقدم</h3>
                  <p className="text-muted-foreground">فحص مجهري للموصلات والألياف الضوئية</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <Card className="border-2 border-red-200">
                    <CardContent className="p-6 text-center">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-red-600" />
                      <h4 className="font-semibold mb-2">فحص مجهري</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        فحص بصري دقيق للموصلات بالمجهر
                      </p>
                      <Button onClick={runVisualInspection} variant="outline" className="w-full">
                        بدء الفحص المجهري
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200">
                    <CardContent className="p-6 text-center">
                      <Laser className="h-12 w-12 mx-auto mb-4 text-green-600" />
                      <h4 className="font-semibold mb-2">Visual Fault Locator</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        محدد الأعطال بالليزر المرئي
                      </p>
                      <Button onClick={runContinuityTest} variant="outline" className="w-full">
                        تشغيل VFL
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {visualResults && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold">نتائج الفحص البصري</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <div className="font-semibold">{visualResults.connectorCleanliness}</div>
                          <div className="text-sm text-muted-foreground">نظافة الموصل</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Microscope className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <div className="font-semibold">{visualResults.scratchLevel}</div>
                          <div className="text-sm text-muted-foreground">مستوى الخدوش</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Crosshair className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <div className="font-semibold">{visualResults.alignmentScore}/100</div>
                          <div className="text-sm text-muted-foreground">نقاط المحاذاة</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-semibold mb-2">جودة التلميع: {visualResults.polishQuality}</div>
                        <div className="text-sm text-muted-foreground">تقييم سطح الموصل</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-semibold mb-2">مستوى التلوث: {visualResults.contaminationLevel}</div>
                        <div className="text-sm text-muted-foreground">وجود شوائب</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold">التوصيات:</h5>
                      <div className="space-y-2">
                        {visualResults.recommendations.map((rec: string, index: number) => (
                          <div key={index} className="flex items-center p-2 bg-blue-50 rounded">
                            <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-sm">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">إرشادات الفحص البصري المتقدم</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-blue-600 mb-2" />
                      <div className="text-sm font-medium mb-1">نظافة مثالية</div>
                      <div className="text-xs text-muted-foreground">خالي من الأتربة والزيوت</div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-yellow-600 mb-2" />
                      <div className="text-sm font-medium mb-1">فحص الخدوش</div>
                      <div className="text-xs text-muted-foreground">أقل من 2 ميكرون</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <Eye className="h-6 w-6 text-green-600 mb-2" />
                      <div className="text-sm font-medium mb-1">محاذاة دقيقة</div>
                      <div className="text-xs text-muted-foreground">انحراف أقل من 0.5 ميكرون</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <Settings className="h-6 w-6 text-purple-600 mb-2" />
                      <div className="text-sm font-medium mb-1">معايرة الأدوات</div>
                      <div className="text-xs text-muted-foreground">كل 6 أشهر</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Timer className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h4 className="font-semibold mb-2">Insertion Loss Test</h4>
                    <p className="text-sm text-muted-foreground mb-4">قياس خسائر الإدراج بدقة عالية</p>
                    <Button onClick={runInsertionLoss} variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Radio className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h4 className="font-semibold mb-2">Return Loss Test</h4>
                    <p className="text-sm text-muted-foreground mb-4">قياس خسائر الانعكاس</p>
                    <Button onClick={runReturnLoss} variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Waves className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <h4 className="font-semibold mb-2">Chromatic Dispersion</h4>
                    <p className="text-sm text-muted-foreground mb-4">قياس التشتت اللوني</p>
                    <Button onClick={runChromaticDispersion} variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Gauge className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                    <h4 className="font-semibold mb-2">PMD Test</h4>
                    <p className="text-sm text-muted-foreground mb-4">اختبار تشتت الاستقطاب</p>
                    <Button onClick={runPMDTest} variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-red-600" />
                    <h4 className="font-semibold mb-2">Fault Locator</h4>
                    <p className="text-sm text-muted-foreground mb-4">محدد موقع الأعطال المتقدم</p>
                    <Button onClick={runFaultLocator} variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-indigo-600" />
                    <h4 className="font-semibold mb-2">Multi-Wavelength</h4>
                    <p className="text-sm text-muted-foreground mb-4">اختبار متعدد الأطوال الموجية</p>
                    <Button onClick={runMultiWavelength} variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Thermometer className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
                    <h4 className="font-semibold mb-2">Temperature Test</h4>
                    <p className="text-sm text-muted-foreground mb-4">اختبار الاستقرار الحراري</p>
                    <Button onClick={runTemperatureTest} variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                    <h4 className="font-semibold mb-2">Bandwidth Test</h4>
                    <p className="text-sm text-muted-foreground mb-4">قياس النطاق الترددي الضوئي</p>
                    <Button onClick={runBandwidthTest} variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-pink-600" />
                    <h4 className="font-semibold mb-2">Polarization Analysis</h4>
                    <p className="text-sm text-muted-foreground mb-4">تحليل الاستقطاب المتقدم</p>
                    <Button variant="outline" className="w-full">تشغيل</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-center">تحليل متقدم للكابل الضوئي</h3>
                
                {/* Reflectometer Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>تحليل Reflectometer متعدد الأطوال الموجية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={reflectometerData}>
                          <XAxis dataKey="frequency" />
                          <YAxis />
                          <Bar dataKey="power" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {reflectometerData.map((data, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                          <div className="font-semibold">{data.frequency}nm</div>
                          <div className="text-sm text-muted-foreground">{data.power}dBm</div>
                          <Badge className="text-xs">{data.quality}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Network Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>مؤشرات الأداء</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Bit Error Rate (BER)</span>
                        <Badge className="bg-green-100 text-green-700">10⁻¹²</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Q-Factor</span>
                        <Badge className="bg-blue-100 text-blue-700">18.5 dB</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>OSNR</span>
                        <Badge className="bg-purple-100 text-purple-700">28.3 dB</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Eye Opening</span>
                        <Badge className="bg-orange-100 text-orange-700">85%</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>تحليل الجودة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>جودة الإشارة</span>
                          <span className="font-semibold">95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>استقرار الاتصال</span>
                          <span className="font-semibold">98%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>كفاءة النقل</span>
                          <span className="font-semibold">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Maintenance Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>توصيات الصيانة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <div className="font-medium">الكابل في حالة ممتازة</div>
                          <div className="text-sm text-muted-foreground">جميع المؤشرات ضمن النطاق المثالي</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <div className="font-medium">مراقبة دورية</div>
                          <div className="text-sm text-muted-foreground">فحص شهري للموصلات والوصلات</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="font-medium">تحديث التوثيق</div>
                          <div className="text-sm text-muted-foreground">توثيق نتائج الفحص الحالي</div>
                        </div>
                      </div>
                    </div>
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
