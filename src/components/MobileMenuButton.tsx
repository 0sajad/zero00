
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface MobileMenuButtonProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const MobileMenuButton = ({ sidebarOpen, setSidebarOpen }: MobileMenuButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed top-20 right-3 z-30 xl:hidden bg-white shadow-lg border-blue-600 text-blue-600 hover:bg-blue-50 p-2"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
};

export default MobileMenuButton;
