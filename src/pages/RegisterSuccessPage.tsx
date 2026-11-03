import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { RegistrationRecord } from '../types/database';
import { PassCard } from '../components/registration/PassCard';
import { CheckCircle2, ArrowRight, Home, Sparkles, ShieldCheck, Clock, AlertCircle, Mail, FileImage, MessageCircle, ExternalLink } from 'lucide-react';
import { isGoogleDriveUrl, getDriveDirectImageUrl, getDrivePreviewUrl, getDriveViewUrl } from '../lib/driveUpload';
import { DEFAULT_WHATSAPP_CHANNEL_URL } from '../lib/emailTemplate';
import { sendRegistrationConfirmationEmail } from '../lib/emailService';
import { registrationStore } from '../lib/registrationStore';

export const RegisterSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isResending, setIsResending] = React.useState(false);
  const [resendStatus, setResendStatus] = React.useState<string | null>(null);

  let registration: RegistrationRecord | undefined = location.state?.registration;
  const localScreenshotUrl = location.state?.localScreenshotUrl;
  const [imgFailed, setImgFailed] = React.useState(false);

  const handleResendEmail = async () => {
    if (!registration) return;
    setIsResending(true);
    setResendStatus(null);
    try {
      const res = await sendRegistrationConfirmationEmail(registration);
      setResendStatus(res.message || 'Confirmation email dispatched!');
    } catch {
      setResendStatus('Failed to send email. Check connection.');
    } finally {
      setIsResending(false);
    }
  };

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

  const isPending = registration.registration_status === 'pending';

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F6F7F9] text-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {isPending ? (
          /* Pending Verification State Card */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-500/40 text-xs font-mono font-bold text-amber-900 uppercase tracking-wider mb-4 shadow-sm">
                <Clock className="w-4 h-4 text-amber-700 animate-spin-slow" />
                <span>Payment Verification Pending</span>
              </div>
              <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-950 tracking-tight uppercase mb-2">
                PAYMENT SUBMITTED //{' '}
                <span className="font-editorial italic font-normal text-[#2B59FF] normal-case text-[1.12em] block sm:inline">
                  Under Accounts Review ~
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-display max-w-xl mx-auto">
                Your payment of <strong>₹{registration.amount_inr || (registration.participant_type === 'ybn_student' ? 399 : 499)}</strong> has been securely logged with Transaction ID <strong>{registration.transaction_id}</strong>.
              </p>
            </div>

            {/* Pending Receipt Card */}
            <div className="bg-white border-[1.5px] border-slate-900 rounded-[32px] p-6 sm:p-8 shadow-solid-pop text-slate-950 space-y-6">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-200 gap-2 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">REGISTRATION CODE:</span>
                  <span className="text-[#2B59FF] font-black text-base">{registration.registration_code}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">STATUS:</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>PENDING VERIFICATION</span>
                  </span>
                </div>
              </div>

              {/* Data Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-[#F6F7F9] p-4 rounded-2xl border border-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px]">PARTICIPANT:</span>
                  <span className="font-bold text-slate-950 text-sm">{registration.full_name}</span>
                  <span className="text-slate-500 block text-[11px] mt-0.5">{registration.institution_name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">EVENT ALLOCATION:</span>
                  <span className="font-bold text-[#2B59FF] text-sm">{registration.event_name}</span>
                  <span className="text-slate-500 block text-[11px] mt-0.5">Tier: {registration.participant_type === 'ybn_student' ? "YBN Internal (₹399)" : "Outside Delegate (₹499)"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">TRANSACTION / UTR ID:</span>
                  <span className="font-bold text-slate-950 text-sm select-all">{registration.transaction_id || "Recorded on submission"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">PAYMENT SUBMISSION TIME:</span>
                  <span className="font-bold text-slate-950 text-xs">
                    {registration.payment_timestamp ? new Date(registration.payment_timestamp).toLocaleString('en-IN') : new Date(registration.created_at).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Screenshot Preview */}
              {(localScreenshotUrl || registration.payment_screenshot_url) && (
                <div className="p-4 rounded-2xl bg-white border border-slate-300 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1.5">
                      <FileImage className="w-3.5 h-3.5 text-[#2B59FF]" />
                      <span>SUBMITTED PAYMENT RECEIPT SCREENSHOT:</span>
                    </span>

                    {isGoogleDriveUrl(registration.payment_screenshot_url) && (
                      <a
                        href={getDriveViewUrl(registration.payment_screenshot_url) || registration.payment_screenshot_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2B59FF] hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open in Drive ↗</span>
                      </a>
                    )}
                  </div>

                  <div className="max-w-sm mx-auto rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-slate-50">
                    {localScreenshotUrl ? (
                      <img 
                        src={localScreenshotUrl} 
                        alt="Submitted receipt preview" 
                        className="w-full max-h-56 object-contain bg-white" 
                      />
                    ) : !imgFailed && isGoogleDriveUrl(registration.payment_screenshot_url) ? (
                      <img 
                        src={getDriveDirectImageUrl(registration.payment_screenshot_url)} 
                        alt="Submitted receipt preview" 
                        referrerPolicy="no-referrer"
                        className="w-full max-h-56 object-contain bg-white" 
                        onError={() => setImgFailed(true)}
                      />
                    ) : isGoogleDriveUrl(registration.payment_screenshot_url) ? (
                      <iframe
                        src={getDrivePreviewUrl(registration.payment_screenshot_url)}
                        title="Google Drive Receipt Preview"
                        className="w-full h-56 border-0"
                        allow="autoplay"
                      />
                    ) : (
                      <img 
                        src={registration.payment_screenshot_url} 
                        alt="Submitted receipt preview" 
                        className="w-full max-h-56 object-contain bg-white" 
                      />
                    )}
                  </div>
                  <p className="text-[10.5px] text-slate-500 text-center">
                    Saved to Official YUNIFEST 2026 Google Drive receipts repository.
                  </p>
                </div>
              )}

              {/* WhatsApp Channel Card (Neon Green Box from Template) */}
              <div className="p-5 rounded-2xl bg-[#062319] border-2 border-[#10B981] text-center shadow-lg text-white space-y-3">
                <div className="inline-flex items-center gap-1.5 font-headline font-bold text-sm text-[#34D399]">
                  <MessageCircle className="w-4 h-4 text-[#10B981]" />
                  <span>Join Official YUNIFEST 2026 WhatsApp Channel</span>
                </div>
                <p className="text-xs text-emerald-200/90 font-display max-w-md mx-auto leading-relaxed">
                  Get live event alerts, reporting slots, presentation guidelines, and instant announcements directly on WhatsApp!
                </p>
                <div>
                  <a
                    href={DEFAULT_WHATSAPP_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#10B981] hover:bg-emerald-400 text-slate-950 font-headline font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
                  >
                    <span>📲 Join WhatsApp Channel Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Official Organizing Committee Info */}
              <div className="p-4 rounded-2xl bg-white border border-slate-300 text-xs font-mono space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  OFFICIAL ISSUING BODY:
                </div>
                <div className="font-bold text-slate-950 text-sm">
                  YUNIFEST 2026 Organizing Committee
                </div>
                <div className="text-[11px] text-slate-500">
                  YBN University Campus • Namkum, Ranchi, Jharkhand
                </div>
                <p className="text-[10.5px] text-slate-600 pt-1 border-t border-slate-200 mt-2">
                  Keep your Registration Token handy for check-in and delegate pass collection on event day.
                </p>
              </div>

              {/* Email Sent Notice & Resend Action */}
              <div className="flex flex-wrap items-center justify-between p-3.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-mono gap-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-[#2B59FF]" />
                  <span>Confirmation email sent to <strong>{registration.email}</strong> with Token <strong>{registration.registration_code}</strong></span>
                </div>
                <button
                  type="button"
                  disabled={isResending}
                  onClick={handleResendEmail}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-400 hover:border-slate-900 text-slate-900 font-bold text-[11px] transition-colors"
                >
                  {isResending ? 'Sending...' : 'Resend Email'}
                </button>
              </div>
              {resendStatus && (
                <p className="font-mono text-xs text-center text-emerald-700">{resendStatus}</p>
              )}

              <div className="text-center pt-2">
                <Link
                  to="/"
                  className="btn-voltage inline-flex items-center gap-2 text-xs py-3 px-6"
                >
                  <Home className="w-4 h-4" />
                  <span>Return to Festival Homepage</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Confirmed Registration Pass Card */
          <>
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-900 uppercase tracking-wider mb-4 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Payment Verified &amp; Confirmed</span>
              </div>
              <h1 className="font-headline font-black text-3xl sm:text-5xl text-slate-950 tracking-tight uppercase mb-2">
                YOU'RE IN FOR{' '}
                <span className="font-editorial italic font-normal text-[#2B59FF] normal-case text-[1.15em] block sm:inline">
                  YUNIFEST 2026 ~
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-display">
                Your payment and registration have been verified. Save, print or screenshot your official QR pass below for campus check-in.
              </p>
            </div>

            {/* Digital Pass Card */}
            <PassCard registration={registration} />
          </>
        )}

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
