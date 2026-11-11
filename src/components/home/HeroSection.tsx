import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, FileText } from 'lucide-react';
import { RollText } from '../ui/RollText';
import { CountdownTimer } from './CountdownTimer';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.95;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const tickerItems = [
    "YUNIFEST 2026",
    "YBN UNIVERSITY, RANCHI",
    "DECEMBER 10, 11 & 12, 2026",
    "15+ STAGE SHOWCASES",
    "ESPORTS: BGMI & FREE FIRE",
    "TREASURE HUNT (CAP: 6 TEAMS)",
    "DANCE & SINGING BATTLES",
    "GRAND FASHION RUNWAY",
    "OPEN-AIR MEGA EDM DJ NIGHT",
    "PASS: ₹399 INTERNAL / ₹499 VISITOR",
  ];

  const lineVariants = {
    hidden: { y: "115%", opacity: 0, rotate: 1 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.75,
        delay: 0.1 + i * 0.12,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="relative pt-16 sm:pt-20 pb-2 sm:pb-3 bg-[#F6F7F9] text-slate-950 overflow-hidden">
      
      {/* Decorative Minimalist Geometric Ambient Glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#FEF08A]/40 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#2B59FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Kinetic Ticker Tape (Replacing previous top badges as requested in Screenshot 1 -> Screenshot 2) */}
      <div className="w-full border-y-[1.5px] border-slate-900 bg-[#FEF08A] py-1.5 sm:py-2 mb-3 sm:mb-5 overflow-hidden ticker-tape shadow-xs relative z-20">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Split Hero Content: Left Side Text & CTAs + Right Side Dance / Concert Arena Video Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-2.5 sm:mb-3">
          
          {/* Left Column: Headline, Description & Action Buttons (7 Cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Line 1: WE CONNECT + Luxury Editorial Youth & Culture */}
              <div className="overflow-hidden py-0.5">
                <motion.h1
                  custom={0}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3.15rem] tracking-tight text-slate-950 uppercase leading-[1.05] select-none"
                >
                  <span className="hover:text-[#2B59FF] transition-colors duration-200 cursor-default">
                    WE CONNECT
                  </span>{' '}
                  <span className="font-editorial italic font-normal text-[#2B59FF] text-[1.1em] normal-case tracking-normal inline-block hover:scale-105 transition-transform cursor-default">
                    Youth &amp; Culture
                  </span>
                </motion.h1>
              </div>

              {/* Line 2: THROUGH UNIQUE [IN-REAL-LIFE] */}
              <div className="overflow-hidden py-0.5 sm:py-1">
                <motion.div
                  custom={1}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3.15rem] tracking-tight text-slate-950 uppercase leading-[1.05] flex flex-wrap items-center gap-x-2.5 gap-y-1.5 select-none"
                >
                  <span className="hover:text-[#2B59FF] transition-colors duration-200 cursor-default">
                    THROUGH UNIQUE
                  </span>
                  
                  {/* Electric Blue Pill with Continuous Shimmer Sweep Reflection */}
                  <span className="relative inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-0.5 bg-[#2B59FF] text-white rounded-2xl border-[1.5px] border-slate-900 shadow-solid-pop hover:shadow-solid-pop-lg hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-default overflow-hidden">
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />
                    <span className="relative z-10 font-black tracking-normal text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] xl:text-[2.35rem] leading-none">
                      IN-REAL-LIFE
                    </span>
                    <span className="relative z-10 w-2 h-2 rounded-full bg-[#FEF08A] animate-pulse shrink-0" />
                  </span>
                </motion.div>
              </div>

              {/* Line 3: EXPERIENCES + Editorial Accent Note + Floating Sticker */}
              <div className="overflow-hidden py-0.5 flex flex-wrap items-center gap-2 sm:gap-3">
                <motion.h1
                  custom={2}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3.15rem] tracking-tight text-slate-950 uppercase leading-[1.05] select-none"
                >
                  <span className="hover:text-[#2B59FF] transition-colors duration-200 cursor-default">
                    EXPERIENCES
                  </span>
                </motion.h1>

                {/* Editorial Accent Note */}
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="font-editorial italic text-slate-500 hover:text-slate-900 text-base sm:text-lg md:text-xl normal-case tracking-normal inline-block select-none transition-colors"
                >
                  ~ live at YBN campus
                </motion.span>

                {/* Floating Animated Sticker Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -8 }}
                  animate={{ scale: 1, rotate: [-2, 2, -2] }}
                  transition={{
                    scale: { duration: 0.5, delay: 0.45 },
                    rotate: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
                  }}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FEF08A] text-slate-900 text-[10px] sm:text-[11px] font-mono font-black uppercase rounded-full border-[1.5px] border-slate-900 shadow-xs select-none"
                >
                  <Sparkles className="w-3 h-3 text-[#2B59FF]" />
                  <span>DEC 10-12</span>
                </motion.div>
              </div>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-3.5 sm:mt-4 font-display text-sm sm:text-base text-slate-700 max-w-xl leading-relaxed"
              >
                <strong className="text-slate-950 font-bold">YUNIFEST 2026</strong> translates university spirit into unforgettable moments. Three relentless days of competitions, innovation galleries, battle royale gaming, and live concerts.
              </motion.p>
            </div>

            {/* Action Buttons CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3 pt-3 border-t-[1.5px] border-slate-900/10"
            >
              <Link
                to="/register"
                className="btn-voltage inline-flex items-center gap-2 text-xs py-3 sm:py-3.5 px-6 sm:px-7"
              >
                <RollText text="REGISTER NOW" highlightColor="text-white" />
                <span className="w-2 h-2 rounded-full bg-[#FEF08A]" />
              </Link>

              <a
                href="/#pricing"
                className="btn-outline-luxe inline-flex items-center gap-2 text-xs py-3 sm:py-3.5 px-5 sm:px-6"
              >
                <RollText text="VIEW PASS PLANS" highlightColor="text-[#2B59FF]" />
                <ArrowUpRight className="w-4 h-4 text-slate-900" />
              </a>

              <a
                href="/yunifest-2026-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs py-3 sm:py-3.5 px-4 sm:px-5 rounded-full bg-white hover:bg-[#FEF08A] text-slate-950 border-[1.5px] border-slate-900 font-display font-bold uppercase tracking-wider transition-all shadow-xs hover:-translate-y-0.5 group"
                title="Open Official Festival Schedule & Brochure (PDF)"
              >
                <FileText className="w-4 h-4 text-[#2B59FF]" />
                <span>SCHEDULE PDF</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: The Dance Bar / Concert Arena Video Visual (5 Cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-5 relative rounded-[28px] sm:rounded-[32px] border-[1.5px] border-slate-900 overflow-hidden bg-slate-950 shadow-solid-pop-lg h-[310px] sm:h-[350px] lg:h-[380px] xl:h-[405px] min-h-[310px] lg:min-h-[380px] flex flex-col justify-between p-5 sm:p-6 text-white group"
          >
            {/* Looping Authentic Concert Crowd Video */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster="/festival-crowd-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-95 contrast-105 group-hover:scale-110 transition-transform duration-700"
            >
              <source src="/festival-crowd.mp4" type="video/mp4" />
            </video>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/50 pointer-events-none" />

            {/* Top Floating Badges: Live Arena Tag + Equalizer Waveform Bars */}
            <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border-[1.5px] border-slate-900 text-slate-950 font-mono text-[10px] sm:text-[11px] font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>CAMPUS LIVE // FESTIVAL ARENA</span>
              </div>

              {/* Music / Dance Equalizer Waveform Bars */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[#FEF08A] font-mono text-[10px] font-bold">
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-[#FEF08A] rounded-full animate-pulse h-2" />
                  <span className="w-0.5 bg-[#FEF08A] rounded-full animate-bounce h-3" />
                  <span className="w-0.5 bg-[#FEF08A] rounded-full animate-pulse h-1.5" />
                  <span className="w-0.5 bg-[#FEF08A] rounded-full animate-bounce h-2.5" />
                </div>
                <span>MASSIVE DJ NIGHT</span>
              </div>
            </div>

            {/* Middle Badge / Tier Indicator */}
            <div className="relative z-10 my-auto py-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px]">
                <span className="text-[#FEF08A] font-bold">15+ EVENTS</span>
                <span className="text-white/40">•</span>
                <span>3 DAYS</span>
                <span className="text-white/40">•</span>
                <span className="text-emerald-400 font-bold">₹399 INTERNAL / ₹499 VISITOR</span>
              </span>
            </div>

            {/* Bottom Content & Register Now CTA */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 pt-2.5 border-t border-white/15">
              <div>
                <span className="font-mono text-[10px] text-[#FEF08A] uppercase font-bold tracking-widest block mb-0.5">
                  [ ANNUAL MEGA FESTIVAL ]
                </span>
                <h3 className="font-headline font-black text-lg sm:text-xl text-white uppercase tracking-tight leading-tight">
                  One fest, endless vibes.
                </h3>
              </div>

              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-[#FEF08A] text-slate-950 px-3.5 py-1.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all shadow-md border-[1.5px] border-slate-900 self-start sm:self-auto shrink-0 hover:scale-105"
              >
                <span>REGISTER NOW</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* 3. Stage Activation Countdown Banner (Integrated at bottom of HeroSection as requested) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="pt-2.5 sm:pt-3 border-t-[1.5px] border-slate-900/15"
        >
          <div className="flex flex-wrap items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-600 mb-2 px-1 font-bold gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#2B59FF]">[ STAGE ACTIVATION COUNTDOWN ]</span>
              <span className="font-editorial italic text-xs sm:text-sm text-slate-500 font-semibold">• Live Ticking</span>
            </div>
            <span>DEC 10, 2026 // 10:00 AM IST • YBN CAMPUS MAIN ARENA</span>
          </div>
          <CountdownTimer />
        </motion.div>

      </div>
    </section>
  );
};
