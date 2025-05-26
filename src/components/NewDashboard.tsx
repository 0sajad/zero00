
import React from 'react';
import Header from './Header';
import SystemStatusCard from './SystemStatusCard';
import QuickActionsCard from './QuickActionsCard';
import LatestUpdatesCard from './LatestUpdatesCard';
import NetworkQualityIndicator from './NetworkQualityIndicator';
import NetworkMonitoringCard from './NetworkMonitoringCard';

const NewDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Top Row - Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <SystemStatusCard />
          <QuickActionsCard />
          <LatestUpdatesCard />
        </div>

        {/* Bottom Row - Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Network Quality Indicator */}
          <div className="xl:col-span-1">
            <NetworkQualityIndicator />
          </div>
          
          {/* Network Monitoring */}
          <div className="xl:col-span-2">
            <NetworkMonitoringCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
