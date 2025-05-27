
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import PingTool from './tools/PingTool';
import PortScanner from './tools/PortScanner';
import SpeedTest from './tools/SpeedTest';
import NetworkAnalyzer from './tools/NetworkAnalyzer';
import { 
  Activity, 
  Gauge,
  Shield,
  Scan,
  Monitor,
  Zap
} from 'lucide-react';

const NetworkToolsPanel = () => {
  return (
    <Card className="border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-600" />
          أدوات الشبكة المتقدمة
          <Badge className="ml-2 bg-blue-100 text-blue-700">
            Professional Tools by Sajad Kadhim
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="speed" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="speed" className="text-xs flex items-center space-x-1">
              <Gauge className="h-3 w-3" />
              <span>اختبار السرعة</span>
            </TabsTrigger>
            <TabsTrigger value="ping" className="text-xs flex items-center space-x-1">
              <Activity className="h-3 w-3" />
              <span>Ping</span>
            </TabsTrigger>
            <TabsTrigger value="scan" className="text-xs flex items-center space-x-1">
              <Scan className="h-3 w-3" />
              <span>مسح المنافذ</span>
            </TabsTrigger>
            <TabsTrigger value="monitor" className="text-xs flex items-center space-x-1">
              <Monitor className="h-3 w-3" />
              <span>المراقبة</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="speed" className="space-y-4">
            <SpeedTest />
          </TabsContent>

          <TabsContent value="ping" className="space-y-4">
            <PingTool />
          </TabsContent>

          <TabsContent value="scan" className="space-y-4">
            <PortScanner />
          </TabsContent>

          <TabsContent value="monitor" className="space-y-4">
            <NetworkAnalyzer />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NetworkToolsPanel;
