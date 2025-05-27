
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log('🚀 OCTA NETWORK - بدء تحميل التطبيق الرئيسي...');

// Enhanced application initialization
const initializeApp = async () => {
  try {
    console.log('🔧 تهيئة تطبيق OCTA NETWORK...');
    
    // Ensure root element exists
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element not found");
    }

    console.log('📦 بدء عرض تطبيق React...');
    
    // Create root and render app
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    console.log('✅ تم عرض تطبيق React بنجاح');

    // Hide loading screen if function exists
    if (typeof window !== 'undefined' && typeof window.hideLoading === 'function') {
      window.hideLoading();
    }

  } catch (error) {
    console.error('❌ خطأ في تهيئة التطبيق:', error);
    
    // Safe error handling
    try {
      if (typeof window !== 'undefined' && typeof window.showError === 'function') {
        window.showError('حدث خطأ في تحميل التطبيق. يرجى إعادة تحديث الصفحة.');
      } else {
        // Fallback error display
        const errorElement = document.getElementById('error');
        if (errorElement) {
          errorElement.style.display = 'flex';
        }
      }
    } catch (displayError) {
      console.error('❌ خطأ في عرض رسالة الخطأ:', displayError);
      // Final fallback
      if (typeof alert === 'function') {
        alert('حدث خطأ في تحميل التطبيق. يرجى إعادة تحديث الصفحة.');
      }
    }
  }
};

// Initialize the application
initializeApp();

console.log('📝 تم تحميل main.tsx بنجاح');
