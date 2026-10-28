import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, FileText, Lock, Users } from 'lucide-react';
import { RollText } from '../components/ui/RollText';

export const RegulationsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Page Header */}
        <div className="max-w-4xl mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] mb-3">
            [ PROTOCOLS &amp; ELIGIBILITY ]
          </div>
          <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            CAMPUS REGULATIONS &amp; <span className="text-[#CCFF00]">ADMISSION POLICIES</span>
          </h1>
          <p className="font-display text-slate-300 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
            Established by the Proctorial Board and Fest Steering Committee of YBN University, Ranchi. All participants must abide by institutional code of conduct.
          </p>
        </div>

        {/* Mandatory Physical ID Card Warning - MDNT Industrial Banner */}
        <div className="mb-14 p-8 rounded-3xl bg-gradient-to-r from-[#171202] via-[#241B04] to-[#120D02] border-2 border-[#CCFF00] shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] font-bold">
                [ STRICT MANDATORY ADMISSION CLAUSE ]
              </span>
              <h2 className="font-headline font-black text-2xl sm:text-3xl text-white">
                ORIGINAL PHYSICAL ID CARD REQUIRED FOR CAMPUS ENTRY
              </h2>
              <p className="font-display text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Every registered attendee (both YBN University students and external college delegates) must carry and produce their original, physical institutional ID card at Campus Gate 1 &amp; 2. Digital images, phone screenshots, or photocopies alone are not permitted.
              </p>
            </div>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-white text-black px-8 py-3.5 rounded-full font-headline text-xs font-black uppercase tracking-wider transition-all duration-300 shrink-0 self-start md:self-auto group"
            >
              <RollText text="CLAIM PASS (₹0)" highlightColor="text-black" />
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 2-Column High Contrast Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card A: Other College Participants */}
          <div className="mdnt-card crosshair-corner p-8 rounded-3xl border-cyan-500/30">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs font-bold text-cyan-400">
                [ OPTION B // INTER-COLLEGE DELEGATES ]
              </span>
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 uppercase">
                OPEN ENTRY
              </span>
            </div>

            <h3 className="font-headline font-bold text-2xl text-white mb-2">
              Visiting College Eligibility
            </h3>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Enrolled students from any recognized university or college across India are officially eligible to register for the following 9 flagship competitions:
            </p>

            <ul className="space-y-3 font-display text-xs sm:text-sm text-slate-200">
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
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card B: YBN University Students */}
          <div className="mdnt-card crosshair-corner p-8 rounded-3xl border-[#CCFF00]/30">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs font-bold text-[#CCFF00]">
                [ OPTION A // YBN INTERNAL STUDENTS ]
              </span>
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40 uppercase">
                FULL CAMPUS
              </span>
            </div>

            <h3 className="font-headline font-bold text-2xl text-white mb-2">
              YBN University Eligibility
            </h3>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Bonafide students across all faculties of YBN University can compete in all 9 inter-college events plus internal-only showcases:
            </p>

            <ul className="space-y-3 font-display text-xs sm:text-sm text-slate-200">
              {[
                "All 9 Inter-College Competitions Listed on Left",
                "Model Presentation Competition (Engineering, Science & Agri)",
                "Face Painting Competition",
                "Creative Craft Workshop Masterclass",
                "Ramp Walk / Grand Fashion Show Runway",
                "Food Fest & Flea Market Exhibitions"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* General Conduct Protocols */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
          <div className="font-mono text-xs text-[#CCFF00] font-bold uppercase tracking-wider">
            [ CAMPUS CODE OF DISCIPLINE ]
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-display text-xs leading-relaxed text-slate-300">
            <div className="space-y-1">
              <strong className="text-white block font-headline text-sm uppercase">1. Zero Tolerance Policy</strong>
              <p>Indiscipline, intoxication, vandalism, or disrespectful behavior toward competitors, staff or judges results in immediate disqualification and removal from campus premises.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block font-headline text-sm uppercase">2. Reporting & Verification</strong>
              <p>Participants must report to physical verification desks at Campus Gate 1 & 2 at least 45 minutes prior to their scheduled event slot with valid registration QR pass.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block font-headline text-sm uppercase">3. Jury Discretion</strong>
              <p>All judge evaluations across technical, musical, comedic and choreography rounds are final and binding. No external appeals will be entertained.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
