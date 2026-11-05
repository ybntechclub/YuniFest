import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { registrationStore } from '../lib/registrationStore';
import { RegistrationRecord } from '../types/database';
import { PassCard } from '../components/registration/PassCard';
import { 
  Search, ShieldCheck, AlertCircle, Loader2, Sparkles, 
  ArrowRight, QrCode, Phone, Mail, FileCheck2, RefreshCw 
} from 'lucide-react';

export const MyPassPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('ref') || searchParams.get('code') || searchParams.get('mobile') || '';

  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [passRecord, setPassRecord] = useState<RegistrationRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (targetQuery?: string) => {
    const q = (targetQuery !== undefined ? targetQuery : query).trim();
    if (!q) {
      setErrorMsg('Please enter your Registration Code, 10-digit Mobile, or Email to check your pass.');
      return;
    }

    setErrorMsg(null);
    setIsSearching(true);
    setSearched(true);

    try {
      const record = await registrationStore.getRegistrationByReference(q);
      setPassRecord(record);
      if (record) {
        setSearchParams({ ref: record.registration_code });
      }
    } catch (err: any) {
      console.error('Error querying pass:', err);
      setErrorMsg('Network error connecting to university database. Please try again.');
      setPassRecord(null);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F6F7F9] text-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[1.5px] border-slate-900 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4 shadow-sm">
            <QrCode className="w-3.5 h-3.5 text-[#2B59FF]" />
            <span>Digital Pass Verification Portal</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-700 font-bold">Live Supabase Sync</span>
          </div>

          <h1 className="font-headline font-black text-3xl sm:text-5xl text-slate-950 tracking-tight mb-3 uppercase">
            MY FESTIVAL <span className="text-[#2B59FF]">PASS</span>
          </h1>
          <p className="font-display text-slate-600 text-xs sm:text-sm leading-relaxed">
            Verify, view, or download your official YUNIFEST 2026 entry pass. Enter your registration code, registered mobile number, or email address below.
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-2xl mx-auto mb-10 bg-white rounded-3xl border-[2px] border-slate-900 p-6 sm:p-8 shadow-solid-pop">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block font-mono text-xs uppercase font-bold tracking-wider text-slate-900 mb-2">
                ENTER REGISTRATION CODE / MOBILE / EMAIL:
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. YUNI-2026-9812 or 9876543210 or delegate@mail.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-bold focus:outline-none transition-colors"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {errorMsg && (
              <p className="font-mono text-xs text-red-600 font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={isSearching}
                className="btn-voltage flex-1 py-3 text-xs justify-center font-bold"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>CHECKING BACKEND DATABASE...</span>
                  </>
                ) : (
                  <>
                    <FileCheck2 className="w-4 h-4" />
                    <span>CHECK PASS STATUS</span>
                  </>
                )}
              </button>

              {searched && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSearched(false);
                    setPassRecord(null);
                    setErrorMsg(null);
                    setSearchParams({});
                  }}
                  className="px-4 py-3 rounded-2xl bg-[#F6F7F9] hover:bg-slate-200 border-[1.5px] border-slate-900 text-xs font-mono font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>RESET</span>
                </button>
              )}
            </div>
          </form>

          {/* Quick Help Tips */}
          <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#2B59FF]" />
              Searchable with 10-digit Mobile
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#2B59FF]" />
              Or Registered Email
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Official YBN Secure Verification
            </span>
          </div>
        </div>

        {/* Results Area */}
        {isSearching && (
          <div className="max-w-2xl mx-auto p-12 text-center rounded-3xl bg-white border-[1.5px] border-slate-900 shadow-sm space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#2B59FF] mx-auto" />
            <h3 className="font-headline font-bold text-base text-slate-950">
              Querying University Database...
            </h3>
            <p className="font-mono text-xs text-slate-500">
              Verifying registration reference against Supabase live records.
            </p>
          </div>
        )}

        {/* Pass Found */}
        {!isSearching && searched && passRecord && (
          <div className="space-y-6 animate-fadeIn">
            <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-emerald-50 border-[1.5px] border-emerald-500 text-emerald-950 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs font-bold">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span>PASS FOUND: {passRecord.registration_code}</span>
              </div>
              <span className="font-mono text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 border border-emerald-400">
                STATUS: {passRecord.registration_status.toUpperCase()}
              </span>
            </div>

            <PassCard registration={passRecord} />
          </div>
        )}

        {/* Pass NOT Found */}
        {!isSearching && searched && !passRecord && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border-[2px] border-red-500 shadow-solid-pop text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-red-100 border-[1.5px] border-red-500 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-600">
                [ PASS NOT FOUND ]
              </span>
              <h3 className="font-headline font-black text-xl sm:text-2xl text-slate-950 uppercase">
                NO FESTIVAL PASS MATCHING "{query}"
              </h3>
              <p className="font-display text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                We could not locate any active registration pass for this search query. Please verify that your mobile number or registration code was entered correctly.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleSearch()}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-900 text-xs font-mono font-bold text-slate-900 transition-colors"
              >
                TRY AGAIN
              </button>

              <Link
                to="/register"
                className="btn-voltage py-2.5 px-5 text-xs inline-flex items-center gap-2"
              >
                <span>REGISTER FOR FESTIVAL NOW</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Fresh View (Not Searched Yet) */}
        {!searched && !isSearching && (
          <div className="max-w-2xl mx-auto text-center p-8 rounded-3xl bg-white/60 border border-slate-300">
            <Sparkles className="w-6 h-6 text-[#2B59FF] mx-auto mb-2" />
            <h4 className="font-headline font-bold text-sm text-slate-950">
              Haven't registered for YUNIFEST 2026 yet?
            </h4>
            <p className="font-display text-xs text-slate-600 mt-1 mb-4">
              Access all 3 days with a single pass: ₹399 for YBN students and ₹499 for outside delegates.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2B59FF] hover:underline uppercase tracking-wider font-mono"
            >
              <span>CLAIM FESTIVAL PASS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
export default MyPassPage;
