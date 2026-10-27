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
    <div className="min-h-screen pt-28 pb-20 bg-[#07152F] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2345] border border-[#F5C451]/30 text-xs font-semibold text-[#F5C451] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Fest Entry</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3">
            Participant <span className="gold-gradient-text">Registration Portal</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Registration Fee: <strong className="text-[#F5C451]">₹0 (Free)</strong> • Valid Physical College/University ID Card is Mandatory at Check-in.
          </p>
        </div>

        {/* Step 1: Select Type */}
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
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#F5C451] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Switch Participant Option</span>
              </button>

              <span className="text-[11px] font-semibold text-slate-400">
                Step 2 of 2: Submission
              </span>
            </div>

            {isLoading ? (
              <div className="p-12 text-center text-slate-400 text-xs">
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
