
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Play, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuickActionsCard = () => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();

  const executeAction = async () => {
    if (!selectedAction) {
      toast({
        title: "لم يتم اختيار إجراء",
        description: "يرجى اختيار إجراء قبل التنفيذ",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);
    
    const actions: Record<string, () => Promise<void>> = {
      scan: async () => {
        toast({
          title: "بدء فحص الشبكة",
          description: "جاري البحث عن الأجهزة المتصلة...",
        });
        
        // محاكاة فحص الشبكة مع تقدم متدرج
        for (let i = 0; i <= 100; i += 20) {
          await new Promise(resolve => setTimeout(resolve, 600));
          if (i < 100) {
            toast({
              title: "فحص الشبكة",
              description: `جاري الفحص... ${i}%`,
            });
          }
        }
        
        const devicesFound = Math.floor(Math.random() * 15) + 5;
        const vulnerabilities = Math.floor(Math.random() * 3);
        
        toast({
          title: "فحص الشبكة مكتمل ✅",
          description: `تم العثور على ${devicesFound} جهاز متصل، ${vulnerabilities} مشاكل أمنية محتملة`,
        });
      },
      
      test: async () => {
        toast({
          title: "بدء اختبار السرعة",
          description: "جاري قياس سرعة الإنترنت...",
        });
        
        // محاكاة اختبار السرعة مع قياسات متدرجة
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: "اختبار التحميل",
          description: "جاري قياس سرعة التحميل...",
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast({
          title: "اختبار الرفع",
          description: "جاري قياس سرعة الرفع...",
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const downloadSpeed = (Math.random() * 150 + 50).toFixed(1);
        const uploadSpeed = (Math.random() * 75 + 25).toFixed(1);
        const ping = Math.floor(Math.random() * 50 + 10);
        
        toast({
          title: "اختبار السرعة مكتمل ✅",
          description: `⬇️ تحميل: ${downloadSpeed} Mbps | ⬆️ رفع: ${uploadSpeed} Mbps | 📡 Ping: ${ping}ms`,
        });
      },
      
      restart: async () => {
        toast({
          title: "تحذير: إعادة تشغيل الراوتر",
          description: "سيتم قطع الاتصال مؤقتاً أثناء إعادة التشغيل...",
          variant: "destructive",
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast({
          title: "جاري إعادة التشغيل",
          description: "إعادة تهيئة النظام... 🔄",
        });
        
        await new Promise(resolve => setTimeout(resolve, 8000));
        toast({
          title: "فحص الاتصال",
          description: "التحقق من حالة الشبكة...",
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        toast({
          title: "إعادة التشغيل مكتملة ✅",
          description: "الراوتر يعمل بشكل طبيعي والشبكة متاحة",
        });
      },
      
      backup: async () => {
        toast({
          title: "بدء النسخ الاحتياطي",
          description: "جاري إنشاء نسخة احتياطية من الإعدادات...",
        });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: "تجميع البيانات",
          description: "جاري تجميع إعدادات الشبكة والأمان...",
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const timestamp = new Date().toLocaleString('ar-SA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        toast({
          title: "النسخ الاحتياطي مكتمل ✅",
          description: `📁 تم الحفظ بنجاح في: ${timestamp}`,
        });
      },

      security: async () => {
        toast({
          title: "بدء فحص الأمان",
          description: "جاري فحص الثغرات الأمنية والتهديدات...",
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast({
          title: "فحص جدار الحماية",
          description: "التحقق من إعدادات الحماية...",
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const securityScore = Math.floor(Math.random() * 20 + 80);
        const threatsBlocked = Math.floor(Math.random() * 50 + 10);
        
        toast({
          title: "فحص الأمان مكتمل ✅",
          description: `🛡️ نقاط الأمان: ${securityScore}/100 | 🚫 تم حظر ${threatsBlocked} تهديد`,
        });
      }
    };

    try {
      await actions[selectedAction]();
    } catch (error) {
      console.error('خطأ في تنفيذ الإجراء:', error);
      toast({
        title: "خطأ في التنفيذ ❌",
        description: "فشل في تنفيذ العملية المطلوبة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const scheduleAction = () => {
    if (!selectedAction) {
      toast({
        title: "لم يتم اختيار إجراء",
        description: "يرجى اختيار إجراء قبل الجدولة",
        variant: "destructive",
      });
      return;
    }

    const actionNames: Record<string, string> = {
      scan: "فحص الشبكة",
      test: "اختبار السرعة", 
      restart: "إعادة تشغيل الراوتر",
      backup: "النسخ الاحتياطي",
      security: "فحص الأمان"
    };

    const scheduledTime = new Date();
    scheduledTime.setHours(scheduledTime.getHours() + 1);

    toast({
      title: "تم جدولة العملية ✅",
      description: `📅 سيتم تنفيذ ${actionNames[selectedAction]} في ${scheduledTime.toLocaleTimeString('ar-SA')}`,
    });
  };

  const getActionIcon = () => {
    if (isExecuting) return <Settings className="h-4 w-4 mr-2 animate-spin" />;
    return <Play className="h-4 w-4 mr-2" />;
  };

  const getActionStatus = () => {
    if (!selectedAction) return null;
    if (isExecuting) return <AlertTriangle className="h-4 w-4 text-yellow-500 animate-pulse" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  return (
    <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-blue-600" />
            الإجراءات السريعة
          </div>
          {getActionStatus()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedAction} onValueChange={setSelectedAction} disabled={isExecuting}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="اختر الإجراء المطلوب" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            <SelectItem value="scan">🔍 فحص الشبكة - Network Scan</SelectItem>
            <SelectItem value="test">⚡ اختبار السرعة - Speed Test</SelectItem>
            <SelectItem value="security">🛡️ فحص الأمان - Security Check</SelectItem>
            <SelectItem value="restart">🔄 إعادة تشغيل الراوتر - Restart Router</SelectItem>
            <SelectItem value="backup">💾 نسخ احتياطي - Backup Config</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button 
            variant="default" 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!selectedAction || isExecuting}
            onClick={executeAction}
          >
            {getActionIcon()}
            {isExecuting ? 'جاري التنفيذ...' : 'تنفيذ فوري'}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
            disabled={!selectedAction || isExecuting}
            onClick={scheduleAction}
          >
            <Clock className="h-4 w-4 mr-2" />
            جدولة
          </Button>
        </div>

        {isExecuting && (
          <div className="text-center py-2">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-100 text-blue-700 border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              جاري التنفيذ... يرجى الانتظار
            </div>
          </div>
        )}

        {!isExecuting && selectedAction && (
          <div className="text-center py-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              جاهز للتنفيذ
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
