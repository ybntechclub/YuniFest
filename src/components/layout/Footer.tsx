import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowUpRight, MapPin, Calendar } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#02040A] border-t border-white/10 text-slate-400 relative overflow-hidden">
      
      {/* Top Advisory Strip */}
      <div className="bg-[#060D1E] border-b border-white/5 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2.5 text-[#F5C451]">
            <ShieldAlert className="w-4 h-4 shrink-0 text-[#F5C451]" />
            <span className="font-bold tracking-wider">[ ENTRY MANDATE ]:</span>
            <span className="text-slate-200">
              PHYSICAL COLLEGE / UNIVERSITY ID CARD IS MANDATORY FOR ENTRY.
            </span>
          </div>
          <Link
            to="/register"
            className="text-[11px] font-bold uppercase tracking-wider text-[#03060E] bg-[#F5C451] hover:bg-white px-3.5 py-1.5 rounded-full transition-colors"
          >
            CLAIM PASS (₹0)
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Col 1: Brand & Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0B152D] border border-[#F5C451]/40 flex items-center justify-center p-1.5">
                <img src="/yuni-crest.svg" alt="YBN Crest" className="w-full h-full object-contain" />
              </div>
              <span className="font-headline font-black text-xl text-white">
                YUNIFEST <span className="text-[#F5C451]">2026</span>
              </span>
            </div>

            <p className="font-display text-xs text-slate-400 leading-relaxed">
              The flagship annual youth festival of YBN University, bringing together technology, culture, creativity, and fellowship.
            </p>

            <div className="font-mono text-xs text-slate-300 space-y-1 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#F5C451]" />
                <span>DECEMBER 10, 11 & 12, 2026</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F5C451] shrink-0 mt-0.5" />
                <span>NAMKUM, RANCHI, JHARKHAND</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold tracking-widest text-[#F5C451] mb-5">
              [ DIRECTORY ]
            </h4>
            <ul className="space-y-3 font-display text-xs text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Overview & Manifesto
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  15+ Competitions & Showcases
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-white transition-colors">
                  Three-Day Programme Timeline
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#F5C451] transition-colors flex items-center gap-1.5">
                  <span>Participant Registration</span>
                  <span className="font-mono text-[10px] text-[#F5C451]">₹0</span>
                </Link>
              </li>
              <li>
                <a href="#rules" className="hover:text-white transition-colors">
                  Admission Regulations & Conduct
                </a>
              </li>
              <li>
                <a href="#coordinators" className="hover:text-white transition-colors">
                  Organizing Committee
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Arenas */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold tracking-widest text-[#F5C451] mb-5">
              [ ARENAS ]
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-slate-400">
              <li>• ESPORTS: BGMI & FREE FIRE</li>
              <li>• TREASURE HUNT (CAP: 25)</li>
              <li>• AMPHITHEATRE DANCE BATTLES</li>
              <li>• EASTERN & WESTERN SINGING</li>
              <li>• MODEL PRESENTATION</li>
              <li>• GRAND FASHION RUNWAY</li>
              <li>• OPEN-AIR EDM DJ FINALE</li>
            </ul>
          </div>

          {/* Col 4: Portal & Verification */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold tracking-widest text-[#F5C451] mb-5">
              [ ADMIN PORTAL ]
            </h4>
            <p className="font-display text-xs text-slate-400 leading-relaxed mb-4">
              Jury members and authorized student coordinators can manage registration quotas and export verified rosters.
            </p>

            <Link
              to="/admin/login"
              className="btn-outline-luxe w-full py-2.5 text-xs font-mono justify-between group"
            >
              <span>ORGANIZER LOGIN</span>
              <ArrowUpRight className="w-4 h-4 text-[#F5C451] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

        </div>

        {/* Huge Watermark (Signature MDNT Design Language) */}
        <div className="pt-8 border-t border-white/5 select-none pointer-events-none">
          <div className="font-headline font-black text-5xl sm:text-7xl md:text-9xl text-white/[0.04] uppercase tracking-tighter text-center leading-none">
            YUNIFEST 2026
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <p>© 2026 YBN UNIVERSITY, RANCHI. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-3">
            <span>DEC 10-12, 2026</span>
            <span>•</span>
            <span className="text-[#F5C451]">ONE CAMPUS. ENDLESS POSSIBILITIES.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
