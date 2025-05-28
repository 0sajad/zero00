
export class CoreVitalsMonitor {
  private static metrics: Map<string, number> = new Map();
  private static observers: PerformanceObserver[] = [];

  static monitorCoreWebVitals() {
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
    this.observeTTFB();
  }

  private static observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        
        this.metrics.set('LCP', lcp);
        
        if (lcp > 2500) {
          console.warn('⚠️ LCP is slow:', Math.round(lcp), 'ms');
        } else if (lcp <= 1200) {
          console.log('✅ LCP is excellent:', Math.round(lcp), 'ms');
        } else {
          console.log('📊 LCP needs improvement:', Math.round(lcp), 'ms');
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  private static observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const fidEntry = entry as any;
          if (fidEntry.processingStart && fidEntry.startTime) {
            const fid = fidEntry.processingStart - fidEntry.startTime;
            this.metrics.set('FID', fid);
            
            if (fid > 100) {
              console.warn('⚠️ FID is slow:', Math.round(fid), 'ms');
            } else {
              console.log('✅ FID is good:', Math.round(fid), 'ms');
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    }
  }

  private static observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const clsEntry = entry as any;
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value || 0;
          }
        });
        
        this.metrics.set('CLS', clsValue);
        
        if (clsValue > 0.25) {
          console.warn('⚠️ CLS is poor:', clsValue.toFixed(3));
        } else if (clsValue <= 0.1) {
          console.log('✅ CLS is good:', clsValue.toFixed(3));
        } else {
          console.log('📊 CLS needs improvement:', clsValue.toFixed(3));
        }
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  private static observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            const fcp = entry.startTime;
            this.metrics.set('FCP', fcp);
            
            if (fcp > 1800) {
              console.warn('⚠️ FCP is slow:', Math.round(fcp), 'ms');
            } else {
              console.log('✅ FCP is good:', Math.round(fcp), 'ms');
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  private static observeTTFB() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        this.metrics.set('TTFB', ttfb);
        
        if (ttfb > 800) {
          console.warn('⚠️ TTFB is slow:', Math.round(ttfb), 'ms');
        } else {
          console.log('✅ TTFB is good:', Math.round(ttfb), 'ms');
        }
      }
    }
  }

  static getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  static cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}
