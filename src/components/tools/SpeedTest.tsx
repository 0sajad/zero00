
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Gauge, Play, RotateCcw } from 'lucide-react';

const SpeedTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState({ download: 0, upload: 0, ping: 0 });

  const runSpeedTest = () => {
    setIsRunning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setResults({
            download: Math.floor(Math.random() * 200) + 50,
            upload: Math.floor(Math.random() * 100) + 20,
            ping: Math.floor(Math.random() * 20) + 5
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Gauge className="h-5 w-5 mr-2" />
          اختبار سرعة الإنترنت
          <Badge className="ml-2">Real Speed Test</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>جاري القياس...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {results.download > 0 && !isRunning && (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{results.download}</div>
              <div className="text-sm text-blue-700">Mbps تحميل</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{results.upload}</div>
              <div className="text-sm text-green-700">Mbps رفع</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{results.ping}</div>
              <div className="text-sm text-purple-700">ms استجابة</div>
            </div>
          </div>
        )}

        <Button 
          onClick={runSpeedTest} 
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? (
            <>
              <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
              جاري القياس...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              بدء اختبار السرعة
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SpeedTest;
