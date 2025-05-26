
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Check, Download } from 'lucide-react';

const License = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            إدارة التراخيص
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">الترخيص الحالي</h3>
                  <Badge className="bg-green-100 text-green-700">نشط</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">النوع:</span>
                    <span className="font-medium">MIT License</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الحالة:</span>
                    <span className="font-medium text-green-600">
                      <Check className="h-4 w-4 inline mr-1" />
                      مفعّل
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">تاريخ الانتهاء:</span>
                    <span className="font-medium">غير محدد</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">الميزات المتاحة</h3>
                <div className="space-y-2">
                  {[
                    'مراقبة الشبكة الأساسية',
                    'المساعد الذكي',
                    'أدوات التحليل',
                    'محاكاة الشبكة',
                    'الدعم متعدد اللغات',
                    'وضع المطور'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">تفاصيل الترخيص</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">
                  هذا المشروع مرخص تحت رخصة MIT، مما يعني أنه مفتوح المصدر ويمكن استخدامه وتعديله وتوزيعه بحرية.
                </p>
                <h4 className="font-medium mt-4 mb-2">الأذونات:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>الاستخدام التجاري</li>
                  <li>التعديل</li>
                  <li>التوزيع</li>
                  <li>الاستخدام الخاص</li>
                </ul>
                <h4 className="font-medium mt-4 mb-2">الشروط:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>تضمين إشعار حقوق الطبع والنشر</li>
                  <li>تضمين نص الترخيص</li>
                </ul>
              </div>
              <Button className="mt-4" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                تحميل نص الترخيص
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default License;
