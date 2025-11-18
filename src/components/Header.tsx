import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserCircle, Building2, Heart, Users, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const portalLogins = [
    { label: "Student", icon: UserCircle, to: "/auth" },
    { label: "Hostel", icon: Building2, to: "/auth" },
    { label: "Trustee", icon: Users, to: "/auth" },
    { label: "Donor", icon: Heart, to: "/auth" },
  ];

  const mainNavLinks = [
    { to: "/", label: "Home" },
    { to: "/institutions", label: "Institutions" },
    { to: "/apply", label: "Apply Now" },
    { to: "/donors", label: "Support Us" },
    { to: "/events", label: "Events" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-teal">
              <span className="text-xl font-bold text-white">JBF</span>
            </div>
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
            {/* Portal Login Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 hidden md:flex">
                  <LogIn className="h-4 w-4" />
                  <span>Portal Login</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Select Portal
                </div>
                <DropdownMenuSeparator />
                {portalLogins.map((portal) => (
                  <DropdownMenuItem key={portal.label} asChild>
                    <NavLink
                      to={portal.to}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <portal.icon className="h-4 w-4" />
                      <span>{portal.label} Login</span>
                    </NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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

            {/* Register Button */}
            <NavLink to="/auth" className="hidden sm:block">
              <Button size="sm" className="bg-gradient-to-r from-primary to-teal hover:opacity-90">
                Register
              </Button>
            </NavLink>

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
            {/* Portal Logins */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2">
                Quick Access
              </p>
              <div className="grid grid-cols-2 gap-2">
                {portalLogins.map((portal) => (
                  <NavLink
                    key={portal.label}
                    to={portal.to}
                    className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <portal.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{portal.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>

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
            <NavLink
              to="/auth"
              className="block sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button className="w-full bg-gradient-to-r from-primary to-teal">
                Register Now
              </Button>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
