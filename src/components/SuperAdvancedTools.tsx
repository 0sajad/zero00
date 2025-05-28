
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wrench } from 'lucide-react';
import NetworkToolsTab from './tools/NetworkToolsTab';
import SecurityToolsTab from './tools/SecurityToolsTab';
import SystemToolsTab from './tools/SystemToolsTab';
import AnalyticsToolsTab from './tools/AnalyticsToolsTab';
import ToolsStatsCard from './tools/ToolsStatsCard';

const SuperAdvancedTools = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Wrench className="h-6 w-6 mr-3" />
            مركز الأدوات المتقدمة - OCTA NETWORK Pro Tools
            <Badge className="ml-3 bg-blue-600 text-white">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-blue-600 text-sm">
            🎯 مجموعة شاملة من الأدوات الاحترافية المدعومة بالذكاء الاصطناعي لتحليل وتأمين ومراقبة الشبكات
          </div>
        </CardContent>
      </Card>

      {/* Tools Categories */}
      <Tabs defaultValue="network" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-16">
          <TabsTrigger value="network" className="flex flex-col items-center space-y-1 h-full">
            <span className="text-xs">أدوات الشبكة</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex flex-col items-center space-y-1 h-full">
            <span className="text-xs">أدوات الأمان</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex flex-col items-center space-y-1 h-full">
            <span className="text-xs">أدوات النظام</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex flex-col items-center space-y-1 h-full">
            <span className="text-xs">أدوات التحليل</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="network">
          <NetworkToolsTab />
        </TabsContent>

        <TabsContent value="security">
          <SecurityToolsTab />
        </TabsContent>

        <TabsContent value="system">
          <SystemToolsTab />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsToolsTab />
        </TabsContent>
      </Tabs>

      {/* Global Stats */}
      <ToolsStatsCard />
    </div>
  );
};

export default SuperAdvancedTools;
