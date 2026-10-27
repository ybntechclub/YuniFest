import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, MapPin, ArrowRight, ShieldCheck, Flame, ArrowUpRight } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const HeroSection: React.FC = () => {
  const tickerItems = [
    "ENGINEERING & TECH",
    "ESPORTS CHAMPIONSHIP",
    "CULTURAL SHOWCASE",
    "GRAND FASHION RUNWAY",
    "AGRICULTURAL INNOVATION",
    "TREASURE HUNT (CAP 25)",
    "OPEN AIR MEGA DJ NIGHT",
    "FINE ARTS & REELS",
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#03060E]">
      
      {/* Dynamic Laser & Ambient Background Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep stage laser cones */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#11234D]/80 via-[#0B1736]/40 to-transparent rounded-full blur-[140px] opacity-80" />
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-[#F5C451]/12 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#22D3EE]/10 rounded-full blur-[140px]" />
        
        {/* Subtle geometric stage grid */}
        <div 
          className="absolute inset-0 opacity-[0.06]" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Ambient top light streak */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#F5C451]/50 to-transparent" />
      </div>

      {/* Main Hero Center Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 flex-1 flex flex-col justify-center">
        
        {/* Top Floating Pill: Live Status */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#081024]/80 border border-white/10 backdrop-blur-md shadow-2xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-300">
              YBN UNIVERSITY PRESENTS • YUNIFEST 2026
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="font-mono text-[11px] font-bold text-[#F5C451]">
              ₹0 ENTRY
            </span>
          </div>
        </div>

        {/* Massive High-Impact All-Caps MDNT-Style Title */}
        <div className="text-center max-w-5xl mx-auto mb-8">
          <h1 className="font-headline font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95]">
            WE CONNECT YOUTH, CULTURE & TECH THROUGH UNIQUE{' '}
            <span className="gold-gradient-text block mt-1 underline decoration-[#F5C451]/50 decoration-wavy underline-offset-8">
              IN-REAL-LIFE EXPERIENCES.
            </span>
          </h1>

          {/* Subtitle / Tagline */}
          <p className="mt-6 font-display text-base sm:text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            “One Campus. Three Days. Endless Possibilities.”
          </p>

          <p className="mt-2 font-mono text-xs sm:text-sm text-slate-400 tracking-wider">
            DECEMBER 10, 11 & 12, 2026 • RANCHI, JHARKHAND, INDIA
          </p>
        </div>

        {/* CTAs Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            to="/register"
            className="btn-voltage w-full sm:w-auto px-8 py-4 text-sm font-black flex items-center justify-center gap-3 group"
          >
            <span>CLAIM PARTICIPANT PASS</span>
            <span className="font-mono text-xs bg-[#03060E] text-[#F5C451] px-2 py-0.5 rounded-full font-extrabold">
              ₹0 FEE
            </span>
            <ArrowRight className="w-4 h-4 text-[#03060E] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/events"
            className="btn-outline-luxe w-full sm:w-auto px-7 py-4 text-xs font-bold flex items-center justify-center gap-2 group"
          >
            <span>EXPLORE 15+ EVENTS & RULES</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#F5C451] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Countdown Timer with Technical Border Frame */}
        <div className="max-w-2xl mx-auto w-full mb-10">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-[#F5C451] mb-2 px-2">
            <span>[ STAGE ACTIVATION COUNTDOWN ]</span>
            <span>DEC 10, 2026 // 09:00 IST</span>
          </div>
          <CountdownTimer />
        </div>

      </div>

      {/* Infinite Horizontal Marquee Ticker (MDNT Signature Element) */}
      <div className="relative z-10 border-y border-white/10 bg-[#060B1A]/80 backdrop-blur-md py-3.5 ticker-tape mt-8">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center mx-4">
              <span className="font-headline font-black text-sm tracking-wider uppercase text-slate-300 hover:text-[#F5C451] transition-colors">
                {item}
              </span>
              <span className="font-mono text-xs text-[#F5C451] mx-4 font-bold">
                ///
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
