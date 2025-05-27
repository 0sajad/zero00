
declare global {
  interface Window {
    showError?: (message: string) => void;
    hideLoading?: () => void;
  }
}

export {};
