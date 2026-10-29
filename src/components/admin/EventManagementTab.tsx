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
      timing_display: timingDisplay,
      venue,
      eligible_participant_types: eligibleTypes,
      capacity: parsedCapacity,
      capacity_unit: capacityUnit,
      student_coordinator: studentCoord,
      faculty_coordinator: facultyCoord,
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
    <div className="space-y-6 text-slate-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-headline font-black text-slate-950 text-2xl uppercase">
            Event Controls, Capacities &amp; Schedules
          </h3>
          <p className="text-xs text-slate-600 mt-1 font-display">
            Configure registration caps (e.g. 25 slots for Treasure Hunting), update timings from "TBA", or open/close entry gates.
          </p>
        </div>
      </div>

      {/* Events Table / Card List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => {
          const regCount = registrationStore.getRegistrationCount(evt.id);
          const isFull = evt.capacity !== null && regCount >= evt.capacity;

          return (
            <div
              key={evt.id}
              className="p-6 rounded-[28px] bg-white border-[1.5px] border-slate-900 shadow-sm hover:shadow-solid-pop transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
                    {evt.event_day === 'tbd' ? 'Date TBA' : evt.event_day.replace('_', ' ').toUpperCase()}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleOpen(evt)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                      evt.registration_open
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                        : 'bg-red-100 text-red-900 border-red-400'
                    }`}
                  >
                    <span>{evt.registration_open ? 'Gate Open' : 'Gate Closed'}</span>
                  </button>
                </div>

                <h4 className="font-headline font-bold text-slate-950 text-lg mb-1 leading-snug">
                  {evt.name}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed font-display">
                  {evt.description}
                </p>

                {/* Capacity Counter */}
                <div className="p-3.5 rounded-2xl bg-[#F6F7F9] border border-slate-300 text-xs font-mono space-y-1 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-bold">Registrations:</span>
                    <strong className={`font-mono ${isFull ? 'text-red-600 font-bold' : 'text-[#2B59FF]'}`}>
                      {regCount} {evt.capacity ? `/ ${evt.capacity} ${evt.capacity_unit}` : '(No Cap)'}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-bold">Eligibility:</span>
                    <span className="text-slate-800 font-semibold">
                      {evt.eligible_participant_types === 'all' ? 'All Colleges' : 'YBN Internal Only'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-bold">Timing:</span>
                    <span className="text-slate-800">{evt.timing_display}</span>
                  </div>
                </div>

                {/* Coordinators */}
                <div className="text-[11px] font-mono text-slate-600 space-y-0.5 mb-4">
                  <div>Student: <span className="text-slate-950 font-bold">{evt.student_coordinator}</span></div>
                  <div>Faculty: <span className="text-slate-950 font-bold">{evt.faculty_coordinator}</span></div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => handleStartEdit(evt)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-display font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-300 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#2B59FF]" />
                  <span>Edit Event &amp; Capacity</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border-[1.5px] border-slate-900 rounded-[32px] shadow-solid-pop-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <h3 className="font-headline font-black text-xl text-slate-950 uppercase">
                Edit Event Parameters
              </h3>
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F7F9] border border-slate-300 focus:border-[#2B59FF] text-xs font-bold text-slate-950"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F7F9] border border-slate-300 focus:border-[#2B59FF] text-xs text-slate-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Event Day
                  </label>
                  <select
                    value={eventDay}
                    onChange={(e) => setEventDay(e.target.value as EventDay)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F6F7F9] border border-slate-300 text-xs font-bold text-slate-950"
                  >
                    <option value="day_1">Day 1 (Dec 10)</option>
                    <option value="day_2">Day 2 (Dec 11)</option>
                    <option value="day_3">Day 3 (Dec 12)</option>
                    <option value="tbd">Schedule TBA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Eligibility
                  </label>
                  <select
                    value={eligibleTypes}
                    onChange={(e) => setEligibleTypes(e.target.value as EligibilityType)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F6F7F9] border border-slate-300 text-xs font-bold text-slate-950"
                  >
                    <option value="all">All Colleges Open</option>
                    <option value="ybn_only">YBN Students Only</option>
                    <option value="outside_only">Visiting Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Timing Display
                  </label>
                  <input
                    type="text"
                    value={timingDisplay}
                    onChange={(e) => setTimingDisplay(e.target.value)}
                    placeholder="e.g. 10:00 AM - 01:00 PM"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F6F7F9] border border-slate-300 text-xs text-slate-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Amphitheatre Stage"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F6F7F9] border border-slate-300 text-xs text-slate-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Max Capacity (Leave blank for unlimited)
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="e.g. 25"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F6F7F9] border border-slate-300 text-xs text-slate-950 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Capacity Unit
                  </label>
                  <select
                    value={capacityUnit}
                    onChange={(e) => setCapacityUnit(e.target.value as 'participants' | 'teams')}
                    className="w-full px-3 py-2 rounded-xl bg-[#F6F7F9] border border-slate-300 text-xs font-bold text-slate-950"
                  >
                    <option value="teams">Teams</option>
                    <option value="participants">Participants</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Student Coordinator
                  </label>
                  <input
                    type="text"
                    value={studentCoord}
                    onChange={(e) => setStudentCoord(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F6F7F9] border border-slate-300 text-xs text-slate-950 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Faculty Coordinator
                  </label>
                  <input
                    type="text"
                    value={facultyCoord}
                    onChange={(e) => setFacultyCoord(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F6F7F9] border border-slate-300 text-xs text-slate-950 font-medium"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono font-bold text-slate-900">
                  <input
                    type="checkbox"
                    checked={isOpen}
                    onChange={(e) => setIsOpen(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-950"
                  />
                  <span>Registration Open for this Event</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-display font-bold text-slate-600 hover:text-slate-950"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-voltage text-xs py-2 px-6"
                >
                  {saveSuccess ? 'Changes Saved!' : 'Save Parameters'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};
