
// Sound effects for different actions
export const playSoundEffect = (type: 'success' | 'error' | 'click' | 'alert') => {
  const sounds = {
    success: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hV',
    error: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hV',
    click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hV',
    alert: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hVFApGn+D0uWAaAzl+1/HKfiwGJHfH8N2QQAoUXrTp66hV'
  };

  try {
    const audio = new Audio(sounds[type]);
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(console.error);
  } catch (error) {
    console.warn('Failed to play sound effect:', error);
  }
};

// Function to play notification sound
export const playNotificationSound = () => {
  playSoundEffect('alert');
};

// Function to play success sound
export const playSuccessSound = () => {
  playSoundEffect('success');
};

// Function to play error sound
export const playErrorSound = () => {
  playSoundEffect('error');
};

// Function to play click sound
export const playClickSound = () => {
  playSoundEffect('click');
};
