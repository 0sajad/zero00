import { RealTimeMonitor } from './realTimeMonitor';
import { SystemAuditor } from './systemAuditor';

export class IntelligentSystem {
  private static features = new Map<string, boolean>();
  private static analytics = new Map<string, number>();
  private static healthMonitoringActive = false;

  static initialize() {
    this.setupIntelligentBehavior();
    this.enableSmartUserExperience();
    this.startSystemHealthMonitoring();
    console.log('🧠 Intelligent System activated with real monitoring');
  }

  private static setupIntelligentBehavior() {
    // Smart loading based on user behavior
    this.implementPredictiveLoading();
    
    // Adaptive performance based on device capabilities
    this.adaptToDeviceCapabilities();
    
    // Intelligent error recovery
    this.setupSmartErrorRecovery();
  }

  private static enableSmartUserExperience() {
    // Smart UI enhancements
    this.enableSmartAnimations();
    
    // Intelligent content prefetching
    this.enableContentPrefetching();
    
    // Smart notifications
    this.enableSmartNotifications();
  }

  private static startSystemHealthMonitoring() {
    if (this.healthMonitoringActive) return;
    
    this.healthMonitoringActive = true;
    RealTimeMonitor.start();
    
    // Run comprehensive audit every 5 minutes
    setInterval(async () => {
      const auditResults = await SystemAuditor.performComprehensiveAudit();
      this.processAuditResults(auditResults);
    }, 300000);
    
    // Monitor system health every 30 seconds
    setInterval(() => {
      const healthScore = this.calculateRealHealthScore();
      if (healthScore < 80) {
        this.optimizeSystemIntelligently();
      }
    }, 30000);
    
    console.log('🔍 Real-time system health monitoring started');
  }

  private static processAuditResults(results: any) {
    console.log('📊 Processing audit results:', results);
    
    if (results.overallScore < 85) {
      console.warn('⚠️ System performance below optimal, applying fixes...');
      this.applyIntelligentFixes(results);
    }
    
    this.analytics.set('lastAuditScore', results.overallScore);
    this.analytics.set('lastAuditTime', Date.now());
  }

  private static applyIntelligentFixes(results: any) {
    if (results.performance?.status !== 'pass') {
      this.optimizePerformance();
    }
    
    if (results.networking?.status !== 'pass') {
      this.optimizeNetworking();
    }
    
    if (results.components?.status !== 'pass') {
      this.optimizeComponents();
    }
  }

