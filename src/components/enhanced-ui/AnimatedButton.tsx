
import React from 'react';
import { Button } from '@/components/ui/button';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  effect?: 'glow' | 'pulse-blue' | 'pulse-green' | 'pulse-red';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const AnimatedButton = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  effect = 'glow',
  onClick,
  className = '',
  disabled = false
}: AnimatedButtonProps) => {
  
  const handleClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };

  const effectClasses = {
    glow: 'octa-button-glow',
    'pulse-blue': 'octa-pulse-blue',
    'pulse-green': 'octa-pulse-green',
    'pulse-red': 'octa-pulse-red'
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={disabled}
      className={`octa-hardware-accelerated octa-smooth-animation ${effectClasses[effect]} ${className}`}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;
