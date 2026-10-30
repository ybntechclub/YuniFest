import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowUpRight, FileText } from 'lucide-react';
import { RollText } from '../ui/RollText';

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
    { label: 'REGULATIONS', path: '/regulations' },
    { label: 'LEADERSHIP', path: '/leadership' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 ${
      scrolled ? 'bg-[#F6F7F9]/85 backdrop-blur-md py-3 border-b border-slate-200' : 'pt-5 pb-3'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Minimalist Bold Brand Logo with Official YBN University Emblem (Smooth Rotated Design) */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-[1.5px] border-slate-900 shadow-sm flex items-center justify-center p-0.5 overflow-hidden -rotate-6 group-hover:rotate-12 transition-all duration-300">
            <img src="/ybn-logo.png" alt="YBN University Ranchi" className="w-full h-full object-contain animate-spin-slow" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-headline font-black text-2xl sm:text-3xl tracking-tighter text-slate-950 uppercase group-hover:text-[#2B59FF] transition-colors">
              YUNIFEST
            </span>
            <span className="font-mono text-xs text-[#2B59FF] font-bold tracking-widest">
              ’26
            </span>
          </div>
        </Link>

        {/* Center: Floating Crisp Minimalist Pill Menu */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 bg-white/90 backdrop-blur-md px-8 py-3 rounded-full border-[1.5px] border-slate-900 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display text-xs font-bold tracking-wider uppercase transition-colors ${
                isActive(link.path)
                  ? 'text-[#2B59FF]'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <RollText text={link.label} highlightColor="text-[#2B59FF]" />
            </Link>
          ))}
        </nav>

        {/* Right: Solid Black Pill Button with Accent Dot */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="/yunifest-2026-brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FEF08A] hover:bg-[#CCFF00] text-slate-950 font-mono text-xs font-bold border-[1.5px] border-slate-900 transition-all shadow-sm hover:scale-105"
            title="Open Festival Schedule Poster & Brochure (PDF)"
          >
            <FileText className="w-3.5 h-3.5 text-slate-950" />
            <span>BROCHURE PDF</span>
            <ArrowUpRight className="w-3 h-3 text-slate-950" />
          </a>

          <Link
            to="/admin"
            className="font-display text-xs uppercase tracking-wider text-slate-600 hover:text-slate-950 px-3 py-2 rounded-full hover:bg-slate-200/50 transition-colors flex items-center gap-1.5 font-bold"
            title="Organizer Portal"
          >
            <Shield className="w-3.5 h-3.5 text-[#2B59FF]" />
            <RollText text="PORTAL" highlightColor="text-[#2B59FF]" />
          </Link>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-[#2B59FF] text-white px-6 py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm group border-[1.5px] border-slate-950"
          >
            <RollText text="CLAIM PASS" highlightColor="text-white" />
            <span className="w-2 h-2 rounded-full bg-[#FEF08A] group-hover:scale-125 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/register"
            className="bg-slate-950 text-white px-4 py-1.5 rounded-full font-display text-xs font-bold uppercase tracking-wider border border-slate-950"
          >
            ₹0 PASS
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-2xl bg-white border-[1.5px] border-slate-900 text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto bg-white rounded-3xl border-[1.5px] border-slate-900 shadow-solid-pop p-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3 font-display font-bold text-sm uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 px-3 rounded-xl transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#2B59FF]/10 text-[#2B59FF]'
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="py-2 px-3 rounded-xl text-slate-800 hover:bg-slate-100 flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-[#2B59FF]" />
              <span>ORGANIZER PORTAL</span>
            </Link>

            <a
              href="/yunifest-2026-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#FEF08A]/70 border border-slate-900 text-slate-950 flex items-center justify-between font-bold text-xs font-mono"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2B59FF]" />
                <span>OFFICIAL BROCHURE &amp; SCHEDULE (PDF)</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-900" />
            </a>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <Link
              to="/register"
              className="btn-voltage w-full text-center py-3 text-xs justify-center"
            >
              <span>CLAIM ₹0 REGISTRATION PASS</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
