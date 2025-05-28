
import { useState, useEffect } from 'react';

interface User {
  name: string;
  key: string;
  mode: 'client' | 'developer';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  currentMode: 'client' | 'developer' | null;
}

export const useAuthSystem = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    currentMode: null
  });

  const login = async (mode: 'client' | 'developer', credentials: { name: string; key: string }) => {
    console.log('🔐 محاولة تسجيل الدخول:', { mode, name: credentials.name });
    
    // تحقق من صحة البيانات
    if (mode === 'client') {
      // العميل لا يحتاج كلمة سر
      if (!credentials.name.trim()) {
        return false;
      }
      
      setAuthState({
        isAuthenticated: true,
        user: { ...credentials, mode },
        currentMode: mode
      });
      
      console.log('✅ تم تسجيل دخول العميل بنجاح');
      return true;
      
    } else if (mode === 'developer') {
      // المطور يحتاج كلمة سر
      if (!credentials.name.trim() || credentials.key !== '1996') {
        console.log('❌ كلمة السر خاطئة للمطور');
        return false;
      }
      
      setAuthState({
        isAuthenticated: true,
        user: { ...credentials, mode },
        currentMode: mode
      });
      
      console.log('✅ تم تسجيل دخول المطور بنجاح');
      return true;
    }
    
    return false;
  };

  const logout = () => {
    console.log('🚪 تسجيل الخروج');
    setAuthState({
      isAuthenticated: false,
      user: null,
      currentMode: null
    });
  };

  const selectMode = (mode: 'client' | 'developer') => {
    console.log('🔄 تغيير الوضع إلى:', mode);
    if (authState.user) {
      setAuthState(prev => ({
        ...prev,
        currentMode: mode,
        user: prev.user ? { ...prev.user, mode } : null
      }));
    }
  };

  return {
    ...authState,
    login,
    logout,
    selectMode
  };
};
