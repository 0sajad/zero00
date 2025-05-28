
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Scan,
  FileSearch,
  Network,
  Server,
  Database,
  Key,
  Fingerprint,
  UserCheck,
  Zap,
  RefreshCw
} from 'lucide-react';
import { audioSystem } from '@/utils/audioSystem';
import { useToast } from '@/hooks/use-toast';

interface SecurityMetrics {
  overallScore: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  threats: {
    blocked: number;
    analyzed: number;
    quarantined: number;
  };
  encryption: {
    level: string;
    strength: number;
    protocols: string[];
  };
}

const AdvancedSecuritySystem = () => {
  const { toast } = useToast();
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    overallScore: 92,
    vulnerabilities: { critical: 0, high: 2, medium: 5, low: 12 },
    threats: { blocked: 847, analyzed: 15432, quarantined: 23 },
    encryption: { 
      level: 'AES-256-GCM', 
      strength: 98, 
      protocols: ['TLS 1.3', 'HSTS', 'OCSP Stapling'] 
    }
  });
  
  const [scanningProgress, setScanningProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [realTimeThreats, setRealTimeThreats] = useState<any[]>([]);

  useEffect(() => {
    // محاكاة مراقبة التهديدات في الوقت الفعلي
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const threat = {
          id: Date.now(),
          type: ['Malware', 'Phishing', 'DDoS', 'Intrusion'][Math.floor(Math.random() * 4)],
          severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
          source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          timestamp: new Date(),
          status: 'Blocked'
        };
        
        setRealTimeThreats(prev => [threat, ...prev.slice(0, 9)]);
        
        if (threat.severity === 'Critical' || threat.severity === 'High') {
          audioSystem.playSound('error');
          toast({
            title: `🚨 تهديد ${threat.severity === 'Critical' ? 'حرج' : 'عالي'}`,
            description: `تم حظر ${threat.type} من ${threat.source}`,
            variant: "destructive",
          });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [toast]);

  const runComprehensiveScan = async () => {
    setIsScanning(true);
    setScanningProgress(0);
    
    await audioSystem.playSound('scan');
    
    toast({
      title: "🔍 بدء الفحص الأمني الشامل",
      description: "جاري فحص جميع طبقات الأمان...",
    });

    // محاكاة فحص متقدم
    const scanSteps = [
      'فحص نقاط الدخول',
      'تحليل حركة الشبكة',
      'فحص الثغرات الأمنية',
      'مراجعة التشفير',
      'تدقيق صلاحيات المستخدمين',
      'فحص البرامج الضارة',
      'تحليل سجلات الأمان',
      'اختبار جدار الحماية'
    ];

    for (let i = 0; i < scanSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setScanningProgress(((i + 1) / scanSteps.length) * 100);
      
      if (i === scanSteps.length - 1) {
        await audioSystem.playSound('success');
        
        // تحديث النتائج
        setSecurityMetrics(prev => ({
          ...prev,
          overallScore: Math.min(95, prev.overallScore + Math.floor(Math.random() * 3)),
          vulnerabilities: {
            critical: Math.max(0, prev.vulnerabilities.critical - 1),
            high: Math.max(0, prev.vulnerabilities.high - 1),
            medium: prev.vulnerabilities.medium + Math.floor(Math.random() * 2),
            low: prev.vulnerabilities.low + Math.floor(Math.random() * 3)
          }
        }));
        
        toast({
          title: "✅ اكتمل الفحص الأمني",
          description: "تم تحليل جميع طبقات الأمان بنجاح",
        });
      }
    }
    
    setIsScanning(false);
  };

  const getSecurityGrade = (score: number) => {
    if (score >= 95) return { grade: 'A+', color: 'text-green-600 bg-green-100' };
    if (score >= 90) return { grade: 'A', color: 'text-green-600 bg-green-100' };
    if (score >= 85) return { grade: 'B+', color: 'text-blue-600 bg-blue-100' };
    if (score >= 80) return { grade: 'B', color: 'text-blue-600 bg-blue-100' };
    if (score >= 70) return { grade: 'C', color: 'text-yellow-600 bg-yellow-100' };
    return { grade: 'D', color: 'text-red-600 bg-red-100' };
  };

  const securityGrade = getSecurityGrade(securityMetrics.overallScore);

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center text-red-700">
            <Shield className="h-6 w-6 mr-3" />
            نظام الأمان المتقدم - Advanced Security Suite
            <Badge className="ml-3 bg-red-600 text-white">AI-Powered Protection</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">
                {securityMetrics.overallScore}
              </div>
              <Badge className={`${securityGrade.color} text-lg px-4 py-2`}>
                {securityGrade.grade}
              </Badge>
              <div className="text-sm text-gray-600 mt-1">نقاط الأمان</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {securityMetrics.threats.blocked}
              </div>
              <div className="text-sm text-gray-600">تهديدات محظورة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {securityMetrics.encryption.strength}%
              </div>
              <div className="text-sm text-gray-600">قوة التشفير</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {securityMetrics.vulnerabilities.critical + securityMetrics.vulnerabilities.high}
              </div>
              <div className="text-sm text-gray-600">ثغرات حرجة</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={runComprehensiveScan}
          disabled={isScanning}
          className="h-20 bg-red-600 hover:bg-red-700 text-white"
        >
          {isScanning ? (
            <div className="flex flex-col items-center">
              <Scan className="h-6 w-6 mb-2 animate-spin" />
              <span>جاري الفحص... {scanningProgress.toFixed(0)}%</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Shield className="h-6 w-6 mb-2" />
              <span>فحص أمني شامل</span>
            </div>
          )}
        </Button>

        <Button className="h-20 bg-blue-600 hover:bg-blue-700 text-white">
          <div className="flex flex-col items-center">
            <Lock className="h-6 w-6 mb-2" />
            <span>تقوية التشفير</span>
          </div>
        </Button>

        <Button className="h-20 bg-green-600 hover:bg-green-700 text-white">
          <div className="flex flex-col items-center">
            <Eye className="h-6 w-6 mb-2" />
            <span>مراقبة مباشرة</span>
          </div>
        </Button>
      </div>

      {/* Scanning Progress */}
      {isScanning && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="text-lg font-semibold text-red-600">
                جاري الفحص الأمني المتقدم...
              </div>
            </div>
            <Progress value={scanningProgress} className="h-3 mb-4" />
            <div className="text-center text-sm text-gray-600">
              {scanningProgress.toFixed(0)}% مكتمل
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="threats" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="threats">التهديدات المباشرة</TabsTrigger>
          <TabsTrigger value="vulnerabilities">الثغرات الأمنية</TabsTrigger>
          <TabsTrigger value="encryption">نظام التشفير</TabsTrigger>
          <TabsTrigger value="monitoring">المراقبة المستمرة</TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                التهديدات في الوقت الفعلي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {realTimeThreats.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                    <div>لا توجد تهديدات حالياً - النظام آمن</div>
                  </div>
                ) : (
                  realTimeThreats.map((threat) => (
                    <div
                      key={threat.id}
                      className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <div>
                          <div className="font-medium">{threat.type}</div>
                          <div className="text-sm text-gray-600">من {threat.source}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={
                            threat.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                            threat.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                            threat.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }
                        >
                          {threat.severity}
                        </Badge>
                        <Badge className="bg-green-100 text-green-700">
                          محظور
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-red-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {securityMetrics.vulnerabilities.critical}
                </div>
                <div className="text-sm text-gray-600">حرجة</div>
              </CardContent>
            </Card>
            <Card className="border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {securityMetrics.vulnerabilities.high}
                </div>
                <div className="text-sm text-gray-600">عالية</div>
              </CardContent>
            </Card>
            <Card className="border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {securityMetrics.vulnerabilities.medium}
                </div>
                <div className="text-sm text-gray-600">متوسطة</div>
              </CardContent>
            </Card>
            <Card className="border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {securityMetrics.vulnerabilities.low}
                </div>
                <div className="text-sm text-gray-600">منخفضة</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="encryption" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                نظام التشفير المتقدم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>مستوى التشفير:</span>
                <Badge className="bg-green-100 text-green-700">
                  {securityMetrics.encryption.level}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>قوة التشفير:</span>
                <div className="flex items-center space-x-2">
                  <Progress value={securityMetrics.encryption.strength} className="w-32" />
                  <span className="text-sm font-medium">
                    {securityMetrics.encryption.strength}%
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">البروتوكولات المستخدمة:</div>
                <div className="flex flex-wrap gap-2">
                  {securityMetrics.encryption.protocols.map((protocol, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700">
                      {protocol}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                المراقبة المستمرة للأمان
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Network className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-lg font-bold text-green-600">نشط</div>
                  <div className="text-sm text-gray-600">مراقبة الشبكة</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Server className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-lg font-bold text-blue-600">محمي</div>
                  <div className="text-sm text-gray-600">حماية الخادم</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Database className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-lg font-bold text-purple-600">مؤمن</div>
                  <div className="text-sm text-gray-600">حماية البيانات</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedSecuritySystem;
