import React from 'react';
import { OFFICIAL_COORDINATORS } from '../../data/coordinators';
import { Users, GraduationCap, UserCheck, Shield } from 'lucide-react';

export const CoordinatorsSection: React.FC = () => {
  return (
    <section id="coordinators" className="py-20 bg-[#07152F] relative border-t border-[#F5C451]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2345] border border-[#F5C451]/30 text-xs font-semibold text-[#F5C451] uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Festival Leadership</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-3">
            Core Organizing Committee & Faculty Mentors
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The dedicated academic leaders and student coordinators spearheading the execution of YUNIFEST 2026.
          </p>
        </div>

        {/* Coordinators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFICIAL_COORDINATORS.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#0D2345]/80 to-[#07152F]/90 border border-slate-700/70 hover:border-[#F5C451]/50 shadow-card-elevated transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Event Name Tag */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#F5C451]" />
                  <span className="font-display font-bold text-white text-base">
                    {item.event}
                  </span>
                </div>

                {/* Coordinators Details */}
                <div className="space-y-3.5">
                  {/* Student Coordinator */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#07152F]/80 border border-slate-800">
                    <UserCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                        Student Coordinator
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {item.studentCoordinator}
                      </div>
                    </div>
                  </div>

                  {/* Faculty Coordinator */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#07152F]/80 border border-slate-800">
                    <GraduationCap className="w-5 h-5 text-[#F5C451] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#F5C451]">
                        Faculty Coordinator
                      </div>
                      <div className="text-sm font-bold text-slate-100 mt-0.5">
                        {item.facultyCoordinator}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Verification Badge */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <Shield className="w-3 h-3 text-[#F5C451]" />
                  Official YBN University Committee
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
