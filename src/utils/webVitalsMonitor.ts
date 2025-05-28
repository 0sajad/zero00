
export class WebVitalsMonitor {
  private static metrics: Map<string, number> = new Map();
  private static observers: PerformanceObserver[] = [];

  static initialize() {
    this.monitorCoreWebVitals();
    this.setupPerformanceAPI();
    this.trackUserExperience();
    console.log('📈 Web Vitals Monitor active - Tracking performance metrics');
  }

  private static monitorCoreWebVitals() {
    // Monitor Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // Monitor First Input Delay (FID)
    this.observeFID();
    
    // Monitor Cumulative Layout Shift (CLS)
    this.observeCLS();
    
    // Monitor First Contentful Paint (FCP)
    this.observeFCP();
    
    // Monitor Time to First Byte (TTFB)
    this.observeTTFB();
  }

  private static observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        
        this.metrics.set('LCP', lcp);
        
        // Provide feedback
        if (lcp > 2500) {
          console.warn('⚠️ LCP is slow:', Math.round(lcp), 'ms');
          this.suggestLCPOptimizations();
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
              this.suggestFIDOptimizations();
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
          this.suggestCLSOptimizations();
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

  private static setupPerformanceAPI() {
    // Track resource loading performance
    window.addEventListener('load', () => {
      this.analyzeResourcePerformance();
      this.generatePerformanceReport();
    });

    // Track navigation performance
    this.trackNavigation();
  }

  private static analyzeResourcePerformance() {
    const resources = performance.getEntriesByType('resource');
    let totalSize = 0;
    let slowResources = 0;

    resources.forEach((resource) => {
      const entry = resource as PerformanceResourceTiming;
      if (entry.transferSize) {
        totalSize += entry.transferSize;
      }
      
      if (entry.duration > 1000) {
        slowResources++;
        console.warn('⚠️ Slow resource:', entry.name, Math.round(entry.duration) + 'ms');
      }
    });

    this.metrics.set('totalResourceSize', totalSize);
    this.metrics.set('slowResources', slowResources);

    if (totalSize > 3000000) { // 3MB
      console.warn('⚠️ Large bundle size:', Math.round(totalSize / 1024 / 1024) + 'MB');
    }
  }

  private static trackNavigation() {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.metrics.set('pageVisible', performance.now());
      } else {
        this.metrics.set('pageHidden', performance.now());
      }
    });

    // Track user interactions
    let interactionCount = 0;
    ['click', 'scroll', 'keydown', 'touchstart'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        interactionCount++;
        this.metrics.set('userInteractions', interactionCount);
      }, { passive: true, once: false });
    });
  }

  private static trackUserExperience() {
    // Track scroll behavior
    let scrollDepth = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      scrollDepth = Math.max(scrollDepth, currentScroll);
      this.metrics.set('maxScrollDepth', scrollDepth);
    }, { passive: true });

    // Track time on page
    const startTime = performance.now();
    window.addEventListener('beforeunload', () => {
      const timeOnPage = performance.now() - startTime;
      this.metrics.set('timeOnPage', timeOnPage);
    });
  }

  private static suggestLCPOptimizations() {
    console.log('💡 LCP Optimization suggestions:');
    console.log('  - Optimize images with WebP format');
    console.log('  - Use lazy loading for below-fold content');
    console.log('  - Minimize main thread blocking time');
    console.log('  - Use CDN for faster content delivery');
  }

  private static suggestFIDOptimizations() {
    console.log('💡 FID Optimization suggestions:');
    console.log('  - Break up long-running JavaScript tasks');
    console.log('  - Use web workers for heavy computations');
    console.log('  - Defer non-critical JavaScript');
    console.log('  - Optimize event handlers');
  }

  private static suggestCLSOptimizations() {
    console.log('💡 CLS Optimization suggestions:');
    console.log('  - Add width/height attributes to images');
    console.log('  - Reserve space for dynamic content');
    console.log('  - Avoid inserting content above existing content');
    console.log('  - Use CSS transforms instead of animating layout properties');
  }

  private static generatePerformanceReport() {
    setTimeout(() => {
      const report = {
        coreWebVitals: {
          LCP: this.metrics.get('LCP') || 0,
          FID: this.metrics.get('FID') || 0,
          CLS: this.metrics.get('CLS') || 0,
          FCP: this.metrics.get('FCP') || 0,
          TTFB: this.metrics.get('TTFB') || 0
        },
        performance: {
          totalResourceSize: this.metrics.get('totalResourceSize') || 0,
          slowResources: this.metrics.get('slowResources') || 0,
          userInteractions: this.metrics.get('userInteractions') || 0,
          maxScrollDepth: this.metrics.get('maxScrollDepth') || 0
        },
        score: this.calculateOverallScore()
      };

      console.log('📊 Performance Report:', report);
      this.displayPerformanceScore(report.score);
    }, 3000);
  }

  private static calculateOverallScore(): number {
    let score = 100;
    
    const lcp = this.metrics.get('LCP') || 0;
    const fid = this.metrics.get('FID') || 0;
    const cls = this.metrics.get('CLS') || 0;
    
    // LCP scoring
    if (lcp > 4000) score -= 30;
    else if (lcp > 2500) score -= 15;
    
    // FID scoring
    if (fid > 300) score -= 20;
    else if (fid > 100) score -= 10;
    
    // CLS scoring
    if (cls > 0.25) score -= 25;
    else if (cls > 0.1) score -= 10;
    
    return Math.max(score, 0);
  }

  private static displayPerformanceScore(score: number) {
    let grade = 'A';
    if (score < 90) grade = 'B';
    if (score < 75) grade = 'C';
    if (score < 60) grade = 'D';
    if (score < 40) grade = 'F';
    
    console.log(`🎯 Performance Grade: ${grade} (${score}/100)`);
    
    if (score >= 90) {
      console.log('🎉 Excellent performance! Your site is optimized.');
    } else if (score >= 75) {
      console.log('👍 Good performance with room for improvement.');
    } else {
      console.log('⚠️ Performance needs optimization.');
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
