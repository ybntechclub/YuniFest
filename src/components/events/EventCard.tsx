import React from 'react';
import { Link } from 'react-router-dom';
import { EventItem } from '../../types/database';
import { 
  Gamepad2, Cpu, Palette, Scissors, Utensils, Compass, Music, Mic2, 
  Video, Smile, Sparkles, Crown, Award, Radio, HelpCircle, FileImage,
  Calendar, MapPin, Users, ArrowRight, ShieldCheck, Info
} from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  onOpenDetails: (event: EventItem) => void;
  registeredCount?: number;
}

// Icon mapper for dynamic string icon_name
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
    day_1: "Day 1 (Dec 10)",
    day_2: "Day 2 (Dec 11)",
    day_3: "Day 3 (Dec 12)",
    tbd: "Date TBA",
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#0D2345]/90 to-[#07152F]/95 border border-slate-700/80 hover:border-[#F5C451]/50 shadow-card-elevated hover:shadow-gold-glow/20 transition-all duration-300 p-6 group">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#07152F] text-slate-300 border border-slate-700">
            {event.category}
          </span>

          <div className="flex items-center gap-1.5">
            {event.eligible_participant_types === 'all' ? (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                All Colleges
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">
                YBN Only
              </span>
            )}
            
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#112C57] text-[#F5C451] border border-[#F5C451]/20">
              {dayLabels[event.event_day] || event.event_day}
            </span>
          </div>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#112C57] to-[#07152F] border border-[#F5C451]/30 flex items-center justify-center text-[#F5C451] shrink-0 group-hover:scale-105 group-hover:border-[#F5C451] transition-all">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg group-hover:text-[#F5C451] transition-colors leading-snug">
              {event.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#F5C451]" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Capacity / Status Indicator */}
        <div className="mb-4 p-2.5 rounded-lg bg-[#07152F]/70 border border-slate-800 text-xs flex items-center justify-between">
          <span className="text-slate-400">Capacity & Slots:</span>
          {event.capacity ? (
            <span className={`font-semibold ${isFull ? 'text-red-400' : 'text-[#F5C451]'}`}>
              {registeredCount} / {event.capacity} {event.capacity_unit}
              {event.slug === 'treasure-hunting' && ' (Strict Cap 25)'}
            </span>
          ) : (
            <span className="text-slate-300 font-medium">Open Attendance</span>
          )}
        </div>

        {/* Coordinators Verbatim */}
        <div className="text-[11px] text-slate-400 space-y-1 mb-5 p-2.5 rounded-lg bg-[#07152F]/40 border border-slate-800/60">
          <div>
            <span className="text-slate-400">Student Coord: </span>
            <strong className="text-slate-200">{event.student_coordinator}</strong>
          </div>
          <div>
            <span className="text-slate-400">Faculty Coord: </span>
            <strong className="text-slate-200">{event.faculty_coordinator}</strong>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onOpenDetails(event)}
          className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-slate-300 bg-[#07152F] hover:bg-[#112C57] border border-slate-700 hover:border-slate-500 transition-colors flex items-center justify-center gap-1.5"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Rules</span>
        </button>

        {event.registration_open ? (
          isFull ? (
            <button
              disabled
              className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 cursor-not-allowed"
            >
              Capped Full
            </button>
          ) : (
            <Link
              to={`/register?event=${event.slug}`}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] to-[#F5C451] hover:brightness-110 shadow-sm transition-all flex items-center justify-center gap-1"
            >
              <span>Register</span>
              <span className="text-[10px] font-black uppercase bg-[#07152F] text-[#F5C451] px-1 py-0.2 rounded">
                ₹0
              </span>
            </Link>
          )
        ) : (
          <span className="flex-1 text-center py-2 text-xs text-slate-400 bg-slate-800/50 rounded-lg">
            Registration Closed
          </span>
        )}
      </div>
    </div>
  );
};
