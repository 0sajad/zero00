
import { UniversalRouter } from '../universalRouter';
import { PerformanceMonitor } from '../performanceMonitor';
import { ErrorRecovery } from '../errorRecovery';
import { SystemValidator } from '../systemValidator';
import { DeploymentOptimizer } from '../deploymentOptimizer';
import { IntelligentSystem } from '../intelligentSystem';
import { ProductionValidator } from '../productionValidator';
import { PerformanceOptimizer } from '../performanceOptimizer';
import { AssetOptimizer } from '../assetOptimizer';
import { WebVitalsMonitor } from '../webVitalsMonitor';
import { HTTPSConfig } from '../httpsConfig';

export class SystemInitializer {
  static async initializeAllSystems() {
    console.log('⚙️ بدء تهيئة النظام الشامل مع تحسينات الأداء...');
    
    HTTPSConfig.enableHTTPSRedirect();
    
    PerformanceOptimizer.initialize();
    AssetOptimizer.initialize();
    WebVitalsMonitor.initialize();
    
    UniversalRouter.initialize();
    PerformanceMonitor.initialize();
    ErrorRecovery.initialize();
    DeploymentOptimizer.initialize();
    IntelligentSystem.initialize();
    
    const systemValid = await SystemValidator.runComprehensiveTests();
    
    if (systemValid) {
      console.log('✅ النظام محسن وجاهز للعمل على أي منصة');
      
      const productionReady = await ProductionValidator.runCompleteProductionValidation();
      if (productionReady) {
        console.log('🎉 Production validation passed - Optimized and ready for deployment');
        console.log(ProductionValidator.generateProductionReport());
      }
      
      return true;
    } else {
      console.warn('⚠️ تم اكتشاف مشاكل في النظام، جاري الإصلاح...');
      return false;
    }
  }
}
