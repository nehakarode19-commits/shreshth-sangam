import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userRole, signOut } = useAuth();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/institutions", label: "Institutions" },
    { to: "/apply", label: "Apply" },
    { to: "/donors", label: "Donors" },
    { to: "/trustees", label: "Trustees" },
    { to: "/events", label: "Events" },
  ];

  const getRoleLabel = (role: string | null) => {
    if (!role) return 'User';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <NavLink to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">JBF</span>
          </div>
          <span className="text-lg font-bold text-foreground hidden sm:inline">
            Jain Boarding Federation
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{getRoleLabel(userRole)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">{getRoleLabel(userRole)}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink to="/auth">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </NavLink>
          )}
          
          <NavLink to="/donors">
            <Button size="sm" className="bg-teal hover:bg-teal/90">
              Donate Now
            </Button>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground py-2"
                activeClassName="text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {!user && (
              <NavLink to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </NavLink>
            )}
            {user && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-destructive"
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
