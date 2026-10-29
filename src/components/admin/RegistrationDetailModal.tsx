import React, { useState } from 'react';
import { RegistrationRecord, RegistrationStatus } from '../../types/database';
import { X, CheckCircle, Clock, XCircle, AlertCircle, User, Building, Phone, Mail, Award, ShieldCheck, Sparkles } from 'lucide-react';

interface RegistrationDetailModalProps {
  registration: RegistrationRecord | null;
  onClose: () => void;
  onStatusUpdate: (regId: string, newStatus: RegistrationStatus) => Promise<void>;
}

export const RegistrationDetailModal: React.FC<RegistrationDetailModalProps> = ({
  registration,
  onClose,
  onStatusUpdate,
}) => {
  if (!registration) return null;

  const [currentStatus, setCurrentStatus] = useState<RegistrationStatus>(registration.registration_status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (status: RegistrationStatus) => {
    setIsUpdating(true);
    await onStatusUpdate(registration.id, status);
    setCurrentStatus(status);
    setIsUpdating(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border-[1.5px] border-slate-900 rounded-[32px] shadow-solid-pop-lg p-6 sm:p-8 text-slate-950">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white text-slate-700 hover:text-slate-950 border-[1.5px] border-slate-900 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-sm font-black text-[#2B59FF] px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200">
              {registration.registration_code}
            </span>
            <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
              registration.participant_type === 'ybn_student'
                ? 'bg-[#FEF08A] text-slate-950 border-slate-900'
                : 'bg-[#E0E7FF] text-[#2B59FF] border-blue-300'
            }`}>
              {registration.participant_type === 'ybn_student' ? "YBN Internal Student" : "Visiting Delegate"}
            </span>
          </div>

          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-950">
            {registration.full_name}
          </h2>
          <p className="font-mono text-xs text-slate-500 mt-1">
            Student ID / Roll No: <strong>{registration.student_id_number}</strong>
          </p>
        </div>

        {/* Details Grid */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          
          {/* Event Allocation */}
          <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-slate-300">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
              REGISTERED EVENT
            </span>
            <span className="font-headline font-black text-lg text-slate-950 block mt-0.5">
              {registration.event_name}
            </span>
            {registration.participation_category && (
              <span className="text-xs font-mono text-[#2B59FF] font-bold block mt-1">
                Category: {registration.participation_category}
              </span>
            )}
          </div>

          {/* Academic Info */}
          <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-slate-300 space-y-2 text-xs font-mono">
            <div>
              <span className="text-slate-500 block">Institution / College:</span>
              <span className="font-bold text-slate-950">{registration.institution_name}</span>
            </div>
            {registration.department && (
              <div>
                <span className="text-slate-500 block">Department / Faculty:</span>
                <span className="font-bold text-slate-950">{registration.department}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 block">Course:</span>
                <span className="font-bold text-slate-950">{registration.course}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Year:</span>
                <span className="font-bold text-slate-950">{registration.academic_year}</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-white border border-slate-300">
              <span className="text-slate-500 block text-[10px]">EMAIL:</span>
              <span className="font-bold text-slate-950 truncate block mt-0.5">{registration.email}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-300">
              <span className="text-slate-500 block text-[10px]">PHONE:</span>
              <span className="font-bold text-slate-950 truncate block mt-0.5">{registration.mobile}</span>
            </div>
          </div>

          {/* Team / Dynamic Fields */}
          {registration.team_name && (
            <div className="p-4 rounded-2xl bg-[#FEF08A]/40 border border-slate-900 text-xs font-mono">
              <span className="text-slate-700 uppercase font-bold block text-[10px]">TEAM NAME:</span>
              <span className="font-bold text-slate-950 text-sm">{registration.team_name}</span>
              {registration.team_details && (
                <div className="mt-2 text-slate-800 whitespace-pre-wrap text-[11px] bg-white/70 p-2.5 rounded-xl border border-slate-300">
                  {registration.team_details}
                </div>
              )}
            </div>
          )}

          {/* Gaming Data */}
          {registration.event_specific_data?.gameIgn && (
            <div className="p-4 rounded-2xl bg-[#E0E7FF]/60 border border-blue-300 text-xs font-mono space-y-1">
              <span className="text-blue-900 uppercase font-bold block text-[10px]">ESPORTS CREDENTIALS</span>
              <div className="grid grid-cols-2 gap-2">
                <div>Game: <strong>{registration.event_specific_data.gameChoice}</strong></div>
                <div>IGN: <strong>{registration.event_specific_data.gameIgn}</strong></div>
                <div>Player ID: <strong>{registration.event_specific_data.gameId}</strong></div>
              </div>
            </div>
          )}

          {/* Status Controls */}
          <div className="pt-3 border-t border-slate-200">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
              Update Registration Status:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['confirmed', 'pending', 'waitlisted', 'rejected'] as RegistrationStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(st)}
                  className={`py-2 px-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
                    currentStatus === st
                      ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
