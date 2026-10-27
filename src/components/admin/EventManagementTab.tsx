import React, { useState } from 'react';
import { EventItem, EventDay, EligibilityType } from '../../types/database';
import { registrationStore } from '../../lib/registrationStore';
import { 
  Edit3, ToggleLeft, ToggleRight, Check, X, Users, Calendar, 
  MapPin, ShieldAlert, Sparkles, AlertCircle 
} from 'lucide-react';

interface EventManagementTabProps {
  events: EventItem[];
  onRefreshEvents: () => Promise<void>;
}

export const EventManagementTab: React.FC<EventManagementTabProps> = ({ events, onRefreshEvents }) => {
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states for modal
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventDay, setEventDay] = useState<EventDay>('day_1');
  const [timingDisplay, setTimingDisplay] = useState('');
  const [venue, setVenue] = useState('');
  const [eligibleTypes, setEligibleTypes] = useState<EligibilityType>('all');
  const [capacity, setCapacity] = useState<string>('');
  const [capacityUnit, setCapacityUnit] = useState<'participants' | 'teams'>('participants');
  const [studentCoord, setStudentCoord] = useState('');
  const [facultyCoord, setFacultyCoord] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleStartEdit = (evt: EventItem) => {
    setEditingEvent(evt);
    setName(evt.name);
    setDescription(evt.description);
    setEventDay(evt.event_day);
    setTimingDisplay(evt.timing_display);
    setVenue(evt.venue);
    setEligibleTypes(evt.eligible_participant_types);
    setCapacity(evt.capacity ? String(evt.capacity) : '');
    setCapacityUnit(evt.capacity_unit);
    setStudentCoord(evt.student_coordinator);
    setFacultyCoord(evt.faculty_coordinator);
    setIsOpen(evt.registration_open);
  };

  const handleToggleOpen = async (evt: EventItem) => {
    const updated = { ...evt, registration_open: !evt.registration_open };
    await registrationStore.updateEvent(updated);
    await onRefreshEvents();
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    const parsedCapacity = capacity.trim() === '' ? null : parseInt(capacity, 10);

    const updated: EventItem = {
      ...editingEvent,
      name,
      description,
      event_day: eventDay,
      timing_display: timingDisplay.trim() || 'Schedule to be announced',
      venue: venue.trim(),
      eligible_participant_types: eligibleTypes,
      capacity: isNaN(parsedCapacity as any) ? null : parsedCapacity,
      capacity_unit: capacityUnit,
      student_coordinator: studentCoord.trim(),
      faculty_coordinator: facultyCoord.trim(),
      registration_open: isOpen,
    };

    await registrationStore.updateEvent(updated);
    await onRefreshEvents();

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setEditingEvent(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-white text-xl">
            Event Controls, Capacities & Schedules
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Configure registration caps (e.g. 25 slots for Treasure Hunting), update timings from "TBA", or open/close entry gates.
          </p>
        </div>
      </div>

      {/* Events Table / Card List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((evt) => {
          const regCount = registrationStore.getRegistrationCount(evt.id);
          const isFull = evt.capacity !== null && regCount >= evt.capacity;

          return (
            <div
              key={evt.id}
              className="p-5 rounded-2xl bg-[#0D2345] border border-slate-700/80 hover:border-[#F5C451]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#07152F] text-slate-300 border border-slate-700">
                    {evt.event_day === 'tbd' ? 'Date TBA' : evt.event_day.replace('_', ' ').toUpperCase()}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleOpen(evt)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                      evt.registration_open
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                        : 'bg-red-950 text-red-300 border-red-500/40'
                    }`}
                  >
                    <span>{evt.registration_open ? 'Gate Open' : 'Gate Closed'}</span>
                  </button>
                </div>

                <h4 className="font-display font-bold text-white text-base mb-1">
                  {evt.name}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {evt.description}
                </p>

                {/* Capacity Counter */}
                <div className="p-3 rounded-xl bg-[#07152F] border border-slate-800 text-xs space-y-1 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Registrations:</span>
                    <strong className={`font-mono ${isFull ? 'text-red-400 font-bold' : 'text-[#F5C451]'}`}>
                      {regCount} {evt.capacity ? `/ ${evt.capacity} ${evt.capacity_unit}` : '(No Cap)'}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Eligibility:</span>
                    <span className="text-slate-300 font-semibold">
                      {evt.eligible_participant_types === 'all' ? 'All Colleges' : 'YBN Internal Only'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Timing:</span>
                    <span className="text-slate-300">{evt.timing_display}</span>
                  </div>
                </div>

                {/* Coordinators */}
                <div className="text-[11px] text-slate-400 space-y-0.5 mb-4">
                  <div>Student: <span className="text-slate-200">{evt.student_coordinator}</span></div>
                  <div>Faculty: <span className="text-slate-200">{evt.faculty_coordinator}</span></div>
                </div>
              </div>

              {/* Edit button */}
              <div className="pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => handleStartEdit(evt)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-white bg-[#112C57] hover:bg-[#1A3660] border border-[#F5C451]/30 hover:border-[#F5C451] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#F5C451]" />
                  <span>Configure Settings & Schedule</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Event Configuration Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0D2345] border border-[#F5C451]/40 rounded-2xl shadow-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setEditingEvent(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#07152F] text-slate-300 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-xl text-white mb-1">
              Edit Event: {editingEvent.name}
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Update capacity limits, schedule timings, eligibility restrictions, and coordinators.
            </p>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-white text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Programme Day</label>
                  <select
                    value={eventDay}
                    onChange={(e) => setEventDay(e.target.value as EventDay)}
                    className="w-full px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-white text-xs"
                  >
                    <option value="day_1">Day 1 (Dec 10) — Technical & Innovation</option>
                    <option value="day_2">Day 2 (Dec 11) — Cultural & Showcases</option>
                    <option value="day_3">Day 3 (Dec 12) — Grand Finale</option>
                    <option value="tbd">Schedule to be announced (TBD)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Timing Display</label>
                  <input
                    type="text"
                    value={timingDisplay}
                    onChange={(e) => setTimingDisplay(e.target.value)}
                    placeholder="e.g. 10:00 AM - 1:00 PM or Schedule to be announced"
                    className="w-full px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Venue Location</label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Eligibility</label>
                  <select
                    value={eligibleTypes}
                    onChange={(e) => setEligibleTypes(e.target.value as EligibilityType)}
                    className="w-full px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-white text-xs"
                  >
                    <option value="all">Open to Both YBN & Outside Colleges</option>
                    <option value="ybn_only">YBN University Students Only</option>
                    <option value="outside_only">Visiting Colleges Only</option>
                  </select>
                </div>
              </div>

              {/* Capacity settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 rounded-xl bg-[#07152F] border border-slate-800">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Maximum Capacity Limit (e.g. 25 for Treasure Hunt)
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="Leave empty for unlimited attendance"
                    className="w-full px-3 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-[#F5C451] text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Count Unit</label>
                  <select
                    value={capacityUnit}
                    onChange={(e) => setCapacityUnit(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0D2345] border border-slate-700 focus:border-[#F5C451] text-white text-xs"
                  >
                    <option value="participants">Individual Participants</option>
                    <option value="teams">Teams</option>
                  </select>
                </div>
              </div>

              {/* Coordinators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Student Coordinator</label>
                  <input
                    type="text"
                    value={studentCoord}
                    onChange={(e) => setStudentCoord(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Faculty Coordinator</label>
                  <input
                    type="text"
                    value={facultyCoord}
                    onChange={(e) => setFacultyCoord(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-white text-xs"
                  />
                </div>
              </div>

              {/* Open / Close Registration checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isOpen}
                    onChange={(e) => setIsOpen(e.target.checked)}
                    className="w-4 h-4 rounded text-[#F5C451] bg-[#07152F] border-slate-700"
                  />
                  <span className="text-slate-200 font-bold">
                    Registration Gate is Open for this Event
                  </span>
                </label>
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-[#07152F] hover:bg-slate-800 border border-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-xs font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] to-[#F5C451] hover:brightness-110 shadow-gold-glow flex items-center gap-1.5"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-950" />
                      <span>Changes Saved!</span>
                    </>
                  ) : (
                    <span>Save Event Changes</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
