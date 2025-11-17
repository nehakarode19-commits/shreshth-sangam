import { NavLink } from "@/components/NavLink";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Jain Boarding Federation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connecting trustees, students, parents, and donors to strengthen Jain boarding education.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/institutions" className="text-muted-foreground hover:text-primary transition-colors">
                  Institutions
                </NavLink>
              </li>
              <li>
                <NavLink to="/apply" className="text-muted-foreground hover:text-primary transition-colors">
                  Apply Now
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/donors" className="text-muted-foreground hover:text-primary transition-colors">
                  Become a Donor
                </NavLink>
              </li>
              <li>
                <NavLink to="/trustees" className="text-muted-foreground hover:text-primary transition-colors">
                  Trustee Portal
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@jainboarding.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+91 1800-XXX-XXXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} Jain Boarding Federation. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <NavLink to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </NavLink>
            <NavLink to="/accessibility" className="hover:text-primary transition-colors">
              Accessibility
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
