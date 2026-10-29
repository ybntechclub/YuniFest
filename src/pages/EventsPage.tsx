import React, { useState, useEffect, useMemo } from 'react';
import { EventItem } from '../types/database';
import { registrationStore } from '../lib/registrationStore';
import { EventCard } from '../components/events/EventCard';
import { EventFilter } from '../components/events/EventFilter';
import { EventDetailModal } from '../components/events/EventDetailModal';
import { Sparkles, Calendar, Layers, ShieldCheck, Flame } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEligibility, setSelectedEligibility] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal State
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      const data = await registrationStore.getEvents();
      setEvents(data);
      setIsLoading(false);
    };
    loadEvents();
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedEligibility('all');
    setSelectedDay('all');
    setSelectedCategory('all');
  };

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        evt.name.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.student_coordinator.toLowerCase().includes(q) ||
        evt.faculty_coordinator.toLowerCase().includes(q);

      // Eligibility
      let matchEligibility = true;
      if (selectedEligibility === 'outside_eligible') {
        matchEligibility = evt.eligible_participant_types === 'all' || evt.eligible_participant_types === 'outside_only';
      } else if (selectedEligibility === 'ybn_only') {
        matchEligibility = evt.eligible_participant_types === 'ybn_only';
      }

      // Day
      const matchDay = selectedDay === 'all' || evt.event_day === selectedDay;

      // Category
      const matchCategory = selectedCategory === 'all' || evt.category === selectedCategory;

      return matchSearch && matchEligibility && matchDay && matchCategory;
    });
  }, [events, searchQuery, selectedEligibility, selectedDay, selectedCategory]);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F6F7F9] text-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[1.5px] border-slate-900 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-[#2B59FF]" />
            <span>Event Catalogue</span>
          </div>
          <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-slate-950 uppercase tracking-tight mb-4">
            Competitions, Workshops &amp; <span className="text-[#2B59FF]">Showcases</span>
          </h1>
          <p className="font-display text-slate-600 text-sm sm:text-base leading-relaxed">
            Explore 15+ official events across technology, culture, creative arts, and esports. Filter by day or eligibility to claim your registration pass.
          </p>
        </div>

        {/* Filters */}
        <EventFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedEligibility={selectedEligibility}
          onEligibilityChange={setSelectedEligibility}
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onReset={handleResetFilters}
          totalFiltered={filteredEvents.length}
        />

        {/* Events Grid */}
        {isLoading ? (
          <div className="py-24 text-center font-mono text-xs text-slate-500">
            <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span>Loading festival competitions catalog...</span>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-16 text-center rounded-[32px] bg-white border-[1.5px] border-slate-900 shadow-sm max-w-md mx-auto p-8">
            <p className="font-headline font-bold text-lg text-slate-950 mb-2">No matching events found</p>
            <p className="text-xs text-slate-600 mb-6 font-display">
              Try adjusting your search keywords or resetting your filter options.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn-voltage text-xs py-2.5 px-6"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                onOpenDetails={(e) => setActiveModalEvent(e)}
                registeredCount={registrationStore.getRegistrationCount(evt.id)}
              />
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
