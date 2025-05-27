
import React from 'react';
import SystemStatusCard from './SystemStatusCard';
import QuickActionsCard from './QuickActionsCard';
import LatestUpdatesCard from './LatestUpdatesCard';
import NetworkQualityIndicator from './NetworkQualityIndicator';
import NetworkMonitoringCard from './NetworkMonitoringCard';

const NewDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 lg:p-8 border border-blue-100">
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                مرحباً بك في OCTA NETWORK
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4">
                نظام مراقبة الشبكة المتقدم مع الذكاء الاصطناعي
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
                  جميع الأنظمة تعمل بكفاءة
                </div>
                <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                  المساعد الذكي نشط
                </div>
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
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">إحصائيات سريعة</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">24</div>
                <div className="text-xs text-gray-500">أجهزة متصلة</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">99.9%</div>
                <div className="text-xs text-gray-500">وقت التشغيل</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">70 Mbps</div>
                <div className="text-xs text-gray-500">سرعة التنزيل</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">12 ms</div>
                <div className="text-xs text-gray-500">زمن الاستجابة</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics - Desktop Only */}
        <div className="hidden lg:block mt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">45.2 Mbps</div>
              <div className="text-sm text-gray-500">متوسط السرعة</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">99.7%</div>
              <div className="text-sm text-gray-500">موثوقية الشبكة</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">2.1 GB</div>
              <div className="text-sm text-gray-500">استهلاك البيانات</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">15 ms</div>
              <div className="text-sm text-gray-500">زمن الاستجابة</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
