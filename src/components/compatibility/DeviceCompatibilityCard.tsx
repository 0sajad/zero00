
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DeviceCompatibility } from './CompatibilityTestEngine';

interface DeviceCompatibilityCardProps {
  devices: DeviceCompatibility[];
}

const getScoreColor = (score: number) => {
  if (score >= 95) return 'text-green-600 bg-green-50';
  if (score >= 85) return 'text-blue-600 bg-blue-50';
  if (score >= 70) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

export const DeviceCompatibilityCard = ({ devices }: DeviceCompatibilityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>توافق الأجهزة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {devices.map((device, index) => (
            <div key={index} className="text-center p-3 border rounded-lg">
              <div className="font-medium mb-1">{device.type}</div>
              <Badge className={getScoreColor(device.compatibility)}>
                {device.compatibility}%
              </Badge>
              {device.responsive && (
                <div className="text-xs text-green-600 mt-1">متجاوب</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
