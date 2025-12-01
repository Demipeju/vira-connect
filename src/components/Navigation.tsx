import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ShoppingBag, Store, MessageCircle, User, Menu, X } from "lucide-react";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Store className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">VIRA</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/marketplace"
              className={`text-sm font-medium transition-colors ${
                isActive("/marketplace") ? "text-primary" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Marketplace
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/dashboard") ? "text-primary" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/orders"
              className={`text-sm font-medium transition-colors ${
                isActive("/orders") ? "text-primary" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Orders
            </Link>
            <Link
              to="/chat"
              className={`text-sm font-medium transition-colors ${
                isActive("/chat") ? "text-primary" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Messages
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow">
                Sign In
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4 space-y-3">
            <Link
              to="/marketplace"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/dashboard"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/orders"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              to="/chat"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Messages
            </Link>
            <Link
              to="/profile"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
