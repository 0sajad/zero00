
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Enhanced loading management
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

const showError = () => {
  try {
    const errorElement = document.getElementById('error');
    if (errorElement) {
      errorElement.style.display = 'flex';
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
    showError: () => void;
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
    
    // Hide loading screen after successful render with delay
    setTimeout(() => {
      hideLoading();
    }, 1000);
    
  } catch (error) {
    console.error('Error rendering React application:', error);
    showError();
  }
};

// Initialize app with proper error handling
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready, starting application...');
  renderApp();
});

// Fallback initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
