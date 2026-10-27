import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Calendar, Sparkles, UserCheck, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Events Explorer', path: '/events' },
    { label: '3-Day Schedule', path: '/schedule' },
    { label: 'Rules & FAQ', path: '/#rules' },
    { label: 'Coordinators', path: '/#coordinators' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07152F]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-[#F5C451]/20 py-3'
          : 'bg-[#07152F]/70 backdrop-blur-sm border-b border-[#F5C451]/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#F5C451] rounded-lg p-1">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-[#0D2345] to-[#07152F] border border-[#F5C451]/40 flex items-center justify-center p-1.5 shadow-gold-glow group-hover:border-[#F5C451] transition-colors">
              <img src="/yuni-crest.svg" alt="YBN University Emblem" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white group-hover:text-[#F5C451] transition-colors">
                  YUNIFEST
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#F5C451]/15 text-[#F5C451] font-bold border border-[#F5C451]/30">
                  2026
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-300 tracking-wide font-medium">
                YBN University • Ranchi
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.path}
                  href={link.path}
                  className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-[#F5C451] hover:bg-[#0D2345]/50 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive(link.path)
                      ? 'text-[#F5C451] bg-[#0D2345] border border-[#F5C451]/30 shadow-sm'
                      : 'text-slate-300 hover:text-[#F5C451] hover:bg-[#0D2345]/50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/admin"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-md hover:bg-[#0D2345] border border-slate-700 transition-colors flex items-center gap-1.5"
              title="Organizer Portal"
            >
              <Shield className="w-3.5 h-3.5 text-[#F5C451]" />
              <span>Organizer</span>
            </Link>

            <Link
              to="/register"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] via-[#F5C451] to-[#D4A017] hover:brightness-110 active:scale-98 transition-all shadow-gold-glow group"
            >
              <Sparkles className="w-4 h-4 text-[#07152F]" />
              <span>Register Now</span>
              <span className="text-[11px] uppercase tracking-wider font-extrabold bg-[#07152F] text-[#F5C451] px-1.5 py-0.5 rounded ml-0.5">
                ₹0 Fee
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              to="/register"
              className="px-3 py-1.5 rounded-md text-xs font-bold text-[#07152F] bg-[#F5C451] shadow-sm"
            >
              Register (₹0)
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-[#0D2345] border border-[#F5C451]/30 text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#F5C451]"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5 text-[#F5C451]" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[61px] bg-[#07152F]/98 backdrop-blur-xl border-b border-[#F5C451]/20 shadow-2xl py-5 px-6 animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-[#F5C451] hover:bg-[#0D2345]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                    isActive(link.path)
                      ? 'text-[#F5C451] bg-[#0D2345] border border-[#F5C451]/30 font-semibold'
                      : 'text-slate-200 hover:text-[#F5C451] hover:bg-[#0D2345]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive(link.path) && <span className="w-2 h-2 rounded-full bg-[#F5C451]" />}
                </Link>
              )
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-base font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] via-[#F5C451] to-[#D4A017] shadow-gold-glow"
              >
                <Sparkles className="w-4 h-4 text-[#07152F]" />
                <span>Open Registration Form</span>
                <span className="text-xs bg-[#07152F] text-[#F5C451] px-2 py-0.5 rounded font-extrabold">
                  ₹0
                </span>
                <ArrowRight className="w-4 h-4 text-[#07152F] ml-auto" />
              </Link>

              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-300 bg-[#0D2345] border border-slate-700 hover:border-[#F5C451]/40"
              >
                <Shield className="w-4 h-4 text-[#F5C451]" />
                <span>Organizer Dashboard Login</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
