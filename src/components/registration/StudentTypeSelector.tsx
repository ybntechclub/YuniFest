import React from 'react';
import { ParticipantType } from '../../types/database';
import { GraduationCap, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

interface StudentTypeSelectorProps {
  selectedType: ParticipantType | null;
  onSelect: (type: ParticipantType) => void;
}

export const StudentTypeSelector: React.FC<StudentTypeSelectorProps> = ({ selectedType, onSelect }) => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5C451]">
          [ STEP 01 // PARTICIPANT VERIFICATION ]
        </span>
        <h2 className="font-headline font-black text-2xl sm:text-4xl text-white uppercase mt-2">
          Select Your Institutional Affiliation
        </h2>
        <p className="font-display text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
          Choose between bonafide YBN University students and visiting delegates from external colleges across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        
        {/* Option A: YBN University Student */}
        <button
          type="button"
          onClick={() => onSelect('ybn_student')}
          className={`mdnt-card crosshair-corner p-8 rounded-3xl text-left transition-all duration-300 flex flex-col justify-between relative group ${
            selectedType === 'ybn_student'
              ? 'border-[#F5C451] bg-[#0A1530] shadow-gold-glow'
              : 'hover:border-[#F5C451]/50'
          }`}
        >
          {selectedType === 'ybn_student' && (
            <div className="absolute top-5 right-5 text-[#F5C451]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}

          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#F5C451]/15 text-[#F5C451] border border-[#F5C451]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#F5C451]">
              [ OPTION A // INTERNAL ]
            </div>
            
            <h3 className="font-headline font-bold text-2xl text-white mt-1 mb-2">
              YBN University Student
            </h3>

            <p className="font-display text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Currently enrolled in any faculty, department, or school of YBN University, Ranchi. Full access to internal & open competitions.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-slate-400 flex items-center justify-between">
            <span>Requires: University Roll No</span>
            <span className="text-[#F5C451]">SELECT →</span>
          </div>
        </button>

        {/* Option B: Other College Student */}
        <button
          type="button"
          onClick={() => onSelect('outside_student')}
          className={`mdnt-card crosshair-corner p-8 rounded-3xl text-left transition-all duration-300 flex flex-col justify-between relative group ${
            selectedType === 'outside_student'
              ? 'border-cyan-400 bg-[#061726] shadow-cyan-glow'
              : 'hover:border-cyan-400/50'
          }`}
        >
          {selectedType === 'outside_student' && (
            <div className="absolute top-5 right-5 text-cyan-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}

          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>

            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-400">
              [ OPTION B // VISITING DELEGATE ]
            </div>
            
            <h3 className="font-headline font-bold text-2xl text-white mt-1 mb-2">
              Other College Student
            </h3>

            <p className="font-display text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Visiting delegate representing any recognized college or university. Eligible for 9 flagship competitions including Dance, Singing, Gaming & Treasure Hunt.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-slate-400 flex items-center justify-between">
            <span>Requires: College ID Number</span>
            <span className="text-cyan-400">SELECT →</span>
          </div>
        </button>

      </div>
    </div>
  );
};
