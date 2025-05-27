
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log('OCTA NETWORK - بدء تحميل التطبيق الرئيسي...');

// Enhanced loading management
const hideLoading = () => {
  try {
    const loadingElement = document.getElementById('loading');
    const rootElement = document.getElementById('root');
    
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    
    if (rootElement) {
      rootElement.classList.add('loaded');
      rootElement.style.display = 'block';
    }
    
    if (document.body) {
      document.body.style.overflow = 'auto';
    }
    
    console.log('تم إخفاء شاشة التحميل بنجاح');
  } catch (error) {
    console.error('خطأ في إخفاء شاشة التحميل:', error);
  }
};

const showError = (errorMessage?: string) => {
  try {
    const errorElement = document.getElementById('error');
    const loadingElement = document.getElementById('loading');
    
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    
    if (errorElement) {
      errorElement.style.display = 'flex';
      if (errorMessage) {
        const errorText = errorElement.querySelector('p');
        if (errorText) {
          errorText.textContent = errorMessage;
        }
      }
    }
    console.log('تم عرض شاشة الخطأ');
  } catch (error) {
    console.error('خطأ في عرض شاشة الخطأ:', error);
  }
};

// Enhanced error handling for React rendering
const renderApp = async () => {
  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("عنصر الجذر غير موجود");
    }

    console.log('بدء عرض تطبيق React...');
    
    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    console.log('تم عرض تطبيق React بنجاح');
    
    // Hide loading screen after successful render
    setTimeout(() => {
      hideLoading();
    }, 500);
    
  } catch (error) {
    console.error('خطأ في عرض تطبيق React:', error);
    showError('فشل في تحميل التطبيق. يرجى إعادة تحديث الصفحة.');
  }
};

// Enhanced initialization
const initializeApp = () => {
  console.log('تهيئة تطبيق OCTA NETWORK...');
  
  try {
    // Add global error listeners
    window.addEventListener('error', (event) => {
      console.error('خطأ عام:', event.error);
      showError('حدث خطأ أثناء التحميل');
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('خطأ في Promise:', event.reason);
      showError('خطأ في التحميل');
    });

    renderApp();
  } catch (error) {
    console.error('خطأ في تهيئة التطبيق:', error);
    showError('فشل في تهيئة التطبيق');
  }
};

// Start initialization
initializeApp();
