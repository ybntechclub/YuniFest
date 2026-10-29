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
    <div className="space-y-6 mb-8 text-slate-950">
      
      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Registrations */}
        <div className="p-6 rounded-[28px] bg-white border-[1.5px] border-slate-900 shadow-sm hover:shadow-solid-pop transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">Total Entries</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2B59FF] border border-blue-200 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-950 font-headline">
            {total}
          </div>
          <p className="text-[11px] text-[#2B59FF] font-bold mt-1">
            Official Festival Passes Issued
          </p>
        </div>

        {/* Card 2: Participant Type Distribution */}
        <div className="p-6 rounded-[28px] bg-white border-[1.5px] border-slate-900 shadow-sm hover:shadow-solid-pop transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">Participant Split</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-2xl font-black text-slate-950 font-headline">
            <div>
              <span className="text-[10px] font-mono text-slate-500 block font-normal">YBN</span>
              <span>{ybnCount}</span>
            </div>
            <span className="text-slate-300">/</span>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block font-normal">Visiting</span>
              <span className="text-[#2B59FF]">{outsideCount}</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-1">
            Internal vs External ratio
          </p>
        </div>

        {/* Card 3: Status Tracking */}
        <div className="p-6 rounded-[28px] bg-white border-[1.5px] border-slate-900 shadow-sm hover:shadow-solid-pop transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">Verification Status</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-2xl font-black text-slate-950 font-headline">
            <div>
              <span className="text-[10px] font-mono text-emerald-700 block font-normal">Confirmed</span>
              <span>{confirmedCount}</span>
            </div>
            <span className="text-slate-300">/</span>
            <div>
              <span className="text-[10px] font-mono text-amber-700 block font-normal">Pending</span>
              <span>{pendingCount}</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-1">
            Pre-verified for check-in gates
          </p>
        </div>

        {/* Card 4: Treasure Hunting Quota Tracker */}
        <div className="p-6 rounded-[28px] bg-[#FEF08A] border-[1.5px] border-slate-900 shadow-solid-pop">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Treasure Hunt Cap</span>
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-900 text-slate-950 flex items-center justify-center font-bold">
              <Flame className="w-4 h-4 text-[#2B59FF]" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-950 font-headline">
              {treasureHuntingCount}
            </span>
            <span className="text-xs font-mono font-bold text-slate-700">
              / {treasureMaxCapacity} TEAMS
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/70 border border-slate-900 h-2.5 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full transition-all duration-500 ${
                treasurePercent >= 90 ? 'bg-red-600' : 'bg-slate-950'
              }`}
              style={{ width: `${treasurePercent}%` }}
            />
          </div>
          <p className="text-[10px] font-mono font-bold text-slate-800 mt-1.5 flex justify-between">
            <span>{treasurePercent}% Capacity</span>
            <span>{Math.max(0, treasureMaxCapacity - treasureHuntingCount)} slots left</span>
          </p>
        </div>

      </div>

    </div>
  );
};
