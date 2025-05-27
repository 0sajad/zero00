
import React from 'react';
import Header from '../Header';
import NewDashboard from '../NewDashboard';

interface DashboardLayoutProps {
  onNavigate: (tabId: string) => void;
}

export const DashboardLayout = ({ onNavigate }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background w-full">
      <Header onNavigate={onNavigate} />
      <NewDashboard />
    </div>
  );
};
