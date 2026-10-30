import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EventItem } from '../../types/database';
import { OFFICIAL_COORDINATORS } from '../../data/coordinators';
import { X, Calendar, Clock, MapPin, Users, ShieldCheck, ArrowRight, CheckCircle2, Phone } from 'lucide-react';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
    >
      <div className="relative w-full max-w-2xl bg-white border-[1.5px] border-slate-900 rounded-[32px] shadow-solid-pop-lg overflow-hidden animate-scaleUp text-slate-950">
        
        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 bg-[#F6F7F9] border-b-[1.5px] border-slate-900/10 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white text-slate-700 hover:text-slate-950 border-[1.5px] border-slate-900 shadow-sm focus:outline-none"
            aria-label="Close event details modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-[#2B59FF] border border-blue-200">
              {event.category.toUpperCase()}
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-300">
              {event.event_day === 'tbd' ? 'Day To Be Announced' : event.event_day.replace('_', ' ').toUpperCase()}
            </span>
            {event.eligible_participant_types === 'all' ? (
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E0E7FF] text-[#2B59FF] border border-blue-300">
                Open to All Colleges
              </span>
            ) : (
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900">
                YBN Students Only
              </span>
            )}
          </div>

          <h2 id="modal-event-title" className="font-headline font-black text-2xl sm:text-3xl text-slate-950 uppercase tracking-tight">
            {event.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-display">
            {event.description}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Key Quick Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F6F7F9] border border-slate-300 text-xs font-mono">
            <div>
              <span className="text-slate-500 block mb-0.5">Timing:</span>
              <span className="font-bold text-slate-950">{event.timing_display}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Venue:</span>
              <span className="font-bold text-slate-950">{event.venue}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Capacity:</span>
              <span className="font-bold text-[#2B59FF]">
                {event.capacity ? `${event.capacity} ${event.capacity_unit}` : 'Open Admission'}
              </span>
            </div>
          </div>

          {/* Coordinators Contact Details */}
          <div className="p-5 rounded-2xl bg-white border-[1.5px] border-slate-900 shadow-sm space-y-2">
            <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-900">
              Department Coordinators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Student Coordinator:</span>
                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                  <span className="font-bold text-slate-950 text-sm">{event.student_coordinator}</span>
                  {(() => {
                    const matchedCoord = OFFICIAL_COORDINATORS.find(
                      (c) =>
                        c.studentCoordinator.toLowerCase().includes(event.student_coordinator.toLowerCase()) ||
                        event.student_coordinator.toLowerCase().includes(c.studentCoordinator.toLowerCase())
                    );
                    if (!matchedCoord?.studentPhone) return null;
                    return (
                      <a
                        href={`tel:${matchedCoord.studentPhone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-[10px] font-bold text-slate-900 hover:bg-[#2B59FF] hover:text-white hover:border-[#2B59FF] transition-all shadow-sm"
                        title={`Call ${event.student_coordinator}`}
                      >
                        <Phone className="w-2.5 h-2.5 text-[#2B59FF] group-hover:text-white" />
                        <span>{matchedCoord.studentPhone}</span>
                      </a>
                    );
                  })()}
                </div>
              </div>
              <div>
                <span className="text-slate-500 block">Faculty Mentor:</span>
                <span className="font-bold text-slate-950 text-sm">{event.faculty_coordinator}</span>
              </div>
            </div>
          </div>

          {/* Rules & Guidelines */}
          {event.rules && event.rules.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-slate-950">
                Official Rules &amp; Evaluation Criteria
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-display">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2B59FF] shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mandatory Physical ID Reminder */}
          <div className="p-4 rounded-2xl bg-[#FEF08A]/50 border border-slate-900 text-xs font-display flex items-start gap-2.5 text-slate-900">
            <ShieldCheck className="w-4 h-4 text-slate-950 shrink-0 mt-0.5" />
            <span>
              <strong>Mandatory ID Requirement:</strong> Physical original ID card from college/university is mandatory at campus entry and stage roll-call.
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#F6F7F9] border-t-[1.5px] border-slate-900/10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-display font-bold uppercase tracking-wider text-slate-600 hover:text-slate-950"
          >
            Close
          </button>

          <Link
            to={`/register?event=${event.slug}`}
            onClick={onClose}
            className="btn-voltage inline-flex items-center gap-2 text-xs py-2.5 px-6"
          >
            <span>REGISTER FOR THIS EVENT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
