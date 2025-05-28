
import React from 'react';

interface LoadingAnimationProps {
  type?: 'infinity' | 'robot' | 'server' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingAnimation = ({ type = 'infinity', size = 'md', className = '' }: LoadingAnimationProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  if (type === 'infinity') {
    return (
      <div className={`octa-infinity-container ${sizeClasses[size]} ${className}`}>
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path className="octa-eight" style={{ '--order': 1 } as any} />
          <path className="octa-eight" style={{ '--order': 2 } as any} />
          <path className="octa-eight" style={{ '--order': 3 } as any} />
        </svg>
      </div>
    );
  }

  if (type === 'robot') {
    return (
      <div className={`octa-robot-container ${className}`}>
        <div className="octa-robot-eye"></div>
        <div className="octa-robot-head"></div>
        <div className="octa-robot-body"></div>
        <div className="octa-robot-hands"></div>
        <div className="octa-loading-text">جاري التحميل...</div>
      </div>
    );
  }

  if (type === 'server') {
    return (
      <div className={`octa-server-container ${className}`}>
        <svg className="octa-float-animation" width="60" height="80" viewBox="0 0 60 80">
          <rect x="10" y="20" width="40" height="15" rx="2" fill="#3b82f6" className="octa-strobe-green"/>
          <rect x="10" y="40" width="40" height="15" rx="2" fill="#10b981"/>
          <rect x="10" y="60" width="40" height="15" rx="2" fill="#ef4444" className="octa-strobe-red"/>
          <circle cx="45" cy="27" r="2" fill="#60a5fa"/>
          <circle cx="45" cy="47" r="2" fill="#34d399"/>
          <circle cx="45" cy="67" r="2" fill="#fbbf24"/>
        </svg>
      </div>
    );
  }

  if (type === 'ghost') {
    return (
      <div className={`octa-ghost-container ${className}`}>
        <div className="octa-ghost-effect">
          <svg width="50" height="60" viewBox="0 0 50 60">
            <rect x="5" y="15" width="40" height="35" rx="8" fill="#6b7280" opacity="0.3"/>
          </svg>
        </div>
        <svg className="octa-mini-server" width="50" height="60" viewBox="0 0 50 60">
          <rect x="5" y="15" width="40" height="35" rx="8" fill="#3b82f6"/>
          <rect x="10" y="20" width="30" height="8" rx="2" fill="#1e40af"/>
          <rect x="10" y="32" width="30" height="8" rx="2" fill="#1e40af"/>
          <rect x="10" y="44" width="30" height="8" rx="2" fill="#1e40af"/>
          <circle cx="42" cy="24" r="1.5" fill="#60a5fa"/>
          <circle cx="42" cy="36" r="1.5" fill="#34d399"/>
          <circle cx="42" cy="48" r="1.5" fill="#fbbf24"/>
        </svg>
      </div>
    );
  }

  return null;
};

export default LoadingAnimation;
