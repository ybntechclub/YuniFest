import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden pt-10 sm:pt-16">
      
      {/* 1. Iconic MDNT Semicircular Rotating Text Arch Dome (Zero Collision Architecture) */}
      <div className="relative w-full overflow-hidden flex flex-col items-center">
        
        {/* Dome Container: Bottom edge aligns with the neon lime divider */}
        <div className="relative w-full max-w-5xl h-[370px] sm:h-[440px] lg:h-[520px] overflow-hidden flex flex-col justify-end items-center">
          
          {/* Rotating Circular Text SVG:
              Positioning wrapper is firmly anchored at left-1/2 -translate-x-1/2 with negative bottom offset.
              The child div handles ONLY the pure spin animation, preventing any CSS transform translation conflicts.
              Radius and offset are calculated so:
              - Top arch is fully visible below the container top with 40px+ breathing room.
              - Bottom ~35% of the circle sinks past the bottom edge and is cropped cleanly by the lime line.
              - Center callout has 160px+ to 280px+ of open clearance overhead and on both sides at all times.
          */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[200px] sm:-bottom-[250px] lg:-bottom-[300px] w-[580px] h-[580px] sm:w-[720px] h-[720px] lg:w-[840px] lg:h-[840px] pointer-events-none select-none">
            <div className="w-full h-full animate-spin-slow">
              <svg viewBox="0 0 1000 1000" className="w-full h-full">
                <defs>
                  <path
                    id="circlePath"
                    d="M 500, 500 m -420, 0 a 420,420 0 1,1 840,0 a 420,420 0 1,1 -840,0"
                    fill="none"
                  />
                </defs>
                <text className="font-headline font-black text-[38px] tracking-[0.24em] uppercase">
                  <textPath href="#circlePath" startOffset="0%">
                    <tspan fill="#CCFF00">LET'S BUILD </tspan>
                    <tspan fill="#FFFFFF">SOMETHING • </tspan>
                    <tspan fill="#CCFF00">YUNIFEST 2026 </tspan>
                    <tspan fill="#FFFFFF">• ONE CAMPUS • </tspan>
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Center Callout Box:
              Safely framed inside the dome with >240px overhead clearance to the rotating arch.
          */}
          <div className="relative z-10 text-center max-w-[280px] sm:max-w-sm lg:max-w-md px-4 pb-8 sm:pb-10 lg:pb-12 flex flex-col items-center">
            <h3 className="font-headline font-black text-xl sm:text-2xl lg:text-3xl text-white uppercase leading-[1.12] tracking-tight mb-2 sm:mb-3">
              Tell us what you're bringing.<br />We'll show you what's possible.
            </h3>
            <p className="font-display text-xs sm:text-sm text-slate-300 mb-5 sm:mb-6 max-w-xs leading-relaxed">
              Dec 10, 11 &amp; 12, 2026 • YBN University, Ranchi • Free ₹0 Pass
            </p>

            <Link
              to="/register"
              className="inline-flex items-center gap-2.5 bg-white hover:bg-[#CCFF00] hover:text-black text-black px-7 py-3 rounded-full font-headline text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-2xl group border border-transparent"
            >
              <span>CLAIM PASS (₹0)</span>
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] group-hover:scale-125 transition-transform" />
            </Link>
          </div>

        </div>
      </div>

      {/* 2. MDNT Iconic Neon Lime Divider Line */}
      <div className="w-full h-[2px] bg-[#CCFF00]" />

      {/* 3. Footer Metadata & Navigation Columns (Exact MDNT Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-xs font-mono">
          
          {/* Address & Location */}
          <div className="space-y-4">
            <div>
              <span className="text-white/40 uppercase tracking-widest text-[10px] block mb-1">
                ADDRESS:
              </span>
              <p className="text-white font-bold leading-relaxed">
                YBN UNIVERSITY, RAJAULATU,<br />
                NAMKUM, RANCHI, JHARKHAND — 834010
              </p>
            </div>

            <div>
              <span className="text-white/40 uppercase tracking-widest text-[10px] block mb-1">
                CONTACT &amp; INQUIRIES:
              </span>
              <p className="text-white font-bold">
                INFO@YBNUNIVERSITY.AC.IN
              </p>
              <p className="text-slate-400 mt-0.5">
                YUNIFEST@YBN.EDU.IN
              </p>
            </div>

            <div className="flex items-center gap-4 text-white pt-2 font-bold text-[11px]">
              <span className="cursor-pointer hover:text-[#CCFF00] transition-colors">[ INSTAGRAM ]</span>
              <span className="cursor-pointer hover:text-[#CCFF00] transition-colors">[ LINKEDIN ]</span>
            </div>
          </div>

          {/* Quick Nav Col 1 */}
          <div className="space-y-3 font-headline font-bold text-sm tracking-wider uppercase">
            <div>
              <Link to="/" className="text-[#8B5CF6] hover:text-white transition-colors block">
                HOME
              </Link>
            </div>
            <div>
              <Link to="/events" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                EVENTS EXPLORER
              </Link>
            </div>
            <div>
              <Link to="/schedule" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                3-DAY SCHEDULE
              </Link>
            </div>
            <div>
              <Link to="/regulations" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                REGULATIONS &amp; ID
              </Link>
            </div>
          </div>

          {/* Quick Nav Col 2 */}
          <div className="space-y-3 font-headline font-bold text-sm tracking-wider uppercase">
            <div>
              <Link to="/leadership" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                LEADERSHIP &amp; MENTORS
              </Link>
            </div>
            <div>
              <Link to="/register" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                GET PASS (₹0 ENTRY)
              </Link>
            </div>
            <div>
              <Link to="/admin" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                ORGANIZER PORTAL
              </Link>
            </div>
            <div>
              <a href="#rules" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                ID VERIFICATION DESK
              </a>
            </div>
          </div>

          {/* Dates & Mandate */}
          <div className="space-y-3 font-mono text-xs">
            <div>
              <span className="text-white/40 uppercase tracking-widest text-[10px] block mb-1">
                FESTIVAL DATES:
              </span>
              <p className="text-[#CCFF00] font-black text-sm">
                DECEMBER 10, 11 &amp; 12, 2026
              </p>
            </div>

            <div>
              <span className="text-white/40 uppercase tracking-widest text-[10px] block mb-1">
                ADMISSION POLICY:
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Registration is 100% free (₹0). Physical college/university ID card is strictly mandatory for campus entry.
              </p>
            </div>
          </div>

        </div>

        {/* Copyright & Engineering Attribution Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-5 font-mono text-xs">
          
          {/* Official University Identity */}
          <div className="flex items-center gap-3">
            <img src="/ybn-logo.png" alt="YBN University Ranchi" className="w-7 h-7 rounded-full border border-white/20 bg-white object-contain p-0.5" />
            <p className="text-white/60 text-[11px]">
              © 2026 YBN UNIVERSITY • YUNIFEST. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Student Engineering Attribution */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-[11px] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse shrink-0" />
            <span className="text-white/60">Designed by:</span>
            <span className="text-white font-bold tracking-wide">
              Students of Computer Science (Sachin K, Satyam, Sachin V)
            </span>
          </div>

          {/* Quick Compliance Links */}
          <div className="flex items-center gap-6 text-[11px] text-white/50">
            <Link to="/regulations" className="hover:text-white transition-colors">
              MANDATORY ID POLICY
            </Link>
            <Link to="/admin" className="hover:text-[#CCFF00] transition-colors">
              COMMITTEE LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* 4. GIGANTIC MDNT-STYLE CROPPED BOTTOM WORDMARK: YBNU (Exactly matching 4-letter MDNT styling) */}
      <div className="w-full overflow-hidden select-none pointer-events-none -mb-8 sm:-mb-14 lg:-mb-24">
        <h2 className="font-headline font-black text-[27vw] sm:text-[28vw] tracking-tighter text-white uppercase text-center leading-[0.66] opacity-95 select-none">
          YBNU
        </h2>
      </div>

    </footer>
  );
};
