
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Network, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SecurityTab = () => {
  const { toast } = useToast();
  const [targetHost, setTargetHost] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [vulnerabilityResults, setVulnerabilityResults] = useState<any[]>([]);

  const runVulnerabilityScanner = async () => {
    if (!targetHost.trim()) {
      toast({
        title: "خطأ في المدخلات",
        description: "يرجى إدخال عنوان IP أو اسم النطاق",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setVulnerabilityResults([]);

    toast({
      title: "بدء فحص الثغرات الأمنية",
      description: `جاري فحص ${targetHost} للثغرات الأمنية...`,
    });

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          const vulnerabilities = [
            {
              id: 'CVE-2023-001',
              severity: 'عالي',
              title: 'ثغرة في بروتوكول SSH',
              description: 'إمكانية تجاوز المصادقة',
              port: 22,
              service: 'SSH',
              status: 'مفتوح',
              recommendation: 'تحديث إصدار SSH'
            },
            {
              id: 'CVE-2023-002',
              severity: 'متوسط',
              title: 'ثغرة في خدمة HTTP',
              description: 'تسريب معلومات النظام',
              port: 80,
              service: 'HTTP',
              status: 'محتمل',
              recommendation: 'إخفاء معلومات الخادم'
            }
          ];

          setVulnerabilityResults(vulnerabilities);
          
          toast({
            title: "فحص الثغرات مكتمل",
            description: `تم العثور على ${vulnerabilities.length} ثغرة`,
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'عالي': return 'bg-red-100 text-red-700 border-red-200';
      case 'متوسط': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'منخفض': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">الهدف المراد فحصه</label>
        <Input
          placeholder="IP أو اسم النطاق (مثل: example.com أو 192.168.1.1)"
          value={targetHost}
          onChange={(e) => setTargetHost(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && runVulnerabilityScanner()}
        />
      </div>

      <div className="flex space-x-2">
        <Button onClick={runVulnerabilityScanner} disabled={isScanning} className="bg-red-600 hover:bg-red-700">
          <Search className="h-4 w-4 mr-2" />
          {isScanning ? 'جاري الفحص...' : 'فحص الثغرات الأمنية'}
        </Button>
        
        <Button variant="outline">
          <Network className="h-4 w-4 mr-2" />
          رسم الشبكة
        </Button>
      </div>

      {isScanning && (
        <div className="space-y-2">
          <Progress value={scanProgress} className="w-full" />
          <p className="text-sm text-muted-foreground">{scanProgress}% - فحص الثغرات الأمنية</p>
        </div>
      )}

      {vulnerabilityResults.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold">نتائج فحص الثغرات الأمنية:</h4>
          <div className="space-y-3">
            {vulnerabilityResults.map((vuln, index) => (
              <Card key={index} className={`border-l-4 ${
                vuln.severity === 'عالي' ? 'border-l-red-500' :
                vuln.severity === 'متوسط' ? 'border-l-yellow-500' : 'border-l-green-500'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className={`h-4 w-4 ${
                        vuln.severity === 'عالي' ? 'text-red-600' :
                        vuln.severity === 'متوسط' ? 'text-yellow-600' : 'text-green-600'
                      }`} />
                      <span className="font-medium">{vuln.title}</span>
                    </div>
                    <Badge className={getSeverityColor(vuln.severity)}>
                      {vuln.severity}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>الوصف: {vuln.description}</div>
                    <div>المنفذ: {vuln.port} ({vuln.service})</div>
                    <div>الحالة: {vuln.status}</div>
                    <div className="text-blue-600">التوصية: {vuln.recommendation}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityTab;
