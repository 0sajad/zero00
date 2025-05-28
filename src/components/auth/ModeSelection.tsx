
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Settings, CheckCircle } from 'lucide-react';

interface ModeSelectionProps {
  onModeSelect: (mode: 'client' | 'developer') => void;
}

const ModeSelection = ({ onModeSelect }: ModeSelectionProps) => {
  const modes = [
    {
      id: 'client' as const,
      title: 'وضع العميل',
      subtitle: 'Client Mode',
      description: 'وصول كامل لجميع أدوات مراقبة الشبكة والأمان',
      icon: <User className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500',
      badge: 'Premium Access',
      features: [
        'مراقبة الشبكة المتقدمة',
        'أدوات الأمان الشاملة', 
        'تحليل الأداء',
        'تقارير مفصلة'
      ]
    },
    {
      id: 'developer' as const,
      title: 'وضع المطور',
      subtitle: 'Developer Mode',
      description: 'صلاحيات إدارية كاملة مع أدوات التطوير المتقدمة',
      icon: <Settings className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      badge: 'Full Control',
      features: [
        'تحكم كامل بالنظام',
        'محرر الأكواد',
        'إدارة التراخيص',
        'أدوات التشخيص المتقدمة'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {modes.map((mode) => (
        <Card 
          key={mode.id}
          className="border-2 border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          onClick={() => onModeSelect(mode.id)}
        >
          <CardContent className="p-6 space-y-4">
            <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${mode.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
              {mode.icon}
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{mode.title}</h3>
              <p className="text-blue-200 text-sm mb-3">{mode.subtitle}</p>
              <Badge className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-3 py-1">
                {mode.badge}
              </Badge>
            </div>
            
            <p className="text-blue-100 text-center text-sm leading-relaxed">
              {mode.description}
            </p>
            
            <div className="space-y-2">
              {mode.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-blue-200">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  {feature}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModeSelection;
