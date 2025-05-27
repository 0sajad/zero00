
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
  CheckCircle
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                OCTA NETWORK
              </CardTitle>
              <p className="text-gray-600 mt-2">اختر وضع الدخول المناسب</p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!showPasswordInput ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client Mode */}
                <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer group">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-2xl flex items-center justify-center transition-colors">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">وضع العميل</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        الوصول العادي لجميع الأدوات والخدمات
                      </p>
                      <Badge className="bg-blue-100 text-blue-700 mb-4">
                        Client Mode
                      </Badge>
                    </div>
                    <Button 
                      onClick={() => onModeSelect('client')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      دخول كعميل
                    </Button>
                  </CardContent>
                </Card>

                {/* Developer Mode */}
                <Card className="border-2 border-red-200 hover:border-red-400 transition-colors cursor-pointer group">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-red-100 group-hover:bg-red-200 rounded-2xl flex items-center justify-center transition-colors">
                      <Code className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">وضع المطور</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        صلاحيات كاملة لإدارة النظام والتحكم المتقدم
                      </p>
                      <Badge className="bg-red-100 text-red-700 mb-4">
                        Developer Mode
                      </Badge>
                    </div>
                    <Button 
                      onClick={() => setShowPasswordInput(true)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      دخول كمطور
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-2 border-red-500 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Key className="h-5 w-5 mr-2" />
                    تسجيل دخول المطور
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-sm text-red-700">
                        وضع المطور يتطلب كلمة سر للوصول
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        كلمة السر
                      </label>
                      <Input
                        type="password"
                        placeholder="أدخل كلمة السر"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-center font-mono"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                          <span className="text-sm text-red-700">{error}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-3">
                      <Button 
                        type="submit" 
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
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
                        className="flex-1"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </form>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-700">
                      💡 كلمة السر الافتراضية للتجربة: <strong>1996</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center">
              <p className="text-xs text-gray-500">
                © 2024 OCTA NETWORK - Professional Edition
              </p>
              <p className="text-xs text-gray-400 mt-1">
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
