
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Hide loading screen function
const hideLoading = () => {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
};

// Make it available globally
declare global {
  interface Window {
    hideLoading: () => void;
  }
}

window.hideLoading = hideLoading;

const root = createRoot(document.getElementById("root")!);

try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  // Hide loading screen after successful render
  setTimeout(() => {
    hideLoading();
  }, 1000);
} catch (error) {
  console.error('Error rendering app:', error);
  
  // Show error screen
  const errorElement = document.getElementById('error');
  if (errorElement) {
    errorElement.style.display = 'flex';
  }
  hideLoading();
}
