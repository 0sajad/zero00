
export interface User {
  id: string;
  name: string;
  email?: string;
  key: string;
  mode: UserMode;
  permissions: Permission[];
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'network' | 'security' | 'system' | 'admin';
  level: 'read' | 'write' | 'admin';
}

export interface UserSession {
  user: User;
  token: string;
  expiresAt: Date;
  permissions: Permission[];
}

export type UserMode = 'client' | 'developer' | 'admin' | 'super-admin';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  session: UserSession | null;
  permissions: Permission[];
  loading: boolean;
}

// إضافة أنواع جديدة لضمان الاستقرار
export interface SystemInfo {
  version: string;
  build: string;
  environment: 'development' | 'production';
  features: string[];
}

export interface NetworkConfig {
  timeout: number;
  retries: number;
  endpoints: Record<string, string>;
}

export interface SecuritySettings {
  enforceHttps: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
}
