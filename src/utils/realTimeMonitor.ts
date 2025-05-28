
export class RealTimeMonitor {
  private static isActive = false;
  private static metrics: Map<string, any> = new Map();
  private static intervals: number[] = [];

  static start() {
    if (this.isActive) return;
    
    this.isActive = true;
    console.log('📡 Real-time system monitoring started');
    
    // Monitor every 1 second
    const mainInterval = setInterval(() => {
      this.collectMetrics();
    }, 1000);
    
    // Monitor performance every 5 seconds
    const perfInterval = setInterval(() => {
      this.collectPerformanceMetrics();
    }, 5000);
    
    // Monitor network every 10 seconds
    const networkInterval = setInterval(() => {
      this.collectNetworkMetrics();
    }, 10000);
    
    this.intervals.push(mainInterval, perfInterval, networkInterval);
  }

  static stop() {
    this.isActive = false;
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
    console.log('📡 Real-time monitoring stopped');
  }

  private static collectMetrics() {
    const now = Date.now();
    
    // System metrics
    this.metrics.set('timestamp', now);
    this.metrics.set('memory', this.getMemoryInfo());
    this.metrics.set('performance', this.getPerformanceInfo());
    this.metrics.set('network', this.getNetworkInfo());
    this.metrics.set('user_activity', this.getUserActivity());
    this.metrics.set('dom_stats', this.getDOMStats());
  }

  private static collectPerformanceMetrics() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const resources = performance.getEntriesByType('resource');
      
      this.metrics.set('navigation_timing', {
        dns_lookup: navigation ? navigation.domainLookupEnd - navigation.domainLookupStart : 0,
        tcp_connect: navigation ? navigation.connectEnd - navigation.connectStart : 0,
        request_response: navigation ? navigation.responseEnd - navigation.requestStart : 0,
        dom_processing: navigation ? navigation.domComplete - navigation.domLoading : 0
      });
      
      this.metrics.set('resource_stats', {
        total_resources: resources.length,
        total_size: resources.reduce((sum, resource) => {
          const entry = resource as PerformanceResourceTiming;
          return sum + (entry.transferSize || 0);
        }, 0),
        slow_resources: resources.filter(r => r.duration > 1000).length
      });
    }
  }

  private static collectNetworkMetrics() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.metrics.set('connection_info', {
        effective_type: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        save_data: connection.saveData
      });
    }
    
    // Test actual network speed
    this.testNetworkSpeed().then(speed => {
      this.metrics.set('real_network_speed', speed);
    });
  }

  private static getMemoryInfo(): any {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used_mb: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total_mb: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit_mb: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
        usage_percent: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
      };
    }
    return null;
  }

  private static getPerformanceInfo(): any {
    return {
      timestamp: performance.now(),
      time_origin: performance.timeOrigin,
      navigation_start: performance.timing?.navigationStart || 0,
      load_complete: performance.timing?.loadEventEnd || 0
    };
  }

  private static getNetworkInfo(): any {
    return {
      online: navigator.onLine,
      connection_type: (navigator as any).connection?.type || 'unknown',
      effective_bandwidth: (navigator as any).connection?.downlink || 0
    };
  }

  private static getUserActivity(): any {
    return {
      scroll_position: {
        x: window.scrollX,
        y: window.scrollY
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      focus: document.hasFocus(),
      visibility: document.visibilityState
    };
  }

  private static getDOMStats(): any {
    return {
      total_elements: document.querySelectorAll('*').length,
      scripts: document.querySelectorAll('script').length,
      stylesheets: document.querySelectorAll('link[rel="stylesheet"]').length,
      images: document.querySelectorAll('img').length,
      forms: document.querySelectorAll('form').length,
      buttons: document.querySelectorAll('button').length
    };
  }

  private static async testNetworkSpeed(): Promise<any> {
    try {
      const start = performance.now();
      const response = await fetch('https://httpbin.org/bytes/1024', { 
        cache: 'no-cache' 
      });
      const blob = await response.blob();
      const duration = performance.now() - start;
      
      const bitsPerSecond = (blob.size * 8) / (duration / 1000);
      
      return {
        duration_ms: Math.round(duration),
        bytes_transferred: blob.size,
        speed_kbps: Math.round(bitsPerSecond / 1000),
        timestamp: Date.now(),
        real_test: true
      };
    } catch (error) {
      return {
        error: error.message,
        real_test: false,
        timestamp: Date.now()
      };
    }
  }

  static getCurrentMetrics(): any {
    return Object.fromEntries(this.metrics);
  }

  static getMetricsHistory(): any[] {
    // Return last 10 measurements
    const current = this.getCurrentMetrics();
    return [current]; // In a real implementation, you'd store history
  }

  static generateReport(): any {
    const metrics = this.getCurrentMetrics();
    const memory = metrics.memory;
    const performance = metrics.performance;
    const network = metrics.network;
    
    return {
      system_health: {
        memory_usage: memory?.usage_percent || 0,
        performance_score: this.calculatePerformanceScore(metrics),
        network_quality: network?.online ? 'online' : 'offline'
      },
      recommendations: this.generateRecommendations(metrics),
      real_time_data: true,
      last_updated: new Date().toISOString()
    };
  }

  private static calculatePerformanceScore(metrics: any): number {
    let score = 100;
    
    const memory = metrics.memory;
    if (memory && memory.usage_percent > 80) score -= 20;
    if (memory && memory.usage_percent > 60) score -= 10;
    
    const networkSpeed = metrics.real_network_speed;
    if (networkSpeed && networkSpeed.speed_kbps < 100) score -= 15;
    
    const domStats = metrics.dom_stats;
    if (domStats && domStats.total_elements > 1000) score -= 10;
    
    return Math.max(0, score);
  }

  private static generateRecommendations(metrics: any): string[] {
    const recommendations = [];
    
    const memory = metrics.memory;
    if (memory && memory.usage_percent > 70) {
      recommendations.push('High memory usage detected - consider optimizing components');
    }
    
    const networkSpeed = metrics.real_network_speed;
    if (networkSpeed && networkSpeed.speed_kbps < 500) {
      recommendations.push('Slow network detected - enable compression and caching');
    }
    
    const domStats = metrics.dom_stats;
    if (domStats && domStats.total_elements > 800) {
      recommendations.push('Large DOM detected - consider virtual scrolling');
    }
    
    if (!metrics.network?.online) {
      recommendations.push('Device is offline - enable offline mode');
    }
    
    return recommendations;
  }
}
