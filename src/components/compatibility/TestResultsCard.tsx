
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { CompatibilityTest } from './CompatibilityTestEngine';

interface TestResultsCardProps {
  tests: CompatibilityTest[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pass': return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    case 'fail': return <XCircle className="h-4 w-4 text-red-600" />;
    default: return <CheckCircle className="h-4 w-4 text-green-600" />;
  }
};

const getScoreColor = (score: number) => {
  if (score >= 95) return 'text-green-600 bg-green-50';
  if (score >= 85) return 'text-blue-600 bg-blue-50';
  if (score >= 70) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

export const TestResultsCard = ({ tests }: TestResultsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تفاصيل الاختبارات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tests.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                {getStatusIcon(test.status)}
                <div>
                  <div className="font-medium">{test.name}</div>
                  <div className="text-sm text-gray-600">{test.message}</div>
                </div>
              </div>
              <Badge className={getScoreColor(test.score)}>
                {test.score}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
