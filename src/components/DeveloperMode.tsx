
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Settings, 
  Key, 
  Terminal,
  Shield,
  Cog,
  Database,
  Zap
} from 'lucide-react';
import CMD from './CMD';
import LicenseManager from './LicenseManager';

const DeveloperMode = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-red-500 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-700">
            <Code className="h-5 w-5 mr-2" />
            وضع المطور - Developer Mode
            <Badge className="ml-2 bg-red-600 text-white">DEVELOPER ACCESS</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 text-sm">
            ⚠️ أنت الآن في وضع المطور - لديك صلاحيات كاملة للتحكم في النظام
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="cmd" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cmd" className="flex items-center space-x-2">
            <Terminal className="h-4 w-4" />
            <span>CMD Terminal</span>
          </TabsTrigger>
          <TabsTrigger value="licenses" className="flex items-center space-x-2">
            <Key className="h-4 w-4" />
            <span>إدارة التراخيص</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>إعدادات النظام</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>أدوات المطور</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cmd" className="space-y-4">
          <CMD isDeveloper={true} />
        </TabsContent>

        <TabsContent value="licenses" className="space-y-4">
          <LicenseManager />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cog className="h-5 w-5 mr-2" />
                إعدادات النظام المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Database className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="font-medium">قاعدة البيانات</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>الحالة: متصلة</div>
                      <div>السجلات: 1,247</div>
                      <div>الحجم: 45.7 MB</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Shield className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-medium">الأمان</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>مستوى التشفير: AES-256</div>
                      <div>جدار الحماية: نشط</div>
                      <div>المراقبة: مفعلة</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Zap className="h-4 w-4 mr-2 text-purple-600" />
                      <span className="font-medium">الأداء</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>استخدام المعالج: 15%</div>
                      <div>استخدام الذاكرة: 34%</div>
                      <div>زمن الاستجابة: 8ms</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Code className="h-4 w-4 mr-2 text-orange-600" />
                      <span className="font-medium">إعدادات API</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>المفاتيح النشطة: 12</div>
                      <div>الطلبات اليومية: 8,543</div>
                      <div>الحد الأقصى: 50,000</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                أدوات المطور المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Database className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium mb-1">إدارة قاعدة البيانات</h3>
                    <p className="text-xs text-gray-600">تحكم كامل في البيانات</p>
                  </CardContent>
                </Card>

                <Card className="border border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-medium mb-1">إعدادات الأمان</h3>
                    <p className="text-xs text-gray-600">تكوين الحماية المتقدمة</p>
                  </CardContent>
                </Card>

                <Card className="border border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Code className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-medium mb-1">محرر الكود</h3>
                    <p className="text-xs text-gray-600">تعديل الكود المباشر</p>
                  </CardContent>
                </Card>

                <Card className="border border-orange-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Terminal className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                    <h3 className="font-medium mb-1">وحدة التحكم</h3>
                    <p className="text-xs text-gray-600">تنفيذ الأوامر المتقدمة</p>
                  </CardContent>
                </Card>

                <Card className="border border-red-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Cog className="h-8 w-8 mx-auto mb-2 text-red-600" />
                    <h3 className="font-medium mb-1">تكوين النظام</h3>
                    <p className="text-xs text-gray-600">إعدادات الخادم المتقدمة</p>
                  </CardContent>
                </Card>

                <Card className="border border-cyan-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Key className="h-8 w-8 mx-auto mb-2 text-cyan-600" />
                    <h3 className="font-medium mb-1">مولد التراخيص</h3>
                    <p className="text-xs text-gray-600">إنشاء مفاتيح جديدة</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeveloperMode;
