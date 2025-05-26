
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
      systemStatus: 'System Status',
      activeDevices: 'Active Devices',
      securityScore: 'Security Score',
      avgResponse: 'Avg Response',
      recentEvents: 'Recent Events',
      quickActions: 'Quick Actions',
      latestUpdates: 'Latest Updates',
      networkQuality: 'Network Quality',
      networkMonitoring: 'Network Monitoring',
      
      // Status values
      status: 'Status',
      active: 'Active',
      uptime: 'Uptime',
      lastCheck: 'Last Check',
      minutesAgo: 'minutes ago',
      
      // Updates
      securityUpdateAvailable: 'Security update available',
      performanceOptimized: 'Performance optimized',
      
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
      systemStatus: 'حالة النظام',
      activeDevices: 'الأجهزة النشطة',
      securityScore: 'نقاط الأمان',
      avgResponse: 'متوسط الاستجابة',
      recentEvents: 'الأحداث الأخيرة',
      quickActions: 'إجراءات سريعة',
      latestUpdates: 'آخر التحديثات',
      networkQuality: 'جودة الشبكة',
      networkMonitoring: 'مراقبة الشبكة',
      
      // Status values
      status: 'الحالة',
      active: 'نشط',
      uptime: 'وقت التشغيل',
      lastCheck: 'آخر فحص',
      minutesAgo: 'دقائق مضت',
      
      // Updates
      securityUpdateAvailable: 'تحديث أمني متاح',
      performanceOptimized: 'تم تحسين الأداء',
      
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
  },
  ja: {
    translation: {
      // Navigation
      dashboard: 'ダッシュボード',
      aiAssistant: 'AIアシスタント',
      networkScanner: 'ネットワークスキャナー',
      security: 'セキュリティ',
      tools: 'ツール',
      simulation: 'シミュレーション',
      settings: '設定',
      help: 'ヘルプ',
      
      // Dashboard
      welcome: 'OCTA GRAMへようこそ',
      subtitle: '高度なネットワーク監視とAI分析',
      networkStatus: 'ネットワーク状態',
      systemStatus: 'システム状態',
      activeDevices: 'アクティブデバイス',
      securityScore: 'セキュリティスコア',
      avgResponse: '平均応答時間',
      recentEvents: '最近のイベント',
      quickActions: 'クイックアクション',
      latestUpdates: '最新の更新',
      networkQuality: 'ネットワーク品質',
      networkMonitoring: 'ネットワーク監視',
      
      // Status values
      status: 'ステータス',
      active: 'アクティブ',
      uptime: '稼働時間',
      lastCheck: '最終確認',
      minutesAgo: '分前',
      
      // Updates
      securityUpdateAvailable: 'セキュリティアップデート利用可能',
      performanceOptimized: 'パフォーマンス最適化済み',
      
      // AI Assistant
      aiGreeting: 'こんにちは！私はOCTA GRAMのAIアシスタントです。ネットワーク診断、セキュリティ分析、予測インサイトをお手伝いできます。今日はどのようにお手伝いしましょうか？',
      askAnything: 'ネットワークについて何でもお聞きください...',
      
      // Status
      online: 'オンライン',
      offline: 'オフライン',
      warning: '警告',
      
      // Quick Actions
      networkScan: 'ネットワークスキャン',
      securityCheck: 'セキュリティチェック',
      speedTest: 'スピードテスト',
      analyzePerformance: 'ネットワークパフォーマンス分析',
      checkSecurity: 'セキュリティ状態確認',
      predictIssues: 'ネットワーク問題予測',
      optimizeConnection: '接続最適化'
    }
  },
  zh: {
    translation: {
      // Navigation
      dashboard: '仪表板',
      aiAssistant: 'AI助手',
      networkScanner: '网络扫描器',
      security: '安全',
      tools: '工具',
      simulation: '模拟',
      settings: '设置',
      help: '帮助',
      
      // Dashboard
      welcome: '欢迎使用 OCTA GRAM',
      subtitle: '先进的网络监控和AI分析',
      networkStatus: '网络状态',
      systemStatus: '系统状态',
      activeDevices: '活跃设备',
      securityScore: '安全评分',
      avgResponse: '平均响应时间',
      recentEvents: '最近事件',
      quickActions: '快速操作',
      latestUpdates: '最新更新',
      networkQuality: '网络质量',
      networkMonitoring: '网络监控',
      
      // Status values
      status: '状态',
      active: '活跃',
      uptime: '运行时间',
      lastCheck: '最后检查',
      minutesAgo: '分钟前',
      
      // Updates
      securityUpdateAvailable: '安全更新可用',
      performanceOptimized: '性能已优化',
      
      // AI Assistant
      aiGreeting: '您好！我是您的OCTA GRAM AI助手。我可以帮助您进行网络诊断、安全分析和预测性洞察。今天我可以为您做些什么？',
      askAnything: '询问关于您网络的任何问题...',
      
      // Status
      online: '在线',
      offline: '离线',
      warning: '警告',
      
      // Quick Actions
      networkScan: '网络扫描',
      securityCheck: '安全检查',
      speedTest: '速度测试',
      analyzePerformance: '分析网络性能',
      checkSecurity: '检查安全状态',
      predictIssues: '预测网络问题',
      optimizeConnection: '优化连接'
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
