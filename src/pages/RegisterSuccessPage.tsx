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

  // Try to retrieve registration from router state or fallback to latest local registration
  let registration: RegistrationRecord | undefined = location.state?.registration;

  if (!registration) {
    const all = JSON.parse(localStorage.getItem('yunifest_registrations_v1') || '[]');
    if (all.length > 0) {
      registration = all[0];
    }
  }

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F5C451', '#FDE047', '#06B6D4', '#FFFFFF'],
      });
    } catch (err) {
      // safe fallback
    }
  }, []);

  if (!registration) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#07152F] flex items-center justify-center px-4">
        <div className="text-center p-8 rounded-2xl bg-[#0D2345] border border-slate-700 max-w-md w-full">
          <CheckCircle2 className="w-12 h-12 text-[#F5C451] mx-auto mb-3" />
          <h2 className="font-display font-bold text-xl text-white mb-2">
            No Active Registration Found
          </h2>
          <p className="text-xs text-slate-300 mb-6">
            Please complete the registration form to generate your official festival entry badge.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#07152F] bg-[#F5C451]"
          >
            <span>Go to Registration</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#07152F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Celebration Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Registration Confirmed</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mb-2">
            You're In for <span className="gold-gradient-text">YUNIFEST 2026!</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your registration has been securely logged. Save, print or screenshot the official QR pass below for campus check-in.
          </p>
        </div>

        {/* Digital Pass Card */}
        <PassCard registration={registration} />

        {/* Next Instructions Box */}
        <div className="max-w-2xl mx-auto mt-8 p-6 rounded-2xl bg-[#0D2345] border border-slate-700/80 text-xs sm:text-sm text-slate-300 space-y-3">
          <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2 text-[#F5C451]">
            <ShieldCheck className="w-4 h-4" />
            <span>Check-in Instructions & Guidelines</span>
          </h3>
          <ul className="space-y-2 list-disc list-inside text-slate-300 text-xs leading-relaxed">
            <li>
              <strong>Original Physical ID:</strong> Carry your physical College / University ID card alongside this QR code pass to Campus Gate 1 & 2.
            </li>
            <li>
              <strong>Reporting Time:</strong> Verification desks open from 8:30 AM onwards on December 10, 2026.
            </li>
            <li>
              <strong>Multiple Events:</strong> If you plan to participate in another event, submit a separate registration for that competition.
            </li>
          </ul>

          <div className="pt-2 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
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
