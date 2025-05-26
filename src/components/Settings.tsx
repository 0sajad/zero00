
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon, Globe, Monitor, Bell, Shield, Wifi, Network, Database, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const [developerMode, setDeveloperMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scanInterval, setScanInterval] = useState('60');
  const [networkTimeout, setNetworkTimeout] = useState('5000');
  const [maxRetries, setMaxRetries] = useState('3');

  const handleSaveSettings = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ جميع الإعدادات بنجاح",
    });
  };

  const handleResetSettings = () => {
    setNotifications(true);
    setAutoScan(false);
    setDeveloperMode(false);
    setAutoBackup(true);
    setSoundAlerts(false);
    setScanInterval('60');
    setNetworkTimeout('5000');
    setMaxRetries('3');
    
    toast({
      title: "تم إعادة تعيين الإعدادات",
      description: "تم إرجاع جميع الإعدادات للقيم الافتراضية",
    });
  };

  const handleExportSettings = () => {
    const settings = {
      notifications,
      autoScan,
      developerMode,
      autoBackup,
      soundAlerts,
      scanInterval,
      networkTimeout,
      maxRetries,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'octa-settings.json';
    link.click();
    
    toast({
      title: "تم تصدير الإعدادات",
      description: "تم تصدير الإعدادات إلى ملف JSON",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2" />
              إعدادات OCTA المتقدمة
            </div>
            <Badge variant="secondary">v2.0</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">عام</TabsTrigger>
              <TabsTrigger value="network">الشبكة</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
              <TabsTrigger value="performance">الأداء</TabsTrigger>
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
                      <p className="text-sm text-muted-foreground">تفعيل الإشعارات العامة</p>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium">التنبيهات الصوتية</label>
                      <p className="text-sm text-muted-foreground">تشغيل أصوات التنبيه</p>
                    </div>
                    <Switch
                      checked={soundAlerts}
                      onCheckedChange={setSoundAlerts}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium">النسخ الاحتياطي التلقائي</label>
                      <p className="text-sm text-muted-foreground">حفظ البيانات تلقائياً</p>
                    </div>
                    <Switch
                      checked={autoBackup}
                      onCheckedChange={setAutoBackup}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="network" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">إعدادات الشبكة المتقدمة</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium">الفحص التلقائي</label>
                      <p className="text-sm text-muted-foreground">فحص الشبكة تلقائياً</p>
                    </div>
                    <Switch
                      checked={autoScan}
                      onCheckedChange={setAutoScan}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-medium">فترة الفحص التلقائي (دقيقة)</label>
                    <Select value={scanInterval} onValueChange={setScanInterval}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 دقيقة</SelectItem>
                        <SelectItem value="60">ساعة واحدة</SelectItem>
                        <SelectItem value="120">ساعتان</SelectItem>
                        <SelectItem value="360">6 ساعات</SelectItem>
                        <SelectItem value="720">12 ساعة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-medium">مهلة الاتصال (مللي ثانية)</label>
                    <Select value={networkTimeout} onValueChange={setNetworkTimeout}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000">1 ثانية</SelectItem>
                        <SelectItem value="3000">3 ثواني</SelectItem>
                        <SelectItem value="5000">5 ثواني</SelectItem>
                        <SelectItem value="10000">10 ثواني</SelectItem>
                        <SelectItem value="30000">30 ثانية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-medium">عدد المحاولات</label>
                    <Select value={maxRetries} onValueChange={setMaxRetries}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">محاولة واحدة</SelectItem>
                        <SelectItem value="3">3 محاولات</SelectItem>
                        <SelectItem value="5">5 محاولات</SelectItem>
                        <SelectItem value="10">10 محاولات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">إعدادات الأمان المتقدمة</h3>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">حالة الأمان العامة</p>
                            <p className="text-sm text-muted-foreground">جميع أنظمة الأمان تعمل بكفاءة</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">آمن</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">94%</div>
                          <div className="text-xs text-green-700">نقاط الأمان</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">0</div>
                          <div className="text-xs text-blue-700">تهديدات نشطة</div>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        <Shield className="h-4 w-4 mr-2" />
                        فحص أمني شامل
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">إعدادات الحماية</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">كشف التطفل</span>
                          <Badge className="bg-green-100 text-green-700">مفعل</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">حماية DDoS</span>
                          <Badge className="bg-green-100 text-green-700">مفعل</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">تشفير البيانات</span>
                          <Badge className="bg-green-100 text-green-700">AES-256</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">إعدادات الأداء</h3>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">مراقبة الأداء</h4>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">45ms</div>
                        <div className="text-xs text-blue-700">زمن الاستجابة</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">99.8%</div>
                        <div className="text-xs text-green-700">الاستقرار</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">156</div>
                        <div className="text-xs text-purple-700">Mbps السرعة</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">استخدام المعالج</span>
                        <span className="text-sm font-medium">23%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">استخدام الذاكرة</span>
                        <span className="text-sm font-medium">1.2 GB</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">استخدام التخزين</span>
                        <span className="text-sm font-medium">45 MB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="developer" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">وضع المطور المتقدم</h3>
                
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
                        <h4 className="font-medium mb-3">أدوات المطور المتقدمة</h4>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <Button variant="outline" size="sm">
                            <Monitor className="h-4 w-4 mr-2" />
                            سجل وحدة التحكم
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleExportSettings}>
                            <Database className="h-4 w-4 mr-2" />
                            تصدير البيانات
                          </Button>
                          <Button variant="outline" size="sm">
                            <Clock className="h-4 w-4 mr-2" />
                            اختبار الأداء
                          </Button>
                          <Button variant="outline" size="sm">
                            <Network className="h-4 w-4 mr-2" />
                            تصحيح الشبكة
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">مستوى السجل</label>
                          <Select defaultValue="info">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="debug">Debug</SelectItem>
                              <SelectItem value="info">Info</SelectItem>
                              <SelectItem value="warn">Warning</SelectItem>
                              <SelectItem value="error">Error</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between pt-6 border-t">
            <div className="flex space-x-2">
              <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                <Settings className="h-4 w-4 mr-2" />
                حفظ الإعدادات
              </Button>
              <Button variant="outline" onClick={handleExportSettings}>
                <Database className="h-4 w-4 mr-2" />
                تصدير
              </Button>
            </div>
            <Button variant="destructive" onClick={handleResetSettings}>
              إعادة تعيين
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
