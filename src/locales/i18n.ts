
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  ar: {
    translation: {
      // Navigation
      welcome: "مرحباً بكم في OCTA NETWORK",
      subtitle: "نظام الذكاء العالمي لمراقبة الشبكات",
      
      // Features
      networkStatus: "حالة الشبكة",
      online: "متصل",
      offline: "غير متصل",
      speedTest: "اختبار السرعة",
      securityScan: "فحص الأمان",
      deviceScan: "فحص الأجهزة",
      wifiAnalyzer: "محلل الواي فاي",
      quickActions: "الإجراءات السريعة",
      
      // Developer
      developedBy: "تطوير: سجاد كاظم",
      
      // System
      systemStatus: "حالة النظام",
      uptime: "وقت التشغيل",
      performance: "الأداء",
      security: "الأمان",
      
      // Network
      downloadSpeed: "سرعة التحميل",
      uploadSpeed: "سرعة الرفع",
      ping: "زمن الاستجابة",
      quality: "الجودة",
      
      // Status
      excellent: "ممتاز",
      good: "جيد",
      average: "متوسط",
      poor: "ضعيف"
    }
  },
  en: {
    translation: {
      // Navigation
      welcome: "Welcome to OCTA NETWORK",
      subtitle: "Global Intelligence Network Monitoring System",
      
      // Features
      networkStatus: "Network Status",
      online: "Online",
      offline: "Offline",
      speedTest: "Speed Test",
      securityScan: "Security Scan",
      deviceScan: "Device Scan",
      wifiAnalyzer: "WiFi Analyzer",
      quickActions: "Quick Actions",
      
      // Developer
      developedBy: "Developed by: Sajad Kadhim",
      
      // System
      systemStatus: "System Status",
      uptime: "Uptime",
      performance: "Performance",
      security: "Security",
      
      // Network
      downloadSpeed: "Download Speed",
      uploadSpeed: "Upload Speed",
      ping: "Ping",
      quality: "Quality",
      
      // Status
      excellent: "Excellent",
      good: "Good",
      average: "Average",
      poor: "Poor"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
