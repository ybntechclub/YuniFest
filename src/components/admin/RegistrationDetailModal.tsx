import React, { useState, useEffect, useRef } from 'react';
import { RegistrationRecord, RegistrationStatus } from '../../types/database';
import { 
  X, CheckCircle, Clock, XCircle, AlertCircle, User, Building, Phone, Mail, 
  Award, ShieldCheck, Sparkles, CreditCard, FileImage, ExternalLink, Folder, 
  Trash2, Calendar, Gamepad2, Palette, Shirt
} from 'lucide-react';
import { isGoogleDriveUrl, getDriveDirectImageUrl, getDrivePreviewUrl, getDriveViewUrl, GOOGLE_DRIVE_FOLDER_URL } from '../../lib/driveUpload';
import { sendRegistrationConfirmationEmail } from '../../lib/emailService';

interface RegistrationDetailModalProps {
  registration: RegistrationRecord | null;
  onClose: () => void;
  onStatusUpdate: (regId: string, newStatus: RegistrationStatus) => Promise<void>;
  onDelete?: (regId: string) => Promise<void>;
}

export const RegistrationDetailModal: React.FC<RegistrationDetailModalProps> = ({
  registration,
  onClose,
  onStatusUpdate,
  onDelete,
}) => {
  if (!registration) return null;

  const [currentStatus, setCurrentStatus] = useState<RegistrationStatus>(registration.registration_status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [verifiedNotice, setVerifiedNotice] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'image' | 'iframe'>('image');
  const [imgFailed, setImgFailed] = useState(false);
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [emailSentNotice, setEmailSentNotice] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll and bind Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Keep internal status synced if parent registration updates
  useEffect(() => {
    setCurrentStatus(registration.registration_status);
  }, [registration.registration_status]);

  const isDrive = isGoogleDriveUrl(registration.payment_screenshot_url);
  const directImgUrl = isDrive ? getDriveDirectImageUrl(registration.payment_screenshot_url) : registration.payment_screenshot_url;
  const driveEmbedUrl = isDrive ? getDrivePreviewUrl(registration.payment_screenshot_url) : '';
  const driveViewUrl = isDrive ? (getDriveViewUrl(registration.payment_screenshot_url) || registration.payment_screenshot_url) : registration.payment_screenshot_url;

  const handleStatusChange = async (status: RegistrationStatus) => {
    setIsUpdating(true);
    await onStatusUpdate(registration.id, status);
    setCurrentStatus(status);
    setIsUpdating(false);
  };

  // Wheel listener on outer card to guarantee smooth mouse-wheel scrolling even if cursor hovers over header
  const handleCardWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (scrollContainerRef.current && !scrollContainerRef.current.contains(e.target as Node)) {
      scrollContainerRef.current.scrollTop += e.deltaY;
    }
  };

  // 3-Day Itinerary Data Resolution
  const eventData = registration.event_specific_data || {};
  const selectedByDay = eventData.selectedEventsByDay || {};
  
  const day1Name = selectedByDay.day_1?.name || (
    registration.event_name?.toLowerCase().includes('gaming') ? 'Gaming Tournament (Free Fire & BGMI)' :
    registration.event_name?.toLowerCase().includes('face') ? 'Face Painting & Tattoo Making' :
    registration.event_name?.toLowerCase().includes('model') ? 'Model Representation' :
    registration.event_name?.toLowerCase().includes('poster') ? 'Poster Making' :
    registration.event_name?.toLowerCase().includes('sketch') ? 'Live Sketch Competition' :
    'General Visitor / Internal Attendance (No Competition)'
  );

  const day2Name = selectedByDay.day_2?.name || (
    registration.event_name?.toLowerCase().includes('dance') ? 'Dance Competition' :
    registration.event_name?.toLowerCase().includes('singing') ? 'Singing Competition' :
    registration.event_name?.toLowerCase().includes('treasure') ? 'Treasure Hunting' :
    registration.event_name?.toLowerCase().includes('reel') ? 'Reel Competition' :
    registration.event_name?.toLowerCase().includes('mimicry') ? 'Mimicry & Stand-up Comedy' :
    'General Visitor / Internal Attendance (No Competition)'
  );

  const day3Name = selectedByDay.day_3?.name || (
    registration.event_name?.toLowerCase().includes('ramp') ? 'Ramp Walk / Fashion Show' :
    'Grand Runway & EDM DJ Concert (Audience Entry)'
  );

  const squadMembers = eventData.squadMembers;
  const isDuo = eventData.gamingFormat === 'duo' || (Array.isArray(squadMembers) && squadMembers.length === 2);
  const rampWalkTheme = eventData.rampWalkTheme;
  const iksFormat = eventData.iksFormat;
  const faceArtCategory = eventData.faceArtCategory;
  const modelPartnerName = eventData.modelPartnerName;

  return (
    <div 
      data-lenis-prevent="true"
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Outer Card with flex layout: Sticky Header, Smooth Mouse-Scrollable Body, Clean Footer */}
      <div 
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleCardWheel}
        className="relative w-full max-w-2xl bg-white border-[1.5px] sm:border-[2px] border-slate-900 rounded-[24px] sm:rounded-[32px] shadow-solid-pop-lg text-slate-950 my-auto max-h-[94vh] sm:max-h-[90vh] flex flex-col overflow-hidden"
      >
        
        {/* Pinned Header */}
        <div className="p-4 sm:p-6 md:p-7 pb-3 sm:pb-4 shrink-0 border-b-[1.5px] border-slate-900/10 bg-white relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border border-slate-900 shadow-sm transition-transform hover:scale-105 z-20"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 pr-10 sm:pr-12 flex-wrap">
            <span className="font-mono text-xs sm:text-sm font-black text-[#2B59FF] px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200">
              {registration.registration_code}
            </span>
            <span className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full border ${
              registration.participant_type === 'ybn_student'
                ? 'bg-[#FEF08A] text-slate-950 border-slate-900'
                : 'bg-[#E0E7FF] text-[#2B59FF] border-blue-300'
            }`}>
              {registration.participant_type === 'ybn_student' ? "YBN Internal Student" : "Visitor (Outside Student)"}
            </span>
            <span className={`text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
              currentStatus === 'confirmed'
                ? 'bg-emerald-100 text-emerald-950 border-emerald-400'
                : 'bg-amber-100 text-amber-950 border-amber-400'
            }`}>
              {currentStatus === 'confirmed' ? "● VERIFIED & CONFIRMED" : "○ PENDING PAYMENT REVIEW"}
            </span>
          </div>

          <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl text-slate-950 truncate">
            {registration.full_name}
          </h2>
          <p className="font-mono text-[11px] sm:text-xs text-slate-500 mt-1">
            Student ID / Roll No: <strong className="text-slate-900">{registration.student_id_number}</strong>
          </p>
        </div>

        {/* Scrollable Modal Content: Fully responsive to standard mouse wheel scrolling */}
        <div 
          ref={scrollContainerRef}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          className="overflow-y-auto p-4 sm:p-6 md:p-7 pt-3 sm:pt-4 space-y-3.5 sm:space-y-4 flex-1 overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          
          {/* 3-DAY FESTIVAL ITINERARY BREAKDOWN */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F6F7F9] to-white border-[1.5px] border-slate-900 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-1.5">
              <span className="font-mono text-[11px] sm:text-xs font-black uppercase text-[#2B59FF] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#2B59FF]" />
                <span>3-DAY FESTIVAL ITINERARY BREAKDOWN</span>
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900">
                PAY ONCE • 3 DAYS ACCESS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 font-mono text-xs">
              {/* Day 1 */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-300 space-y-1 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-black uppercase">DAY 01 // DEC 10</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 font-bold">TECH</span>
                </div>
                <span className="font-headline font-bold text-xs text-slate-950 block leading-snug">
                  {day1Name}
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  Technical &amp; Innovation Day
                </span>
              </div>

              {/* Day 2 */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-300 space-y-1 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-black uppercase">DAY 02 // DEC 11</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-900 font-bold">CULTURAL</span>
                </div>
                <span className="font-headline font-bold text-xs text-slate-950 block leading-snug">
                  {day2Name}
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  Showcase &amp; Competitions
                </span>
              </div>

              {/* Day 3 */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-300 space-y-1 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-black uppercase">DAY 03 // DEC 12</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-pink-100 text-pink-900 font-bold">FINALE</span>
                </div>
                <span className="font-headline font-bold text-xs text-slate-950 block leading-snug">
                  {day3Name}
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  Runway &amp; DJ Concert
                </span>
              </div>
            </div>

            {/* Event Specific Sub-Details */}
            {(rampWalkTheme || iksFormat || faceArtCategory || modelPartnerName) && (
              <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {rampWalkTheme && (
                  <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200">
                    <span className="text-[10px] text-purple-800 font-bold block uppercase flex items-center gap-1">
                      <Shirt className="w-3 h-3" />
                      <span>Ramp Walk Runway Theme:</span>
                    </span>
                    <strong className="text-purple-950 text-xs mt-0.5 block">{rampWalkTheme}</strong>
                  </div>
                )}

                {iksFormat && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-bold block uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>IKS Presentation Medium:</span>
                    </span>
                    <strong className="text-emerald-950 text-xs mt-0.5 block">{iksFormat}</strong>
                  </div>
                )}

                {(faceArtCategory || modelPartnerName) && (
                  <div className="p-2.5 rounded-lg bg-pink-50 border border-pink-200">
                    <span className="text-[10px] text-pink-800 font-bold block uppercase flex items-center gap-1">
                      <Palette className="w-3 h-3" />
                      <span>Face Art &amp; Canvas Companion:</span>
                    </span>
                    <strong className="text-pink-950 text-xs mt-0.5 block">
                      {faceArtCategory || 'Face Painting'}{modelPartnerName ? ` • Companion: ${modelPartnerName}` : ''}
                    </strong>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Academic & Affiliation Profile */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F6F7F9] border border-slate-300 space-y-2 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Institution / College:</span>
              <span className="font-bold text-slate-950 text-xs sm:text-sm">{registration.institution_name}</span>
            </div>
            {registration.department && (
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Department / Faculty:</span>
                <span className="font-bold text-slate-950 text-xs">{registration.department}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Course / Degree:</span>
                <span className="font-bold text-slate-950 text-xs">{registration.course}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Academic Year:</span>
                <span className="font-bold text-slate-950 text-xs">{registration.academic_year}</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white border border-slate-300">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">EMAIL:</span>
              <span className="font-bold text-slate-950 break-all block mt-0.5">{registration.email}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-300">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">PHONE / WHATSAPP:</span>
              <span className="font-bold text-slate-950 truncate block mt-0.5">{registration.mobile}</span>
            </div>
          </div>

          {/* Esports Duo / Squad Roster (If Registered for Gaming with real squad data) */}
          {squadMembers && Array.isArray(squadMembers) && squadMembers.length > 0 &&
           squadMembers.some((m: any) => (m.ign && m.ign.trim() && m.ign.trim() !== 'N/A') || (m.uid && m.uid.trim() && m.uid.trim() !== 'N/A') || (m.name && m.name.trim() && m.name.trim() !== 'Player')) && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#E0E7FF]/60 border border-blue-300 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-blue-950 uppercase font-black flex items-center gap-1.5 text-xs">
                  <Gamepad2 className="w-4 h-4 text-[#2B59FF]" />
                  <span>ESPORTS {isDuo ? 'DUO ROSTER (2 PLAYERS)' : `SQUAD ROSTER (${squadMembers.length} PLAYERS)`}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300 font-bold">
                  {eventData.gameChoice || 'Esports'}
                </span>
              </div>

              {registration.team_name && (
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Team / Clan Name:</span>
                  <strong className="text-slate-950 text-sm">{registration.team_name}</strong>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {squadMembers.map((m: any, i: number) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white border border-blue-200">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-950 font-bold">{i + 1}. {m.name || 'Player'}</strong>
                      {i === 0 && <span className="text-[9px] bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded font-bold">CAPTAIN</span>}
                    </div>
                    <div className="text-slate-600 text-[10px] mt-0.5">
                      IGN: <span className="text-[#2B59FF] font-bold">{m.ign || 'N/A'}</span> • UID: <span className="text-slate-900 font-bold">{m.uid || 'N/A'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team / Project details if non-gaming */}
          {registration.team_name && (!squadMembers || squadMembers.length === 0) && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FEF08A]/40 border border-slate-900 text-xs font-mono">
              <span className="text-slate-700 uppercase font-bold block text-[10px]">TEAM / PROJECT TITLE:</span>
              <span className="font-bold text-slate-950 text-sm">{registration.team_name}</span>
              {registration.team_details && (
                <div className="mt-2 text-slate-800 whitespace-pre-wrap text-[11px] bg-white/80 p-2.5 rounded-xl border border-slate-300">
                  {registration.team_details}
                </div>
              )}
            </div>
          )}

          {/* Payment Verification Review (Manual Verification by Payment Head) */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FEF08A]/30 border-[1.5px] border-slate-900 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-headline font-bold uppercase text-slate-950 flex items-center gap-1.5 text-xs">
                <CreditCard className="w-4 h-4 text-[#2B59FF]" />
                <span>Payment Verification Review</span>
              </span>
              <span className={`px-2 sm:px-2.5 py-0.5 rounded-full font-bold text-[9px] sm:text-[10px] uppercase border ${
                currentStatus === 'confirmed' 
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-400' 
                  : 'bg-amber-100 text-amber-900 border-amber-400'
              }`}>
                {currentStatus === 'confirmed' ? "Verified & Paid" : "Pending Verification"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 bg-white p-3 rounded-xl border border-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px]">FEE AMOUNT:</span>
                <span className="font-headline font-black text-slate-950 text-sm sm:text-base">
                  ₹{registration.amount_inr || (registration.participant_type === 'ybn_student' ? 399 : 499)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">TRANSACTION / UTR ID:</span>
                <span className="font-bold text-slate-950 select-all text-xs break-all">
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
              <div className="space-y-3 p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-300">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-slate-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <FileImage className="w-4 h-4 text-[#2B59FF]" />
                    <span>Receipt Screenshot</span>
                  </span>

                  {isDrive ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-slate-100 text-[10px] sm:text-[11px] font-bold">
                        <button
                          type="button"
                          onClick={() => setPreviewTab('image')}
                          className={`px-2 sm:px-2.5 py-1 rounded-md transition-colors ${previewTab === 'image' && !imgFailed ? 'bg-white shadow text-slate-950' : 'text-slate-600 hover:text-slate-950'}`}
                        >
                          Photo View
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTab('iframe')}
                          className={`px-2 sm:px-2.5 py-1 rounded-md transition-colors ${previewTab === 'iframe' || imgFailed ? 'bg-white shadow text-[#2B59FF]' : 'text-slate-600 hover:text-slate-950'}`}
                        >
                          Drive Player
                        </button>
                      </div>

                      <a
                        href={driveViewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-lg bg-blue-50 text-[#2B59FF] hover:bg-blue-100 border border-blue-200 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Drive ↗</span>
                      </a>
                    </div>
                  ) : (
                    <a
                      href={registration.payment_screenshot_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-300"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Image ↗</span>
                    </a>
                  )}
                </div>

                {/* Display Area — always inline in the panel, no redirect */}
                {isDrive ? (
                  (previewTab === 'iframe' || imgFailed) ? (
                    <div className="rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shadow-inner">
                      <iframe
                        src={driveEmbedUrl}
                        title="Google Drive Receipt Preview"
                        className="w-full h-64 sm:h-72 border-0"
                        allow="autoplay"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl overflow-hidden border border-slate-300 bg-slate-50 flex items-center justify-center p-1">
                      <img
                        src={directImgUrl}
                        alt="Payment receipt preview"
                        referrerPolicy="no-referrer"
                        className="max-h-64 sm:max-h-80 w-full object-contain bg-white rounded-lg select-none"
                        onError={() => setImgFailed(true)}
                      />
                    </div>
                  )
                ) : (
                  <div className="rounded-xl overflow-hidden border border-slate-300 bg-slate-50 flex items-center justify-center p-1">
                    <img
                      src={registration.payment_screenshot_url}
                      alt="Payment receipt preview"
                      className="max-h-64 sm:max-h-80 w-full object-contain bg-white rounded-lg select-none"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between text-slate-500 text-[10px] pt-1">
                  <span>
                    Google Drive Status: <strong className="text-slate-900">{isDrive ? 'Stored in Cloud Folder' : 'Base64 Local'}</strong>
                  </span>
                  <a
                    href={GOOGLE_DRIVE_FOLDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#2B59FF] hover:underline"
                  >
                    <Folder className="w-3.5 h-3.5" />
                    <span>Open Drive Folder ↗</span>
                  </a>
                </div>
              </div>
            )}

            {/* Verification Button */}
            {currentStatus === 'pending' && (
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={async () => {
                    await handleStatusChange('confirmed');
                    setVerifiedNotice(`Payment verified! Official entry badge confirmed for ${registration.email}.`);
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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

          {/* Send / Resend Confirmation Email Button */}
          <div className="pt-3 border-t border-slate-200">
            <button
              type="button"
              disabled={isSendingMail}
              onClick={async () => {
                setIsSendingMail(true);
                setEmailSentNotice(null);
                try {
                  const res = await sendRegistrationConfirmationEmail(registration);
                  setEmailSentNotice(res.message || `Confirmation email dispatched to ${registration.email}!`);
                } catch (e: any) {
                  setEmailSentNotice(`Failed: ${e.message}`);
                } finally {
                  setIsSendingMail(false);
                }
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-100 text-[#2B59FF] font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{isSendingMail ? 'Dispatching Confirmation Email...' : 'Send Official Confirmation Email'}</span>
            </button>
            {emailSentNotice && (
              <p className="font-mono text-[11px] text-center text-emerald-700 mt-1.5 font-bold">
                ✓ {emailSentNotice}
              </p>
            )}
          </div>

          {/* Delete Action (Organizer) */}
          {onDelete && (
            <div className="pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => onDelete(registration.id)}
                className="w-full py-2.5 px-3 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Registration Record</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
