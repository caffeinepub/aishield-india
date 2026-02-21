import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { trackLinkedInConversion } from '@/lib/tracking';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleStrategyCallClick = () => {
    // Fire LinkedIn conversion tracking before navigation
    trackLinkedInConversion('XXXXXXX');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-2xl font-extrabold text-navy">AIShield</span>
                <span className="text-2xl font-extrabold text-emerald-600 ml-1">India</span>
              </div>
              <span className="text-xs text-gray-600 font-medium hidden sm:block">Security Systems for Modern Startups</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              activeProps={{ className: 'text-emerald-600' }}
            >
              Home
            </Link>
            <Link
              to="/security-advisory"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              activeProps={{ className: 'text-emerald-600' }}
            >
              Advisory
            </Link>
            <Link
              to="/toolkit"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              activeProps={{ className: 'text-emerald-600' }}
            >
              Security Toolkit
            </Link>
            <Link
              to="/free-checklist"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              activeProps={{ className: 'text-emerald-600' }}
            >
              Free Checklist
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              activeProps={{ className: 'text-emerald-600' }}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              activeProps={{ className: 'text-emerald-600' }}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              activeProps={{ className: 'text-emerald-600' }}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              asChild 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              onClick={handleStrategyCallClick}
            >
              <Link to="/security-advisory">Book Strategy Call</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-emerald-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/security-advisory"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Advisory
              </Link>
              <Link
                to="/toolkit"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Security Toolkit
              </Link>
              <Link
                to="/free-checklist"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Free Checklist
              </Link>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button 
                asChild 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold w-full"
                onClick={() => {
                  handleStrategyCallClick();
                  setMobileMenuOpen(false);
                }}
              >
                <Link to="/security-advisory">
                  Book Strategy Call
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
