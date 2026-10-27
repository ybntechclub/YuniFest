import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Regulations', path: '/#rules' },
    { label: 'Leadership', path: '/#coordinators' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#040814]/90 backdrop-blur-xl border border-white/10 shadow-2xl py-2.5 px-4 sm:px-6' 
          : 'bg-[#040814]/60 backdrop-blur-md border border-white/5 py-3 px-4 sm:px-6'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Editorial Wordmark */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-9 h-9 rounded-full bg-[#0B152D] border border-[#F5C451]/40 flex items-center justify-center p-1.5 shadow-gold-glow group-hover:scale-105 transition-transform">
              <img src="/yuni-crest.svg" alt="YBN Crest" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-[#F5C451] transition-colors">
                  YUNIFEST
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#F5C451]/15 text-[#F5C451] font-bold border border-[#F5C451]/30">
                  ’26
                </span>
              </div>
              <p className="font-mono text-[9px] text-slate-400 tracking-widest uppercase">
                YBN UNIVERSITY • RANCHI
              </p>
            </div>
          </Link>

          {/* Desktop Nav - Clean Editorial Pills */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#091024]/60 p-1 rounded-full border border-white/5">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.path}
                  href={link.path}
                  className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                    isActive(link.path)
                      ? 'text-[#03060E] bg-[#F5C451] font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Actions & High-Voltage Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/admin"
              className="font-mono text-[11px] uppercase tracking-wider text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#F5C451]" />
              <span>Organizer</span>
            </Link>

            <Link
              to="/register"
              className="btn-voltage text-xs py-2 px-5 flex items-center gap-2 group"
            >
              <span>CLAIM PASS</span>
              <span className="w-2 h-2 rounded-full bg-[#03060E] group-hover:scale-125 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              to="/register"
              className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#F5C451] text-[#03060E]"
            >
              ₹0 Pass
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-[#0B152D] border border-white/10 text-white focus:outline-none"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-5 h-5 text-[#F5C451]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-[#040814]/98 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-headline uppercase font-bold tracking-wider text-slate-200 hover:text-[#F5C451] border-b border-white/5"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-sm font-headline uppercase font-bold tracking-wider flex items-center justify-between border-b border-white/5 ${
                    isActive(link.path) ? 'text-[#F5C451]' : 'text-slate-200'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </Link>
              )
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="btn-voltage w-full py-3.5 text-center text-sm"
              >
                REGISTER PASS — ₹0 ENTRY
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="btn-outline-luxe w-full py-3 text-center text-xs"
              >
                Organizer Dashboard Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
