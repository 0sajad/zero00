
export class ImageOptimizer {
  static optimizeImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.loading = 'lazy';
      img.decoding = 'async';
      this.setupImageObserver(img);
    });

    this.observeDynamicImages();
  }

  private static setupImageObserver(img: HTMLImageElement) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          this.optimizeImageFormat(image);
          imageObserver.unobserve(image);
        }
      });
    }, {
      rootMargin: '50px'
    });

    imageObserver.observe(img);
  }

  private static observeDynamicImages() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const images = node.querySelectorAll ? node.querySelectorAll('img') : [];
            images.forEach((img) => {
              img.loading = 'lazy';
              img.decoding = 'async';
              this.setupImageObserver(img);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private static optimizeImageFormat(img: HTMLImageElement) {
    if (this.supportsWebP()) {
      const src = img.src;
      if (src && !src.includes('.webp') && (src.includes('.jpg') || src.includes('.png'))) {
        const webpSrc = src.replace(/\.(jpg|png)$/i, '.webp');
        
        const testImg = new Image();
        testImg.onload = () => {
          img.src = webpSrc;
        };
        testImg.src = webpSrc;
      }
    }
  }

  private static supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
}
