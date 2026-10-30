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
    <div className="min-h-screen pt-28 pb-20 bg-[#F6F7F9] text-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[1.5px] border-slate-900 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#2B59FF]" />
            <span>Festival Timeline</span>
            <span className="text-slate-500">•</span>
            <span className="text-[#2B59FF] font-bold">Dec 10 - 12, 2026</span>
          </div>
          <h1 className="font-headline font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight mb-4">
            OFFICIAL{' '}
            <span className="font-editorial italic font-normal text-[#2B59FF] tracking-normal block sm:inline text-[1.05em]">
              Three-Day Programme
            </span>
          </h1>
          <p className="font-display text-slate-600 text-sm sm:text-base leading-relaxed">
            December 10, 11 and 12, 2026 • <strong className="text-slate-900 font-editorial italic text-lg">YBN University Campus, Ranchi</strong>
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {scheduleDays.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveTab(d.id)}
              className={`p-5 rounded-[24px] border-[1.5px] border-slate-900 text-left transition-all ${
                activeTab === d.id
                  ? 'bg-[#FEF08A] text-slate-950 shadow-solid-pop -translate-y-1'
                  : 'bg-white text-slate-700 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <div className="text-[10px] font-mono uppercase font-bold tracking-wider opacity-80">
                {d.dayNumber} • {d.date}
              </div>
              <div className="font-headline font-black text-sm sm:text-base truncate mt-1 text-slate-950">
                {d.title}
              </div>
            </button>
          ))}
        </div>

        {/* Day Title Ribbon */}
        {(() => {
          const selectedMeta = scheduleDays.find((d) => d.id === activeTab)!;
          return (
            <div className="mb-8 p-6 sm:p-8 rounded-[28px] border-[1.5px] border-slate-900 bg-white shadow-solid-pop flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#2B59FF] uppercase tracking-wider">
                  {selectedMeta.date.toUpperCase()} PROGRAMME
                </span>
                <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-950 uppercase mt-0.5">
                  {selectedMeta.title}
                </h2>
                <p className="font-display text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  {selectedMeta.subtitle}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <Link
                  to="/register"
                  className="btn-voltage text-xs py-2.5 px-6"
                >
                  <span>CLAIM PASS (₹0)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })()}

        {/* Events Grid for Active Day */}
        {currentDayEvents.length === 0 ? (
          <div className="p-12 text-center rounded-[28px] bg-white border-[1.5px] border-slate-900 shadow-sm">
            <Info className="w-8 h-8 text-[#2B59FF] mx-auto mb-2" />
            <p className="font-headline font-bold text-slate-950 text-base">Schedule to be announced</p>
            <p className="text-xs text-slate-600 mt-1 font-display">
              Timings for this section are being finalized by the organizing committee.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDayEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-7 rounded-[28px] border-[1.5px] border-slate-900 bg-white shadow-sm hover:shadow-solid-pop hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2B59FF] border border-blue-200 uppercase">
                      {evt.category}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-slate-500">
                      {evt.eligible_participant_types === 'all' ? 'ALL COLLEGES' : 'YBN ONLY'}
                    </span>
                  </div>

                  <h3 className="font-headline font-bold text-xl text-slate-950 group-hover:text-[#2B59FF] transition-colors leading-snug mb-2">
                    {evt.name}
                  </h3>

                  <p className="font-display text-xs text-slate-600 leading-relaxed mb-4">
                    {evt.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between font-mono text-xs text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#2B59FF]" />
                      <span>{evt.timing_display}</span>
                    </span>
                    <span className="flex items-center gap-1.5 truncate max-w-[150px]">
                      <MapPin className="w-3.5 h-3.5 text-[#2B59FF] shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveModalEvent(evt)}
                      className="text-xs font-display font-bold text-slate-600 hover:text-slate-950 uppercase"
                    >
                      Rules &amp; Info
                    </button>

                    <Link
                      to={`/register?event=${evt.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-display font-black text-[#2B59FF] hover:underline"
                    >
                      <span>REGISTER</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal */}
      <EventDetailModal
        event={activeModalEvent}
        onClose={() => setActiveModalEvent(null)}
      />
    </div>
  );
};
