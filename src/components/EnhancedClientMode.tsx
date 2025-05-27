
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import NetworkDashboard from './NetworkDashboard';
import NetworkToolsPanel from './NetworkToolsPanel';
import { 
  Network, 
  Shield, 
  BarChart3, 
  Bot, 
  Bell,
  Monitor,
  Zap
} from 'lucide-react';

const EnhancedClientMode = () => {
  const [activeNotifications] = useState(3);

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
            <Network className="h-6 w-6 mr-3" />
            مرحباً في OCTA NETWORK - وضع العميل المحسن
            <Badge className="ml-3 bg-blue-600 text-white">Premium Client</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-blue-600 dark:text-blue-400 text-sm">
            🚀 منصة مراقبة الشبكات الأكثر تطوراً مع أكثر من 100 أداة متخصصة وذكاء اصطناعي متقدم
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-16">
          <TabsTrigger value="dashboard" className="flex flex-col items-center space-y-1 h-full">
            <Monitor className="h-4 w-4" />
            <span className="text-xs">لوحة التحكم</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex flex-col items-center space-y-1 h-full">
            <Zap className="h-4 w-4" />
            <span className="text-xs">الأدوات المتقدمة</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex flex-col items-center space-y-1 h-full">
            <Shield className="h-4 w-4" />
            <span className="text-xs">مركز الأمان</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex flex-col items-center space-y-1 h-full">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">التحليلات</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <NetworkDashboard />
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <NetworkToolsPanel />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مركز الأمان</CardTitle>
            </CardHeader>
            <CardContent>
              <p>مركز الأمان قيد التطوير...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التحليلات</CardTitle>
            </CardHeader>
            <CardContent>
              <p>لوحة التحليلات قيد التطوير...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedClientMode;
