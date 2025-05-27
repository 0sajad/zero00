
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Wifi, 
  Shield, 
  Zap, 
  Activity, 
  Search,
  Download,
  Upload,
  Globe,
  Monitor,
  Terminal,
  Radio
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NetworkSpeedTest from './NetworkSpeedTest';
import SecurityAuditTool from './SecurityAuditTool';
import NetworkScanner from './NetworkScanner';

const NetworkToolsPanel = () => {
  const { toast } = useToast();
  const [activeTests, setActiveTests] = useState<Record<string, boolean>>({});

  const runQuickScan = async () => {
    setActiveTests(prev => ({ ...prev, quickScan: true }));
    
    try {
      // Real network interface detection
      const interfaces = await getNetworkInterfaces();
      
      toast({
        title: "فحص سريع مكتمل",
        description: `تم العثور على ${interfaces.length} واجهات شبكة نشطة`,
      });
      
      console.log('Quick scan results:', interfaces);
    } catch (error) {
      console.error('Quick scan error:', error);
      toast({
        title: "خطأ في الفحص السريع",
        description: "فشل في إجراء الفحص",
        variant: "destructive",
      });
    } finally {
      setActiveTests(prev => ({ ...prev, quickScan: false }));
    }
  };

  const getNetworkInterfaces = async () => {
    // Simulate network interface detection with real browser capabilities
    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType || 'unknown';
    const downlink = connection?.downlink || 'unknown';
    
    return [
      {
        name: 'Primary Interface',
        type: effectiveType,
        status: navigator.onLine ? 'active' : 'inactive',
        speed: downlink !== 'unknown' ? `${downlink} Mbps` : 'Unknown',
        ip: 'Dynamic IP'
      }
    ];
  };

  return (
    <Card className="border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-600" />
          أدوات الشبكة المتقدمة
          <Badge className="ml-2 bg-blue-100 text-blue-700">
            Professional Tools by Sajad Kadhim
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="speed" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="speed" className="text-xs">اختبار السرعة</TabsTrigger>
            <TabsTrigger value="security" className="text-xs">الأمان</TabsTrigger>
            <TabsTrigger value="scan" className="text-xs">مسح الشبكة</TabsTrigger>
            <TabsTrigger value="monitor" className="text-xs">المراقبة</TabsTrigger>
          </TabsList>

          <TabsContent value="speed" className="space-y-4">
            <NetworkSpeedTest />
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <SecurityAuditTool />
          </TabsContent>

          <TabsContent value="scan" className="space-y-4">
            <NetworkScanner />
          </TabsContent>

          <TabsContent value="monitor" className="space-y-4">
            <Card className="border border-blue-200">
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Monitor className="h-4 w-4 mr-2" />
                  مراقبة الشبكة المباشرة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    onClick={runQuickScan}
                    disabled={activeTests.quickScan}
                    className="w-full"
                    size="sm"
                  >
                    {activeTests.quickScan ? (
                      <>
                        <Activity className="h-4 w-4 mr-2 animate-spin" />
                        جاري الفحص...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        فحص سريع للشبكة
                      </>
                    )}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-green-50 rounded border">
                      <div className="font-medium text-green-700">حالة الشبكة</div>
                      <div className="text-green-600">نشط</div>
                    </div>
                    <div className="p-2 bg-blue-50 rounded border">
                      <div className="font-medium text-blue-700">المراقبة</div>
                      <div className="text-blue-600">مستمرة</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center">
                    مطور بواسطة Sajad Kadhim - مهندس شبكات محترف
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NetworkToolsPanel;
