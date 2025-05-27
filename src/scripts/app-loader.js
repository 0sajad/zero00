
import { LoadingManager } from '../utils/loadingManager.ts';

console.log('OCTA NETWORK - تهيئة التطبيق...');

const loadingManager = new LoadingManager();

// Make functions globally available
window.hideLoading = () => loadingManager.hideLoading();
window.showError = (message) => loadingManager.showError(message);

// Initialize app
const initializeApp = () => {
  console.log('بدء تهيئة التطبيق...');
  
  // Simulate successful loading
  setTimeout(() => {
    loadingManager.hideLoading();
  }, 2000);
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Load main application
try {
  console.log('تحميل الوحدات الأساسية...');
  
  import('../main.tsx')
    .then(() => {
      console.log('تم تحميل main.tsx بنجاح');
    })
    .catch((error) => {
      console.error('خطأ في تحميل main.tsx:', error);
      loadingManager.showError('فشل في تحميل الملفات الأساسية');
    });
    
} catch (error) {
  console.error('خطأ في تحميل الوحدات:', error);
  loadingManager.showError('خطأ في تحميل التطبيق');
}
