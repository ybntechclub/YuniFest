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
    <div className="bg-[#0D2345]/80 border border-slate-700/80 rounded-2xl p-5 mb-8 shadow-card-elevated">
      {/* Top Search & Reset Row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-5">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events, competitions, games, or coordinators..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#07152F] border border-slate-700 focus:border-[#F5C451] focus:outline-none text-white text-xs sm:text-sm placeholder:text-slate-400"
          />
        </div>

        {/* Counter & Clear Button */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          <span className="text-slate-300">
            Showing <strong className="text-[#F5C451]">{totalFiltered}</strong> events
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07152F] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#F5C451]" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

      </div>

      {/* Filter Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Eligibility Filter */}
        <div>
          <label className="block text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">
            Participant Eligibility
          </label>
          <select
            value={selectedEligibility}
            onChange={(e) => onEligibilityChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-xs sm:text-sm text-slate-200 focus:outline-none"
          >
            <option value="all">All Eligibility Types</option>
            <option value="outside_eligible">Open to Other College Students</option>
            <option value="ybn_only">YBN University Students Only</option>
          </select>
        </div>

        {/* Day Filter */}
        <div>
          <label className="block text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">
            Programme Day
          </label>
          <select
            value={selectedDay}
            onChange={(e) => onDayChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-xs sm:text-sm text-slate-200 focus:outline-none"
          >
            <option value="all">All Days (Dec 10-12 & TBA)</option>
            <option value="day_1">Day 1 — Dec 10 (Tech & Innovation)</option>
            <option value="day_2">Day 2 — Dec 11 (Cultural & Showcases)</option>
            <option value="day_3">Day 3 — Dec 12 (Finale & DJ Night)</option>
            <option value="tbd">Schedule to be announced</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">
            Event Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-xs sm:text-sm text-slate-200 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="gaming">Gaming & Esports</option>
            <option value="technical">Technical & Innovation</option>
            <option value="cultural">Cultural & Performing Arts</option>
            <option value="creative">Creative & Fine Arts</option>
            <option value="competition">Quizzes & Competitions</option>
            <option value="special">Special Showcases & DJ</option>
          </select>
        </div>

      </div>
    </div>
  );
};
