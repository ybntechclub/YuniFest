import React from 'react';
import { Cpu, Music, Sparkles, PartyPopper, Users, Award, Shield, CheckCircle2 } from 'lucide-react';

export const FestOverview: React.FC = () => {
  const pillars = [
    {
      icon: Cpu,
      title: "Technology & Innovation",
      color: "cyan",
      description: "Battle Royale esports (BGMI & Free Fire) and working model presentations tackling agriculture, robotics, and sustainable development.",
    },
    {
      icon: Music,
      title: "Cultural & Performing Arts",
      color: "magenta",
      description: "Electrifying solo, duo and group dance battles, vocal music competitions, mimicry theatrics, and stand-up comedy.",
    },
    {
      icon: Sparkles,
      title: "Creativity & Digital Media",
      color: "gold",
      description: "Fast-paced campus treasure hunt, viral reel storytelling, fine arts poster competitions, and creative upcycling craft masterclasses.",
    },
    {
      icon: PartyPopper,
      title: "Grand Runway & DJ Finale",
      color: "gold",
      description: "Haute couture student ramp walk, grand dignitary felicitation ceremony, and an unforgettable open-air EDM DJ Night celebration.",
    },
  ];

  const highlights = [
    { value: "3", label: "Grand Days", sub: "Dec 10, 11 & 12" },
    { value: "15+", label: "Official Showcases", sub: "Technical & Cultural" },
    { value: "₹0", label: "Registration Fee", sub: "Completely Free Entry" },
    { value: "25", label: "Treasure Hunt Cap", sub: "Limited Team Slots" },
  ];

  return (
    <section className="py-20 bg-[#07152F] relative border-t border-[#F5C451]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2345] border border-[#F5C451]/30 text-xs font-semibold text-[#F5C451] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Festival Essence</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Welcome to <span className="gold-gradient-text">YUNIFEST 2026</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            YBN University opens its doors for Jharkhand’s premier inter-institutional youth confluence. Bringing together visionaries, artists, performers, and strategists under one unified roof.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const IconComponent = item.icon;
            const borderColors = {
              gold: "hover:border-[#F5C451]/60",
              cyan: "hover:border-cyan-400/60",
              magenta: "hover:border-pink-500/60",
            };
            const iconBg = {
              gold: "bg-[#F5C451]/10 text-[#F5C451] border-[#F5C451]/30",
              cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
              magenta: "bg-pink-500/10 text-pink-400 border-pink-500/30",
            };

            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-gradient-to-b from-[#0D2345]/80 to-[#07152F]/90 border border-slate-700/60 ${borderColors[item.color as keyof typeof borderColors]} transition-all duration-300 hover:-translate-y-1 shadow-card-elevated group`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${iconBg[item.color as keyof typeof iconBg]} group-hover:scale-105 transition-transform`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#F5C451] transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Numbers & Quick Facts Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0D2345] via-[#112C57] to-[#0D2345] border border-[#F5C451]/30 shadow-card-elevated">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {highlights.map((h, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-display font-black text-3xl sm:text-5xl text-white mb-1">
                  {h.value}
                </span>
                <span className="text-sm font-bold text-[#F5C451] uppercase tracking-wider">
                  {h.label}
                </span>
                <span className="text-xs text-slate-300 mt-0.5">
                  {h.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
