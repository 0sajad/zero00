
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  CheckCircle,
  Crown,
  Sparkles,
  Lock,
  Zap,
  Code
} from 'lucide-react';

interface ModeSelectionProps {
  onModeSelect: (mode: 'client' | 'developer') => void;
}

const ModeSelection = ({ onModeSelect }: ModeSelectionProps) => {
  const modes = [
    {
      id: 'client' as const,
      title: 'وضع العميل',
      subtitle: 'Client Mode',
      description: 'وصول كامل لجميع أدوات مراقبة الشبكة والأمان مع واجهة سهلة الاستخدام',
      icon: <User className="h-12 w-12 text-white" />,
      color: 'from-blue-500 to-cyan-500',
      badge: 'Premium Access',
      badgeColor: 'bg-gradient-to-r from-green-400 to-blue-400',
      buttonColor: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500',
      cardColor: 'border-blue-400/30 hover:border-blue-400 bg-gradient-to-br from-blue-900/40 to-blue-800/40 hover:shadow-blue-500/25',
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
      description: 'صلاحيات إدارية كاملة مع أدوات التطوير المتقدمة والتحكم الشامل',
      icon: <Code className="h-12 w-12 text-white" />,
      color: 'from-purple-500 to-pink-500',
      badge: 'Full Control',
      badgeColor: 'bg-gradient-to-r from-purple-400 to-pink-400',
      buttonColor: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400',
      cardColor: 'border-purple-400/30 hover:border-purple-400 bg-gradient-to-br from-purple-900/40 to-pink-800/40 hover:shadow-purple-500/25',
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
          className={`border-2 transition-all duration-500 cursor-pointer group backdrop-blur-lg hover:shadow-2xl hover:scale-105 ${mode.cardColor}`}
          onClick={() => onModeSelect(mode.id)}
        >
          <CardContent className="p-8 text-center space-y-6">
            <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${mode.color} rounded-3xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-2xl`}>
              {mode.icon}
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">{mode.title}</h3>
              <p className="text-blue-200 text-sm">{mode.subtitle}</p>
              <Badge className={`${mode.badgeColor} text-white px-4 py-2 font-medium`}>
                {mode.badge}
              </Badge>
            </div>
            
            <p className="text-blue-100 text-sm leading-relaxed">
              {mode.description}
            </p>
            
            <div className="space-y-2">
              {mode.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-blue-200">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              className={`w-full text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 group-hover:scale-105 ${mode.buttonColor}`}
            >
              <span className="mr-2">اختيار {mode.title}</span>
              {mode.id === 'client' ? <User className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModeSelection;
