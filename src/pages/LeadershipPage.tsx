import React from 'react';
import { OFFICIAL_COORDINATORS } from '../data/coordinators';
import { ShieldCheck, UserCheck, GraduationCap, ArrowRight, ArrowUpRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RollText } from '../components/ui/RollText';

export const LeadershipPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F6F7F9] text-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header (Tall, Crisp, Non-Flattened Typography) */}
        <div className="max-w-4xl mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[1.5px] border-slate-900 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4 shadow-sm">
            <span>[ LEADERSHIP &amp; STEERING COMMITTEE ]</span>
            <span className="text-slate-500 font-bold">•</span>
            <span className="text-[#2B59FF] font-bold">11 Core Divisions</span>
          </div>
          <h1 className="font-headline font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight">
            ORGANIZING COMMITTEE{' '}
            <span className="font-editorial italic font-normal text-[#2B59FF] tracking-normal block sm:inline text-[1.05em]">
              &amp; Faculty Mentors
            </span>
          </h1>
          <p className="font-display text-slate-600 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
            The official academic advisors and student conveners spearheading the operational execution, competition judging, and arena logistics of <strong className="text-slate-900 font-editorial italic text-lg">YUNIFEST 2026</strong>.
          </p>
        </div>

        {/* Coordinators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {OFFICIAL_COORDINATORS.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-[28px] border-[1.5px] border-slate-900 bg-white p-7 shadow-sm hover:shadow-solid-pop hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline font-bold text-slate-950 text-lg group-hover:text-[#2B59FF] transition-colors">
                    {item.event}
                  </h3>
                  <span className="font-mono text-xs text-slate-400 font-bold">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-2xl bg-[#E0E7FF]/70 border border-slate-300 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#2B59FF] block font-bold">
                        [ Student Coordinator ]
                      </span>
                      {item.studentPhone && (
                        <a
                          href={`tel:${item.studentPhone.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-300 text-slate-900 font-mono text-[11px] font-bold hover:bg-[#2B59FF] hover:text-white hover:border-[#2B59FF] transition-all shadow-sm group/phone"
                          title={`Call ${item.studentCoordinator}`}
                        >
                          <Phone className="w-3 h-3 text-[#2B59FF] group-hover/phone:text-white transition-colors" />
                          <span>{item.studentPhone}</span>
                        </a>
                      )}
                    </div>
                    <span className="font-headline font-bold text-slate-950 text-base block">
                      {item.studentCoordinator}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FEF08A]/50 border border-slate-300 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-amber-900 block font-bold">
                      [ Faculty Mentor ]
                    </span>
                    <span className="font-headline font-bold text-slate-950 text-base block">
                      {item.facultyCoordinator}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                <span>YBN UNIVERSITY</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">VERIFIED DESK</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-white border-[1.5px] border-slate-900 shadow-solid-pop flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-headline font-black text-2xl text-slate-950 uppercase">
              Ready to claim your festival pass?
            </h3>
            <p className="font-display text-xs sm:text-sm text-slate-600">
              Admission pass generation is 100% free (₹0). Physical College ID card is mandatory at check-in.
            </p>
          </div>

          <Link
            to="/register"
            className="btn-voltage inline-flex items-center gap-2 text-xs py-3.5 px-8 shrink-0"
          >
            <span>CLAIM PASS (₹0)</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
