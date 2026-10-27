import React from 'react';
import { ShieldAlert, CheckCircle2, XCircle, AlertCircle, Sparkles, FileText } from 'lucide-react';

export const RulesSection: React.FC = () => {
  return (
    <section id="rules" className="py-20 bg-[#0A1B3B] relative border-t border-[#F5C451]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2345] border border-[#F5C451]/30 text-xs font-semibold text-[#F5C451] uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Official Regulations</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-3">
            Rules, Eligibility & Code of Conduct
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Please review the official guidelines formulated by the YBN University Proctorial Board and Organizing Committee.
          </p>
        </div>

        {/* Mandatory ID Notice Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-[#180E04] via-[#2D1B06] to-[#180E04] border-2 border-[#F5C451] shadow-card-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#F5C451]/20 border border-[#F5C451] text-[#F5C451] shrink-0">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#F5C451]">
                STRICT MANDATORY CLAUSE
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Physical College / University ID Card Required
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Every registered participant (both YBN University students and external college delegates) must present their original, physical institutional ID card at the security gate and event check-in desks. Digital photos or photocopies alone are not sufficient without prior approval.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Comparison: Outside College Eligibility vs YBN Internal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Outside College Student Eligibility */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#0D2345] to-[#07152F] border border-cyan-500/30 shadow-card-elevated">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-sm border border-cyan-500/40">
                A
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-lg">
                  Other College Participants
                </h3>
                <p className="text-xs text-cyan-300">
                  Designated Inter-College Competitions
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Visiting delegates from recognized colleges and universities across Jharkhand and India are strictly eligible to register for the following events:
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Dance Competition (Solo, Duo, Group)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Singing Competition (Solo & Duo)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Quiz Competition (Teams of 2)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Poster Making Competition</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Reel Making Competition (30-60s)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Mimicry Competition</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Stand-up Comedy</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Gaming Tournament — Free Fire or BGMI</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5C451] shrink-0" />
                <span className="font-semibold text-white">Treasure Hunting (Capped to 25 entries)</span>
              </li>
            </ul>
          </div>

          {/* Card 2: YBN University Students Eligibility */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#0D2345] to-[#07152F] border border-[#F5C451]/30 shadow-card-elevated">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#F5C451]/20 text-[#F5C451] flex items-center justify-center font-bold text-sm border border-[#F5C451]/40">
                B
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-lg">
                  YBN University Students
                </h3>
                <p className="text-xs text-[#F5C451]">
                  Full Campus & Departmental Access
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Bonafide students across all faculties of YBN University can participate in all open inter-college events as well as exclusive internal showcases:
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5C451] shrink-0" />
                <span>All 9 Inter-College Competitions Listed on Left</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5C451] shrink-0" />
                <span>Model Presentation Competition (Engineering, Agri & Science)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5C451] shrink-0" />
                <span>Face Painting Competition</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5C451] shrink-0" />
                <span>Creative Craft Workshop Masterclass</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5C451] shrink-0" />
                <span>Ramp Walk / Grand Fashion Show</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5C451] shrink-0" />
                <span>Food Stalls & Flea Market Exhibitions</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
