
export class UniversalRouter {
  private static basePath = '/';
  private static isInitialized = false;

  static initialize() {
    if (this.isInitialized) return this.basePath;
    
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    // Smart detection for different hosting platforms
    if (hostname.includes('github.io')) {
      // GitHub Pages detection
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length > 0 && !segments[0].includes('.')) {
        this.basePath = `/${segments[0]}/`;
      }
    } else if (hostname.includes('vercel.app') || hostname.includes('netlify.app')) {
      // Vercel/Netlify - usually work with root path
      this.basePath = '/';
    } else {
      // Custom domain or other hosting - auto-detect
      this.basePath = this.detectBasePath();
    }
    
    this.isInitialized = true;
    console.log('🌐 Universal Router initialized with base path:', this.basePath);
    return this.basePath;
  }

  private static detectBasePath(): string {
    const scriptTags = document.querySelectorAll('script[src]');
    for (const script of scriptTags) {
      const src = (script as HTMLScriptElement).src;
      if (src.includes('main.tsx') || src.includes('index.js')) {
        const url = new URL(src);
        const pathSegments = url.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 1) {
          return `/${pathSegments.slice(0, -1).join('/')}/`;
        }
      }
    }
    return '/';
  }

  static getBasePath(): string {
    return this.basePath;
  }

  static createPath(path: string): string {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${this.basePath}${cleanPath}`;
  }
}
