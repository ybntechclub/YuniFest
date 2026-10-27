import React from 'react';
import { OFFICIAL_COORDINATORS } from '../../data/coordinators';
import { ShieldCheck, User, GraduationCap } from 'lucide-react';

export const CoordinatorsSection: React.FC = () => {
  return (
    <section id="coordinators" className="py-24 bg-[#03060E] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-[#F5C451] mb-3">
            [ 03 // LEADERSHIP & ADVISORY ]
          </div>
          <h2 className="font-headline font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            ORGANIZING COMMITTEE & <span className="gold-gradient-text">FACULTY MENTORS</span>
          </h2>
          <p className="font-display text-slate-400 text-sm mt-3 leading-relaxed">
            The official academic and student leadership steering the logistics, juries, and physical venue operations for YUNIFEST 2026.
          </p>
        </div>

        {/* 3-Column Industrial Luxe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFICIAL_COORDINATORS.map((item, idx) => (
            <div
              key={item.id}
              className="mdnt-card crosshair-corner p-6 rounded-2xl flex flex-col justify-between group"
            >
              <div>
                {/* Event Name Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline font-bold text-white text-lg group-hover:text-[#F5C451] transition-colors">
                    {item.event}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Coordinators Profile */}
                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 block font-bold">
                      [ Student Coordinator ]
                    </span>
                    <span className="font-headline font-bold text-white text-base block">
                      {item.studentCoordinator}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#F5C451] block font-bold">
                      [ Faculty Mentor ]
                    </span>
                    <span className="font-headline font-bold text-slate-200 text-base block">
                      {item.facultyCoordinator}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                <span>YBN UNIVERSITY</span>
                <span className="text-emerald-400">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
