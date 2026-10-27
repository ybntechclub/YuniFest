import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, MapPin, ArrowRight, ShieldCheck, Trophy, Flame } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial ambient light glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0D2345] rounded-full blur-[140px] opacity-70" />
        <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-[#F5C451]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-[#06B6D4]/10 rounded-full blur-[130px]" />
        
        {/* Subtle grid texture */}
        <div 
          className="absolute inset-0 opacity-[0.07]" 
          style={{
            backgroundImage: `radial-gradient(rgba(245, 196, 81, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* University Crest Header Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0D2345]/80 border border-[#F5C451]/30 shadow-gold-glow mb-6 animate-fadeIn">
          <div className="w-5 h-5 rounded-full overflow-hidden bg-[#F5C451]/20 flex items-center justify-center p-0.5">
            <img src="/yuni-crest.svg" alt="YBN Emblem" className="w-full h-full object-contain" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-200">
            YBN UNIVERSITY, RANCHI • ANNUAL MEGA FEST
          </span>
        </div>

        {/* Grand Festival Title */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-4 leading-none">
          <span className="block drop-shadow-lg">YUNIFEST</span>
          <span className="block font-sans text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-[#FFF6D3] via-[#F5C451] to-[#D4A017] bg-clip-text text-transparent mt-1">
            2026
          </span>
        </h1>

        {/* Festival Tagline */}
        <p className="font-display italic text-lg sm:text-2xl md:text-3xl text-slate-200 font-medium tracking-wide mb-3 max-w-3xl">
          “One Campus. Three Days. Endless Possibilities.”
        </p>

        {/* Theme Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300 font-medium mb-8">
          <span className="px-3 py-1 rounded-full bg-[#0D2345] border border-cyan-500/30 text-cyan-300">
            Technology
          </span>
          <span className="text-slate-500">•</span>
          <span className="px-3 py-1 rounded-full bg-[#0D2345] border border-pink-500/30 text-pink-300">
            Culture
          </span>
          <span className="text-slate-500">•</span>
          <span className="px-3 py-1 rounded-full bg-[#0D2345] border border-[#F5C451]/30 text-[#F5C451]">
            Creativity
          </span>
          <span className="text-slate-500">•</span>
          <span className="px-3 py-1 rounded-full bg-[#0D2345] border border-amber-500/30 text-amber-300">
            Celebration
          </span>
        </div>

        {/* Dates & Location Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300 mb-8 p-3 rounded-xl bg-[#091B38]/60 border border-slate-700/60 max-w-xl w-full">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#F5C451]" />
            <span className="font-semibold text-white">December 10, 11 & 12, 2026</span>
          </div>
          <div className="hidden sm:block text-slate-600">|</div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F5C451]" />
            <span>Namkum Campus, Ranchi</span>
          </div>
        </div>

        {/* Countdown Timer Section */}
        <div className="w-full mb-10">
          <div className="text-xs uppercase tracking-widest font-bold text-[#F5C451] mb-3">
            Event Commences In
          </div>
          <CountdownTimer />
        </div>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-extrabold text-[#07152F] bg-gradient-to-r from-[#FDE047] via-[#F5C451] to-[#D4A017] hover:brightness-110 active:scale-98 transition-all shadow-gold-glow group"
          >
            <Sparkles className="w-5 h-5 text-[#07152F]" />
            <span>Register Now for Events</span>
            <span className="text-xs font-black uppercase bg-[#07152F] text-[#F5C451] px-2 py-0.5 rounded ml-1">
              ₹0 Fee
            </span>
            <ArrowRight className="w-5 h-5 text-[#07152F] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-slate-200 bg-[#0D2345] hover:bg-[#112C57] border border-[#F5C451]/30 hover:border-[#F5C451] transition-all"
          >
            <span>Explore Events & Rules</span>
          </Link>
        </div>

        {/* Trust & Policy Assurance Indicators */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#F5C451]" />
            <span>Valid College ID Card Mandatory</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Trophy className="w-4 h-4 text-[#F5C451]" />
            <span>Official University Certifications</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Flame className="w-4 h-4 text-[#F5C451]" />
            <span>Treasure Hunting Capped at 25</span>
          </div>
        </div>

      </div>
    </section>
  );
};