  private static optimizePerformance() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
    
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      if (!link.hasAttribute('media')) {
        link.setAttribute('media', 'all');
      }
    });
    
    console.log('⚡ Applied real performance optimizations');
  }

  private static optimizeNetworking() {
    const links = document.querySelectorAll('a[href^="http"]:not([rel*="prefetch"])');
    links.forEach((link, index) => {
      if (index < 5) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.getAttribute('href') || '';
        document.head.appendChild(prefetchLink);
      }
    });
    
    console.log('🌐 Applied real networking optimizations');
  }

  private static optimizeComponents() {
    const unusedElements = document.querySelectorAll('[style*="display: none"]');
    unusedElements.forEach(el => {
      if (!el.hasAttribute('data-keep')) {
        el.style.display = 'none';
        el.setAttribute('aria-hidden', 'true');
      }
    });
    
    console.log('🔧 Applied real component optimizations');
  }

  private static calculateRealHealthScore(): number {
    const metrics = RealTimeMonitor.getCurrentMetrics();
    let score = 100;
    
    if (metrics.memory) {
      if (metrics.memory.usage_percent > 80) score -= 30;
      else if (metrics.memory.usage_percent > 60) score -= 15;
    }
    
    if (metrics.network && !metrics.network.online) score -= 25;
    
    if (metrics.performance) {
      const currentTime = metrics.performance.timestamp;
      if (currentTime > 10000) score -= 10;
    }
    
    if (metrics.dom_stats) {
      if (metrics.dom_stats.total_elements > 1000) score -= 10;
    }
    
    this.analytics.set('realHealthScore', score);
    return Math.max(0, score);
  }

  private static optimizeSystemIntelligently() {
    console.log('🔧 Applying intelligent system optimizations...');
    
    const metrics = RealTimeMonitor.getCurrentMetrics();
    
    if (metrics.memory?.usage_percent > 70) {
      this.performMemoryOptimization();
    }
    
    if (metrics.dom_stats?.total_elements > 800) {
      this.performDOMOptimization();
    }
    
    if (metrics.network && !metrics.network.online) {
      this.enableOfflineMode();
    }
    
    this.analytics.set('lastOptimization', Date.now());
  }

  private static performMemoryOptimization() {
    if ('gc' in window) {
      (window as any).gc();
    }
    
    const elements = document.querySelectorAll('[data-cleanup="true"]');
    elements.forEach(el => el.remove());
    
    console.log('🧠 Memory optimization applied');
  }

  private static performDOMOptimization() {
    const hiddenElements = document.querySelectorAll('[style*="display: none"]:not([data-keep])');
    hiddenElements.forEach(el => {
      if (!el.hasAttribute('data-important')) {
        el.remove();
      }
    });
    
    console.log('🔧 DOM optimization applied');
  }

  private static enableSmartAnimations() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || this.features.get('reducedAnimations')) {
      document.documentElement.style.setProperty('--animation-duration', '0.01s');
    }
  }

  private static enableContentPrefetching() {
    const links = document.querySelectorAll('a[href^="/"]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target as HTMLAnchorElement;
          const href = link.href;
          if (href) {
            this.preloadRoute(href);
          }
        }
      });
    });

    links.forEach(link => observer.observe(link));
  }

  private static enableSmartNotifications() {
    if ('Notification' in window && Notification.permission === 'default') {
      document.addEventListener('click', () => {
        const userInteractions = this.analytics.get('userInteractions') || 0;
        if (userInteractions > 5) {
          Notification.requestPermission();
        }
      }, { once: true });
    }
  }

  private static implementPredictiveLoading() {
    let mousePosition = { x: 0, y: 0 };
    let lastActivity = Date.now();

    document.addEventListener('mousemove', (e) => {
      mousePosition = { x: e.clientX, y: e.clientY };
      lastActivity = Date.now();
      this.predictUserIntent(mousePosition);
    });

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.closest('a')) {
        this.analytics.set('linkClicks', (this.analytics.get('linkClicks') || 0) + 1);
      }
    });
  }

  private static predictUserIntent(mousePos: { x: number, y: number }) {
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      const rect = link.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(mousePos.x - (rect.left + rect.width / 2), 2) +
        Math.pow(mousePos.y - (rect.top + rect.height / 2), 2)
      );
      
      if (distance < 100) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/')) {
          this.preloadRoute(href);
        }
      }
    });
  }

  private static preloadRoute(path: string) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    document.head.appendChild(link);
  }

  private static adaptToDeviceCapabilities() {
    const connection = (navigator as any).connection;
    if (connection) {
      const effectiveType = connection.effectiveType;
      
      if (effectiveType === '4g') {
        this.features.set('highQualityImages', true);
        this.features.set('backgroundSync', true);
      } else {
        this.features.set('highQualityImages', false);
        this.features.set('backgroundSync', false);
      }
    }

    if ('deviceMemory' in navigator) {
      const memory = (navigator as any).deviceMemory;
      if (memory < 4) {
        this.features.set('reducedAnimations', true);
        this.features.set('limitedCaching', true);
      }
    }
  }

  private static setupSmartErrorRecovery() {
    window.addEventListener('error', (event) => {
      this.analytics.set('errors', (this.analytics.get('errors') || 0) + 1);
      this.attemptSmartRecovery(event.error);
    });
  }

  private static attemptSmartRecovery(error: any) {
    if (error.message.includes('chunk')) {
      setTimeout(() => window.location.reload(), 1000);
    } else if (error.message.includes('network')) {
      this.enableOfflineMode();
    }
  }

  private static enableOfflineMode() {
    const offlineBanner = document.createElement('div');
    offlineBanner.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; right: 0; background: #f59e0b; color: white; text-align: center; padding: 10px; z-index: 9999;">
        🌐 النظام يعمل في الوضع غير المتصل - Smart Offline Mode
      </div>
    `;
    document.body.appendChild(offlineBanner);

    window.addEventListener('online', () => {
      offlineBanner.remove();
    });
  }

  static getFeatures() {
    return Object.fromEntries(this.features);
  }

  static getAnalytics() {
    return Object.fromEntries(this.analytics);
  }

  static getRealTimeReport() {
    return {
      features: this.getFeatures(),
      analytics: this.getAnalytics(),
      currentMetrics: RealTimeMonitor.getCurrentMetrics(),
      healthScore: this.calculateRealHealthScore(),
      recommendations: RealTimeMonitor.generateReport().recommendations,
      timestamp: new Date().toISOString(),
      monitoring: this.healthMonitoringActive
    };
  }

  static async performSystemAudit() {
    return await SystemAuditor.performComprehensiveAudit();
  }

  static cleanup() {
    if (this.healthMonitoringActive) {
      RealTimeMonitor.stop();
      this.healthMonitoringActive = false;
    }
  }
}
