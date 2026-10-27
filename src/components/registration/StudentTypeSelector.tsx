import React from 'react';
import { ParticipantType } from '../../types/database';
import { GraduationCap, Building2, CheckCircle2, ShieldAlert } from 'lucide-react';

interface StudentTypeSelectorProps {
  selectedType: ParticipantType | null;
  onSelect: (type: ParticipantType) => void;
}

export const StudentTypeSelector: React.FC<StudentTypeSelectorProps> = ({ selectedType, onSelect }) => {
  return (
    <div className="mb-10">
      <div className="text-center mb-6">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#F5C451]">
          STEP 1: SELECT YOUR PARTICIPANT STATUS
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
          Which institution are you representing?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl mx-auto">
          Choose your participant category to load the eligible events and appropriate institutional verification fields.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
        
        {/* Option A: YBN University Student */}
        <button
          type="button"
          onClick={() => onSelect('ybn_student')}
          className={`p-6 rounded-2xl text-left border-2 transition-all flex flex-col justify-between relative group ${
            selectedType === 'ybn_student'
              ? 'bg-[#0D2345] border-[#F5C451] shadow-gold-glow'
              : 'bg-[#07152F] border-slate-700/80 hover:border-[#F5C451]/50'
          }`}
        >
          {selectedType === 'ybn_student' && (
            <div className="absolute top-4 right-4 text-[#F5C451]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}

          <div>
            <div className="w-12 h-12 rounded-xl bg-[#F5C451]/15 text-[#F5C451] border border-[#F5C451]/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div className="text-[11px] font-extrabold tracking-wider uppercase text-[#F5C451]">
              Option A
            </div>
            <h3 className="font-display font-black text-xl text-white mt-0.5 mb-2">
              YBN University Student
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Bonafide student currently enrolled in any faculty, school, or department of YBN University, Ranchi.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Requires: University Roll No, Department, Course & Year
          </div>
        </button>

        {/* Option B: Other College Student */}
        <button
          type="button"
          onClick={() => onSelect('outside_student')}
          className={`p-6 rounded-2xl text-left border-2 transition-all flex flex-col justify-between relative group ${
            selectedType === 'outside_student'
              ? 'bg-[#0D2345] border-cyan-400 shadow-cyan-glow'
              : 'bg-[#07152F] border-slate-700/80 hover:border-cyan-400/50'
          }`}
        >
          {selectedType === 'outside_student' && (
            <div className="absolute top-4 right-4 text-cyan-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}

          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>

            <div className="text-[11px] font-extrabold tracking-wider uppercase text-cyan-400">
              Option B
            </div>
            <h3 className="font-display font-black text-xl text-white mt-0.5 mb-2">
              Other College Student
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Visiting delegate or participant from any recognized external university, college, or institute across India.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Eligible for: Dance, Singing, Quiz, Gaming, Treasure Hunt & more
          </div>
        </button>

      </div>
    </div>
  );
};
