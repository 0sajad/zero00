
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  HelpCircle,
  Search,
  Book,
  Zap,
  Network,
  Shield,
  Wifi,
  Activity,
  Globe,
  Terminal,
  Monitor,
  Settings,
  PlayCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const DetailedHelpSystem = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const toolsGuide = [
    {
      id: 'speed-test',
      name: 'اختبار السرعة المتطور',
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      category: 'أساسية',
      benefits: [
        'قياس دقيق لسرعة التحميل والرفع',
        'حساب زمن الاستجابة (Ping) والتأخير',
        'تحليل جودة الاتصال ومعدل فقدان البيانات',
        'مقارنة الأداء مع المعايير العالمية',
        'تقييم مزود الخدمة والباقة المشتركة'
      ],
      howItWorks: [
        'الضغط على زر "بدء اختبار السرعة المتطور"',
        'الأداة تقوم بالاتصال بخوادم متعددة',
        'قياس سرعة التحميل من خلال تنزيل ملفات اختبار',
        'قياس سرعة الرفع من خلال رفع بيانات تجريبية',
        'حساب متوسط زمن الاستجابة عبر عدة محاولات',
        'عرض النتائج مع تحليل مفصل وتقييم الجودة'
      ],
      stepByStep: [
        'انتقل إلى تبويب "اختبار السرعة"',
        'تأكد من إغلاق التطبيقات التي تستخدم الإنترنت',
        'اضغط على "بدء اختبار السرعة المتطور"',
        'انتظر حتى اكتمال الاختبار (1-2 دقيقة)',
        'راجع النتائج والتوصيات المقدمة'
      ]
    },
    {
      id: 'network-scanner',
      name: 'فاحص الشبكة المتقدم',
      icon: <Network className="h-6 w-6 text-green-600" />,
      category: 'مراقبة',
      benefits: [
        'اكتشاف جميع الأجهزة المتصلة بالشبكة',
        'عرض عناوين IP و MAC لكل جهاز',
        'تحديد نوع كل جهاز (حاسوب، هاتف، راوتر)',
        'مراقبة حالة الاتصال لكل جهاز',
        'اكتشاف الأجهزة المشبوهة أو غير المعروفة'
      ],
      howItWorks: [
        'مسح نطاق الشبكة المحلية بالكامل',
        'إرسال طلبات ARP لاكتشاف الأجهزة النشطة',
        'تحليل استجابات الأجهزة وتحديد أنواعها',
        'البحث في قاعدة بيانات MAC للتعرف على المصنعين',
        'عرض النتائج في جدول منظم ومفصل'
      ],
      stepByStep: [
        'اذهب إلى قسم "أدوات الشبكة"',
        'اختر "فاحص الشبكة المتقدم"',
        'اضغط على "بدء مسح الشبكة"',
        'انتظر حتى اكتمال المسح (30-60 ثانية)',
        'راجع قائمة الأجهزة المكتشفة والتفاصيل'
      ]
    },
    {
      id: 'wifi-analyzer',
      name: 'محلل WiFi المتقدم',
      icon: <Wifi className="h-6 w-6 text-purple-600" />,
      category: 'لاسلكية',
      benefits: [
        'عرض جميع شبكات WiFi المتاحة في المنطقة',
        'قياس قوة الإشارة لكل شبكة',
        'تحديد القنوات المستخدمة ومستوى التداخل',
        'فحص أنواع التشفير ومستوى الأمان',
        'اختيار أفضل قناة للراوتر الخاص بك'
      ],
      howItWorks: [
        'مسح الترددات اللاسلكية المختلفة (2.4GHz و 5GHz)',
        'تحليل إشارات البث وقياس قوتها',
        'فحص إعدادات الأمان لكل شبكة',
        'تحديد مستوى التداخل بين الشبكات',
        'تقديم توصيات لتحسين الأداء'
      ],
      stepByStep: [
        'انتقل إلى "محلل WiFi"',
        'اضغط على "فحص الشبكات"',
        'انتظر حتى اكتمال المسح',
        'راجع قائمة الشبكات وتفاصيل كل منها',
        'استخدم التوصيات لتحسين شبكتك'
      ]
    },
    {
      id: 'security-scanner',
      name: 'فاحص الأمان المتطور',
      icon: <Shield className="h-6 w-6 text-red-600" />,
      category: 'أمان',
      benefits: [
        'فحص الثغرات الأمنية في الشبكة',
        'اكتشاف التهديدات والبرمجيات الخبيثة',
        'تقييم قوة كلمات المرور وإعدادات الأمان',
        'فحص المنافذ المفتوحة والخدمات الضعيفة',
        'تقديم توصيات لتحسين الأمان'
      ],
      howItWorks: [
        'فحص شامل لجميع أجهزة الشبكة',
        'اختبار نقاط الضعف المعروفة',
        'تحليل إعدادات الجدار الناري',
        'فحص تحديثات الأمان والتصحيحات',
        'إنشاء تقرير أمان مفصل مع التوصيات'
      ],
      stepByStep: [
        'اذهب إلى "أدوات الأمان"',
        'اختر "فحص الأمان المتطور"',
        'اضغط على "بدء فحص الأمان"',
        'انتظر حتى اكتمال الفحص (2-5 دقائق)',
        'راجع تقرير الأمان ونفذ التوصيات'
      ]
    },
    {
      id: 'bandwidth-monitor',
      name: 'مراقب النطاق الترددي',
      icon: <Activity className="h-6 w-6 text-orange-600" />,
      category: 'مراقبة',
      benefits: [
        'مراقبة استهلاك البيانات في الوقت الفعلي',
        'تحديد الأجهزة الأكثر استهلاكاً للبيانات',
        'عرض إحصائيات مفصلة عن الاستخدام',
        'تنبيهات عند تجاوز حدود الاستهلاك',
        'تحليل أنماط الاستخدام عبر الوقت'
      ],
      howItWorks: [
        'مراقبة مستمرة لحركة البيانات',
        'تسجيل الاستهلاك لكل جهاز على حدة',
        'تحليل البروتوكولات والتطبيقات المستخدمة',
        'حساب معدلات الاستهلاك اليومية والشهرية',
        'إنشاء تقارير مفصلة عن الاستخدام'
      ],
      stepByStep: [
        'انتقل إلى "مراقبة النطاق الترددي"',
        'اضغط على "بدء المراقبة"',
        'راجع الاستهلاك الحالي لكل جهاز',
        'ضع حدود للاستهلاك إذا لزم الأمر',
        'راجع التقارير الدورية والإحصائيات'
      ]
    },
    {
      id: 'dns-lookup',
      name: 'بحث DNS المتقدم',
      icon: <Globe className="h-6 w-6 text-indigo-600" />,
      category: 'تشخيص',
      benefits: [
        'البحث في سجلات DNS المختلفة',
        'تحليل أوقات الاستجابة لخوادم DNS',
        'فحص تكوين النطاقات والمواقع',
        'اكتشاف مشاكل الترجمة والتوجيه',
        'تحسين إعدادات DNS للأداء الأمثل'
      ],
      howItWorks: [
        'إرسال استعلامات DNS لخوادم مختلفة',
        'تحليل الاستجابات وأوقات الرد',
        'فحص سجلات A و AAAA و MX و NS',
        'مقارنة النتائج من خوادم متعددة',
        'تقديم تحليل مفصل للنتائج'
      ],
      stepByStep: [
        'اذهب إلى "بحث DNS"',
        'أدخل اسم النطاق أو العنوان',
        'اختر نوع السجل المطلوب',
        'اضغط على "بحث"',
        'راجع النتائج والتحليل المقدم'
      ]
    }
  ];

  const filteredTools = toolsGuide.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(toolsGuide.map(tool => tool.category))];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Book className="h-5 w-5 mr-2 text-blue-600" />
            دليل الأدوات التفصيلي - شرح شامل لكل أداة
            <Badge className="ml-2 bg-blue-100 text-blue-700">
              دليل كامل ومفصل
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ابحث عن أداة أو فئة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Badge key={category} variant="outline" className="cursor-pointer hover:bg-blue-50">
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {tool.icon}
                    <span className="mr-3">{tool.name}</span>
                    <Badge className="bg-blue-100 text-blue-700">
                      {tool.category}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="benefits" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="benefits">الفوائد والمميزات</TabsTrigger>
                      <TabsTrigger value="how-it-works">كيف تعمل</TabsTrigger>
                      <TabsTrigger value="step-by-step">خطوات الاستخدام</TabsTrigger>
                    </TabsList>

                    <TabsContent value="benefits" className="mt-4">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg mb-3">فوائد ومميزات {tool.name}:</h3>
                        {tool.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="how-it-works" className="mt-4">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg mb-3">كيف تعمل الأداة:</h3>
                        {tool.howItWorks.map((step, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <span className="text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="step-by-step" className="mt-4">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg mb-3">خطوات الاستخدام التفصيلية:</h3>
                        {tool.stepByStep.map((step, index) => (
                          <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                {index + 1}
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-gray-700 flex-1">{step}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <PlayCircle className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-800">جاهز للاستخدام</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      الأداة جاهزة ومُحسنة للاستخدام الفوري. جميع الميزات مفعلة وتعمل بكفاءة عالية.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>لم يتم العثور على أدوات تطابق البحث "{searchQuery}"</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-green-600" />
            نصائح عامة للاستخدام الأمثل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">للحصول على أفضل النتائج</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• تأكد من استقرار الاتصال بالإنترنت</li>
                <li>• أغلق التطبيقات غير الضرورية</li>
                <li>• استخدم كابل ethernet للاختبارات الدقيقة</li>
                <li>• قم بالاختبار في أوقات مختلفة</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">نصائح الأمان</h3>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• لا تشارك معلومات الشبكة الحساسة</li>
                <li>• استخدم كلمات مرور قوية</li>
                <li>• فعل التشفير WPA3 إذا كان متاحاً</li>
                <li>• راجع تقارير الأمان بانتظام</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedHelpSystem;
