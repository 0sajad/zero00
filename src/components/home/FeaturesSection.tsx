
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Zap, Network, Brain } from 'lucide-react';

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
      score: systemStatus.security
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "الأداء الفائق",
      description: "تحسين ذكي بالذكاء الاصطناعي",
      color: "from-blue-500 to-blue-600",
      score: systemStatus.performance
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: "مراقبة الشبكة",
      description: "مراقبة في الوقت الفعلي 24/7",
      color: "from-green-500 to-green-600",
      score: systemStatus.network
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "الذكاء الاصطناعي",
      description: "تعلم آلي متقدم وتنبؤات دقيقة",
      color: "from-purple-500 to-purple-600",
      score: systemStatus.ai
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            قوة لا محدودة في خدمتك
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تقنيات متطورة ومبتكرة تجعل من OCTA NETWORK الحل الأمثل لجميع احتياجاتك التقنية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
