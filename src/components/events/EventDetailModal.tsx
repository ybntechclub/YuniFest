import React from 'react';
import { Link } from 'react-router-dom';
import { EventItem } from '../../types/database';
import { X, Calendar, MapPin, Users, Award, ShieldAlert, Sparkles, CheckCircle2, UserCheck, GraduationCap } from 'lucide-react';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  registeredCount?: number;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose, registeredCount = 0 }) => {
  if (!event) return null;

  const isFull = event.capacity !== null && registeredCount >= event.capacity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0D2345] border border-[#F5C451]/30 rounded-2xl shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-event-title"
      >
        {/* Header Ribbon */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#112C57] to-[#0A1B3B] border-b border-[#F5C451]/20">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg bg-[#07152F] text-slate-300 hover:text-white border border-slate-700 hover:border-[#F5C451]/50 focus:outline-none"
            aria-label="Close event details modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#07152F] text-[#F5C451] border border-[#F5C451]/30">
              {event.category.toUpperCase()}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#07152F] text-slate-300 border border-slate-700">
              {event.event_day === 'tbd' ? 'Day To Be Announced' : event.event_day.replace('_', ' ').toUpperCase()}
            </span>
            {event.eligible_participant_types === 'all' ? (
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                Open to All Colleges
              </span>
            ) : (
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40">
                YBN Students Only
              </span>
            )}
          </div>

          <h2 id="modal-event-title" className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {event.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* Key Quick Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#07152F] border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Timing:</span>
              <span className="font-bold text-white">{event.timing_display}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Venue:</span>
              <span className="font-bold text-white">{event.venue}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Capacity:</span>
              <span className="font-bold text-[#F5C451]">
                {event.capacity ? `${registeredCount} / ${event.capacity} ${event.capacity_unit}` : 'Open Entry'}
              </span>
            </div>
          </div>

          {/* Coordinators */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#F5C451]" />
              <span>Event Coordinators</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#07152F] border border-slate-800">
                <span className="text-cyan-400 font-semibold block text-[10px] uppercase">Student Coordinator</span>
                <span className="text-white font-bold text-sm mt-0.5 block">{event.student_coordinator}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#07152F] border border-slate-800">
                <span className="text-[#F5C451] font-semibold block text-[10px] uppercase">Faculty Coordinator</span>
                <span className="text-white font-bold text-sm mt-0.5 block">{event.faculty_coordinator}</span>
              </div>
            </div>
          </div>

          {/* Official Rules & Guidelines */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#F5C451]" />
              <span>Event Guidelines & Rules</span>
            </h3>
            <div className="space-y-2">
              {event.rules && event.rules.length > 0 ? (
                event.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 p-2.5 rounded-lg bg-[#07152F]/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C451] shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">Rules will be briefed by the faculty coordinator prior to the round.</p>
              )}
            </div>
          </div>

          {/* Mandatory ID Clause Reminder */}
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-[#F5C451] shrink-0 mt-0.5" />
            <span>
              All participants must present their original College/University ID card at physical check-in.
            </span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#07152F] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Registration Fee: <strong className="text-[#F5C451]">₹0 (Free)</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-300 bg-[#0D2345] hover:bg-slate-800 border border-slate-700"
            >
              Close
            </button>

            {event.registration_open ? (
              isFull ? (
                <button
                  disabled
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 cursor-not-allowed"
                >
                  Capacity Reached (Closed)
                </button>
              ) : (
                <Link
                  to={`/register?event=${event.slug}`}
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] via-[#F5C451] to-[#D4A017] hover:brightness-110 shadow-gold-glow"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#07152F]" />
                  <span>Register For This Event</span>
                </Link>
              )
            ) : (
              <span className="text-xs text-slate-400 italic">Registration Closed / Walk-in Only</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
