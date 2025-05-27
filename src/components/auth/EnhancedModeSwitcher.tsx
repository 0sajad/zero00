
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { 
  Shield,
  Globe,
  Server,
  Zap,
  Crown,
  Key,
  User,
  Settings,
  Lock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const EnhancedModeSwitcher = () => {
  const { login } = useAuth();
  const [selectedMode, setSelectedMode] = useState<'client' | 'developer' | null>(null);
  const [credentials, setCredentials] = useState({ name: '', key: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const modes = [
    {
      id: 'client' as const,
      title: 'وضع العميل',
      subtitle: 'Client Mode',
      description: 'وصول كامل لجميع أدوات مراقبة الشبكة والأمان',
      icon: <User className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500',
      badge: 'Premium Access',
      features: [
        'مراقبة الشبكة المتقدمة',
        'أدوات الأمان الشاملة', 
        'تحليل الأداء',
        'تقارير مفصلة'
      ]
    },
    {
      id: 'developer' as const,
      title: 'وضع المطور',
      subtitle: 'Developer Mode',
      description: 'صلاحيات إدارية كاملة مع أدوات التطوير المتقدمة',
      icon: <Settings className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      badge: 'Full Control',
      features: [
        'تحكم كامل بالنظام',
        'محرر الأكواد',
        'إدارة التراخيص',
        'أدوات التشخيص المتقدمة'
      ]
    }
  ];

  const handleModeSelect = (mode: 'client' | 'developer') => {
    setSelectedMode(mode);
    setError('');
    if (mode === 'client') {
      setCredentials({ name: 'Client User', key: 'CLIENT-ACCESS' });
    } else {
      setCredentials({ name: '', key: '' });
    }
  };

  const handleLogin = async () => {
    if (!selectedMode) return;
    
    setLoading(true);
    setError('');
    
    try {
      const success = await login(selectedMode, credentials);
      if (!success) {
        setError('فشل في تسجيل الدخول - تحقق من البيانات');
      }
    } catch {
      setError('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedMode(null);
    setCredentials({ name: '', key: '' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="w-full max-w-5xl relative z-10">
        <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-xl border border-white/20">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto w-28 h-28 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl relative">
              <Shield className="h-14 w-14 text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-5xl font-bold text-white mb-4 tracking-wide">
                OCTA NETWORK
              </CardTitle>
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-4 py-2">
                  <Server className="h-4 w-4 mr-2" />
                  Enterprise Edition
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-2">
                  <Zap className="h-4 w-4 mr-2" />
                  Professional
                </Badge>
              </div>
              <p className="text-blue-200 text-xl font-medium">منصة مراقبة الشبكات المتطورة</p>
              <p className="text-blue-300 text-base mt-2">نظام إدارة محسن مع صلاحيات متقدمة</p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8 px-8 pb-8">
            {!selectedMode ? (
              // عرض الأوضاع المتاحة
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {modes.map((mode) => (
                  <Card 
                    key={mode.id}
                    className="border-2 border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                    onClick={() => handleModeSelect(mode.id)}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${mode.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                        {mode.icon}
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">{mode.title}</h3>
                        <p className="text-blue-200 text-sm mb-3">{mode.subtitle}</p>
                        <Badge className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-3 py-1">
                          {mode.badge}
                        </Badge>
                      </div>
                      
                      <p className="text-blue-100 text-center text-sm leading-relaxed">
                        {mode.description}
                      </p>
                      
                      <div className="space-y-2">
                        {mode.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-blue-200">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // نموذج تسجيل الدخول
              <Card className="border-2 border-white/30 bg-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-white text-xl">
                    <Key className="h-6 w-6 mr-3" />
                    تسجيل الدخول - {modes.find(m => m.id === selectedMode)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedMode === 'developer' && (
                    <div className="bg-red-500/20 border border-red-400/40 rounded-xl p-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-400 mr-3" />
                        <span className="text-red-300 font-medium">
                          وضع المطور يتطلب كلمة سر للوصول
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-white font-medium block mb-2">الاسم</label>
                      <Input
                        placeholder="أدخل اسمك"
                        value={credentials.name}
                        onChange={(e) => setCredentials(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                    
                    {selectedMode === 'developer' && (
                      <div>
                        <label className="text-white font-medium block mb-2">كلمة السر</label>
                        <Input
                          type="password"
                          placeholder="أدخل كلمة السر"
                          value={credentials.key}
                          onChange={(e) => setCredentials(prev => ({ ...prev, key: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        />
                        <p className="text-yellow-300 text-sm mt-2">
                          💡 كلمة السر الافتراضية: <strong>1996</strong>
                        </p>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="bg-red-500/20 border border-red-400/40 rounded-xl p-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-400 mr-3" />
                        <span className="text-red-300">{error}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Button 
                      onClick={handleLogin}
                      disabled={loading || !credentials.name || (selectedMode === 'developer' && !credentials.key)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white"
                    >
                      {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
                    </Button>
                    <Button 
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1 border-white/30 text-white hover:bg-white/10"
                    >
                      رجوع
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center pt-6 border-t border-white/20">
              <p className="text-white/90 text-lg font-bold">OCTA NETWORK</p>
              <p className="text-white/70 text-sm mt-2">
                مطور بواسطة Sajad Kadhim - Enhanced Security System
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedModeSwitcher;
