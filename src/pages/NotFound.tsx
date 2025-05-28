
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: محاولة الوصول لمسار غير موجود:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600" dir="rtl">
      <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-4 border border-white/20">
        <div className="text-8xl mb-6">🌐</div>
        <h1 className="text-4xl font-bold mb-4 text-white font-['Tajawal']">OCTA NETWORK</h1>
        <div className="text-6xl font-bold mb-4 text-yellow-300">404</div>
        <p className="text-xl text-white/90 mb-6 font-['Tajawal']">عذراً، الصفحة غير موجودة</p>
        <p className="text-white/70 mb-8 font-['Tajawal']">النظام يعمل على جميع الخوادم والمنصات</p>
        <Link 
          to="/" 
          className="inline-block bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 font-['Tajawal']"
        >
          🏠 العودة للرئيسية
        </Link>
        <div className="mt-6 text-sm text-white/50 break-all font-mono">
          المسار: {location.pathname}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
