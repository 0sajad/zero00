
export class SmartBehavior {
  private static features = new Map<string, boolean>();

  static setupIntelligentBehavior() {
    this.implementPredictiveLoading();
    this.adaptToDeviceCapabilities();
    this.setupSmartErrorRecovery();
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
        console.log('Link interaction detected');
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
}
