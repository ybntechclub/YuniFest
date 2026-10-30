import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ParticipantType, EventItem } from '../types/database';
import { registrationStore } from '../lib/registrationStore';
import { StudentTypeSelector } from '../components/registration/StudentTypeSelector';
import { RegistrationForm } from '../components/registration/RegistrationForm';
import { Sparkles, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [participantType, setParticipantType] = useState<ParticipantType | null>(null);
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

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F6F7F9] text-slate-950 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[1.5px] border-slate-900 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#2B59FF]" />
            <span>Official Festival Admission</span>
            <span className="text-slate-500">•</span>
            <span className="text-[#2B59FF] font-bold">Instant Pass Generation</span>
          </div>
          <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-3">
            PARTICIPANT{' '}
            <span className="font-editorial italic font-normal text-[#2B59FF] tracking-normal block sm:inline text-[1.05em]">
              Registration Pass
            </span>
          </h1>
          <p className="font-display text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Admission Fee: <strong className="text-slate-950 font-bold bg-[#FEF08A] px-2 py-0.5 rounded border border-slate-900 font-mono">₹0 (Free Entry)</strong> • Physical College/University ID Card is Mandatory at Check-in.
          </p>
        </div>

        {/* Step 1: Select Affiliation Type */}
        <StudentTypeSelector
          selectedType={participantType}
          onSelect={(type) => setParticipantType(type)}
        />

        {/* Step 2: Form */}
        {participantType && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between max-w-3xl mx-auto mb-4 px-2">
              <button
                type="button"
                onClick={() => setParticipantType(null)}
                className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-slate-600 hover:text-[#2B59FF] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Switch Participant Option</span>
              </button>

              <span className="font-mono text-[11px] font-bold text-slate-500">
                Step 2 of 2: Submission
              </span>
            </div>

            {isLoading ? (
              <div className="p-12 text-center text-slate-500 text-xs font-mono">
                Loading events catalog...
              </div>
            ) : (
              <RegistrationForm
                participantType={participantType}
                events={events}
              />
            )}
          </div>
        )}

      </div>
    </div>
  );
};
