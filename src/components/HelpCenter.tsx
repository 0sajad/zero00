
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Search, Book, MessageCircle, Mail } from 'lucide-react';

const HelpCenter = () => {
  const faqs = [
    {
      question: 'كيف أبدأ فحص الشبكة؟',
      answer: 'يمكنك بدء فحص الشبكة من خلال الانتقال إلى قسم "فاحص الشبكة" والنقر على زر "بدء فحص الشبكة". سيقوم النظام بفحص جميع الأجهزة المتصلة تلقائياً.'
    },
    {
      question: 'ما هي ميزة المساعد الذكي؟',
      answer: 'المساعد الذكي هو نظام ذكاء اصطناعي يساعدك في تشخيص مشاكل الشبكة وتقديم الاقتراحات والحلول. يمكنك التفاعل معه بشكل طبيعي باللغة العربية.'
    },
    {
      question: 'كيف أغير لغة الواجهة؟',
      answer: 'يمكنك تغيير اللغة من خلال النقر على أيقونة الكرة الأرضية في الشريط العلوي أو من خلال إعدادات النظام.'
    },
    {
      question: 'هل يعمل النظام بدون إنترنت؟',
      answer: 'النظام يعمل كموقع ويب ثابت ولا يحتاج إلى خادم، لكن بعض الميزات مثل اختبار السرعة تحتاج إلى اتصال بالإنترنت.'
    },
    {
      question: 'كيف أفعل وضع المطور؟',
      answer: 'يمكنك تفعيل وضع المطور من خلال الذهاب إلى الإعدادات > وضع المطور وتفعيل الخيار. هذا سيتيح لك الوصول إلى أدوات متقدمة.'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            مركز المساعدة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن موضوع..."
              className="pl-10"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Book className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-2">دليل المستخدم</h3>
                <p className="text-sm text-muted-foreground mb-3">دليل شامل لاستخدام جميع الميزات</p>
                <Button variant="outline" size="sm">
                  عرض الدليل
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-3 text-green-600" />
                <h3 className="font-semibold mb-2">الدردشة المباشرة</h3>
                <p className="text-sm text-muted-foreground mb-3">تحدث مع فريق الدعم مباشرة</p>
                <Button variant="outline" size="sm">
                  بدء المحادثة
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold mb-2">البريد الإلكتروني</h3>
                <p className="text-sm text-muted-foreground mb-3">أرسل استفسارك عبر البريد</p>
                <Button variant="outline" size="sm">
                  إرسال رسالة
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">الأسئلة الشائعة</h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-right">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpCenter;
