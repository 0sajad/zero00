
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary wrapper
const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

try {
  const root = createRoot(container);
  root.render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
  // Fallback rendering
  container.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>OCTA GRAM</h1>
      <p>Something went wrong. Please refresh the page.</p>
      <button onclick="location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Refresh Page
      </button>
    </div>
  `;
}
