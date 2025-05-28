
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield } from 'lucide-react';
import SecurityTab from './network-tools/SecurityTab';
import BandwidthTab from './network-tools/BandwidthTab';
import DNSTab from './network-tools/DNSTab';
import MappingTab from './network-tools/MappingTab';
import TrafficTab from './network-tools/TrafficTab';

const AdvancedNetworkTools = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            أدوات الشبكة المتقدمة والأمان
            <Badge className="ml-2 bg-red-100 text-red-700">Enterprise</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="security" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="security">الأمان</TabsTrigger>
              <TabsTrigger value="bandwidth">النطاق الترددي</TabsTrigger>
              <TabsTrigger value="dns">DNS</TabsTrigger>
              <TabsTrigger value="mapping">رسم الشبكة</TabsTrigger>
              <TabsTrigger value="traffic">تحليل المرور</TabsTrigger>
            </TabsList>

            <TabsContent value="security">
              <SecurityTab />
            </TabsContent>

            <TabsContent value="bandwidth">
              <BandwidthTab />
            </TabsContent>

            <TabsContent value="dns">
              <DNSTab />
            </TabsContent>

            <TabsContent value="mapping">
              <MappingTab />
            </TabsContent>

            <TabsContent value="traffic">
              <TrafficTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedNetworkTools;
