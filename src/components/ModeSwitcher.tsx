
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Code, 
  Shield, 
  Key,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Lock,
  Crown,
  Zap
} from 'lucide-react';

interface ModeSwitcherProps {
  onModeSelect: (mode: 'client' | 'developer') => void;
}

const ModeSwitcher = ({ onModeSelect }: ModeSwitcherProps) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleDeveloperMode = () => {
    if (password === '1996') {
      onModeSelect('developer');
    } else {
      setError('كلمة السر غير صحيحة');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDeveloperMode();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="w-full max-w-4xl relative z-10">
        <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-xl border border-white/20">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl relative">
              <Shield className="h-12 w-12 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <CardTitle className="text-4xl font-bold text-white mb-2">
                OCTA NETWORK
              </CardTitle>
              <p className="text-blue-200 text-lg">اختر وضع الدخول المناسب</p>
              <p className="text-blue-300 text-sm mt-2">منصة مراقبة الشبكات المتطورة</p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8 px-8 pb-8">
            {!showPasswordInput ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Client Mode */}
                <Card className="border-2 border-blue-400/30 hover:border-blue-400 transition-all duration-300 cursor-pointer group bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-lg hover:shadow-2xl hover:shadow-blue-500/25">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 group-hover:from-blue-300 group-hover:to-blue-500 rounded-3xl flex items-center justify-center transition-all duration-300 shadow-xl">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">وضع العميل</h3>
                      <p className="text-blue-200 text-base mb-6 leading-relaxed">
                        الوصول الكامل لجميع أدوات المراقبة والتحليل المتطورة
                      </p>
                      <div className="flex justify-center space-x-2 mb-6">
                        <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30">
                          <Crown className="h-3 w-3 mr-1" />
                          Client Mode
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-300 border border-green-400/30">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      onClick={() => onModeSelect('client')}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                    >
                      <User className="h-5 w-5 mr-2" />
                      دخول كعميل
                    </Button>
                  </CardContent>
                </Card>

                {/* Developer Mode */}
                <Card className="border-2 border-red-400/30 hover:border-red-400 transition-all duration-300 cursor-pointer group bg-gradient-to-br from-red-900/40 to-orange-800/40 backdrop-blur-lg hover:shadow-2xl hover:shadow-red-500/25">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 group-hover:from-red-300 group-hover:to-orange-400 rounded-3xl flex items-center justify-center transition-all duration-300 shadow-xl">
                      <Code className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">وضع المطور</h3>
                      <p className="text-red-200 text-base mb-6 leading-relaxed">
                        صلاحيات كاملة لإدارة النظام والتحكم المتقدم والتطوير
                      </p>
                      <div className="flex justify-center space-x-2 mb-6">
                        <Badge className="bg-red-500/20 text-red-300 border border-red-400/30">
                          <Code className="h-3 w-3 mr-1" />
                          Developer
                        </Badge>
                        <Badge className="bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
                          <Lock className="h-3 w-3 mr-1" />
                          Secured
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setShowPasswordInput(true)}
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      دخول كمطور
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-300 text-xl">
                    <Key className="h-6 w-6 mr-3" />
                    تسجيل دخول المطور
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-red-500/20 border border-red-400/40 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-400 mr-3" />
                      <span className="text-red-300 font-medium">
                        وضع المطور يتطلب كلمة سر للوصول
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-base font-semibold text-white">
                        كلمة السر
                      </label>
                      <Input
                        type="password"
                        placeholder="أدخل كلمة السر"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-center font-mono bg-white/10 border-white/20 text-white placeholder-gray-400 py-3 text-lg rounded-xl backdrop-blur-sm"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-500/20 border border-red-400/40 rounded-xl p-4">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-red-400 mr-3" />
                          <span className="text-red-300 font-medium">{error}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button 
                        type="submit" 
                        className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white py-3 text-lg font-semibold rounded-xl"
                      >
                        <CheckCircle className="h-5 w-5 mr-2" />
                        تأكيد
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowPasswordInput(false);
                          setPassword('');
                          setError('');
                        }}
                        className="flex-1 border-white/30 text-white hover:bg-white/10 py-3 text-lg font-semibold rounded-xl"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </form>

                  <div className="bg-yellow-500/20 border border-yellow-400/40 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-yellow-300 text-center font-medium">
                      💡 كلمة السر الافتراضية للتجربة: <strong className="text-yellow-200">1996</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center pt-4">
              <p className="text-white/80 text-sm font-medium">
                © 2024 OCTA NETWORK
              </p>
              <p className="text-white/60 text-xs mt-1">
                مطور بواسطة Sajad Kadhim
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModeSwitcher;
