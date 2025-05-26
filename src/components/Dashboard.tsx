
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Wifi, Shield, Zap, Users, Globe, Settings, HelpCircle } from 'lucide-react';

const Dashboard = () => {
  const networkMetrics = [
    {
      title: 'Network Status',
      value: 'Online',
      status: 'online',
      icon: <Wifi className="h-5 w-5" />,
      change: '+99.9%',
      trend: 'up'
    },
    {
      title: 'Active Devices',
      value: '24',
      status: 'online',
      icon: <Users className="h-5 w-5" />,
      change: '+3',
      trend: 'up'
    },
    {
      title: 'Security Score',
      value: '94/100',
      status: 'online',
      icon: <Shield className="h-5 w-5" />,
      change: '+2',
      trend: 'up'
    },
    {
      title: 'Avg Response',
      value: '12ms',
      status: 'online',
      icon: <Zap className="h-5 w-5" />,
      change: '-5ms',
      trend: 'down'
    }
  ];

  const recentEvents = [
    { time: '2 min ago', event: 'New device connected: iPhone-14', type: 'info' },
    { time: '15 min ago', event: 'Security scan completed', type: 'success' },
    { time: '1 hour ago', event: 'Bandwidth usage threshold reached', type: 'warning' },
    { time: '2 hours ago', event: 'Firmware update available', type: 'info' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-octa-blue-500 to-octa-purple-600 flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">OCTA GRAM</h1>
                <p className="text-sm text-muted-foreground">Network Monitoring Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="glass-card rounded-xl p-8 bg-gradient-to-r from-octa-blue-500/10 to-octa-purple-600/10 border border-octa-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Welcome to OCTA GRAM
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Advanced Network Monitoring & AI-Powered Analytics
                </p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Activity className="h-3 w-3 mr-1" />
                    All Systems Operational
                  </Badge>
                  <Badge className="bg-octa-blue-500/20 text-octa-blue-400 border-octa-blue-500/30">
                    <Globe className="h-3 w-3 mr-1" />
                    AI Assistant Active
                  </Badge>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-octa-blue-500/20 to-octa-purple-600/20 flex items-center justify-center">
                  <Activity className="h-16 w-16 text-octa-blue-400 animate-pulse-slow" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {networkMetrics.map((metric, index) => (
            <Card key={index} className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {metric.icon}
                  </div>
                  <Badge className={`status-${metric.status}`}>
                    {metric.change}
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {metric.title}
                </h3>
                <p className="text-2xl font-bold text-foreground">
                  {metric.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Network Overview */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Network Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-octa-blue-500/20 to-octa-purple-600/20 flex items-center justify-center">
                      <Activity className="h-8 w-8 text-octa-blue-400" />
                    </div>
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Real-time Network Visualization
                    </p>
                    <p className="text-muted-foreground">
                      Interactive network topology and traffic analysis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Events */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      event.type === 'success' ? 'bg-green-400' :
                      event.type === 'warning' ? 'bg-yellow-400' :
                      event.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{event.event}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Network Scan', icon: <Wifi className="h-5 w-5" />, color: 'octa-blue' },
                  { name: 'AI Assistant', icon: <Activity className="h-5 w-5" />, color: 'octa-purple' },
                  { name: 'Security Check', icon: <Shield className="h-5 w-5" />, color: 'octa-green' },
                  { name: 'Speed Test', icon: <Zap className="h-5 w-5" />, color: 'octa-blue' }
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex-col space-y-2 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className={`p-2 rounded-lg bg-${action.color}-500/10`}>
                      {action.icon}
                    </div>
                    <span className="text-sm">{action.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
