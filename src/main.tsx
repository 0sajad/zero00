
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log('🚀 OCTA NETWORK - بدء تحميل التطبيق الرئيسي...');

// تهيئة التطبيق مع معالجة محسنة للأخطاء
const initializeApp = async () => {
  try {
    console.log('🔧 تهيئة تطبيق OCTA NETWORK...');
    
    // التأكد من وجود العنصر الجذر
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element not found");
    }

    console.log('📦 بدء عرض تطبيق React...');
    
    // إنشاء الجذر وعرض التطبيق
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    console.log('✅ تم عرض تطبيق React بنجاح');

  } catch (error) {
    console.error('❌ خطأ في تهيئة التطبيق:', error);
    
    // استخدام الدالة العامة لعرض الخطأ إذا كانت متاحة
    if (typeof window !== 'undefined' && window.showError) {
      window.showError('حدث خطأ في تحميل التطبيق. يرجى إعادة تحديث الصفحة.');
    } else {
      // عرض رسالة خطأ بديلة
      const errorElement = document.getElementById('error');
      if (errorElement) {
        errorElement.style.display = 'flex';
      }
    }
  }
};

// بدء التطبيق
initializeApp();

console.log('📝 تم تحميل main.tsx بنجاح');
