import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RollText } from '../ui/RollText';

export const FestOverview: React.FC = () => {
  const pillars = [
    {
      num: "01",
      tag: "TECH & ESPORTS",
      title: "TACTICAL GAMING & INNOVATION",
      desc: "High-stakes Battle Royale tournaments in BGMI and Free Fire Max, alongside working agricultural telemetry and robotics prototype presentations.",
      link: "/events?category=gaming",
      badge: "BGMI & FREE FIRE",
      gradient: "from-cyan-950/40 via-[#0B1526] to-[#040814]",
      accentGlow: "group-hover:border-cyan-400/50 group-hover:shadow-[0_0_35px_rgba(6,182,212,0.15)]",
      accentTag: "text-cyan-400 border-cyan-500/30",
    },
    {
      num: "02",
      tag: "PERFORMING ARTS",
      title: "CHOREOGRAPHY & VOCAL SHOWDOWN",
      desc: "Solo, duo, and group dance battles on the grand amphitheatre stage, classical and Bollywood vocal showdowns, and live observational stand-up comedy.",
      link: "/events?category=cultural",
      badge: "AMPHITHEATRE STAGE",
      gradient: "from-purple-950/40 via-[#100D22] to-[#040814]",
      accentGlow: "group-hover:border-purple-400/50 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.15)]",
      accentTag: "text-purple-300 border-purple-500/30",
    },
    {
      num: "03",
      tag: "CAMPUS EXPEDITION",
      title: "TREASURE HUNTING & REELS",
      desc: "Campus-wide cryptic clue adventure strictly capped at 25 teams on first-come basis, and 30-60 second viral cinematic festival reels.",
      link: "/events?category=competition",
      badge: "STRICT CAP: 25 TEAMS",
      gradient: "from-amber-950/40 via-[#161208] to-[#040814]",
      accentGlow: "group-hover:border-[#CCFF00]/50 group-hover:shadow-[0_0_35px_rgba(204,255,0,0.15)]",
      accentTag: "text-[#CCFF00] border-[#CCFF00]/30",
    },
    {
      num: "04",
      tag: "GRAND FINALE",
      title: "RUNWAY COUTURE & DJ NIGHT",
      desc: "Haute couture designer ramp walk sequence, official University honor roll felicitation, and an open-air laser EDM DJ night to wrap YUNIFEST 2026.",
      link: "/events?category=special",
      badge: "AFTER DARK CELEBRATION",
      gradient: "from-rose-950/40 via-[#170912] to-[#040814]",
      accentGlow: "group-hover:border-pink-400/50 group-hover:shadow-[0_0_35px_rgba(244,63,94,0.15)]",
      accentTag: "text-pink-400 border-pink-500/30",
    },
  ];

  const metrics = [
    { value: "03", label: "INTENSE DAYS", sub: "DECEMBER 10, 11 & 12" },
    { value: "15+", label: "OFFICIAL SHOWCASES", sub: "TECHNICAL & CULTURAL" },
    { value: "₹0", label: "REGISTRATION FEE", sub: "COMPLETELY FREE PARTICIPATION" },
    { value: "25", label: "TREASURE HUNT CAP", sub: "STRICT TEAM QUOTA" },
  ];

  return (
    <section className="py-24 bg-black relative border-t border-white/10">
      
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0E1A38]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header: Bold Editorial Manifesto with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16 sm:mb-20"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] mb-3 flex items-center gap-2">
            <span>[ 01 // FESTIVAL MANIFESTO ]</span>
          </div>

          <h2 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase leading-[1.05] tracking-tight">
            TRANSLATING YOUTH PASSION INTO MOMENTS{' '}
            <span className="text-white/40">PEOPLE ACTUALLY TALK ABOUT.</span>
          </h2>

          <p className="font-display text-sm sm:text-base text-slate-300 mt-5 leading-relaxed max-w-2xl">
            YBN University, Ranchi brings together innovators, performers, strategists, and gamers across Jharkhand for three relentless days of competition, creativity, and cultural fellowship.
          </p>
        </motion.div>

        {/* 4 Interactive Luxury Cards (Staggered Scroll Reveal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
            >
              <Link
                to={item.link}
                className={`group relative block rounded-3xl p-8 sm:p-10 border border-white/10 bg-gradient-to-b ${item.gradient} backdrop-blur-xl transition-all duration-400 hover:-translate-y-1.5 ${item.accentGlow} crosshair-corner overflow-hidden`}
              >
                {/* Top Metas */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white/50 group-hover:text-white transition-colors">
                      [ {item.num} // {item.tag} ]
                    </span>
                  </div>

                  <span className={`font-mono text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border ${item.accentTag}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline font-black text-2xl sm:text-3xl text-white mb-3 group-hover:text-[#CCFF00] transition-colors tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-display text-xs sm:text-sm text-slate-300 leading-relaxed mb-8 max-w-md">
                  {item.desc}
                </p>

                {/* Bottom Interactive Link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-headline text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#CCFF00] transition-colors">
                    <RollText text="EXPLORE DISCIPLINE" highlightColor="text-[#CCFF00]" />
                  </span>

                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-black group-hover:bg-[#CCFF00] group-hover:border-[#CCFF00] group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Editorial Numbers Strip (Like MDNT Stats) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-white/10 rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-white/[0.04] to-black backdrop-blur-md"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((m, i) => (
              <div key={i} className="space-y-1">
                <div className="font-headline font-black text-4xl sm:text-6xl text-white tracking-tight">
                  {m.value}
                </div>
                <div className="font-mono text-xs font-bold text-[#CCFF00] uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
