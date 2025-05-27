
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Shield, 
  Clock, 
  Key,
  LogOut,
  Settings,
  Crown
} from 'lucide-react';

const UserProfile = () => {
  const { user, session, permissions, logout, hasRole } = useAuth();

  if (!user || !session) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'client': return 'bg-blue-500';
      case 'developer': return 'bg-purple-500';
      case 'admin': return 'bg-orange-500';
      case 'super-admin': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'client': return <User className="h-4 w-4" />;
      case 'developer': return <Settings className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'super-admin': return <Crown className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6" />
            <span>ملف المستخدم</span>
          </div>
          <Badge className={`${getModeColor(user.mode)} text-white`}>
            {getModeIcon(user.mode)}
            <span className="mr-2">{user.mode}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* معلومات المستخدم الأساسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">الاسم</label>
            <div className="p-3 bg-gray-50 rounded-lg border">
              {user.name}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">معرف المستخدم</label>
            <div className="p-3 bg-gray-50 rounded-lg border font-mono text-sm">
              {user.id}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">آخر تسجيل دخول</label>
            <div className="p-3 bg-gray-50 rounded-lg border flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{formatDate(user.lastLogin)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">انتهاء الجلسة</label>
            <div className="p-3 bg-gray-50 rounded-lg border flex items-center">
              <Key className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{formatDate(session.expiresAt)}</span>
            </div>
          </div>
        </div>

        {/* الصلاحيات */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            الصلاحيات المتاحة
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {permissions.map((permission) => (
              <Card key={permission.id} className="border border-gray-200">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{permission.name}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        permission.level === 'admin' ? 'border-red-500 text-red-600' :
                        permission.level === 'write' ? 'border-orange-500 text-orange-600' :
                        'border-blue-500 text-blue-600'
                      }`}
                    >
                      {permission.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{permission.description}</p>
                  <Badge variant="secondary" className="text-xs mt-2">
                    {permission.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* إحصائيات الجلسة */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {permissions.length}
              </div>
              <div className="text-sm text-green-700">صلاحية</div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {user.isActive ? 'نشط' : 'غير نشط'}
              </div>
              <div className="text-sm text-blue-700">الحالة</div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                24h
              </div>
              <div className="text-sm text-purple-700">مدة الجلسة</div>
            </CardContent>
          </Card>
        </div>

        {/* إجراءات */}
        <div className="flex justify-end pt-4 border-t">
          <Button 
            onClick={logout}
            variant="destructive"
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
