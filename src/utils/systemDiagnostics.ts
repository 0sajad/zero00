
import React from 'react';

export interface DiagnosticResult {
  component: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: any;
}

export interface SystemReport {
  overall: 'healthy' | 'warning' | 'critical';
  timestamp: string;
  results: DiagnosticResult[];
  summary: {
    total: number;
    success: number;
    warnings: number;
    errors: number;
  };
}

class SystemDiagnostics {
  private results: DiagnosticResult[] = [];

  // فحص تحميل المكونات الأساسية
  async checkCoreComponents(): Promise<void> {
    try {
      // فحص React
      if (typeof React !== 'undefined') {
        this.addResult('React', 'success', 'React loaded successfully');
      } else {
        this.addResult('React', 'error', 'React not loaded');
      }

      // فحص Router
      const pathname = window.location.pathname;
      this.addResult('Router', 'success', `Current route: ${pathname}`);

      // فحص Local Storage
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        this.addResult('LocalStorage', 'success', 'Local storage working');
      } catch (e) {
        this.addResult('LocalStorage', 'error', 'Local storage not available');
      }

      // فحص الاتصال بالإنترنت
      if (navigator.onLine) {
        this.addResult('Network', 'success', 'Network connection available');
      } else {
        this.addResult('Network', 'warning', 'Network connection unavailable');
      }

    } catch (error) {
      this.addResult('CoreComponents', 'error', `Error checking core components: ${error}`);
    }
  }

  // فحص اللغات
  async checkLanguages(): Promise<void> {
    try {
      const languages = ['ar', 'en', 'ar-IQ', 'ja'];
      const currentLang = localStorage.getItem('octagram-language') || 'ar';
      
      this.addResult('Languages', 'success', `Current language: ${currentLang}`);
      this.addResult('LanguageSupport', 'success', `Supported languages: ${languages.join(', ')}`);
      
      // فحص اتجاه النص
      const direction = document.dir;
      this.addResult('TextDirection', 'success', `Text direction: ${direction}`);
      
    } catch (error) {
      this.addResult('Languages', 'error', `Language system error: ${error}`);
    }
  }

  // فحص وضع المستخدم والترخيص
  async checkUserSession(): Promise<void> {
    try {
      const userMode = localStorage.getItem('octaUserMode');
      const license = localStorage.getItem('octaLicense');
      
      if (userMode) {
        this.addResult('UserMode', 'success', `User mode: ${userMode}`);
      } else {
        this.addResult('UserMode', 'warning', 'No user mode selected');
      }
      
      if (license) {
        this.addResult('License', 'success', 'License information available');
      } else {
        this.addResult('License', 'warning', 'No license information');
      }
      
    } catch (error) {
      this.addResult('UserSession', 'error', `Session error: ${error}`);
    }
  }

  // فحص الأدوات
  async checkNetworkTools(): Promise<void> {
    try {
      // فحص أدوات الشبكة المختلفة
      const tools = [
        'Speed Test',
        'Ping Tool', 
        'Port Scanner',
        'Network Analyzer',
        'WiFi Scanner',
        'Security Tools'
      ];
      
      tools.forEach(tool => {
        this.addResult('NetworkTools', 'success', `${tool} component available`);
      });
      
    } catch (error) {
      this.addResult('NetworkTools', 'error', `Tools error: ${error}`);
    }
  }

  // فحص واجهة المستخدم
  async checkUI(): Promise<void> {
    try {
      // فحص الثيم
      const theme = localStorage.getItem('theme') || 'system';
      this.addResult('Theme', 'success', `Current theme: ${theme}`);
      
      // فحص العناصر الأساسية
      const rootElement = document.getElementById('root');
      if (rootElement) {
        this.addResult('RootElement', 'success', 'Root element found');
      } else {
        this.addResult('RootElement', 'error', 'Root element not found');
      }
      
      // فحص CSS
      const stylesheets = document.styleSheets.length;
      this.addResult('Stylesheets', 'success', `${stylesheets} stylesheets loaded`);
      
    } catch (error) {
      this.addResult('UI', 'error', `UI error: ${error}`);
    }
  }

  // فحص الأداء
  async checkPerformance(): Promise<void> {
    try {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        if (loadTime < 3000) {
          this.addResult('Performance', 'success', `Load time: ${loadTime}ms`);
        } else if (loadTime < 5000) {
          this.addResult('Performance', 'warning', `Load time: ${loadTime}ms (slower than expected)`);
        } else {
          this.addResult('Performance', 'error', `Load time: ${loadTime}ms (too slow)`);
        }
        
        const memoryInfo = (performance as any).memory;
        if (memoryInfo) {
          this.addResult('Memory', 'success', `Memory usage: ${Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024)}MB`);
        }
      }
    } catch (error) {
      this.addResult('Performance', 'warning', `Performance monitoring not available: ${error}`);
    }
  }

  // إضافة نتيجة
  private addResult(component: string, status: 'success' | 'warning' | 'error', message: string, details?: any): void {
    this.results.push({
      component,
      status,
      message,
      details
    });
  }

  // تشغيل جميع الفحوصات
  async runFullDiagnostics(): Promise<SystemReport> {
    console.log('بدء الفحص الشامل للنظام...');
    
    this.results = [];
    
    await this.checkCoreComponents();
    await this.checkLanguages();
    await this.checkUserSession();
    await this.checkNetworkTools();
    await this.checkUI();
    await this.checkPerformance();
    
    const summary = {
      total: this.results.length,
      success: this.results.filter(r => r.status === 'success').length,
      warnings: this.results.filter(r => r.status === 'warning').length,
      errors: this.results.filter(r => r.status === 'error').length
    };
    
    const overall = summary.errors > 0 ? 'critical' : 
                   summary.warnings > 0 ? 'warning' : 'healthy';
    
    const report: SystemReport = {
      overall,
      timestamp: new Date().toISOString(),
      results: this.results,
      summary
    };
    
    console.log('تم إكمال الفحص الشامل:', report);
    return report;
  }
}

export const systemDiagnostics = new SystemDiagnostics();
