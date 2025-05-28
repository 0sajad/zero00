
declare global {
  interface Window {
    showError?: (message: string) => void;
    hideLoading?: () => void;
    __GITHUB_PAGES__?: boolean;
    __BASE_PATH__?: string;
    __OCTA_CONFIG__?: {
      domainType: 'githubPages' | 'netlify' | 'vercel' | 'custom' | 'local';
      basePath: string;
      repoName: string;
      hostname: string;
      isProduction: boolean;
      features: {
        smartRouting: boolean;
        adaptiveLoading: boolean;
        errorRecovery: boolean;
        universalCompatibility: boolean;
      };
    };
  }

  interface PerformanceNavigationTiming extends PerformanceEntry {
    loadEventEnd?: number;
    loadEventStart?: number;
    domContentLoadedEventEnd?: number;
    domContentLoadedEventStart?: number;
    fetchStart?: number;
    transferSize?: number;
    encodedBodySize?: number;
    processingStart?: number;
  }
}

export {};
