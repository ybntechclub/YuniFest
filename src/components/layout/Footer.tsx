import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden pt-10 sm:pt-16">
      
      {/* 1. Iconic MDNT Semicircular Rotating Text Arch Dome (Mathematically Divided into 50% Visible & 50% Hidden) */}
      <div className="relative w-full overflow-hidden flex flex-col items-center">
        
        {/* Dome Container: Height is EXACTLY half the circle diameter (D/2) so the lower 50% is submerged below the lime divider */}
        <div className="relative w-full max-w-5xl h-[290px] sm:h-[360px] lg:h-[430px] overflow-hidden flex flex-col justify-end items-center">
          
          {/* Rotating Circular Text:
              Positioned at top-0 with width = height = D (580px mobile / 720px tablet / 860px desktop).
              The circle's center sits PRECISELY on the container's bottom edge:
              -> Exactly 50% (upper semicircle arch) is VISIBLE above the line.
              -> Exactly 50% (lower semicircle) is HIDDEN and clipped below the line.
          */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[580px] h-[580px] sm:w-[720px] sm:h-[720px] lg:w-[860px] lg:h-[860px] pointer-events-none select-none">
            <div className="w-full h-full animate-spin-slow">
              <svg viewBox="0 0 1000 1000" className="w-full h-full">
                <defs>
                  <path
                    id="circlePath"
                    d="M 500, 500 m -390, 0 a 390,390 0 1,1 780,0 a 390,390 0 1,1 -780,0"
                    fill="none"
                  />
                </defs>
                <text
                  style={{ fontFamily: '"Anton", "Syne", sans-serif' }}
                  className="font-black text-[70px] sm:text-[76px] tracking-[0.05em] uppercase"
                >
                  <textPath href="#circlePath" startOffset="0%">
                    <tspan fill="#FFFFFF">LET'S </tspan>
                    <tspan fill="#CCFF00">BUILD </tspan>
                    <tspan fill="#FFFFFF">SOMETHING TOGETHER • </tspan>
                    <tspan fill="#FFFFFF">LET'S </tspan>
                    <tspan fill="#CCFF00">BUILD </tspan>
                    <tspan fill="#FFFFFF">SOMETHING TOGETHER • </tspan>
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Center Callout Box: Prominent & Readable Size Inside the Arch */}
          <div className="relative z-10 text-center max-w-[280px] sm:max-w-md lg:max-w-xl px-4 pb-6 sm:pb-8 lg:pb-10 flex flex-col items-center">
            <h3 className="font-sans font-extrabold text-base sm:text-xl md:text-2xl lg:text-[1.85rem] text-white leading-snug tracking-tight mb-3.5 sm:mb-4 select-none">
              Tell us what you're working on.<br />We'll show you what's possible.
            </h3>

            <Link
              to="/register"
              className="inline-flex items-center gap-2.5 bg-white hover:bg-[#CCFF00] hover:text-black text-slate-950 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-sans text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 shadow-2xl group border border-transparent"
            >
              <span>CLAIM PASS</span>
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

        {/* Copyright Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 font-mono text-xs">
          
          {/* Official University Identity */}
          <div className="flex items-center gap-3">
            <img src="/ybn-logo.png" alt="YBN University Ranchi" className="w-7 h-7 rounded-full border border-white/20 bg-white object-contain p-0.5 animate-spin-slow" />
            <p className="text-white/60 text-[11px]">
              © 2026 YBN UNIVERSITY • YUNIFEST. ALL RIGHTS RESERVED.
            </p>
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

      {/* 3.5. ULTRA HIGH-VISIBILITY AUTO-SLIDING ENGINEERING TICKER TAPE (Continuous Right-to-Left Infinite Scroll with Neon Blinkers) */}
      <div className="w-full bg-slate-950/95 border-y border-[#CCFF00]/40 py-3.5 relative overflow-hidden select-none backdrop-blur-md">
        {/* Soft edge fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        {/* Infinite scrolling marquee track running right-to-left */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-default">
          {[1, 2].map((loopIndex) => (
            <div key={loopIndex} className="flex items-center gap-8 sm:gap-12 px-6 shrink-0 font-mono text-xs sm:text-sm uppercase tracking-wider">
              
              {/* Glowing Neon Lime Blinker Beacon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/70 text-[#CCFF00]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#CCFF00] animate-blinker"></span>
                </span>
                <span className="font-black text-[11px] tracking-widest">LIVE DESK</span>
              </div>

              {/* Main Attribution Title */}
              <span className="text-white font-extrabold flex items-center gap-2">
                <span>⚡ DESIGNED BY STUDENTS OF</span>
                <span className="text-[#CCFF00] font-black underline decoration-[#CCFF00]/40 underline-offset-4">
                  DEPT OF ADVANCE COMPUTING
                </span>
              </span>

              {/* Royal Blue Blinker Dot */}
              <span className="w-2.5 h-2.5 rounded-full bg-[#2B59FF] animate-pulse" />

              {/* Student Creators with Sachin K, Satyam, Sachin V, and Pawan K */}
              <span className="text-slate-200 font-bold flex items-center gap-2">
                <span className="text-slate-400">CREW:</span>
                <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
                  SACHIN K.
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
                  SATYAM
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
                  SACHIN V.
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
                  PAWAN K.
                </span>
              </span>

              {/* University Badge with Royal Blue Blinker Beacon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B59FF]/20 border border-[#2B59FF]/60 text-[#2B59FF]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2B59FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2B59FF]"></span>
                </span>
                <span className="font-black text-[11px] tracking-widest text-white">YBN UNIVERSITY, RANCHI</span>
              </div>

              <span className="text-slate-400 font-bold">
                YUNIFEST 2026 OFFICIAL DIGITAL PLATFORM
              </span>

              {/* Butter Yellow Blinker Dot */}
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEF08A] animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* 4. GIGANTIC MDNT-STYLE CROPPED BOTTOM WORDMARK: YBNU (Calibrated font size so all 4 letters are 100% visible) */}
      <div className="w-full max-w-full overflow-hidden select-none pointer-events-none -mb-6 sm:-mb-10 lg:-mb-16 flex justify-center items-center">
        <h2 className="font-headline font-black text-[20vw] sm:text-[21vw] lg:text-[22vw] tracking-tighter text-white uppercase text-center leading-[0.72] opacity-95 select-none w-full block px-2">
          YBNU
        </h2>
      </div>

    </footer>
  );
};
