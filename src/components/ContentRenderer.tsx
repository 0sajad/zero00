
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Shield, 
  Settings, 
  Scan
} from 'lucide-react';
import NewDashboard from './NewDashboard';
import AIAssistant from './AIAssistant';
import NetworkScanner from './NetworkScanner';
import Simulation from './Simulation';
import EnhancedTools from './EnhancedTools';
import FiberOpticTools from './FiberOpticTools';
import License from './License';
import SettingsPage from './Settings';
import EnhancedHelpCenter from './EnhancedHelpCenter';
import DeveloperMode from './DeveloperMode';
import CMD from './CMD';
import ComprehensiveSystemTest from './ComprehensiveSystemTest';

interface ContentRendererProps {
  activeTab: string;
  userMode: 'client' | 'developer';
  onTabChange: (tabId: string) => void;
}

const ContentRenderer = ({ activeTab, userMode, onTabChange }: ContentRendererProps) => {
  const renderContent = () => {
    console.log('عرض المحتوى للتبويب:', activeTab);
    
    try {
      switch (activeTab) {
        case 'dashboard':
          return <NewDashboard />;
        case 'system-test':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-7xl mx-auto">
                <ComprehensiveSystemTest />
              </div>
            </div>
          );
        case 'tools':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-7xl mx-auto">
                <EnhancedTools />
              </div>
            </div>
          );
        case 'fiber-tools':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-7xl mx-auto">
                <FiberOpticTools />
              </div>
            </div>
          );
        case 'network-scanner':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <NetworkScanner />
              </div>
            </div>
          );
        case 'cmd':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <CMD isDeveloper={userMode === 'developer'} />
              </div>
            </div>
          );
        case 'simulation':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <Simulation />
              </div>
            </div>
          );
        case 'ai-assistant':
          return (
            <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-3 sm:p-4 lg:p-6">
              <div className="h-full max-w-5xl mx-auto">
                <AIAssistant />
              </div>
            </div>
          );
        case 'developer':
          if (userMode === 'developer') {
            return (
              <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
                <div className="max-w-7xl mx-auto">
                  <DeveloperMode />
                </div>
              </div>
            );
          }
          return null;
        case 'settings':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <SettingsPage />
              </div>
            </div>
          );
        case 'help':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-6xl mx-auto">
                <EnhancedHelpCenter />
              </div>
            </div>
          );
        case 'license':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <License />
              </div>
            </div>
          );
        case 'security':
          return (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-5xl mx-auto">
                <Card className="p-4 sm:p-6 lg:p-8 text-center shadow-lg">
                  <Shield className="h-16 w-16 mx-auto mb-4 text-green-600" />
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">نظام الأمان المتطور</h2>
                  <p className="text-gray-600 mb-6">حماية شاملة مع مراقبة مستمرة</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-center mb-2">
                        <Shield className="h-5 w-5 text-green-600 ml-2" />
                        <span className="text-green-800 font-medium">جدار الحماية المتقدم</span>
                      </div>
                      <p className="text-green-700 text-sm">✅ نشط مع AI Detection</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-center mb-2">
                        <Scan className="h-5 w-5 text-green-600 ml-2" />
                        <span className="text-green-800 font-medium">فحص التهديدات</span>
                      </div>
                      <p className="text-green-700 text-sm">✅ مراقبة 24/7</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-center mb-2">
                        <Activity className="h-5 w-5 text-blue-600 ml-2" />
                        <span className="text-blue-800 font-medium">تشفير WPA3</span>
                      </div>
                      <p className="text-blue-700 text-sm">🔒 أعلى مستوى أمان</p>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-center mb-2">
                        <Settings className="h-5 w-5 text-yellow-600 ml-2" />
                        <span className="text-yellow-800 font-medium">إعدادات الأمان</span>
                      </div>
                      <p className="text-yellow-700 text-sm">⚡ محدث تلقائياً</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">نقاط الأمان العامة</h3>
                    <div className="text-4xl font-bold text-green-600 mb-2">96/100</div>
                    <p className="text-sm text-gray-600">أمان متطور جداً</p>
                    <Badge className="mt-2 bg-green-100 text-green-700">محمي بالكامل</Badge>
                  </div>
                </Card>
              </div>
            </div>
          );
        default:
          return <NewDashboard />;
      }
    } catch (error) {
      console.error('خطأ في عرض المحتوى:', error);
      return (
        <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md mx-auto">
            <h2 className="text-xl font-bold text-red-600 mb-4">خطأ في التحميل</h2>
            <p className="text-gray-600 mb-4">حدث خطأ أثناء تحميل هذه الصفحة</p>
            <Button onClick={() => onTabChange('dashboard')} className="bg-blue-600 hover:bg-blue-700">
              العودة للرئيسية
            </Button>
          </Card>
        </div>
      );
    }
  };

  return renderContent();
};

export default ContentRenderer;
