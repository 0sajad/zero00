
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Network } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { audioSystem } from '@/utils/audioSystem';
import ToolsGrid from './ToolsGrid';

const NetworkToolsTab = () => {
  const { toast } = useToast();

  const networkTools = [
    { id: 'port-scanner', name: 'فحص المنافذ المتقدم', category: 'network' },
    { id: 'wifi-analyzer', name: 'محلل الشبكات اللاسلكية', category: 'wireless' },
    { id: 'bandwidth-monitor', name: 'مراقب عرض النطاق', category: 'monitoring' },
    { id: 'latency-tester', name: 'مختبر زمن الاستجابة', category: 'performance' },
    { id: 'dns-resolver', name: 'محلل DNS المتقدم', category: 'network' },
    { id: 'trace-route', name: 'تتبع المسار الذكي', category: 'diagnostic' }
  ];

  const runAllNetworkTools = async () => {
    await audioSystem.playSound('startup');
    
    toast({
      title: `🚀 تشغيل جميع أدوات الشبكة`,
      description: `بدء تشغيل ${networkTools.length} أداة متقدمة`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">أدوات الشبكة المتقدمة</h3>
        <Button 
          onClick={runAllNetworkTools}
          className="bg-green-600 hover:bg-green-700"
        >
          <Zap className="h-4 w-4 mr-2" />
          تشغيل جميع الأدوات
        </Button>
      </div>
      <ToolsGrid tools={networkTools} />
    </div>
  );
};

export default NetworkToolsTab;
