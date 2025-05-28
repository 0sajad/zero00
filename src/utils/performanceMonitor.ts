
import { UniversalRouter } from './universalRouter';

export class PerformanceMonitor {
  private static metrics: Map<string, number> = new Map();
  private static observer: PerformanceObserver | null = null;

  static initialize() {
    this.monitorWebVitals();
    this.monitorResourceLoading();
    this.monitorUserInteractions();
    console.log('📊 Performance Monitor initialized');
  }

  private static monitorWebVitals() {
    if ('PerformanceObserver' in window) {
      try {
        this.observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              this.metrics.set('domContentLoaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart);
              this.metrics.set('loadComplete', navEntry.loadEventEnd - navEntry.loadEventStart);
              this.metrics.set('totalLoadTime', navEntry.loadEventEnd - navEntry.fetchStart);
            }
            
            if (entry.entryType === 'paint') {
              this.metrics.set(entry.name, entry.startTime);
            }
          });
          
          this.logMetrics();
        });
        
        this.observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
      } catch (error) {
        console.log('Performance Observer not fully supported');
      }
    }
  }

  private static monitorResourceLoading() {
    const resources = performance.getEntriesByType('resource');
    let totalSize = 0;
    let slowResources = 0;

    resources.forEach((resource) => {
      const resourceEntry = resource as PerformanceResourceTiming;
      if (resourceEntry.transferSize) {
        totalSize += resourceEntry.transferSize;
      }
      if (resourceEntry.duration > 1000) {
        slowResources++;
      }
    });

    this.metrics.set('totalResourceSize', totalSize);
    this.metrics.set('slowResources', slowResources);
  }

  private static monitorUserInteractions() {
    let interactionCount = 0;
    
    ['click', 'scroll', 'keydown'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        interactionCount++;
        this.metrics.set('userInteractions', interactionCount);
      }, { passive: true });
    });
  }

  private static logMetrics() {
    const metricsObj = Object.fromEntries(this.metrics);
    console.log('📈 Performance Metrics:', metricsObj);
    
    // Auto-optimize based on metrics
    if (this.metrics.get('totalLoadTime')! > 3000) {
      console.log('⚡ Optimizing slow loading performance...');
      this.optimizePerformance();
    }
  }

  private static optimizePerformance() {
    // Lazy load non-critical resources
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });

    // Preload critical resources
    const criticalResources = ['/src/main.tsx', '/src/App.tsx'];
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = UniversalRouter.createPath(resource);
      link.as = 'script';
      document.head.appendChild(link);
    });
  }

  static getMetrics() {
    return Object.fromEntries(this.metrics);
  }
}
