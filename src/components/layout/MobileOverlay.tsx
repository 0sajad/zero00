
import React from 'react';

interface MobileOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export const MobileOverlay = ({ isVisible, onClose }: MobileOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={onClose}
    />
  );
};
