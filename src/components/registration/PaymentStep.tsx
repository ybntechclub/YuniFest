import React, { useState } from 'react';
import { ParticipantType, EventItem, RegistrationRecord } from '../../types/database';
import { registrationStore } from '../../lib/registrationStore';
import { uploadReceiptToGoogleDrive } from '../../lib/driveUpload';
import { sendRegistrationConfirmationEmail } from '../../lib/emailService';
import { 
  CreditCard, Copy, Check, Upload, AlertCircle, ArrowLeft, 
  ShieldCheck, Clock, CheckCircle2, QrCode, FileImage, Sparkles,
  FileText, Smartphone, ExternalLink
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
  onSuccess: (record: RegistrationRecord, localPreviewUrl?: string) => void;
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
  const officialUpiId = "conference123@fbl";
  const beneficiaryName = "CONFERENCE AND SEMINAR YBN UNIVERSITY";
  const partnerBank = "Federal Bank";

  const [transactionId, setTransactionId] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamic UPI payment link matching the exact NPCI standard decoded from the official Federal Bank QR
  const upiLink = `upi://pay?pa=${officialUpiId}&pn=${encodeURIComponent(beneficiaryName)}&am=${amount}&cu=INR&tn=YUNIFEST-${encodeURIComponent(formData.fullName.replace(/\s+/g, '').slice(0, 10))}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(officialUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1200;
            const MAX_HEIGHT = 1200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width = Math.round((width * MAX_HEIGHT) / height);
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.8);
            resolve(compressed);
          } catch {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Robust image verification: handles mobile galleries, WhatsApp downloads, and standard pickers
    const isImage = (file.type && file.type.startsWith('image/')) || 
      /\.(jpe?g|png|webp|gif|bmp|heic|heif)$/i.test(file.name);

    if (!isImage) {
      setError("Please upload an image file (PNG, JPG, or JPEG) for the payment screenshot.");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError("Screenshot image size exceeds 25MB limit. Please upload a smaller image.");
      return;
    }

    setError(null);
    setScreenshotFileName(file.name);

    // Instant local preview (synchronous 0ms visual display)
    let localObjUrl = '';
    try {
      localObjUrl = URL.createObjectURL(file);
      setPreviewUrl(localObjUrl);
    } catch {
      // fallback
    }

    setIsCompressing(true);

    try {
      const compressedDataUrl = await compressImage(file);
      setScreenshotUrl(compressedDataUrl);
      if (!localObjUrl) {
        setPreviewUrl(compressedDataUrl);
      }
    } catch {
      const reader = new FileReader();
      reader.onloadend = () => {
        const res = reader.result as string;
        setScreenshotUrl(res);
        if (!localObjUrl) {
          setPreviewUrl(res);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!transactionId.trim() || transactionId.trim().length < 6) {
      setError("Please enter a valid Transaction / UTR ID (minimum 6 characters).");
      return;
    }

    if (!screenshotUrl && !previewUrl) {
      setError("Please upload a screenshot of your successful UPI payment for verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      const nowIso = new Date().toISOString();

      // Upload screenshot to Google Drive and let Apps Script send confirmation email directly (once only)
      let finalScreenshotUrl = screenshotUrl;
      if (screenshotUrl) {
        finalScreenshotUrl = await uploadReceiptToGoogleDrive({
          base64: screenshotUrl,
          email: formData.email.trim(),
          transactionId: transactionId.trim(),
          fullName: formData.fullName.trim(),
          eventName: selectedEvent.name,
          studentIdNumber: formData.studentIdNumber.trim(),
          institutionName: formData.institutionName.trim(),
          amountInr: amount,
          participationCategory: formData.participationCategory,
          sendEmail: true,
        });
      }

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
        payment_screenshot_url: finalScreenshotUrl || undefined,
        payment_timestamp: nowIso,
      });

      if (!result.success || !result.data) {
        setError(result.error || "Failed to submit registration. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Note: Confirmation email is dispatched directly and once by Google Apps Script on receipt upload
      // Client-side duplicate email trigger removed to prevent double emails and spam flagging.

      const localReceiptPreview = previewUrl || screenshotUrl || undefined;
      onSuccess(result.data, localReceiptPreview);
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
            Official merchant payment gateway via Federal Bank UPI.
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
            Verified Pass Entry Fee
          </span>
        </div>
      </div>

      {/* QR Code & UPI Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
        
        {/* Official Federal Bank UPI QR Display Card */}
        <div className="flex flex-col items-center p-6 rounded-3xl bg-slate-950 text-white border-[1.5px] border-slate-900 shadow-sm relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#CCFF00]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#CCFF00] font-mono text-[10px] font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span>FEDERAL BANK MERCHANT QR</span>
          </div>

          {/* Authentic High-Resolution QR Code Extracted Directly from Federal Bank PDF */}
          <div className="p-3 bg-white rounded-2xl shadow-inner border-[1.5px] border-slate-300 relative group">
            <img 
              src="/official-upi-qr.png" 
              alt="Official Federal Bank UPI QR Code" 
              className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg"
            />
          </div>

          {/* Payee Info Box */}
          <div className="mt-3 text-center w-full px-2">
            <span className="font-mono text-[11px] text-slate-300 font-bold block truncate" title={beneficiaryName}>
              {beneficiaryName}
            </span>
            <span className="font-mono text-xs text-emerald-400 font-black tracking-wider block mt-0.5">
              {officialUpiId}
            </span>
            <div className="mt-2 inline-flex items-center gap-1.5 font-headline font-black text-2xl text-white">
              <span>₹{amount}</span>
              <span className="text-xs font-mono text-slate-400 font-normal">INR</span>
            </div>
          </div>

          {/* Direct Mobile UPI App & Full Poster Actions */}
          <div className="mt-4 flex flex-col w-full gap-2 pt-2 border-t border-white/10">
            <a
              href={upiLink}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2B59FF] hover:bg-blue-600 text-white font-mono text-xs font-bold transition-all shadow-sm active:scale-95 sm:hidden"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>TAP TO PAY IN UPI APP</span>
            </a>

            <a
              href="/federal-bank-upi-qr.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-[#CCFF00] transition-colors py-1"
              title="Open Official Federal Bank Payment Standee PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Official Bank Standee (PDF) ↗</span>
            </a>
          </div>
        </div>

        {/* UPI ID & Steps */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Official Festival UPI ID:
              </label>
              <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-bold">
                ✓ VERIFIED
              </span>
            </div>
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

          {/* Account Verified Details Pill */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs font-mono space-y-1.5">
            <div className="flex justify-between items-start gap-2">
              <span className="text-slate-500 shrink-0">Beneficiary:</span>
              <span className="font-bold text-slate-950 text-right leading-tight">
                {beneficiaryName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Partner Bank:</span>
              <span className="font-bold text-slate-950">{partnerBank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Supported:</span>
              <span className="font-bold text-slate-950">GPay, PhonePe, Paytm, BHIM, UPI</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#E0E7FF]/60 border border-blue-300 text-xs font-display text-slate-700 space-y-2">
            <h4 className="font-bold text-[#2B59FF] uppercase tracking-wider flex items-center gap-1.5 font-mono text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How to Complete Payment:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed font-sans text-xs">
              <li>Open <strong>Google Pay, PhonePe, Paytm, or BHIM</strong>.</li>
              <li>Scan the Federal Bank QR code or pay to: <strong>{officialUpiId}</strong>.</li>
              <li>Verify beneficiary shows as <strong>{beneficiaryName}</strong>.</li>
              <li>Pay the exact fee amount of <strong>₹{amount}</strong>.</li>
              <li>Copy the <strong>12-digit UTR / Transaction ID</strong> and take a screenshot of the receipt.</li>
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
            onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
            placeholder="e.g. 430128910482 or UPI Ref / Txn ID"
            className="w-full px-4 py-3 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-sm font-mono font-bold text-slate-950 focus:outline-none transition-colors"
          />
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Must be a unique 12-digit UTR or bank reference ID. Reused or duplicate UTRs are strictly rejected.
          </p>
        </div>

        {/* Upload Screenshot */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Upload Payment Receipt Screenshot <span className="text-red-600">*</span>
          </label>
          
          <div className="p-6 rounded-2xl border-2 border-dashed border-slate-400 hover:border-slate-900 transition-colors bg-[#F6F7F9] text-center">
            {(previewUrl || screenshotUrl) ? (
              <div className="space-y-3">
                <div className="relative max-w-xs mx-auto rounded-xl overflow-hidden border-[1.5px] border-slate-900 shadow-md bg-white">
                  <img 
                    src={previewUrl || screenshotUrl || ''} 
                    alt="Payment Receipt Preview" 
                    className="w-full max-h-56 object-contain bg-slate-50" 
                  />
                  <div className="absolute top-2 right-2">
                    <span className="font-mono text-[9px] font-black uppercase tracking-wider bg-slate-950/80 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                      ✓ Preview
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-[180px]">{screenshotFileName || "Receipt Selected"}</span>
                  </span>

                  {isCompressing && (
                    <span className="font-mono text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 animate-pulse">
                      Optimizing for upload...
                    </span>
                  )}

                  <label className="cursor-pointer text-xs font-mono font-bold text-[#2B59FF] hover:underline px-2 py-1">
                    Change Screenshot
                    <input
                      type="file"
                      accept="image/*,.heic,.heif"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl(null);
                      setScreenshotUrl(null);
                      setScreenshotFileName('');
                    }}
                    className="text-xs font-mono font-bold text-red-600 hover:text-red-800 px-2 py-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center space-y-2 py-3">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-300 flex items-center justify-center text-slate-600 shadow-sm hover:scale-105 transition-transform">
                  <Upload className="w-7 h-7 text-[#2B59FF]" />
                </div>
                <div>
                  <span className="text-sm font-display font-bold text-slate-900 block">
                    Click to upload payment screenshot
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 block mt-0.5">
                    Supports PNG, JPG, JPEG, WEBP from your phone or gallery
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*,.heic,.heif"
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
            Once submitted, your registration will be set to <strong>Pending Verification</strong>. The Accounts &amp; Payment Desk will manually verify the UTR and timestamp against incoming Federal Bank statements. Upon confirmation, your final QR festival badge will be dispatched to <strong>{formData.email}</strong>.
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
