
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Search, 
  BookOpen,
  ArrowLeft
} from 'lucide-react';

interface HelpCenterProps {
  onBack?: () => void;
}

const HelpCenter = ({ onBack }: HelpCenterProps = {}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const helpTopics = [
    { title: 'كيفية استخدام اختبار السرعة', category: 'أساسيات', difficulty: 'مبتدئ' },
    { title: 'فهم نتائج فحص المنافذ', category: 'أمان', difficulty: 'متوسط' },
    { title: 'مراقبة أداء الشبكة', category: 'مراقبة', difficulty: 'متقدم' },
    { title: 'حل مشاكل الاتصال', category: 'استكشاف الأخطاء', difficulty: 'متوسط' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <HelpCircle className="h-6 w-6 mr-3" />
              مركز المساعدة
              <Badge className="ml-3 bg-blue-600 text-white">دليل شامل</Badge>
            </CardTitle>
            {onBack && (
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                العودة
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ابحث في المساعدة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Help Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {helpTopics.map((topic, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <BookOpen className="h-5 w-5 text-blue-600 mt-1" />
                <Badge variant="outline">{topic.difficulty}</Badge>
              </div>
              <h3 className="font-medium text-lg mb-2">{topic.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{topic.category}</p>
              <Button size="sm" className="w-full">
                قراءة الدليل
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
