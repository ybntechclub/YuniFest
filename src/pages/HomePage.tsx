import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FestOverview } from '../components/home/FestOverview';
import { DayByDayPreview } from '../components/home/DayByDayPreview';
import { CoordinatorsSection } from '../components/home/CoordinatorsSection';
import { RulesSection } from '../components/home/RulesSection';
import { VenueMapSection } from '../components/home/VenueMapSection';
import { FaqSection } from '../components/home/FaqSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FestOverview />
      <DayByDayPreview />
      <CoordinatorsSection />
      <RulesSection />
      <VenueMapSection />
      <FaqSection />
    </div>
  );
};
