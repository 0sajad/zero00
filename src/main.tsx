
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Enhanced error handling and logging
console.log('🚀 OCTA NETWORK - تطبيق مراقبة الشبكات');
console.log('🔧 بدء تحميل التطبيق...');

// Validate root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error('❌ خطأ: لم يتم العثور على عنصر الجذر');
  document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial; direction: rtl;">
      <div style="text-align: center;">
        <h1 style="color: #dc2626;">خطأ في بنية التطبيق</h1>
        <p>عنصر الجذر غير موجود في DOM</p>
      </div>
    </div>
  `;
  throw new Error("Root element not found");
}

// Enhanced error boundary setup
const renderApp = () => {
  try {
    console.log('✅ تم العثور على عنصر الجذر، بدء الرندر...');
    
    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    console.log('🎉 تم تحميل التطبيق بنجاح!');
    
    // Performance monitoring
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        console.log('📊 إحصائيات الأداء:', {
          loadTime: performance.now(),
          timing: performance.timing
        });
      });
    }
    
  } catch (error) {
    console.error('❌ خطأ في رندر التطبيق:', error);
    
    // Fallback UI
    rootElement.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial; direction: rtl; background: #f9fafb;">
        <div style="text-align: center; max-width: 500px; padding: 40px; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="font-size: 60px; margin-bottom: 20px;">🚫</div>
          <h1 style="color: #dc2626; margin-bottom: 15px;">خطأ في تحميل التطبيق</h1>
          <p style="color: #6b7280; margin-bottom: 25px;">حدث خطأ غير متوقع أثناء تحميل OCTA NETWORK</p>
          <button onclick="window.location.reload()" 
                  style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">
            إعادة التحميل
          </button>
          <div style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
            خطأ: ${error.message}
          </div>
        </div>
      </div>
    `;
  }
};

// Global error handler
window.addEventListener('error', (event) => {
  console.error('🚨 خطأ عام في التطبيق:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Promise مرفوض:', event.reason);
});

// Initialize app
renderApp();
