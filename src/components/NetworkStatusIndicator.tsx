
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wifi, Signal, Globe, Activity, AlertTriangle } from 'lucide-react';

const NetworkStatusIndicator = () => {
  const [networkStatus, setNetworkStatus] = useState({
    isOnline: navigator.onLine,
    quality: 95,
    latency: 0,
    bandwidth: 0,
    lastChecked: new Date()
  });

  useEffect(() => {
    const checkNetworkQuality = async () => {
      try {
        const start = performance.now();
        await fetch('https://www.google.com/favicon.ico', { 
          mode: 'no-cors',
          cache: 'no-cache'
        });
        const latency = Math.round(performance.now() - start);
        
        // Simulate bandwidth test with connection API
        const connection = (navigator as any).connection;
        const bandwidth = connection?.downlink ? connection.downlink * 1000 : Math.random() * 100 + 50;
        
        setNetworkStatus(prev => ({
          ...prev,
          latency,
          bandwidth: Math.round(bandwidth),
          quality: latency < 50 ? 95 : latency < 100 ? 85 : 75,
          lastChecked: new Date()
        }));
      } catch (error) {
        console.log('Network check failed:', error);
        setNetworkStatus(prev => ({
          ...prev,
          quality: 50,
          lastChecked: new Date()
        }));
      }
    };

    const handleOnline = () => {
      setNetworkStatus(prev => ({ ...prev, isOnline: true }));
      checkNetworkQuality();
    };

    const handleOffline = () => {
      setNetworkStatus(prev => ({ ...prev, isOnline: false, quality: 0 }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (networkStatus.isOnline) {
      checkNetworkQuality();
    }

    // Periodic checks every 30 seconds
    const interval = setInterval(checkNetworkQuality, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'text-green-600 bg-green-100 border-green-300';
    if (quality >= 70) return 'text-yellow-600 bg-yellow-100 border-yellow-300';
    return 'text-red-600 bg-red-100 border-red-300';
  };

  const getQualityText = (quality: number) => {
    if (quality >= 90) return 'ممتاز';
    if (quality >= 70) return 'جيد';
    if (quality >= 50) return 'متوسط';
    return 'ضعيف';
  };

  return (
    <Card className="border-2 border-blue-200 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Activity className="h-5 w-5 mr-2 text-blue-600" />
          حالة الشبكة المباشرة
          <Badge className="ml-2 bg-blue-100 text-blue-700">
            Real-time by Sajad Kadhim
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Connection Status */}
          <div className="text-center p-3 rounded-lg border">
            <div className="flex items-center justify-center mb-2">
              {networkStatus.isOnline ? (
                <Wifi className="h-6 w-6 text-green-500" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-500" />
              )}
            </div>
            <div className="text-sm font-medium">
              {networkStatus.isOnline ? 'متصل' : 'غير متصل'}
            </div>
            <div className="text-xs text-gray-500">حالة الاتصال</div>
          </div>

          {/* Network Quality */}
          <div className="text-center p-3 rounded-lg border">
            <Signal className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-sm font-medium">{getQualityText(networkStatus.quality)}</div>
            <div className="text-xs text-gray-500">جودة الشبكة</div>
            <Progress value={networkStatus.quality} className="mt-2 h-2" />
          </div>

          {/* Latency */}
          <div className="text-center p-3 rounded-lg border">
            <Globe className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className="text-sm font-medium">{networkStatus.latency}ms</div>
            <div className="text-xs text-gray-500">زمن الاستجابة</div>
          </div>

          {/* Bandwidth */}
          <div className="text-center p-3 rounded-lg border">
            <Activity className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-sm font-medium">{networkStatus.bandwidth} Kbps</div>
            <div className="text-xs text-gray-500">عرض النطاق</div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          آخر فحص: {networkStatus.lastChecked.toLocaleTimeString('ar-IQ')} | 
          مطور بواسطة Sajad Kadhim
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatusIndicator;
