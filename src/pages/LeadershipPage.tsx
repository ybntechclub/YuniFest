import React from 'react';
import { OFFICIAL_COORDINATORS } from '../data/coordinators';
import { ShieldCheck, UserCheck, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RollText } from '../components/ui/RollText';

export const LeadershipPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] mb-3">
            [ LEADERSHIP &amp; STEERING COMMITTEE ]
          </div>
          <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            CORE ORGANIZING COMMITTEE &amp; <span className="text-[#CCFF00]">FACULTY MENTORS</span>
          </h1>
          <p className="font-display text-slate-300 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
            The official academic advisors and student coordinators spearheading the operational execution, competition judging, and arena logistics of YUNIFEST 2026.
          </p>
        </div>

        {/* Coordinators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {OFFICIAL_COORDINATORS.map((item, idx) => (
            <div
              key={item.id}
              className="mdnt-card crosshair-corner p-7 rounded-3xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline font-bold text-white text-lg group-hover:text-[#CCFF00] transition-colors">
                    {item.event}
                  </h3>
                  <span className="font-mono text-xs text-white/40">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 block font-bold">
                      [ Student Coordinator ]
                    </span>
                    <span className="font-headline font-bold text-white text-base block">
                      {item.studentCoordinator}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#CCFF00] block font-bold">
                      [ Faculty Mentor ]
                    </span>
                    <span className="font-headline font-bold text-slate-200 text-base block">
                      {item.facultyCoordinator}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40 uppercase tracking-widest">
                <span>YBN UNIVERSITY</span>
                <span className="text-emerald-400">OFFICIAL DESK</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0C1528] to-[#040814] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-headline font-black text-2xl text-white">
              Ready to submit your registration pass?
            </h3>
            <p className="font-display text-xs sm:text-sm text-slate-400">
              Pass generation is 100% free (₹0). Physical College ID card is mandatory at check-in.
            </p>
          </div>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-white text-black px-8 py-3.5 rounded-full font-headline text-xs font-black uppercase tracking-wider transition-all duration-300 shrink-0 group"
          >
            <RollText text="CLAIM PASS (₹0)" highlightColor="text-black" />
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};
