
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      aiAssistant: 'AI Assistant',
      networkScanner: 'Network Scanner',
      security: 'Security',
      tools: 'Tools',
      simulation: 'Simulation',
      settings: 'Settings',
      help: 'Help',
      
      // Dashboard
      welcome: 'Welcome to OCTA GRAM',
      subtitle: 'Advanced Network Monitoring & AI-Powered Analytics',
      networkStatus: 'Network Status',
      activeDevices: 'Active Devices',
      securityScore: 'Security Score',
      avgResponse: 'Avg Response',
      recentEvents: 'Recent Events',
      quickActions: 'Quick Actions',
      
      // AI Assistant
      aiGreeting: 'Hello! I\'m your OCTA GRAM AI Assistant. I can help you with network diagnostics, security analysis, and predictive insights. How can I assist you today?',
      askAnything: 'Ask me anything about your network...',
      
      // Status
      online: 'Online',
      offline: 'Offline',
      warning: 'Warning',
      
      // Quick Actions
      networkScan: 'Network Scan',
      securityCheck: 'Security Check',
      speedTest: 'Speed Test',
      analyzePerformance: 'Analyze network performance',
      checkSecurity: 'Check security status',
      predictIssues: 'Predict network issues',
      optimizeConnection: 'Optimize connection'
    }
  },
  ar: {
    translation: {
      // Navigation
      dashboard: 'لوحة التحكم',
      aiAssistant: 'المساعد الذكي',
      networkScanner: 'فاحص الشبكة',
      security: 'الأمان',
      tools: 'الأدوات',
      simulation: 'المحاكاة',
      settings: 'الإعدادات',
      help: 'المساعدة',
      
      // Dashboard
      welcome: 'مرحباً بك في أوكتا جرام',
      subtitle: 'مراقبة الشبكات المتقدمة والتحليلات المدعومة بالذكاء الاصطناعي',
      networkStatus: 'حالة الشبكة',
      activeDevices: 'الأجهزة النشطة',
      securityScore: 'نقاط الأمان',
      avgResponse: 'متوسط الاستجابة',
      recentEvents: 'الأحداث الأخيرة',
      quickActions: 'إجراءات سريعة',
      
      // AI Assistant
      aiGreeting: 'مرحباً! أنا مساعدك الذكي في أوكتا جرام. يمكنني مساعدتك في تشخيص الشبكة وتحليل الأمان والرؤى التنبؤية. كيف يمكنني مساعدتك اليوم؟',
      askAnything: 'اسألني أي شيء عن شبكتك...',
      
      // Status
      online: 'متصل',
      offline: 'غير متصل',
      warning: 'تحذير',
      
      // Quick Actions
      networkScan: 'فحص الشبكة',
      securityCheck: 'فحص الأمان',
      speedTest: 'اختبار السرعة',
      analyzePerformance: 'تحليل أداء الشبكة',
      checkSecurity: 'فحص حالة الأمان',
      predictIssues: 'التنبؤ بمشاكل الشبكة',
      optimizeConnection: 'تحسين الاتصال'
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
