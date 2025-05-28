
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import './locales/i18n';

// Enhanced QueryClient with smart error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        console.log(`🔄 محاولة إعادة الطلب ${failureCount + 1}:`, error);
        
        // Don't retry on 4xx errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        
        // Exponential backoff
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error('🚨 خطأ في العملية:', error);
      }
    },
  },
});

const App = () => {
  console.log('🔧 OCTA NETWORK App - تهيئة النظام الأساسي');
  
  // Smart base path detection
  const getBasePath = () => {
    const config = (window as any).__OCTA_CONFIG__;
    if (!config) return undefined;
    
    console.log('🔍 تحديد المسار الأساسي:', config);
    
    // For GitHub Pages, don't use basename if it's just "./"
    if (config.domainType === 'githubPages' && config.basePath && config.basePath !== './') {
      return config.basePath.replace(/\/$/, ''); // Remove trailing slash
    }
    
    return undefined;
  };
  
  const basePath = getBasePath();
  console.log('🛣️ المسار الأساسي المحدد:', basePath);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basePath}>
            <Routes>
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                  <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl mx-4 border border-gray-200 dark:border-gray-700">
                    <div className="text-8xl mb-6 animate-pulse">🌐</div>
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      OCTA NETWORK
                    </h1>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
                      منصة مراقبة الشبكات الذكية العالمية
                    </h2>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
                      <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">404</h3>
                      <p className="text-red-700 dark:text-red-300">الصفحة غير موجودة</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-3xl mb-2">🛡️</div>
                        <h4 className="font-bold text-blue-800 dark:text-blue-400">الأمن السيبراني</h4>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-3xl mb-2">📊</div>
                        <h4 className="font-bold text-green-800 dark:text-green-400">التحليلات الذكية</h4>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-3xl mb-2">⚡</div>
                        <h4 className="font-bold text-purple-800 dark:text-purple-400">الأداء الفائق</h4>
                      </div>
                    </div>
                    <a 
                      href={basePath || '/'}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      🏠 العودة للرئيسية
                    </a>
                    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                      <h4 className="font-bold mb-2">معلومات النظام:</h4>
                      <p>المجال: {window.location.hostname}</p>
                      <p>المسار: {window.location.pathname}</p>
                      <p>التكوين: {(window as any).__OCTA_CONFIG__?.domainType || 'عادي'}</p>
                    </div>
                  </div>
                </div>
              } />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
