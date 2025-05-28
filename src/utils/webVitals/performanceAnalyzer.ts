
export class PerformanceAnalyzer {
  static analyzeResourcePerformance() {
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

    if (totalSize > 3000000) { // 3MB
      console.warn('⚠️ Large bundle size:', Math.round(totalSize / 1024 / 1024) + 'MB');
    }

    return { totalSize, slowResources };
  }

  static trackUserExperience() {
    let scrollDepth = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      scrollDepth = Math.max(scrollDepth, currentScroll);
    }, { passive: true });

    const startTime = performance.now();
    window.addEventListener('beforeunload', () => {
      const timeOnPage = performance.now() - startTime;
      console.log('📊 Time on page:', Math.round(timeOnPage / 1000) + 's');
    });

    return { scrollDepth };
  }

  static calculateOverallScore(metrics: Map<string, number>): number {
    let score = 100;
    
    const lcp = metrics.get('LCP') || 0;
    const fid = metrics.get('FID') || 0;
    const cls = metrics.get('CLS') || 0;
    
    if (lcp > 4000) score -= 30;
    else if (lcp > 2500) score -= 15;
    
    if (fid > 300) score -= 20;
    else if (fid > 100) score -= 10;
    
    if (cls > 0.25) score -= 25;
    else if (cls > 0.1) score -= 10;
    
    return Math.max(score, 0);
  }
}
