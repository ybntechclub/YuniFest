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
    <div className="min-h-screen bg-black">
      {/* 1. Full-Screen Video Background Hero (Exact MDNT Template) */}
      <HeroSection />

      {/* 2. Kinetic Ticker Tape */}
      <div className="relative z-10 border-y border-white/10 bg-[#060B1A] py-3.5 ticker-tape">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center mx-5">
              <span className="font-headline font-black text-sm tracking-wider uppercase text-slate-300 hover:text-[#CCFF00] transition-colors">
                {item}
              </span>
              <span className="font-mono text-xs text-[#CCFF00] mx-4 font-bold">
                ///
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Stage Activation Countdown Banner */}
      <section className="py-12 bg-[#02050D] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#CCFF00] mb-4 px-2">
            <span>[ STAGE ACTIVATION COUNTDOWN ]</span>
            <span className="text-slate-400">DEC 10, 2026 // 09:00 IST</span>
          </div>
          <CountdownTimer />
        </div>
      </section>

      {/* 4. Manifesto & Work Showcases */}
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
