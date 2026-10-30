import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { RegistrationRecord } from '../types/database';
import { PassCard } from '../components/registration/PassCard';
import { CheckCircle2, ArrowRight, Home, Sparkles, ShieldCheck } from 'lucide-react';
import { registrationStore } from '../lib/registrationStore';

export const RegisterSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let registration: RegistrationRecord | undefined = location.state?.registration;

  if (!registration) {
    const all = JSON.parse(localStorage.getItem('yunifest_registrations_v1') || '[]');
    if (all.length > 0) {
      registration = all[0];
    }
  }

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2B59FF', '#FEF08A', '#0F172A', '#6EE7B7'],
      });
    } catch (err) {
      // safe fallback
    }
  }, []);

  if (!registration) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#F6F7F9] text-slate-950 flex items-center justify-center px-4">
        <div className="text-center p-8 rounded-[30px] bg-white border-[1.5px] border-slate-900 shadow-solid-pop max-w-md w-full">
          <CheckCircle2 className="w-12 h-12 text-[#2B59FF] mx-auto mb-3" />
          <h2 className="font-headline font-black text-xl text-slate-950 mb-2">
            No Active Registration Found
          </h2>
          <p className="text-xs text-slate-600 mb-6 font-display">
            Please complete the registration form to generate your official festival entry badge.
          </p>
          <Link
            to="/register"
            className="btn-voltage text-xs inline-flex items-center gap-2 py-3 px-6"
          >
            <span>Go to Registration</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F6F7F9] text-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Celebration Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-900 uppercase tracking-wider mb-4 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Registration Confirmed</span>
          </div>
          <h1 className="font-headline font-black text-3xl sm:text-5xl text-slate-950 tracking-tight uppercase mb-2">
            YOU'RE IN FOR{' '}
            <span className="font-script text-[#2B59FF] normal-case text-[1.15em] font-bold block sm:inline">
              YUNIFEST 2026 ~
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-display">
            Your registration has been securely logged. Save, print or screenshot the official QR pass below for campus check-in.
          </p>
        </div>

        {/* Digital Pass Card */}
        <PassCard registration={registration} />

        {/* Instructions Box */}
        <div className="max-w-2xl mx-auto mt-8 p-6 sm:p-8 rounded-[28px] bg-white border-[1.5px] border-slate-900 text-xs sm:text-sm text-slate-700 space-y-3 shadow-sm">
          <h3 className="font-headline font-bold text-slate-950 text-sm uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2B59FF]" />
            <span>Check-in Instructions &amp; Guidelines</span>
          </h3>
          <ul className="space-y-2 list-disc list-inside text-slate-600 text-xs leading-relaxed font-display">
            <li>
              <strong className="text-slate-950">Original Physical ID:</strong> Carry your physical College / University ID card alongside this QR code pass to Campus Gate 1 &amp; 2.
            </li>
            <li>
              <strong className="text-slate-950">Reporting Time:</strong> Verification desks open from 8:30 AM onwards on December 10, 2026.
            </li>
            <li>
              <strong className="text-slate-950">Multiple Events:</strong> If you plan to participate in another event, submit a separate registration for that competition.
            </li>
          </ul>

          <div className="pt-2 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-950 font-bold font-mono transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Festival Home</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
