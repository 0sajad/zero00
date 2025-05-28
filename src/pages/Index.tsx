
import React, { useState, useEffect } from 'react';
import { audioSystem } from '@/utils/audioSystem';
import { useToast } from '@/hooks/use-toast';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import SystemStatusSection from '@/components/home/SystemStatusSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import FooterSection from '@/components/home/FooterSection';
import LoadingScreen from '@/components/home/LoadingScreen';

const Index = () => {
  const { toast } = useToast();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeSystem = async () => {
      await audioSystem.playSound('startup');
      
      setTimeout(() => {
        setIsInitializing(false);
        toast({
          title: "🚀 مرحباً بك في OCTA NETWORK",
          description: "النظام الأكثر تقدماً في العالم لمراقبة وتأمين الشبكات",
        });
      }, 2000);
    };

    initializeSystem();
  }, [toast]);

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <HeroSection />
      <FeaturesSection />
      <SystemStatusSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};

export default Index;
