
export class ErrorRecovery {
  private static errorCount = 0;
  private static maxErrors = 5;
  private static recoveryStrategies: Array<() => Promise<void>> = [];

  static initialize() {
    this.setupErrorHandlers();
    this.setupRecoveryStrategies();
    console.log('🛡️ Error Recovery System initialized');
  }

  private static setupErrorHandlers() {
    window.addEventListener('error', (event) => {
      this.handleError('JavaScript Error', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.handleError('Promise Rejection', event.reason);
      event.preventDefault();
    });

    // Network error detection
    window.addEventListener('offline', () => {
      this.handleError('Network Error', 'Application went offline');
    });
  }

  private static async handleError(type: string, error: any) {
    this.errorCount++;
    console.error(`🚨 ${type} (${this.errorCount}/${this.maxErrors}):`, error);

    if (this.errorCount >= this.maxErrors) {
      console.log('🔄 Initiating automatic recovery...');
      await this.initiateRecovery();
    }
  }

  private static setupRecoveryStrategies() {
    this.recoveryStrategies = [
      // Strategy 1: Clear caches and reload
      async () => {
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
        }
        localStorage.clear();
        sessionStorage.clear();
      },
      
      // Strategy 2: Reset application state
      async () => {
        const root = document.getElementById('root');
        if (root) {
          root.innerHTML = '';
        }
      },
      
      // Strategy 3: Full page reload
      async () => {
        window.location.reload();
      }
    ];
  }

  private static async initiateRecovery() {
    for (const strategy of this.recoveryStrategies) {
      try {
        await strategy();
        console.log('✅ Recovery strategy executed successfully');
        this.errorCount = 0;
        break;
      } catch (error) {
        console.error('❌ Recovery strategy failed:', error);
      }
    }
  }

  static showEmergencyInterface() {
    const root = document.getElementById('root') || document.body;
    root.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Tajawal', -apple-system, sans-serif; direction: rtl;">
        <div style="text-align: center; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,0.2); max-width: 500px; margin: 20px;">
          <div style="font-size: 80px; margin-bottom: 20px;">🌐</div>
          <h1 style="color: #667eea; margin-bottom: 15px; font-size: 2.5rem; font-weight: 800;">OCTA NETWORK</h1>
          <p style="color: #6b7280; margin-bottom: 25px; line-height: 1.6;">النظام يعمل في الوضع الآمن - جاري الاسترداد التلقائي</p>
          <div style="background: #fef2f2; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <p style="color: #dc2626; font-size: 0.9rem;">تم تفعيل نظام الاسترداد الذكي</p>
          </div>
          <button onclick="window.location.reload()" 
                  style="padding: 12px 24px; background: #667eea; color: white; border: none; border-radius: 25px; cursor: pointer; font-size: 16px; font-weight: bold;">
            🔄 إعادة تحميل النظام
          </button>
        </div>
      </div>
    `;
  }
}
