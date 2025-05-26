
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  HelpCircle, 
  Activity,
  User,
  Bell,
  Download,
  Link,
  ChevronDown
} from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">OCTA</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">OCTA</h1>
            <p className="text-xs text-gray-500">NETWORK</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
            <Activity className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
            <Settings className="h-4 w-4 mr-2" />
            Tools
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
            <Activity className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help Center
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
            <Link className="h-4 w-4 mr-2" />
            License
          </Button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 text-white text-xs p-0 flex items-center justify-center">
              2
            </Badge>
          </Button>
          
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            <Download className="h-4 w-4 mr-2" />
            تراخيص
          </Button>
          
          <Button variant="outline" size="sm">
            <Link className="h-4 w-4 mr-2" />
          </Button>
          
          <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-6">
            عمل
          </Button>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
              1
            </Badge>
          </Button>
          
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            <User className="h-4 w-4 mr-2" />
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
