
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { 
  Crown, 
  Activity, 
  Wifi, 
  Shield, 
  Gauge,
  Network,
  Globe,
  Zap,
  Star,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import NetworkStatusIndicator from './NetworkStatusIndicator';

const CompactDashboard = () => {
  const { t } = useTranslation();

  const quickStats = [
    {
      title: t('networkStatus'),
      value: t('online'),
      icon: <Wifi className="h-5 w-5 text-green-500" />,
      color: 'bg-green-50 border-green-200',
      status: 'success'
    },
    {
      title: 'السرعة',
      value: '250 Mbps',
      icon: <Gauge className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200',
      status: 'info'
    },
    {
      title: 'الأمان',
      value: '96%',
      icon: <Shield className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200',
      status: 'success'
    },
    {
      title: 'الأجهزة',
      value: '12',
      icon: <Network className="h-5 w-5 text-orange-500" />,
      color: 'bg-orange-50 border-orange-200',
      status: 'info'
    }
  ];

  const quickActions = [
    { name: t('speedTest'), icon: <Zap className="h-4 w-4" />, color: 'bg-blue-600 hover:bg-blue-700' },
    { name: t('securityScan'), icon: <Shield className="h-4 w-4" />, color: 'bg-purple-600 hover:bg-purple-700' },
    { name: t('deviceScan'), icon: <Network className="h-4 w-4" />, color: 'bg-green-600 hover:bg-green-700' },
    { name: t('wifiAnalyzer'), icon: <Wifi className="h-4 w-4" />, color: 'bg-orange-600 hover:bg-orange-700' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Compact Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Crown className="h-8 w-8 text-yellow-400" />
                <div>
                  <h1 className="text-2xl font-bold">{t('welcome')}</h1>
                  <p className="text-blue-100 text-sm">{t('subtitle')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-400 text-black font-semibold">
                  <Star className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  {t('developedBy')}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className={`${stat.color} border-2 hover:shadow-lg transition-all`}>
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <h3 className="font-semibold text-lg">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Network Status */}
        <NetworkStatusIndicator />

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Zap className="h-5 w-5 mr-2 text-blue-600" />
              {t('quickActions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions.map((action, index) => (
                <Button key={index} className={`${action.color} text-white p-4 h-auto flex-col space-y-2`}>
                  {action.icon}
                  <span className="text-sm font-medium">{action.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Activity className="h-5 w-5 mr-2 text-green-600" />
                حالة النظام
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">وقت التشغيل</span>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium">99.9%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">استخدام المعالج</span>
                <div className="flex items-center">
                  <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                    <div className="w-1/4 h-full bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">25%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">استخدام الذاكرة</span>
                <div className="flex items-center">
                  <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                    <div className="w-1/2 h-full bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">50%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Globe className="h-5 w-5 mr-2 text-purple-600" />
                إحصائيات الشبكة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">البيانات المرسلة</span>
                <span className="text-sm font-medium text-blue-600">2.5 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">البيانات المستقبلة</span>
                <span className="text-sm font-medium text-green-600">15.2 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">زمن الاستجابة</span>
                <span className="text-sm font-medium text-purple-600">12ms</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Crown className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-700">{t('developedBy')}</span>
              <Badge variant="secondary" className="text-xs">Professional</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompactDashboard;
