"use client"

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Archive, 
  Calendar, 
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { role, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!role) {
      router.push("/");
    }
  }, [role, router]);

  if (!role) return null;

  const getNavItems = () => {
    const common = [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
      { name: "Archive", href: "/dashboard/archive", icon: Archive },
    ];

    if (role === 'student') {
      return [
        common[0],
        { name: "My Project", href: "/dashboard/projects", icon: FolderKanban },
        { name: "Advisors", href: "/dashboard/advisors", icon: Users },
        ...common.slice(1)
      ];
    }
    
    if (role === 'advisor') {
      return [
        common[0],
        { name: "My Students", href: "/dashboard/projects", icon: FolderKanban },
        { name: "My Quota", href: "/dashboard/advisors", icon: Users },
        ...common.slice(1)
      ];
    }

    if (role === 'coordinator') {
      return [
        common[0],
        { name: "All Projects", href: "/dashboard/projects", icon: FolderKanban },
        { name: "Advisors & Quotas", href: "/dashboard/advisors", icon: Users },
        ...common.slice(1)
      ];
    }

    if (role === 'executive') {
      return [
        common[0],
        { name: "Projects Overview", href: "/dashboard/projects", icon: FolderKanban },
        { name: "Workload Analysis", href: "/dashboard/advisors", icon: Users },
        ...common.slice(1)
      ];
    }

    return common;
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-indigo-600 tracking-tight">ICDI Startup</h2>
          <p className="text-xs text-slate-500 mt-1 capitalize">{role} Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-indigo-600" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/80" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="relative w-64 max-w-sm bg-white h-full flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-indigo-600 tracking-tight">ICDI Startup</h2>
                <p className="text-xs text-slate-500 mt-1 capitalize">{role} Portal</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-indigo-50 text-indigo-700" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-indigo-600" : "text-slate-400")} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-slate-200">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden mr-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-slate-900 capitalize">
              {pathname === '/dashboard' ? 'Dashboard' : navItems.find(i => i.href === pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium text-sm border border-indigo-200">
              {role.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
