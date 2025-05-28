
import React from 'react';
import { Button } from '@/components/ui/button';
import { Cpu } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { audioSystem } from '@/utils/audioSystem';
import ToolsGrid from './ToolsGrid';

const SystemToolsTab = () => {
  const { toast } = useToast();

  const systemTools = [
    { id: 'system-optimizer', name: 'محسن النظام الذكي', category: 'system' },
    { id: 'memory-analyzer', name: 'محلل الذاكرة المتقدم', category: 'system' },
    { id: 'process-monitor', name: 'مراقب العمليات', category: 'system' },
    { id: 'registry-cleaner', name: 'منظف التسجيل الذكي', category: 'system' },
    { id: 'startup-manager', name: 'مدير بدء التشغيل', category: 'system' },
    { id: 'service-controller', name: 'تحكم الخدمات المتقدم', category: 'system' }
  ];

  const runAllSystemTools = async () => {
    await audioSystem.playSound('startup');
    
    toast({
      title: `🚀 تشغيل جميع أدوات النظام`,
      description: `بدء تشغيل ${systemTools.length} أداة متقدمة`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">أدوات النظام المتقدمة</h3>
        <Button 
          onClick={runAllSystemTools}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Cpu className="h-4 w-4 mr-2" />
          تحسين النظام الكامل
        </Button>
      </div>
      <ToolsGrid tools={systemTools} />
    </div>
  );
};

export default SystemToolsTab;
