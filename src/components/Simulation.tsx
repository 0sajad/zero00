
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Play, Square, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Simulation = () => {
  const { t } = useTranslation();
  const [running, setRunning] = useState(false);
  const [scenario, setScenario] = useState('');

  const scenarios = [
    { id: 'ddos', name: 'محاكاة هجوم DDoS', description: 'اختبار مقاومة الشبكة للهجمات' },
    { id: 'bandwidth', name: 'اختبار النطاق الترددي', description: 'فحص حدود سعة الشبكة' },
    { id: 'latency', name: 'محاكاة التأخير', description: 'اختبار أداء الشبكة مع زمن استجابة عالي' },
    { id: 'failure', name: 'محاكاة أعطال الأجهزة', description: 'اختبار استقرار الشبكة عند تعطل أجهزة' }
  ];

  const startSimulation = () => {
    if (!scenario) return;
    setRunning(true);
    setTimeout(() => setRunning(false), 5000);
  };

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
            <Select value={scenario} onValueChange={setScenario}>
              <SelectTrigger>
                <SelectValue placeholder="اختر سيناريو..." />
              </SelectTrigger>
              <SelectContent>
                {scenarios.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {scenario && (
            <div className="p-3 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {scenarios.find(s => s.id === scenario)?.description}
              </p>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Button 
              onClick={startSimulation} 
              disabled={!scenario || running}
              className="flex items-center"
            >
              {running ? (
                <>
                  <Square className="h-4 w-4 mr-2" />
                  جاري التشغيل...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  بدء المحاكاة
                </>
              )}
            </Button>
            
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              إعدادات متقدمة
            </Button>
          </div>

          {running && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>حالة المحاكاة:</span>
                <Badge className="bg-green-100 text-green-700">قيد التشغيل</Badge>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm">المحاكاة قيد التشغيل... يتم تحليل النتائج...</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Simulation;
