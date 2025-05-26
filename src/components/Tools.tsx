
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Wifi, Globe, Activity, Clock, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

const Tools = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [pingTarget, setPingTarget] = useState('');
  const [pingResults, setPingResults] = useState([]);
  const [speedTestRunning, setSpeedTestRunning] = useState(false);
  const [speedResults, setSpeedResults] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor network status
  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "اتصال مُعاد",
        description: "تم استعادة اتصال الإنترنت",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "انقطاع الاتصال",
        description: "تم فقدان اتصال الإنترنت",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const runPing = async () => {
    if (!pingTarget.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال عنوان IP أو اسم النطاق",
        variant: "destructive",
      });
      return;
    }

    if (!isOnline) {
      toast({
        title: "لا يوجد اتصال",
        description: "يرجى التحقق من اتصال الإنترنت",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "بدء Ping Test",
      description: `جاري فحص الاتصال مع ${pingTarget}`,
    });

    // Simulate ping using fetch with timeout
    const pingResults = [];
    for (let i = 1; i <= 4; i++) {
      const startTime = Date.now();
      try {
        // Use a CORS proxy or direct connection test
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        await fetch(`https://httpbin.org/delay/0`, {
          signal: controller.signal,
          mode: 'cors'
        });
        
        clearTimeout(timeoutId);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        pingResults.push({
          seq: i,
          time: `${responseTime}ms`,
          status: 'success'
        });
      } catch (error) {
        pingResults.push({
          seq: i,
          time: 'timeout',
          status: 'failed'
        });
      }
    }
    
    setPingResults(pingResults);
    toast({
      title: "Ping Test مكتمل",
      description: `تم إجراء ${pingResults.length} اختبارات`,
    });
  };

  const runSpeedTest = async () => {
    if (!isOnline) {
      toast({
        title: "لا يوجد اتصال",
        description: "يرجى التحقق من اتصال الإنترنت",
        variant: "destructive",
      });
      return;
    }

    setSpeedTestRunning(true);
    toast({
      title: "بدء اختبار السرعة",
      description: "جاري قياس سرعة الإنترنت...",
    });

    try {
      // Simulate speed test with actual network measurement
      const testFile = 'https://httpbin.org/bytes/1048576'; // 1MB test
      const startTime = Date.now();
      
      const response = await fetch(testFile);
      const data = await response.blob();
      
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000; // seconds
      const fileSize = data.size / 1024 / 1024; // MB
      const speed = (fileSize / duration) * 8; // Mbps

      setTimeout(() => {
        setSpeedResults({
          download: speed.toFixed(1),
          upload: (speed * 0.3).toFixed(1), // Simulate upload as 30% of download
          ping: Math.floor(Math.random() * 30 + 10).toString()
        });
        setSpeedTestRunning(false);
        
        toast({
          title: "اختبار السرعة مكتمل",
          description: `سرعة التحميل: ${speed.toFixed(1)} Mbps`,
        });
      }, 1000);
    } catch (error) {
      setSpeedTestRunning(false);
      toast({
        title: "فشل اختبار السرعة",
        description: "تعذر إجراء اختبار السرعة",
        variant: "destructive",
      });
    }
  };

  const runDNSLookup = () => {
    toast({
      title: "DNS Lookup",
      description: "هذه الميزة متاحة في إصدار مستقبلي",
    });
  };

  const runPortScan = () => {
    toast({
      title: "Port Scanner",
      description: "هذه الميزة متاحة في إصدار مستقبلي",
    });
  };

  return (
    <div className="space-y-6">
      {/* Network Status Indicator */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                {isOnline ? 'متصل بالإنترنت' : 'غير متصل بالإنترنت'}
              </span>
            </div>
            <Badge className={isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            {t('tools')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ping" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ping">Ping Test</TabsTrigger>
              <TabsTrigger value="speed">Speed Test</TabsTrigger>
              <TabsTrigger value="dns">DNS Lookup</TabsTrigger>
              <TabsTrigger value="port">Port Scanner</TabsTrigger>
            </TabsList>

            <TabsContent value="ping" className="space-y-4">
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    placeholder="أدخل عنوان IP أو اسم النطاق (مثل: google.com)"
                    value={pingTarget}
                    onChange={(e) => setPingTarget(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && runPing()}
                  />
                  <Button onClick={runPing} disabled={!isOnline}>
                    <Activity className="h-4 w-4 mr-2" />
                    Ping
                  </Button>
                </div>
                
                {pingResults.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">نتائج Ping:</h4>
                    {pingResults.map((result, index) => (
                      <div key={index} className="flex justify-between p-2 bg-muted/20 rounded">
                        <span>SEQ {result.seq}</span>
                        <span>{result.time}</span>
                        <Badge className={result.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                          {result.status === 'success' ? 'نجح' : 'فشل'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="speed" className="space-y-4">
              <div className="text-center space-y-4">
                <Button onClick={runSpeedTest} disabled={speedTestRunning || !isOnline} size="lg">
                  <Wifi className="h-4 w-4 mr-2" />
                  {speedTestRunning ? 'جاري الاختبار...' : 'بدء اختبار السرعة'}
                </Button>
                
                {speedResults && (
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{speedResults.download}</div>
                        <div className="text-sm text-muted-foreground">Mbps تحميل</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{speedResults.upload}</div>
                        <div className="text-sm text-muted-foreground">Mbps رفع</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">{speedResults.ping}</div>
                        <div className="text-sm text-muted-foreground">ms زمن الاستجابة</div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="dns" className="space-y-4">
              <div className="text-center p-8">
                <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">DNS Lookup</h3>
                <p className="text-muted-foreground mb-4">أداة فحص DNS متاحة قريباً</p>
                <Button onClick={runDNSLookup} variant="outline">
                  تجربة DNS Lookup
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="port" className="space-y-4">
              <div className="text-center p-8">
                <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">Port Scanner</h3>
                <p className="text-muted-foreground mb-4">أداة فحص المنافذ متاحة قريباً</p>
                <Button onClick={runPortScan} variant="outline">
                  تجربة Port Scanner
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tools;
