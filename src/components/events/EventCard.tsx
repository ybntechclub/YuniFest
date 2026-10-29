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
    <div className="rounded-[28px] border-[1.5px] border-slate-900 bg-white p-7 shadow-sm hover:shadow-solid-pop hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group text-slate-950">
      <div>
        {/* Top Meta Badges */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#2B59FF] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
            [ {event.category} ]
          </span>

          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
            {event.eligible_participant_types === 'all' ? (
              <span className="px-2.5 py-0.5 rounded-full bg-[#E0E7FF] text-[#2B59FF] border border-blue-300">
                ALL COLLEGES
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900">
                YBN ONLY
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
              {dayLabels[event.event_day]}
            </span>
          </div>
        </div>

        {/* Header with Icon */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 flex items-center justify-center text-slate-950 shrink-0 group-hover:scale-110 group-hover:bg-[#FEF08A] transition-all shadow-sm">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-headline font-bold text-xl text-slate-950 group-hover:text-[#2B59FF] transition-colors leading-tight">
              {event.name}
            </h3>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#2B59FF]" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="font-display text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Capacity Strip */}
        <div className="p-3 rounded-xl bg-[#F6F7F9] border border-slate-300 font-mono text-xs flex items-center justify-between mb-4">
          <span className="text-slate-500 font-bold">SLOTS &amp; QUOTA:</span>
          {event.capacity ? (
            <span className={`font-bold ${isFull ? 'text-red-600' : 'text-[#2B59FF]'}`}>
              {registeredCount} / {event.capacity} {event.capacity_unit.toUpperCase()}
              {event.slug === 'treasure-hunting' && ' [CAP: 25]'}
            </span>
          ) : (
            <span className="text-emerald-700 font-bold">OPEN REGISTRATION</span>
          )}
        </div>

        {/* Coordinators Quick Footnote */}
        <div className="text-[11px] font-mono text-slate-500 mb-6 flex flex-col gap-0.5">
          <div><strong className="text-slate-800">Student:</strong> {event.student_coordinator}</div>
          <div><strong className="text-slate-800">Faculty:</strong> {event.faculty_coordinator}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onOpenDetails(event)}
          className="text-xs font-display font-bold text-slate-700 hover:text-slate-950 uppercase tracking-wider"
        >
          View Rules &amp; Info
        </button>

        <Link
          to={`/register?event=${event.slug}`}
          className={`px-5 py-2 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all border-[1.5px] border-slate-900 shadow-sm flex items-center gap-1.5 ${
            isFull
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300 pointer-events-none'
              : 'bg-slate-950 text-white hover:bg-[#2B59FF] hover:border-slate-950'
          }`}
        >
          <span>{isFull ? 'FULL' : 'REGISTER'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
