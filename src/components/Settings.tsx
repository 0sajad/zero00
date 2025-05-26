
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, Globe, Monitor, Bell, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Settings = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const [developerMode, setDeveloperMode] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="h-5 w-5 mr-2" />
            {t('settings')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">عام</TabsTrigger>
              <TabsTrigger value="network">الشبكة</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
              <TabsTrigger value="developer">المطور</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">الإعدادات العامة</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium">اللغة</label>
                      <p className="text-sm text-muted-foreground">اختر لغة الواجهة</p>
                    </div>
                    <LanguageToggle />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium">المظهر</label>
                      <p className="text-sm text-muted-foreground">اختر السمة المفضلة</p>
                    </div>
                    <ThemeToggle />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium">الإشعارات</label>
                      <p className="text-sm text-muted-foreground">تفعيل الإشعارات</p>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="network" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">إعدادات الشبكة</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium">الفحص التلقائي</label>
                      <p className="text-sm text-muted-foreground">فحص الشبكة تلقائياً كل ساعة</p>
                    </div>
                    <Switch
                      checked={autoScan}
                      onCheckedChange={setAutoScan}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-medium">مهلة الاتصال</label>
                    <Select defaultValue="5000">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3000">3 ثواني</SelectItem>
                        <SelectItem value="5000">5 ثواني</SelectItem>
                        <SelectItem value="10000">10 ثواني</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">إعدادات الأمان</h3>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">حالة الأمان</p>
                            <p className="text-sm text-muted-foreground">آمن - جميع الفحوصات ناجحة</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          فحص الآن
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="developer" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">وضع المطور</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium">تفعيل وضع المطور</label>
                      <p className="text-sm text-muted-foreground">إظهار أدوات التطوير المتقدمة</p>
                    </div>
                    <Switch
                      checked={developerMode}
                      onCheckedChange={setDeveloperMode}
                    />
                  </div>

                  {developerMode && (
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-3">أدوات المطور</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" size="sm">
                            سجل وحدة التحكم
                          </Button>
                          <Button variant="outline" size="sm">
                            تصدير البيانات
                          </Button>
                          <Button variant="outline" size="sm">
                            اختبار الأداء
                          </Button>
                          <Button variant="outline" size="sm">
                            تصحيح الأخطاء
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
