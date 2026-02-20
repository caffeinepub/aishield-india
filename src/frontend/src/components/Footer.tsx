import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { SiLinkedin } from 'react-icons/si';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'aishield-india');

  return (
    <footer className="bg-navy border-t border-emerald-400/20 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <h3 className="font-semibold text-emerald-400 mb-2">AIShield India</h3>
            <p className="text-white/80 text-sm mb-4 font-medium">Security Systems for Modern Startups</p>
            <p className="text-white/70 text-sm mb-4">
              Structured AI governance and cybersecurity systems for Indian startups. Built from real SOC experience.
            </p>
            <p className="text-white/60 text-xs mb-4">
              <strong>Entity:</strong> Individual / Sole Proprietorship
              <br />
              <strong>Location:</strong> INDIA
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/aishield-india"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="font-semibold text-emerald-400 mb-4">Products & Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/security-advisory" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Security Advisory
                </Link>
              </li>
              <li>
                <Link to="/toolkit" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Security Toolkit
                </Link>
              </li>
              <li>
                <Link to="/free-checklist" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Free Checklist
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-semibold text-emerald-400 mb-4">Legal & Contact</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link to="/privacy-policy" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
            <p className="text-white/70 text-sm">
              <strong>Email:</strong>{' '}
              <a href="mailto:Contact@AIshield.com" className="hover:text-emerald-400 transition-colors">
                Contact@AIshield.com
              </a>
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-emerald-400/20">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-3">Ready to Secure Your Startup?</h3>
            <p className="text-white/70 mb-4">Apply for founder-level advisory or start with our DIY toolkit</p>
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
              <Link to="/security-advisory">Book Strategy Call</Link>
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-emerald-400/20 text-center text-sm text-white/60">
          <p>
            © {currentYear} AIShield India. All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
