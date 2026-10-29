import React from 'react';
import { MapPin, Navigation, Train, Plane, Bus, Clock } from 'lucide-react';

export const VenueMapSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F6F7F9] relative border-t-[1.5px] border-slate-900/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-[1.5px] border-slate-900 font-mono text-xs font-bold text-slate-900 mb-3 shadow-sm">
            <span>[ 05 // LOGISTICS &amp; ACCESS ]</span>
          </div>
          <h2 className="font-headline font-black text-3xl sm:text-5xl text-slate-950 uppercase tracking-tight">
            CAMPUS ARENAS &amp; <span className="text-[#2B59FF]">TRANSIT ACCESS</span>
          </h2>
          <p className="font-display text-slate-600 text-sm mt-3 leading-relaxed">
            YBN University Main Campus, Rajaulatu, Namkum, Ranchi, Jharkhand — 834010, India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Zone Breakdown */}
          <div className="lg:col-span-2 rounded-[32px] border-[1.5px] border-slate-900 bg-white p-8 sm:p-10 shadow-solid-pop flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                <div>
                  <h3 className="font-headline font-black text-2xl text-slate-950 uppercase">
                    Festival Campus Map &amp; Arenas
                  </h3>
                  <p className="font-mono text-xs text-[#2B59FF] font-bold mt-1">
                    GATES OPEN AT 08:30 IST DAILY // DEC 10-12
                  </p>
                </div>
                <span className="font-mono text-xs px-3.5 py-1 rounded-full bg-slate-100 border border-slate-300 font-bold text-slate-700 self-start sm:self-auto">
                  NAMKUM, RANCHI
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-5 rounded-2xl bg-[#FEF08A]/40 border-[1.5px] border-slate-900">
                  <div className="font-mono text-xs font-bold text-slate-950 mb-1">[ ZONE A ] STAGE ARENA</div>
                  <p className="text-xs text-slate-700">
                    Grand Opening Ceremony, Ramp Walk Runway &amp; Mega EDM DJ Night.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#E0E7FF] border-[1.5px] border-slate-900">
                  <div className="font-mono text-xs font-bold text-[#2B59FF] mb-1">[ ZONE B ] AMPHITHEATRE</div>
                  <p className="text-xs text-slate-700">
                    Dance Showdowns, Singing Battles, Mimicry &amp; Live Stand-up Comedy.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FCE7F3] border-[1.5px] border-slate-900">
                  <div className="font-mono text-xs font-bold text-pink-900 mb-1">[ ZONE C ] TECH PAVILION</div>
                  <p className="text-xs text-slate-700">
                    Model Presentation Gallery, Esports Lab (BGMI/Free Fire) &amp; Craft Studio.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#D1FAE5] border-[1.5px] border-slate-900">
                  <div className="font-mono text-xs font-bold text-emerald-900 mb-1">[ ZONE D ] FOOD &amp; VERIFICATION</div>
                  <p className="text-xs text-slate-700">
                    ID Verification Desks at Gate 1 &amp; 2, Flea Market Stalls &amp; First Aid Desk.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between font-mono text-xs text-slate-600">
              <span>Verification Desk: Gate 1 &amp; 2</span>
              <span className="text-[#2B59FF] font-bold">PARKING AVAILABLE</span>
            </div>
          </div>

          {/* Transit Hubs */}
          <div className="rounded-[32px] border-[1.5px] border-slate-900 bg-white p-8 flex flex-col justify-between shadow-solid-pop">
            <div>
              <h3 className="font-headline font-bold text-xl text-slate-950 uppercase mb-6">
                Connectivity &amp; Transit
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-slate-300">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 mb-1">
                    <Train className="w-4 h-4 text-[#2B59FF]" />
                    <span>Ranchi Railway Station</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Approx. 12 km from campus. Auto-rickshaws and app cabs direct to Namkum.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-slate-300">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 mb-1">
                    <Plane className="w-4 h-4 text-[#2B59FF]" />
                    <span>Birsa Munda Airport (IXR)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Approx. 16 km. Taxi services available 24/7 across Ranchi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F6F7F9] border border-slate-300">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 mb-1">
                    <Bus className="w-4 h-4 text-[#2B59FF]" />
                    <span>Khadgarha Bus Stand</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Approx. 10 km. Frequent buses connecting to Rajaulatu / Namkum ring road.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 mt-6">
              <a
                href="https://maps.google.com/?q=YBN+University+Ranchi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-voltage w-full text-center text-xs justify-center py-3"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
