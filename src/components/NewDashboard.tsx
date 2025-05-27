
import React from 'react';
import SystemStatusCard from './SystemStatusCard';
import QuickActionsCard from './QuickActionsCard';
import LatestUpdatesCard from './LatestUpdatesCard';
import NetworkQualityIndicator from './NetworkQualityIndicator';
import NetworkMonitoringCard from './NetworkMonitoringCard';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Crown, Star, User, Zap, Shield, Globe } from 'lucide-react';

const NewDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Welcome Section with Creator Signature */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-4 sm:p-6 lg:p-8 border border-blue-200 shadow-2xl">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Crown className="h-8 w-8 text-yellow-400 mr-3" />
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  مرحباً بك في OCTA NETWORK
                </h1>
                <Crown className="h-8 w-8 text-yellow-400 ml-3" />
              </div>
              
              <p className="text-sm sm:text-base lg:text-lg text-blue-100 mb-4">
                نظام مراقبة الشبكة المتقدم مع الذكاء الاصطناعي
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <User className="h-5 w-5 text-yellow-400" />
                  <span className="text-white font-semibold">تطوير وتصميم:</span>
                  <span className="text-yellow-300 font-bold text-lg">Sajad Kadhim</span>
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="text-blue-100 text-sm">
                  مطور أنظمة مراقبة الشبكات المتطورة
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge className="bg-green-400 text-black font-medium">
                  <div className="w-2 h-2 bg-green-600 rounded-full ml-2 animate-pulse"></div>
                  جميع الأنظمة تعمل بكفاءة
                </Badge>
                <Badge className="bg-blue-400 text-black font-medium">
                  <Zap className="w-3 h-3 ml-1" />
                  المساعد الذكي نشط
                </Badge>
                <Badge className="bg-purple-400 text-black font-medium">
                  <Shield className="w-3 h-3 ml-1" />
                  حماية متقدمة
                </Badge>
                <Badge className="bg-yellow-400 text-black font-medium">
                  <Globe className="w-3 h-3 ml-1" />
                  إتصال عالمي
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Top Row - Status Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <SystemStatusCard />
          <QuickActionsCard />
          <LatestUpdatesCard />
        </div>

        {/* Bottom Row - Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Network Quality Indicator */}
          <div className="xl:col-span-1 order-2 xl:order-1">
            <NetworkQualityIndicator />
          </div>
          
          {/* Network Monitoring */}
          <div className="xl:col-span-2 order-1 xl:order-2">
            <NetworkMonitoringCard />
          </div>
        </div>

        {/* Quick Stats Bar - Mobile Only */}
        <div className="lg:hidden mt-6">
          <div className="bg-white rounded-lg p-4 shadow-lg border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">إحصائيات سريعة</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="text-lg font-bold text-blue-600">24</div>
                <div className="text-xs text-gray-600">أجهزة متصلة</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="text-lg font-bold text-green-600">99.9%</div>
                <div className="text-xs text-gray-600">وقت التشغيل</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="text-lg font-bold text-purple-600">70 Mbps</div>
                <div className="text-xs text-gray-600">سرعة التنزيل</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="text-lg font-bold text-orange-600">12 ms</div>
                <div className="text-xs text-gray-600">زمن الاستجابة</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics - Desktop Only */}
        <div className="hidden lg:block mt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-lg border border-blue-100 text-center hover:shadow-xl transition-shadow">
              <div className="text-2xl font-bold text-blue-600 mb-1">45.2 Mbps</div>
              <div className="text-sm text-gray-500">متوسط السرعة</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg border border-green-100 text-center hover:shadow-xl transition-shadow">
              <div className="text-2xl font-bold text-green-600 mb-1">99.7%</div>
              <div className="text-sm text-gray-500">موثوقية الشبكة</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg border border-purple-100 text-center hover:shadow-xl transition-shadow">
              <div className="text-2xl font-bold text-purple-600 mb-1">2.1 GB</div>
              <div className="text-sm text-gray-500">استهلاك البيانات</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg border border-orange-100 text-center hover:shadow-xl transition-shadow">
              <div className="text-2xl font-bold text-orange-600 mb-1">15 ms</div>
              <div className="text-sm text-gray-500">زمن الاستجابة</div>
            </div>
          </div>
        </div>

        {/* Developer Signature Footer */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-blue-200 shadow-lg">
            <div className="p-4 text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div className="text-gray-700">
                  <span className="text-sm">نظام متطور من تطوير </span>
                  <span className="font-bold text-blue-600 text-lg">Sajad Kadhim</span>
                </div>
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Badge className="bg-blue-100 text-blue-700">
                  Professional Network Engineer
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  System Architect
                </Badge>
                <Badge className="bg-green-100 text-green-700">
                  Security Specialist
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
