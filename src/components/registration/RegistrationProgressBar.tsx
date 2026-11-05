import React from 'react';
import { Check, ShieldCheck, UserCheck, CalendarCheck, CreditCard } from 'lucide-react';

export type RegistrationStep = 1 | 2 | 3 | 4;

interface RegistrationProgressBarProps {
  currentStep: RegistrationStep;
  onStepClick?: (step: RegistrationStep) => void;
  participantTypeLabel?: string;
  selectedEventsCount?: number;
}

export const RegistrationProgressBar: React.FC<RegistrationProgressBarProps> = ({
  currentStep,
  onStepClick,
  participantTypeLabel,
  selectedEventsCount = 0,
}) => {
  const steps = [
    {
      num: 1 as RegistrationStep,
      id: 'affiliation',
      title: 'AFFILIATION',
      subtitle: participantTypeLabel || 'YBN vs Outside',
      icon: ShieldCheck,
    },
    {
      num: 2 as RegistrationStep,
      id: 'profile',
      title: 'DELEGATE PROFILE',
      subtitle: 'Personal & College ID',
      icon: UserCheck,
    },
    {
      num: 3 as RegistrationStep,
      id: 'events',
      title: '3-DAY SELECTION',
      subtitle: selectedEventsCount > 0 ? `${selectedEventsCount} Selected (1/Day)` : 'Day 1 • Day 2 • Day 3',
      icon: CalendarCheck,
    },
    {
      num: 4 as RegistrationStep,
      id: 'pass',
      title: 'PASS & PAYMENT',
      subtitle: 'Pay Once • VIP Pass',
      icon: CreditCard,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-10 px-2 sm:px-4">
      {/* Mobile Top Indicator */}
      <div className="sm:hidden flex items-center justify-between mb-3 px-1">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
          STEP {currentStep} OF 4: <strong className="text-slate-950">{steps[currentStep - 1].title}</strong>
        </span>
        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900">
          {Math.round((currentStep / 4) * 100)}% COMPLETE
        </span>
      </div>

      {/* Progress Track */}
      <div className="relative">
        {/* Background Connecting Line */}
        <div className="hidden sm:block absolute top-6 left-12 right-12 h-1 bg-slate-200 z-0 border-y border-slate-300">
          <div
            className="h-full bg-slate-950 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 relative z-10">
          {steps.map((step) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const isClickable = onStepClick && isCompleted;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                onClick={() => {
                  if (isClickable) onStepClick(step.num);
                }}
                className={`flex flex-col items-center text-center transition-all ${
                  isClickable ? 'cursor-pointer hover:opacity-80' : ''
                }`}
              >
                {/* Step Circle Badge */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-headline font-black text-xs sm:text-sm border-[2px] transition-all duration-300 shadow-sm ${
                    isCompleted
                      ? 'bg-slate-950 border-slate-950 text-white'
                      : isCurrent
                      ? 'bg-[#FEF08A] border-slate-950 text-slate-950 scale-105 shadow-solid-pop'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white stroke-[3]" />
                  ) : (
                    <span>0{step.num}</span>
                  )}
                </div>

                {/* Step Labels */}
                <div className="mt-2.5 space-y-0.5">
                  <div
                    className={`font-mono text-[10px] sm:text-xs font-black uppercase tracking-tight line-clamp-1 ${
                      isCurrent
                        ? 'text-[#2B59FF]'
                        : isCompleted
                        ? 'text-slate-950'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="hidden sm:block font-display text-[11px] text-slate-500 line-clamp-1">
                    {step.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
