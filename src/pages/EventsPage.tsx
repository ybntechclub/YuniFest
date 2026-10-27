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
    <div className="min-h-screen pt-28 pb-20 bg-[#07152F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2345] border border-[#F5C451]/30 text-xs font-semibold text-[#F5C451] uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Event Catalogue</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Competitions, Workshops & <span className="gold-gradient-text">Showcases</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Explore 15+ official events across technology, culture, creative arts, and esports. Filter by day or eligibility to submit your registration pass.
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
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-[#F5C451] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400 text-sm">Loading festival events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-20 text-center p-8 rounded-2xl bg-[#0D2345]/50 border border-slate-800 max-w-md mx-auto">
            <Layers className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg mb-1">No Events Found</h3>
            <p className="text-slate-400 text-xs mb-4">
              No festival activities match your current search and filter combination.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-lg text-xs font-bold text-[#07152F] bg-[#F5C451] hover:bg-[#FDE047]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                registeredCount={registrationStore.getRegistrationCount(evt.id)}
                onOpenDetails={(item) => setActiveModalEvent(item)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Event Details Modal */}
      <EventDetailModal
        event={activeModalEvent}
        registeredCount={activeModalEvent ? registrationStore.getRegistrationCount(activeModalEvent.id) : 0}
        onClose={() => setActiveModalEvent(null)}
      />
    </div>
  );
};
