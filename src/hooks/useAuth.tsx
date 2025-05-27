
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, UserSession, AuthState, Permission, UserMode } from '@/types/user.types';

interface AuthContextType extends AuthState {
  login: (mode: UserMode, credentials?: { name: string; key: string }) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permissionId: string) => boolean;
  hasRole: (role: UserMode) => boolean;
  switchMode: (mode: UserMode) => boolean;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultPermissions: Record<UserMode, Permission[]> = {
  'client': [
    { id: 'network.read', name: 'مراقبة الشبكة', description: 'عرض حالة الشبكة', category: 'network', level: 'read' },
    { id: 'security.read', name: 'عرض الأمان', description: 'عرض تقارير الأمان', category: 'security', level: 'read' },
    { id: 'system.read', name: 'عرض النظام', description: 'عرض معلومات النظام', category: 'system', level: 'read' }
  ],
  'developer': [
    { id: 'network.write', name: 'تحكم بالشبكة', description: 'تعديل إعدادات الشبكة', category: 'network', level: 'write' },
    { id: 'security.write', name: 'إدارة الأمان', description: 'تعديل إعدادات الأمان', category: 'security', level: 'write' },
    { id: 'system.write', name: 'إدارة النظام', description: 'تعديل إعدادات النظام', category: 'system', level: 'write' },
    { id: 'admin.read', name: 'عرض الإدارة', description: 'عرض لوحة الإدارة', category: 'admin', level: 'read' }
  ],
  'admin': [
    { id: 'admin.write', name: 'إدارة كاملة', description: 'صلاحيات إدارية كاملة', category: 'admin', level: 'admin' },
    { id: 'system.admin', name: 'إدارة النظام', description: 'تحكم كامل بالنظام', category: 'system', level: 'admin' }
  ],
  'super-admin': [
    { id: 'global.admin', name: 'إدارة عالمية', description: 'صلاحيات عالمية كاملة', category: 'admin', level: 'admin' }
  ]
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    session: null,
    permissions: [],
    loading: true
  });

  useEffect(() => {
    // استرجاع الجلسة المحفوظة
    const savedSession = localStorage.getItem('octaSession');
    if (savedSession) {
      try {
        const session: UserSession = JSON.parse(savedSession);
        if (new Date() < new Date(session.expiresAt)) {
          setAuthState({
            isAuthenticated: true,
            user: session.user,
            session,
            permissions: session.permissions,
            loading: false
          });
        } else {
          localStorage.removeItem('octaSession');
          setAuthState(prev => ({ ...prev, loading: false }));
        }
      } catch {
        localStorage.removeItem('octaSession');
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (mode: UserMode, credentials?: { name: string; key: string }): Promise<boolean> => {
    try {
      let user: User;
      
      if (mode === 'developer' && credentials?.key === '1996') {
        user = {
          id: 'dev-001',
          name: credentials.name || 'Developer',
          key: credentials.key,
          mode,
          permissions: [...defaultPermissions.client, ...defaultPermissions.developer],
          createdAt: new Date(),
          lastLogin: new Date(),
          isActive: true
        };
      } else if (mode === 'client') {
        user = {
          id: 'client-001',
          name: credentials?.name || 'Client User',
          key: credentials?.key || 'CLIENT-ACCESS',
          mode,
          permissions: defaultPermissions.client,
          createdAt: new Date(),
          lastLogin: new Date(),
          isActive: true
        };
      } else {
        return false;
      }

      const session: UserSession = {
        user,
        token: `token-${Date.now()}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 ساعة
        permissions: user.permissions
      };

      localStorage.setItem('octaSession', JSON.stringify(session));
      setAuthState({
        isAuthenticated: true,
        user,
        session,
        permissions: user.permissions,
        loading: false
      });

      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('octaSession');
    setAuthState({
      isAuthenticated: false,
      user: null,
      session: null,
      permissions: [],
      loading: false
    });
  };

  const hasPermission = (permissionId: string): boolean => {
    return authState.permissions.some(p => p.id === permissionId);
  };

  const hasRole = (role: UserMode): boolean => {
    return authState.user?.mode === role;
  };

  const switchMode = (mode: UserMode): boolean => {
    if (!authState.user) return false;
    
    // يمكن للمطور التبديل للعميل
    if (authState.user.mode === 'developer' && mode === 'client') {
      const updatedUser = { ...authState.user, mode };
      const updatedSession = { 
        ...authState.session!, 
        user: updatedUser,
        permissions: defaultPermissions.client
      };
      
      localStorage.setItem('octaSession', JSON.stringify(updatedSession));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
        session: updatedSession,
        permissions: defaultPermissions.client
      }));
      return true;
    }
    
    return false;
  };

  const refreshSession = () => {
    if (authState.session) {
      const updatedSession = {
        ...authState.session,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      };
      localStorage.setItem('octaSession', JSON.stringify(updatedSession));
      setAuthState(prev => ({ ...prev, session: updatedSession }));
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    hasPermission,
    hasRole,
    switchMode,
    refreshSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
