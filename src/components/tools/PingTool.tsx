
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity } from 'lucide-react';

const PingTool = () => {
  const [target, setTarget] = useState('google.com');
  const [results, setResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runPing = () => {
    setIsRunning(true);
    setResults([]);
    
    // Simulate ping results
    const pingResults = [];
    for (let i = 1; i <= 4; i++) {
      const time = Math.floor(Math.random() * 20) + 5;
      pingResults.push(`PING ${target}: time=${time}ms TTL=64`);
    }
    
    setTimeout(() => {
      setResults(pingResults);
      setIsRunning(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          أداة Ping
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="أدخل العنوان أو IP"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="flex-1"
          />
          <Button onClick={runPing} disabled={isRunning}>
            {isRunning ? 'جاري الفحص...' : 'Ping'}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-40 overflow-y-auto">
            {results.map((result, index) => (
              <div key={index}>{result}</div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PingTool;
