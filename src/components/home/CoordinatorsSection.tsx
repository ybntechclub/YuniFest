import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, GraduationCap, ArrowRight, ArrowUpRight } from 'lucide-react';
import { RollText } from '../ui/RollText';

export const CoordinatorsSection: React.FC = () => {
  const leadershipSpotlights = [
    {
      category: "CULTURAL & PERFORMING ARTS",
      tag: "AMPHITHEATRE & AUDITORIUM",
      description: "Managing staging, audio-visual technicals, and jury logistics for Solo/Group Dance, Classical/Bollywood Vocal, Mimicry, and Stand-up Comedy.",
      coordinators: "Antara Chakraborty & Varshana Chatterjee",
      border: "border-slate-900",
      accent: "text-purple-700",
      bgCard: "bg-[#F3E8FF]",
    },
    {
      category: "TECHNICAL INNOVATION & ESPORTS",
      tag: "DIGITAL ARENA & PAVILION",
      description: "Overseeing server infrastructure, telemetry, and refereeing for BGMI & Free Fire LAN battles, alongside working agri-tech model presentations.",
      coordinators: "Rounak Dubey & Aryan Sharma",
      border: "border-slate-900",
      accent: "text-[#2B59FF]",
      bgCard: "bg-[#E0E7FF]",
    },
    {
      category: "CAMPUS EXPEDITIONS & CREATIVE MEDIA",
      tag: "CAMPUS GROUNDS & MEDIA WING",
      description: "Conducting the 25-team restricted Treasure Hunt clue checkpoints, Poster Making adjudication, and viral festival reel judging.",
      coordinators: "Agrani Shrivastava & Shreya Shukla",
      border: "border-slate-900",
      accent: "text-emerald-800",
      bgCard: "bg-[#D1FAE5]",
    },
  ];

  return (
    <section id="coordinators" className="py-20 sm:py-28 bg-[#F6F7F9] relative border-t-[1.5px] border-slate-900/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-[1.5px] border-slate-900 font-mono text-xs font-bold text-slate-900 mb-3 shadow-sm">
              <span>[ 03 // STUDENT CONVENERS ]</span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-5xl text-slate-950 uppercase tracking-tight">
              STEERING COMMITTEE &amp; <span className="font-editorial italic font-normal text-[#2B59FF] normal-case text-[1.12em]">student conveners ~</span>
            </h2>
            <p className="font-display text-slate-600 text-sm mt-3 leading-relaxed max-w-xl">
              11 official event divisions with dedicated student conveners ensuring transparent scoring, arena management, and proctorial decorum for YUNIFEST 2026.
            </p>
          </div>

          <Link
            to="/leadership"
            className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-slate-950 hover:text-[#2B59FF] transition-colors group shrink-0"
          >
            <RollText text="VIEW ALL 11 EVENT DIVISIONS" highlightColor="text-[#2B59FF]" />
            <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Neo-Brutalist Light Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {leadershipSpotlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-[30px] border-[1.5px] border-slate-900 ${item.bgCard} text-slate-950 p-7 sm:p-8 flex flex-col justify-between shadow-solid-pop hover:-translate-y-1.5 transition-all duration-300`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest font-bold mb-4">
                  <span className={item.accent}>[ DIVISION 0{idx + 1} ]</span>
                  <span>#{String(idx + 1).padStart(2, '0')}</span>
                </div>

                <div className="font-mono text-xs text-slate-600 mb-1">
                  {item.tag}
                </div>

                <h3 className="font-headline font-bold text-xl text-slate-950 uppercase mb-3">
                  {item.category}
                </h3>

                <p className="font-display text-xs text-slate-700 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-900/15 space-y-1 bg-white/60 -mx-3 -mb-3 p-4 rounded-2xl border border-slate-900/10">
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                  STUDENT CONVENER DESK:
                </span>
                <span className="font-headline font-bold text-sm text-slate-950 block">
                  {item.coordinators}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimalist Action Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-[1.5px] border-slate-900 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-headline font-bold text-lg text-slate-950">
              Need to contact a specific event department?
            </h4>
            <p className="font-display text-xs text-slate-600">
              Access the complete roster with 11 individual event student coordinator desks and direct phone contacts.
            </p>
          </div>

          <Link
            to="/leadership"
            className="btn-voltage text-xs py-3 px-7 shrink-0"
          >
            <span>VIEW COMMITTEE ROSTER</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
