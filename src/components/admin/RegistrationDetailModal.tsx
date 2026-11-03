import React, { useState } from 'react';
import { RegistrationRecord, RegistrationStatus } from '../../types/database';
import { X, CheckCircle, Clock, XCircle, AlertCircle, User, Building, Phone, Mail, Award, ShieldCheck, Sparkles, CreditCard, FileImage, ExternalLink, Folder } from 'lucide-react';
import { isGoogleDriveUrl, getDriveThumbnailUrl, GOOGLE_DRIVE_FOLDER_URL } from '../../lib/driveUpload';

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
  const [verifiedNotice, setVerifiedNotice] = useState<string | null>(null);

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

          {/* Payment Verification Review (Manual Verification by Payment Head) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FEF08A]/30 border-[1.5px] border-slate-900 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-headline font-bold uppercase text-slate-950 flex items-center gap-1.5 text-xs">
                <CreditCard className="w-4 h-4 text-[#2B59FF]" />
                <span>Payment Verification Review</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                currentStatus === 'confirmed' 
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-400' 
                  : 'bg-amber-100 text-amber-900 border-amber-400'
              }`}>
                {currentStatus === 'confirmed' ? "Verified & Paid" : "Pending Verification"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px]">FEE AMOUNT:</span>
                <span className="font-headline font-black text-slate-950 text-base">
                  ₹{registration.amount_inr || (registration.participant_type === 'ybn_student' ? 399 : 499)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">TRANSACTION / UTR ID:</span>
                <span className="font-bold text-slate-950 select-all text-xs">
                  {registration.transaction_id || "Not submitted"}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px]">PAYMENT DATE &amp; TIME:</span>
                <span className="font-bold text-slate-950 text-xs">
                  {registration.payment_timestamp 
                    ? new Date(registration.payment_timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
                    : new Date(registration.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </div>
            </div>

            {/* Receipt Screenshot Preview & Google Drive View */}
            {registration.payment_screenshot_url && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 block text-[10px] font-bold uppercase tracking-wider">
                    PAYMENT RECEIPT SCREENSHOT:
                  </span>
                  {isGoogleDriveUrl(registration.payment_screenshot_url) ? (
                    <a
                      href={registration.payment_screenshot_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2B59FF] hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open in Google Drive</span>
                    </a>
                  ) : (
                    <a
                      href={registration.payment_screenshot_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-950"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open Image</span>
                    </a>
                  )}
                </div>

                <div 
                  className="rounded-xl overflow-hidden border border-slate-300 max-h-52 bg-slate-100 flex items-center justify-center p-1.5 relative group cursor-pointer"
                  onClick={() => window.open(registration.payment_screenshot_url, '_blank')}
                  title="Click to view full image in a new tab"
                >
                  <img 
                    src={getDriveThumbnailUrl(registration.payment_screenshot_url)} 
                    alt={`Payment receipt for ${registration.email}`} 
                    className="max-h-48 object-contain rounded-lg group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl text-white font-mono text-xs font-bold gap-1.5 pointer-events-none">
                    <ExternalLink className="w-4 h-4" />
                    <span>View Full Receipt</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[10px] text-slate-500">
                    File: <strong className="text-slate-700">{registration.email}_UTR.jpg</strong>
                  </span>
                  <a
                    href={GOOGLE_DRIVE_FOLDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#2B59FF] hover:underline"
                  >
                    <Folder className="w-3 h-3" />
                    <span>Open Drive Folder</span>
                  </a>
                </div>
              </div>
            )}

            {/* Manual Verification Action by Payment Head */}
            {currentStatus === 'pending' && (
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={async () => {
                    await handleStatusChange('confirmed');
                    setVerifiedNotice(`Payment verified by Payment Head! Confirmation email with official entry badge dispatched to ${registration.email}.`);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-headline font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Verify Payment &amp; Confirm Pass</span>
                </button>
              </div>
            )}

            {verifiedNotice && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono">
                ✓ {verifiedNotice}
              </div>
            )}
          </div>

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
