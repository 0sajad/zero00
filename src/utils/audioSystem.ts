
interface AudioTrack {
  id: string;
  name: string;
  src: string;
  volume: number;
  loop: boolean;
}

interface SoundEffect {
  id: string;
  name: string;
  volume: number;
  category: 'ui' | 'notification' | 'system' | 'feedback';
}

class AdvancedAudioSystem {
  private audioContext: AudioContext | null = null;
  private tracks: Map<string, HTMLAudioElement> = new Map();
  private soundEffects: Map<string, AudioBuffer> = new Map();
  private masterVolume: number = 0.8;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;

  constructor() {
    this.initializeAudioSystem();
  }

  private async initializeAudioSystem(): Promise<void> {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await this.loadSoundEffects();
      this.isInitialized = true;
      console.log('🎵 نظام الصوت المتقدم - تم التهيئة بنجاح');
    } catch (error) {
      console.warn('⚠️ فشل في تهيئة نظام الصوت:', error);
    }
  }

  private async loadSoundEffects(): Promise<void> {
    const soundEffects: SoundEffect[] = [
      { id: 'startup', name: 'صوت البدء', volume: 0.6, category: 'system' },
      { id: 'click', name: 'نقرة', volume: 0.4, category: 'ui' },
      { id: 'hover', name: 'تمرير', volume: 0.2, category: 'ui' },
      { id: 'notification', name: 'إشعار', volume: 0.7, category: 'notification' },
      { id: 'success', name: 'نجاح', volume: 0.8, category: 'feedback' },
      { id: 'error', name: 'خطأ', volume: 0.6, category: 'feedback' },
      { id: 'scan', name: 'مسح', volume: 0.5, category: 'system' },
      { id: 'speedTest', name: 'اختبار السرعة', volume: 0.7, category: 'system' },
      { id: 'taskComplete', name: 'اكتمال المهمة', volume: 0.8, category: 'feedback' }
    ];

    // محاكاة تحميل الأصوات
    for (const effect of soundEffects) {
      // في التطبيق الحقيقي، ستقوم بتحميل الملفات الصوتية الفعلية
      this.soundEffects.set(effect.id, await this.createSynthesizedSound(effect));
    }
  }

  private async createSynthesizedSound(effect: SoundEffect): Promise<AudioBuffer> {
    if (!this.audioContext) throw new Error('Audio context not initialized');

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.3; // مدة الصوت بالثواني
    const frameCount = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
    const channelData = buffer.getChannelData(0);

    // إنشاء أصوات مختلفة حسب النوع
    for (let i = 0; i < frameCount; i++) {
      const progress = i / frameCount;
      let sample = 0;

      switch (effect.category) {
        case 'ui':
          // نغمة قصيرة وناعمة
          sample = Math.sin(2 * Math.PI * 800 * progress) * (1 - progress) * 0.3;
          break;
        case 'notification':
          // نغمة متعددة التردد
          sample = (Math.sin(2 * Math.PI * 600 * progress) + Math.sin(2 * Math.PI * 900 * progress)) * (1 - progress) * 0.4;
          break;
        case 'system':
          // نغمة تقنية
          sample = Math.sin(2 * Math.PI * 440 * progress) * Math.sin(10 * Math.PI * progress) * (1 - progress) * 0.5;
          break;
        case 'feedback':
          // نغمة واضحة
          sample = Math.sin(2 * Math.PI * 523 * progress) * (1 - Math.pow(progress, 2)) * 0.6;
          break;
      }

      channelData[i] = sample * effect.volume;
    }

    return buffer;
  }

  async playSound(soundId: string): Promise<void> {
    if (!this.isInitialized || this.isMuted) return;

    try {
      const buffer = this.soundEffects.get(soundId);
      if (!buffer || !this.audioContext) return;

      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = buffer;
      gainNode.gain.value = this.masterVolume;

      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      source.start(0);
      console.log(`🔊 تشغيل الصوت: ${soundId}`);
    } catch (error) {
      console.warn(`⚠️ فشل في تشغيل الصوت ${soundId}:`, error);
    }
  }

  async playSequence(soundIds: string[], interval: number = 200): Promise<void> {
    for (let i = 0; i < soundIds.length; i++) {
      await this.playSound(soundIds[i]);
      if (i < soundIds.length - 1) {
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }
  }

  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    console.log(`🔊 مستوى الصوت الرئيسي: ${this.masterVolume * 100}%`);
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    console.log(`🔇 كتم الصوت: ${this.isMuted ? 'مفعل' : 'معطل'}`);
  }

  // تشغيل موسيقى خلفية
  async playBackgroundMusic(trackId: string, loop: boolean = true): Promise<void> {
    // سيتم تنفيذها لاحقاً مع ملفات الموسيقى الفعلية
    console.log(`🎵 تشغيل الموسيقى الخلفية: ${trackId}`);
  }

  // إيقاف جميع الأصوات
  stopAllSounds(): void {
    this.tracks.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    console.log('⏹️ تم إيقاف جميع الأصوات');
  }

  // تحليل الصوت المحيط (للمايك)
  async analyzeAmbientSound(): Promise<number> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = this.audioContext!.createMediaStreamSource(stream);
      const analyser = this.audioContext!.createAnalyser();
      
      source.connect(analyser);
      analyser.fftSize = 256;
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      analyser.getByteFrequencyData(dataArray);
      
      // حساب متوسط الصوت
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      
      // إيقاف الدفق
      stream.getTracks().forEach(track => track.stop());
      
      return average / 255; // إرجاع قيمة بين 0 و 1
    } catch (error) {
      console.warn('⚠️ فشل في تحليل الصوت المحيط:', error);
      return 0;
    }
  }

  // معلومات حالة النظام
  getSystemStatus(): {
    initialized: boolean;
    muted: boolean;
    volume: number;
    effectsLoaded: number;
    tracksLoaded: number;
  } {
    return {
      initialized: this.isInitialized,
      muted: this.isMuted,
      volume: this.masterVolume,
      effectsLoaded: this.soundEffects.size,
      tracksLoaded: this.tracks.size
    };
  }
}

// إنشاء مثيل عالمي
export const audioSystem = new AdvancedAudioSystem();

// تصدير للاستخدام المباشر
export default audioSystem;
