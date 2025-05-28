
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Network, Brain } from 'lucide-react';
import AnimatedCard from '@/components/enhanced-ui/AnimatedCard';

const FeaturesSection = () => {
  const [systemStatus] = useState({
    security: 96,
    performance: 94,
    network: 98,
    ai: 92
  });

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "الأمان المتقدم",
      description: "حماية بمستوى عسكري مع تشفير AES-256",
      color: "from-red-500 to-red-600",
      score: systemStatus.security,
      effect: 'fade-in-left' as const
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "الأداء الفائق",
      description: "تحسين ذكي بالذكاء الاصطناعي",
      color: "from-blue-500 to-blue-600",
      score: systemStatus.performance,
      effect: 'fade-in-up' as const
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: "مراقبة الشبكة",
      description: "مراقبة في الوقت الفعلي 24/7",
      color: "from-green-500 to-green-600",
      score: systemStatus.network,
      effect: 'fade-in-right' as const
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "الذكاء الاصطناعي",
      description: "تعلم آلي متقدم وتنبؤات دقيقة",
      color: "from-purple-500 to-purple-600",
      score: systemStatus.ai,
      effect: 'hover' as const
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 octa-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 octa-text-glow">
            قوة لا محدودة في خدمتك
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تقنيات متطورة ومبتكرة تجعل من OCTA NETWORK الحل الأمثل لجميع احتياجاتك التقنية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <AnimatedCard 
              key={index}
              effect={feature.effect}
              className="border-0 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color} mb-6`}></div>
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} text-white mb-6 octa-hardware-accelerated hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <div className="space-y-3">
                  <Progress value={feature.score} className="h-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">الأداء</span>
                    <Badge className={`bg-gradient-to-r ${feature.color} text-white`}>
                      {feature.score}%
                    </Badge>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
