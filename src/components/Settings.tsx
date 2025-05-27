
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings as SettingsIcon, 
  Wifi, 
  Shield, 
  Bell, 
  User, 
  Globe, 
  Monitor,
  Smartphone,
  Laptop,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Crown,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    network: {
      autoScan: true,
      scanInterval: 30,
      alertThreshold: 50,
      preferredDNS: '8.8.8.8',
      enableIPv6: false,
      wifiOptimization: true
    },
    security: {
      enableFirewall: true,
      autoBlock: true,
      threatDetection: true,
      encryptionLevel: 'high',
      vpnAlways: false,
      secureBootstrap: true
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      soundEnabled: false,
      criticalOnly: false,
      weeklyReports: true,
      instantAlerts: true
    },
    display: {
      theme: 'system',
      language: 'ar',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      density: 'comfortable',
      animations: true
    },
    performance: {
      autoOptimize: true,
      backgroundScanning: true,
      dataCompression: false,
      cacheEnabled: true,
      lowPowerMode: false,
      advancedMetrics: true
    }
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('octaNetworkSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('خطأ في تحميل الإعدادات:', error);
      }
    }
  }, []);

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage
      localStorage.setItem('octaNetworkSettings', JSON.stringify(settings));
      
      setHasChanges(false);
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
      setSaving(false);
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      network: {
        autoScan: true,
        scanInterval: 30,
        alertThreshold: 50,
        preferredDNS: '8.8.8.8',
        enableIPv6: false,
        wifiOptimization: true
      },
      security: {
        enableFirewall: true,
        autoBlock: true,
        threatDetection: true,
        encryptionLevel: 'high',
        vpnAlways: false,
        secureBootstrap: true
      },
      notifications: {
        emailAlerts: true,
        pushNotifications: true,
        soundEnabled: false,
        criticalOnly: false,
        weeklyReports: true,
        instantAlerts: true
      },
      display: {
        theme: 'system',
        language: 'ar',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        density: 'comfortable',
        animations: true
      },
      performance: {
        autoOptimize: true,
        backgroundScanning: true,
        dataCompression: false,
        cacheEnabled: true,
        lowPowerMode: false,
        advancedMetrics: true
      }
    };
    
    setSettings(defaultSettings);
    setHasChanges(true);
    toast({
      title: "تم إعادة تعيين الإعدادات",
      description: "تم استعادة الإعدادات الافتراضية",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-center mb-3">
            <Crown className="h-6 w-6 text-yellow-400 mr-2" />
            <h1 className="text-2xl font-bold">إعدادات النظام المتقدمة</h1>
            <Crown className="h-6 w-6 text-yellow-400 ml-2" />
          </div>
          <p className="text-blue-100">
            إعدادات مخصصة من تطوير <span className="font-bold text-yellow-300">Sajad Kadhim</span>
          </p>
          <div className="flex items-center justify-center mt-2">
            <Badge className="bg-yellow-400 text-black">
              Professional Settings Suite
            </Badge>
          </div>
        </div>
      </div>

      {/* Save/Reset Actions */}
      {hasChanges && (
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span className="text-orange-800 font-medium">يوجد تغييرات غير محفوظة</span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={saveSettings} 
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      حفظ التغييرات
                    </>
                  )}
                </Button>
                <Button 
                  onClick={resetSettings} 
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  إعادة تعيين
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="network" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="network">الشبكة</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="notifications">التنبيهات</TabsTrigger>
          <TabsTrigger value="display">العرض</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wifi className="h-5 w-5 mr-2" />
                إعدادات الشبكة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoScan">الفحص التلقائي</Label>
                    <Switch
                      id="autoScan"
                      checked={settings.network.autoScan}
                      onCheckedChange={(checked) => updateSetting('network', 'autoScan', checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="scanInterval">فترة الفحص (ثانية)</Label>
                    <Input
                      id="scanInterval"
                      type="number"
                      value={settings.network.scanInterval}
                      onChange={(e) => updateSetting('network', 'scanInterval', parseInt(e.target.value))}
                      min="10"
                      max="300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredDNS">خادم DNS المفضل</Label>
                    <Select 
                      value={settings.network.preferredDNS} 
                      onValueChange={(value) => updateSetting('network', 'preferredDNS', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8.8.8.8">Google DNS (8.8.8.8)</SelectItem>
                        <SelectItem value="1.1.1.1">Cloudflare DNS (1.1.1.1)</SelectItem>
                        <SelectItem value="9.9.9.9">Quad9 DNS (9.9.9.9)</SelectItem>
                        <SelectItem value="208.67.222.222">OpenDNS (208.67.222.222)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableIPv6">تفعيل IPv6</Label>
                    <Switch
                      id="enableIPv6"
                      checked={settings.network.enableIPv6}
                      onCheckedChange={(checked) => updateSetting('network', 'enableIPv6', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wifiOptimization">تحسين WiFi</Label>
                    <Switch
                      id="wifiOptimization"
                      checked={settings.network.wifiOptimization}
                      onCheckedChange={(checked) => updateSetting('network', 'wifiOptimization', checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alertThreshold">حد التنبيه (Mbps)</Label>
                    <Input
                      id="alertThreshold"
                      type="number"
                      value={settings.network.alertThreshold}
                      onChange={(e) => updateSetting('network', 'alertThreshold', parseInt(e.target.value))}
                      min="1"
                      max="1000"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                إعدادات الأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableFirewall">تفعيل جدار الحماية</Label>
                    <Switch
                      id="enableFirewall"
                      checked={settings.security.enableFirewall}
                      onCheckedChange={(checked) => updateSetting('security', 'enableFirewall', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoBlock">الحظر التلقائي للتهديدات</Label>
                    <Switch
                      id="autoBlock"
                      checked={settings.security.autoBlock}
                      onCheckedChange={(checked) => updateSetting('security', 'autoBlock', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="threatDetection">كشف التهديدات المتقدم</Label>
                    <Switch
                      id="threatDetection"
                      checked={settings.security.threatDetection}
                      onCheckedChange={(checked) => updateSetting('security', 'threatDetection', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="encryptionLevel">مستوى التشفير</Label>
                    <Select 
                      value={settings.security.encryptionLevel} 
                      onValueChange={(value) => updateSetting('security', 'encryptionLevel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">أساسي</SelectItem>
                        <SelectItem value="standard">قياسي</SelectItem>
                        <SelectItem value="high">عالي</SelectItem>
                        <SelectItem value="military">عسكري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="vpnAlways">VPN دائماً</Label>
                    <Switch
                      id="vpnAlways"
                      checked={settings.security.vpnAlways}
                      onCheckedChange={(checked) => updateSetting('security', 'vpnAlways', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="secureBootstrap">التمهيد الآمن</Label>
                    <Switch
                      id="secureBootstrap"
                      checked={settings.security.secureBootstrap}
                      onCheckedChange={(checked) => updateSetting('security', 'secureBootstrap', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                إعدادات التنبيهات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailAlerts">تنبيهات البريد الإلكتروني</Label>
                    <Switch
                      id="emailAlerts"
                      checked={settings.notifications.emailAlerts}
                      onCheckedChange={(checked) => updateSetting('notifications', 'emailAlerts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications">الإشعارات الفورية</Label>
                    <Switch
                      id="pushNotifications"
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="soundEnabled">الأصوات</Label>
                    <Switch
                      id="soundEnabled"
                      checked={settings.notifications.soundEnabled}
                      onCheckedChange={(checked) => updateSetting('notifications', 'soundEnabled', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="criticalOnly">التنبيهات الحرجة فقط</Label>
                    <Switch
                      id="criticalOnly"
                      checked={settings.notifications.criticalOnly}
                      onCheckedChange={(checked) => updateSetting('notifications', 'criticalOnly', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weeklyReports">التقارير الأسبوعية</Label>
                    <Switch
                      id="weeklyReports"
                      checked={settings.notifications.weeklyReports}
                      onCheckedChange={(checked) => updateSetting('notifications', 'weeklyReports', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="instantAlerts">التنبيهات الفورية</Label>
                    <Switch
                      id="instantAlerts"
                      checked={settings.notifications.instantAlerts}
                      onCheckedChange={(checked) => updateSetting('notifications', 'instantAlerts', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="h-5 w-5 mr-2" />
                إعدادات العرض
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">المظهر</Label>
                    <Select 
                      value={settings.display.theme} 
                      onValueChange={(value) => updateSetting('display', 'theme', value)}
                    >
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
                    <Label htmlFor="language">اللغة</Label>
                    <Select 
                      value={settings.display.language} 
                      onValueChange={(value) => updateSetting('display', 'language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="ar-iq">العربية (العراق)</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">تنسيق التاريخ</Label>
                    <Select 
                      value={settings.display.dateFormat} 
                      onValueChange={(value) => updateSetting('display', 'dateFormat', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">تنسيق الوقت</Label>
                    <Select 
                      value={settings.display.timeFormat} 
                      onValueChange={(value) => updateSetting('display', 'timeFormat', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12 ساعة</SelectItem>
                        <SelectItem value="24h">24 ساعة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="density">كثافة العرض</Label>
                    <Select 
                      value={settings.display.density} 
                      onValueChange={(value) => updateSetting('display', 'density', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">مضغوط</SelectItem>
                        <SelectItem value="comfortable">مريح</SelectItem>
                        <SelectItem value="spacious">واسع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations">الحركات المتحركة</Label>
                    <Switch
                      id="animations"
                      checked={settings.display.animations}
                      onCheckedChange={(checked) => updateSetting('display', 'animations', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="h-5 w-5 mr-2" />
                إعدادات الأداء
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoOptimize">التحسين التلقائي</Label>
                    <Switch
                      id="autoOptimize"
                      checked={settings.performance.autoOptimize}
                      onCheckedChange={(checked) => updateSetting('performance', 'autoOptimize', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backgroundScanning">الفحص في الخلفية</Label>
                    <Switch
                      id="backgroundScanning"
                      checked={settings.performance.backgroundScanning}
                      onCheckedChange={(checked) => updateSetting('performance', 'backgroundScanning', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cacheEnabled">تفعيل ذاكرة التخزين المؤقت</Label>
                    <Switch
                      id="cacheEnabled"
                      checked={settings.performance.cacheEnabled}
                      onCheckedChange={(checked) => updateSetting('performance', 'cacheEnabled', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dataCompression">ضغط البيانات</Label>
                    <Switch
                      id="dataCompression"
                      checked={settings.performance.dataCompression}
                      onCheckedChange={(checked) => updateSetting('performance', 'dataCompression', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="lowPowerMode">وضع توفير الطاقة</Label>
                    <Switch
                      id="lowPowerMode"
                      checked={settings.performance.lowPowerMode}
                      onCheckedChange={(checked) => updateSetting('performance', 'lowPowerMode', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="advancedMetrics">المقاييس المتقدمة</Label>
                    <Switch
                      id="advancedMetrics"
                      checked={settings.performance.advancedMetrics}
                      onCheckedChange={(checked) => updateSetting('performance', 'advancedMetrics', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Developer Footer */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-gray-700">نظام إعدادات متطور من تطوير</span>
            <span className="font-bold text-blue-600 text-lg">Sajad Kadhim</span>
            <Star className="h-5 w-5 text-yellow-500" />
          </div>
          <Badge className="bg-blue-100 text-blue-700">
            Advanced Settings Management System
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
