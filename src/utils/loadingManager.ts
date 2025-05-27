
export class LoadingManager {
  private hasLoaded = false;
  private loadingTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.setupErrorHandlers();
    this.setLoadingTimeout();
  }

  private setupErrorHandlers() {
    window.addEventListener('error', (event) => {
      this.handleError(event.error || event.message, 'window.error');
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(event.reason, 'unhandledrejection');
    });
  }

  private setLoadingTimeout() {
    this.loadingTimeout = setTimeout(() => {
      if (!this.hasLoaded) {
        console.warn('انتهت مهلة التحميل');
        this.showError('انتهت مهلة التحميل. يرجى إعادة تحديث الصفحة.');
      }
    }, 10000);
  }

  private handleError(error: any, source = 'unknown') {
    console.error(`خطأ من ${source}:`, error);
    if (!this.hasLoaded) {
      this.showError();
    }
  }

  hideLoading() {
    try {
      this.hasLoaded = true;
      if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
      
      const loadingElement = document.getElementById('loading');
      const rootElement = document.getElementById('root');
      
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
      
      if (rootElement) {
        rootElement.classList.add('loaded');
        rootElement.style.display = 'block';
      }
      
      document.body.style.overflow = 'auto';
      console.log('تم إخفاء شاشة التحميل بنجاح');
    } catch (error) {
      console.error('خطأ في إخفاء شاشة التحميل:', error);
    }
  }

  showError(errorMessage?: string) {
    try {
      const loadingElement = document.getElementById('loading');
      const errorElement = document.getElementById('error');
      const errorText = errorElement?.querySelector('p');
      
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
      
      if (errorElement) {
        errorElement.style.display = 'flex';
        if (errorText && errorMessage) {
          errorText.textContent = errorMessage;
        }
      }
      
      console.log('تم عرض شاشة الخطأ');
    } catch (error) {
      console.error('خطأ في عرض شاشة الخطأ:', error);
    }
  }
}
