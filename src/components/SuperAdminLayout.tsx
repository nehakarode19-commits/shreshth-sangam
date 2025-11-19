import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Bell, Search, LayoutDashboard, Building, BookOpen, BarChart3, DollarSign, FileText, Users, Headphones, Mail, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface SuperAdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/super-admin/dashboard" },
  { icon: Building, label: "Institution", path: "/super-admin/institutions" },
  { icon: BookOpen, label: "Scholarships", path: "/super-admin/scholarships" },
  { icon: BarChart3, label: "Reports", path: "/super-admin/reports" },
  { icon: DollarSign, label: "Funding Status", path: "/super-admin/funding" },
  { 
    icon: FileText, 
    label: "CMS Pages", 
    path: "/super-admin/cms",
    subItems: [
      { label: "Podcasts", path: "/super-admin/cms/podcasts" },
      { label: "Events", path: "/super-admin/cms/events" },
      { label: "Blogs", path: "/super-admin/cms/blogs" },
      { label: "Media Gallery", path: "/super-admin/cms/media" },
      { label: "Press Coverage", path: "/super-admin/cms/press" },
    ]
  },
  { icon: Users, label: "User Management", path: "/super-admin/user-management" },
  { icon: Headphones, label: "CRM Module", path: "/super-admin/crm" },
  { icon: Mail, label: "Contact Us", path: "/super-admin/contact" },
];

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border fixed h-full overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary">Super Admin</h2>
          <p className="text-sm text-muted-foreground">Control Panel</p>
        </div>
        
        <nav className="px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItem === item.label;
            
            return (
              <div key={item.label}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    active ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent'
                  }`}
                  onClick={() => {
                    if (hasSubItems) {
                      setExpandedItem(isExpanded ? null : item.label);
                    } else {
                      navigate(item.path);
                    }
                  }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {hasSubItems && <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />}
                </Button>
                
                {hasSubItems && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems?.map((subItem) => (
                      <Button
                        key={subItem.path}
                        variant="ghost"
                        className={`w-full justify-start text-sm ${
                          isActive(subItem.path) ? 'bg-primary/10 text-primary' : 'hover:bg-accent'
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
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Here"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">SA</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium">Super Admin</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
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
        <main className="min-h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
