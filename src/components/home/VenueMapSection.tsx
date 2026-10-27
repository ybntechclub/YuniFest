import React from 'react';
import { MapPin, Navigation, Train, Plane, Bus, Clock, ShieldCheck } from 'lucide-react';

export const VenueMapSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#07152F] relative border-t border-[#F5C451]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2345] border border-[#F5C451]/30 text-xs font-semibold text-[#F5C451] uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Festival Destination</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-3">
            Venue, Campus Map & How to Reach
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            YBN University’s sprawling green campus in Namkum, Ranchi is equipped with state-of-the-art auditoriums, open amphitheatres, and large athletic grounds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Col 1 & 2: Campus Map Overview & Highlights */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0D2345] to-[#07152F] border border-slate-700/80 shadow-card-elevated flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="font-display font-bold text-white text-xl">
                    YBN University Main Campus
                  </h3>
                  <p className="text-xs text-[#F5C451] mt-0.5">
                    Rajaulatu, Namkum, Ranchi, Jharkhand — 834010
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#112C57] text-cyan-300 border border-cyan-500/30 self-start sm:self-auto">
                  Official Event Hub
                </span>
              </div>

              {/* Campus Zones Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#07152F]/80 border border-slate-800">
                  <div className="text-xs font-bold text-[#F5C451] mb-1">Zone A • Main Stage Arena</div>
                  <p className="text-xs text-slate-300">
                    Grand Opening, Runway Fashion Show, Felicitation & Mega EDM DJ Night.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#07152F]/80 border border-slate-800">
                  <div className="text-xs font-bold text-cyan-300 mb-1">Zone B • Auditorium & Amphitheatre</div>
                  <p className="text-xs text-slate-300">
                    Dance Showcases, Singing Competitions, and Live Stand-up Comedy.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#07152F]/80 border border-slate-800">
                  <div className="text-xs font-bold text-pink-300 mb-1">Zone C • Tech & Innovation Pavilion</div>
                  <p className="text-xs text-slate-300">
                    Model Presentation Gallery, Esports Arena (BGMI/Free Fire), Craft Studio.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#07152F]/80 border border-slate-800">
                  <div className="text-xs font-bold text-emerald-300 mb-1">Zone D • Food Fest & Help Desk</div>
                  <p className="text-xs text-slate-300">
                    ID Verification Booths at Gate 1 & 2, Flea Market stalls, and Emergency Care.
                  </p>
                </div>
              </div>
            </div>

            {/* Check-in desk timings */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-4 h-4 text-[#F5C451]" />
                Gates & Verification Open at 8:30 AM Daily
              </span>
              <span className="text-[#F5C451] font-semibold">Campus Gate 1 & 2</span>
            </div>
          </div>

          {/* Col 3: Transit Access & Directions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0D2345] to-[#07152F] border border-[#F5C451]/30 shadow-card-elevated flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#F5C451]" />
                <span>Transit Connectivity</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#07152F] border border-slate-800">
                  <Train className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Ranchi Railway Station (RNC)</div>
                    <div className="text-slate-400 text-xs mt-0.5">Approx. 12 km (25-30 min drive via Namkum Ring Road)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#07152F] border border-slate-800">
                  <Train className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Namkum Railway Station</div>
                    <div className="text-slate-400 text-xs mt-0.5">Nearest station, approx. 6 km (10-15 min drive)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#07152F] border border-slate-800">
                  <Plane className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Birsa Munda Airport (IXR)</div>
                    <div className="text-slate-400 text-xs mt-0.5">Approx. 16 km (35-40 min drive)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#07152F] border border-slate-800">
                  <Bus className="w-5 h-5 text-[#F5C451] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Bus & Local Transport</div>
                    <div className="text-slate-400 text-xs mt-0.5">Direct auto-rickshaws and cabs available from Kantatoli & Overbridge</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-[#07152F] border border-slate-800 text-[11px] text-slate-400 text-center">
              Parking is available inside the North Campus boundary for registered vehicles.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
