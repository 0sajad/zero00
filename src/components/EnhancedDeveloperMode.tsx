
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Code, 
  Settings, 
  Key, 
  Terminal,
  Shield,
  Cog,
  Database,
  Zap,
  Server,
  Monitor,
  FileCode,
  GitBranch,
  Bug,
  Cpu,
  HardDrive,
  Network,
  Lock,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import CMD from './CMD';
import LicenseManager from './LicenseManager';

const EnhancedDeveloperMode = () => {
  const [activeService, setActiveService] = useState('all');
  const [systemLogs, setSystemLogs] = useState([
    '[2024-01-20 10:30:15] INFO: System initialized successfully',
    '[2024-01-20 10:30:16] INFO: Network monitor started',
    '[2024-01-20 10:30:17] INFO: Security scan completed - No threats detected',
    '[2024-01-20 10:30:18] WARNING: High CPU usage detected on port 8080',
    '[2024-01-20 10:30:19] INFO: Database backup completed successfully'
  ]);

  return (
    <div className="space-y-6">
      <Card className="border-2 border-red-500 bg-gradient-to-r from-red-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-700">
            <Code className="h-6 w-6 mr-3" />
            وضع المطور المحسن - Enhanced Developer Mode
            <Badge className="ml-3 bg-red-600 text-white">FULL ADMIN ACCESS</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 text-sm">
            ⚠️ أنت الآن في وضع المطور المحسن - لديك صلاحيات كاملة للتحكم في النظام والخوادم
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-8 h-16">
          <TabsTrigger value="overview" className="flex flex-col items-center space-y-1 h-full">
            <Monitor className="h-4 w-4" />
            <span className="text-xs">نظرة عامة</span>
          </TabsTrigger>
          <TabsTrigger value="cmd" className="flex flex-col items-center space-y-1 h-full">
            <Terminal className="h-4 w-4" />
            <span className="text-xs">سطر الأوامر</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex flex-col items-center space-y-1 h-full">
            <Server className="h-4 w-4" />
            <span className="text-xs">الخدمات</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex flex-col items-center space-y-1 h-full">
            <Database className="h-4 w-4" />
            <span className="text-xs">قواعد البيانات</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex flex-col items-center space-y-1 h-full">
            <Shield className="h-4 w-4" />
            <span className="text-xs">الأمان المتقدم</span>
          </TabsTrigger>
          <TabsTrigger value="licenses" className="flex flex-col items-center space-y-1 h-full">
            <Key className="h-4 w-4" />
            <span className="text-xs">التراخيص</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex flex-col items-center space-y-1 h-full">
            <FileCode className="h-4 w-4" />
            <span className="text-xs">محرر الكود</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex flex-col items-center space-y-1 h-full">
            <Cog className="h-4 w-4" />
            <span className="text-xs">النظام</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">استخدام المعالج</p>
                    <p className="text-2xl font-bold text-blue-700">23%</p>
                  </div>
                  <Cpu className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2">
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '23%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">استخدام الذاكرة</p>
                    <p className="text-2xl font-bold text-green-700">68%</p>
                  </div>
                  <HardDrive className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2">
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">حركة الشبكة</p>
                    <p className="text-2xl font-bold text-purple-700">1.2 GB/s</p>
                  </div>
                  <Network className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-purple-500 text-white">نشط</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">المستخدمين النشطين</p>
                    <p className="text-2xl font-bold text-orange-700">42</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-orange-500 text-white">مراقب</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                سجل النظام المباشر
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg h-48 overflow-y-auto">
                {systemLogs.map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap">{log}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cmd" className="space-y-4">
          <CMD isDeveloper={true} />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                إدارة الخدمات والعمليات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Web Server (Apache)', status: 'running', port: '80, 443', cpu: '12%' },
                  { name: 'Database Server (MySQL)', status: 'running', port: '3306', cpu: '8%' },
                  { name: 'Network Monitor', status: 'running', port: '8080', cpu: '15%' },
                  { name: 'Security Scanner', status: 'running', port: '9090', cpu: '5%' },
                  { name: 'License Manager', status: 'stopped', port: '7070', cpu: '0%' },
                  { name: 'Backup Service', status: 'running', port: '6060', cpu: '3%' }
                ].map((service, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${service.status === 'running' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-600">Port: {service.port} | CPU: {service.cpu}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={service.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {service.status === 'running' ? 'يعمل' : 'متوقف'}
                          </Badge>
                          <Button size="sm" variant="outline">
                            {service.status === 'running' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="outline">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                إدارة قواعد البيانات المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">قاعدة بيانات المستخدمين</h4>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>السجلات: 15,248</div>
                      <div>الحجم: 145.7 MB</div>
                      <div>آخر نسخة احتياطية: قبل ساعتين</div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">نسخ احتياطي</Button>
                      <Button size="sm" variant="outline">تحسين</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">قاعدة بيانات الشبكة</h4>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>السجلات: 89,432</div>
                      <div>الحجم: 523.2 MB</div>
                      <div>آخر نسخة احتياطية: قبل 30 دقيقة</div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">نسخ احتياطي</Button>
                      <Button size="sm" variant="outline">تحسين</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">قاعدة بيانات الأمان</h4>
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>السجلات: 2,847</div>
                      <div>الحجم: 34.1 MB</div>
                      <div>آخر نسخة احتياطية: قبل 6 ساعات</div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">نسخ احتياطي</Button>
                      <Button size="sm" variant="outline">تحسين</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">محرر SQL المباشر</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="أدخل استعلام SQL هنا..."
                    className="font-mono bg-gray-50"
                    rows={6}
                  />
                  <div className="flex space-x-2 mt-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">تنفيذ الاستعلام</Button>
                    <Button variant="outline">مسح</Button>
                    <Button variant="outline">حفظ</Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                إعدادات الأمان المتقدمة للمطورين
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-red-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3 text-red-700">جدار الحماية المتقدم</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">حماية DDoS</span>
                        <Badge className="bg-green-100 text-green-800">مفعل</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">فلترة IP</span>
                        <Badge className="bg-green-100 text-green-800">مفعل</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SSL/TLS</span>
                        <Badge className="bg-green-100 text-green-800">AES-256</Badge>
                      </div>
                      <Button size="sm" className="w-full">إعدادات متقدمة</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-yellow-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3 text-yellow-700">نظام كشف التسلل</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">مراقبة الشبكة</span>
                        <Badge className="bg-green-100 text-green-800">نشط</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">تحليل السلوك</span>
                        <Badge className="bg-green-100 text-green-800">نشط</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">إنذار فوري</span>
                        <Badge className="bg-green-100 text-green-800">مفعل</Badge>
                      </div>
                      <Button size="sm" className="w-full">عرض السجلات</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-4">
          <LicenseManager />
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCode className="h-5 w-5 mr-2" />
                محرر الكود المتقدم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium">الملف الحالي:</span>
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">/var/www/html/config.php</code>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    تحميل
                  </Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-1" />
                    رفع
                  </Button>
                </div>
                
                <Textarea 
                  className="font-mono bg-gray-900 text-green-400 border-gray-700"
                  rows={20}
                  defaultValue={`<?php
// OCTA NETWORK Configuration File
// Developer Mode - Full Access

define('DB_HOST', 'localhost');
define('DB_USER', 'octa_admin');
define('DB_PASS', 'secure_password_2024');
define('DB_NAME', 'octa_network');

// Security Settings
define('ENCRYPTION_KEY', 'your_encryption_key_here');
define('API_VERSION', '3.0.1');
define('DEBUG_MODE', true);

// Network Monitoring Settings
$network_config = array(
    'monitor_interval' => 30,
    'max_devices' => 500,
    'alert_threshold' => 85,
    'backup_enabled' => true
);

// License Management
define('LICENSE_SERVER', 'https://license.octanetwork.com');
define('LICENSE_CHECK_INTERVAL', 3600);

?>`}
                />
                
                <div className="flex space-x-2">
                  <Button className="bg-green-600 hover:bg-green-700">حفظ التغييرات</Button>
                  <Button variant="outline">التحقق من الصيغة</Button>
                  <Button variant="outline">إعادة تحميل</Button>
                  <Button variant="outline" className="text-red-600">استعادة النسخة الأصلية</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cog className="h-5 w-5 mr-2" />
                إعدادات النظام المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">إعدادات الخادم</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">مهلة الاتصال (ثانية)</label>
                        <Input type="number" defaultValue="30" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">حد الذاكرة (MB)</label>
                        <Input type="number" defaultValue="512" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">عدد المعالجات</label>
                        <Input type="number" defaultValue="4" className="mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-green-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">إعدادات النسخ الاحتياطي</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">تكرار النسخ (ساعات)</label>
                        <Input type="number" defaultValue="6" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">مجلد النسخ</label>
                        <Input defaultValue="/backup/octa/" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">عدد النسخ المحفوظة</label>
                        <Input type="number" defaultValue="10" className="mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex space-x-2">
                <Button className="bg-blue-600 hover:bg-blue-700">حفظ الإعدادات</Button>
                <Button variant="outline">إعادة تشغيل النظام</Button>
                <Button variant="outline" className="text-red-600">إعادة ضبط المصنع</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedDeveloperMode;
