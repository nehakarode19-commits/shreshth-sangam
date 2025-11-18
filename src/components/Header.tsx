import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Facebook, Youtube, Instagram } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("ENGLISH");

  const adminLogins = [
    { label: "HOSTEL LOGIN", to: "/auth" },
    { label: "TRUSTEE LOGIN", to: "/auth" },
    { label: "STUDENT LOGIN", to: "/auth" },
    { label: "DONOR LOGIN", to: "/auth" },
  ];

  const mainNavLinks = [
    { to: "/", label: "About Us" },
    { to: "/institutions", label: "Institution" },
    { to: "/donors", label: "Donors" },
    { to: "/events", label: "Media" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Bar - Admin Logins */}
      <div className="bg-maroon text-maroon-foreground">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between">
            {/* Admin Login Links */}
            <div className="hidden md:flex items-center gap-1 text-xs font-medium">
              {adminLogins.map((link, index) => (
                <div key={link.label} className="flex items-center">
                  <NavLink
                    to={link.to}
                    className="hover:text-white/80 transition-colors px-3 py-2"
                  >
                    {link.label}
                  </NavLink>
                  {index < adminLogins.length - 1 && (
                    <span className="text-white/50">|</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-maroon leading-none">JH</div>
              <div className="text-[10px] text-maroon font-medium uppercase tracking-wider">
                Jainyo <span className="text-saffron">Hostels</span>
              </div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                activeClassName="text-primary"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side - Register & Language */}
          <div className="flex items-center gap-3">
            <NavLink to="/auth" className="hidden sm:block">
              <Button className="bg-maroon hover:bg-maroon/90 text-maroon-foreground">
                Register
              </Button>
            </NavLink>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 hidden sm:flex">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs">{language}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("ENGLISH")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("हिंदी")}>
                  हिंदी (Hindi)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ગુજરાતી")}>
                  ગુજરાતી (Gujarati)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {/* Admin Logins Mobile */}
            <div className="pb-3 border-b">
              <p className="text-xs font-semibold text-muted-foreground mb-2">ADMIN PORTALS</p>
              {adminLogins.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className="text-sm font-medium text-maroon py-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Main Nav Mobile */}
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground py-2"
                activeClassName="text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink to="/auth" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-maroon hover:bg-maroon/90">
                Register
              </Button>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
