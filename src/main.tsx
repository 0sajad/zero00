
import "./index.css";
import { SystemInitializer } from './utils/bootstrap/systemInitializer';
import { AppRenderer } from './utils/bootstrap/appRenderer';
import { ErrorRecovery } from './utils/errorRecovery';

console.log('🚀 OCTA NETWORK - نظام الذكاء العالمي الشامل مع تحسين الأداء');

class OctaNetworkBootstrap {
  private static isInitialized = false;

  static async initialize() {
    if (this.isInitialized) return;
    
    try {
      const systemReady = await SystemInitializer.initializeAllSystems();
      
      if (systemReady) {
        await AppRenderer.renderApplication();
      } else {
        await this.attemptRecovery();
      }
      
      this.isInitialized = true;
      
    } catch (error) {
      console.error('❌ خطأ في تهيئة النظام:', error);
      ErrorRecovery.showEmergencyInterface();
    }
  }

  private static async attemptRecovery() {
    console.log('🔄 محاولة إصلاح النظام...');
    
    const scripts = document.querySelectorAll('script[src*="main"]');
    scripts.forEach(script => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });

    setTimeout(() => {
      AppRenderer.renderApplication();
    }, 1000);
  }
}

const startSystem = () => OctaNetworkBootstrap.initialize();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startSystem);
} else {
  startSystem();
}

window.addEventListener('load', startSystem);
setTimeout(startSystem, 100);
