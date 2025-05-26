
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

const SystemStatusCard = () => {
  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Activity className="h-5 w-5 mr-2 text-green-600" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Uptime:</span>
            <span className="font-semibold">99.9%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Check:</span>
            <span className="font-semibold">2 minutes ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatusCard;
