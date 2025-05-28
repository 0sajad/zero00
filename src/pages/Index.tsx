
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Shield, 
  Zap, 
  Network, 
  Globe, 
  Crown,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';
import NetworkSpeedTest from '@/components/NetworkSpeedTest';
import NetworkScanner from '@/components/NetworkScanner';
import SecurityAuditTool from '@/components/SecurityAuditTool';
import NetworkQualityIndicator from '@/components/NetworkQualityIndicator';

const Index = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "الأمان المتقدم",
      description: "حماية شاملة ومراقبة أمنية متطورة",
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "الأداء الفائق",
      description: "سرعة وكفاءة لا مثيل لها",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <Network className="h-8 w-8 text-green-600" />,
      title: "الشبكات الذكية",
      description: "تحليل وإدارة الشبكات بذكاء اصطناعي",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-600" />,
      title: "التوافق العالمي",
      description: "يعمل على جميع المنصات والخوادم",
      color: "bg-orange-50 border-orange-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-lg">
                <Crown className="w-5 h-5 mr-2" />
                OCTA NETWORK
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              نظام الذكاء العالمي
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              منصة مراقبة الشبكات الأكثر تطوراً في العالم<br />
              <span className="text-purple-600 font-semibold">تطوير: سجاد كاظم</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <Activity className="w-5 h-5 mr-2" />
                  لوحة التحكم الذكية
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/compact">
                <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300">
                  <Globe className="w-5 h-5 mr-2" />
                  المراقبة المدمجة
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { number: "100%", label: "الأمان" },
                { number: "∞", label: "الأدوات" },
                { number: "24/7", label: "المراقبة" },
                { number: "AI", label: "الذكاء" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">المميزات الفريدة</h2>
            <p className="text-xl text-gray-600">تقنيات متطورة لا توجد في أي مكان آخر</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`${feature.color} border-2 hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">الأدوات الاحترافية</h2>
            <p className="text-xl text-gray-600">مجموعة شاملة من الأدوات المتطورة</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            <NetworkSpeedTest />
            <NetworkScanner />
            <SecurityAuditTool />
            <NetworkQualityIndicator />
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Crown className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl font-bold mb-6">تطوير احترافي</h2>
            <p className="text-xl mb-8 opacity-90">
              تم تطوير هذا النظام بواسطة <span className="font-bold text-yellow-400">سجاد كاظم</span><br />
              خبير في الأمن السيبراني والذكاء الاصطناعي
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              {[
                "خبرة عالمية",
                "تطوير متقدم",
                "أمان فائق",
                "ذكاء اصطناعي"
              ].map((skill, index) => (
                <Badge key={index} className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Star className="w-4 h-4 mr-1" />
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <CheckCircle className="h-6 w-6" />, text: "معايير عالمية" },
                { icon: <Shield className="h-6 w-6" />, text: "حماية متقدمة" },
                { icon: <Zap className="h-6 w-6" />, text: "أداء استثنائي" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 text-lg">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center mb-6">
            <Crown className="h-8 w-8 text-yellow-400 mr-3" />
            <h3 className="text-2xl font-bold">OCTA NETWORK</h3>
          </div>
          <p className="text-gray-400 mb-4">نظام الذكاء العالمي لمراقبة الشبكات</p>
          <p className="text-sm text-gray-500">
            © 2024 تطوير سجاد كاظم - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
