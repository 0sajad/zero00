
import { CoreVitalsMonitor } from './webVitals/coreVitalsMonitor';
import { PerformanceAnalyzer } from './webVitals/performanceAnalyzer';

export class WebVitalsMonitor {
  static initialize() {
    CoreVitalsMonitor.monitorCoreWebVitals();
    this.setupPerformanceAPI();
    this.trackUserInteractions();
    console.log('📈 Web Vitals Monitor active - Tracking performance metrics');
  }

  private static setupPerformanceAPI() {
    window.addEventListener('load', () => {
      PerformanceAnalyzer.analyzeResourcePerformance();
      this.generatePerformanceReport();
    });

    this.trackNavigation();
  }

  private static trackNavigation() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        console.log('📊 Page became visible');
      }
    });

    let interactionCount = 0;
    ['click', 'scroll', 'keydown', 'touchstart'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        interactionCount++;
      }, { passive: true, once: false });
    });
  }

  private static trackUserInteractions() {
    PerformanceAnalyzer.trackUserExperience();
  }

  private static generatePerformanceReport() {
    setTimeout(() => {
      const metrics = CoreVitalsMonitor.getMetrics();
      const { totalSize, slowResources } = PerformanceAnalyzer.analyzeResourcePerformance();
      const score = PerformanceAnalyzer.calculateOverallScore(new Map(Object.entries(metrics)));

      const report = {
        coreWebVitals: metrics,
        performance: {
          totalResourceSize: totalSize,
          slowResources: slowResources
        },
        score: score
      };

      console.log('📊 Performance Report:', report);
      this.displayPerformanceScore(score);
    }, 3000);
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
    return CoreVitalsMonitor.getMetrics();
  }

  static cleanup() {
    CoreVitalsMonitor.cleanup();
  }
}
