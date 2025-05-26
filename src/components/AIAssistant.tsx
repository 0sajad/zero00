
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Zap, Brain, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AIAssistant = () => {
  const { t } = useTranslation();
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: t('aiGreeting'),
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickActions = [
    { text: t('analyzePerformance'), icon: <Zap className="h-4 w-4" /> },
    { text: t('checkSecurity'), icon: <Brain className="h-4 w-4" /> },
    { text: t('predictIssues'), icon: <Globe className="h-4 w-4" /> },
    { text: t('optimizeConnection'), icon: <Bot className="h-4 w-4" /> }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    // Simulate AI response
    const aiResponse = {
      role: 'assistant',
      content: 'I understand your request. Let me analyze your network data and provide insights. Based on current metrics, I recommend checking your device connectivity and running a security scan.',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputMessage('');
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 glass-card flex flex-col">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-octa-purple-500 to-octa-blue-600 flex items-center justify-center mr-3">
              <Bot className="h-5 w-5 text-white" />
            </div>
            {t('aiAssistant')}
            <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/30">
              {t('online')}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-primary/20' 
                      : 'bg-gradient-to-br from-octa-purple-500/20 to-octa-blue-600/20'
                  }`}>
                    {message.role === 'user' ? 
                      <User className="h-4 w-4" /> : 
                      <Bot className="h-4 w-4" />
                    }
                  </div>
                  <div className={`flex-1 max-w-[80%] ${
                    message.role === 'user' ? 'text-right' : ''
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary/20 text-foreground'
                        : 'bg-muted/20 text-foreground'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="p-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-3">Quick Actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-xs"
                  onClick={() => setInputMessage(action.text)}
                >
                  {action.icon}
                  <span className="ml-2 truncate">{action.text}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex space-x-2">
              <Input
                placeholder={t('askAnything')}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
