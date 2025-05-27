
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Crown, 
  Star, 
  User, 
  Zap, 
  Shield, 
  Globe,
  Activity,
  Wifi,
  Monitor,
  Settings
} from 'lucide-react';
import NetworkStatusIndicator from './NetworkStatusIndicator';
import SystemMetricsGrid from './SystemMetricsGrid';
import NetworkToolsPanel from './NetworkToolsPanel';
import QuickStatsCard from './QuickStatsCard';

const ProfessionalDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Compact Professional Header */}
        <Card className="border-2 border-blue-300 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  <div>
                    <h1 className="text-xl font-bold text-gray-800">OCTA NETWORK PRO</h1>
                    <p className="text-sm text-gray-600">Professional Network Monitoring</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-100 text-green-700 border border-green-300">
                  <Activity className="w-3 h-3 mr-1" />
                  Online
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 border border-blue-300">
                  <Shield className="w-3 h-3 mr-1" />
                  Secured
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 border border-purple-300">
                  by Sajad Kadhim
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Status Indicator */}
        <NetworkStatusIndicator />

        {/* System Metrics Grid */}
        <SystemMetricsGrid />

        {/* Main Tools Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <NetworkToolsPanel />
          </div>
          <div>
            <QuickStatsCard />
          </div>
        </div>

        {/* Professional Footer */}
        <Card className="border border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-700">تطوير احترافي بواسطة</span>
                <span className="font-semibold text-blue-600">Sajad Kadhim</span>
                <Star className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Badge variant="secondary" className="text-xs">Network Engineer</Badge>
                <Badge variant="secondary" className="text-xs">System Architect</Badge>
                <Badge variant="secondary" className="text-xs">Security Specialist</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
