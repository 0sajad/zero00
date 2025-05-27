
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LoadingManager } from "./utils/loadingManager";
import { AuthProvider } from "./hooks/useAuth";

console.log('🚀 OCTA NETWORK - بدء تحميل التطبيق الرئيسي...');

// تهيئة مدير التحميل
const loadingManager = new LoadingManager();

// التأكد من تحميل جميع الموارد
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
        <AuthProvider>
          <App />
        </AuthProvider>
      </StrictMode>
    );

    console.log('✅ تم عرض تطبيق React بنجاح');
    
    // إخفاء شاشة التحميل بعد التأكد من التحميل الكامل
    setTimeout(() => {
      loadingManager.hideLoading();
    }, 100);

  } catch (error) {
    console.error('❌ خطأ في تهيئة التطبيق:', error);
    loadingManager.showError('حدث خطأ في تحميل التطبيق. يرجى إعادة تحديث الصفحة.');
  }
};

// بدء التطبيق
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 تم تحميل DOM بالكامل');
  initializeApp();
});

// للتوافق مع التحميل المباشر
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

console.log('📝 تم تحميل main.tsx بنجاح');
