import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Flame } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.95;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Items ordered to match Screenshot (Image 1)
  const tickerItems = [
    "TREASURE HUNT (CAP: 6 TEAMS)",
    "DANCE & SINGING BATTLES",
    "GRAND FASHION RUNWAY",
    "OPEN-AIR MEGA EDM DJ NIGHT",
    "PASS: ₹399 INTERNAL / ₹499 VISITOR",
    "YUNIFEST 2026",
    "YBN UNIVERSITY, RANCHI",
    "DECEMBER 10, 11 & 12, 2026",
    "15+ STAGE SHOWCASES",
    "ESPORTS: BGMI & FREE FIRE",
  ];

  return (
    <section className="relative pt-20 sm:pt-22 pb-2 sm:pb-3 bg-white text-[#0A367B] overflow-hidden">
      
      {/* 1. Kinetic Ticker Tape matching Screenshot 1 (crisp top/bottom black borders & font-black) */}
      <div className="w-full border-y-[1.5px] border-slate-900 bg-[#FEF08A] py-1.5 sm:py-2 mb-4 sm:mb-5 overflow-hidden ticker-tape shadow-xs relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center mx-4 sm:mx-6">
              <span className="font-headline font-black text-xs sm:text-sm tracking-wider uppercase text-slate-950 hover:text-[#2B59FF] transition-colors">
                {item}
              </span>
              <span className="font-mono text-xs text-slate-950 mx-3 sm:mx-4 font-black">
                ///
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Split Hero Content: 50/50 Balanced Grid for Wide Landscape Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-3 sm:mb-4">
          
          {/* Left Column (6 Cols on desktop): Badges, Editorial Headline, Highlighted Date, Description & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between py-1">
            <div>
              {/* Top Pill Badge: YUNIFEST 2026 • THE EXPERIENCE */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-3 sm:mb-3.5"
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#0A367B] text-white font-roboto font-bold text-xs sm:text-[13px] tracking-wider uppercase shadow-xs select-none">
                  YUNIFEST 2026 • THE EXPERIENCE
                </span>
              </motion.div>

              {/* Main Header in Source Serif 4 */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sourceserif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3rem] text-[#0A367B] uppercase leading-[1.12] tracking-tight select-none"
              >
                THREE DAYS. ZERO LIMITS. UNREAL MEMORIES.
              </motion.h1>

              {/* Sub-heading in Roboto Bold */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-roboto font-bold text-base sm:text-lg md:text-xl text-[#0A367B] leading-snug mt-2.5 sm:mt-3 select-none"
              >
                Where Youth Meets Culture. Where Moments Become Stories.
              </motion.h2>

              {/* Highlighted Mark Date Pill Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-3 mb-1.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF08A] border border-amber-300 shadow-xs select-none"
              >
                <span className="w-2 h-2 rounded-full bg-[#0A367B] animate-pulse shrink-0" />
                <span className="font-roboto font-bold text-xs sm:text-sm text-slate-950 uppercase tracking-wide">
                  December 10 To 12, 2026
                </span>
                <span className="text-[10px] font-mono font-black text-[#0A367B] uppercase bg-white/90 px-2 py-0.5 rounded-full shadow-2xs">
                  3 DAYS LIVE
                </span>
              </motion.div>

              {/* Body Text in Roboto Regular */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-3 sm:mt-3.5 font-roboto font-normal text-xs sm:text-sm md:text-base text-[#0A367B] max-w-xl leading-relaxed"
              >
                Yunifest 2026 is more than a festival — it's where campus life comes alive. Three days of non-stop energy, epic competitions, innovation showcases, intense gaming battles and electrifying live performances.
              </motion.p>

              {/* Closing punchline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-2 sm:mt-2.5 font-roboto font-bold text-xs sm:text-sm md:text-base text-[#0A367B] select-none"
              >
                Show up. Stand out. Live the vibe.
              </motion.p>

              {/* Action Pathways */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3"
              >
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-[#0A367B] text-white font-roboto font-bold text-xs sm:text-sm shadow-sm hover:bg-[#072a60] transition-all duration-200 active:scale-95"
                >
                  <span>GET FESTIVAL PASS (₹399)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#0A367B] font-roboto font-semibold text-xs sm:text-sm shadow-2xs hover:bg-slate-50 transition-all duration-200"
                >
                  <span>EXPLORE 15+ EVENTS</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Video Card matching Screenshot 2 (Crisp solid black border & solid-pop-lg shadow) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-6 relative rounded-[28px] sm:rounded-[32px] border-[1.5px] border-slate-900 overflow-hidden bg-slate-950 shadow-solid-pop-lg h-full min-h-[350px] sm:min-h-[400px] lg:min-h-[440px] xl:min-h-[470px] flex flex-col justify-between text-white group"
          >
            {/* Authentic Festival Concert Crowd Video Loop in Wide Landscape */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster="/festival-crowd-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
            >
              <source src="/festival-crowd.mp4" type="video/mp4" />
            </video>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

            {/* Top Badges: Final Day White Pill + Massive DJ Night Waveform Indicator */}
            <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-slate-950 border-[1.5px] border-slate-900 font-roboto font-bold text-xs sm:text-sm shadow-xs select-none">
                Final Day
              </span>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-[#FEF08A] font-mono text-[10px] sm:text-[11px] font-bold shadow-xs">
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-[#FEF08A] rounded-full animate-pulse h-2" />
                  <span className="w-0.5 bg-[#FEF08A] rounded-full animate-bounce h-3" />
                  <span className="w-0.5 bg-[#FEF08A] rounded-full animate-pulse h-1.5" />
                  <span className="w-0.5 bg-[#FEF08A] rounded-full animate-bounce h-2.5" />
                </div>
                <span>MASSIVE DJ NIGHT</span>
              </div>
            </div>

            {/* Center Area */}
            <div className="relative z-10 my-auto" />

            {/* Bottom Bar: "A energy packed DJ Perfomance by ???????" in Deep Blue */}
            <div className="relative z-10 w-full bg-[#0A367B] px-5 sm:px-7 py-3.5 sm:py-4 border-t-[1.5px] border-slate-900 shadow-md">
              <p className="font-sourceserif font-bold text-white text-sm sm:text-base md:text-lg tracking-wide">
                A energy packed DJ Perfomance by ???????
              </p>
            </div>
          </motion.div>

        </div>

        {/* 3. Stage Activation Countdown Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-2 sm:pt-2.5 border-t border-slate-200/80"
        >
          <div className="flex flex-wrap items-center justify-between font-roboto text-[10px] sm:text-xs uppercase tracking-wider text-[#3869A6] mb-1.5 px-1 font-bold gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#0A367B]">[ STAGE ACTIVATION COUNTDOWN ]</span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">• Live Ticking</span>
            </div>
            <span>DEC 10, 2026 // 10:00 AM IST • YBN CAMPUS MAIN ARENA</span>
          </div>
          <CountdownTimer />
        </motion.div>

      </div>
    </section>
  );
};
