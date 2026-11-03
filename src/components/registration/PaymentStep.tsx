import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ParticipantType, EventItem, RegistrationRecord } from '../../types/database';
import { registrationStore } from '../../lib/registrationStore';
import { 
  CreditCard, Copy, Check, Upload, AlertCircle, ArrowLeft, 
  ShieldCheck, Clock, CheckCircle2, QrCode, FileImage, Sparkles 
} from 'lucide-react';

interface PaymentStepProps {
  participantType: ParticipantType;
  selectedEvent: EventItem;
  formData: {
    fullName: string;
    email: string;
    mobile: string;
    institutionName: string;
    institutionLocation?: string;
    department?: string;
    course: string;
    academicYear: string;
    semester?: string;
    studentIdNumber: string;
    idCardConfirmed: boolean;
    participationCategory?: string;
    teamName?: string;
    teamDetails?: string;
    eventSpecificData?: Record<string, any>;
    consent: boolean;
  };
  onBack: () => void;
  onSuccess: (record: RegistrationRecord) => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  participantType,
  selectedEvent,
  formData,
  onBack,
  onSuccess,
}) => {
  // Pricing: Inside YBN University = 399, Outsiders = 499
  const amount = participantType === 'ybn_student' ? 399 : 499;
  const officialUpiId = "ybntechclub@upi";

  const [transactionId, setTransactionId] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamic UPI payment link
  const upiLink = `upi://pay?pa=${officialUpiId}&pn=YUNIFEST%202026&am=${amount}&cu=INR&tn=YUNIFEST-${encodeURIComponent(formData.fullName.replace(/\s+/g, '').slice(0, 10))}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(officialUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file (PNG, JPG, or JPEG) for the payment screenshot.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError("Screenshot image size exceeds 8MB limit. Please upload a smaller image.");
      return;
    }

    setError(null);
    setScreenshotFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!transactionId.trim() || transactionId.trim().length < 6) {
      setError("Please enter a valid Transaction / UTR ID (minimum 6 characters).");
      return;
    }

    if (!screenshotUrl) {
      setError("Please upload a screenshot of your successful UPI payment for verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      const nowIso = new Date().toISOString();
      const result = await registrationStore.submitRegistration({
        event_id: selectedEvent.id,
        participant_type: participantType,
        full_name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        mobile: formData.mobile.trim(),
        institution_name: formData.institutionName.trim(),
        institution_location: formData.institutionLocation?.trim() || "Ranchi, Jharkhand",
        department: formData.department?.trim(),
        course: formData.course.trim(),
        academic_year: formData.academicYear,
        semester: formData.semester,
        student_id_number: formData.studentIdNumber.trim(),
        id_card_confirmed: formData.idCardConfirmed,
        participation_category: formData.participationCategory,
        team_name: formData.teamName?.trim(),
        team_details: formData.teamDetails?.trim(),
        event_specific_data: formData.eventSpecificData,
        consent: formData.consent,
        amount_inr: amount,
        payment_method: 'upi',
        transaction_id: transactionId.trim(),
        payment_screenshot_url: screenshotUrl,
        payment_timestamp: nowIso,
      });

      if (!result.success || !result.data) {
        setError(result.error || "Failed to submit registration. Please try again.");
        setIsSubmitting(false);
        return;
      }

      onSuccess(result.data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while submitting payment details.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto rounded-[32px] border-[1.5px] border-slate-900 bg-white p-6 sm:p-10 shadow-solid-pop text-slate-950 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b-[1.5px] border-slate-900/10 gap-4">
        <div>
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#2B59FF]">
            [ STEP 03 // PAYMENT &amp; VERIFICATION ]
          </span>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-950 mt-1">
            Registration Fee Payment
          </h2>
          <p className="font-display text-xs sm:text-sm text-slate-600 mt-1">
            Pay via UPI QR and upload your transaction receipt for official verification.
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-slate-950 px-3 py-2 rounded-xl bg-[#F6F7F9] border border-slate-300 self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Details</span>
        </button>
      </div>

      {/* Pricing Pill Summary */}
      <div className="p-5 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
            {participantType === 'ybn_student' ? "YBN UNIVERSITY STUDENT TIER" : "VISITING DELEGATE TIER"}
          </span>
          <h3 className="font-headline font-bold text-lg text-slate-950 mt-0.5">
            {selectedEvent.name}
          </h3>
          <p className="font-mono text-xs text-slate-600 mt-0.5">
            Registered for: <strong>{formData.fullName}</strong> ({formData.email})
          </p>
        </div>

        <div className="text-right sm:text-right shrink-0">
          <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">TOTAL PAYABLE:</span>
          <div className="font-headline font-black text-3xl sm:text-4xl text-[#2B59FF] tracking-tight">
            ₹{amount}
          </div>
          <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-bold">
            Standard Festival Delegate Pass
          </span>
        </div>
      </div>

      {/* QR Code & UPI Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center">
        
        {/* UPI QR Display Card */}
        <div className="flex flex-col items-center p-6 rounded-3xl bg-slate-950 text-white border-[1.5px] border-slate-900 shadow-sm relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#CCFF00]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#CCFF00] font-mono text-[10px] font-bold uppercase tracking-wider mb-4">
            <QrCode className="w-3.5 h-3.5" />
            <span>SCAN TO PAY WITH ANY UPI APP</span>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow-inner border border-slate-200">
            <QRCodeSVG
              value={upiLink}
              size={180}
              level="H"
              includeMargin={false}
            />
          </div>

          <div className="mt-4 text-center">
            <span className="font-headline font-extrabold text-2xl text-white">
              ₹{amount}
            </span>
            <span className="block font-mono text-[11px] text-slate-400 mt-0.5">
              Instant UPI Gateway
            </span>
          </div>
        </div>

        {/* UPI ID & Steps */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Official Festival UPI ID:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={officialUpiId}
                className="w-full px-4 py-3 rounded-xl bg-[#F6F7F9] border-[1.5px] border-slate-900 font-mono text-sm font-bold text-slate-950 focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyUpi}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#FEF08A] hover:bg-[#CCFF00] text-slate-950 font-mono text-xs font-bold border-[1.5px] border-slate-900 transition-colors shrink-0 shadow-sm"
              >
                {copiedUpi ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
                <span>{copiedUpi ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#E0E7FF]/60 border border-blue-300 text-xs font-display text-slate-700 space-y-2">
            <h4 className="font-bold text-[#2B59FF] uppercase tracking-wider flex items-center gap-1.5 font-mono text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How to Complete Payment:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed font-sans">
              <li>Open <strong>GPay, PhonePe, Paytm, or BHIM</strong>.</li>
              <li>Scan the QR code or paste UPI ID: <strong>{officialUpiId}</strong>.</li>
              <li>Pay the exact fee amount of <strong>₹{amount}</strong>.</li>
              <li>Copy the <strong>12-digit UTR / Transaction ID</strong> and take a screenshot.</li>
            </ol>
          </div>
        </div>

      </div>

      {/* Verification Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-6 pt-6 border-t-[1.5px] border-slate-900/10">
        
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border-[1.5px] border-red-500 text-red-900 text-xs font-mono flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Submission Incomplete:</strong>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Transaction / UTR ID */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Transaction ID / UTR Number <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="e.g. 430128910482 or UPI Ref / Txn ID"
            className="w-full px-4 py-3 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-sm font-mono font-bold text-slate-950 focus:outline-none transition-colors"
          />
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Enter the 12-digit reference or UTR ID shown in your payment app receipt.
          </p>
        </div>

        {/* Upload Screenshot */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Upload Payment Receipt Screenshot <span className="text-red-600">*</span>
          </label>
          
          <div className="p-6 rounded-2xl border-2 border-dashed border-slate-400 hover:border-slate-900 transition-colors bg-[#F6F7F9] text-center">
            {screenshotUrl ? (
              <div className="space-y-3">
                <div className="max-w-xs mx-auto rounded-xl overflow-hidden border-[1.5px] border-slate-900 shadow-md">
                  <img src={screenshotUrl} alt="Payment Receipt Preview" className="w-full max-h-52 object-contain bg-white" />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
                    ✓ {screenshotFileName || "Receipt Uploaded"}
                  </span>
                  <label className="cursor-pointer text-xs font-mono font-bold text-[#2B59FF] hover:underline">
                    Change Screenshot
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-300 flex items-center justify-center text-slate-600 shadow-sm">
                  <Upload className="w-6 h-6 text-[#2B59FF]" />
                </div>
                <div>
                  <span className="text-xs font-display font-bold text-slate-900 block">
                    Click to upload payment screenshot
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    Supports PNG, JPG, JPEG up to 8MB
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Verification Notice */}
        <div className="p-4 rounded-2xl bg-[#FEF08A]/40 border border-slate-900 text-xs text-slate-800 space-y-1 font-display">
          <div className="flex items-center gap-2 font-headline font-bold text-slate-950 uppercase text-[11px]">
            <Clock className="w-4 h-4 text-[#2B59FF]" />
            <span>Manual Verification Workflow:</span>
          </div>
          <p className="text-slate-700 leading-relaxed text-xs">
            Once submitted, your registration will be set to <strong>Pending Verification</strong>. The Accounts &amp; Payment Desk will manually verify the UTR and timestamp against incoming bank statements. Upon confirmation, your final QR festival badge will be dispatched to <strong>{formData.email}</strong>.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-voltage w-full py-4 text-xs sm:text-sm font-bold uppercase tracking-wider justify-center shadow-solid-pop hover:-translate-y-0.5 transition-all"
          >
            <span>
              {isSubmitting ? "LOGGING PAYMENT & REGISTRATION..." : `SUBMIT PAYMENT FOR VERIFICATION (₹${amount})`}
            </span>
            <CheckCircle2 className="w-4 h-4 ml-1" />
          </button>
        </div>

      </form>

    </div>
  );
};
