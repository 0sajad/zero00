import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Activity, 
  Wifi, 
  Monitor,
  BarChart3,
  Settings,
  Globe,
  Zap,
  Lock,
  Users,
  Database,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Eye,
  Router,
  Smartphone
} from 'lucide-react';
import NetworkSpeedTest from './NetworkSpeedTest';
import SecurityAuditTool from './SecurityAuditTool';
import SystemMetricsGrid from './SystemMetricsGrid';

const ClientMode = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Shield className="h-6 w-6 mr-3" />
            وضع العميل - Client Mode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-blue-600 text-sm">
            ✅ مرحباً بك في النظام المتطور لمراقبة الشبكات - لديك صلاحيات كاملة لجميع الأدوات
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-6 h-16">
          <TabsTrigger value="dashboard" className="flex flex-col items-center space-y-1 h-full">
            <Monitor className="h-5 w-5" />
            <span className="text-xs">لوحة التحكم</span>
          </TabsTrigger>
          <TabsTrigger value="network" className="flex flex-col items-center space-y-1 h-full">
            <Wifi className="h-5 w-5" />
            <span className="text-xs">مراقبة الشبكة</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex flex-col items-center space-y-1 h-full">
            <Lock className="h-5 w-5" />
            <span className="text-xs">الأمان</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex flex-col items-center space-y-1 h-full">
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">التحليلات</span>
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex flex-col items-center space-y-1 h-full">
            <Router className="h-5 w-5" />
            <span className="text-xs">الأجهزة</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex flex-col items-center space-y-1 h-full">
            <Settings className="h-5 w-5" />
            <span className="text-xs">الإعدادات</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">حالة الشبكة</p>
                    <p className="text-2xl font-bold text-green-700">متصلة</p>
                  </div>
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-green-500 text-white">99.9% وقت التشغيل</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">سرعة الإنترنت</p>
                    <p className="text-2xl font-bold text-blue-700">250 Mbps</p>
                  </div>
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-blue-500 text-white">سرعة ممتازة</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">الأجهزة المتصلة</p>
                    <p className="text-2xl font-bold text-purple-700">24</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-purple-500 text-white">جميعها آمنة</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">استخدام البيانات</p>
                    <p className="text-2xl font-bold text-orange-700">2.4 GB</p>
                  </div>
                  <Database className="h-8 w-8 text-orange-600" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-orange-500 text-white">اليوم</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <SystemMetricsGrid />
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <NetworkSpeedTest />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                مراقبة الشبكة المباشرة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-medium">زمن الاستجابة</span>
                    </div>
                    <div className="text-2xl font-bold text-green-700">8ms</div>
                    <div className="text-sm text-gray-600">ممتاز</div>
                  </CardContent>
                </Card>

                <Card className="border border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="font-medium">التحميل</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-700">245 Mbps</div>
                    <div className="text-sm text-gray-600">سريع جداً</div>
                  </CardContent>
                </Card>

                <Card className="border border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Eye className="h-4 w-4 mr-2 text-purple-600" />
                      <span className="font-medium">الرفع</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-700">45 Mbps</div>
                    <div className="text-sm text-gray-600">جيد جداً</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecurityAuditTool />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                تقرير الأمان المتقدم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-800">الشبكة آمنة بالكامل</span>
                </div>
                <div className="mt-2 text-sm text-green-700">
                  ✅ تشفير WPA3 مفعل<br/>
                  ✅ جدار الحماية نشط<br/>
                  ✅ لا توجد تهديدات مكتشفة
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                تحليلات استخدام الشبكة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">استخدام البيانات الأسبوعي</h4>
                    <div className="space-y-2">
                      {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((day, index) => (
                        <div key={day} className="flex items-center justify-between">
                          <span className="text-sm">{day}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{width: `${Math.random() * 100}%`}}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600">{(Math.random() * 5).toFixed(1)} GB</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">أكثر الأجهزة استخداماً</h4>
                    <div className="space-y-2">
                      {['iPhone 13', 'MacBook Pro', 'Samsung TV', 'iPad Air', 'Windows PC'].map((device, index) => (
                        <div key={device} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Smartphone className="h-4 w-4 mr-2 text-gray-600" />
                            <span className="text-sm">{device}</span>
                          </div>
                          <span className="text-xs text-gray-600">{(Math.random() * 2).toFixed(1)} GB</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Router className="h-5 w-5 mr-2" />
                إدارة الأجهزة المتصلة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'iPhone 13 Pro', ip: '192.168.1.101', status: 'متصل', type: 'phone' },
                  { name: 'MacBook Pro', ip: '192.168.1.102', status: 'متصل', type: 'laptop' },
                  { name: 'Samsung Smart TV', ip: '192.168.1.103', status: 'متصل', type: 'tv' },
                  { name: 'iPad Air', ip: '192.168.1.104', status: 'غير متصل', type: 'tablet' },
                  { name: 'Windows Desktop', ip: '192.168.1.105', status: 'متصل', type: 'desktop' }
                ].map((device, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-gray-600" />
                          <div>
                            <div className="font-medium">{device.name}</div>
                            <div className="text-sm text-gray-600">{device.ip}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={device.status === 'متصل' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {device.status}
                          </Badge>
                          <Button size="sm" variant="outline">إدارة</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                إعدادات النظام للعميل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">إعدادات الإشعارات</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">إشعارات انقطاع الاتصال</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">تقارير الأداء اليومية</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">تحديثات الأمان</span>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-green-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">إعدادات المراقبة</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">مراقبة مستمرة</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">تسجيل حركة البيانات</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">وضع التوفير</span>
                      </label>
                    </div>
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

export default ClientMode;
