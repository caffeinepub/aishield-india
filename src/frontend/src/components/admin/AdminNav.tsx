import { Link, useLocation } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, DollarSign, Users, Award, LogOut } from 'lucide-react';

interface AdminNavProps {
  onLogout: () => void;
}

export default function AdminNav({ onLogout }: AdminNavProps) {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/content', label: 'Content', icon: FileText },
    { path: '/admin/pricing', label: 'Pricing', icon: DollarSign },
    { path: '/admin/testimonials', label: 'Testimonials', icon: Users },
    { path: '/admin/credentials', label: 'Credentials', icon: Award },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-navy text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-sm text-white/70 mt-1">AIShield India</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link key={item.path} to={item.path}>
              <div
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-emerald-600 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-white/70 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
