import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { RollText } from '../ui/RollText';

export const RulesSection: React.FC = () => {
  return (
    <section id="rules" className="py-20 sm:py-28 bg-[#F6F7F9] relative border-t-[1.5px] border-slate-900/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-[1.5px] border-slate-900 font-mono text-xs font-bold text-slate-900 mb-3 shadow-sm">
              <span>[ 04 // PROTOCOLS &amp; ELIGIBILITY ]</span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-5xl text-slate-950 uppercase tracking-tight">
              CAMPUS REGULATIONS &amp; <span className="text-[#2B59FF]">ENTRY PROTOCOLS</span>
            </h2>
            <p className="font-display text-slate-600 text-sm mt-3 leading-relaxed max-w-xl">
              Formulated by the Proctorial Board of YBN University. All attendees are bound by campus decorum, zero-ragging mandates, and entry checks.
            </p>
          </div>

          <Link
            to="/regulations"
            className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-slate-950 hover:text-[#2B59FF] transition-colors group shrink-0"
          >
            <RollText text="READ FULL REGULATIONS POLICY" highlightColor="text-[#2B59FF]" />
            <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Mandatory ID Clause - Butter Yellow Neo-Brutalist Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10 p-8 sm:p-10 rounded-[32px] bg-[#FEF08A] border-[1.5px] border-slate-900 shadow-solid-pop relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-slate-900 font-bold block">
                [ STRICT PROCTORIAL MANDATE ]
              </span>
              <h3 className="font-headline font-black text-2xl sm:text-3xl text-slate-950 uppercase">
                ORIGINAL PHYSICAL ID CARD MANDATORY AT ALL CAMPUS GATES
              </h3>
              <p className="font-display text-xs sm:text-sm text-slate-800 leading-relaxed">
                Every registered participant (both YBN University students and external college delegates) must produce their physical institutional ID card at Campus Gate 1 &amp; 2. Digital photos, phone gallery screenshots, or unverified photocopies will not be accepted.
              </p>
            </div>

            <Link
              to="/register"
              className="btn-voltage text-xs py-3.5 px-8 shrink-0 self-start md:self-auto"
            >
              <span>CLAIM PASS (₹0)</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* 2 Clean Streamlined High-Contrast Eligibility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
          
          {/* Card A: External College Delegates */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[30px] border-[1.5px] border-slate-900 bg-white text-slate-950 p-8 flex flex-col justify-between shadow-solid-pop"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs font-bold text-slate-600 mb-4">
                <span>[ OPTION B // VISITING DELEGATES ]</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#2B59FF] text-white border border-slate-900 uppercase">
                  OPEN NATIONWIDE
                </span>
              </div>

              <h4 className="font-headline font-black text-2xl text-slate-950 uppercase mb-2">
                External College Students
              </h4>

              <p className="font-display text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Students from any recognized college or university across India can register with ₹0 fee. Open to 9 flagship events:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-display text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2B59FF]" /> Dance Competition
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2B59FF]" /> Singing Showdown
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2B59FF]" /> BGMI &amp; Free Fire
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2B59FF]" /> Treasure Hunt (Cap: 25)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2B59FF]" /> Quiz Battle
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2B59FF]" /> Stand-up Comedy
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Required: College Student ID</span>
              <Link to="/regulations" className="text-[#2B59FF] font-bold hover:underline flex items-center gap-1">
                VIEW RULES →
              </Link>
            </div>
          </motion.div>

          {/* Card B: Bonafide YBN Students */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[30px] border-[1.5px] border-slate-900 bg-white text-slate-950 p-8 flex flex-col justify-between shadow-solid-pop"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs font-bold text-slate-600 mb-4">
                <span>[ OPTION A // YBN STUDENTS ]</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900 uppercase">
                  FULL ACCESS
                </span>
              </div>

              <h4 className="font-headline font-black text-2xl text-slate-950 uppercase mb-2">
                YBN University Students
              </h4>

              <p className="font-display text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Students enrolled in any YBN University faculty, school, or department enjoy unrestricted access across all fest categories:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-display text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Model Presentation
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Fashion Runway
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Rangoli &amp; Craft
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Reel Making Contest
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Mega DJ Night Access
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Stage Ceremonies
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Required: University Roll No</span>
              <Link to="/regulations" className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                VIEW RULES →
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
