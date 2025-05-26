
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Wifi, Globe, Activity, Clock, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Tools = () => {
  const { t } = useTranslation();
  const [pingTarget, setPingTarget] = useState('');
  const [pingResults, setPingResults] = useState([]);
  const [speedTestRunning, setSpeedTestRunning] = useState(false);
  const [speedResults, setSpeedResults] = useState(null);

  const runPing = () => {
    if (!pingTarget) return;
    const mockResults = [
      { seq: 1, time: '12ms', status: 'success' },
      { seq: 2, time: '15ms', status: 'success' },
      { seq: 3, time: '11ms', status: 'success' },
      { seq: 4, time: '14ms', status: 'success' }
    ];
    setPingResults(mockResults);
  };

  const runSpeedTest = () => {
    setSpeedTestRunning(true);
    setTimeout(() => {
      setSpeedResults({
        download: '85.4',
        upload: '23.7',
        ping: '12'
      });
      setSpeedTestRunning(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
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
                    placeholder="أدخل عنوان IP أو اسم النطاق"
                    value={pingTarget}
                    onChange={(e) => setPingTarget(e.target.value)}
                  />
                  <Button onClick={runPing}>
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
                        <Badge className="bg-green-100 text-green-700">نجح</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="speed" className="space-y-4">
              <div className="text-center space-y-4">
                <Button onClick={runSpeedTest} disabled={speedTestRunning} size="lg">
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
                <p className="text-muted-foreground">أداة فحص DNS متاحة قريباً</p>
              </div>
            </TabsContent>

            <TabsContent value="port" className="space-y-4">
              <div className="text-center p-8">
                <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">Port Scanner</h3>
                <p className="text-muted-foreground">أداة فحص المنافذ متاحة قريباً</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tools;
