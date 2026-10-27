import React from 'react';
import { Cpu, Music, Sparkles, PartyPopper, ArrowUpRight, Flame, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FestOverview: React.FC = () => {
  const pillars = [
    {
      num: "01",
      tag: "TECH & ESPORTS",
      title: "Tactical Gaming & Innovation",
      desc: "High-stakes Battle Royale tournaments in BGMI and Free Fire, alongside forward-looking agricultural, environmental, and engineering prototype exhibitions.",
      link: "/events?category=gaming",
      accent: "text-cyan-400",
      border: "hover:border-cyan-400/50",
    },
    {
      num: "02",
      tag: "PERFORMING ARTS",
      title: "Choreography & Vocal Showdown",
      desc: "Solo, duo, and group dance battles on the grand amphitheatre stage, Eastern & Western musical vocal face-offs, and live observational stand-up comedy.",
      link: "/events?category=cultural",
      accent: "text-pink-400",
      border: "hover:border-pink-500/50",
    },
    {
      num: "03",
      tag: "CAMPUS EXPEDITION",
      title: "Treasure Hunting & Digital Media",
      desc: "Fast-paced campus-wide clue hunt strictly capped at 25 teams, cinematic 60-second festival reel creations, and masterclass craft workshops.",
      link: "/events?category=competition",
      accent: "text-[#F5C451]",
      border: "hover:border-[#F5C451]/50",
    },
    {
      num: "04",
      tag: "AFTER DARK FINALE",
      title: "Grand Runway & Mega DJ Night",
      desc: "Haute couture designer ramp walk sequence, official University felicitations, and an open-air laser EDM DJ night to culminate YUNIFEST 2026.",
      link: "/events?category=special",
      accent: "text-emerald-400",
      border: "hover:border-emerald-400/50",
    },
  ];

  const metrics = [
    { value: "03", label: "INTENSE DAYS", sub: "DECEMBER 10, 11 & 12" },
    { value: "15+", label: "OFFICIAL SHOWCASES", sub: "TECHNICAL & CULTURAL" },
    { value: "₹0", label: "REGISTRATION FEE", sub: "COMPLETELY FREE PARTICIPATION" },
    { value: "25", label: "TREASURE HUNT CAP", sub: "STRICT TEAM QUOTA" },
  ];

  return (
    <section className="py-24 bg-[#03060E] relative border-t border-white/10">
      
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0E1A38]/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Bold Editorial Manifesto */}
        <div className="max-w-4xl mb-20">
          <div className="font-mono text-xs uppercase tracking-widest text-[#F5C451] mb-3 flex items-center gap-2">
            <span>[ 01 // FESTIVAL MANIFESTO ]</span>
          </div>

          <h2 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase leading-[1.05] tracking-tight">
            TRANSLATING YOUTH PASSION INTO MOMENTS{' '}
            <span className="text-slate-400">PEOPLE ACTUALLY TALK ABOUT.</span>
          </h2>

          <p className="font-display text-sm sm:text-base text-slate-300 mt-6 leading-relaxed max-w-2xl">
            YBN University, Ranchi brings together innovators, performers, strategists, and gamers across Jharkhand for three relentless days of competition, creativity, and cultural fellowship.
          </p>
        </div>

        {/* 4 Interactive Showcase Cards (MDNT Work-Item Aesthetics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {pillars.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className={`mdnt-card crosshair-corner p-8 rounded-3xl block group ${item.border}`}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                  [ {item.num} // {item.tag} ]
                </span>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-[#F5C451] group-hover:border-[#F5C451] group-hover:scale-110 transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white mb-3 group-hover:text-[#F5C451] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mb-6">
                {item.desc}
              </p>

              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
                <span>EXPLORE DISCIPLINE</span>
                <span className="text-[#F5C451]">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Editorial Numbers Strip (Like MDNT Stats) */}
        <div className="border border-white/10 rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#081024]/80 to-[#040814]/90 backdrop-blur-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((m, i) => (
              <div key={i} className="space-y-1">
                <div className="font-headline font-black text-4xl sm:text-6xl text-white tracking-tight">
                  {m.value}
                </div>
                <div className="font-mono text-xs font-bold text-[#F5C451] uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
