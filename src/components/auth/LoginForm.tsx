
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Key, AlertTriangle } from 'lucide-react';

interface LoginFormProps {
  selectedMode: 'client' | 'developer';
  onLogin: (mode: 'client' | 'developer', credentials: { name: string; key: string }) => Promise<boolean>;
  onBack: () => void;
}

const LoginForm = ({ selectedMode, onLogin, onBack }: LoginFormProps) => {
  const [credentials, setCredentials] = useState({ 
    name: selectedMode === 'client' ? 'Client User' : '', 
    key: selectedMode === 'client' ? 'CLIENT-ACCESS' : '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const success = await onLogin(selectedMode, credentials);
      if (!success) {
        setError('فشل في تسجيل الدخول - تحقق من البيانات');
      }
    } catch {
      setError('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-white/30 bg-white/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-white text-xl">
          <Key className="h-6 w-6 mr-3" />
          تسجيل الدخول - {selectedMode === 'client' ? 'وضع العميل' : 'وضع المطور'}
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
            onClick={onBack}
            variant="outline"
            className="flex-1 border-white/30 text-white hover:bg-white/10"
          >
            رجوع
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
