import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowUpRight, FileText, QrCode } from 'lucide-react';
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
    { label: 'SCHEDULE', path: '/schedule' },
    { label: 'REGULATIONS', path: '/regulations' },
    { label: 'LEADERSHIP', path: '/leadership' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      if (location.pathname === '/') {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(el, { offset: -70 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 ${scrolled ? 'bg-[#F6F7F9]/85 backdrop-blur-md py-3 border-b border-slate-200' : 'pt-5 pb-3'
      }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left: Minimalist Bold Brand Logo with Official YBN University Emblem (Smooth Rotated Design) */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-[1.5px] border-slate-900 shadow-sm flex items-center justify-center p-0.5 overflow-hidden -rotate-6 group-hover:rotate-12 transition-all duration-300">
            <img src="/ybn-logo.png" alt="YBN University Ranchi" className="w-full h-full object-contain animate-spin-slow" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="font-headline font-black text-xl sm:text-2xl tracking-tighter text-slate-950 uppercase group-hover:text-[#2B59FF] transition-colors">
                YUNIFEST
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#2B59FF] font-bold tracking-widest">
                ’26
              </span>
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-600 mt-0.5 leading-tight">
              YBN University, Ranchi
            </span>
          </div>
        </Link>

        {/* Center: Floating Crisp Minimalist Pill Menu */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 bg-white/90 backdrop-blur-md px-5 sm:px-6 xl:px-8 py-2.5 sm:py-3 rounded-full border-[1.5px] border-slate-900 shadow-sm shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={`font-display text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 ${isActive(link.path)
                ? 'text-[#2B59FF]'
                : 'text-slate-700 hover:text-slate-950'
                }`}
            >
              <RollText text={link.label} highlightColor="text-[#2B59FF]" />
            </Link>
          ))}
        </nav>

        {/* Right: Solid Action Buttons - MY PASS alongside REGISTER NOW */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          <Link
            to="/my-pass"
            className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm group border-[1.5px] border-slate-900 ${
              isActive('/my-pass')
                ? 'bg-[#2B59FF] text-white shadow-solid-pop'
                : 'bg-white hover:bg-[#2B59FF] text-slate-950 hover:text-white'
            }`}
          >
            <QrCode className={`w-3.5 h-3.5 transition-colors ${
              isActive('/my-pass') ? 'text-white' : 'text-[#0A367B] group-hover:text-white'
            }`} />
            <RollText text="MY PASS" highlightColor="text-white" />
            <span className={`w-2 h-2 rounded-full transition-all group-hover:scale-125 ${
              isActive('/my-pass') ? 'bg-[#FEF08A]' : 'bg-[#2B59FF] group-hover:bg-[#FEF08A]'
            }`} />
          </Link>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-[#2B59FF] text-white px-5 sm:px-6 py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm group border-[1.5px] border-slate-900"
          >
            <RollText text="REGISTER NOW" highlightColor="text-white" />
            <span className="w-2 h-2 rounded-full bg-[#FEF08A] group-hover:scale-125 transition-transform" />
          </Link>
        </div>

        {/* Mobile / Tablet Toggle (< 1024px): MY PASS + REGISTER NOW + Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/my-pass"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full font-display text-xs font-bold uppercase tracking-wider shadow-2xs border border-slate-900 transition-colors ${
              isActive('/my-pass') ? 'bg-[#2B59FF] text-white' : 'bg-white text-slate-950 hover:bg-[#2B59FF] hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>MY PASS</span>
          </Link>

          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-[#2B59FF] text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all shadow-sm border border-slate-950"
          >
            <span>REGISTER NOW</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FEF08A]" />
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
                onClick={(e) => handleNavClick(e, link.path)}
                className={`py-2 px-3 rounded-xl transition-colors whitespace-nowrap ${isActive(link.path)
                  ? 'bg-[#2B59FF]/10 text-[#2B59FF]'
                  : 'text-slate-800 hover:bg-slate-100'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/my-pass"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-100 text-slate-900 font-display font-bold text-xs uppercase"
            >
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#0A367B]" />
                <span>MY PASS (DOWNLOAD TOKEN)</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <Link
              to="/register"
              className="btn-voltage w-full text-center py-3 text-xs justify-center"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
