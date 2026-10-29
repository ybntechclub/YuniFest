import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RegistrationRecord } from '../../types/database';
import { Printer, ShieldCheck, Calendar, MapPin, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
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
  });

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
            <div className="w-12 h-12 rounded-2xl bg-white border-[1.5px] border-slate-900 p-2 shadow-sm flex items-center justify-center">
              <img src="/yuni-crest.svg" alt="YBN Emblem" className="w-full h-full object-contain" />
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
              [ OFFICIAL PASS ]
            </span>
            <span className="font-mono text-[11px] font-black px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-400 inline-block mt-1">
              CONFIRMED
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
              LOGGED ON: {new Date(registration.created_at).toLocaleDateString()}
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
              GATE 1 &amp; 2 SCAN
            </span>
          </div>
        </div>

        {/* Selected Event Showcase */}
        <div className="py-6 border-b-[1.5px] border-slate-900/10 space-y-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#2B59FF]">
            REGISTERED EVENT
          </span>
          <h3 className="font-headline font-black text-xl sm:text-2xl text-slate-950 uppercase">
            {registration.event_name}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 pt-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#2B59FF]" />
              <span>DEC 10, 11 &amp; 12, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2B59FF]" />
              <span>YBN University Main Campus, Ranchi</span>
            </div>
          </div>
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
              AFFILIATION:
            </span>
            <span className="font-bold text-slate-800 text-xs block mt-0.5">
              {registration.participant_type === 'ybn_student' ? "YBN Internal Student" : "Visiting College Delegate"}
            </span>
          </div>
        </div>

        {/* Team details or IGN if present */}
        {registration.team_name && (
          <div className="py-4 border-b-[1.5px] border-slate-900/10 font-mono text-xs">
            <span className="text-slate-500 uppercase font-bold text-[10px] block">
              TEAM / PROJECT:
            </span>
            <span className="font-bold text-slate-950">{registration.team_name}</span>
          </div>
        )}

        {registration.event_specific_data?.gameIgn && (
          <div className="py-4 border-b-[1.5px] border-slate-900/10 font-mono text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 uppercase font-bold text-[10px] block">IN-GAME NAME:</span>
              <span className="font-bold text-slate-950">{registration.event_specific_data.gameIgn}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 uppercase font-bold text-[10px] block">GAME CHOICE:</span>
              <span className="font-bold text-[#2B59FF]">{registration.event_specific_data.gameChoice}</span>
            </div>
          </div>
        )}

        {/* Mandatory Physical ID Warning Footer */}
        <div className="pt-6 flex items-start gap-3 bg-[#FEF08A]/30 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 p-6 sm:p-8 border-t-[1.5px] border-slate-900">
          <ShieldCheck className="w-5 h-5 text-slate-950 shrink-0 mt-0.5" />
          <p className="font-display text-xs text-slate-800 leading-relaxed">
            <strong className="text-slate-950 font-bold">MANDATORY CHECK-IN CLAUSE:</strong> Original, physical College / University ID card must be presented alongside this scannable QR badge at Campus Gate 1 &amp; 2.
          </p>
        </div>

      </div>

      {/* Action Buttons: Print / Screenshot / Add Another */}
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
          <span>REGISTER ANOTHER EVENT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
