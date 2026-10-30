import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FestOverview } from '../components/home/FestOverview';
import { DayByDayPreview } from '../components/home/DayByDayPreview';
import { CoordinatorsSection } from '../components/home/CoordinatorsSection';
import { RulesSection } from '../components/home/RulesSection';
import { VenueMapSection } from '../components/home/VenueMapSection';
import { FaqSection } from '../components/home/FaqSection';
import { CountdownTimer } from '../components/home/CountdownTimer';

export const HomePage: React.FC = () => {
  const tickerItems = [
    "YUNIFEST 2026",
    "YBN UNIVERSITY, RANCHI",
    "DECEMBER 10, 11 & 12, 2026",
    "15+ STAGE SHOWCASES",
    "ESPORTS: BGMI & FREE FIRE",
    "TREASURE HUNT (CAP: 25)",
    "DANCE & SINGING BATTLES",
    "GRAND FASHION RUNWAY",
    "OPEN-AIR MEGA EDM DJ NIGHT",
    "₹0 PARTICIPATION PASS",
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-slate-900">
      {/* 1. Minimalist Editorial Hero Section */}
      <HeroSection />

      {/* 2. Kinetic Ticker Tape (Light Neo-Brutalist Strip) */}
      <div className="relative z-10 border-y-[1.5px] border-slate-900 bg-[#FEF08A] py-3.5 ticker-tape">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center mx-5">
              <span className="font-headline font-black text-sm tracking-wider uppercase text-slate-950 hover:text-[#2B59FF] transition-colors">
                {item}
              </span>
              <span className="font-mono text-xs text-slate-950 mx-4 font-black">
                ///
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Stage Activation Countdown Banner */}
      <section className="py-12 bg-white border-b-[1.5px] border-slate-900/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between font-mono text-xs uppercase tracking-widest text-slate-600 mb-4 px-2 font-bold gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#2B59FF]">[ STAGE ACTIVATION COUNTDOWN ]</span>
              <span className="font-editorial italic text-sm text-slate-500 font-semibold">• Live Ticking</span>
            </div>
            <span>DEC 10, 2026 // 09:00 IST</span>
          </div>
          <CountdownTimer />
        </div>
      </section>

      {/* 4. Manifesto & Work Showcases (Exact 6-Card Neo-Brutalist Layout) */}
      <FestOverview />

      {/* 5. Three-Day Itinerary */}
      <DayByDayPreview />

      {/* 6. Leadership & Mentors */}
      <CoordinatorsSection />

      {/* 7. Regulations & Eligibility */}
      <RulesSection />

      {/* 8. Campus Maps & Arenas */}
      <VenueMapSection />

      {/* 9. FAQs */}
      <FaqSection />
    </div>
  );
};
