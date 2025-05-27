
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RefreshCw,
  Monitor,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { systemDiagnostics, SystemReport } from '@/utils/systemDiagnostics';

const SystemDiagnosticsPanel = () => {
  const [report, setReport] = useState<SystemReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    try {
      const newReport = await systemDiagnostics.runFullDiagnostics();
      setReport(newReport);
    } catch (error) {
      console.error('خطأ في تشغيل الفحص:', error);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Monitor className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-700">نجح</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-700">تحذير</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-700">خطأ</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">غير محدد</Badge>;
    }
  };

  const getOverallStatus = () => {
    if (!report) return { color: 'gray', text: 'غير محدد', icon: Monitor };
    
    switch (report.overall) {
      case 'healthy':
        return { color: 'green', text: 'صحي', icon: CheckCircle };
      case 'warning':
        return { color: 'yellow', text: 'تحذيرات', icon: AlertTriangle };
      case 'critical':
        return { color: 'red', text: 'حرج', icon: XCircle };
      default:
        return { color: 'gray', text: 'غير محدد', icon: Monitor };
    }
  };

  const overallStatus = getOverallStatus();
  const successPercentage = report ? Math.round((report.summary.success / report.summary.total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* تقرير شامل */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <span>تقرير الفحص الشامل للنظام</span>
            </div>
            <Button 
              onClick={runDiagnostics}
              disabled={isRunning}
              size="sm"
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'جاري الفحص...' : 'إعادة الفحص'}</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {report ? (
            <div className="space-y-6">
              {/* الحالة العامة */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <overallStatus.icon className={`h-8 w-8 text-${overallStatus.color}-600`} />
                  <div>
                    <h3 className="text-lg font-bold">الحالة العامة للنظام</h3>
                    <p className={`text-${overallStatus.color}-600 font-medium`}>
                      {overallStatus.text}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{successPercentage}%</div>
                  <div className="text-sm text-gray-600">معدل النجاح</div>
                </div>
              </div>

              {/* شريط التقدم */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>تقدم الفحص</span>
                  <span>{successPercentage}%</span>
                </div>
                <Progress value={successPercentage} className="h-2" />
              </div>

              {/* إحصائيات سريعة */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{report.summary.success}</div>
                  <div className="text-sm text-green-700">نجح</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{report.summary.warnings}</div>
                  <div className="text-sm text-yellow-700">تحذير</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{report.summary.errors}</div>
                  <div className="text-sm text-red-700">خطأ</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{report.summary.total}</div>
                  <div className="text-sm text-blue-700">إجمالي</div>
                </div>
              </div>

              {/* تفاصيل النتائج */}
              <div className="space-y-2">
                <h4 className="font-bold text-lg">تفاصيل الفحص</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {report.results.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(result.status)}
                        <div>
                          <div className="font-medium">{result.component}</div>
                          <div className="text-sm text-gray-600">{result.message}</div>
                        </div>
                      </div>
                      {getStatusBadge(result.status)}
                    </div>
                  ))}
                </div>
              </div>

              {/* وقت التقرير */}
              <div className="text-xs text-gray-500 text-center">
                آخر فحص: {new Date(report.timestamp).toLocaleString('ar-SA')}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Monitor className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">لم يتم تشغيل الفحص بعد</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* اختبارات إضافية */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <span>اختبارات تفاعلية</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center space-y-2"
              onClick={() => {
                const testLang = document.dir === 'rtl' ? 'ltr' : 'rtl';
                document.dir = testLang;
                setTimeout(() => document.dir = document.dir === 'rtl' ? 'ltr' : 'rtl', 2000);
              }}
            >
              <Globe className="h-5 w-5" />
              <span>اختبار تغيير اللغة</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center space-y-2"
              onClick={() => {
                localStorage.setItem('test-storage', Date.now().toString());
                alert('تم اختبار التخزين المحلي بنجاح');
              }}
            >
              <Monitor className="h-5 w-5" />
              <span>اختبار التخزين المحلي</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemDiagnosticsPanel;
