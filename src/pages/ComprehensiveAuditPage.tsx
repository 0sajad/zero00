
import React from 'react';
import ComprehensiveSystemAudit from '@/components/ComprehensiveSystemAudit';
import AdvancedNetworkToolsCollection from '@/components/AdvancedNetworkToolsCollection';
import DetailedHelpSystem from '@/components/DetailedHelpSystem';
import UniversalCompatibilityChecker from '@/components/UniversalCompatibilityChecker';
import FinalSystemReport from '@/components/FinalSystemReport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ComprehensiveAuditPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            OCTA NETWORK - التحليل الشامل المتطور
          </h1>
          <p className="text-xl text-gray-600">
            منصة متطورة للفحص الشامل وأدوات الشبكات المتقدمة
          </p>
        </div>

        <Tabs defaultValue="audit" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="audit">الفحص الشامل</TabsTrigger>
            <TabsTrigger value="tools">الأدوات المتقدمة</TabsTrigger>
            <TabsTrigger value="compatibility">التوافق</TabsTrigger>
            <TabsTrigger value="help">المساعدة</TabsTrigger>
            <TabsTrigger value="report">التقرير النهائي</TabsTrigger>
          </TabsList>

          <TabsContent value="audit" className="mt-6">
            <ComprehensiveSystemAudit />
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <AdvancedNetworkToolsCollection />
          </TabsContent>

          <TabsContent value="compatibility" className="mt-6">
            <UniversalCompatibilityChecker />
          </TabsContent>

          <TabsContent value="help" className="mt-6">
            <DetailedHelpSystem />
          </TabsContent>

          <TabsContent value="report" className="mt-6">
            <FinalSystemReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveAuditPage;
