import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, QrCode, Globe, CheckCircle2, AlertTriangle, Settings } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { GOOGLE_DRIVE_FOLDER_URL } from '../../lib/driveUpload';
import { Folder } from 'lucide-react';

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
    <header className="bg-white border-b-[1.5px] border-slate-900 sticky top-0 z-40 text-slate-950 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Badge */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white border-[1.5px] border-slate-900 p-0.5 flex items-center justify-center shadow-sm overflow-hidden -rotate-6">
                <img src="/ybn-logo.png" alt="YBN University" className="w-full h-full object-contain animate-spin-slow" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-headline font-black text-slate-950 text-base leading-none">
                  YUNIFEST <span className="text-[#2B59FF]">ADMIN</span>
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-600 mt-0.5 leading-tight">
                  YBN University, Ranchi
                </span>
              </div>
            </Link>

            {/* Cloud Status Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#F6F7F9] border border-slate-300">
              {isSupabaseConfigured ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-700">Supabase Cloud Active</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-amber-700">Local Persistence Mode</span>
                </>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            <div className="bg-[#F6F7F9] p-1 rounded-full border border-slate-300 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('registrations')}
                className={`px-4 py-1.5 rounded-full text-xs font-display font-bold transition-all ${
                  activeTab === 'registrations'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Registrations
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('events')}
                className={`px-4 py-1.5 rounded-full text-xs font-display font-bold transition-all ${
                  activeTab === 'events'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Event Settings
              </button>
            </div>

            {/* Google Drive Receipts Folder Shortcut */}
            <a
              href={GOOGLE_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-display font-bold bg-white hover:bg-slate-50 text-slate-900 border border-slate-900 transition-all shadow-sm ml-2"
              title="Open Official Google Drive Payment Receipts Folder"
            >
              <Folder className="w-3.5 h-3.5 text-[#2B59FF]" />
              <span>Receipts Drive</span>
            </a>

            {/* Live QR Generator Action */}
            <button
              type="button"
              onClick={onOpenLiveQR}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-display font-bold bg-[#FEF08A] hover:bg-yellow-300 text-slate-950 border border-slate-900 transition-colors shadow-sm ml-2"
              title="Generate Scannable Registration Poster QR"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Poster QR</span>
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors ml-2"
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
