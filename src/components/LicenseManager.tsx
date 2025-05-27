
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  Plus, 
  Trash2, 
  Clock, 
  User,
  Shield,
  Calendar
} from 'lucide-react';

interface License {
  id: string;
  name: string;
  key: string;
  expiryDate: Date;
  isActive: boolean;
  createdAt: Date;
}

const LicenseManager = () => {
  const [licenses, setLicenses] = useState<License[]>([
    {
      id: '1',
      name: 'Admin User',
      key: 'OCTA-ADMIN-2024-001',
      expiryDate: new Date('2024-12-31'),
      isActive: true,
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'Test User',
      key: 'OCTA-TEST-2024-002',
      expiryDate: new Date('2024-06-30'),
      isActive: false,
      createdAt: new Date('2024-01-15')
    }
  ]);

  const [newLicenseName, setNewLicenseName] = useState('');
  const [newLicenseExpiry, setNewLicenseExpiry] = useState('');

  const generateLicenseKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'OCTA-';
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      if (i < 3) result += '-';
    }
    return result;
  };

  const createLicense = () => {
    if (!newLicenseName || !newLicenseExpiry) return;
    
    const newLicense: License = {
      id: Date.now().toString(),
      name: newLicenseName,
      key: generateLicenseKey(),
      expiryDate: new Date(newLicenseExpiry),
      isActive: true,
      createdAt: new Date()
    };
    
    setLicenses([...licenses, newLicense]);
    setNewLicenseName('');
    setNewLicenseExpiry('');
  };

  const deleteLicense = (id: string) => {
    setLicenses(licenses.filter(license => license.id !== id));
  };

  const toggleLicense = (id: string) => {
    setLicenses(licenses.map(license => 
      license.id === id 
        ? { ...license, isActive: !license.isActive }
        : license
    ));
  };

  const isExpired = (date: Date) => {
    return new Date() > date;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="h-5 w-5 mr-2" />
            إدارة تراخيص المطور
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Create New License */}
          <Card className="border border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                إنشاء ترخيص جديد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="اسم المستخدم"
                  value={newLicenseName}
                  onChange={(e) => setNewLicenseName(e.target.value)}
                />
                <Input
                  type="date"
                  value={newLicenseExpiry}
                  onChange={(e) => setNewLicenseExpiry(e.target.value)}
                />
                <Button onClick={createLicense} className="bg-blue-600 hover:bg-blue-700">
                  إنشاء ترخيص
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* License Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {licenses.filter(l => l.isActive && !isExpired(l.expiryDate)).length}
                </div>
                <div className="text-sm text-green-700">تراخيص نشطة</div>
              </CardContent>
            </Card>
            <Card className="border border-red-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {licenses.filter(l => isExpired(l.expiryDate)).length}
                </div>
                <div className="text-sm text-red-700">تراخيص منتهية</div>
              </CardContent>
            </Card>
            <Card className="border border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {licenses.filter(l => !l.isActive).length}
                </div>
                <div className="text-sm text-yellow-700">تراخيص معطلة</div>
              </CardContent>
            </Card>
            <Card className="border border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {licenses.length}
                </div>
                <div className="text-sm text-blue-700">إجمالي التراخيص</div>
              </CardContent>
            </Card>
          </div>

          {/* License List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">قائمة التراخيص</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {licenses.map((license) => (
                  <div key={license.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-medium">{license.name}</div>
                        <div className="text-sm text-gray-500 font-mono">{license.key}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-center">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {license.expiryDate.toLocaleDateString('ar-IQ')}
                        </div>
                      </div>
                      
                      <Badge className={`
                        ${license.isActive && !isExpired(license.expiryDate) 
                          ? 'bg-green-100 text-green-700' 
                          : isExpired(license.expiryDate)
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                        }
                      `}>
                        {license.isActive && !isExpired(license.expiryDate) 
                          ? 'نشط' 
                          : isExpired(license.expiryDate)
                          ? 'منتهي'
                          : 'معطل'
                        }
                      </Badge>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleLicense(license.id)}
                        className="text-xs"
                      >
                        {license.isActive ? 'تعطيل' : 'تفعيل'}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteLicense(license.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default LicenseManager;
