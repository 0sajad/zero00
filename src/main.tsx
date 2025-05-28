
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Enhanced logging
console.log('🚀 OCTA NETWORK - تطبيق مراقبة الشبكات');
console.log('🔧 بيئة التشغيل:', import.meta.env.MODE);
console.log('🌐 المجال:', window.location.hostname);

// Validate root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error('❌ خطأ: لم يتم العثور على عنصر الجذر');
  throw new Error("Root element not found");
}

// Enhanced error boundary and rendering
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
    
  } catch (error) {
    console.error('❌ خطأ في رندر التطبيق:', error);
    
    // Fallback UI with enhanced styling
    rootElement.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui, -apple-system, sans-serif; direction: rtl; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div style="text-align: center; background: white; padding: 40px; border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); max-width: 500px; margin: 20px;">
          <div style="font-size: 60px; margin-bottom: 20px;">⚠️</div>
          <h1 style="color: #dc2626; margin-bottom: 15px; font-size: 24px;">خطأ في تحميل التطبيق</h1>
          <p style="color: #6b7280; margin-bottom: 25px; line-height: 1.6;">حدث خطأ غير متوقع أثناء تحميل OCTA NETWORK</p>
          <button onclick="window.location.reload()" 
                  style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 25px; cursor: pointer; font-size: 16px; font-weight: bold; transition: all 0.3s ease;">
            إعادة التحميل
          </button>
          <div style="margin-top: 20px; font-size: 12px; color: #9ca3af; font-family: monospace;">
            ${error.message}
          </div>
        </div>
      </div>
    `;
  }
};

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('🚨 خطأ عام:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Promise مرفوض:', event.reason);
});

// Initialize app
renderApp();
