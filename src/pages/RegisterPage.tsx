import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ParticipantType, EventItem } from '../types/database';
import { registrationStore } from '../lib/registrationStore';
import { StudentTypeSelector } from '../components/registration/StudentTypeSelector';
import { RegistrationForm } from '../components/registration/RegistrationForm';
import { RegistrationProgressBar, RegistrationStep } from '../components/registration/RegistrationProgressBar';
import { Sparkles, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [participantType, setParticipantType] = useState<ParticipantType | null>(null);
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(1);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const data = await registrationStore.getEvents();
      setEvents(data);
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  const handleSelectParticipantType = (type: ParticipantType) => {
    setParticipantType(type);
    setCurrentStep(2);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleStepClick = (step: RegistrationStep) => {
    if (step === 1) {
      setCurrentStep(1);
    } else if (step === 2 && participantType) {
      setCurrentStep(2);
    } else if (step === 3 && participantType) {
      setCurrentStep(3);
    }
  };

  const participantLabel = participantType 
    ? (participantType === 'ybn_student' ? 'YBN Student (₹399)' : 'Outside College (₹499)')
    : undefined;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F6F7F9] text-slate-950 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[1.5px] border-slate-900 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#2B59FF]" />
            <span>Official Festival Admission</span>
            <span className="text-slate-500">•</span>
            <span className="text-[#2B59FF] font-bold">Pay Once • 3 Days Access</span>
          </div>
          <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-3">
            FESTIVAL{' '}
            <span className="font-editorial italic font-normal text-[#2B59FF] tracking-normal block sm:inline text-[1.05em]">
              Registration &amp; Pass
            </span>
          </h1>
          <p className="font-display text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Admission Fee: <strong className="text-slate-950 font-bold bg-[#FEF08A] px-2 py-0.5 rounded border border-slate-900 font-mono">₹399 (YBN Internal)</strong> • <strong className="text-slate-950 font-bold bg-[#E0E7FF] px-2 py-0.5 rounded border border-blue-400 font-mono">₹499 (Visitors)</strong> • Original Physical ID Mandatory.
          </p>
        </div>

        {/* Step Progress Bar */}
        <RegistrationProgressBar
          currentStep={currentStep}
          onStepClick={handleStepClick}
          participantTypeLabel={participantLabel}
        />

        {/* Step 1: Select Affiliation Type */}
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            <StudentTypeSelector
              selectedType={participantType}
              onSelect={handleSelectParticipantType}
            />
          </div>
        )}

        {/* Steps 2, 3, 4: Registration Form */}
        {currentStep >= 2 && participantType && (
          <div className="animate-fadeIn">
            {isLoading ? (
              <div className="p-12 text-center text-slate-500 text-xs font-mono">
                Loading events catalog...
              </div>
            ) : (
              <RegistrationForm
                participantType={participantType}
                events={events}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                onBackToAffiliation={() => {
                  setCurrentStep(1);
                }}
              />
            )}
          </div>
        )}

      </div>
    </div>
  );
};
export default RegisterPage;
