
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Enhanced loading management with better error handling
const hideLoading = () => {
  try {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    console.log('Loading screen hidden successfully');
  } catch (error) {
    console.error('Error hiding loading screen:', error);
  }
};

const showError = (errorMessage?: string) => {
  try {
    const errorElement = document.getElementById('error');
    if (errorElement) {
      errorElement.style.display = 'flex';
      if (errorMessage) {
        const errorText = errorElement.querySelector('p');
        if (errorText) {
          errorText.textContent = errorMessage;
        }
      }
    }
    hideLoading();
    console.log('Error screen displayed');
  } catch (error) {
    console.error('Error showing error screen:', error);
  }
};

// Make functions globally available
declare global {
  interface Window {
    hideLoading: () => void;
    showError: (message?: string) => void;
  }
}

window.hideLoading = hideLoading;
window.showError = showError;

// Enhanced error handling for React rendering
const renderApp = async () => {
  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element not found");
    }

    const root = createRoot(rootElement);
    
    console.log('Starting React application render...');
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    console.log('React application rendered successfully');
    
    // Hide loading screen after successful render
    setTimeout(() => {
      hideLoading();
    }, 1000);
    
  } catch (error) {
    console.error('Error rendering React application:', error);
    showError('فشل في تحميل التطبيق. يرجى إعادة تحديث الصفحة.');
  }
};

// Enhanced initialization with better error handling
const initializeApp = () => {
  console.log('Initializing OCTA NETWORK application...');
  
  // Add error listeners
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    if (event.error?.message?.includes('Loading chunk')) {
      showError('خطأ في تحميل الموارد. يرجى إعادة تحديث الصفحة.');
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (event.reason?.message?.includes('Loading')) {
      showError('خطأ في التحميل. يرجى المحاولة مرة أخرى.');
    }
  });

  renderApp();
};

// Initialize app with proper timing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
