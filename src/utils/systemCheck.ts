
interface SystemCheck {
  component: string;
  status: 'success' | 'error' | 'warning';
  message: string;
}

export const runSystemCheck = async (): Promise<SystemCheck[]> => {
  const checks: SystemCheck[] = [];
  
  // Check network connectivity
  try {
    const response = await fetch('https://api.github.com');
    checks.push({
      component: 'Network Connectivity',
      status: response.ok ? 'success' : 'error',
      message: response.ok ? 'Connected successfully' : 'Connection failed'
    });
  } catch (error) {
    checks.push({
      component: 'Network Connectivity',
      status: 'error',
      message: 'Connection failed'
    });
  }

  // Check language support
  const languages = ['en', 'ar', 'ar-IQ', 'fa', 'tr', 'ur', 'ja'];
  const languageCheck = languages.every(lang => 
    document.documentElement.lang === lang || 
    document.documentElement.dir === (lang.startsWith('ar') ? 'rtl' : 'ltr')
  );
  
  checks.push({
    component: 'Language Support',
    status: languageCheck ? 'success' : 'warning',
    message: languageCheck ? 'All languages supported' : 'Some languages may need attention'
  });

  // Check local storage
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    checks.push({
      component: 'Local Storage',
      status: 'success',
      message: 'Working correctly'
    });
  } catch (error) {
    checks.push({
      component: 'Local Storage',
      status: 'error',
      message: 'Not available'
    });
  }

  // Check audio support
  checks.push({
    component: 'Audio Support',
    status: typeof Audio !== 'undefined' ? 'success' : 'warning',
    message: typeof Audio !== 'undefined' ? 'Available' : 'Not available'
  });

  return checks;
};

export const generateSystemReport = async () => {
  const checks = await runSystemCheck();
  console.log('System Check Report:');
  console.table(checks);
  
  return {
    timestamp: new Date().toISOString(),
    checks,
    summary: {
      total: checks.length,
      success: checks.filter(c => c.status === 'success').length,
      warnings: checks.filter(c => c.status === 'warning').length,
      errors: checks.filter(c => c.status === 'error').length
    }
  };
};
