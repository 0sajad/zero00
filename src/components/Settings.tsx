
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Monitor, 
  Wifi, 
  Globe,
  Save,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'OCTA NETWORK',
    language: 'ar',
    theme: 'system',
    notifications: true,
    autoSave: true,
    
    // Network Settings
    refreshInterval: '30',
    maxConnections: '100',
    timeout: '5000',
    retryAttempts: '3',
    
    // Security Settings
    enableFirewall: true,
    enableSSL: true,
    autoUpdates: true,
    logLevel: 'info',
    
    // Performance Settings
    cacheEnabled: true,
    compressionEnabled: true,
    cdnEnabled: false,
    
    // User Preferences
    username: 'admin',
    email: 'admin@octa.network',
    timezone: 'Asia/Riyadh'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم حفظ الإعدادات",
        description: "تم حفظ جميع التغييرات بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "فشل في حفظ الإعدادات، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    setSettings({
      siteName: 'OCTA NETWORK',
      language: 'ar',
      theme: 'system',
      notifications: true,
      autoSave: true,
      refreshInterval: '30',
      maxConnections: '100',
      timeout: '5000',
      retryAttempts: '3',
      enableFirewall: true,
      enableSSL: true,
      autoUpdates: true,
      logLevel: 'info',
      cacheEnabled: true,
      compressionEnabled: true,
      cdnEnabled: false,
      username: 'admin',
      email: 'admin@octa.network',
      timezone: 'Asia/Riyadh'
    });
    
    toast({
      title: "تم إعادة تعيين الإعدادات",
      description: "تم استعادة الإعدادات الافتراضية",
    });
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'octa-network-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "تم تصدير الإعدادات",
      description: "تم تنزيل ملف الإعدادات بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <SettingsIcon className="h-6 w-6 mr-2" />
            إعدادات النظام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">عام</TabsTrigger>
              <TabsTrigger value="network">الشبكة</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
              <TabsTrigger value="performance">الأداء</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  الإعدادات العامة
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">اسم الموقع</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => handleSettingChange('siteName', e.target.value)}
                      placeholder="اسم الموقع"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">اللغة</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">السمة</Label>
                    <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">فاتح</SelectItem>
                        <SelectItem value="dark">داكن</SelectItem>
                        <SelectItem value="system">تلقائي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">المنطقة الزمنية</Label>
                    <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Riyadh">الرياض</SelectItem>
                        <SelectItem value="Asia/Dubai">دبي</SelectItem>
                        <SelectItem value="Europe/London">لندن</SelectItem>
                        <SelectItem value="America/New_York">نيويورك</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>الإشعارات</Label>
                      <div className="text-sm text-muted-foreground">تفعيل إشعارات النظام</div>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>الحفظ التلقائي</Label>
                      <div className="text-sm text-muted-foreground">حفظ الإعدادات تلقائياً</div>
                    </div>
                    <Switch
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="network" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Wifi className="h-5 w-5 mr-2" />
                  إعدادات الشبكة
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="refreshInterval">فترة التحديث (ثانية)</Label>
                    <Input
                      id="refreshInterval"
                      type="number"
                      value={settings.refreshInterval}
                      onChange={(e) => handleSettingChange('refreshInterval', e.target.value)}
                      placeholder="30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxConnections">الحد الأقصى للاتصالات</Label>
                    <Input
                      id="maxConnections"
                      type="number"
                      value={settings.maxConnections}
                      onChange={(e) => handleSettingChange('maxConnections', e.target.value)}
                      placeholder="100"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeout">مهلة الاتصال (ms)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      value={settings.timeout}
                      onChange={(e) => handleSettingChange('timeout', e.target.value)}
                      placeholder="5000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="retryAttempts">محاولات إعادة الاتصال</Label>
                    <Input
                      id="retryAttempts"
                      type="number"
                      value={settings.retryAttempts}
                      onChange={(e) => handleSettingChange('retryAttempts', e.target.value)}
                      placeholder="3"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  إعدادات الأمان
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>جدار الحماية</Label>
                      <div className="text-sm text-muted-foreground">تفعيل جدار الحماية المدمج</div>
                    </div>
                    <Switch
                      checked={settings.enableFirewall}
                      onCheckedChange={(checked) => handleSettingChange('enableFirewall', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>تشفير SSL</Label>
                      <div className="text-sm text-muted-foreground">تفعيل التشفير الآمن</div>
                    </div>
                    <Switch
                      checked={settings.enableSSL}
                      onCheckedChange={(checked) => handleSettingChange('enableSSL', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>التحديثات التلقائية</Label>
                      <div className="text-sm text-muted-foreground">تحديث الأمان تلقائياً</div>
                    </div>
                    <Switch
                      checked={settings.autoUpdates}
                      onCheckedChange={(checked) => handleSettingChange('autoUpdates', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>مستوى السجلات</Label>
                  <Select value={settings.logLevel} onValueChange={(value) => handleSettingChange('logLevel', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">أخطاء فقط</SelectItem>
                      <SelectItem value="warn">تحذيرات</SelectItem>
                      <SelectItem value="info">معلومات</SelectItem>
                      <SelectItem value="debug">تفصيلي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  إعدادات الأداء
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>ذاكرة التخزين المؤقت</Label>
                      <div className="text-sm text-muted-foreground">تفعيل التخزين المؤقت لتحسين الأداء</div>
                    </div>
                    <Switch
                      checked={settings.cacheEnabled}
                      onCheckedChange={(checked) => handleSettingChange('cacheEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>ضغط البيانات</Label>
                      <div className="text-sm text-muted-foreground">ضغط البيانات لتوفير النطاق الترددي</div>
                    </div>
                    <Switch
                      checked={settings.compressionEnabled}
                      onCheckedChange={(checked) => handleSettingChange('compressionEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>شبكة التوصيل السريع (CDN)</Label>
                      <div className="text-sm text-muted-foreground">استخدام CDN لتسريع التحميل</div>
                    </div>
                    <Switch
                      checked={settings.cdnEnabled}
                      onCheckedChange={(checked) => handleSettingChange('cdnEnabled', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleSaveSettings} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                حفظ الإعدادات
              </Button>
              
              <Button variant="outline" onClick={handleResetSettings}>
                <RefreshCw className="h-4 w-4 mr-2" />
                إعادة تعيين
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportSettings}>
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
              
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                استيراد
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
