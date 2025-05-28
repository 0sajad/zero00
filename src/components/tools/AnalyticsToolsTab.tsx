
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { audioSystem } from '@/utils/audioSystem';
import ToolsGrid from './ToolsGrid';

const AnalyticsToolsTab = () => {
  const { toast } = useToast();

  const analyticsTools = [
    { id: 'traffic-analyzer', name: 'محلل حركة البيانات', category: 'analytics' },
    { id: 'performance-profiler', name: 'ملف الأداء الشامل', category: 'analytics' },
    { id: 'usage-statistics', name: 'إحصائيات الاستخدام', category: 'analytics' },
    { id: 'predictive-analysis', name: 'التحليل التنبئي الذكي', category: 'analytics' },
    { id: 'behavioral-analysis', name: 'تحليل السلوك المتقدم', category: 'analytics' },
    { id: 'trend-predictor', name: 'متنبئ الاتجاهات', category: 'analytics' }
  ];

  const runAllAnalyticsTools = async () => {
    await audioSystem.playSound('startup');
    
    toast({
      title: `🚀 تشغيل جميع أدوات التحليل`,
      description: `بدء تشغيل ${analyticsTools.length} أداة متقدمة`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">أدوات التحليل المتقدمة</h3>
        <Button 
          onClick={runAllAnalyticsTools}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          تشغيل التحليل الشامل
        </Button>
      </div>
      <ToolsGrid tools={analyticsTools} />
    </div>
  );
};

export default AnalyticsToolsTab;
