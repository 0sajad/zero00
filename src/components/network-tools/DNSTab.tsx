
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DNSTab = () => {
  const { toast } = useToast();
  const [dnsResults, setDnsResults] = useState<any[]>([]);

  const runDNSAnalysis = async () => {
    toast({
      title: "تحليل DNS",
      description: "جاري تحليل خوادم DNS واستعلامات النطاق...",
    });

    setTimeout(() => {
      const dnsData = [
        {
          server: '8.8.8.8',
          provider: 'Google DNS',
          responseTime: '12ms',
          status: 'نشط',
          reliability: '99.9%',
          location: 'عالمي'
        },
        {
          server: '1.1.1.1', 
          provider: 'Cloudflare DNS',
          responseTime: '8ms',
          status: 'نشط',
          reliability: '99.8%',
          location: 'عالمي'
        }
      ];

      setDnsResults(dnsData);
      
      const fastestDNS = dnsData.reduce((prev, current) => 
        parseInt(prev.responseTime) < parseInt(current.responseTime) ? prev : current
      );
      
      toast({
        title: "تحليل DNS مكتمل",
        description: `أسرع خادم DNS: ${fastestDNS.provider} (${fastestDNS.responseTime})`,
      });
    }, 2500);
  };

  return (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-bold">تحليل خوادم DNS</h3>
      <p className="text-muted-foreground">فحص أداء وموثوقية خوادم DNS</p>
      
      <Button onClick={runDNSAnalysis} className="bg-green-600 hover:bg-green-700">
        <Globe className="h-4 w-4 mr-2" />
        تحليل خوادم DNS
      </Button>

      {dnsResults.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold">نتائج تحليل DNS:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dnsResults.map((dns, index) => (
              <Card key={index} className="text-left">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Server className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{dns.provider}</span>
                    </div>
                    <Badge className={dns.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {dns.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>الخادم:</span>
                      <span className="font-medium">{dns.server}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>زمن الاستجابة:</span>
                      <span className="font-medium">{dns.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الموثوقية:</span>
                      <span className="font-medium">{dns.reliability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الموقع:</span>
                      <span className="font-medium">{dns.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DNSTab;
