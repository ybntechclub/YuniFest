import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, FileText, Lock, Users, ArrowUpRight } from 'lucide-react';
import { RollText } from '../components/ui/RollText';

export const RegulationsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F6F7F9] text-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Page Header */}
        <div className="max-w-4xl mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[1.5px] border-slate-900 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4 shadow-sm">
            <span>[ PROTOCOLS &amp; ELIGIBILITY ]</span>
          </div>
          <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-slate-950 uppercase tracking-tight">
            CAMPUS REGULATIONS &amp; <span className="text-[#2B59FF]">ADMISSION POLICIES</span>
          </h1>
          <p className="font-display text-slate-600 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
            Established by the Proctorial Board and Fest Steering Committee of YBN University, Ranchi. All participants must abide by institutional code of conduct.
          </p>
        </div>

        {/* Mandatory Physical ID Card Warning - Butter Yellow Banner */}
        <div className="mb-14 p-8 sm:p-10 rounded-[32px] bg-[#FEF08A] border-[1.5px] border-slate-900 shadow-solid-pop">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-slate-900 font-bold block">
                [ STRICT MANDATORY ADMISSION CLAUSE ]
              </span>
              <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-950 uppercase">
                ORIGINAL PHYSICAL ID CARD REQUIRED FOR CAMPUS ENTRY
              </h2>
              <p className="font-display text-xs sm:text-sm text-slate-800 max-w-3xl leading-relaxed">
                Every registered attendee (both YBN University students and external college delegates) must carry and produce their original, physical institutional ID card at Campus Gate 1 &amp; 2. Digital images, phone screenshots, or photocopies alone are not permitted.
              </p>
            </div>

            <Link
              to="/register"
              className="btn-voltage inline-flex items-center gap-2 text-xs py-3.5 px-8 shrink-0 self-start md:self-auto"
            >
              <span>CLAIM PASS (₹0)</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 2-Column High Contrast Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card A: Other College Participants */}
          <div className="rounded-[30px] border-[1.5px] border-slate-900 bg-white p-8 sm:p-10 shadow-solid-pop flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-[#2B59FF]">
                  [ OPTION B // INTER-COLLEGE DELEGATES ]
                </span>
                <span className="font-mono text-[10px] px-3 py-1 rounded-full bg-[#E0E7FF] text-[#2B59FF] border border-blue-300 font-bold uppercase">
                  OPEN NATIONWIDE
                </span>
              </div>

              <h3 className="font-headline font-black text-2xl text-slate-950 uppercase mb-2">
                Visiting College Eligibility
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed font-display">
                Enrolled students from any recognized university or college across India are officially eligible to register for the following 9 flagship competitions:
              </p>

              <ul className="space-y-3 font-display text-xs sm:text-sm text-slate-800">
                {[
                  "Dance Competition (Solo, Duo, Group)",
                  "Singing Competition (Solo & Duo)",
                  "Quiz Competition (Teams of 2)",
                  "Poster Making Competition",
                  "Reel Making Competition (30-60s)",
                  "Mimicry Competition",
                  "Stand-up Comedy",
                  "Gaming Tournament — Free Fire or BGMI",
                  "Treasure Hunting (Strictly Capped to 25 Teams)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#2B59FF] shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 flex items-center justify-between">
              <span>Fee: ₹0 (Free)</span>
              <span className="font-bold text-slate-950">PHYSICAL COLLEGE ID REQUIRED</span>
            </div>
          </div>

          {/* Card B: YBN University Students */}
          <div className="rounded-[30px] border-[1.5px] border-slate-900 bg-white p-8 sm:p-10 shadow-solid-pop flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-slate-900">
                  [ OPTION A // YBN INTERNAL STUDENTS ]
                </span>
                <span className="font-mono text-[10px] px-3 py-1 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900 font-bold uppercase">
                  FULL CAMPUS ACCESS
                </span>
              </div>

              <h3 className="font-headline font-black text-2xl text-slate-950 uppercase mb-2">
                YBN Student Access
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed font-display">
                All currently enrolled students from every faculty and school of YBN University have unrestricted access to all internal and open events:
              </p>

              <ul className="space-y-3 font-display text-xs sm:text-sm text-slate-800">
                {[
                  "Model Presentation & Scientific Exhibitions",
                  "Grand Fashion Runway / Ramp Walk Sequence",
                  "Face Painting & Thematic Expressions",
                  "Creative Craft Prototyping Workshop",
                  "Rangoli Traditional Floor Art",
                  "Food Fest & Flea Market Organizing Stalls",
                  "All Open Inter-College Competitions",
                  "Mega EDM DJ Night & Valedictory Ceremony"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 flex items-center justify-between">
              <span>Access: All 3 Days</span>
              <span className="font-bold text-slate-950">YBN ROLL NUMBER REQUIRED</span>
            </div>
          </div>

        </div>

        {/* Proctorial Code of Conduct */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-white border-[1.5px] border-slate-900 shadow-sm space-y-4">
          <h3 className="font-headline font-bold text-xl text-slate-950 uppercase">
            Disciplinary Code &amp; Campus Safety
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 font-display">
            <div className="p-5 rounded-2xl bg-[#F6F7F9] border border-slate-200 space-y-1">
              <strong className="text-slate-950 block font-bold">1. Zero Tolerance on Ragging:</strong>
              <p>YBN University operates under a strict anti-ragging policy. Any misconduct leads to immediate disqualification and proctorial action.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#F6F7F9] border border-slate-200 space-y-1">
              <strong className="text-slate-950 block font-bold">2. Decorum &amp; Sportsmanship:</strong>
              <p>Participants must accept the jury's decisions as final. Respect fellow delegates, organizers, and campus infrastructure at all times.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#F6F7F9] border border-slate-200 space-y-1">
              <strong className="text-slate-950 block font-bold">3. Check-In Window:</strong>
              <p>Verification gates open at 08:30 IST daily. Late entrants after official event roll-call will not be accommodated on stage.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
