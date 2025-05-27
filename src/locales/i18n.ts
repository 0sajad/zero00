
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources with Iraqi dialect support
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      tools: 'Tools',
      networkScanner: 'Network Scanner',
      security: 'Security',
      aiAssistant: 'AI Assistant',
      simulation: 'Simulation',
      settings: 'Settings',
      help: 'Help Center',
      
      // Dashboard
      welcome: 'Welcome to OCTA NETWORK',
      subtitle: 'Professional Network Monitoring System',
      networkStatus: 'Network Status',
      systemMetrics: 'System Metrics',
      quickActions: 'Quick Actions',
      
      // Status
      online: 'Online',
      offline: 'Offline',
      excellent: 'Excellent',
      good: 'Good',
      average: 'Average',
      poor: 'Poor',
      
      // Tools
      speedTest: 'Speed Test',
      securityScan: 'Security Scan',
      deviceScan: 'Device Scan',
      wifiAnalyzer: 'WiFi Analyzer',
      
      // Developer
      developedBy: 'Developed by Sajad Kadhim'
    }
  },
  ar: {
    translation: {
      // Navigation
      dashboard: 'لوحة التحكم',
      tools: 'الأدوات',
      networkScanner: 'فاحص الشبكة',
      security: 'الأمان',
      aiAssistant: 'المساعد الذكي',
      simulation: 'المحاكاة',
      settings: 'الإعدادات',
      help: 'مركز المساعدة',
      
      // Dashboard
      welcome: 'مرحباً بك في أوكتا نتورك',
      subtitle: 'نظام مراقبة الشبكات الاحترافي',
      networkStatus: 'حالة الشبكة',
      systemMetrics: 'مقاييس النظام',
      quickActions: 'إجراءات سريعة',
      
      // Status
      online: 'متصل',
      offline: 'غير متصل',
      excellent: 'ممتاز',
      good: 'جيد',
      average: 'متوسط',
      poor: 'ضعيف',
      
      // Tools
      speedTest: 'اختبار السرعة',
      securityScan: 'فحص الأمان',
      deviceScan: 'فحص الأجهزة',
      wifiAnalyzer: 'محلل الواي فاي',
      
      // Developer
      developedBy: 'تطوير سجاد كاظم'
    }
  },
  'ar-IQ': {
    translation: {
      // Navigation - Iraqi dialect
      dashboard: 'لوحة التحكم',
      tools: 'الأدوات',
      networkScanner: 'فاحص الشبكة',
      security: 'الأمان',
      aiAssistant: 'المساعد الذكي',
      simulation: 'المحاكاة',
      settings: 'الإعدادات',
      help: 'مركز المساعدة',
      
      // Dashboard - Iraqi dialect
      welcome: 'أهلاً وسهلاً بيك في أوكتا نتورك',
      subtitle: 'نظام مراقبة الشبكات المتطور',
      networkStatus: 'وضعية الشبكة',
      systemMetrics: 'قياسات النظام',
      quickActions: 'أعمال سريعة',
      
      // Status - Iraqi dialect
      online: 'شغال',
      offline: 'مو شغال',
      excellent: 'زين جداً',
      good: 'زين',
      average: 'وسط',
      poor: 'ضعيف',
      
      // Tools - Iraqi dialect
      speedTest: 'فحص السرعة',
      securityScan: 'فحص الأمان',
      deviceScan: 'فحص الأجهزة',
      wifiAnalyzer: 'محلل الواي فاي',
      
      // Developer
      developedBy: 'مصمم من قبل سجاد كاظم'
    }
  },
  ja: {
    translation: {
      // Navigation
      dashboard: 'ダッシュボード',
      tools: 'ツール',
      networkScanner: 'ネットワークスキャナー',
      security: 'セキュリティ',
      aiAssistant: 'AIアシスタント',
      simulation: 'シミュレーション',
      settings: '設定',
      help: 'ヘルプセンター',
      
      // Dashboard
      welcome: 'OCTA NETWORKへようこそ',
      subtitle: 'プロフェッショナルネットワーク監視システム',
      networkStatus: 'ネットワーク状態',
      systemMetrics: 'システムメトリクス',
      quickActions: 'クイックアクション',
      
      // Status
      online: 'オンライン',
      offline: 'オフライン',
      excellent: '優秀',
      good: '良好',
      average: '平均',
      poor: '不良',
      
      // Tools
      speedTest: 'スピードテスト',
      securityScan: 'セキュリティスキャン',
      deviceScan: 'デバイススキャン',
      wifiAnalyzer: 'WiFiアナライザー',
      
      // Developer
      developedBy: 'Sajad Kadhim により開発'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'octagram-language',
      caches: ['localStorage'],
    }
  });

export default i18n;
