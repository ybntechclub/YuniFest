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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0D2345] border border-[#F5C451]/40 rounded-2xl shadow-2xl p-6 sm:p-8">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#07152F] text-slate-300 hover:text-white border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-sm font-bold text-[#F5C451] px-2 py-0.5 rounded bg-[#07152F] border border-[#F5C451]/30">
              {registration.registration_code}
            </span>
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              registration.participant_type === 'ybn_student'
                ? 'bg-[#112C57] text-[#F5C451]'
                : 'bg-cyan-950 text-cyan-300'
            }`}>
              {registration.participant_type === 'ybn_student' ? 'YBN Student' : 'Outside College'}
            </span>
          </div>

          <h3 className="font-display font-bold text-xl text-white">
            {registration.full_name}
          </h3>
          <p className="text-xs text-slate-300">
            Registered on {new Date(registration.created_at).toLocaleString()}
          </p>
        </div>

        {/* Details List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-xs">
          
          {/* Event Name */}
          <div className="p-3.5 rounded-xl bg-[#07152F] border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Event / Competition:</span>
            <span className="font-bold text-white text-sm">{registration.event_name || registration.event_id}</span>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#07152F] border border-slate-800">
            <div>
              <span className="text-slate-400 block mb-0.5">Email:</span>
              <span className="font-semibold text-white break-all">{registration.email}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Mobile:</span>
              <span className="font-semibold text-white">{registration.mobile}</span>
            </div>
          </div>

          {/* Academic Details */}
          <div className="p-3.5 rounded-xl bg-[#07152F] border border-slate-800 space-y-2">
            <div>
              <span className="text-slate-400 block mb-0.5">College / Institution:</span>
              <span className="font-semibold text-slate-200">{registration.institution_name}</span>
              {registration.institution_location && (
                <span className="text-slate-400 block text-[11px]">{registration.institution_location}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-400 block mb-0.5">Course & Year:</span>
                <span className="font-semibold text-slate-200">{registration.course} ({registration.academic_year})</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Student ID / Roll No:</span>
                <span className="font-mono font-bold text-cyan-300">{registration.student_id_number}</span>
              </div>
            </div>

            {registration.department && (
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-0.5">Department / Faculty:</span>
                <span className="font-semibold text-slate-200">{registration.department}</span>
              </div>
            )}
          </div>

          {/* Team / Category Details */}
          {(registration.team_name || registration.team_details || registration.participation_category) && (
            <div className="p-3.5 rounded-xl bg-[#07152F] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="font-bold text-[#F5C451]">{registration.participation_category || 'Standard'}</span>
              </div>

              {registration.team_name && (
                <div>
                  <span className="text-slate-400 block mb-0.5">Team / Crew Name:</span>
                  <span className="font-bold text-white">{registration.team_name}</span>
                </div>
              )}

              {registration.team_details && (
                <div>
                  <span className="text-slate-400 block mb-0.5">Members:</span>
                  <p className="text-slate-300 whitespace-pre-line bg-[#0A1B3B] p-2 rounded border border-slate-700">
                    {registration.team_details}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Event Specific Data (e.g. BGMI ID) */}
          {registration.event_specific_data && Object.keys(registration.event_specific_data).length > 0 && (
            <div className="p-3.5 rounded-xl bg-[#07152F] border border-cyan-500/30">
              <span className="text-cyan-300 font-bold block mb-1.5 uppercase tracking-wider text-[10px]">
                Event Specific Configuration
              </span>
              <div className="space-y-1">
                {Object.entries(registration.event_specific_data).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <span className="text-slate-400 uppercase text-[10px]">{k}:</span>
                    <span className="font-semibold text-white">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ID Card Confirmation Status */}
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Physical ID Card acknowledgment confirmed during registration.</span>
          </div>

        </div>

        {/* Change Status Footer Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Change Status:
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {(['confirmed', 'pending', 'waitlisted', 'rejected'] as RegistrationStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                    currentStatus === st
                      ? 'bg-[#F5C451] text-[#07152F] border-[#F5C451] shadow-sm'
                      : 'bg-[#07152F] text-slate-300 border-slate-700 hover:border-slate-500'
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
