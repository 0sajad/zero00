
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
    if (!selectedAction) return;

    setIsExecuting(true);
    
    const actions: Record<string, () => Promise<void>> = {
      scan: async () => {
        toast({
          title: "بدء فحص الشبكة",
          description: "جاري البحث عن الأجهزة المتصلة...",
        });
        
        // محاكاة فحص الشبكة
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const devicesFound = Math.floor(Math.random() * 10) + 5;
        toast({
          title: "فحص الشبكة مكتمل",
          description: `تم العثور على ${devicesFound} جهاز متصل`,
        });
      },
      
      test: async () => {
        toast({
          title: "بدء اختبار السرعة",
          description: "جاري قياس سرعة الإنترنت...",
        });
        
        // محاكاة اختبار السرعة
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        const downloadSpeed = (Math.random() * 100 + 50).toFixed(1);
        const uploadSpeed = (Math.random() * 50 + 20).toFixed(1);
        toast({
          title: "اختبار السرعة مكتمل",
          description: `تحميل: ${downloadSpeed} Mbps | رفع: ${uploadSpeed} Mbps`,
        });
      },
      
      restart: async () => {
        toast({
          title: "إعادة تشغيل الراوتر",
          description: "جاري إعادة تشغيل الراوتر...",
          variant: "destructive",
        });
        
        // محاكاة إعادة تشغيل
        await new Promise(resolve => setTimeout(resolve, 30000));
        
        toast({
          title: "تم إعادة التشغيل بنجاح",
          description: "الراوتر جاهز للعمل",
        });
      },
      
      backup: async () => {
        toast({
          title: "نسخ احتياطي للإعدادات",
          description: "جاري إنشاء نسخة احتياطية...",
        });
        
        // محاكاة النسخ الاحتياطي
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const timestamp = new Date().toLocaleString('ar-SA');
        toast({
          title: "النسخ الاحتياطي مكتمل",
          description: `تم الحفظ في: ${timestamp}`,
        });
      }
    };

    try {
      await actions[selectedAction]();
    } catch (error) {
      toast({
        title: "خطأ في التنفيذ",
        description: "فشل في تنفيذ العملية المطلوبة",
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const scheduleAction = () => {
    if (!selectedAction) return;

    const actionNames: Record<string, string> = {
      scan: "فحص الشبكة",
      test: "اختبار السرعة", 
      restart: "إعادة تشغيل الراوتر",
      backup: "النسخ الاحتياطي"
    };

    toast({
      title: "تم جدولة العملية",
      description: `سيتم تنفيذ ${actionNames[selectedAction]} في الوقت المحدد`,
    });
  };

  const getActionIcon = () => {
    if (isExecuting) return <Settings className="h-4 w-4 mr-2 animate-spin" />;
    return <Play className="h-4 w-4 mr-2" />;
  };

  const getActionStatus = () => {
    if (!selectedAction) return null;
    if (isExecuting) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
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
          <SelectTrigger>
            <SelectValue placeholder="اختر الإجراء" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="scan">فحص الشبكة - Network Scan</SelectItem>
            <SelectItem value="test">اختبار السرعة - Speed Test</SelectItem>
            <SelectItem value="restart">إعادة تشغيل الراوتر - Restart Router</SelectItem>
            <SelectItem value="backup">نسخ احتياطي - Backup Config</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex space-x-2">
          <Button 
            variant="default" 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            disabled={!selectedAction || isExecuting}
            onClick={executeAction}
          >
            {getActionIcon()}
            {isExecuting ? 'جاري التنفيذ...' : 'تنفيذ فوري'}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            disabled={!selectedAction || isExecuting}
            onClick={scheduleAction}
          >
            <Clock className="h-4 w-4 mr-2" />
            جدولة
          </Button>
        </div>

        {isExecuting && (
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              جاري التنفيذ...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
