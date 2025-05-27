
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  User, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface LicenseValidationProps {
  onValidLicense: (name: string, key: string) => void;
}

const LicenseValidation = ({ onValidLicense }: LicenseValidationProps) => {
  const [name, setName] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample valid licenses for demo
  const validLicenses = [
    { 
      name: 'Admin User', 
      key: 'OCTA-ADMIN-2024-001', 
      expiry: new Date('2024-12-31'),
      active: true 
    },
    { 
      name: 'Test User', 
      key: 'OCTA-TEST-2024-002', 
      expiry: new Date('2024-06-30'),
      active: true 
    },
    { 
      name: 'Demo User', 
      key: 'OCTA-DEMO-2024-003', 
      expiry: new Date('2025-01-31'),
      active: true 
    }
  ];

  const validateLicense = () => {
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const license = validLicenses.find(
        l => l.name.toLowerCase() === name.toLowerCase() && 
             l.key === licenseKey &&
             l.active &&
             new Date() <= l.expiry
      );

      if (license) {
        onValidLicense(name, licenseKey);
      } else {
        setError('اسم المستخدم أو مفتاح الترخيص غير صحيح أو منتهي الصلاحية');
      }
      
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && licenseKey.trim()) {
      validateLicense();
    } else {
      setError('يرجى إدخال اسم المستخدم ومفتاح الترخيص');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                OCTA NETWORK
              </CardTitle>
              <p className="text-gray-600 mt-2">تسجيل دخول النظام المحمي</p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* License Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Key className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">معلومات الترخيص</span>
              </div>
              <p className="text-xs text-blue-700">
                يتطلب هذا النظام ترخيصاً صالحاً للوصول. يرجى إدخال اسم المستخدم ومفتاح الترخيص المخصص لك.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  اسم المستخدم
                </label>
                <Input
                  type="text"
                  placeholder="أدخل اسم المستخدم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-right"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  مفتاح الترخيص
                </label>
                <Input
                  type="text"
                  placeholder="OCTA-XXXX-XXXX-XXXX"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                  className="font-mono text-center"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    جاري التحقق...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    تسجيل الدخول
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Licenses */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Clock className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">تراخيص تجريبية</span>
              </div>
              <div className="space-y-2 text-xs">
                {validLicenses.map((license, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{license.name}</span>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      {license.key}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

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

export default LicenseValidation;
