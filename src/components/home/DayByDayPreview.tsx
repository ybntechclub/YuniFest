import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { RollText } from '../ui/RollText';

export const DayByDayPreview: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'day_1' | 'day_2' | 'day_3'>('day_1');

  const daysData = {
    day_1: {
      dayNum: "01",
      date: "DECEMBER 10, 2026",
      headline: "TECHNICAL & INNOVATION DAY",
      tagline: "Engineering Prototypes, Battle Royale Esports & Creative Masterclasses",
      events: [
        {
          name: "Gaming Tournament (Free Fire & BGMI)",
          category: "ESPORTS",
          venue: "Main Auditorium / Lab 1",
          eligibility: "Open to All Colleges",
          isOutside: true,
          tagColor: "bg-[#2B59FF] text-white",
          desc: "High-octane mobile battle royale showdown in BGMI and Free Fire Max on dedicated LAN.",
        },
        {
          name: "Model Presentation Competition",
          category: "INNOVATION",
          venue: "YBN Innovation Gallery",
          eligibility: "YBN Students Only",
          isOutside: false,
          tagColor: "bg-[#FEF08A] text-slate-950",
          desc: "Working and static prototypes addressing agriculture, clean energy & robotics.",
        },
        {
          name: "Face Painting Competition",
          category: "CREATIVE",
          venue: "Central Courtyard Area",
          eligibility: "YBN Students Only",
          isOutside: false,
          tagColor: "bg-[#FCE7F3] text-pink-900",
          desc: "60-minute live expressive painting challenge with themes revealed on stage.",
        },
        {
          name: "Creative Craft Workshop",
          category: "WORKSHOP",
          venue: "Design Studio, Block B",
          eligibility: "YBN Students Only",
          isOutside: false,
          tagColor: "bg-[#EDE9FE] text-purple-900",
          desc: "Sustainable craft prototyping and indigenous upcycling design masterclass.",
        },
        {
          name: "Food Fest & Flea Market",
          category: "CAMPUS LIFE",
          venue: "Main Campus Grounds",
          eligibility: "Open Access",
          isOutside: true,
          tagColor: "bg-[#D1FAE5] text-emerald-950",
          desc: "Culinary stalls, regional flavours, artisan exhibitions, and student crafts.",
        },
      ]
    },
    day_2: {
      dayNum: "02",
      date: "DECEMBER 11, 2026",
      headline: "CULTURAL SHOWCASE & CREATIVE COMPETITIONS",
      tagline: "High-Stakes Campus Clues, Viral Reels, Melodies & Dance Showdowns",
      events: [
        {
          name: "Treasure Hunting",
          category: "CAMPUS ADVENTURE",
          venue: "Entire Campus Grounds",
          eligibility: "All Colleges (Cap: 25 Teams)",
          isOutside: true,
          highlight: "STRICT CAP: 25 TEAMS",
          tagColor: "bg-[#FEF08A] text-slate-950",
          desc: "Cryptic puzzle race across campus checkpoints. Strictly capped on first-come basis.",
        },
        {
          name: "Dance Competition (Solo, Duo & Group)",
          category: "PERFORMING ARTS",
          venue: "Main University Amphitheatre",
          eligibility: "Open to All Colleges",
          isOutside: true,
          tagColor: "bg-[#2B59FF] text-white",
          desc: "Classical, folk, contemporary and hip-hop stage showdowns with high production.",
        },
        {
          name: "Singing Competition",
          category: "VOCAL ARTS",
          venue: "Auditorium Stage 1",
          eligibility: "Open to All Colleges",
          isOutside: true,
          tagColor: "bg-[#FCE7F3] text-pink-900",
          desc: "Eastern classical, Bollywood melodies, folk, and Western acoustic vocals.",
        },
        {
          name: "Reel Competition",
          category: "DIGITAL MEDIA",
          venue: "Digital Submission Desk",
          eligibility: "Open to All Colleges",
          isOutside: true,
          tagColor: "bg-[#EDE9FE] text-purple-900",
          desc: "30-60 second cinematic reels capturing the pulse and adrenaline of YUNIFEST.",
        },
        {
          name: "Mimicry Competition",
          category: "THEATRE",
          venue: "Amphitheatre Stage",
          eligibility: "Open to All Colleges",
          isOutside: true,
          tagColor: "bg-[#D1FAE5] text-emerald-950",
          desc: "Observational impressions, character comedy, voice modulations, and stage acts.",
        },
        {
          name: "Stand-up Comedy",
          category: "COMEDY",
          venue: "Amphitheatre Stage",
          eligibility: "Open to All Colleges",
          isOutside: true,
          tagColor: "bg-[#FEF08A] text-slate-950",
          desc: "Solo original comic sets and punchlines before a high-spirited college audience.",
        },
        {
          name: "Rangoli Competition",
          category: "TRADITIONAL ARTS",
          venue: "Administrative Block Foyer",
          eligibility: "YBN Students Only",
          isOutside: false,
          tagColor: "bg-[#FCE7F3] text-pink-900",
          desc: "Intricate folk sand designs, mandala patterns, and geometric floor art.",
        },
      ]
    },
    day_3: {
      dayNum: "03",
      date: "DECEMBER 12, 2026",
      headline: "GRAND FINALE & CLOSING CEREMONY",
      tagline: "Haute Couture Ramp Walk, University Honors & Open-Air Mega EDM DJ Night",
      events: [
        {
          name: "Ramp Walk / Fashion Show",
          category: "GRAND RUNWAY",
          venue: "Grand Open-Air Main Stage",
          eligibility: "YBN Students (Audition Cleared)",
          isOutside: false,
          tagColor: "bg-[#2B59FF] text-white",
          desc: "High-fashion sequence showcasing ethnic heritage, avant-garde and modern couture.",
        },
        {
          name: "Closing Ceremony & Prize Distribution",
          category: "HONOR ROLL",
          venue: "Grand Main Stage Arena",
          eligibility: "Open to All Attendees",
          isOutside: true,
          tagColor: "bg-[#FEF08A] text-slate-950",
          desc: "Official university felicitation, mementoes, awards, and jury honor rolls.",
        },
        {
          name: "Mega EDM DJ Night & Celebration",
          category: "CONCERT",
          venue: "University Festival Arena Grounds",
          eligibility: "All Valid ID / Pass Holders",
          isOutside: true,
          tagColor: "bg-slate-950 text-white",
          desc: "Electrifying open-air laser EDM live concert closing YUNIFEST 2026 with immense energy.",
        },
      ]
    }
  };

  const current = daysData[activeDay];

  return (
    <section className="py-20 sm:py-28 bg-[#F6F7F9] relative border-t-[1.5px] border-slate-900/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-[1.5px] border-slate-900 font-mono text-xs font-bold text-slate-900 mb-3 shadow-sm">
              <span>[ 02 // THREE-DAY ITINERARY ]</span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-5xl text-slate-950 uppercase tracking-tight">
              DAY-BY-DAY <span className="text-[#2B59FF]">PROGRAMME LINEUP</span>
            </h2>
            <p className="font-display text-slate-600 text-sm mt-3 leading-relaxed max-w-xl">
              From Day 1 technical prototypes to Day 3 high-fashion runways and open-air EDM DJ Night.
            </p>
          </div>

          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-slate-950 hover:text-[#2B59FF] transition-colors group shrink-0"
          >
            <RollText text="VIEW FULL TIMELINE SCHEDULE" highlightColor="text-[#2B59FF]" />
            <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Minimalist Day Tab Switchers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {(['day_1', 'day_2', 'day_3'] as const).map((dayKey) => {
            const d = daysData[dayKey];
            const isSelected = activeDay === dayKey;
            return (
              <button
                key={dayKey}
                type="button"
                onClick={() => setActiveDay(dayKey)}
                className={`p-6 rounded-3xl border-[1.5px] border-slate-900 text-left transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#FEF08A] text-slate-950 shadow-solid-pop -translate-y-1'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs font-bold mb-2">
                  <span>DAY {d.dayNum}</span>
                  <span className={isSelected ? 'text-slate-950' : 'text-slate-400'}>{d.date}</span>
                </div>
                <div className="font-headline font-black text-lg sm:text-xl uppercase tracking-tight text-slate-950">
                  {d.headline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Day Itinerary Grid */}
        <div className="rounded-[32px] border-[1.5px] border-slate-900 bg-white p-6 sm:p-10 shadow-solid-pop mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-8 border-b-[1.5px] border-slate-900/10">
            <div>
              <span className="font-mono text-xs font-bold text-[#2B59FF] uppercase tracking-wider">
                DAY {current.dayNum} // {current.date}
              </span>
              <h3 className="font-headline font-black text-2xl sm:text-3xl text-slate-950 uppercase mt-1">
                {current.headline}
              </h3>
            </div>
            <p className="font-display text-xs sm:text-sm text-slate-600 max-w-sm">
              {current.tagline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {current.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border-[1.5px] border-slate-900 bg-[#F6F7F9] hover:bg-white transition-all hover:shadow-solid-pop flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-900 ${evt.tagColor}`}>
                      {evt.category}
                    </span>

                    <span className="font-mono text-[10px] font-bold text-slate-500">
                      {evt.isOutside ? 'ALL COLLEGES' : 'YBN ONLY'}
                    </span>
                  </div>

                  <h4 className="font-headline font-bold text-lg text-slate-950 group-hover:text-[#2B59FF] transition-colors leading-snug mb-2">
                    {evt.name}
                  </h4>

                  <p className="font-display text-xs text-slate-600 leading-relaxed mb-4">
                    {evt.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-300 flex items-center justify-between font-mono text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#2B59FF] shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                  <Link
                    to="/register"
                    className="text-[#2B59FF] font-bold hover:underline shrink-0 ml-2"
                  >
                    PASS →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
