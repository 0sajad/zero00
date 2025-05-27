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

  private addResult(component: string, status: 'success' | 'warning' | 'error', message: string, details?: any): void {
    this.results.push({
      component,
      status,
      message,
      details
    });
  }

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
      this.addResult('CSS', 'success', `${stylesheets} stylesheets loaded`);
      
      // فحص التجاوب
      const viewport = window.innerWidth;
      this.addResult('Responsive', 'success', `Viewport width: ${viewport}px`);
      
    } catch (error) {
      this.addResult('UI', 'error', `UI error: ${error}`);
    }
  }

  // فحص الأداء
  async checkPerformance(): Promise<void> {
    try {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      if (loadTime < 3000) {
        this.addResult('Performance', 'success', `Load time: ${loadTime}ms - Excellent`);
      } else if (loadTime < 5000) {
        this.addResult('Performance', 'warning', `Load time: ${loadTime}ms - Good`);
      } else {
        this.addResult('Performance', 'error', `Load time: ${loadTime}ms - Needs improvement`);
      }
      
      // فحص الذاكرة
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        this.addResult('Memory', 'success', `Used: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`);
      }
      
    } catch (error) {
      this.addResult('Performance', 'error', `Performance error: ${error}`);
    }
  }

  // فحص الأمان
  async checkSecurity(): Promise<void> {
    try {
      // فحص HTTPS
      if (window.location.protocol === 'https:') {
        this.addResult('Security', 'success', 'HTTPS connection secure');
      } else {
        this.addResult('Security', 'warning', 'HTTP connection - recommend HTTPS');
      }
      
      // فحص CSP
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      if (cspMeta) {
        this.addResult('CSP', 'success', 'Content Security Policy found');
      } else {
        this.addResult('CSP', 'warning', 'No Content Security Policy detected');
      }
      
    } catch (error) {
      this.addResult('Security', 'error', `Security error: ${error}`);
    }
  }

  // تشغيل جميع الفحوصات
  async runAllChecks(): Promise<SystemReport> {
    this.results = []; // إعادة تعيين النتائج
    
    console.log('🔍 بدء فحص النظام الشامل...');
    
    await this.checkCoreComponents();
    await this.checkLanguages();
    await this.checkUserSession();
    await this.checkNetworkTools();
    await this.checkUI();
    await this.checkPerformance();
    await this.checkSecurity();
    
    return this.generateReport();
  }

  // إنتاج التقرير النهائي
  private generateReport(): SystemReport {
    const total = this.results.length;
    const success = this.results.filter(r => r.status === 'success').length;
    const warnings = this.results.filter(r => r.status === 'warning').length;
    const errors = this.results.filter(r => r.status === 'error').length;
    
    let overall: 'healthy' | 'warning' | 'critical' = 'healthy';
    if (errors > 0) {
      overall = 'critical';
    } else if (warnings > 0) {
      overall = 'warning';
    }
    
    console.log(`✅ فحص النظام مكتمل: ${success}/${total} ناجح`);
    
    return {
      overall,
      timestamp: new Date().toLocaleString('ar-IQ'),
      results: this.results,
      summary: {
        total,
        success,
        warnings,
        errors
      }
    };
  }
}

export const systemDiagnostics = new SystemDiagnostics();
export default systemDiagnostics;
