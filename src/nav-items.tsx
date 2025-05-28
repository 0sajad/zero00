
import { HomeIcon, Settings, Shield, Activity, Globe, Zap } from "lucide-react";
import Index from "./pages/Index.tsx";
import Dashboard from "./components/Dashboard.tsx";
import CompactDashboard from "./components/CompactDashboard.tsx";

/**
 * Central navigation configuration for OCTA NETWORK
 * This determines both the page structure and navigation
 */
export const navItems = [
  {
    title: "الصفحة الرئيسية",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "لوحة التحكم الذكية",
    to: "/dashboard",
    icon: <Activity className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "المراقبة المدمجة",
    to: "/compact",
    icon: <Globe className="h-4 w-4" />,
    page: <CompactDashboard />,
  },
];
