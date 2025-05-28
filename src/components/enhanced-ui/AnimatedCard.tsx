
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnimatedCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerContent?: React.ReactNode;
  effect?: 'hover' | 'pulse-blue' | 'pulse-green' | 'fade-in-up' | 'fade-in-left' | 'fade-in-right';
}

const AnimatedCard = ({ 
  title, 
  children, 
  className = '', 
  headerContent,
  effect = 'hover'
}: AnimatedCardProps) => {
  
  const effectClasses = {
    hover: 'octa-card-hover',
    'pulse-blue': 'octa-pulse-blue',
    'pulse-green': 'octa-pulse-green',
    'fade-in-up': 'octa-fade-in-up',
    'fade-in-left': 'octa-fade-in-left',
    'fade-in-right': 'octa-fade-in-right'
  };

  return (
    <Card className={`octa-hardware-accelerated octa-smooth-animation ${effectClasses[effect]} ${className}`}>
      {(title || headerContent) && (
        <CardHeader>
          {title && <CardTitle className="octa-text-glow">{title}</CardTitle>}
          {headerContent}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default AnimatedCard;
