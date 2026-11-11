import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FestOverview } from '../components/home/FestOverview';
import { DayByDayPreview } from '../components/home/DayByDayPreview';
import { PricingSection } from '../components/home/PricingSection';
import { MysteryDjSection } from '../components/home/MysteryDjSection';
import { CoordinatorsSection } from '../components/home/CoordinatorsSection';
import { RulesSection } from '../components/home/RulesSection';
import { VenueMapSection } from '../components/home/VenueMapSection';
import { FaqSection } from '../components/home/FaqSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F7F9] text-slate-900">
      {/* 1. Minimalist Editorial Hero Section with Top Kinetic Ticker, Split Content + Dance Arena, and Integrated Countdown */}
      <HeroSection />

      {/* 2. Plans and Pricing Section */}
      <PricingSection />


      {/* 3. Manifesto & Work Showcases (Exact 6-Card Neo-Brutalist Layout) */}

      <FestOverview />

      {/* 4. Three-Day Itinerary (Schedule) */}
      <DayByDayPreview />


      {/* 5. High-Voltage Secret Celebrity DJ Night Teaser */}
      <MysteryDjSection />

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
