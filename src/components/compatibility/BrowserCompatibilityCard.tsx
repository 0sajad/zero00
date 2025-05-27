
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BrowserCompatibility } from './CompatibilityTestEngine';

interface BrowserCompatibilityCardProps {
  browsers: BrowserCompatibility[];
}

const getScoreColor = (score: number) => {
  if (score >= 95) return 'text-green-600 bg-green-50';
  if (score >= 85) return 'text-blue-600 bg-blue-50';
  if (score >= 70) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

export const BrowserCompatibilityCard = ({ browsers }: BrowserCompatibilityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>توافق المتصفحات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {browsers.map((browser, index) => (
            <div key={index} className="border rounded-lg p-4 text-center">
              <div className="font-semibold mb-1">{browser.name}</div>
              <div className="text-sm text-gray-600 mb-2">{browser.version}</div>
              <Badge className={getScoreColor(browser.compatibility)}>
                {browser.compatibility}%
              </Badge>
              <div className="text-xs text-gray-500 mt-1">{browser.features}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
