import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EventItem } from '../types/database';
import { registrationStore } from '../lib/registrationStore';
import { EventDetailModal } from '../components/events/EventDetailModal';
import { 
  Calendar, Clock, MapPin, Users, ArrowRight, Sparkles, 
  ShieldCheck, HelpCircle, FileImage, Info 
} from 'lucide-react';

export const SchedulePage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeTab, setActiveTab] = useState<'day_1' | 'day_2' | 'day_3' | 'tbd'>('day_1');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await registrationStore.getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const scheduleDays = [
    {
      id: 'day_1' as const,
      dayNumber: 'Day 1',
      date: 'Dec 10, 2026',
      title: 'Technical & Innovation Day',
      subtitle: 'Engineering prototypes, digital gaming tournaments, flea market & craft workshops',
    },
    {
      id: 'day_2' as const,
      dayNumber: 'Day 2',
      date: 'Dec 11, 2026',
      title: 'Cultural Showcase & Creative Competitions',
      subtitle: 'Treasure hunting (cap 25), viral reels, singing, dance battles & stand-up comedy',
    },
    {
      id: 'day_3' as const,
      dayNumber: 'Day 3',
      date: 'Dec 12, 2026',
      title: 'Grand Finale & Closing Ceremony',
      subtitle: 'Runway fashion ramp walk, dignitary felicitations, and open-air mega EDM DJ Night',
    },
    {
      id: 'tbd' as const,
      dayNumber: 'TBD',
      date: 'Schedule TBA',
      title: 'Special Competition Lineup',
      subtitle: 'Official confirmed competitions with specific timings to be notified shortly',
    },
  ];

  const currentDayEvents = events.filter((e) => e.event_day === activeTab);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#07152F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2345] border border-[#F5C451]/30 text-xs font-semibold text-[#F5C451] uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Festival Timeline</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Official <span className="gold-gradient-text">Three-Day Programme</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            December 10, 11 and 12, 2026 • YBN University Campus, Ranchi, Jharkhand
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {scheduleDays.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveTab(d.id)}
              className={`p-4 rounded-xl text-left border transition-all ${
                activeTab === d.id
                  ? 'bg-gradient-to-r from-[#F5C451] to-[#D4A017] text-[#07152F] border-[#F5C451] shadow-gold-glow'
                  : 'bg-[#0D2345] text-slate-300 border-slate-700/80 hover:border-[#F5C451]/40'
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-90">
                {d.dayNumber} • {d.date}
              </div>
              <div className="text-sm font-extrabold truncate mt-0.5">
                {d.title}
              </div>
            </button>
          ))}
        </div>

        {/* Day Title Ribbon */}
        {(() => {
          const selectedMeta = scheduleDays.find((d) => d.id === activeTab)!;
          return (
            <div className="p-5 rounded-2xl bg-[#0D2345] border border-[#F5C451]/20 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5C451]">
                  {selectedMeta.dayNumber} • {selectedMeta.date}
                </span>
                <h2 className="font-display font-extrabold text-white text-xl sm:text-2xl mt-0.5">
                  {selectedMeta.title}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  {selectedMeta.subtitle}
                </p>
              </div>

              <Link
                to="/register"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] to-[#F5C451] hover:brightness-110 shadow-sm"
              >
                <span>Register for Events (₹0)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })()}

        {/* Timeline Events List */}
        <div className="space-y-4">
          {currentDayEvents.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#0D2345]/50 border border-slate-800 text-slate-400 text-sm">
              No events scheduled for this tab.
            </div>
          ) : (
            currentDayEvents.map((evt, idx) => (
              <div
                key={evt.id}
                className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0D2345] via-[#091B38] to-[#07152F] border border-slate-700/80 hover:border-[#F5C451]/50 shadow-card-elevated transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                {/* Left Block: Time & Title */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#07152F] text-[#F5C451] font-semibold border border-[#F5C451]/30">
                      <Clock className="w-3.5 h-3.5 text-[#F5C451]" />
                      <span>{evt.timing_display}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#07152F] text-slate-300 border border-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{evt.venue}</span>
                    </span>

                    {evt.eligible_participant_types === 'all' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        Open to All Colleges
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/30">
                        YBN Internal Only
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-white text-lg sm:text-xl group-hover:text-[#F5C451] transition-colors">
                    {evt.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="text-xs text-slate-400 pt-1 flex flex-wrap items-center gap-3">
                    <span>
                      Student Coord: <strong className="text-slate-200">{evt.student_coordinator}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Faculty: <strong className="text-slate-200">{evt.faculty_coordinator}</strong>
                    </span>
                    {evt.capacity && (
                      <>
                        <span>•</span>
                        <span className="text-[#F5C451] font-semibold">
                          Max Cap: {evt.capacity} {evt.capacity_unit}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveModalEvent(evt)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-[#07152F] hover:bg-[#112C57] border border-slate-700 hover:border-slate-500 transition-colors flex items-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Rules</span>
                  </button>

                  {evt.registration_open ? (
                    <Link
                      to={`/register?event=${evt.slug}`}
                      className="px-5 py-2 rounded-lg text-xs font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] to-[#F5C451] hover:brightness-110 shadow-sm transition-all"
                    >
                      Register Pass (₹0)
                    </Link>
                  ) : (
                    <span className="px-3 py-2 rounded-lg text-xs text-slate-400 bg-slate-800/60 border border-slate-700">
                      Entry Closed
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Modal */}
      <EventDetailModal
        event={activeModalEvent}
        registeredCount={activeModalEvent ? registrationStore.getRegistrationCount(activeModalEvent.id) : 0}
        onClose={() => setActiveModalEvent(null)}
      />
    </div>
  );
};
