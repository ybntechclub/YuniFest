import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { RollText } from '../ui/RollText';

export const RulesSection: React.FC = () => {
  return (
    <section id="rules" className="py-20 sm:py-24 bg-black relative border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[350px] bg-[#CCFF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] mb-3 flex items-center gap-2">
              <span>[ 04 // PROTOCOLS &amp; ELIGIBILITY ]</span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              CAMPUS REGULATIONS &amp; <span className="text-[#CCFF00]">ENTRY PROTOCOLS</span>
            </h2>
            <p className="font-display text-slate-300 text-sm mt-3 leading-relaxed max-w-xl">
              Formulated by the Proctorial Board of YBN University. All attendees are bound by festival rules, zero-ragging mandates, and entry checks.
            </p>
          </div>

          <Link
            to="/regulations"
            className="inline-flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-wider text-[#CCFF00] hover:text-white transition-colors group shrink-0"
          >
            <RollText text="READ FULL REGULATIONS POLICY" highlightColor="text-white" />
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Mandatory ID Clause - High-Impact Industrial Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#171202] via-[#241B04] to-[#120D02] border-2 border-[#CCFF00] shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] font-bold">
                [ STRICT MANDATORY ADMISSION MANDATE ]
              </span>
              <h3 className="font-headline font-black text-2xl sm:text-3xl text-white uppercase">
                ORIGINAL PHYSICAL ID CARD MANDATORY AT ALL CAMPUS GATES
              </h3>
              <p className="font-display text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every registered participant (both YBN University students and external college delegates) must produce their physical institutional ID card at Campus Gate 1 &amp; 2. Digital photos, phone gallery screenshots, or unverified photocopies will not be accepted.
              </p>
            </div>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-white text-black px-7 py-3 rounded-full font-headline text-xs font-black uppercase tracking-wider transition-all duration-300 shrink-0 self-start md:self-auto group"
            >
              <RollText text="CLAIM PASS (₹0)" highlightColor="text-black" />
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* 2 Streamlined High-Contrast Eligibility Summaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
          
          {/* Card A: Visiting College Students */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mdnt-card crosshair-corner p-8 rounded-3xl border-cyan-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs font-bold text-cyan-400 mb-4">
                <span>[ OPTION B // VISITING DELEGATES ]</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 uppercase">
                  OPEN NATIONWIDE
                </span>
              </div>

              <h4 className="font-headline font-bold text-2xl text-white uppercase mb-2">
                External College Students
              </h4>

              <p className="font-display text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Students from any recognized college or university across India can register with ₹0 fee. Open to 9 flagship events:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-display text-slate-200">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Dance Competition
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Singing Showdown
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> BGMI &amp; Free Fire
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Treasure Hunt (Cap: 25)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Quiz Battle
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Stand-up Comedy
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Required: College Student ID</span>
              <Link to="/regulations" className="text-cyan-400 hover:text-white font-bold flex items-center gap-1">
                VIEW RULES →
              </Link>
            </div>
          </motion.div>

          {/* Card B: Bonafide YBN Students */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mdnt-card crosshair-corner p-8 rounded-3xl border-[#CCFF00]/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[#CCFF00] mb-4">
                <span>[ OPTION A // YBN STUDENTS ]</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40 uppercase">
                  ALL ACCESS
                </span>
              </div>

              <h4 className="font-headline font-bold text-2xl text-white uppercase mb-2">
                YBN University Students
              </h4>

              <p className="font-display text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Students enrolled in any YBN University faculty, school, or department enjoy unrestricted access across all fest categories:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-display text-slate-200">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" /> Model Presentation
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" /> Fashion Runway
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" /> Rangoli &amp; Craft
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" /> Reel Making Contest
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" /> Mega DJ Night Access
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" /> Stage Ceremonies
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Required: University Roll No</span>
              <Link to="/regulations" className="text-[#CCFF00] hover:text-white font-bold flex items-center gap-1">
                VIEW RULES →
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
