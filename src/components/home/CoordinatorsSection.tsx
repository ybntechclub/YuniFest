import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { RollText } from '../ui/RollText';

export const CoordinatorsSection: React.FC = () => {
  const leadershipSpotlights = [
    {
      category: "CULTURAL & PERFORMING ARTS",
      tag: "AMPHITHEATRE & AUDITORIUM",
      description: "Managing staging, audio-visual technicals, and jury logistics for Solo/Group Dance, Classical/Bollywood Vocal, Mimicry, and Stand-up Comedy.",
      coordinators: "Dr. Aradhana Kumari & Prof. Sumit Prasad",
      border: "border-purple-500/30 hover:border-purple-400/60",
      accent: "text-purple-400",
      bgGlow: "from-purple-950/20 via-[#0C0E1E] to-black",
    },
    {
      category: "TECHNICAL INNOVATION & ESPORTS",
      tag: "DIGITAL ARENA & PAVILION",
      description: "Overseeing server infrastructure, telemetry, and refereeing for BGMI & Free Fire LAN battles, alongside working agri-tech model presentations.",
      coordinators: "Er. Rahul Verma & Prof. Sneha Sen",
      border: "border-cyan-500/30 hover:border-cyan-400/60",
      accent: "text-cyan-400",
      bgGlow: "from-cyan-950/20 via-[#08121E] to-black",
    },
    {
      category: "CAMPUS EXPEDITIONS & CREATIVE MEDIA",
      tag: "CAMPUS GROUNDS & MEDIA WING",
      description: "Conducting the 25-team restricted Treasure Hunt clue checkpoints, Poster Making adjudication, and viral festival reel judging.",
      coordinators: "Dr. Vikas Singh & Prof. Pooja Sharma",
      border: "border-[#CCFF00]/30 hover:border-[#CCFF00]/60",
      accent: "text-[#CCFF00]",
      bgGlow: "from-[#121A04]/20 via-[#0A1005] to-black",
    },
  ];

  return (
    <section id="coordinators" className="py-20 sm:py-24 bg-black relative border-t border-white/10">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[400px] bg-[#0E1A38]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] mb-3 flex items-center gap-2">
              <span>[ 03 // LEADERSHIP &amp; MENTORS ]</span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              ORGANIZING STEERING COMMITTEE &amp; <span className="text-[#CCFF00]">FACULTY MENTORS</span>
            </h2>
            <p className="font-display text-slate-300 text-sm mt-3 leading-relaxed max-w-xl">
              18 dedicated faculty chairs and student conveners ensuring transparent scoring, arena management, and proctorial decorum for YUNIFEST 2026.
            </p>
          </div>

          <Link
            to="/leadership"
            className="inline-flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-wider text-[#CCFF00] hover:text-white transition-colors group shrink-0"
          >
            <RollText text="VIEW FULL 18-MEMBER COMMITTEE" highlightColor="text-white" />
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 3 Streamlined Division Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {leadershipSpotlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`mdnt-card crosshair-corner p-7 rounded-3xl bg-gradient-to-b ${item.bgGlow} border ${item.border} flex flex-col justify-between group transition-all duration-300`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/50 mb-4">
                  <span className={item.accent}>[ DIVISION 0{idx + 1} ]</span>
                  <span>#{String(idx + 1).padStart(2, '0')}</span>
                </div>

                <div className="font-mono text-xs text-slate-400 mb-1">
                  {item.tag}
                </div>

                <h3 className="font-headline font-bold text-xl text-white uppercase mb-3 group-hover:text-[#CCFF00] transition-colors">
                  {item.category}
                </h3>

                <p className="font-display text-xs text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1">
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider block">
                  LEADERSHIP BENCH:
                </span>
                <span className="font-headline font-bold text-sm text-white block">
                  {item.coordinators}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action strip to dedicated page */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#060D1E] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-headline font-bold text-lg text-white">
              Need to contact a specific event department?
            </h4>
            <p className="font-display text-xs text-slate-400">
              Access the complete roster with 9 individual event coordinator pairs and faculty advisor desks.
            </p>
          </div>

          <Link
            to="/leadership"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#CCFF00] hover:text-black text-black px-6 py-2.5 rounded-full font-headline text-xs font-black uppercase tracking-wider transition-all duration-300 shrink-0 group"
          >
            <RollText text="VIEW COMMITTEE ROSTER" highlightColor="text-black" />
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
