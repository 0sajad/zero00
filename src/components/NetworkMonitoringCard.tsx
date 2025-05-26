
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Download, Upload, Zap, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const NetworkMonitoringCard = () => {
  const speedData = [
    { time: '00:00', download: 120, upload: 40 },
    { time: '04:00', download: 130, upload: 45 },
    { time: '08:00', download: 140, upload: 50 },
    { time: '12:00', download: 135, upload: 48 },
    { time: '16:00', download: 125, upload: 42 },
    { time: '20:00', download: 130, upload: 45 },
    { time: '24:00', download: 120, upload: 40 },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-600" />
          مراقبة الشبكة في الوقت الفعلي
        </CardTitle>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <RefreshCw className="h-4 w-4 mr-2" />
          تحديث
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 sm:mb-6">قياس سرعة ومستوى أداء الشبكة بشكل مباشر</p>
        
        {/* Speed Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <Download className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <span className="text-xs text-gray-500">سرعة التنزيل</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">70 Mbps</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <Upload className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="text-xs text-gray-500">سرعة الرفع</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">35 Mbps</div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
              <span className="text-xs text-gray-500">زمن الاستجابة</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">12 ms</div>
          </div>
        </div>

        {/* Chart */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">سرعة التنزيل والرفع</h4>
          <div className="h-32 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={speedData}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#6B7280' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#6B7280' }}
                  width={30}
                />
                <Line 
                  type="monotone" 
                  dataKey="download" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                  fill="url(#downloadGradient)"
                />
                <Line 
                  type="monotone" 
                  dataKey="upload" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={false}
                />
                <defs>
                  <linearGradient id="downloadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkMonitoringCard;
