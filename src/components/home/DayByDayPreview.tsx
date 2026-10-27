import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, ShieldCheck, Gamepad2, Compass, Music, Crown, Radio, Sparkles } from 'lucide-react';

export const DayByDayPreview: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'day_1' | 'day_2' | 'day_3'>('day_1');

  const daysData = {
    day_1: {
      title: "Day 1 — Technical & Innovation Day",
      date: "Thursday, December 10, 2026",
      theme: "Engineering, Digital Esports & Creative Crafts",
      events: [
        {
          name: "Gaming Tournament (Free Fire & BGMI)",
          category: "Gaming Esports",
          venue: "Main Auditorium / Lab 1",
          eligibility: "Open to YBN & Outside Colleges",
          isOutsideEligible: true,
          desc: "High-octane mobile esports battle royale in BGMI and Free Fire.",
        },
        {
          name: "Model Presentation Competition",
          category: "Technical Innovation",
          venue: "YBN Innovation Gallery",
          eligibility: "YBN University Students Only",
          isOutsideEligible: false,
          desc: "Working and static model exhibition addressing modern challenges.",
        },
        {
          name: "Face Painting Competition",
          category: "Creative Expression",
          venue: "Central Courtyard Area",
          eligibility: "YBN University Students Only",
          isOutsideEligible: false,
          desc: "Artistic expression with themes revealed 15 minutes before launch.",
        },
        {
          name: "Creative Craft Workshop",
          category: "Hands-on Masterclass",
          venue: "Design Studio, Block B",
          eligibility: "YBN University Students Only",
          isOutsideEligible: false,
          desc: "Sustainable craft prototyping and indigenous art design.",
        },
        {
          name: "Food Fest & Flea Market",
          category: "Campus Life Showcase",
          venue: "Main Campus Grounds",
          eligibility: "All Festival Attendees",
          isOutsideEligible: true,
          desc: "Culinary stalls, regional flavours, and artisan student displays.",
        },
      ]
    },
    day_2: {
      title: "Day 2 — Cultural Showcase & Creative Competitions",
      date: "Friday, December 11, 2026",
      theme: "Theatrics, Melodies, Rhythm & Campus Adventure",
      events: [
        {
          name: "Treasure Hunting",
          category: "Adventure Hunt",
          venue: "Entire University Campus",
          eligibility: "Open to All (Strict Cap: 25 Teams)",
          isOutsideEligible: true,
          badge: "Cap: 25 Teams",
          desc: "Cryptic puzzle race across campus checkpoints. First come, first served.",
        },
        {
          name: "Dance Competition (Solo, Duo & Group)",
          category: "Cultural Dance",
          venue: "Main University Amphitheatre",
          eligibility: "Open to YBN & Outside Colleges",
          isOutsideEligible: true,
          desc: "Classical, folk, contemporary and hip-hop stage showdowns.",
        },
        {
          name: "Singing Competition",
          category: "Vocal Music",
          venue: "Auditorium Stage 1",
          eligibility: "Open to YBN & Outside Colleges",
          isOutsideEligible: true,
          desc: "Eastern classical, Bollywood melodies, folk and Western acoustic vocals.",
        },
        {
          name: "Reel Competition",
          category: "Digital Cinematics",
          venue: "Digital Submission Desk",
          eligibility: "Open to YBN & Outside Colleges",
          isOutsideEligible: true,
          desc: "30-60 second reels capturing high-energy festival moments.",
        },
        {
          name: "Mimicry Competition",
          category: "Theatrical Arts",
          venue: "Open Stage B",
          eligibility: "Open to YBN & Outside Colleges",
          isOutsideEligible: true,
          desc: "Voice impressions, satirical comedy, and stage presence.",
        },
        {
          name: "Stand-up Comedy",
          category: "Live Comedy",
          venue: "Open Stage B",
          eligibility: "Open to YBN & Outside Colleges",
          isOutsideEligible: true,
          desc: "Original observational humor and punchline mastery.",
        },
      ]
    },
    day_3: {
      title: "Day 3 — Grand Finale & Closing Ceremony",
      date: "Saturday, December 12, 2026",
      theme: "Runway Glamour, Honor Roll & Mega EDM DJ Night",
      events: [
        {
          name: "Ramp Walk / Fashion Show",
          category: "Runway Fashion",
          venue: "Grand Stage Arena",
          eligibility: "YBN University Students Only",
          isOutsideEligible: false,
          desc: "Haute couture sequences and cultural attire on the festival runway.",
        },
        {
          name: "Official Award Ceremony",
          category: "University Accolades",
          venue: "Grand Stage Arena",
          eligibility: "Open to All Attendees",
          isOutsideEligible: true,
          desc: "Presentation of trophies, medals, and official certificates to all winners.",
        },
        {
          name: "Mega DJ Night Celebration",
          category: "Grand Finale",
          venue: "Grand Open Stadium",
          eligibility: "All Registered Festival Attendees",
          isOutsideEligible: true,
          desc: "Electrifying open-air laser show and DJ celebration to wrap YUNIFEST 2026.",
        },
      ]
    }
  };

  const current = daysData[activeDay];

  return (
    <section className="py-20 bg-[#0A1B3B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2345] border border-[#F5C451]/30 text-xs font-semibold text-[#F5C451] uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Three-Day Programme</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Programme by <span className="gold-gradient-text">Day</span>
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Carefully curated track of technical presentations, competitive arts, and grand celebrations.
            </p>
          </div>

          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#F5C451] hover:text-[#FDE047] group"
          >
            <span>View Full Timeline & Schedule</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveDay('day_1')}
            className={`flex-1 sm:flex-none px-6 py-3.5 rounded-xl text-sm font-bold transition-all text-left border ${
              activeDay === 'day_1'
                ? 'bg-gradient-to-r from-[#F5C451] to-[#D4A017] text-[#07152F] border-[#F5C451] shadow-gold-glow'
                : 'bg-[#0D2345] text-slate-300 border-slate-700 hover:border-[#F5C451]/40'
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider opacity-90">Day 1 • Dec 10</div>
            <div className="text-base font-extrabold">Technical & Innovation</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveDay('day_2')}
            className={`flex-1 sm:flex-none px-6 py-3.5 rounded-xl text-sm font-bold transition-all text-left border ${
              activeDay === 'day_2'
                ? 'bg-gradient-to-r from-[#F5C451] to-[#D4A017] text-[#07152F] border-[#F5C451] shadow-gold-glow'
                : 'bg-[#0D2345] text-slate-300 border-slate-700 hover:border-[#F5C451]/40'
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider opacity-90">Day 2 • Dec 11</div>
            <div className="text-base font-extrabold">Cultural Showcase</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveDay('day_3')}
            className={`flex-1 sm:flex-none px-6 py-3.5 rounded-xl text-sm font-bold transition-all text-left border ${
              activeDay === 'day_3'
                ? 'bg-gradient-to-r from-[#F5C451] to-[#D4A017] text-[#07152F] border-[#F5C451] shadow-gold-glow'
                : 'bg-[#0D2345] text-slate-300 border-slate-700 hover:border-[#F5C451]/40'
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider opacity-90">Day 3 • Dec 12</div>
            <div className="text-base font-extrabold">Grand Finale & DJ</div>
          </button>
        </div>

        {/* Day Card Header Banner */}
        <div className="mb-6 p-4 rounded-xl bg-[#0D2345]/90 border border-[#F5C451]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-white text-lg sm:text-xl">
              {current.title}
            </h3>
            <p className="text-xs text-[#F5C451] mt-0.5">
              {current.date} • {current.theme}
            </p>
          </div>
          <Link
            to="/register"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-[#07152F] bg-[#F5C451] hover:bg-[#FDE047] transition-colors"
          >
            <span>Register for Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Day Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {current.events.map((evt, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-gradient-to-b from-[#0D2345]/70 to-[#07152F]/80 border border-slate-700/60 hover:border-[#F5C451]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold text-slate-300 px-2 py-0.5 rounded bg-[#07152F] border border-slate-700">
                    {evt.category}
                  </span>
                  
                  {evt.isOutsideEligible ? (
                    <span className="text-[10px] font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                      Open to All Colleges
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                      YBN Only
                    </span>
                  )}
                </div>

                <h4 className="font-display font-bold text-white text-base group-hover:text-[#F5C451] transition-colors mb-2">
                  {evt.name}
                </h4>

                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {evt.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#F5C451]" />
                  <span>{evt.venue}</span>
                </div>
                <div className="text-[#F5C451] font-semibold">
                  TBA
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Unconfirmed Schedule Note (Quiz & Poster Making) */}
        <div className="mt-8 p-5 rounded-xl bg-[#07152F] border border-dashed border-[#F5C451]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#F5C451] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">
                Additional Confirmed Competitions (Schedule to be announced):
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                • <strong className="text-slate-200">Quiz Competition</strong> & • <strong className="text-slate-200">Poster Making Competition</strong> are confirmed and open to all college participants. Exact date & hall timing will be published here shortly.
              </p>
            </div>
          </div>
          <Link
            to="/register"
            className="shrink-0 text-xs text-[#07152F] bg-[#F5C451] hover:bg-[#FDE047] font-bold px-3 py-1.5 rounded-md self-start sm:self-auto transition-colors"
          >
            Pre-register Now
          </Link>
        </div>

      </div>
    </section>
  );
};
