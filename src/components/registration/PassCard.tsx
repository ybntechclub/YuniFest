import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RegistrationRecord } from '../../types/database';
import { 
  ShieldCheck, Calendar, MapPin, Printer, Download, Sparkles, 
  CheckCircle2, User, Building, QrCode, ArrowRight, ShieldAlert 
} from 'lucide-react';
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
      
      {/* Printable Pass Enclosure */}
      <div
        ref={passRef}
        id="printable-pass"
        className="relative bg-gradient-to-b from-[#0D2345] via-[#091B38] to-[#07152F] border-2 border-[#F5C451] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden print:m-0 print:border-black print:text-black print:bg-white"
      >
        {/* Subtle decorative gold corner ribbons */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5C451]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Pass Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#F5C451]/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#07152F] border border-[#F5C451]/50 p-2 shadow-gold-glow flex items-center justify-center">
              <img src="/yuni-crest.svg" alt="YBN Emblem" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl text-white tracking-wider">
                  YUNIFEST
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#F5C451] text-[#07152F]">
                  2026
                </span>
              </div>
              <p className="text-xs text-slate-300">
                YBN University • Ranchi, Jharkhand
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F5C451] block">
              OFFICIAL ENTRY PASS
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 inline-block mt-0.5">
              Verified & Confirmed
            </span>
          </div>
        </div>

        {/* Pass Center: Big Code & QR */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Registration Reference
            </span>
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#FDE047] tracking-wider">
              {registration.registration_code}
            </div>
            <p className="text-xs text-slate-400">
              Generated on {new Date(registration.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* QR Code Container */}
          <div className="p-3 rounded-2xl bg-white border-2 border-[#F5C451] shadow-lg flex flex-col items-center shrink-0">
            <QRCodeSVG
              value={qrData}
              size={120}
              level="H"
              includeMargin={false}
            />
            <span className="text-[9px] font-mono font-bold text-slate-900 mt-1 uppercase tracking-tighter">
              SCAN AT CHECK-IN
            </span>
          </div>
        </div>

        {/* Event Registered For */}
        <div className="py-5 border-b border-slate-800 space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F5C451]">
            Registered Competition / Showcase
          </span>
          <h3 className="font-display font-extrabold text-xl text-white">
            {registration.event_name || "YUNIFEST 2026 Event"}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F5C451]" />
              <span>Dec 10, 11 & 12, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F5C451]" />
              <span>Campus Gate 1 & 2 Check-in Desk</span>
            </div>
          </div>
        </div>

        {/* Participant Profile Grid */}
        <div className="py-5 grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Participant Name:</span>
            <span className="font-bold text-white text-sm">{registration.full_name}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Participant Category:</span>
            <span className="font-bold text-[#F5C451]">
              {registration.participant_type === 'ybn_student' ? "YBN University Student" : "Other College Delegate"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Institution:</span>
            <span className="font-bold text-slate-200">{registration.institution_name}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Student ID / Roll No:</span>
            <span className="font-mono font-bold text-cyan-300">{registration.student_id_number}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Course / Degree:</span>
            <span className="font-bold text-slate-200">{registration.course} ({registration.academic_year})</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Contact:</span>
            <span className="font-bold text-slate-200">{registration.mobile}</span>
          </div>

          {registration.team_name && (
            <div className="col-span-2 p-2.5 rounded-lg bg-[#07152F] border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Team / Group:</span>
              <span className="font-bold text-[#F5C451]">{registration.team_name}</span>
              {registration.team_details && (
                <p className="text-[11px] text-slate-300 mt-1 whitespace-pre-line">
                  {registration.team_details}
                </p>
              )}
            </div>
          )}

          {registration.event_specific_data?.gameChoice && (
            <div className="col-span-2 p-2.5 rounded-lg bg-[#07152F] border border-cyan-500/30">
              <span className="text-cyan-300 font-bold block">
                Esports Entry: {registration.event_specific_data.gameChoice}
              </span>
              <span className="text-slate-300 text-[11px]">
                IGN: <strong className="text-white">{registration.event_specific_data.gameIgn}</strong> | Player ID: <strong className="text-white">{registration.event_specific_data.gameId}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Mandatory Advisory Footer */}
        <div className="mt-2 p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-200 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#F5C451] shrink-0 mt-0.5" />
          <div>
            <strong>MANDATORY ENTRY REQUIREMENT:</strong> You must carry your original, physical College/University ID card along with this official QR pass to enter the campus. No exceptions permitted.
          </div>
        </div>

      </div>

      {/* Action Bar (Print / Share / Back) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrint}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] via-[#F5C451] to-[#D4A017] hover:brightness-110 shadow-gold-glow"
        >
          <Printer className="w-4 h-4 text-[#07152F]" />
          <span>Print / Save Pass (PDF)</span>
        </button>

        <Link
          to="/register"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 bg-[#0D2345] hover:bg-[#112C57] border border-slate-700 transition-colors"
        >
          <span>Register for Another Event</span>
          <ArrowRight className="w-4 h-4 text-[#F5C451]" />
        </Link>
      </div>

    </div>
  );
};
