import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, MapPin, Calendar, Mail, ExternalLink, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050E20] border-t border-[#F5C451]/20 text-slate-400 text-sm">
      {/* Important Advisory Bar */}
      <div className="bg-[#091B38] border-b border-[#F5C451]/15 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-[#FDE047]">
            <ShieldAlert className="w-4 h-4 shrink-0 text-[#F5C451]" />
            <span className="font-semibold tracking-wide">
              MANDATORY ENTRY ADVISORY:
            </span>
            <span className="text-slate-200">
              Every registered participant must carry a valid physical College / University ID card.
            </span>
          </div>
          <Link
            to="/register"
            className="shrink-0 text-xs text-[#07152F] bg-[#F5C451] hover:bg-[#FDE047] font-bold px-3 py-1.5 rounded-md transition-colors"
          >
            Claim ₹0 Pass
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: University & Fest Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0D2345] border border-[#F5C451]/40 flex items-center justify-center p-1.5 shadow-gold-glow">
                <img src="/yuni-crest.svg" alt="YBN University Crest" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-white text-lg tracking-wider">
                  YUNIFEST 2026
                </h3>
                <p className="text-xs text-[#F5C451] font-medium">
                  YBN University, Ranchi
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              One Campus. Three Days. Endless Possibilities. The official annual mega celebration of Technology, Culture, Creativity and Celebration.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300">
              <Calendar className="w-4 h-4 text-[#F5C451]" />
              <span>December 10, 11 and 12, 2026</span>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#F5C451] shrink-0 mt-0.5" />
              <span>Rajaulatu, Namkum, Ranchi, Jharkhand — 834010</span>
            </div>
          </div>

          {/* Col 2: Navigation & Explorer */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4 text-[#F5C451]">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-[#F5C451] transition-colors">
                  Festival Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-slate-300 hover:text-[#F5C451] transition-colors">
                  All Events & Competitions
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-slate-300 hover:text-[#F5C451] transition-colors">
                  Three-Day Programme Schedule
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-300 hover:text-[#F5C451] transition-colors flex items-center gap-1.5">
                  <span>Participant Registration</span>
                  <span className="text-[10px] bg-[#F5C451]/20 text-[#F5C451] px-1.5 py-0.2 rounded font-bold">₹0</span>
                </Link>
              </li>
              <li>
                <a href="#rules" className="text-slate-300 hover:text-[#F5C451] transition-colors">
                  Festival Rules & Eligibility
                </a>
              </li>
              <li>
                <a href="#coordinators" className="text-slate-300 hover:text-[#F5C451] transition-colors">
                  Core Organizing Committee
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Competitions */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4 text-[#F5C451]">
              Flagship Showcases
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• Gaming Tournament (BGMI & Free Fire)</li>
              <li>• Treasure Hunting (Cap: 25)</li>
              <li>• Dance Showcase & Solo/Group</li>
              <li>• Singing & Musical Showdown</li>
              <li>• Model Presentation & Poster Making</li>
              <li>• Mimicry & Stand-up Comedy</li>
              <li>• Ramp Walk / Grand Runway</li>
              <li>• Mega DJ Night Celebration</li>
            </ul>
          </div>

          {/* Col 4: Organizer & Helpdesk */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4 text-[#F5C451]">
              Administration & Portal
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Authorized coordinators and university jury can log in to review participant entries, manage event caps, and export rosters.
            </p>

            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0D2345] hover:bg-[#112C57] border border-[#F5C451]/30 text-xs font-semibold text-white transition-all w-full justify-center group"
            >
              <span>Organizer Portal Login</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F5C451] group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <div className="mt-4 p-3 rounded-lg bg-[#07152F] border border-slate-800 text-[11px] text-slate-400">
              <p className="font-semibold text-slate-300">Help Desk Verification:</p>
              <p>Physical verification desks open from 8:30 AM on December 10, 2026 at Campus Gate 1 & 2.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 YBN University, Ranchi. All rights reserved. YUNIFEST is the registered university festival.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-slate-300">Dec 10–12, 2026</span>
            <span>•</span>
            <span className="text-[#F5C451]">Ranchi, Jharkhand</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
