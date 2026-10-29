import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

  // Motion variants
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
    hidden: { y: "60%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const fadeUpVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 overflow-hidden bg-black text-white">
      
      {/* 1. Background Video Play Effect (Exact MDNT Concert Crowd Video) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/festival-crowd-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-90 contrast-110"
        >
          <source src="/festival-crowd.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Film Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/70" />
      </div>

      {/* 2. Top Spacer */}
      <div className="relative z-10 w-full h-2 sm:h-6" />

      {/* 3. Hero Main Headline (Proportional, Balanced, Left-Aligned with Motion) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 py-4 sm:py-6 my-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <div className="overflow-hidden">
            <motion.h1
              variants={lineVariants}
              className="font-headline font-black text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.5rem] tracking-tight text-white uppercase leading-[0.96] select-none"
            >
              WE CONNECT YOUTH &amp;<br className="hidden sm:inline" />
              CULTURE THROUGH<br className="hidden sm:inline" />
              UNIQUE{' '}
              <span className="text-[#CCFF00] inline">
                IN-REAL-LIFE<br className="hidden sm:inline" />
                EXPERIENCES
              </span>
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {/* 4. Bottom Hero Row: Left Logos + Right Copy & Rolling Buttons */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 pt-4 pb-2">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 sm:gap-8 pt-6 border-t border-white/10"
        >
          
          {/* Left: Monochromatic Marks */}
          <motion.div variants={fadeUpVariants} className="w-full lg:w-auto">
            <div className="flex items-center flex-wrap gap-6 sm:gap-8 opacity-75 hover:opacity-100 transition-opacity">
              {sponsorLogos.map((brand, i) => (
                <div key={i} className="flex flex-col select-none hover-glitch cursor-default">
                  <span className="font-headline font-black text-xs sm:text-sm tracking-wider text-white uppercase">
                    {brand.name}
                  </span>
                  <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase">
                    {brand.sub}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Copy & Dual Action Rolling Buttons */}
          <motion.div variants={fadeUpVariants} className="w-full lg:max-w-md space-y-4">
            <p className="font-display text-xs sm:text-sm text-white/80 leading-relaxed">
              <strong className="text-white">YUNIFEST 2026</strong> (YBN University, Ranchi) translates campus energy into moments people actually talk about. One Campus. Three Days. Endless Possibilities.
            </p>

            <div className="flex items-center gap-3">
              {/* Button 1: Dark pill with lime dot and rolling text */}
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-[#181818]/90 hover:bg-white hover:text-black border border-white/20 text-white px-6 py-2.5 rounded-full font-headline text-xs font-bold uppercase tracking-wider transition-all active:scale-95 group shadow-lg"
              >
                <RollText text="GET PASS" highlightColor="text-black group-hover:text-black" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] group-hover:scale-125 transition-transform" />
              </Link>

              {/* Button 2: Transparent outline button with rolling text */}
              <Link
                to="/events"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 border border-white/30 text-white px-6 py-2.5 rounded-full font-headline text-xs font-bold uppercase tracking-wider transition-all active:scale-95 group"
              >
                <RollText text="VIEW EVENTS" highlightColor="text-[#CCFF00]" />
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
};
