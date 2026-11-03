import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Disc, Radio, Flame, ArrowUpRight, Lock, Music2, Volume2 } from 'lucide-react';
import { RollText } from '../ui/RollText';

export const MysteryDjSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden border-t-[1.5px] border-slate-900">
      
      {/* Ambient Lighting & Neon Laser Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CCFF00]/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#2B59FF]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-pink-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyberpunk Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#CCFF00 1px, transparent 1px), linear-gradient(90deg, #CCFF00 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Top Header Pill */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#CCFF00]/60 text-[#CCFF00] font-mono text-xs font-black uppercase tracking-widest mb-4 shadow-sm backdrop-blur-md"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-ping" />
            <span>DAY 03 ARENA CLIMAX // SECRET HEADLINER</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[1.05]"
          >
            SECRET CELEBRITY DJ NIGHT{' '}
            <span className="font-editorial italic font-normal text-[#CCFF00] tracking-normal block sm:inline text-[1.12em]">
              Artist Revealing Soon ~
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-slate-400 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed"
          >
            The ultimate high-energy electronic music finale of <strong className="text-white font-editorial italic text-lg">YUNIFEST 2026</strong>. An internationally acclaimed EDM icon is hitting the YBN mainstage. Identity locked under confidentiality protocol!
          </motion.p>
        </div>

        {/* Feature Centerpiece Stage Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[36px] sm:rounded-[44px] border-[2px] border-white/20 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden group"
        >
          {/* Animated Edge Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#CCFF00]/10 via-[#2B59FF]/10 to-pink-500/10 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left: Enigmatic Silhouette Artwork Box */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[32px] bg-slate-950 border-[2px] border-white/20 flex flex-col items-center justify-center overflow-hidden shadow-2xl group-hover:border-[#CCFF00] transition-colors">
                
                {/* Glowing Spinning Vinyl / Laser halo */}
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-white/20 animate-spin-slow pointer-events-none" />
                <div className="absolute inset-10 rounded-full border border-[#CCFF00]/40 pointer-events-none" />
                
                {/* Mysterious Silhouette Avatar */}
                <div className="relative flex flex-col items-center">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800 border-2 border-white/30 flex items-center justify-center relative shadow-inner">
                    <Radio className="w-12 h-12 text-[#CCFF00] animate-pulse" />
                    
                    {/* Lock Overlay Badge */}
                    <div className="absolute -bottom-2 px-3 py-1 rounded-full bg-slate-950 border border-[#CCFF00] text-[#CCFF00] text-[10px] font-mono font-black flex items-center gap-1 shadow-lg">
                      <Lock className="w-3 h-3 text-[#CCFF00]" />
                      <span>TOP SECRET</span>
                    </div>
                  </div>

                  <span className="font-headline font-black text-xl text-white tracking-widest mt-6 uppercase">
                    ??? ???????? ???
                  </span>
                  <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase mt-1">
                    CLASSIFIED ARTIST FILE #2026
                  </span>
                </div>

                {/* Animated Equalizer Waveform Bars at bottom */}
                <div className="absolute bottom-4 left-0 right-0 flex items-end justify-center gap-1.5 h-8 px-8">
                  {[40, 75, 55, 90, 65, 100, 70, 85, 45, 95, 60, 80, 50, 85].map((height, bIdx) => (
                    <motion.span
                      key={bIdx}
                      animate={{ height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: bIdx * 0.08, ease: "easeInOut" }}
                      className="w-1.5 bg-gradient-to-t from-[#2B59FF] to-[#CCFF00] rounded-full"
                    />
                  ))}
                </div>

              </div>

              {/* Status Ribbon Under Silhouette */}
              <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/40 text-[#CCFF00] font-mono text-xs font-bold">
                <Flame className="w-3.5 h-3.5" />
                <span>OFFICIAL DROP DATE: COMING SOON</span>
              </div>
            </div>

            {/* Right: Teaser Information, Venue Specs & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-[#CCFF00] text-slate-950 uppercase tracking-wider">
                    DECEMBER 12, 2026
                  </span>
                  <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 uppercase tracking-wider">
                    GRAND MAIN STADIUM ARENA
                  </span>
                  <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-[#2B59FF] text-white uppercase tracking-wider">
                    HIGH-ENERGY EDM
                  </span>
                </div>

                <h3 className="font-headline font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                  One Mega Stage. Massive Bass. Pure Adrenaline.
                </h3>
                
                <p className="font-display text-slate-300 text-sm sm:text-base leading-relaxed">
                  Prepare for the most anticipated musical evening in Jharkhand university history. 4 hours of relentless electronic drops, world-class laser mapping, sub-bass arrays, and an audience of over 10,000 students from across the country.
                </p>
              </div>

              {/* Stage Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase">CAPACITY:</span>
                  <strong className="text-white text-sm block mt-0.5">10,000+ Crowd</strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase">PRODUCTION:</span>
                  <strong className="text-[#CCFF00] text-sm block mt-0.5">Concert Lasers</strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-white/40 block text-[10px] uppercase">ENTRY ACCESS:</span>
                  <strong className="text-white text-sm block mt-0.5">With Fest Pass</strong>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/register"
                  className="btn-voltage inline-flex items-center gap-2.5 text-xs py-3.5 px-7 shadow-solid-pop hover:scale-105 transition-all"
                >
                  <RollText text="REGISTER & SECURE ACCESS" highlightColor="text-white" />
                  <ArrowUpRight className="w-4 h-4 text-slate-900" />
                </Link>

                <Link
                  to="/schedule"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-[#CCFF00] px-5 py-3.5 rounded-full border border-white/20 hover:border-[#CCFF00] transition-colors"
                >
                  <span>VIEW FULL DAY 3 SCHEDULE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
