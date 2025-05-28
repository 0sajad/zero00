import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import EnhancedModeSwitcher from '@/components/auth/EnhancedModeSwitcher';
import { 
  Shield, 
  Zap, 
  Globe, 
  Activity, 
  Eye, 
  Lock, 
  Cpu, 
  Network,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Star,
  Sparkles,
  Brain,
  Rocket
} from 'lucide-react';
import { audioSystem } from '@/utils/audioSystem';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [systemStatus, setSystemStatus] = useState({
    security: 96,
    performance: 94,
    network: 98,
    ai: 92
  });
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // تهيئة النظام
    const initializeSystem = async () => {
      await audioSystem.playSound('startup');
      
      setTimeout(() => {
        setIsInitializing(false);
        toast({
          title: "🚀 مرحباً بك في OCTA NETWORK",
          description: "النظام الأكثر تقدماً في العالم لمراقبة وتأمين الشبكات",
        });
      }, 2000);
    };

    initializeSystem();
  }, [toast]);

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

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Rocket className="h-12 w-12 text-blue-400 animate-pulse" />
            </div>
          </div>
          <div className="text-white space-y-2">
            <div className="text-2xl font-bold">OCTA NETWORK</div>
            <div className="text-blue-300">جاري تهيئة النظام المتقدم...</div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <Globe className="h-12 w-12 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            OCTA NETWORK
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-200 max-w-4xl mx-auto">
            النظام الأكثر تقدماً في التاريخ الرقمي لمراقبة وتأمين وتحليل الشبكات باستخدام الذكاء الاصطناعي المتطور
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 text-lg">
              ✅ AI-Powered
            </Badge>
            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 text-lg">
              🔒 Military-Grade Security
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 text-lg">
              ⚡ Real-Time Monitoring
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 text-lg">
              🚀 Future Technology
            </Badge>
          </div>
          
          <EnhancedModeSwitcher onLogin={async () => true} />
        </div>
      </div>

      {/* Features Section */}
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

          {/* System Status */}
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl md:text-3xl font-bold flex items-center justify-center">
                <Activity className="h-8 w-8 mr-3 text-green-400" />
                حالة النظام المباشرة
                <div className="ml-3 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
                  <div className="text-gray-300">وقت التشغيل</div>
                  <CheckCircle className="h-6 w-6 text-green-400 mx-auto mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">2.3ms</div>
                  <div className="text-gray-300">زمن الاستجابة</div>
                  <Zap className="h-6 w-6 text-blue-400 mx-auto mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">847</div>
                  <div className="text-gray-300">تهديدات محظورة</div>
                  <Shield className="h-6 w-6 text-purple-400 mx-auto mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400 mb-2">15,432</div>
                  <div className="text-gray-300">عمليات تحليل</div>
                  <Eye className="h-6 w-6 text-orange-400 mx-auto mt-2" />
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Badge className="bg-green-500 text-white px-6 py-3 text-lg">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  جميع الأنظمة تعمل بكفاءة مثلى
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              جاهز لتجربة المستقبل؟
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              ادخل إلى عالم التقنية المتطورة واكتشف قوة OCTA NETWORK الحقيقية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                onClick={() => audioSystem.playSound('click')}
              >
                <Rocket className="h-5 w-5 mr-2" />
                ابدأ الآن
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-300 hover:border-gray-400 px-8 py-4 text-lg"
                onClick={() => audioSystem.playSound('hover')}
              >
                <Eye className="h-5 w-5 mr-2" />
                شاهد العرض التوضيحي
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center mb-6">
            <Globe className="h-8 w-8 mr-3 text-blue-400" />
            <span className="text-2xl font-bold">OCTA NETWORK</span>
          </div>
          <p className="text-gray-400 mb-4">
            النظام الأكثر تقدماً في العالم لمراقبة وتأمين الشبكات
          </p>
          <div className="flex justify-center space-x-6">
            <Badge className="bg-blue-600 text-white">تطوير: Sajad Kadhim</Badge>
            <Badge className="bg-green-600 text-white">إصدار: 3.0.0</Badge>
            <Badge className="bg-purple-600 text-white">2024 ©</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
