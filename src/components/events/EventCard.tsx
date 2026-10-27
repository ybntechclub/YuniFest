import React from 'react';
import { Link } from 'react-router-dom';
import { EventItem } from '../../types/database';
import { 
  Gamepad2, Cpu, Palette, Scissors, Utensils, Compass, Music, Mic2, 
  Video, Smile, Sparkles, Crown, Award, Radio, HelpCircle, FileImage,
  MapPin, ArrowUpRight
} from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  onOpenDetails: (event: EventItem) => void;
  registeredCount?: number;
}

const iconMap: Record<string, React.ElementType> = {
  Gamepad2,
  Cpu,
  Palette,
  Scissors,
  Utensils,
  Compass,
  Music,
  Mic2,
  Video,
  Smile,
  Sparkles,
  Crown,
  Award,
  Radio,
  HelpCircle,
  FileImage,
};

export const EventCard: React.FC<EventCardProps> = ({ event, onOpenDetails, registeredCount = 0 }) => {
  const IconComponent = iconMap[event.icon_name] || Award;
  const isFull = event.capacity !== null && registeredCount >= event.capacity;

  const dayLabels: Record<string, string> = {
    day_1: "DAY 01",
    day_2: "DAY 02",
    day_3: "DAY 03",
    tbd: "DATE TBA",
  };

  return (
    <div className="mdnt-card crosshair-corner p-7 rounded-3xl flex flex-col justify-between group">
      <div>
        {/* Top Meta Badges */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#F5C451]">
            [ {event.category} ]
          </span>

          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
            {event.eligible_participant_types === 'all' ? (
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                ALL COLLEGES
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30">
                YBN ONLY
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
              {dayLabels[event.event_day]}
            </span>
          </div>
        </div>

        {/* Header with Icon */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#F5C451] shrink-0 group-hover:scale-110 group-hover:border-[#F5C451] transition-all">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-headline font-bold text-xl text-white group-hover:text-[#F5C451] transition-colors leading-tight">
              {event.name}
            </h3>
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#F5C451]" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="font-display text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Capacity Strip */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs flex items-center justify-between mb-4">
          <span className="text-slate-400">SLOTS & QUOTA:</span>
          {event.capacity ? (
            <span className={`font-bold ${isFull ? 'text-red-400' : 'text-[#F5C451]'}`}>
              {registeredCount} / {event.capacity} {event.capacity_unit.toUpperCase()}
              {event.slug === 'treasure-hunting' && ' [STRICT CAP: 25]'}
            </span>
          ) : (
            <span className="text-slate-300">OPEN ENTRY</span>
          )}
        </div>

        {/* Coordinators */}
        <div className="font-mono text-[11px] text-slate-400 space-y-1 mb-6 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="truncate">Student: <strong className="text-slate-200">{event.student_coordinator}</strong></div>
          <div className="truncate">Faculty: <strong className="text-slate-200">{event.faculty_coordinator}</strong></div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-white/10 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onOpenDetails(event)}
          className="flex-1 py-2.5 px-3 rounded-full text-xs font-mono font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          DETAILS
        </button>

        {event.registration_open ? (
          isFull ? (
            <button
              disabled
              className="flex-1 py-2.5 px-3 rounded-full text-xs font-mono font-bold text-slate-500 bg-white/5 border border-white/5 cursor-not-allowed"
            >
              CAPPED FULL
            </button>
          ) : (
            <Link
              to={`/register?event=${event.slug}`}
              className="flex-1 btn-voltage text-xs py-2.5 px-3 text-center"
            >
              PASS (₹0)
            </Link>
          )
        ) : (
          <span className="flex-1 text-center py-2.5 font-mono text-xs text-slate-500 bg-white/5 rounded-full">
            CLOSED
          </span>
        )}
      </div>
    </div>
  );
};
