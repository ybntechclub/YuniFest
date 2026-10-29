import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { EventCategory, EventDay, EligibilityType } from '../../types/database';

interface EventFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedEligibility: string;
  onEligibilityChange: (val: string) => void;
  selectedDay: string;
  onDayChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  onReset: () => void;
  totalFiltered: number;
}

export const EventFilter: React.FC<EventFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedEligibility,
  onEligibilityChange,
  selectedDay,
  onDayChange,
  selectedCategory,
  onCategoryChange,
  onReset,
  totalFiltered
}) => {
  const isFiltered = searchQuery !== '' || selectedEligibility !== 'all' || selectedDay !== 'all' || selectedCategory !== 'all';

  return (
    <div className="bg-white border-[1.5px] border-slate-900 rounded-[28px] p-6 mb-8 shadow-solid-pop text-slate-950">
      {/* Top Search & Reset Row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-5">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events, competitions, games, or coordinators..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F6F7F9] border-[1.5px] border-slate-900 focus:border-[#2B59FF] focus:outline-none text-slate-950 text-xs sm:text-sm placeholder:text-slate-500 font-medium"
          />
        </div>

        {/* Counter & Clear Button */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          <span className="font-mono text-slate-600 font-bold">
            Showing <strong className="text-[#2B59FF]">{totalFiltered}</strong> events
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEF08A] hover:bg-yellow-300 text-slate-950 font-display font-bold border border-slate-900 transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

      </div>

      {/* Filter Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Eligibility Filter */}
        <div>
          <label className="block text-[11px] uppercase font-mono font-bold tracking-wider text-slate-600 mb-1.5">
            Participant Eligibility
          </label>
          <select
            value={selectedEligibility}
            onChange={(e) => onEligibilityChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-bold focus:outline-none shadow-sm"
          >
            <option value="all">All Eligibility Types</option>
            <option value="outside_eligible">Open to Other College Students</option>
            <option value="ybn_only">YBN University Students Only</option>
          </select>
        </div>

        {/* Day Filter */}
        <div>
          <label className="block text-[11px] uppercase font-mono font-bold tracking-wider text-slate-600 mb-1.5">
            Programme Day
          </label>
          <select
            value={selectedDay}
            onChange={(e) => onDayChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-bold focus:outline-none shadow-sm"
          >
            <option value="all">All Days (Dec 10-12 &amp; TBA)</option>
            <option value="day_1">Day 1 — Dec 10 (Tech &amp; Innovation)</option>
            <option value="day_2">Day 2 — Dec 11 (Cultural &amp; Showcases)</option>
            <option value="day_3">Day 3 — Dec 12 (Finale &amp; DJ Night)</option>
            <option value="tbd">Schedule TBA (Quiz, Poster Making, etc.)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-[11px] uppercase font-mono font-bold tracking-wider text-slate-600 mb-1.5">
            Discipline Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-bold focus:outline-none shadow-sm"
          >
            <option value="all">All Disciplines (15+ Events)</option>
            <option value="technical">Technical &amp; Innovation</option>
            <option value="cultural">Performing Arts (Dance, Singing, Mimicry)</option>
            <option value="gaming">Esports &amp; Gaming (BGMI, Free Fire)</option>
            <option value="competition">Competitions &amp; Treasure Hunt</option>
            <option value="creative">Creative Arts &amp; Design</option>
            <option value="special">Grand Finale &amp; Special Showcases</option>
          </select>
        </div>

      </div>
    </div>
  );
};
