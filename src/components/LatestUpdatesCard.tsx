
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

const LatestUpdatesCard = () => {
  const updates = [
    {
      text: 'Security update available',
      type: 'info',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      text: 'Performance optimized',
      type: 'success',
      color: 'bg-green-100 text-green-700'
    }
  ];

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Bell className="h-5 w-5 mr-2 text-purple-600" />
          Latest Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {updates.map((update, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${update.type === 'info' ? 'bg-blue-400' : 'bg-green-400'}`} />
            <span className="text-sm text-gray-700 flex-1">{update.text}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LatestUpdatesCard;
