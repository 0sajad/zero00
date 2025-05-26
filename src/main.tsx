
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

// Error boundary wrapper
class ErrorBoundary extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErrorBoundary';
  }
}

// Global error handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

try {
  const root = createRoot(container);
  root.render(<App />);
  
  // Hide loading screen once React app is rendered
  setTimeout(() => {
    if (window.hideLoading) {
      window.hideLoading();
    }
  }, 100);
  
} catch (error) {
  console.error('Failed to render app:', error);
  
  // Show error in the container instead of loading screen
  container.innerHTML = `
    <div style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      color: #ef4444;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <h2>Application Error</h2>
      <p>Failed to initialize OCTA GRAM. Please refresh the page.</p>
      <button onclick="window.location.reload()" style="
        margin-top: 20px;
        padding: 10px 20px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      ">
        Refresh Page
      </button>
    </div>
  `;
  
  // Hide loading screen
  if (window.hideLoading) {
    window.hideLoading();
  }
}
