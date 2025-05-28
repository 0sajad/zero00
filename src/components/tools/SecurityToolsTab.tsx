
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { audioSystem } from '@/utils/audioSystem';
import ToolsGrid from './ToolsGrid';

const SecurityToolsTab = () => {
  const { toast } = useToast();

  const securityTools = [
    { id: 'vulnerability-scan', name: 'فحص الثغرات الأمنية', category: 'security' },
    { id: 'firewall-analyzer', name: 'محلل جدار الحماية', category: 'security' },
    { id: 'intrusion-detection', name: 'كشف الاختراق المتقدم', category: 'security' },
    { id: 'encryption-test', name: 'اختبار التشفير', category: 'security' },
    { id: 'packet-analyzer', name: 'محلل الحزم الشبكية', category: 'security' },
    { id: 'honeypot-monitor', name: 'مراقب الفخاخ الأمنية', category: 'security' }
  ];

  const runAllSecurityTools = async () => {
    await audioSystem.playSound('startup');
    
    toast({
      title: `🚀 تشغيل جميع أدوات الأمان`,
      description: `بدء تشغيل ${securityTools.length} أداة متقدمة`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">أدوات الأمان المتقدمة</h3>
        <Button 
          onClick={runAllSecurityTools}
          className="bg-red-600 hover:bg-red-700"
        >
          <Shield className="h-4 w-4 mr-2" />
          تشغيل فحص الأمان الشامل
        </Button>
      </div>
      <ToolsGrid tools={securityTools} />
    </div>
  );
};

export default SecurityToolsTab;
