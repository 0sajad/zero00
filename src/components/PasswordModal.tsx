
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Key,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface PasswordModalProps {
  onSubmit: (password: string) => boolean;
  onCancel: () => void;
}

const PasswordModal = ({ onSubmit, onCancel }: PasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onSubmit(password);
    if (!success) {
      setError('كلمة السر غير صحيحة');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
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

        <form onSubmit={handleSubmit} className="space-y-6">
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
              onClick={onCancel}
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
  );
};

export default PasswordModal;
