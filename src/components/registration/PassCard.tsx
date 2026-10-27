import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RegistrationRecord } from '../../types/database';
import { Printer, ShieldAlert, Calendar, MapPin, ArrowRight } from 'lucide-react';
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
      
      {/* High-End VIP Event Pass */}
      <div
        ref={passRef}
        id="printable-pass"
        className="relative bg-gradient-to-b from-[#0A1224] via-[#050A14] to-[#02050B] border-2 border-[#F5C451] rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden print:m-0 print:border-black print:text-black print:bg-white"
      >
        {/* Subtle corner hologram glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5C451]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#03060E] border border-[#F5C451]/50 p-2 shadow-gold-glow flex items-center justify-center">
              <img src="/yuni-crest.svg" alt="YBN Emblem" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline font-black text-2xl text-white tracking-tight">
                  YUNIFEST
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-[#F5C451] text-[#03060E]">
                  2026
                </span>
              </div>
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                YBN UNIVERSITY • RANCHI, INDIA
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#F5C451] block">
              [ OFFICIAL PASS ]
            </span>
            <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 inline-block mt-1">
              CONFIRMED
            </span>
          </div>
        </div>

        {/* Big Registration Code & QR Badge */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400 block">
              REGISTRATION REFERENCE
            </span>
            <div className="font-headline font-black text-3xl sm:text-4xl text-[#FDE047] tracking-wider">
              {registration.registration_code}
            </div>
            <p className="font-mono text-[11px] text-slate-400">
              LOGGED ON: {new Date(registration.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Scannable High-Contrast QR Code */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#F5C451] shadow-2xl flex flex-col items-center shrink-0">
            <QRCodeSVG
              value={qrData}
              size={130}
              level="H"
              includeMargin={false}
            />
            <span className="font-mono text-[9px] font-bold text-slate-900 mt-1.5 uppercase tracking-tighter">
              GATE 1 & 2 SCAN
            </span>
          </div>
        </div>

        {/* Selected Event Showcase */}
        <div className="py-6 border-b border-white/10 space-y-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#F5C451]">
            [ REGISTERED DISCIPLINE ]
          </span>
          <h3 className="font-headline font-bold text-2xl text-white">
            {registration.event_name || "YUNIFEST 2026 Showcase"}
          </h3>

          <div className="flex flex-wrap items-center gap-5 font-mono text-xs text-slate-300 pt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F5C451]" />
              <span>DECEMBER 10, 11 & 12, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F5C451]" />
              <span>CAMPUS GATE CHECK-IN</span>
            </div>
          </div>
        </div>

        {/* Participant Data Grid */}
        <div className="py-6 grid grid-cols-2 gap-4 text-xs font-display">
          <div>
            <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">Participant Name:</span>
            <span className="font-bold text-white text-base">{registration.full_name}</span>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">Category:</span>
            <span className="font-mono font-bold text-[#F5C451]">
              {registration.participant_type === 'ybn_student' ? "YBN UNIVERSITY STUDENT" : "OTHER COLLEGE DELEGATE"}
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">Institution:</span>
            <span className="font-semibold text-slate-200">{registration.institution_name}</span>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">Student ID / Roll No:</span>
            <span className="font-mono font-bold text-cyan-300">{registration.student_id_number}</span>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">Course & Year:</span>
            <span className="font-semibold text-slate-200">{registration.course} ({registration.academic_year})</span>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">Phone:</span>
            <span className="font-mono text-slate-200">{registration.mobile}</span>
          </div>

          {registration.team_name && (
            <div className="col-span-2 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-mono text-[10px] uppercase text-[#F5C451] block font-bold">Team / Crew Name:</span>
              <span className="font-headline font-bold text-white">{registration.team_name}</span>
              {registration.team_details && (
                <p className="text-xs text-slate-300 mt-1 whitespace-pre-line font-display">
                  {registration.team_details}
                </p>
              )}
            </div>
          )}

          {registration.event_specific_data?.gameChoice && (
            <div className="col-span-2 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
              <span className="font-mono text-[10px] uppercase text-cyan-300 font-bold block">
                Esports Entry: {registration.event_specific_data.gameChoice}
              </span>
              <span className="font-mono text-xs text-slate-300">
                IGN: <strong className="text-white">{registration.event_specific_data.gameIgn}</strong> | ID: <strong className="text-white">{registration.event_specific_data.gameId}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Mandatory Advisory */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 font-mono text-[11px] text-amber-200 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#F5C451] shrink-0 mt-0.5" />
          <div>
            <strong>MANDATORY ENTRY ADVISORY:</strong> You must present your valid original physical College / University ID card along with this pass for physical entry at Gate 1 & 2.
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrint}
          className="btn-voltage w-full sm:w-auto px-8 py-3.5 text-xs font-mono font-bold flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4 text-[#03060E]" />
          <span>PRINT / SAVE AS PDF PASS</span>
        </button>

        <Link
          to="/register"
          className="btn-outline-luxe w-full sm:w-auto px-6 py-3.5 text-xs font-mono flex items-center justify-center gap-2"
        >
          <span>REGISTER ANOTHER EVENT</span>
          <ArrowRight className="w-4 h-4 text-[#F5C451]" />
        </Link>
      </div>

    </div>
  );
};
