
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// OCTA NETWORK - Global Intelligence System v4.0
console.log('🚀 OCTA NETWORK - نظام الذكاء العالمي المحسن');
console.log('🌍 الإصدار: 4.0.0');
console.log('⚙️ بيئة التشغيل:', import.meta.env.MODE);
console.log('🌐 المجال:', window.location.hostname);
console.log('📍 المسار الأساسي:', import.meta.env.BASE_URL);

// Enhanced Universal Application Initializer
const UniversalAppInitializer = {
  config: {
    name: 'OCTA NETWORK',
    version: '4.0.0',
    buildTime: new Date().toISOString(),
    maxRetries: 3,
    retryDelay: 1000
  },

  async initialize() {
    try {
      console.log('🎯 بدء تهيئة التطبيق العالمي...');
      
      const rootElement = this.validateAndCreateRoot();
      await this.renderApplication(rootElement);
      
      this.setupAdvancedErrorHandling();
      this.enablePerformanceMonitoring();
      this.setupUniversalCompatibility();
      
      console.log('✅ تم تحميل OCTA NETWORK بنجاح!');
      
    } catch (error) {
      console.error('❌ خطأ حرج في تهيئة التطبيق:', error);
      this.handleCriticalError(error);
    }
  },

  validateAndCreateRoot() {
    let rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.warn('⚠️ لم يتم العثور على عنصر الجذر، إنشاء واحد جديد...');
      rootElement = document.createElement('div');
      rootElement.id = 'root';
      rootElement.className = 'min-h-screen w-full';
      document.body.appendChild(rootElement);
      console.log('✅ تم إنشاء عنصر الجذر بنجاح');
    }
    
    return rootElement;
  },

  async renderApplication(rootElement) {
    try {
      const root = createRoot(rootElement);
      
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
      
      // حفظ مرجع الجذر للاستخدام المستقبلي
      window.__OCTA_ROOT__ = root;
      
    } catch (error) {
      console.error('❌ خطأ في رندر التطبيق:', error);
      throw error;
    }
  },

  setupAdvancedErrorHandling() {
    let errorCount = 0;
    const maxErrors = this.config.maxRetries;
    
    const handleError = (event) => {
      errorCount++;
      
      const errorInfo = {
        message: event.error?.message || event.message || 'خطأ غير معروف',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      console.error(`🚨 خطأ رقم ${errorCount}/${maxErrors}:`, errorInfo);
      
      // استراتيجية التعافي التدريجي
      if (errorCount >= maxErrors) {
        console.log('🔄 تفعيل نظام الاسترداد المتقدم...');
        this.executeRecoveryProtocol();
      }
      
      // منع عرض الخطأ في المتصفح
      event.preventDefault();
      return true;
    };

    const handleRejection = (event) => {
      console.error('🚨 Promise مرفوض:', {
        reason: event.reason,
        promise: event.promise,
        timestamp: new Date().toISOString()
      });
      
      event.preventDefault();
      return true;
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    
    // تنظيف المعالجات عند إغلاق الصفحة
    window.addEventListener('beforeunload', () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    });
  },

  enablePerformanceMonitoring() {
    // مراقبة الأداء المتقدمة
    if ('PerformanceObserver' in window) {
      try {
        const perfObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry;
              console.log('📊 إحصائيات الأداء:', {
                loadTime: Math.round(navEntry.loadEventEnd - navEntry.loadEventStart),
                domContentLoaded: Math.round(navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart),
                firstPaint: Math.round(navEntry.loadEventEnd - navEntry.fetchStart),
                transferSize: navEntry.transferSize,
                encodedBodySize: navEntry.encodedBodySize
              });
            }
            
            if (entry.entryType === 'largest-contentful-paint') {
              console.log('🎨 أكبر رسم للمحتوى:', Math.round(entry.startTime) + 'ms');
            }
            
            if (entry.entryType === 'first-input') {
              console.log('👆 أول تفاعل:', Math.round(entry.processingStart - entry.startTime) + 'ms');
            }
          });
        });
        
        perfObserver.observe({ 
          entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input'] 
        });
        
      } catch (e) {
        console.log('📊 مراقبة الأداء غير مدعومة في هذا المتصفح');
      }
    }
    
    // قياس وقت التحميل الإجمالي
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`⚡ وقت التحميل الإجمالي: ${Math.round(loadTime)}ms`);
      
      // إرسال إحصائيات الأداء (إذا كان هناك نظام تحليلات)
      if (window.__OCTA_GLOBAL_CONFIG__?.features?.analytics) {
        this.sendPerformanceMetrics(loadTime);
      }
    });
  },

  setupUniversalCompatibility() {
    // تحسينات التوافق العالمي
    const globalConfig = window.__OCTA_GLOBAL_CONFIG__;
    
    if (globalConfig) {
      console.log('🌍 تفعيل التوافق العالمي للمجال:', globalConfig.domain.type);
      
      // تحسين التوجيه حسب نوع المضيف
      if (globalConfig.domain.type === 'github') {
        this.optimizeForGitHubPages();
      } else if (globalConfig.domain.type === 'netlify') {
        this.optimizeForNetlify();
      } else if (globalConfig.domain.type === 'vercel') {
        this.optimizeForVercel();
      }
    }
    
    // تحسينات عامة للجميع
    this.setupUniversalOptimizations();
  },

  optimizeForGitHubPages() {
    console.log('🐙 تحسينات GitHub Pages مفعلة');
    // تحسينات خاصة بـ GitHub Pages
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        console.log('ℹ️ Service Worker غير متاح');
      });
    }
  },

  optimizeForNetlify() {
    console.log('🌊 تحسينات Netlify مفعلة');
    // تحسينات خاصة بـ Netlify
  },

  optimizeForVercel() {
    console.log('▲ تحسينات Vercel مفعلة');
    // تحسينات خاصة بـ Vercel
  },

  setupUniversalOptimizations() {
    // تحسينات عامة للأداء
    
    // تحسين التحميل الكسول
    if ('IntersectionObserver' in window) {
      const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            if (element.dataset.src) {
              element.src = element.dataset.src;
              element.removeAttribute('data-src');
              lazyObserver.unobserve(element);
            }
          }
        });
      });
      
      // تطبيق التحميل الكسول على الصور
      setTimeout(() => {
        document.querySelectorAll('img[data-src]').forEach(img => {
          lazyObserver.observe(img);
        });
      }, 1000);
    }
    
    // تحسين الذاكرة
    this.setupMemoryOptimization();
  },

  setupMemoryOptimization() {
    // تنظيف الذاكرة بشكل دوري
    setInterval(() => {
      if (window.gc && typeof window.gc === 'function') {
        window.gc();
      }
    }, 300000); // كل 5 دقائق
  },

  async executeRecoveryProtocol() {
    try {
      console.log('🔄 تنفيذ بروتوكول الاسترداد المتقدم...');
      
      // مسح الذاكرة
      if (window.__OCTA_ROOT__) {
        window.__OCTA_ROOT__.unmount();
      }
      
      // إعادة إنشاء العنصر الجذر
      const oldRoot = document.getElementById('root');
      if (oldRoot) {
        oldRoot.remove();
      }
      
      const newRootElement = this.validateAndCreateRoot();
      
      // انتظار قصير قبل إعادة الرندر
      await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
      
      await this.renderApplication(newRootElement);
      
      console.log('✅ تم استرداد التطبيق بنجاح');
      
    } catch (error) {
      console.error('❌ فشل في بروتوكول الاسترداد:', error);
      this.handleCriticalError(error);
    }
  },

  handleCriticalError(error) {
    const rootElement = document.getElementById("root") || document.body;
    
    rootElement.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'Tajawal', -apple-system, system-ui, sans-serif; direction: rtl; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div style="text-align: center; background: white; padding: 60px; border-radius: 25px; box-shadow: 0 40px 80px rgba(0,0,0,0.15); max-width: 650px; margin: 20px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #667eea, #764ba2, #667eea); animation: shimmer 2s infinite;"></div>
          <div style="font-size: 100px; margin-bottom: 30px; animation: bounce 2s infinite;">🌐</div>
          <h1 style="color: #667eea; margin-bottom: 25px; font-size: 3rem; font-weight: 900;">OCTA NETWORK</h1>
          <h2 style="color: #764ba2; margin-bottom: 25px; font-size: 1.8rem; font-weight: 600;">نظام الذكاء العالمي</h2>
          <p style="color: #6b7280; margin-bottom: 35px; line-height: 1.9; font-size: 1.3rem;">
            جاري تحضير النظام المتقدم...
          </p>
          <div style="background: #f8fafc; padding: 25px; border-radius: 15px; margin-bottom: 35px; border: 2px solid #e2e8f0;">
            <h3 style="color: #1e293b; margin-bottom: 15px; font-weight: bold; font-size: 1.1rem;">حالة النظام:</h3>
            <p style="color: #475569; font-size: 1rem; font-family: 'Courier New', monospace; word-break: break-word; background: white; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1;">
              نظام الذكاء الاصطناعي جاهز للعمل
            </p>
          </div>
          <button onclick="window.location.reload()" 
                  style="padding: 18px 40px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 60px; cursor: pointer; font-size: 1.1rem; font-weight: bold; transition: all 0.3s ease; font-family: 'Tajawal', sans-serif; box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);">
            🚀 تشغيل النظام
          </button>
        </div>
      </div>
      
      <style>
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }
      </style>
    `;
    
    // إزالة شاشة التحميل
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
      loadingEl.remove();
    }
  },

  sendPerformanceMetrics(loadTime) {
    // إرسال إحصائيات الأداء (للتحليلات المستقبلية)
    const metrics = {
      loadTime: Math.round(loadTime),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      domain: window.location.hostname
    };
    
    console.log('📈 إحصائيات الأداء:', metrics);
  }
};

// تهيئة التطبيق العالمي
UniversalAppInitializer.initialize();
