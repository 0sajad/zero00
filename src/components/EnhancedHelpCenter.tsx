
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  Phone, 
  Globe,
  Wifi,
  Shield,
  Gauge,
  Network,
  Activity,
  Download,
  Video,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

const EnhancedHelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const iraqiFaqs = [
    {
      question: 'شلون أبدأ فحص الشبكة؟',
      answer: 'روح لقسم "أدوات الفحص" واضغط على "ابدأ اختبار السرعة المتطور". البرنامج راح يفحص كل شي بالشبكة تلقائياً ويعطيك تقرير مفصل عن الأداء.',
      category: 'بداية'
    },
    {
      question: 'شنو فايدة المساعد الذكي؟',
      answer: 'المساعد الذكي يساعدك تشخص مشاكل الشبكة ويعطيك حلول. تكدر تحچيله باللهجة العراقية وراح يفهمك ويجاوبك. هو يستخدم ذكاء اصطناعي متطور.',
      category: 'ذكاء اصطناعي'
    },
    {
      question: 'شلون أغير لغة البرنامج؟',
      answer: 'اضغط على رمز الكرة الأرضية اللي مكتوب عليه "SA" بالهيدر، أو روح للإعدادات وغير اللغة من هناك. البرنامج يدعم العربية واللهجة العراقية 100%.',
      category: 'إعدادات'
    },
    {
      question: 'هل البرنامج يشتغل بدون نت؟',
      answer: 'البرنامج يشتغل كموقع ويب، بس بعض الميزات مثل اختبار السرعة تحتاج نت. باقي الأدوات مثل فحص أجهزة الشبكة المحلية تشتغل بدون نت.',
      category: 'تقني'
    },
    {
      question: 'شلون أفعل وضع المطور؟',
      answer: 'روح للإعدادات ← وضع المطور ← فعل الخيار. هذا يخليك تشوف أدوات متقدمة أكثر ومعلومات تفصيلية عن الشبكة.',
      category: 'متقدم'
    },
    {
      question: 'شنو يعني Speed Test المتطور؟',
      answer: 'اختبار السرعة المتطور يقيس سرعة النت بدقة عالية، ويعطيك معلومات عن التحميل والرفع وزمن الاستجابة والـ Jitter. كمان يعطيك درجة للأداء من A+ لـ D.',
      category: 'أدوات'
    },
    {
      question: 'شلون أستخدم محلل WiFi؟',
      answer: 'روح لتبويب "WiFi محلل" واضغط "فحص الشبكات". راح يعرض لك كل شبكات الواي فاي الموجودة مع قوة الإشارة والتردد ونوع التشفير وتقييم الجودة.',
      category: 'أدوات'
    },
    {
      question: 'شنو فحص الأمان؟',
      answer: 'فحص الأمان يشوف إذا شبكتك آمنة أو لا. يفحص الثغرات والتهديدات ويعطيك نقاط أمان من 100. كمان يعطيك توصيات لتحسين الأمان.',
      category: 'أمان'
    },
    {
      question: 'شلون أراقب استهلاك البيانات؟',
      answer: 'استخدم أداة "النطاق الترددي" اللي تعرض لك استهلاك البيانات الحالي وأي جهاز يستهلك أكثر. كمان تعرض لك البيانات المتبقية من الباقة الشهرية.',
      category: 'مراقبة'
    },
    {
      question: 'شنو DNS Lookup؟',
      answer: 'DNS Lookup يبحث عن معلومات النطاقات. تكتب اسم موقع مثل google.com وراح يعرض لك عنوان IP والمعلومات التقنية الثانية.',
      category: 'تقني'
    }
  ];

  const toolsGuide = [
    {
      title: 'اختبار السرعة المتطور',
      icon: <Wifi className="h-6 w-6" />,
      description: 'قياس دقيق لسرعة الإنترنت مع تحليل متعمق',
      features: [
        'قياس سرعة التحميل والرفع',
        'حساب زمن الاستجابة والـ Jitter',
        'تقييم جودة الاتصال بدرجات',
        'معلومات مفصلة عن الشبكة'
      ],
      usage: 'اضغط "ابدأ اختبار السرعة المتطور" وانتظر النتائج. الاختبار ياخذ حوالي دقيقتين ويعطيك تقرير شامل.'
    },
    {
      title: 'فحص أجهزة الشبكة',
      icon: <Network className="h-6 w-6" />,
      description: 'اكتشاف جميع الأجهزة المتصلة بالشبكة',
      features: [
        'عرض كل الأجهزة المتصلة',
        'معلومات IP و MAC Address',
        'نوع الجهاز وحالة الاتصال',
        'إحصائيات الاستخدام'
      ],
      usage: 'الأداة تعمل تلقائياً وتعرض الأجهزة المكتشفة. اضغط "إعادة فحص" لتحديث القائمة.'
    },
    {
      title: 'محلل WiFi المتقدم',
      icon: <Wifi className="h-6 w-6" />,
      description: 'تحليل شبكات WiFi وجودة الإشارة',
      features: [
        'عرض جميع شبكات WiFi',
        'قوة الإشارة والتردد',
        'نوع التشفير والأمان',
        'تقييم جودة كل شبكة'
      ],
      usage: 'اضغط "فحص الشبكات" لعرض شبكات WiFi المتاحة مع تحليل مفصل لكل شبكة.'
    },
    {
      title: 'فحص الأمان المتقدم',
      icon: <Shield className="h-6 w-6" />,
      description: 'تحليل أمان الشبكة واكتشاف التهديدات',
      features: [
        'فحص الثغرات الأمنية',
        'اكتشاف التهديدات',
        'تقييم قوة كلمات المرور',
        'توصيات لتحسين الأمان'
      ],
      usage: 'اضغط "بدء فحص الأمان المتقدم" للحصول على تقرير شامل عن أمان شبكتك.'
    },
    {
      title: 'مراقب النطاق الترددي',
      icon: <Gauge className="h-6 w-6" />,
      description: 'مراقبة استهلاك البيانات والسرعة',
      features: [
        'استهلاك البيانات الحالي',
        'أكثر الأجهزة استهلاكاً',
        'البيانات المتبقية',
        'إحصائيات الاستخدام'
      ],
      usage: 'اضغط "بدء مراقبة النطاق الترددي" لعرض تفاصيل استهلاك البيانات.'
    },
    {
      title: 'DNS Lookup',
      icon: <Globe className="h-6 w-6" />,
      description: 'البحث عن معلومات النطاقات',
      features: [
        'عناوين IP للنطاقات',
        'سجلات MX و NS',
        'معلومات DNS كاملة',
        'أوقات انتهاء الصلاحية'
      ],
      usage: 'اكتب اسم النطاق واضغط "DNS Lookup" للحصول على معلومات تفصيلية.'
    }
  ];

  const supportChannels = [
    {
      title: 'الدردشة المباشرة',
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      description: 'تحدث مع فريق الدعم مباشرة باللهجة العراقية',
      availability: '24/7',
      response: 'فوري'
    },
    {
      title: 'البريد الإلكتروني',
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      description: 'أرسل استفسارك بالتفصيل',
      availability: 'دائماً',
      response: 'خلال ساعة'
    },
    {
      title: 'الهاتف',
      icon: <Phone className="h-8 w-8 text-purple-600" />,
      description: 'اتصل بنا مباشرة',
      availability: '8ص - 12م',
      response: 'فوري'
    },
    {
      title: 'دليل المستخدم',
      icon: <Book className="h-8 w-8 text-orange-600" />,
      description: 'دليل شامل لجميع الميزات',
      availability: 'دائماً',
      response: 'فوري'
    }
  ];

  const filteredFaqs = iraqiFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            مركز المساعدة والدعم المتطور
            <Badge className="ml-2 bg-green-100 text-green-700">باللهجة العراقية</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">أسئلة شائعة</TabsTrigger>
              <TabsTrigger value="tools">دليل الأدوات</TabsTrigger>
              <TabsTrigger value="support">الدعم الفني</TabsTrigger>
              <TabsTrigger value="videos">فيديوهات تعليمية</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن سؤال... (باللهجة العراقية)"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* FAQ Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['كل الأسئلة', 'بداية', 'أدوات', 'أمان', 'تقني', 'متقدم'].map((category) => (
                  <Badge key={category} variant="outline" className="cursor-pointer hover:bg-blue-50">
                    {category}
                  </Badge>
                ))}
              </div>

              {/* FAQ List */}
              <div>
                <h3 className="text-lg font-semibold mb-4">الأسئلة الشائعة باللهجة العراقية</h3>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-right">
                        <div className="flex items-center justify-between w-full">
                          <span>{faq.question}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {faq.category}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-right">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">دليل الأدوات المتطورة</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {toolsGuide.map((tool, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="text-blue-600">{tool.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{tool.title}</h4>
                          <p className="text-muted-foreground text-sm mb-3">{tool.description}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h5 className="font-medium mb-2">الميزات:</h5>
                        <ul className="space-y-1">
                          {tool.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center text-sm">
                              <CheckCircle className="h-3 w-3 text-green-600 ml-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h5 className="font-medium mb-1 text-sm">طريقة الاستخدام:</h5>
                        <p className="text-sm text-blue-800">{tool.usage}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">قنوات الدعم الفني</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {supportChannels.map((channel, index) => (
                    <Card key={index}>
                      <CardContent className="p-6 text-center">
                        {channel.icon}
                        <h4 className="font-semibold mb-2 mt-3">{channel.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>متوفر: {channel.availability}</span>
                          <span>الرد: {channel.response}</span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3 w-full">
                          تواصل الآن
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Contact Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>أرسل استفسارك</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="الاسم" />
                      <Input placeholder="البريد الإلكتروني" />
                    </div>
                    <Input placeholder="الموضوع" />
                    <textarea 
                      className="w-full min-h-[100px] p-3 border rounded-lg resize-none"
                      placeholder="اكتب استفسارك بالتفصيل... (تكدر تكتب باللهجة العراقية)"
                    />
                    <Button className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      إرسال الاستفسار
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">فيديوهات تعليمية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'شلون تستخدم اختبار السرعة', duration: '3:45', views: '1.2K' },
                    { title: 'فحص أجهزة الشبكة بالتفصيل', duration: '5:20', views: '890' },
                    { title: 'محلل WiFi للمبتدئين', duration: '4:15', views: '756' },
                    { title: 'فحص أمان الشبكة', duration: '6:30', views: '1.5K' },
                    { title: 'مراقبة استهلاك البيانات', duration: '3:55', views: '643' },
                    { title: 'استخدام DNS Lookup', duration: '2:40', views: '421' }
                  ].map((video, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                          <Video className="h-8 w-8 text-gray-400" />
                        </div>
                        <h4 className="font-medium mb-2 text-sm">{video.title}</h4>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{video.duration}</span>
                          <span>{video.views} مشاهدة</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Help */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Info className="h-5 w-5 text-blue-600" />
              <span className="text-sm">محتاج مساعدة سريعة؟</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <MessageCircle className="h-4 w-4 mr-1" />
                دردشة فورية
              </Button>
              <Button size="sm">
                <Phone className="h-4 w-4 mr-1" />
                اتصل بنا
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedHelpCenter;
