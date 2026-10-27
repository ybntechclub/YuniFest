import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, QrCode, Globe, CheckCircle2, AlertTriangle, Settings } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AdminNavbarProps {
  onOpenLiveQR: () => void;
  onLogout: () => void;
  activeTab: 'registrations' | 'events';
  setActiveTab: (tab: 'registrations' | 'events') => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  onOpenLiveQR,
  onLogout,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="bg-[#050E20] border-b border-[#F5C451]/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Badge */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0D2345] border border-[#F5C451]/50 p-1 flex items-center justify-center">
                <img src="/yuni-crest.svg" alt="YBN" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-black text-white text-base">
                YUNIFEST <span className="text-[#F5C451]">ADMIN</span>
              </span>
            </Link>

            {/* Cloud Status Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#0D2345] border border-slate-700">
              {isSupabaseConfigured ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300">Supabase Cloud Active</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-amber-300">Local Offline Persistence Mode</span>
                </>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('registrations')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'registrations'
                  ? 'bg-[#F5C451] text-[#07152F]'
                  : 'text-slate-300 hover:text-white hover:bg-[#0D2345]'
              }`}
            >
              Registrations
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('events')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'events'
                  ? 'bg-[#F5C451] text-[#07152F]'
                  : 'text-slate-300 hover:text-white hover:bg-[#0D2345]'
              }`}
            >
              Event Controls & Caps
            </button>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenLiveQR}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D2345] hover:bg-[#112C57] border border-[#F5C451]/30 text-xs font-semibold text-white transition-colors"
              title="Generate Live Registration QR Code"
            >
              <QrCode className="w-4 h-4 text-[#F5C451]" />
              <span className="hidden md:inline">Live QR</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="p-2 rounded-lg bg-[#0D2345] hover:bg-[#112C57] border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Open Public Website"
            >
              <Globe className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 border border-red-500/30 text-xs font-semibold text-red-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
