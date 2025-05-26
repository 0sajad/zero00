
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Wifi, 
  Shield, 
  Settings, 
  HelpCircle, 
  Bot, 
  Scan,
  Zap,
  Menu,
  X,
  Globe
} from 'lucide-react';
import Dashboard from './Dashboard';
import AIAssistant from './AIAssistant';

const Layout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <Activity className="h-5 w-5" />, badge: null },
    { id: 'ai-assistant', name: 'AI Assistant', icon: <Bot className="h-5 w-5" />, badge: 'AI' },
    { id: 'network-scanner', name: 'Network Scanner', icon: <Scan className="h-5 w-5" />, badge: null },
    { id: 'security', name: 'Security', icon: <Shield className="h-5 w-5" />, badge: '94%' },
    { id: 'tools', name: 'Tools', icon: <Zap className="h-5 w-5" />, badge: null },
    { id: 'simulation', name: 'Simulation', icon: <Globe className="h-5 w-5" />, badge: 'Beta' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'ai-assistant':
        return (
          <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            <div className="h-full max-w-4xl mx-auto">
              <AIAssistant />
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
            <Card className="glass-card p-8 text-center max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-octa-blue-500/20 to-octa-purple-600/20 flex items-center justify-center">
                <Activity className="h-8 w-8 text-octa-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {navigationItems.find(item => item.id === activeTab)?.name}
              </h3>
              <p className="text-muted-foreground mb-4">
                This feature is under development. Stay tuned for advanced network monitoring capabilities!
              </p>
              <Button 
                onClick={() => setActiveTab('dashboard')}
                className="bg-primary hover:bg-primary/90"
              >
                Back to Dashboard
              </Button>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-card/30 backdrop-blur-sm border-r border-border/50 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-octa-blue-500 to-octa-purple-600 flex items-center justify-center flex-shrink-0">
              <Activity className="h-6 w-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-foreground">OCTA GRAM</h1>
                <p className="text-xs text-muted-foreground">Network Monitor</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={`w-full justify-start h-12 ${!sidebarOpen ? 'px-3' : 'px-4'}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {sidebarOpen && (
                <>
                  <span className="ml-3 flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/50">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className={`w-full justify-start h-12 ${!sidebarOpen ? 'px-3' : 'px-4'}`}
            >
              <Settings className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Settings</span>}
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start h-12 ${!sidebarOpen ? 'px-3' : 'px-4'}`}
            >
              <HelpCircle className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Help</span>}
            </Button>
          </div>
          
          {/* Sidebar Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default Layout;
