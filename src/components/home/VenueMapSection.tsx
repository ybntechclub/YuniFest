import React from 'react';
import { MapPin, Navigation, Train, Plane, Bus, Clock } from 'lucide-react';

export const VenueMapSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#03060E] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-[#F5C451] mb-3">
            [ 05 // LOGISTICS & ACCESS ]
          </div>
          <h2 className="font-headline font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            CAMPUS ARENAS & <span className="gold-gradient-text">TRANSIT ACCESS</span>
          </h2>
          <p className="font-display text-slate-400 text-sm mt-3 leading-relaxed">
            YBN University Main Campus, Rajaulatu, Namkum, Ranchi, Jharkhand — 834010, India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Zone Breakdown */}
          <div className="lg:col-span-2 mdnt-card crosshair-corner p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                <div>
                  <h3 className="font-headline font-bold text-2xl text-white">
                    Festival Campus Map & Arenas
                  </h3>
                  <p className="font-mono text-xs text-[#F5C451] mt-1">
                    GATES OPEN AT 08:30 IST DAILY // DEC 10-12
                  </p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 self-start sm:self-auto">
                  NAMKUM, RANCHI
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="font-mono text-xs font-bold text-[#F5C451] mb-1">[ ZONE A ] STAGE ARENA</div>
                  <p className="text-xs text-slate-300">
                    Grand Opening Ceremony, Ramp Walk Runway & Mega EDM DJ Night.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="font-mono text-xs font-bold text-cyan-400 mb-1">[ ZONE B ] AMPHITHEATRE</div>
                  <p className="text-xs text-slate-300">
                    Dance Showdowns, Singing Battles, Mimicry & Live Stand-up Comedy.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="font-mono text-xs font-bold text-pink-400 mb-1">[ ZONE C ] TECH PAVILION</div>
                  <p className="text-xs text-slate-300">
                    Model Presentation Gallery, Esports Lab (BGMI/Free Fire) & Craft Studio.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="font-mono text-xs font-bold text-emerald-400 mb-1">[ ZONE D ] FOOD & VERIFICATION</div>
                  <p className="text-xs text-slate-300">
                    ID Verification Desks at Gate 1 & 2, Flea Market Stalls & First Aid Desk.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
              <span>Verification Desk: Gate 1 & 2</span>
              <span className="text-[#F5C451]">PARKING AVAILABLE</span>
            </div>
          </div>

          {/* Transit Hubs */}
          <div className="mdnt-card crosshair-corner p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="font-headline font-bold text-xl text-white mb-6 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-[#F5C451]" />
                <span>Transit Routes</span>
              </h3>

              <div className="space-y-4 font-display text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <Train className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Ranchi Junction (RNC)</div>
                    <div className="text-slate-400 mt-0.5">~12 km via Namkum Ring Road (25-30 mins)</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <Train className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Namkum Railway Station</div>
                    <div className="text-slate-400 mt-0.5">~6 km from campus gate (10-15 mins)</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <Plane className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Birsa Munda Airport (IXR)</div>
                    <div className="text-slate-400 mt-0.5">~16 km from campus (35-40 mins)</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <Bus className="w-5 h-5 text-[#F5C451] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Public Transit & Cabs</div>
                    <div className="text-slate-400 mt-0.5">Autos & Cabs readily connect from Kantatoli & Overbridge</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-slate-500 uppercase text-center">
              COORDINATES: 23.3345° N, 85.3982° E
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
