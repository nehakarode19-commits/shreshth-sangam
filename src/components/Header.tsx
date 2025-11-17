import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/institutions", label: "Institutions" },
    { to: "/apply", label: "Apply" },
    { to: "/donors", label: "Donors" },
    { to: "/trustees", label: "Trustees" },
    { to: "/events", label: "Events" },
  ];

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
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button size="sm" className="bg-teal hover:bg-teal/90">
            Donate Now
          </Button>

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
            <Button variant="outline" size="sm" className="w-full">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
