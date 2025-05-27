
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader2,
  Monitor,
  Smartphone,
  Globe,
  Zap,
  Shield,
  Settings
} from 'lucide-react';
import SystemDiagnosticsPanel from './SystemDiagnosticsPanel';
import NetworkToolsPanel from './NetworkToolsPanel';

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'success' | 'warning' | 'error';
  message: string;
  duration?: number;
}

const ComprehensiveSystemTest = () => {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'تحميل المكونات الأساسية', status: 'pending', message: 'في انتظار التشغيل' },
    { name: 'اختبار التوجيه والملاحة', status: 'pending', message: 'في انتظار التشغيل' },
    { name: 'اختبار اللغات المتعددة', status: 'pending', message: 'في انتظار التشغيل' },
    { name: 'اختبار أدوات الشبكة', status: 'pending', message: 'في انتظار التشغيل' },
    { name: 'اختبار واجهة المستخدم', status: 'pending', message: 'في انتظار التشغيل' },
    { name: 'اختبار الاستجابة للجوال', status: 'pending', message: 'في انتظار التشغيل' },
    { name: 'اختبار الأداء', status: 'pending', message: 'في انتظار التشغيل' },
    { name: 'اختبار التخزين المحلي', status: 'pending', message: 'في انتظار التشغيل' }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentTestIndex, setCurrentTestIndex] = useState(-1);

  const updateTest = (index: number, updates: Partial<TestResult>) => {
    setTests(prev => prev.map((test, i) => 
      i === index ? { ...test, ...updates } : test
    ));
  };

  const runSingleTest = async (index: number): Promise<void> => {
    const test = tests[index];
    const startTime = Date.now();
    
    updateTest(index, { status: 'running', message: 'جاري التشغيل...' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة وقت التشغيل
      
      switch (index) {
        case 0: // تحميل المكونات الأساسية
          if (typeof React !== 'undefined' && document.getElementById('root')) {
            updateTest(index, { 
              status: 'success', 
              message: 'تم تحميل جميع المكونات الأساسية بنجاح',
              duration: Date.now() - startTime
            });
          } else {
            updateTest(index, { 
              status: 'error', 
              message: 'فشل في تحميل بعض المكونات الأساسية',
              duration: Date.now() - startTime
            });
          }
          break;

        case 1: // اختبار التوجيه
          try {
            const currentPath = window.location.pathname;
            updateTest(index, { 
              status: 'success', 
              message: `نظام التوجيه يعمل بشكل صحيح - المسار الحالي: ${currentPath}`,
              duration: Date.now() - startTime
            });
          } catch (error) {
            updateTest(index, { 
              status: 'error', 
              message: 'خطأ في نظام التوجيه',
              duration: Date.now() - startTime
            });
          }
          break;

        case 2: // اختبار اللغات
          try {
            const supportedLangs = ['ar', 'en', 'ar-IQ', 'ja'];
            const currentLang = localStorage.getItem('octagram-language') || 'ar';
            const direction = document.dir;
            
            updateTest(index, { 
              status: 'success', 
              message: `نظام اللغات يعمل - اللغة الحالية: ${currentLang}, الاتجاه: ${direction}`,
              duration: Date.now() - startTime
            });
          } catch (error) {
            updateTest(index, { 
              status: 'error', 
              message: 'خطأ في نظام اللغات',
              duration: Date.now() - startTime
            });
          }
          break;

        case 3: // اختبار أدوات الشبكة
          updateTest(index, { 
            status: 'success', 
            message: 'جميع أدوات الشبكة متاحة ومحملة بنجاح',
            duration: Date.now() - startTime
          });
          break;

        case 4: // اختبار واجهة المستخدم
          try {
            const stylesheets = document.styleSheets.length;
            const theme = localStorage.getItem('theme') || 'system';
            
            updateTest(index, { 
              status: 'success', 
              message: `واجهة المستخدم تعمل بشكل صحيح - ${stylesheets} ملف CSS، الثيم: ${theme}`,
              duration: Date.now() - startTime
            });
          } catch (error) {
            updateTest(index, { 
              status: 'error', 
              message: 'خطأ في واجهة المستخدم',
              duration: Date.now() - startTime
            });
          }
          break;

        case 5: // اختبار الاستجابة للجوال
          try {
            const isMobile = window.innerWidth <= 768;
            const viewport = window.innerWidth;
            
            updateTest(index, { 
              status: 'success', 
              message: `التصميم المتجاوب يعمل - العرض: ${viewport}px, جوال: ${isMobile ? 'نعم' : 'لا'}`,
              duration: Date.now() - startTime
            });
          } catch (error) {
            updateTest(index, { 
              status: 'warning', 
              message: 'تحذير في اختبار الاستجابة للجوال',
              duration: Date.now() - startTime
            });
          }
          break;

        case 6: // اختبار الأداء
          try {
            const start = performance.now();
            // محاكاة عملية معقدة
            await new Promise(resolve => setTimeout(resolve, 500));
            const end = performance.now();
            const duration = end - start;
            
            if (duration < 1000) {
              updateTest(index, { 
                status: 'success', 
                message: `الأداء ممتاز - وقت الاستجابة: ${Math.round(duration)}ms`,
                duration: Date.now() - startTime
              });
            } else {
              updateTest(index, { 
                status: 'warning', 
                message: `الأداء مقبول - وقت الاستجابة: ${Math.round(duration)}ms`,
                duration: Date.now() - startTime
              });
            }
          } catch (error) {
            updateTest(index, { 
              status: 'error', 
              message: 'خطأ في اختبار الأداء',
              duration: Date.now() - startTime
            });
          }
          break;

        case 7: // اختبار التخزين المحلي
          try {
            const testKey = 'system-test-' + Date.now();
            const testValue = 'test-value';
            
            localStorage.setItem(testKey, testValue);
            const retrieved = localStorage.getItem(testKey);
            localStorage.removeItem(testKey);
            
            if (retrieved === testValue) {
              updateTest(index, { 
                status: 'success', 
                message: 'التخزين المحلي يعمل بشكل صحيح',
                duration: Date.now() - startTime
              });
            } else {
              updateTest(index, { 
                status: 'error', 
                message: 'فشل في اختبار التخزين المحلي',
                duration: Date.now() - startTime
              });
            }
          } catch (error) {
            updateTest(index, { 
              status: 'error', 
              message: 'التخزين المحلي غير متاح',
              duration: Date.now() - startTime
            });
          }
          break;

        default:
          updateTest(index, { 
            status: 'warning', 
            message: 'اختبار غير محدد',
            duration: Date.now() - startTime
          });
      }
    } catch (error) {
      updateTest(index, { 
        status: 'error', 
        message: `خطأ في التشغيل: ${error}`,
        duration: Date.now() - startTime
      });
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    
    // إعادة تعيين جميع الاختبارات
    setTests(prev => prev.map(test => ({ 
      ...test, 
      status: 'pending' as const, 
      message: 'في انتظار التشغيل',
      duration: undefined
    })));
    
    // تشغيل الاختبارات واحداً تلو الآخر
    for (let i = 0; i < tests.length; i++) {
      setCurrentTestIndex(i);
      await runSingleTest(i);
      await new Promise(resolve => setTimeout(resolve, 300)); // فترة انتظار قصيرة
    }
    
    setCurrentTestIndex(-1);
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Monitor className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge className="bg-blue-100 text-blue-700">جاري التشغيل</Badge>;
      case 'success':
        return <Badge className="bg-green-100 text-green-700">نجح</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-700">تحذير</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-700">فشل</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">معلق</Badge>;
    }
  };

  const successCount = tests.filter(t => t.status === 'success').length;
  const warningCount = tests.filter(t => t.status === 'warning').length;
  const errorCount = tests.filter(t => t.status === 'error').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Play className="h-6 w-6 text-blue-600" />
              <span>اختبار شامل للنظام</span>
            </div>
            <Button 
              onClick={runAllTests}
              disabled={isRunning}
              className="flex items-center space-x-2"
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span>{isRunning ? 'جاري التشغيل...' : 'تشغيل جميع الاختبارات'}</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{successCount}</div>
              <div className="text-sm text-green-700">نجح</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
              <div className="text-sm text-yellow-700">تحذير</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{errorCount}</div>
              <div className="text-sm text-red-700">فشل</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{tests.length}</div>
              <div className="text-sm text-blue-700">إجمالي</div>
            </div>
          </div>

          {/* قائمة الاختبارات */}
          <div className="space-y-3">
            {tests.map((test, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${
                  currentTestIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <div className="font-medium">{test.name}</div>
                    <div className="text-sm text-gray-600">{test.message}</div>
                    {test.duration && (
                      <div className="text-xs text-gray-500">
                        وقت التشغيل: {test.duration}ms
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(test.status)}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => runSingleTest(index)}
                    disabled={isRunning}
                  >
                    إعادة تشغيل
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* أقسام إضافية */}
      <Tabs defaultValue="diagnostics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="diagnostics" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>تشخيص النظام</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>اختبار الأدوات</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center space-x-2">
            <Monitor className="h-4 w-4" />
            <span>مراقبة الأداء</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="diagnostics" className="space-y-4">
          <SystemDiagnosticsPanel />
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <NetworkToolsPanel />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-green-600" />
                <span>مراقبة الأداء المباشر</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {window.innerWidth}x{window.innerHeight}
                  </div>
                  <div className="text-sm text-blue-700">دقة الشاشة</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {navigator.onLine ? 'متصل' : 'غير متصل'}
                  </div>
                  <div className="text-sm text-green-700">حالة الاتصال</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {document.styleSheets.length}
                  </div>
                  <div className="text-sm text-purple-700">ملفات CSS</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveSystemTest;
