
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// OCTA NETWORK - Global Intelligence System
console.log('🚀 OCTA NETWORK - نظام الذكاء العالمي');
console.log('⚙️ بيئة التشغيل:', import.meta.env.MODE);
console.log('🌐 المجال:', window.location.hostname);
console.log('🔧 التكوين الذكي:', window.__OCTA_CONFIG__);

// Enhanced Smart Root Validation
const SmartInitializer = {
  validateEnvironment() {
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error('❌ خطأ حرج: لم يتم العثور على عنصر الجذر');
      this.createEmergencyRoot();
      throw new Error("Root element not found - Emergency root created");
    }
    
    console.log('✅ تم العثور على عنصر الجذر، بدء النظام الذكي...');
    return rootElement;
  },
  
  createEmergencyRoot() {
    const emergencyRoot = document.createElement('div');
    emergencyRoot.id = 'root';
    emergencyRoot.style.cssText = 'min-height: 100vh; width: 100%;';
    document.body.appendChild(emergencyRoot);
    console.log('🆘 تم إنشاء عنصر جذر طارئ');
  },
  
  async renderApplication() {
    try {
      const rootElement = this.validateEnvironment();
      
      console.log('🎨 بدء رندر التطبيق الذكي...');
      
      const root = createRoot(rootElement);
      
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
      
      console.log('🎉 تم تحميل OCTA NETWORK بنجاح!');
      
      // Advanced performance monitoring
      this.monitorPerformance();
      
      // Smart error recovery
      this.setupErrorRecovery(root, rootElement);
      
    } catch (error) {
      console.error('❌ خطأ حرج في رندر التطبيق:', error);
      this.handleCriticalError(error);
    }
  },
  
  monitorPerformance() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log('📊 إحصائيات التنقل:', {
              loadTime: Math.round(navEntry.loadEventEnd - navEntry.loadEventStart),
              domContentLoaded: Math.round(navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart),
              firstPaint: Math.round(navEntry.loadEventEnd - navEntry.fetchStart)
            });
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['navigation', 'paint'] });
      } catch (e) {
        console.log('Performance monitoring not supported');
      }
    }
  },
  
  setupErrorRecovery(root, rootElement) {
    let errorCount = 0;
    const maxErrors = 3;
    
    window.addEventListener('error', (event) => {
      errorCount++;
      console.error(`🚨 خطأ رقم ${errorCount}:`, event.error);
      
      if (errorCount >= maxErrors) {
        console.log('🔄 تفعيل نظام الاسترداد الذكي...');
        this.recoverApplication(root, rootElement);
      }
    });
  },
  
  recoverApplication(root, rootElement) {
    try {
      root.unmount();
      setTimeout(() => {
        const newRoot = createRoot(rootElement);
        newRoot.render(
          <StrictMode>
            <App />
          </StrictMode>
        );
        console.log('✅ تم استرداد التطبيق بنجاح');
      }, 1000);
    } catch (error) {
      console.error('❌ فشل في استرداد التطبيق:', error);
      this.handleCriticalError(error);
    }
  },
  
  handleCriticalError(error) {
    const rootElement = document.getElementById("root") || document.body;
    
    rootElement.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'Cairo', -apple-system, system-ui, sans-serif; direction: rtl; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div style="text-align: center; background: white; padding: 50px; border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,0.2); max-width: 600px; margin: 20px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, #667eea, #764ba2, #667eea); animation: rainbow 3s linear infinite;"></div>
          <div style="font-size: 80px; margin-bottom: 30px; animation: pulse 2s infinite;">🌐</div>
          <h1 style="color: #667eea; margin-bottom: 20px; font-size: 2.5rem; font-weight: 800;">OCTA NETWORK</h1>
          <h2 style="color: #764ba2; margin-bottom: 20px; font-size: 1.5rem;">نظام الذكاء العالمي</h2>
          <p style="color: #6b7280; margin-bottom: 30px; line-height: 1.8; font-size: 1.2rem;">
            حدث خطأ مؤقت في النظام. سيتم تفعيل نظام الاسترداد الذكي.
          </p>
          <div style="background: #fef2f2; padding: 20px; border-radius: 10px; margin-bottom: 30px; border-left: 4px solid #ef4444;">
            <h3 style="color: #dc2626; margin-bottom: 10px; font-weight: bold;">تفاصيل النظام:</h3>
            <p style="color: #7f1d1d; font-size: 0.9rem; font-family: monospace; word-break: break-word;">
              ${error?.message || 'استرداد تلقائي للنظام'}
            </p>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <button onclick="window.location.reload()" 
                    style="padding: 15px 20px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 50px; cursor: pointer; font-size: 1rem; font-weight: bold; transition: all 0.3s ease; font-family: 'Cairo', sans-serif;">
              🔄 إعادة تحميل ذكية
            </button>
            <button onclick="localStorage.clear(); sessionStorage.clear(); window.location.reload();" 
                    style="padding: 15px 20px; background: linear-gradient(135deg, #6b7280, #4b5563); color: white; border: none; border-radius: 50px; cursor: pointer; font-size: 1rem; font-weight: bold; transition: all 0.3s ease; font-family: 'Cairo', sans-serif;">
              🧹 تنظيف شامل
            </button>
          </div>
          <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 10px; text-align: right;">
            <h4 style="color: #374151; margin-bottom: 10px; font-weight: bold;">معلومات النظام الذكي:</h4>
            <p style="color: #6b7280; font-size: 0.9rem; margin: 5px 0;">المجال: ${window.location.hostname}</p>
            <p style="color: #6b7280; font-size: 0.9rem; margin: 5px 0;">المتصفح: ${navigator.userAgent.split(' ')[0]}</p>
            <p style="color: #6b7280; font-size: 0.9rem; margin: 5px 0;">الوقت: ${new Date().toLocaleString('ar-SA')}</p>
          </div>
        </div>
      </div>
      <style>
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      </style>
    `;
  }
};

// Global error handlers with smart recovery
window.addEventListener('error', (event) => {
  console.error('🚨 خطأ عام في النظام:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Promise مرفوض:', event.reason);
  event.preventDefault();
});

// Initialize OCTA NETWORK Intelligent System
SmartInitializer.renderApplication();
