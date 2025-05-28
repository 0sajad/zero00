
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UniversalRouter } from './utils/universalRouter';
import { PerformanceMonitor } from './utils/performanceMonitor';
import { ErrorRecovery } from './utils/errorRecovery';
import { SystemValidator } from './utils/systemValidator';

// OCTA NETWORK - Universal Intelligence System
console.log('🚀 OCTA NETWORK - نظام الذكاء العالمي الشامل');

class OctaNetworkBootstrap {
  private static isInitialized = false;

  static async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log('⚙️ بدء تهيئة النظام الشامل...');
      
      // Initialize universal systems
      UniversalRouter.initialize();
      PerformanceMonitor.initialize();
      ErrorRecovery.initialize();
      
      // Validate system
      const systemValid = await SystemValidator.runComprehensiveTests();
      
      if (systemValid) {
        console.log('✅ النظام جاهز للعمل على أي منصة');
        await this.renderApplication();
      } else {
        console.warn('⚠️ تم اكتشاف مشاكل في النظام، جاري الإصلاح...');
        await this.attemptRecovery();
      }
      
      this.isInitialized = true;
      
    } catch (error) {
      console.error('❌ خطأ في تهيئة النظام:', error);
      ErrorRecovery.showEmergencyInterface();
    }
  }

  private static async renderApplication() {
    const rootElement = this.validateRootElement();
    
    if (!rootElement) {
      throw new Error('Failed to create root element');
    }

    console.log('🎨 رندر التطبيق الذكي...');
    
    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    // Post-render optimizations
    this.postRenderOptimizations();
    
    console.log('🎉 تم تحميل OCTA NETWORK بنجاح على جميع المنصات!');
  }

  private static validateRootElement(): HTMLElement {
    let rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.log('🔧 إنشاء عنصر الجذر...');
      rootElement = document.createElement('div');
      rootElement.id = 'root';
      rootElement.style.cssText = 'min-height: 100vh; width: 100%;';
      document.body.appendChild(rootElement);
    }
    
    return rootElement;
  }

  private static async attemptRecovery() {
    console.log('🔄 محاولة إصلاح النظام...');
    
    // Clear potential conflicts
    const scripts = document.querySelectorAll('script[src*="main"]');
    scripts.forEach(script => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });

    // Retry after cleanup
    setTimeout(() => {
      this.renderApplication();
    }, 1000);
  }

  private static postRenderOptimizations() {
    // Service Worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(error => {
        console.log('Service Worker registration failed:', error);
      });
    }

    // Preload critical resources
    const criticalResources = [
      '/src/App.tsx',
      '/src/index.css'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = UniversalRouter.createPath(resource);
      link.as = resource.endsWith('.css') ? 'style' : 'script';
      document.head.appendChild(link);
    });

    // Remove loading screen
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      setTimeout(() => {
        loadingElement.style.opacity = '0';
        loadingElement.style.transition = 'opacity 0.5s ease';
        setTimeout(() => loadingElement.remove(), 500);
      }, 1000);
    }
  }
}

// Auto-start system
document.addEventListener('DOMContentLoaded', () => {
  OctaNetworkBootstrap.initialize();
});

// Fallback for immediate execution
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    OctaNetworkBootstrap.initialize();
  });
} else {
  OctaNetworkBootstrap.initialize();
}
