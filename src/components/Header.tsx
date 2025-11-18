import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserCircle, Building2, Heart, Users, Globe } from "lucide-react";
import jainyoLogo from "@/assets/jainyo-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const portalLogins = [
    { label: "Student", icon: UserCircle, to: "/portal-selection" },
    { label: "Hostel", icon: Building2, to: "/portal-selection" },
    { label: "Trustee", icon: Users, to: "/portal-selection" },
    { label: "Donor", icon: Heart, to: "/portal-selection" },
  ];

  const mainNavLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/institutions", label: "Institutions" },
    { to: "/donors", label: "Donors" },
    { to: "/trustees", label: "Trustees" },
    { to: "/events", label: "Media" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center flex-shrink-0">
            <img src={jainyoLogo} alt="Jainyo Hostels" className="h-16 w-auto" />
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-foreground leading-tight">
                Jain Boarding Federation
              </span>
              <span className="text-xs text-muted-foreground">
                Empowering Students Nationwide
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                activeClassName="text-primary bg-accent"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Portal Login Button */}
            <Button 
              onClick={() => window.open('/portal-selection', '_blank', 'noopener,noreferrer')}
              variant="outline" 
              size="sm" 
              className="gap-2 hidden md:flex"
            >
              <LogIn className="h-4 w-4" />
              <span>Portal Login</span>
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 w-16">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs font-medium">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("EN")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("HI")}>
                  हिंदी
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("GU")}>
                  ગુજરાતી
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Register Button - Student/Parent Only */}
            <Button 
              onClick={() => navigate('/student/register')}
              size="sm" 
              className="hidden sm:flex bg-gradient-to-r from-primary to-teal hover:opacity-90"
            >
              Register
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Portal Login Button for Mobile */}
            <Button 
              onClick={() => {
                window.open('/portal-selection', '_blank', 'noopener,noreferrer');
                setMobileMenuOpen(false);
              }}
              variant="outline"
              className="w-full gap-2"
            >
              <LogIn className="h-4 w-4" />
              <span>Portal Login</span>
            </Button>

            {/* Main Navigation */}
            <div className="space-y-1 pt-2 border-t">
              {mainNavLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  activeClassName="text-primary bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Register */}
            <Button 
              onClick={() => {
                navigate('/student/register');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-primary to-teal sm:hidden"
            >
              Register as Student
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
