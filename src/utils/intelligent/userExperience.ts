
export class UserExperience {
  static enableSmartUserExperience() {
    this.enableSmartAnimations();
    this.enableContentPrefetching();
    this.enableSmartNotifications();
  }

  private static enableSmartAnimations() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
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

  private static preloadRoute(path: string) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    document.head.appendChild(link);
  }

  private static enableSmartNotifications() {
    if ('Notification' in window && Notification.permission === 'default') {
      document.addEventListener('click', () => {
        setTimeout(() => {
          Notification.requestPermission();
        }, 5000);
      }, { once: true });
    }
  }
}
