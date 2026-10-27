import React from 'react';
import { RegistrationRecord, EventItem } from '../../types/database';
import { Users, GraduationCap, Building2, CheckCircle, Clock, AlertTriangle, Flame } from 'lucide-react';

interface StatsOverviewProps {
  registrations: RegistrationRecord[];
  events: EventItem[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ registrations, events }) => {
  const total = registrations.length;
  const ybnCount = registrations.filter(r => r.participant_type === 'ybn_student').length;
  const outsideCount = registrations.filter(r => r.participant_type === 'outside_student').length;
  
  const confirmedCount = registrations.filter(r => r.registration_status === 'confirmed').length;
  const pendingCount = registrations.filter(r => r.registration_status === 'pending').length;

  // Treasure Hunting tracking
  const treasureHuntingEvent = events.find(e => e.slug === 'treasure-hunting');
  const treasureHuntingCount = registrations.filter(
    r => r.event_id === treasureHuntingEvent?.id && r.registration_status !== 'rejected'
  ).length;
  const treasureMaxCapacity = treasureHuntingEvent?.capacity || 25;
  const treasurePercent = Math.min(100, Math.round((treasureHuntingCount / treasureMaxCapacity) * 100));

  return (
    <div className="space-y-6 mb-8">
      
      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Registrations */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0D2345] to-[#07152F] border border-[#F5C451]/30 shadow-card-elevated">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Entries</span>
            <div className="w-8 h-8 rounded-lg bg-[#F5C451]/15 text-[#F5C451] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-display">
            {total}
          </div>
          <p className="text-[11px] text-[#F5C451] font-semibold mt-1">
            Official Festival Passes Issued
          </p>
        </div>

        {/* Card 2: Participant Type Distribution */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0D2345] to-[#07152F] border border-cyan-500/30 shadow-card-elevated">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Participant Split</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-2xl font-bold text-white">
            <div>
              <span className="text-xs text-slate-400 block font-normal">YBN Students</span>
              <span>{ybnCount}</span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <span className="text-xs text-cyan-400 block font-normal">Visiting Colleges</span>
              <span className="text-cyan-300">{outsideCount}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Verification Status */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0D2345] to-[#07152F] border border-slate-700 shadow-card-elevated">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Status Overview</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-2xl font-bold text-white">
            <div>
              <span className="text-xs text-emerald-400 block font-normal">Confirmed</span>
              <span className="text-emerald-300">{confirmedCount}</span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <span className="text-xs text-amber-400 block font-normal">Pending Review</span>
              <span className="text-amber-300">{pendingCount}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Treasure Hunting Capacity (Strict 25 Cap) */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#180E04] via-[#2A1705] to-[#07152F] border border-[#F5C451]/50 shadow-card-elevated">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5C451] flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Treasure Hunt Cap</span>
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {treasureHuntingCount} / {treasureMaxCapacity}
            </span>
          </div>

          <div className="w-full bg-[#07152F] rounded-full h-2.5 mb-2 overflow-hidden border border-slate-700">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                treasurePercent >= 90 ? 'bg-red-500' : 'bg-gradient-to-r from-[#FDE047] to-[#F5C451]'
              }`}
              style={{ width: `${treasurePercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{treasureMaxCapacity - treasureHuntingCount} slots remaining</span>
            <span className="text-[#F5C451] font-semibold">{treasurePercent}% filled</span>
          </div>
        </div>

      </div>
    </div>
  );
};
