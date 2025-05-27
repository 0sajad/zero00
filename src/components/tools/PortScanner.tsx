
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Scan } from 'lucide-react';

const PortScanner = () => {
  const [target, setTarget] = useState('127.0.0.1');
  const [ports, setPorts] = useState('80,443,22,21');
  const [results, setResults] = useState<Array<{port: number, status: string}>>([]);
  const [isScanning, setIsScanning] = useState(false);

  const scanPorts = () => {
    setIsScanning(true);
    setResults([]);
    
    const portList = ports.split(',').map(p => parseInt(p.trim()));
    const scanResults = portList.map(port => ({
      port,
      status: Math.random() > 0.5 ? 'open' : 'closed'
    }));

    setTimeout(() => {
      setResults(scanResults);
      setIsScanning(false);
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Scan className="h-5 w-5 mr-2" />
          فحص المنافذ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="عنوان IP المستهدف"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <Input
            placeholder="المنافذ (مفصولة بفاصلة)"
            value={ports}
            onChange={(e) => setPorts(e.target.value)}
          />
        </div>

        <Button onClick={scanPorts} disabled={isScanning} className="w-full">
          {isScanning ? 'جاري الفحص...' : 'بدء فحص المنافذ'}
        </Button>

        {results.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">نتائج الفحص:</h4>
            {results.map((result, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>المنفذ {result.port}</span>
                <Badge variant={result.status === 'open' ? 'default' : 'secondary'}>
                  {result.status === 'open' ? 'مفتوح' : 'مغلق'}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortScanner;
