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
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
          [ STEP 01 // PARTICIPANT VERIFICATION ]
        </span>
        <h2 className="font-headline font-black text-2xl sm:text-4xl text-slate-950 uppercase mt-2">
          Select Institutional Affiliation
        </h2>
        <p className="font-display text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto">
          Choose between bonafide YBN University students and visiting delegates from external colleges across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        
        {/* Option A: YBN University Student */}
        <button
          type="button"
          onClick={() => onSelect('ybn_student')}
          className={`p-8 rounded-[28px] border-[1.5px] border-slate-900 text-left transition-all duration-300 flex flex-col justify-between relative group ${
            selectedType === 'ybn_student'
              ? 'bg-[#FEF08A] shadow-solid-pop -translate-y-1'
              : 'bg-white hover:bg-slate-50 shadow-sm hover:shadow-solid-pop'
          }`}
        >
          {selectedType === 'ybn_student' && (
            <div className="absolute top-5 right-5 text-slate-950">
              <CheckCircle2 className="w-6 h-6 fill-slate-950 text-white" />
            </div>
          )}

          <div>
            <div className="w-12 h-12 rounded-2xl bg-white border-[1.5px] border-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
              <GraduationCap className="w-6 h-6 text-[#2B59FF]" />
            </div>

            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#2B59FF]">
              [ OPTION A // INTERNAL ]
            </div>
            
            <h3 className="font-headline font-black text-2xl text-slate-950 mt-1 mb-2">
              YBN University Student
            </h3>

            <p className="font-display text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
              Currently enrolled in any faculty, department, or school of YBN University, Ranchi. Full access across all internal showcases and open competitions.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-900/15 font-mono text-[11px] text-slate-700 flex items-center justify-between">
            <span>Requires: University Roll No</span>
            <span className="font-black text-slate-950">SELECT →</span>
          </div>
        </button>

        {/* Option B: Other College Student */}
        <button
          type="button"
          onClick={() => onSelect('outside_student')}
          className={`p-8 rounded-[28px] border-[1.5px] border-slate-900 text-left transition-all duration-300 flex flex-col justify-between relative group ${
            selectedType === 'outside_student'
              ? 'bg-[#E0E7FF] shadow-solid-pop -translate-y-1'
              : 'bg-white hover:bg-slate-50 shadow-sm hover:shadow-solid-pop'
          }`}
        >
          {selectedType === 'outside_student' && (
            <div className="absolute top-5 right-5 text-slate-950">
              <CheckCircle2 className="w-6 h-6 fill-[#2B59FF] text-white" />
            </div>
          )}

          <div>
            <div className="w-12 h-12 rounded-2xl bg-white border-[1.5px] border-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
              <Building2 className="w-6 h-6 text-slate-950" />
            </div>

            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#2B59FF]">
              [ OPTION B // VISITING DELEGATE ]
            </div>
            
            <h3 className="font-headline font-black text-2xl text-slate-950 mt-1 mb-2">
              Other College Student
            </h3>

            <p className="font-display text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
              Visiting delegate representing any recognized college or university. Eligible for 9 flagship competitions including Dance, Singing, Gaming &amp; Treasure Hunt.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-900/15 font-mono text-[11px] text-slate-700 flex items-center justify-between">
            <span>Requires: College ID Card</span>
            <span className="font-black text-slate-950">SELECT →</span>
          </div>
        </button>

      </div>
    </div>
  );
};
