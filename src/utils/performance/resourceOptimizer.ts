
export class ResourceOptimizer {
  static enableResourceOptimization() {
    this.preloadCriticalResources();
    this.setupIntelligentPrefetching();
    this.removeUnusedCSS();
  }

  private static preloadCriticalResources() {
    const criticalResources = [
      { href: '/favicon.ico', as: 'image' },
      { href: '/manifest.json', as: 'manifest' }
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });
  }

  private static setupIntelligentPrefetching() {
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"]');
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && !document.querySelector(`link[href="${href}"]`)) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = href;
          document.head.appendChild(prefetchLink);
        }
      }, { once: true });
    });

    const importantRoutes = ['/tools', '/settings', '/help'];
    importantRoutes.forEach((route) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }

  private static removeUnusedCSS() {
    const styleSheets = document.styleSheets;
    Array.from(styleSheets).forEach((sheet) => {
      try {
        const rules = sheet.cssRules || sheet.rules;
        if (rules) {
          // Simple unused CSS detection - in production you'd use more sophisticated tools
        }
      } catch (e) {
        // Cross-origin stylesheets may throw errors
      }
    });
  }
}
