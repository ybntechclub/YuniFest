import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { RollText } from '../ui/RollText';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden pt-20">
      
      {/* 1. Rotating Text Arch Callout - Cropped at the lime line like MDNT */}
      <div className="relative w-full overflow-hidden pt-12 sm:pt-20">
        <div className="relative max-w-4xl mx-auto h-[290px] sm:h-[380px] flex items-center justify-center overflow-hidden">
          
          {/* Rotating Circular Text SVG */}
          <div className="absolute -top-10 sm:-top-16 left-1/2 -translate-x-1/2 w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] animate-spin-slow pointer-events-none select-none">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <defs>
                <path
                  id="circlePath"
                  d="M 250, 250 m -195, 0 a 195,195 0 1,1 390,0 a 195,195 0 1,1 -390,0"
                  fill="none"
                />
              </defs>
              <text className="font-headline font-black text-[20px] sm:text-[23px] tracking-[0.24em] uppercase">
                <textPath href="#circlePath" startOffset="0%">
                  <tspan fill="#CCFF00">LET'S CELEBRATE </tspan>
                  <tspan fill="#FFFFFF">TOGETHER • YUNIFEST 2026 • ONE CAMPUS • </tspan>
                  <tspan fill="#CCFF00">THREE DAYS </tspan>
                  <tspan fill="#FFFFFF">• ENDLESS POSSIBILITIES • </tspan>
                </textPath>
              </text>
            </svg>
          </div>

          {/* Center Callout Box inside the Arch */}
          <div className="relative z-10 text-center max-w-md px-6 flex flex-col items-center mt-6 sm:mt-12">
            <h3 className="font-headline font-black text-2xl sm:text-4xl text-white uppercase leading-[1.05] tracking-tight mb-2 sm:mb-3">
              One Campus. Three Days.<br />Endless Possibilities.
            </h3>
            <p className="font-display text-xs sm:text-sm text-slate-300 mb-5 max-w-sm leading-relaxed">
              Dec 10, 11 &amp; 12, 2026 • YBN University, Ranchi • Free ₹0 Pass
            </p>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#CCFF00] hover:text-black text-black px-7 py-2.5 sm:py-3 rounded-full font-headline text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-2xl group"
            >
              <RollText text="CLAIM PASS (₹0)" highlightColor="text-black" />
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] group-hover:scale-125 transition-transform" />
            </Link>
          </div>

        </div>
      </div>

      {/* 2. MDNT Iconic Lime Divider Line */}
      <div className="w-full h-[2px] bg-[#CCFF00]" />

      {/* 3. Footer Metadata & Navigation Columns */}
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
                CONTACT & INQUIRIES:
              </span>
              <p className="text-white font-bold">
                INFO@YBNUNIVERSITY.AC.IN
              </p>
              <p className="text-slate-400 mt-0.5">
                YUNIFEST@YBN.EDU.IN
              </p>
            </div>

            <div className="flex items-center gap-4 text-white pt-2">
              <span className="hover-glitch cursor-pointer font-bold hover:text-[#CCFF00]">[ INSTAGRAM ]</span>
              <span className="hover-glitch cursor-pointer font-bold hover:text-[#CCFF00]">[ LINKEDIN ]</span>
            </div>
          </div>

          {/* Quick Nav Col 1 */}
          <div className="space-y-3 font-headline font-bold text-sm tracking-wider uppercase">
            <div>
              <Link to="/" className="text-[#8B5CF6] hover:text-white transition-colors hover-glitch block">
                HOME
              </Link>
            </div>
            <div>
              <Link to="/events" className="text-white/80 hover:text-[#CCFF00] transition-colors hover-glitch block">
                EVENTS EXPLORER
              </Link>
            </div>
            <div>
              <Link to="/schedule" className="text-white/80 hover:text-[#CCFF00] transition-colors hover-glitch block">
                3-DAY SCHEDULE
              </Link>
            </div>
            <div>
              <Link to="/regulations" className="text-white/80 hover:text-[#CCFF00] transition-colors hover-glitch block">
                REGULATIONS &amp; ID
              </Link>
            </div>
          </div>

          {/* Quick Nav Col 2 */}
          <div className="space-y-3 font-headline font-bold text-sm tracking-wider uppercase">
            <div>
              <Link to="/leadership" className="text-white/80 hover:text-[#CCFF00] transition-colors hover-glitch block">
                LEADERSHIP &amp; MENTORS
              </Link>
            </div>
            <div>
              <Link to="/register" className="text-white/80 hover:text-[#CCFF00] transition-colors hover-glitch block">
                GET PASS (₹0 ENTRY)
              </Link>
            </div>
            <div>
              <Link to="/admin" className="text-white/80 hover:text-[#CCFF00] transition-colors hover-glitch block">
                ORGANIZER PORTAL
              </Link>
            </div>
            <div>
              <a href="#rules" className="text-white/80 hover:text-[#CCFF00] transition-colors hover-glitch block">
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

        {/* Copyright strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/50">
          <p>© 2026 YBN UNIVERSITY • YUNIFEST. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <Link to="/regulations" className="hover:text-white transition-colors">
              MANDATORY ID POLICY
            </Link>
            <Link to="/admin" className="hover:text-white transition-colors">
              COMMITTEE LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* 4. GIGANTIC MDNT-STYLE CROPPED BOTTOM WORDMARK (Exactly like Screenshot 1) */}
      <div className="w-full overflow-hidden select-none pointer-events-none -mb-6 sm:-mb-10 lg:-mb-16">
        <h2 className="font-headline font-black text-[22vw] tracking-tighter text-white uppercase text-center leading-[0.72] opacity-95">
          YUNIFEST
        </h2>
      </div>

    </footer>
  );
};
