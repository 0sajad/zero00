
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import './locales/i18n';

// Enhanced QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => {
  console.log('🔧 تطبيق OCTA NETWORK - بدء التحميل');
  
  // Get base path for routing
  const basePath = window.__BASE_PATH__ || '/';
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basePath === '/' ? undefined : basePath}>
            <Routes>
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                  <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md mx-4">
                    <div className="text-6xl mb-4">🌐</div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">OCTA NETWORK</h1>
                    <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">404</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">الصفحة غير موجودة</p>
                    <a 
                      href={basePath}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      العودة للرئيسية
                    </a>
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
