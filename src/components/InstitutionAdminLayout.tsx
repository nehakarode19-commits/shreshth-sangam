import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building, Users, BookOpen, GraduationCap, Calendar, 
  FileText, Settings, ChevronDown, ChevronRight, Search,
  Bell, LogOut, LayoutDashboard
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface InstitutionAdminLayoutProps {
  children: ReactNode;
}

interface MenuItem {
  label: string;
  path: string;
  icon: any;
  subItems?: { label: string; path: string }[];
}

export default function InstitutionAdminLayout({ children }: InstitutionAdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems: MenuItem[] = [
    { label: "Dashboard", path: "/institution-admin/dashboard", icon: LayoutDashboard },
    { label: "Institutions", path: "/institution-admin/institutions", icon: Building },
    { label: "Students", path: "/institution-admin/students", icon: Users },
    { label: "Courses", path: "/institution-admin/courses", icon: BookOpen },
    { label: "Staff", path: "/institution-admin/staff", icon: GraduationCap },
    { label: "Attendance", path: "/institution-admin/attendance", icon: Calendar },
    { label: "Reports", path: "/institution-admin/reports", icon: FileText },
    { label: "Documents", path: "/institution-admin/documents", icon: FileText },
    { label: "Settings", path: "/institution-admin/settings", icon: Settings },
  ];

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const hasActiveChild = (subItems?: { path: string }[]) => 
    subItems?.some(item => isActive(item.path));

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border fixed left-0 top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-maroon bg-clip-text text-transparent">
            Institution Admin
          </h2>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path) || hasActiveChild(item.subItems);
            const expanded = expandedItems.includes(item.label);
            
            return (
              <div key={item.label}>
                <Button
                  variant={active ? "default" : "ghost"}
                  className={`w-full justify-start gap-2 ${
                    active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                  onClick={() => {
                    if (item.subItems) {
                      toggleExpand(item.label);
                    } else {
                      navigate(item.path);
                    }
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.subItems && (
                    expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                
                {item.subItems && expanded && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Button
                        key={subItem.path}
                        variant={isActive(subItem.path) ? "default" : "ghost"}
                        className={`w-full justify-start text-sm ${
                          isActive(subItem.path) 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-muted"
                        }`}
                        onClick={() => navigate(subItem.path)}
                      >
                        {subItem.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-card border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search Here" 
                  className="pl-10 bg-background"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.email?.[0].toUpperCase() || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="text-sm font-medium">{user?.email?.split('@')[0] || 'Admin'}</div>
                      <div className="text-xs text-muted-foreground">Institution Admin</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
