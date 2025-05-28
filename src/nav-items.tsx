
import { HomeIcon, Settings, Shield, Activity, Globe, Zap, Network, Eye, Wrench, Lock } from "lucide-react";
import Index from "./pages/Index.tsx";
import Dashboard from "./components/Dashboard.tsx";
import CompactDashboard from "./components/CompactDashboard.tsx";
import SmartDashboard from "./components/SmartDashboard.tsx";
import AdvancedNetworkMonitor from "./components/AdvancedNetworkMonitor.tsx";
import SuperAdvancedTools from "./components/SuperAdvancedTools.tsx";
import AdvancedSecuritySystem from "./components/AdvancedSecuritySystem.tsx";

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
  {
    title: "النظام الذكي المتقدم",
    to: "/smart-dashboard",
    icon: <Zap className="h-4 w-4" />,
    page: <SmartDashboard />,
  },
  {
    title: "مراقب الشبكة المتقدم",
    to: "/network-monitor",
    icon: <Eye className="h-4 w-4" />,
    page: <AdvancedNetworkMonitor />,
  },
  {
    title: "الأدوات المتقدمة",
    to: "/advanced-tools",
    icon: <Wrench className="h-4 w-4" />,
    page: <SuperAdvancedTools />,
  },
  {
    title: "نظام الأمان المتقدم",
    to: "/security-system",
    icon: <Lock className="h-4 w-4" />,
    page: <AdvancedSecuritySystem />,
  },
];
