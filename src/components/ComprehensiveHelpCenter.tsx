
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
  ArrowRight,
  Info,
  MessageCircle,
  Phone,
  Mail,
  Download,
  Video,
  Users,
  ExternalLink
} from 'lucide-react';

const ComprehensiveHelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const toolsGuide = [
    {
      id: 'speed-test',
      name: 'اختبار السرعة المتطور',
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      category: 'أدوات أساسية',
      description: 'أداة متطورة لقياس سرعة الإنترنت بدقة عالية مع تحليل شامل للأداء',
      benefits: [
        'قياس دقيق لسرعة التحميل والرفع',
        'حساب زمن الاستجابة (Ping) بدقة عالية',
        'تحليل جودة الاتصال ومعدل فقدان البيانات',
        'مقارنة الأداء مع المعايير العالمية',
        'تقييم شامل لمزود الخدمة والباقة',
        'نصائح لتحسين الأداء'
      ],
      howItWorks: [
        'الاتصال بخوادم متعددة موزعة جغرافياً',
        'قياس سرعة التحميل باستخدام ملفات اختبار متنوعة',
        'قياس سرعة الرفع بتقنيات متطورة',
        'حساب متوسط زمن الاستجابة عبر عدة محاولات',
        'تحليل الثبات والاستقرار في الاتصال',
        'إنشاء تقرير مفصل مع التوصيات'
      ],
      stepByStep: [
        'انتقل إلى قسم "اختبار السرعة"',
        'تأكد من إغلاق التطبيقات المستهلكة للإنترنت',
        'اضغط على "بدء اختبار السرعة المتطور"',
        'انتظر حتى اكتمال الاختبار (1-3 دقائق)',
        'راجع النتائج والتحليل المفصل',
        'اطبق التوصيات المقترحة'
      ]
    },
    {
      id: 'network-scanner',
      name: 'فاحص الشبكة المتقدم',
      icon: <Network className="h-6 w-6 text-green-600" />,
      category: 'مراقبة الشبكة',
      description: 'أداة شاملة لاكتشاف ومراقبة جميع الأجهزة المتصلة بالشبكة',
      benefits: [
        'اكتشاف جميع الأجهزة النشطة في الشبكة',
        'عرض عناوين IP و MAC لكل جهاز',
        'تحديد نوع الجهاز والشركة المصنعة',
        'مراقبة حالة الاتصال في الوقت الفعلي',
        'اكتشاف الأجهزة المشبوهة أو غير المعروفة',
        'تتبع تاريخ الاتصال لكل جهاز'
      ],
      howItWorks: [
        'مسح شامل لنطاق الشبكة المحلية',
        'إرسال طلبات ARP و ICMP للاكتشاف',
        'تحليل استجابات الأجهزة وتصنيفها',
        'البحث في قواعد بيانات MAC للتعرف على المصنعين',
        'مراقبة مستمرة للتغييرات في الشبكة',
        'إنشاء تقارير مفصلة عن أنشطة الشبكة'
      ],
      stepByStep: [
        'اذهب إلى قسم "أدوات الشبكة"',
        'اختر "فاحص الشبكة المتقدم"',
        'اضغط على "بدء مسح الشبكة"',
        'انتظر حتى اكتمال المسح (30-90 ثانية)',
        'راجع قائمة الأجهزة المكتشفة',
        'تحقق من الأجهزة غير المعروفة'
      ]
    },
    {
      id: 'wifi-analyzer',
      name: 'محلل WiFi المتقدم',
      icon: <Wifi className="h-6 w-6 text-purple-600" />,
      category: 'شبكات لاسلكية',
      description: 'أداة متطورة لتحليل شبكات WiFi وتحسين الأداء اللاسلكي',
      benefits: [
        'عرض جميع شبكات WiFi المتاحة',
        'قياس قوة الإشارة بدقة عالية',
        'تحديد القنوات المستخدمة ومستوى التداخل',
        'فحص أنواع التشفير ومستويات الأمان',
        'اختيار أفضل قناة لتحسين الأداء',
        'مراقبة جودة الاتصال اللاسلكي'
      ],
      howItWorks: [
        'مسح الترددات اللاسلكية (2.4GHz و 5GHz)',
        'تحليل خصائص الإشارة لكل شبكة',
        'فحص إعدادات الأمان والتشفير',
        'تحديد مستوى التداخل بين الشبكات',
        'تقييم جودة كل شبكة وترتيبها',
        'تقديم توصيات لتحسين الأداء'
      ],
      stepByStep: [
        'انتقل إلى "محلل WiFi"',
        'اضغط على "فحص الشبكات اللاسلكية"',
        'انتظر حتى اكتمال المسح',
        'راجع قائمة الشبكات المكتشفة',
        'تحقق من قوة الإشارة لشبكتك',
        'اطبق التوصيات لتحسين الأداء'
      ]
    },
    {
      id: 'security-scanner',
      name: 'فاحص الأمان المتطور',
      icon: <Shield className="h-6 w-6 text-red-600" />,
      category: 'أمان الشبكة',
      description: 'نظام شامل لفحص الثغرات الأمنية وحماية الشبكة',
      benefits: [
        'فحص شامل للثغرات الأمنية',
        'اكتشاف التهديدات والبرمجيات الخبيثة',
        'تقييم قوة كلمات المرور والتشفير',
        'فحص المنافذ المفتوحة والخدمات',
        'مراقبة محاولات الاختراق',
        'تقديم حلول أمنية فورية'
      ],
      howItWorks: [
        'فحص شامل لجميع أجهزة الشبكة',
        'اختبار نقاط الضعف المعروفة',
        'تحليل إعدادات الجدار الناري',
        'فحص تحديثات الأمان المطلوبة',
        'مراقبة الأنشطة المشبوهة',
        'إنشاء تقرير أمان مفصل'
      ],
      stepByStep: [
        'اذهب إلى "أدوات الأمان"',
        'اختر "فحص الأمان المتطور"',
        'اضغط على "بدء فحص الأمان الشامل"',
        'انتظر حتى اكتمال الفحص (2-5 دقائق)',
        'راجع تقرير الأمان المفصل',
        'نفذ التوصيات الأمنية المقترحة'
      ]
    },
    {
      id: 'bandwidth-monitor',
      name: 'مراقب النطاق الترددي',
      icon: <Activity className="h-6 w-6 text-orange-600" />,
      category: 'مراقبة الأداء',
      description: 'نظام متطور لمراقبة استهلاك البيانات وإدارة النطاق الترددي',
      benefits: [
        'مراقبة استهلاك البيانات في الوقت الفعلي',
        'تحديد الأجهزة الأكثر استهلاكاً',
        'عرض إحصائيات مفصلة عن الاستخدام',
        'تنبيهات عند تجاوز الحدود',
        'تحليل أنماط الاستخدام',
        'إدارة ذكية للنطاق الترددي'
      ],
      howItWorks: [
        'مراقبة مستمرة لحركة البيانات',
        'تسجيل الاستهلاك لكل جهاز',
        'تحليل البروتوكولات والتطبيقات',
        'حساب معدلات الاستهلاك',
        'تتبع الاتجاهات والأنماط',
        'إنشاء تقارير دورية'
      ],
      stepByStep: [
        'انتقل إلى "مراقبة النطاق الترددي"',
        'اضغط على "بدء المراقبة المتقدمة"',
        'راجع استهلاك كل جهاز',
        'ضع حدود للاستهلاك حسب الحاجة',
        'راجع التقارير والإحصائيات',
        'اطبق إعدادات التحكم المقترحة'
      ]
    },
    {
      id: 'dns-lookup',
      name: 'بحث DNS المتقدم',
      icon: <Globe className="h-6 w-6 text-indigo-600" />,
      category: 'أدوات تشخيص',
      description: 'أداة شاملة للبحث في نظام أسماء النطاقات وتشخيص المشاكل',
      benefits: [
        'البحث في جميع أنواع سجلات DNS',
        'تحليل أوقات الاستجابة',
        'فحص تكوين النطاقات',
        'اكتشاف مشاكل الترجمة',
        'تحسين إعدادات DNS',
        'مراقبة صحة النطاقات'
      ],
      howItWorks: [
        'إرسال استعلامات DNS متنوعة',
        'تحليل الاستجابات وأوقات الرد',
        'فحص سجلات A، AAAA، MX، NS، CNAME',
        'مقارنة النتائج من خوادم متعددة',
        'تتبع مسار الاستعلامات',
        'تقديم تحليل شامل للنتائج'
      ],
      stepByStep: [
        'اذهب إلى "بحث DNS المتقدم"',
        'أدخل اسم النطاق أو عنوان IP',
        'اختر نوع السجل المطلوب',
        'اضغط على "بحث متقدم"',
        'راجع النتائج والتحليل',
        'اطبق التوصيات للتحسين'
      ]
    }
  ];

  const faqData = [
    {
      category: 'الأساسيات',
      questions: [
        {
          q: 'كيف أبدأ في استخدام OCTA NETWORK؟',
          a: 'ابدأ بتشغيل "اختبار السرعة المتطور" للحصول على نظرة شاملة على حالة شبكتك، ثم استكشف الأدوات الأخرى حسب احتياجاتك.'
        },
        {
          q: 'هل يمكن استخدام البرنامج بدون اتصال إنترنت؟',
          a: 'بعض الأدوات مثل فحص الشبكة المحلية تعمل بدون إنترنت، بينما أدوات أخرى مثل اختبار السرعة تحتاج اتصال نشط.'
        },
        {
          q: 'هل البرنامج مجاني بالكامل؟',
          a: 'نعم، OCTA NETWORK مجاني تماماً ومفتوح المصدر، ويمكن استخدامه دون قيود.'
        }
      ]
    },
    {
      category: 'الأدوات والميزات',
      questions: [
        {
          q: 'ما الفرق بين اختبار السرعة العادي والمتطور؟',
          a: 'الاختبار المتطور يوفر تحليل أعمق يشمل الثبات، جودة الاتصال، مقارنات مع المعايير العالمية، وتوصيات مخصصة.'
        },
        {
          q: 'كيف يمكنني تحسين أداء شبكتي؟',
          a: 'استخدم محلل WiFi لاختيار أفضل قناة، فاحص الأمان لسد الثغرات، ومراقب النطاق الترددي لإدارة الاستهلاك.'
        },
        {
          q: 'هل يمكن حفظ نتائج الفحوصات؟',
          a: 'نعم، يمكن تصدير جميع التقارير والنتائج بصيغ مختلفة للمراجعة أو الأرشفة.'
        }
      ]
    },
    {
      category: 'الأمان والخصوصية',
      questions: [
        {
          q: 'هل يحافظ البرنامج على خصوصية بياناتي؟',
          a: 'نعم، جميع البيانات تُعالج محلياً ولا تُرسل لخوادم خارجية إلا عند الضرورة للاختبارات.'
        },
        {
          q: 'ماذا يعني فحص الأمان المتطور؟',
          a: 'يفحص الثغرات المعروفة، قوة التشفير، إعدادات الجدار الناري، ويقدم توصيات لتحسين الأمان.'
        },
        {
          q: 'هل يمكن اكتشاف المتطفلين على الشبكة؟',
          a: 'نعم، فاحص الشبكة يكشف جميع الأجهزة المتصلة ويساعد في تحديد الأجهزة غير المعروفة أو المشبوهة.'
        }
      ]
    }
  ];

  const deploymentGuide = [
    {
      platform: 'GitHub Pages',
      icon: <Globe className="h-8 w-8 text-gray-800" />,
      steps: [
        'رفع الكود إلى مستودع GitHub',
        'تفعيل GitHub Pages في إعدادات المستودع',
        'اختيار branch المناسب (عادة main أو gh-pages)',
        'انتظار بناء ونشر الموقع تلقائياً',
        'الوصول للموقع عبر الرابط المقدم'
      ],
      requirements: [
        'مستودع GitHub عام أو خاص (مع اشتراك)',
        'ملف index.html في الجذر أو مجلد docs',
        'إعدادات GitHub Pages مفعلة',
        'صبر للانتظار (قد يستغرق دقائق)'
      ]
    },
    {
      platform: 'Netlify',
      icon: <ExternalLink className="h-8 w-8 text-blue-600" />,
      steps: [
        'إنشاء حساب على Netlify',
        'ربط المستودع من GitHub/GitLab',
        'تكوين إعدادات البناء',
        'انتظار النشر التلقائي',
        'الحصول على رابط مخصص'
      ],
      requirements: [
        'مستودع Git متصل',
        'إعدادات بناء صحيحة',
        'ملفات المشروع سليمة'
      ]
    },
    {
      platform: 'Vercel',
      icon: <Monitor className="h-8 w-8 text-black" />,
      steps: [
        'إنشاء حساب على Vercel',
        'استيراد المشروع من Git',
        'تكوين إعدادات النشر',
        'نشر تلقائي عند كل تحديث',
        'إدارة النطاقات المخصصة'
      ],
      requirements: [
        'مستودع Git',
        'تكوين صحيح لـ React/Vite',
        'إعدادات البيئة (إذا لزم)'
      ]
    }
  ];

  const filteredTools = toolsGuide.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-6 w-6 mr-3 text-blue-600" />
            مركز المساعدة الشامل - OCTA NETWORK
            <Badge className="ml-3 bg-blue-100 text-blue-700">
              دليل كامل ومفصل
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="tools-guide" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tools-guide">دليل الأدوات</TabsTrigger>
          <TabsTrigger value="faq">أسئلة شائعة</TabsTrigger>
          <TabsTrigger value="deployment">النشر والتوزيع</TabsTrigger>
          <TabsTrigger value="support">الدعم الفني</TabsTrigger>
        </TabsList>

        <TabsContent value="tools-guide" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ابحث عن أداة أو وظيفة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-8">
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
                      <p className="text-gray-600">{tool.description}</p>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="benefits" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="benefits">الفوائد والمميزات</TabsTrigger>
                          <TabsTrigger value="how-works">آلية العمل</TabsTrigger>
                          <TabsTrigger value="steps">خطوات الاستخدام</TabsTrigger>
                        </TabsList>

                        <TabsContent value="benefits" className="mt-4">
                          <div className="space-y-3">
                            <h3 className="font-semibold text-lg">الفوائد والمميزات:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {tool.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700 text-sm">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="how-works" className="mt-4">
                          <div className="space-y-3">
                            <h3 className="font-semibold text-lg">كيف تعمل الأداة:</h3>
                            {tool.howItWorks.map((step, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </div>
                                <span className="text-gray-700">{step}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="steps" className="mt-4">
                          <div className="space-y-3">
                            <h3 className="font-semibold text-lg">خطوات الاستخدام:</h3>
                            {tool.stepByStep.map((step, index) => (
                              <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                                  {index + 1}
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
                          الأداة مُحسنة وجاهزة للاستخدام الفوري مع ضمان دقة النتائج وسرعة الأداء.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              {faqData.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-blue-600">{category.category}</h3>
                  <Accordion type="single" collapsible>
                    {category.questions.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                        <AccordionTrigger className="text-right">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>دليل النشر والتوزيع على المنصات المختلفة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {deploymentGuide.map((platform, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        {platform.icon}
                        <span>{platform.platform}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">خطوات النشر:</h4>
                        <ol className="space-y-2">
                          {platform.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start space-x-2 text-sm">
                              <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                                {stepIndex + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">المتطلبات:</h4>
                        <ul className="space-y-1">
                          {platform.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>نصائح مهمة للنشر الناجح</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-600">✅ أفضل الممارسات</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• تأكد من وجود ملف .nojekyll للـ GitHub Pages</li>
                        <li>• استخدم HTTPS دائماً للأمان</li>
                        <li>• اختبر الموقع محلياً قبل النشر</li>
                        <li>• احتفظ بنسخة احتياطية من الكود</li>
                        <li>• استخدم أسماء نطاقات مناسبة</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-red-600">⚠️ أخطاء شائعة</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• نسيان تحديث المسارات للـ SPA</li>
                        <li>• عدم تكوين redirect rules</li>
                        <li>• مشاكل في إعدادات CORS</li>
                        <li>• نسيان متغيرات البيئة</li>
                        <li>• عدم اختبار الموقع على أجهزة مختلفة</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قنوات الدعم الفني المتاحة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">الدردشة المباشرة</h3>
                    <p className="text-sm text-gray-600 mb-4">متاح 24/7 للدعم الفوري</p>
                    <Button className="w-full">بدء المحادثة</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Mail className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">البريد الإلكتروني</h3>
                    <p className="text-sm text-gray-600 mb-4">للاستفسارات التفصيلية</p>
                    <Button variant="outline" className="w-full">إرسال رسالة</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Phone className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">الهاتف</h3>
                    <p className="text-sm text-gray-600 mb-4">للحالات العاجلة</p>
                    <Button variant="outline" className="w-full">اتصل بنا</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="p-4">
          <div className="text-center text-sm text-gray-600">
            <div className="font-semibold text-gray-800 mb-1">OCTA NETWORK Professional Edition</div>
            <div>تطوير: Sajad Kadhim | جميع الحقوق محفوظة 2024</div>
            <div className="text-green-600 font-medium mt-2">
              ✅ نظام متكامل 100% يعمل بكفاءة عالية ودقة مضمونة
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveHelpCenter;
