import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RegistrationRecord } from '../../types/database';
import { Printer, ShieldCheck, Calendar, MapPin, ArrowRight, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PassCardProps {
  registration: RegistrationRecord;
}

export const PassCard: React.FC<PassCardProps> = ({ registration }) => {
  const passRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const qrData = JSON.stringify({
    code: registration.registration_code,
    name: registration.full_name,
    event: registration.event_name,
    id: registration.student_id_number,
    institution: registration.institution_name,
    status: registration.registration_status,
  });

  const selectedEventsByDay = registration.event_specific_data?.selectedEventsByDay;
  const squadMembers = registration.event_specific_data?.squadMembers;
  const rampWalkTheme = registration.event_specific_data?.rampWalkTheme;
  const iksFormat = registration.event_specific_data?.iksFormat;
  const faceArtCategory = registration.event_specific_data?.faceArtCategory;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* High-End Minimalist VIP Event Pass */}
      <div
        ref={passRef}
        id="printable-pass"
        className="relative bg-white border-[2px] border-slate-900 rounded-[32px] p-6 sm:p-10 shadow-solid-pop overflow-hidden print:m-0 print:border-black print:text-black print:bg-white text-slate-950"
      >
        {/* Subtle decorative background accents */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FEF08A]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2B59FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b-[1.5px] border-slate-900/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white border-[1.5px] border-slate-900 p-0.5 shadow-sm flex items-center justify-center overflow-hidden">
              <img src="/ybn-logo.png" alt="YBN University Emblem" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline font-black text-2xl text-slate-950 tracking-tight">
                  YUNIFEST
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900">
                  2026
                </span>
              </div>
              <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                YBN UNIVERSITY • RANCHI, INDIA
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#2B59FF] block">
              [ 3-DAY FESTIVAL PASS ]
            </span>
            <span className="font-mono text-[11px] font-black px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-400 inline-block mt-1">
              {registration.registration_status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Big Registration Code & QR Badge */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-b-[1.5px] border-slate-900/10">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block">
              REGISTRATION REFERENCE
            </span>
            <div className="font-headline font-black text-3xl sm:text-4xl text-[#2B59FF] tracking-wider">
              {registration.registration_code}
            </div>
            <p className="font-mono text-[11px] text-slate-500 font-medium">
              ISSUED ON: {new Date(registration.created_at).toLocaleDateString()} • SINGLE PASS • ALL 3 DAYS
            </p>
          </div>

          {/* Scannable High-Contrast QR Code */}
          <div className="p-4 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 shadow-sm flex flex-col items-center shrink-0">
            <QRCodeSVG
              value={qrData}
              size={130}
              level="H"
              includeMargin={false}
            />
            <span className="font-mono text-[9px] font-black text-slate-900 mt-2 uppercase tracking-tight">
              GATE 1 &amp; 2 OFFICIAL SCAN
            </span>
          </div>
        </div>

        {/* 3-Day Itinerary & Selected Competitions Showcase */}
        <div className="py-6 border-b-[1.5px] border-slate-900/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#2B59FF]">
              OFFICIAL 3-DAY FESTIVAL LINEUP (DEC 10, 11 &amp; 12)
            </span>
            <span className="font-mono text-[10px] font-bold bg-[#FEF08A] px-2 py-0.5 rounded border border-slate-900">
              1 EVENT / DAY
            </span>
          </div>

          {selectedEventsByDay ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Day 1 */}
              <div className="p-3.5 rounded-xl bg-[#F6F7F9] border-[1.5px] border-slate-900 space-y-1">
                <span className="font-mono text-[10px] font-bold text-slate-500 block uppercase">
                  DAY 1 // DEC 10
                </span>
                <p className="font-headline font-bold text-xs sm:text-sm text-slate-950">
                  {selectedEventsByDay.day_1?.name || 'General Festival Delegate'}
                </p>
                {selectedEventsByDay.day_1 && (
                  <span className="font-mono text-[9px] text-emerald-700 font-bold block">
                    ✓ Competition Entry
                  </span>
                )}
              </div>

              {/* Day 2 */}
              <div className="p-3.5 rounded-xl bg-[#F6F7F9] border-[1.5px] border-slate-900 space-y-1">
                <span className="font-mono text-[10px] font-bold text-slate-500 block uppercase">
                  DAY 2 // DEC 11
                </span>
                <p className="font-headline font-bold text-xs sm:text-sm text-slate-950">
                  {selectedEventsByDay.day_2?.name || 'General Festival Delegate'}
                </p>
                {selectedEventsByDay.day_2 && (
                  <span className="font-mono text-[9px] text-emerald-700 font-bold block">
                    ✓ Competition Entry
                  </span>
                )}
              </div>

              {/* Day 3 */}
              <div className="p-3.5 rounded-xl bg-[#F6F7F9] border-[1.5px] border-slate-900 space-y-1">
                <span className="font-mono text-[10px] font-bold text-slate-500 block uppercase">
                  DAY 3 // DEC 12
                </span>
                <p className="font-headline font-bold text-xs sm:text-sm text-slate-950">
                  {selectedEventsByDay.day_3?.name || 'Grand Runway & EDM DJ Night'}
                </p>
                {selectedEventsByDay.day_3 && (
                  <span className="font-mono text-[9px] text-emerald-700 font-bold block">
                    ✓ Competition Entry
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <h3 className="font-headline font-black text-xl sm:text-2xl text-slate-950 uppercase">
                {registration.event_name}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 pt-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-[#2B59FF]" />
                  <span>DECEMBER 10, 11 &amp; 12, 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2B59FF]" />
                  <span>YBN University Main Campus, Ranchi</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Participant Identification Details */}
        <div className="py-6 border-b-[1.5px] border-slate-900/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 uppercase font-bold text-[10px] block">
              PARTICIPANT NAME:
            </span>
            <span className="font-headline font-bold text-base text-slate-950 block mt-0.5">
              {registration.full_name}
            </span>
          </div>

          <div>
            <span className="text-slate-500 uppercase font-bold text-[10px] block">
              STUDENT ID / ROLL NO:
            </span>
            <span className="font-bold text-slate-950 text-sm block mt-0.5">
              {registration.student_id_number}
            </span>
          </div>

          <div>
            <span className="text-slate-500 uppercase font-bold text-[10px] block">
              INSTITUTION:
            </span>
            <span className="font-bold text-slate-800 text-xs block mt-0.5">
              {registration.institution_name}
            </span>
          </div>

          <div>
            <span className="text-slate-500 uppercase font-bold text-[10px] block">
              AFFILIATION &amp; DEGREE:
            </span>
            <span className="font-bold text-slate-800 text-xs block mt-0.5">
              {registration.participant_type === 'ybn_student' ? "YBN Student" : "Visiting Delegate"} • {registration.course} ({registration.academic_year})
            </span>
          </div>
        </div>

        {/* 3-Day Festival Access Itinerary */}
        <div className="py-4 border-b-[1.5px] border-slate-900/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-slate-500 uppercase font-bold text-[10px] block">
              3-DAY FESTIVAL SCHEDULE ITINERARY:
            </span>
            <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-[#FEF08A] text-slate-950 border border-slate-900">
              DEC 10, 11 &amp; 12, 2026
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
            <div className="p-2.5 rounded-xl bg-[#F6F7F9] border border-slate-300 text-[11px]">
              <span className="text-slate-400 block text-[9px] uppercase font-bold">DAY 1 // DEC 10</span>
              <strong className="text-slate-950 block truncate">
                {selectedEventsByDay?.day_1?.name || (
                  registration.event_name?.toLowerCase().includes('gaming') ? 'Gaming Tournament' :
                  registration.event_name?.toLowerCase().includes('face') ? 'Face Painting & Tattoo' :
                  registration.event_name?.toLowerCase().includes('model') ? 'Model & Poster Making' :
                  registration.event_name?.toLowerCase().includes('sketch') ? 'Live Sketch Competition' :
                  'General Delegate Access'
                )}
              </strong>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F6F7F9] border border-slate-300 text-[11px]">
              <span className="text-slate-400 block text-[9px] uppercase font-bold">DAY 2 // DEC 11</span>
              <strong className="text-slate-950 block truncate">
                {selectedEventsByDay?.day_2?.name || (
                  registration.event_name?.toLowerCase().includes('dance') ? 'Dance Competition' :
                  registration.event_name?.toLowerCase().includes('singing') ? 'Singing Competition' :
                  registration.event_name?.toLowerCase().includes('treasure') ? 'Treasure Hunting' :
                  registration.event_name?.toLowerCase().includes('reel') ? 'Reel Competition' :
                  registration.event_name?.toLowerCase().includes('mimicry') ? 'Mimicry & Stand-up' :
                  'General Delegate Access'
                )}
              </strong>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F6F7F9] border border-slate-300 text-[11px]">
              <span className="text-slate-400 block text-[9px] uppercase font-bold">DAY 3 // DEC 12</span>
              <strong className="text-slate-950 block truncate">
                {selectedEventsByDay?.day_3?.name || (
                  registration.event_name?.toLowerCase().includes('ramp') ? 'Ramp Walk / Fashion Show' :
                  'Runway & EDM DJ Concert'
                )}
              </strong>
            </div>
          </div>
        </div>

        {/* Esports Roster if Present */}
        {squadMembers && Array.isArray(squadMembers) && squadMembers.length > 0 && (
          <div className="py-4 border-b-[1.5px] border-slate-900/10 space-y-2">
            <span className="font-mono text-slate-500 uppercase font-bold text-[10px] block">
              ESPORTS {squadMembers.length === 2 ? 'DUO ROSTER (2 PLAYERS)' : `SQUAD ROSTER (${squadMembers.length} PLAYERS)`}:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {squadMembers.map((m: any, i: number) => (
                <div key={i} className="p-2 rounded-lg bg-[#F6F7F9] border border-slate-300 font-mono text-[11px]">
                  <strong className="text-slate-950 font-bold">{i + 1}. {m.name || 'Player'}</strong>
                  <div className="text-slate-600 text-[10px]">
                    IGN: <span className="text-[#2B59FF] font-bold">{m.ign || 'N/A'}</span> • UID: <span className="font-bold text-slate-900">{m.uid || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ramp Walk Theme if Present */}
        {rampWalkTheme && (
          <div className="py-4 border-b-[1.5px] border-slate-900/10 font-mono text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 uppercase font-bold text-[10px] block">RAMP WALK RUNWAY THEME:</span>
              <span className="font-bold text-[#2B59FF]">{rampWalkTheme}</span>
            </div>
            <span className="text-[10px] bg-[#FEF08A] px-2 py-0.5 rounded border border-slate-900 font-bold">
              UNLIMITED SEATS
            </span>
          </div>
        )}

        {/* IKS Format if Present */}
        {iksFormat && (
          <div className="py-4 border-b-[1.5px] border-slate-900/10 font-mono text-xs">
            <span className="text-slate-500 uppercase font-bold text-[10px] block">
              INDIAN KNOWLEDGE SYSTEM (IKS) PRESENTATION:
            </span>
            <span className="font-bold text-emerald-800">{iksFormat}</span>
          </div>
        )}

        {/* Face Painting / Tattoo Art if Present */}
        {(faceArtCategory || registration.event_specific_data?.modelPartnerName) && (
          <div className="py-4 border-b-[1.5px] border-slate-900/10 font-mono text-xs">
            <span className="text-slate-500 uppercase font-bold text-[10px] block">BODY ART FORMAT &amp; COMPANION:</span>
            <span className="font-bold text-pink-700">
              {faceArtCategory || 'Face Painting'}
              {registration.event_specific_data?.modelPartnerName ? ` • Companion: ${registration.event_specific_data.modelPartnerName}` : ''}
            </span>
          </div>
        )}

        {/* Team details if present */}
        {registration.team_name && !squadMembers && (
          <div className="py-4 border-b-[1.5px] border-slate-900/10 font-mono text-xs">
            <span className="text-slate-500 uppercase font-bold text-[10px] block">
              TEAM / CREW / PROJECT:
            </span>
            <span className="font-bold text-slate-950">{registration.team_name}</span>
          </div>
        )}

        {/* Mandatory Physical ID Warning Footer */}
        <div className="pt-6 flex items-start gap-3 bg-[#FEF08A]/30 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 p-6 sm:p-8 border-t-[1.5px] border-slate-900">
          <ShieldCheck className="w-5 h-5 text-slate-950 shrink-0 mt-0.5" />
          <p className="font-display text-xs text-slate-800 leading-relaxed">
            <strong className="text-slate-950 font-bold">MANDATORY CHECK-IN CLAUSE:</strong> Original, physical College / University ID card must be presented alongside this scannable QR badge at Campus Gate 1 &amp; 2 for all three days (Dec 10, 11 &amp; 12, 2026).
          </p>
        </div>

      </div>

      {/* Action Buttons: Print / Save PDF / Register Another */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="btn-voltage inline-flex items-center gap-2 text-xs py-3 px-6 w-full sm:w-auto"
        >
          <Printer className="w-4 h-4" />
          <span>PRINT / SAVE BADGE (PDF)</span>
        </button>

        <Link
          to="/register"
          className="btn-outline-luxe inline-flex items-center gap-2 text-xs py-3 px-6 w-full sm:w-auto"
        >
          <span>NEW REGISTRATION</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
