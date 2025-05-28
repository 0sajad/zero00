
// نظام الصوت المتطور لـ OCTA NETWORK
export class AdvancedAudioSystem {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private volume = 0.7;
  private isEnabled = true;

  constructor() {
    this.initializeAudioContext();
    this.preloadSounds();
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      console.log('🔊 نظام الصوت المتطور - تم التهيئة بنجاح');
    } catch (error) {
      console.warn('⚠️ فشل في تهيئة نظام الصوت:', error);
    }
  }

  private async preloadSounds() {
    const soundLibrary = {
      success: this.generateTone(800, 0.2, 'sine'),
      error: this.generateTone(200, 0.5, 'sawtooth'),
      click: this.generateTone(600, 0.1, 'square'),
      notification: this.generateComplexTone([400, 600, 800], 0.3),
      scan: this.generateSweepTone(200, 1200, 2),
      speedTest: this.generatePulseTone(440, 1.5),
      security: this.generateAlarmTone(),
      startup: this.generateStartupChime(),
      shutdown: this.generateShutdownChime(),
      networkConnect: this.generateNetworkTone(true),
      networkDisconnect: this.generateNetworkTone(false),
      taskComplete: this.generateTaskCompleteTone(),
      warning: this.generateWarningTone(),
      achievement: this.generateAchievementTone(),
      typing: this.generateTypingSound()
    };

    for (const [name, audioBuffer] of Object.entries(soundLibrary)) {
      this.sounds.set(name, await audioBuffer);
    }
  }

  private async generateTone(frequency: number, duration: number, type: OscillatorType = 'sine'): Promise<AudioBuffer> {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const sampleRate = this.audioContext.sampleRate;
    const frameCount = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;
      let sample = 0;

      switch (type) {
        case 'sine':
          sample = Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'square':
          sample = Math.sign(Math.sin(2 * Math.PI * frequency * t));
          break;
        case 'sawtooth':
          sample = 2 * (frequency * t - Math.floor(frequency * t + 0.5));
          break;
        case 'triangle':
          sample = 2 * Math.abs(2 * (frequency * t - Math.floor(frequency * t + 0.5))) - 1;
          break;
      }

      // Apply envelope
      const envelope = Math.exp(-3 * t / duration);
      channelData[i] = sample * envelope * 0.3;
    }

    return buffer;
  }

  private async generateComplexTone(frequencies: number[], duration: number): Promise<AudioBuffer> {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const sampleRate = this.audioContext.sampleRate;
    const frameCount = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;
      let sample = 0;

      frequencies.forEach((freq, index) => {
        sample += Math.sin(2 * Math.PI * freq * t) / frequencies.length;
      });

      const envelope = Math.exp(-2 * t / duration);
      channelData[i] = sample * envelope * 0.2;
    }

    return buffer;
  }

  private async generateSweepTone(startFreq: number, endFreq: number, duration: number): Promise<AudioBuffer> {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const sampleRate = this.audioContext.sampleRate;
    const frameCount = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;
      const progress = t / duration;
      const frequency = startFreq + (endFreq - startFreq) * progress;
      
      const sample = Math.sin(2 * Math.PI * frequency * t);
      const envelope = Math.sin(Math.PI * progress);
      channelData[i] = sample * envelope * 0.3;
    }

    return buffer;
  }

  private async generatePulseTone(frequency: number, duration: number): Promise<AudioBuffer> {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const sampleRate = this.audioContext.sampleRate;
    const frameCount = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;
      const pulseRate = 4; // 4 Hz pulse
      const carrier = Math.sin(2 * Math.PI * frequency * t);
      const pulse = Math.sin(2 * Math.PI * pulseRate * t) > 0 ? 1 : 0;
      
      channelData[i] = carrier * pulse * 0.2;
    }

    return buffer;
  }

  private async generateAlarmTone(): Promise<AudioBuffer> {
    return this.generateComplexTone([800, 1000, 1200], 1.0);
  }

  private async generateStartupChime(): Promise<AudioBuffer> {
    return this.generateComplexTone([261.63, 329.63, 392.00, 523.25], 1.5);
  }

  private async generateShutdownChime(): Promise<AudioBuffer> {
    return this.generateComplexTone([523.25, 392.00, 329.63, 261.63], 1.5);
  }

  private async generateNetworkTone(connected: boolean): Promise<AudioBuffer> {
    if (connected) {
      return this.generateComplexTone([440, 554.37, 659.25], 0.8);
    } else {
      return this.generateComplexTone([659.25, 554.37, 440], 0.8);
    }
  }

  private async generateTaskCompleteTone(): Promise<AudioBuffer> {
    return this.generateComplexTone([523.25, 659.25, 783.99, 1046.50], 1.2);
  }

  private async generateWarningTone(): Promise<AudioBuffer> {
    return this.generateSweepTone(300, 600, 0.5);
  }

  private async generateAchievementTone(): Promise<AudioBuffer> {
    return this.generateComplexTone([523.25, 659.25, 783.99, 1046.50, 1318.51], 2.0);
  }

  private async generateTypingSound(): Promise<AudioBuffer> {
    return this.generateTone(800, 0.05, 'square');
  }

  public async playSound(soundName: string, volume?: number): Promise<void> {
    if (!this.isEnabled || !this.audioContext) return;

    const audioBuffer = this.sounds.get(soundName);
    if (!audioBuffer) {
      console.warn(`🔇 الصوت غير موجود: ${soundName}`);
      return;
    }

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = audioBuffer;
      gainNode.gain.value = (volume ?? this.volume) * 0.5;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start();
      
      console.log(`🔊 تشغيل الصوت: ${soundName}`);
    } catch (error) {
      console.error(`❌ خطأ في تشغيل الصوت ${soundName}:`, error);
    }
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  public async playSequence(sounds: string[], interval: number = 200): Promise<void> {
    for (let i = 0; i < sounds.length; i++) {
      await this.playSound(sounds[i]);
      if (i < sounds.length - 1) {
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }
  }

  public async playRandomSound(soundGroup: string[]): Promise<void> {
    const randomSound = soundGroup[Math.floor(Math.random() * soundGroup.length)];
    await this.playSound(randomSound);
  }
}

// Global audio instance
export const audioSystem = new AdvancedAudioSystem();

// Sound helper functions
export const playSuccessSound = () => audioSystem.playSound('success');
export const playErrorSound = () => audioSystem.playSound('error');
export const playClickSound = () => audioSystem.playSound('click');
export const playNotificationSound = () => audioSystem.playSound('notification');
export const playScanSound = () => audioSystem.playSound('scan');
export const playSpeedTestSound = () => audioSystem.playSound('speedTest');
export const playSecuritySound = () => audioSystem.playSound('security');
export const playStartupSound = () => audioSystem.playSound('startup');
export const playShutdownSound = () => audioSystem.playSound('shutdown');
export const playNetworkConnectSound = () => audioSystem.playSound('networkConnect');
export const playNetworkDisconnectSound = () => audioSystem.playSound('networkDisconnect');
export const playTaskCompleteSound = () => audioSystem.playSound('taskComplete');
export const playWarningSound = () => audioSystem.playSound('warning');
export const playAchievementSound = () => audioSystem.playSound('achievement');
export const playTypingSound = () => audioSystem.playSound('typing');
