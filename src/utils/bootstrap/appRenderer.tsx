
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../../App";

export class AppRenderer {
  static async renderApplication() {
    const rootElement = this.validateRootElement();
    
    if (!rootElement) {
      throw new Error('Failed to create root element');
    }

    console.log('🎨 رندر التطبيق الذكي المحسن...');
    
    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    this.postRenderOptimizations();
    
    console.log('🎉 تم تحميل OCTA NETWORK بنجاح على جميع المنصات مع تحسينات الأداء!');
  }

  private static validateRootElement(): HTMLElement {
    let rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.log('🔧 إنشاء عنصر الجذر...');
      rootElement = document.createElement('div');
      rootElement.id = 'root';
      rootElement.style.cssText = 'min-height: 100vh; width: 100%;';
      document.body.appendChild(rootElement);
    }
    
    return rootElement;
  }

  private static postRenderOptimizations() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(error => {
        console.log('Service Worker registration failed:', error);
      });
    }

    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      setTimeout(() => {
        loadingElement.style.opacity = '0';
        loadingElement.style.transition = 'opacity 0.5s ease';
        setTimeout(() => loadingElement.remove(), 500);
      }, 1000);
    }

    this.enableSmartFeatures();
  }

  private static enableSmartFeatures() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.decoding = 'async';
    });

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = href;
          document.head.appendChild(prefetchLink);
        }
      }, { once: true });
    });
  }
}
