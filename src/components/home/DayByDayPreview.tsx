import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
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
          desc: "High-octane mobile battle royale showdown in BGMI and Free Fire Max.",
        },
        {
          name: "Model Presentation Competition",
          category: "INNOVATION",
          venue: "YBN Innovation Gallery",
          eligibility: "YBN Students Only",
          isOutside: false,
          desc: "Working and static prototypes addressing agriculture, clean energy & robotics.",
        },
        {
          name: "Face Painting Competition",
          category: "CREATIVE",
          venue: "Central Courtyard Area",
          eligibility: "YBN Students Only",
          isOutside: false,
          desc: "60-minute live expressive painting challenge with themes revealed on stage.",
        },
        {
          name: "Creative Craft Workshop",
          category: "WORKSHOP",
          venue: "Design Studio, Block B",
          eligibility: "YBN Students Only",
          isOutside: false,
          desc: "Sustainable craft prototyping and indigenous upcycling design masterclass.",
        },
        {
          name: "Food Fest & Flea Market",
          category: "CAMPUS LIFE",
          venue: "Main Campus Grounds",
          eligibility: "Open Access",
          isOutside: true,
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
          desc: "Cryptic puzzle race across campus checkpoints. Strictly capped on first-come basis.",
        },
        {
          name: "Dance Competition (Solo, Duo & Group)",
          category: "PERFORMING ARTS",
          venue: "Main University Amphitheatre",
          eligibility: "Open to All Colleges",
          isOutside: true,
          desc: "Classical, folk, contemporary and hip-hop stage showdowns with high production.",
        },
        {
          name: "Singing Competition",
          category: "VOCAL ARTS",
          venue: "Auditorium Stage 1",
          eligibility: "Open to All Colleges",
          isOutside: true,
          desc: "Eastern classical, Bollywood melodies, folk, and Western acoustic vocals.",
        },
        {
          name: "Reel Competition",
          category: "DIGITAL MEDIA",
          venue: "Digital Submission Desk",
          eligibility: "Open to All Colleges",
          isOutside: true,
          desc: "30-60 second cinematic reels capturing the pulse and adrenaline of YUNIFEST.",
        },
        {
          name: "Mimicry Competition",
          category: "THEATRE",
          venue: "Open Stage B",
          eligibility: "Open to All Colleges",
          isOutside: true,
          desc: "Voice impressions, satirical characterizations, and stage presence.",
        },
        {
          name: "Stand-up Comedy",
          category: "LIVE COMEDY",
          venue: "Open Stage B",
          eligibility: "Open to All Colleges",
          isOutside: true,
          desc: "Original observational humor, crisp comedic delivery, and punchline mastery.",
        },
      ]
    },
    day_3: {
      dayNum: "03",
      date: "DECEMBER 12, 2026",
      headline: "GRAND FINALE & CLOSING CEREMONY",
      tagline: "Haute Couture Runway, University Laurels & Mega EDM DJ Night",
      events: [
        {
          name: "Ramp Walk / Fashion Show",
          category: "RUNWAY COUTURE",
          venue: "Grand Stage Arena",
          eligibility: "YBN Students Only",
          isOutside: false,
          desc: "Haute couture sequences and cultural attire on the grand festival runway.",
        },
        {
          name: "Official Award Ceremony",
          category: "UNIVERSITY HONORS",
          venue: "Grand Stage Arena",
          eligibility: "All Attendees",
          isOutside: true,
          desc: "Conferment of championship trophies, medals, and official merit scrolls.",
        },
        {
          name: "Mega DJ Night Celebration",
          category: "FESTIVAL FINALE",
          venue: "Grand Open Stadium",
          eligibility: "All Registered Attendees",
          isOutside: true,
          desc: "High-octane open-air EDM and laser show celebration closing YUNIFEST 2026.",
        },
      ]
    }
  };

  const current = daysData[activeDay];

  return (
    <section className="py-24 bg-[#03060E] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] mb-3">
              [ 02 // THREE-DAY ITINERARY ]
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              THE FESTIVAL <span className="text-[#CCFF00]">LINEUP</span>
            </h2>
            <p className="font-display text-slate-400 text-sm mt-2">
              Explore the multi-track timeline curated across technical, cultural and grand finale disciplines.
            </p>
          </div>

          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 border border-white/20 text-white px-6 py-2.5 rounded-full font-headline text-xs font-bold uppercase tracking-wider transition-all self-start md:self-auto group"
          >
            <RollText text="VIEW FULL TIMELINE" highlightColor="text-[#CCFF00]" />
            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-[#CCFF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Day Switcher - MDNT Pill Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {(['day_1', 'day_2', 'day_3'] as const).map((key) => {
            const d = daysData[key];
            const isSelected = activeDay === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveDay(key)}
                className={`p-5 rounded-3xl text-left border transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#0E1528] border-[#CCFF00] shadow-[0_0_25px_rgba(204,255,0,0.12)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className={isSelected ? 'text-[#CCFF00] font-bold' : 'text-white/40'}>
                    [ DAY {d.dayNum} ]
                  </span>
                  <span className="text-[11px] text-white/40 font-mono">
                    {d.date.split(',')[0]}
                  </span>
                </div>
                <div className="font-headline font-bold text-lg text-white">
                  {d.headline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Day Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-white/[0.04] to-black border border-white/10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#CCFF00] font-bold uppercase tracking-widest block mb-1">
              [ DAY {current.dayNum} // {current.date} ]
            </span>
            <h3 className="font-headline font-extrabold text-2xl text-white">
              {current.headline}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {current.tagline}
            </p>
          </div>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-white text-black px-6 py-2.5 rounded-full font-headline text-xs font-black uppercase tracking-wider transition-all self-start md:self-auto shrink-0 group"
          >
            <RollText text="CLAIM PASS (₹0)" highlightColor="text-black" />
          </Link>
        </div>

        {/* Events Grid for Active Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {current.events.map((evt, i) => (
            <div
              key={i}
              className="mdnt-card crosshair-corner p-6 rounded-3xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {evt.category}
                  </span>

                  {evt.isOutside ? (
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      INTER-COLLEGE
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30">
                      YBN ONLY
                    </span>
                  )}
                </div>

                <h4 className="font-headline font-bold text-xl text-white group-hover:text-[#CCFF00] transition-colors mb-2">
                  {evt.name}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {evt.desc}
                </p>

                {('highlight' in evt) && (evt as any).highlight && (
                  <div className="mb-4 font-mono text-[11px] font-bold text-[#CCFF00] p-2 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/30">
                    {(evt as any).highlight}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                  <MapPin className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                  <span className="truncate">{evt.venue}</span>
                </div>
                <span className="text-[#CCFF00] font-bold shrink-0">
                  TBA
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
