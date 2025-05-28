
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UniversalRouter } from './utils/universalRouter';
import { PerformanceMonitor } from './utils/performanceMonitor';
import { ErrorRecovery } from './utils/errorRecovery';
import { SystemValidator } from './utils/systemValidator';
import { DeploymentOptimizer } from './utils/deploymentOptimizer';
import { IntelligentSystem } from './utils/intelligentSystem';
import { ProductionValidator } from './utils/productionValidator';
import { PerformanceOptimizer } from './utils/performanceOptimizer';
import { AssetOptimizer } from './utils/assetOptimizer';
import { WebVitalsMonitor } from './utils/webVitalsMonitor';
import { HTTPSConfig } from './utils/httpsConfig';

// OCTA NETWORK - Universal Intelligence System with Performance Optimization
console.log('🚀 OCTA NETWORK - نظام الذكاء العالمي الشامل مع تحسين الأداء');

class OctaNetworkBootstrap {
  private static isInitialized = false;

  static async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log('⚙️ بدء تهيئة النظام الشامل مع تحسينات الأداء...');
      
      // Enable HTTPS redirect first
      HTTPSConfig.enableHTTPSRedirect();
      
      // Initialize performance optimizers first
      PerformanceOptimizer.initialize();
      AssetOptimizer.initialize();
      WebVitalsMonitor.initialize();
      
      // Initialize all universal systems
      UniversalRouter.initialize();
      PerformanceMonitor.initialize();
      ErrorRecovery.initialize();
      DeploymentOptimizer.initialize();
      IntelligentSystem.initialize();
      
      // Validate system
      const systemValid = await SystemValidator.runComprehensiveTests();
      
      if (systemValid) {
        console.log('✅ النظام محسن وجاهز للعمل على أي منصة');
        
        // Run production validation
        const productionReady = await ProductionValidator.runCompleteProductionValidation();
        if (productionReady) {
          console.log('🎉 Production validation passed - Optimized and ready for deployment');
          console.log(ProductionValidator.generateProductionReport());
        }
        
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

    console.log('🎨 رندر التطبيق الذكي المحسن...');
    
    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    // Post-render optimizations
    this.postRenderOptimizations();
    
    console.log('🎉 تم تحميل OCTA NETWORK بنجاح على جميع المنصات مع تحسينات الأداء!');
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

    // Enable smart features
    this.enableSmartFeatures();
    
    // Generate performance report
    setTimeout(() => {
      console.log('📊 Generating final performance report...');
      const lighthouseReport = PerformanceOptimizer.generateLighthouseReport();
      console.log('🎯 Lighthouse-style Report:', lighthouseReport);
      
      ProductionValidator.runCompleteProductionValidation().then(ready => {
        if (ready) {
          console.log('✅ PRODUCTION READY - All systems operational and optimized');
          console.log('🔒 HTTPS configurations available - Use HTTPSConfig.generateHTTPSConfigurations()');
        }
      });
    }, 2000);
  }

  private static enableSmartFeatures() {
    // Smart image optimization
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.decoding = 'async';
    });

    // Smart link prefetching
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = href;
          document.head.appendChild(prefetchLink);
        }
      }, { once: true });
    });
  }
}

// Auto-start system with multiple triggers
const startSystem = () => OctaNetworkBootstrap.initialize();

// Immediate execution if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startSystem);
} else {
  startSystem();
}

// Fallback triggers
window.addEventListener('load', startSystem);
setTimeout(startSystem, 100);
