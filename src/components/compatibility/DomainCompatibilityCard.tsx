
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DomainCompatibility } from './CompatibilityTestEngine';

interface DomainCompatibilityCardProps {
  domains: DomainCompatibility[];
}

const getScoreColor = (score: number) => {
  if (score >= 95) return 'text-green-600 bg-green-50';
  if (score >= 85) return 'text-blue-600 bg-blue-50';
  if (score >= 70) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

export const DomainCompatibilityCard = ({ domains }: DomainCompatibilityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>توافق النطاقات والاستضافة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {domains.map((domain, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{domain.name}</h3>
                <Badge className={getScoreColor(domain.score)}>
                  {domain.score}%
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-2">{domain.status}</p>
              <div className="flex flex-wrap gap-2">
                {domain.features.map((feature, fIndex) => (
                  <Badge key={fIndex} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
