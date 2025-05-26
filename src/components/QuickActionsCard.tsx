
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings } from 'lucide-react';

const QuickActionsCard = () => {
  const [selectedAction, setSelectedAction] = useState('');

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Settings className="h-5 w-5 mr-2 text-blue-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedAction} onValueChange={setSelectedAction}>
          <SelectTrigger>
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="scan">Network Scan</SelectItem>
            <SelectItem value="test">Speed Test</SelectItem>
            <SelectItem value="restart">Restart Router</SelectItem>
            <SelectItem value="backup">Backup Config</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex space-x-2">
          <Button 
            variant="default" 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            disabled={!selectedAction}
          >
            Execute
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            disabled={!selectedAction}
          >
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
