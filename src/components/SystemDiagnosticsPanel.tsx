
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  Shield,
  Monitor,
  Cpu,
  Network
} from 'lucide-react';
import { systemDiagnostics, SystemReport } from '@/utils/systemDiagnostics';

const SystemDiagnosticsPanel = () => {
  const [report, setReport] = useState<SystemReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setProgress(0);
    
    try {
      // محاكاة التقدم
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
      
      const result = await systemDiagnostics.runAllChecks();
      
      clearInterval(interval);
      setProgress(100);
      setReport(result);
      
      setTimeout(() => {
        setProgress(0);
        setIsRunning(false);
      }, 500);
      
    } catch (error) {
      console.error('خطأ في تشخيص النظام:', error);
      setIsRunning(false);
      setProgress(0);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getOverallColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            تشخيص النظام المتقدم
            <Badge className="ml-2 bg-blue-100 text-blue-700">
              دقة عالية
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={runDiagnostics}
            disabled={isRunning}
            className="w-full"
            size="lg"
          >
            {isRunning ? (
              <>
                <Activity className="h-4 w-4 mr-2 animate-spin" />
                جاري فحص النظام... {Math.round(progress)}%
              </>
            ) : (
              <>
                <Monitor className="h-4 w-4 mr-2" />
                تشغيل فحص شامل للنظام
              </>
            )}
          </Button>
          
          {isRunning && (
            <Progress value={progress} className="h-3" />
          )}
        </CardContent>
      </Card>

      {report && (
        <Card className={`border-2 ${getOverallColor(report.overall)}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>تقرير التشخيص</span>
              <Badge className={getOverallColor(report.overall)}>
                {report.overall === 'healthy' ? 'سليم' :
                 report.overall === 'warning' ? 'تحذيرات' : 'مشاكل حرجة'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* ملخص سريع */}
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{report.summary.success}</div>
                <div className="text-sm text-green-700">ناجح</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{report.summary.warnings}</div>
                <div className="text-sm text-yellow-700">تحذيرات</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{report.summary.errors}</div>
                <div className="text-sm text-red-700">أخطاء</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{report.summary.total}</div>
                <div className="text-sm text-blue-700">إجمالي</div>
              </div>
            </div>

            {/* تفاصيل النتائج */}
            <div className="space-y-2">
              <h3 className="font-semibold">تفاصيل الفحص:</h3>
              {report.results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(result.status)}
                    <div>
                      <div className="font-medium">{result.component}</div>
                      <div className="text-sm text-gray-600">{result.message}</div>
                      {result.details && (
                        <div className="text-xs text-gray-500">{result.details}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs text-gray-500 text-center pt-4 border-t">
              تم الفحص في: {report.timestamp}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SystemDiagnosticsPanel;
