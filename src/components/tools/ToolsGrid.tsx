
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, CheckCircle, XCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { audioSystem } from '@/utils/audioSystem';

interface Tool {
  id: string;
  name: string;
  category: string;
}

interface ToolResult {
  id: string;
  name: string;
  status: 'running' | 'success' | 'error' | 'idle';
  progress: number;
  result?: any;
  timestamp?: Date;
}

interface ToolsGridProps {
  tools: Tool[];
}

const ToolsGrid = ({ tools }: ToolsGridProps) => {
  const { toast } = useToast();
  const [activeTools, setActiveTools] = useState<Map<string, ToolResult>>(new Map());

  const runTool = async (toolId: string, toolName: string) => {
    const newResult: ToolResult = {
      id: toolId,
      name: toolName,
      status: 'running',
      progress: 0,
      timestamp: new Date()
    };

    setActiveTools(prev => {
      const updatedMap = new Map(prev);
      updatedMap.set(toolId, newResult);
      return updatedMap;
    });
    
    await audioSystem.playSound('scan');

    toast({
      title: `🚀 بدء تشغيل ${toolName}`,
      description: "جاري تحليل النظام باستخدام الذكاء الاصطناعي المتقدم",
    });

    // محاكاة تشغيل الأداة مع تحديث التقدم
    for (let progress = 0; progress <= 100; progress += Math.random() * 15) {
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
      
      const updatedResult: ToolResult = {
        ...newResult,
        progress: Math.min(100, progress),
        status: progress >= 100 ? 'success' : 'running'
      };

      if (progress >= 100) {
        await audioSystem.playSound('taskComplete');
        
        toast({
          title: `✅ اكتمل ${toolName}`,
          description: `تم الفحص بنجاح - تم اكتشاف ${Math.floor(Math.random() * 50) + 1} عنصر`,
        });
      }

      setActiveTools(prev => {
        const updatedMap = new Map(prev);
        updatedMap.set(toolId, updatedResult);
        return updatedMap;
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map(tool => (
        <Card key={tool.id} className="border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{tool.name}</h4>
                  <Badge variant="outline" className="text-xs mt-1">
                    {tool.category}
                  </Badge>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => runTool(tool.id, tool.name)}
                disabled={activeTools.get(tool.id)?.status === 'running'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {activeTools.get(tool.id)?.status === 'running' ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  'تشغيل'
                )}
              </Button>
            </div>

            {activeTools.has(tool.id) && (
              <div className="space-y-2">
                <Progress 
                  value={activeTools.get(tool.id)?.progress || 0} 
                  className="h-2"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">
                    {activeTools.get(tool.id)?.progress?.toFixed(0)}%
                  </span>
                  <div className="flex items-center">
                    {activeTools.get(tool.id)?.status === 'success' && (
                      <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                    )}
                    {activeTools.get(tool.id)?.status === 'error' && (
                      <XCircle className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={
                      activeTools.get(tool.id)?.status === 'success' ? 'text-green-600' :
                      activeTools.get(tool.id)?.status === 'error' ? 'text-red-600' :
                      'text-blue-600'
                    }>
                      {activeTools.get(tool.id)?.status === 'running' ? 'جاري التشغيل...' :
                       activeTools.get(tool.id)?.status === 'success' ? 'مكتمل' :
                       activeTools.get(tool.id)?.status === 'error' ? 'خطأ' : 'في الانتظار'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ToolsGrid;
