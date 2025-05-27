
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface FinalReportCardProps {
  overallScore: number;
  timestamp: string;
}

export const FinalReportCard = ({ overallScore, timestamp }: FinalReportCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-800">التقرير النهائي</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-800 mb-2">الموقع جاهز للعمل على أي منصة</h3>
              <p className="text-green-700 text-sm mb-3">
                الموقع متوافق بنسبة {overallScore}% مع جميع المنصات والخوادم. 
                يمكن استضافته على GitHub Pages أو أي نطاق خارجي بدون أي مشاكل.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>منصات الاستضافة المدعومة:</strong>
                  <ul className="list-disc list-inside text-green-600 mt-1">
                    <li>GitHub Pages (مُحسن تماماً)</li>
                    <li>Netlify, Vercel</li>
                    <li>Apache, Nginx</li>
                    <li>أي استضافة HTML/JS</li>
                  </ul>
                </div>
                <div>
                  <strong>المميزات التقنية:</strong>
                  <ul className="list-disc list-inside text-green-600 mt-1">
                    <li>تصميم متجاوب 100%</li>
                    <li>سرعة تحميل ممتازة</li>
                    <li>أمان متقدم</li>
                    <li>SEO محسن</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 text-center mt-4 pt-4 border-t">
          تم إجراء الفحص في: {timestamp} | 
          فحص شامل بواسطة OCTA NETWORK Compatibility Engine
        </div>
      </CardContent>
    </Card>
  );
};
