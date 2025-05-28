
import { SmartBehavior } from './intelligent/smartBehavior';
import { UserExperience } from './intelligent/userExperience';
import { SystemHealth } from './intelligent/systemHealth';

export class IntelligentSystem {
  static initialize() {
    this.setupIntelligentBehavior();
    this.enableSmartUserExperience();
    this.monitorSystemHealth();
    console.log('🧠 Intelligent System activated');
  }

  private static setupIntelligentBehavior() {
    SmartBehavior.setupIntelligentBehavior();
  }

  private static enableSmartUserExperience() {
    UserExperience.enableSmartUserExperience();
  }

  private static monitorSystemHealth() {
    SystemHealth.monitorSystemHealth();
  }

  static getFeatures() {
    return SmartBehavior.getFeatures();
  }

  static getAnalytics() {
    return SystemHealth.getAnalytics();
  }
}
