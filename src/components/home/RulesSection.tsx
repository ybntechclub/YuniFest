import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RulesSection: React.FC = () => {
  return (
    <section id="rules" className="py-24 bg-[#040814] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-[#F5C451] mb-3">
            [ 04 // PROTOCOLS & ELIGIBILITY ]
          </div>
          <h2 className="font-headline font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            OFFICIAL REGULATIONS & <span className="gold-gradient-text">ADMISSION RULES</span>
          </h2>
          <p className="font-display text-slate-400 text-sm mt-3 leading-relaxed">
            Formulated by the Proctorial Board and Fest Steering Committee of YBN University. All attendees are bound by campus decorum.
          </p>
        </div>

        {/* Mandatory ID Clause - Huge High-Impact Industrial Banner */}
        <div className="mb-14 p-8 rounded-3xl bg-gradient-to-r from-[#1A1002] via-[#261704] to-[#120B02] border-2 border-[#F5C451] shadow-card-elevated">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-widest text-[#F5C451] font-bold">
                [ STRICT PROCTORIAL MANDATE ]
              </div>
              <h3 className="font-headline font-black text-2xl sm:text-3xl text-white">
                ORIGINAL PHYSICAL ID CARD MANDATORY AT GATES
              </h3>
              <p className="font-display text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Every registered participant (YBN University students and external college delegates) must produce their physical institutional ID card at Campus Gate 1 & 2. Digital photos alone are not admitted.
              </p>
            </div>

            <Link
              to="/register"
              className="btn-voltage text-xs py-3 px-6 shrink-0 self-start md:self-auto"
            >
              REGISTER PASS
            </Link>
          </div>
        </div>

        {/* 2-Column High Contrast Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card A: Other College Participants */}
          <div className="mdnt-card crosshair-corner p-8 rounded-3xl border-cyan-500/30">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs font-bold text-cyan-400">
                [ CATEGORY A // INTER-COLLEGE ]
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 uppercase">
                OPEN ENTRY
              </span>
            </div>

            <h3 className="font-headline font-bold text-2xl text-white mb-2">
              Visiting College Students
            </h3>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Students from any recognized university or college in India are eligible to register and compete in these 9 flagship events:
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
          <div className="mdnt-card crosshair-corner p-8 rounded-3xl border-[#F5C451]/30">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs font-bold text-[#F5C451]">
                [ CATEGORY B // INTERNAL ACCESS ]
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#F5C451]/20 text-[#F5C451] border border-[#F5C451]/40 uppercase">
                ALL ACCESS
              </span>
            </div>

            <h3 className="font-headline font-bold text-2xl text-white mb-2">
              YBN University Students
            </h3>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Enrolled students across all faculties of YBN University can compete in all inter-college competitions plus exclusive internal showcases:
            </p>

            <ul className="space-y-3 font-display text-xs sm:text-sm text-slate-200">
              {[
                "All 9 Open Inter-College Competitions",
                "Model Presentation Competition (Engineering & Agri)",
                "Face Painting Competition",
                "Creative Craft Workshop Masterclass",
                "Ramp Walk / Grand Fashion Show Runway",
                "Food Fest & Flea Market Exhibitions"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C451] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
