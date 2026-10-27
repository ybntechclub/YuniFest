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
    { label: 'OVERVIEW', path: '/' },
    { label: 'EVENTS', path: '/events' },
    { label: 'SCHEDULE', path: '/schedule' },
    { label: 'REGULATIONS', path: '/#rules' },
    { label: 'ORGANIZERS', path: '/#coordinators' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 pt-5 pb-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: MDNT-Style Bold Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
          <div className="w-9 h-9 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
            <img src="/yuni-crest.svg" alt="YBN" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-headline font-black text-2xl sm:text-3xl tracking-tighter text-white uppercase group-hover:text-[#CCFF00] transition-colors">
              YUNIFEST
            </span>
            <span className="font-mono text-[10px] text-[#CCFF00] font-bold tracking-widest">
              ’26
            </span>
          </div>
        </Link>

        {/* Center: Floating Translucent Pill Menu (Exactly like MDNT Screenshot) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 bg-black/45 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-2xl">
          {navLinks.map((link) => (
            link.path.startsWith('/#') ? (
              <a
                key={link.path}
                href={link.path}
                className="font-headline text-xs font-bold tracking-wider uppercase text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`font-headline text-xs font-bold tracking-wider uppercase transition-colors ${
                  isActive(link.path)
                    ? 'text-[#CCFF00]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Right: Solid White Pill Button with Dot (Exactly like MDNT Screenshot) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <Link
            to="/admin"
            className="font-headline text-xs uppercase tracking-wider text-white/70 hover:text-white px-3 py-2 rounded-full hover:bg-white/5 transition-colors flex items-center gap-1.5"
            title="Organizer Portal"
          >
            <Shield className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>PORTAL</span>
          </Link>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-black px-6 py-2.5 rounded-full font-headline text-xs font-extrabold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-xl group"
          >
            <span>CLAIM PASS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] group-hover:scale-125 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link
            to="/register"
            className="bg-white text-black px-4 py-1.5 rounded-full font-headline text-xs font-black uppercase tracking-wider"
          >
            ₹0 PASS
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-black/60 border border-white/20 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5 text-[#CCFF00]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-black/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-base font-headline uppercase font-bold tracking-wider text-white/90 hover:text-[#CCFF00] border-b border-white/5"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 text-base font-headline uppercase font-bold tracking-wider flex items-center justify-between border-b border-white/5 ${
                    isActive(link.path) ? 'text-[#CCFF00]' : 'text-white/90'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/40" />
                </Link>
              )
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#CCFF00] text-black font-headline font-black py-3.5 rounded-full text-center text-xs tracking-wider uppercase"
              >
                CLAIM OFFICIAL PASS (₹0 ENTRY)
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="w-full bg-white/10 text-white font-headline py-3 rounded-full text-center text-xs tracking-wider uppercase border border-white/20"
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
