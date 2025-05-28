
declare global {
  interface Window {
    showError?: (message: string) => void;
    hideLoading?: () => void;
    __GITHUB_PAGES__?: boolean;
    __BASE_PATH__?: string;
  }
}

export {};
