
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Code, 
  Shield,
  Crown,
  Sparkles,
  Lock,
  Zap
} from 'lucide-react';

interface ModeCardProps {
  mode: 'client' | 'developer';
  onSelect: () => void;
}

const ModeCard = ({ mode, onSelect }: ModeCardProps) => {
  const isClient = mode === 'client';
  
  const config = {
    client: {
      title: 'وضع العميل',
      description: 'الوصول الكامل لجميع أدوات المراقبة والتحليل المتطورة مع واجهة سهلة الاستخدام',
      icon: <User className="h-12 w-12 text-white" />,
      buttonText: 'دخول كعميل',
      buttonIcon: <User className="h-6 w-6 mr-3" />,
      colorClasses: {
        card: 'border-blue-400/30 hover:border-blue-400 bg-gradient-to-br from-blue-900/40 to-blue-800/40 hover:shadow-blue-500/25',
        iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600 group-hover:from-blue-300 group-hover:to-blue-500',
        text: 'text-blue-200',
        button: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500'
      },
      badges: [
        { icon: <Crown className="h-3 w-3 mr-1" />, text: 'Client Mode', color: 'bg-blue-500/20 text-blue-300 border border-blue-400/30' },
        { icon: <Sparkles className="h-3 w-3 mr-1" />, text: 'Premium Access', color: 'bg-green-500/20 text-green-300 border border-green-400/30' },
        { icon: <Shield className="h-3 w-3 mr-1" />, text: 'Secure', color: 'bg-purple-500/20 text-purple-300 border border-purple-400/30' }
      ]
    },
    developer: {
      title: 'وضع المطور',
      description: 'صلاحيات كاملة لإدارة النظام والتحكم المتقدم والتطوير مع أدوات احترافية',
      icon: <Code className="h-12 w-12 text-white" />,
      buttonText: 'دخول كمطور',
      buttonIcon: <Zap className="h-6 w-6 mr-3" />,
      colorClasses: {
        card: 'border-red-400/30 hover:border-red-400 bg-gradient-to-br from-red-900/40 to-orange-800/40 hover:shadow-red-500/25',
        iconBg: 'bg-gradient-to-br from-red-400 to-orange-500 group-hover:from-red-300 group-hover:to-orange-400',
        text: 'text-red-200',
        button: 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400'
      },
      badges: [
        { icon: <Code className="h-3 w-3 mr-1" />, text: 'Developer', color: 'bg-red-500/20 text-red-300 border border-red-400/30' },
        { icon: <Lock className="h-3 w-3 mr-1" />, text: 'Admin Access', color: 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' },
        { icon: <Zap className="h-3 w-3 mr-1" />, text: 'Full Control', color: 'bg-orange-500/20 text-orange-300 border border-orange-400/30' }
      ]
    }
  };

  const currentConfig = config[mode];

  return (
    <Card className={`border-2 transition-all duration-500 cursor-pointer group backdrop-blur-lg hover:shadow-2xl hover:scale-105 ${currentConfig.colorClasses.card}`}>
      <CardContent className="p-8 text-center space-y-6">
        <div className={`mx-auto w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-xl group-hover:shadow-2xl ${currentConfig.colorClasses.iconBg}`}>
          {currentConfig.icon}
        </div>
        <div>
          <h3 className="text-3xl font-bold text-white mb-4">{currentConfig.title}</h3>
          <p className={`text-lg mb-6 leading-relaxed ${currentConfig.colorClasses.text}`}>
            {currentConfig.description}
          </p>
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {currentConfig.badges.map((badge, index) => (
              <Badge key={index} className={badge.color}>
                {badge.icon}
                {badge.text}
              </Badge>
            ))}
          </div>
        </div>
        <Button 
          onClick={onSelect}
          className={`w-full text-white py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border-0 group-hover:scale-105 ${currentConfig.colorClasses.button}`}
        >
          {currentConfig.buttonIcon}
          {currentConfig.buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModeCard;
