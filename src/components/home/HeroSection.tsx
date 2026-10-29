import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Calendar, MapPin, Play } from 'lucide-react';
import { RollText } from '../ui/RollText';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.95;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const sponsorLogos = [
    { name: "YBN INNOVATION", sub: "FACULTY OF TECH" },
    { name: "NIGHTLIGHT", sub: "CAMPUS LIVE" },
    { name: "RED BULL", sub: "ESPORTS ARENA" },
    { name: "AGRITECH GUILD", sub: "RANCHI" },
    { name: "CULTURAL WING", sub: "JHARKHAND" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { y: "40%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 bg-[#F6F7F9] text-slate-950 overflow-hidden">
      
      {/* Decorative Minimalist Geometric Accent in Background */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#FEF08A]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#2B59FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Top Editorial Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[1.5px] border-slate-900 text-xs font-mono font-bold text-slate-900 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#2B59FF] animate-pulse" />
            <span>YBN UNIVERSITY, RANCHI • DEC 10-12, 2026</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF08A] border-[1.5px] border-slate-900 text-xs font-mono font-bold text-slate-900">
            <span>OFFICIAL PASS: ₹0 (FREE ENTRY)</span>
          </div>
        </motion.div>

        {/* Hero Main Headline (Bold Minimalist & Editorial Style) */}
        <div className="mb-10 sm:mb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl"
          >
            <div className="overflow-hidden">
              <motion.h1
                variants={lineVariants}
                className="font-headline font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tight text-slate-950 uppercase leading-[0.94] select-none"
              >
                WE CONNECT YOUTH &amp;<br className="hidden sm:inline" />
                CULTURE THROUGH<br className="hidden sm:inline" />
                UNIQUE{' '}
                <span className="inline-block px-3 py-0.5 my-1 bg-[#2B59FF] text-white rounded-2xl border-[1.5px] border-slate-900 shadow-solid-pop">
                  IN-REAL-LIFE
                </span>{' '}
                EXPERIENCES
              </motion.h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4 border-t-[1.5px] border-slate-900/15"
          >
            <p className="font-display text-sm sm:text-base text-slate-700 max-w-xl leading-relaxed">
              <strong className="text-slate-950">YUNIFEST 2026</strong> translates university spirit into unforgettable moments. Three relentless days of competitions, innovation galleries, battle royale gaming, and live concerts.
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/register"
                className="btn-voltage inline-flex items-center gap-2 text-xs py-3.5 px-7"
              >
                <RollText text="CLAIM PASS (₹0)" highlightColor="text-white" />
                <span className="w-2 h-2 rounded-full bg-[#FEF08A]" />
              </Link>

              <Link
                to="/events"
                className="btn-outline-luxe inline-flex items-center gap-2 text-xs py-3.5 px-6"
              >
                <RollText text="VIEW EVENTS" highlightColor="text-[#2B59FF]" />
                <ArrowUpRight className="w-4 h-4 text-slate-900" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Framed Cinematic Concert Video Arena (Editorial Neo-Card with 1.5px Dark Border) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative rounded-[32px] sm:rounded-[40px] border-[1.5px] border-slate-900 overflow-hidden bg-slate-950 shadow-solid-pop-lg h-[340px] sm:h-[480px] lg:h-[560px]"
        >
          {/* Looping Authentic Concert Crowd Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/festival-crowd-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-95 contrast-105"
          >
            <source src="/festival-crowd.mp4" type="video/mp4" />
          </video>

          {/* Gradients & Framing */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

          {/* Floating Live Badge Top Left */}
          <div className="absolute top-5 left-5 sm:top-8 sm:left-8 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border-[1.5px] border-slate-900 text-slate-900 font-mono text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>CAMPUS LIVE // FESTIVAL ARENA</span>
          </div>

          {/* Floating Stats Badge Top Right */}
          <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/20 text-white font-mono text-xs">
            <span className="text-[#FEF08A] font-bold">15+ EVENTS</span>
            <span className="text-white/40">•</span>
            <span>3 DAYS</span>
            <span className="text-white/40">•</span>
            <span className="text-emerald-400 font-bold">₹0 PASS</span>
          </div>

          {/* Video Bottom Overlays */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="max-w-md">
              <span className="font-mono text-[10px] text-[#FEF08A] uppercase font-bold tracking-widest block mb-1">
                [ ANNUAL MEGA FESTIVAL ]
              </span>
              <h3 className="font-headline font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                ONE CAMPUS. THREE DAYS.<br />ENDLESS POSSIBILITIES.
              </h3>
            </div>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 self-start sm:self-auto bg-white text-slate-950 hover:bg-[#FEF08A] px-6 py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all shadow-lg border-[1.5px] border-slate-900"
            >
              <span>CLAIM YOUR BADGE</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Minimalist Monochromatic Brand Marks Strip */}
        <div className="mt-8 pt-6 border-t-[1.5px] border-slate-900/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <span className="font-mono text-xs uppercase font-bold tracking-wider text-slate-500 shrink-0">
            [ INSTITUTIONAL PILLARS &amp; ALLIANCES ]
          </span>

          <div className="flex items-center flex-wrap gap-6 sm:gap-10">
            {sponsorLogos.map((brand, i) => (
              <div key={i} className="flex flex-col group cursor-default">
                <span className="font-headline font-black text-xs sm:text-sm tracking-wider text-slate-900 uppercase group-hover:text-[#2B59FF] transition-colors">
                  {brand.name}
                </span>
                <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase">
                  {brand.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
