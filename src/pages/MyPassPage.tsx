import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { registrationStore } from '../lib/registrationStore';
import { RegistrationRecord } from '../types/database';
import { 
  AlertCircle, Loader2, ArrowRight, Mail, FileCheck2, RefreshCw,
  Download, User, CheckCircle2, Ticket, HelpCircle, ShieldCheck, Printer
} from 'lucide-react';

export const MyPassPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') || searchParams.get('code') || '';
  const initialEmail = searchParams.get('email') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [isSearching, setIsSearching] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [passRecord, setPassRecord] = useState<RegistrationRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handle Pass Lookup by Name and/or Email with broad tolerance for non-technical users
  const handleCheckPass = async () => {
    setErrorMsg(null);
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName && !cleanEmail) {
      setErrorMsg('Please enter your Name or Email Address to find your pass.');
      return;
    }

    setIsSearching(true);
    setSearched(true);

    try {
      // 1. Primary search by Name and Email
      let record = await registrationStore.getRegistrationByNameAndEmail(cleanName, cleanEmail);
      
      // 2. Tolerance fallback: check if user typed their mobile number or code in either field
      if (!record && cleanName) {
        record = await registrationStore.getRegistrationByReference(cleanName);
      }
      if (!record && cleanEmail) {
        record = await registrationStore.getRegistrationByReference(cleanEmail);
      }

      setPassRecord(record);
      if (record) {
        setSearchParams({ ref: record.registration_code });
      }
    } catch (err: any) {
      console.error('Error querying pass:', err);
      setErrorMsg('Network error connecting to university records. Please try again.');
      setPassRecord(null);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      setIsSearching(true);
      setSearched(true);
      registrationStore.getRegistrationByReference(initialRef)
        .then(rec => {
          setPassRecord(rec);
          if (rec) {
            setName(rec.full_name);
            setEmail(rec.email);
          }
        })
        .catch(() => {})
        .finally(() => setIsSearching(false));
    }
  }, [initialRef]);

  // Sample placeholder record for realistic visual preview before search
  const displayRecord: RegistrationRecord = passRecord || {
    id: 'sample-preview',
    registration_code: 'YUNI-2026-VIP',
    full_name: name.trim() || 'Attendee Name',
    email: email.trim() || 'attendee@example.com',
    mobile: '9876543210',
    participant_type: 'ybn_student',
    institution_name: 'YBN University, Ranchi',
    course: 'B.Tech / Degree',
    academic_year: '2024-2028',
    student_id_number: 'YBN/2026/ENROLL-01',
    id_card_confirmed: true,
    event_id: 'sample',
    event_name: '3-Day All-Access Pass',
    consent: true,
    amount_inr: 399,
    registration_status: 'confirmed',
    transaction_id: 'UPI-SAMPLE-8910',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const qrData = JSON.stringify({
    code: displayRecord.registration_code,
    name: displayRecord.full_name,
    email: displayRecord.email,
    enroll: displayRecord.student_id_number,
    status: displayRecord.registration_status,
    fest: 'YUNIFEST 2026',
  });

  // Cross-browser rounded rectangle helper for HTML5 Canvas
  const drawRoundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    ctx.beginPath();
    if (typeof (ctx as any).roundRect === 'function') {
      (ctx as any).roundRect(x, y, w, h, r);
    } else {
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    }
  };

  // High-Resolution Standalone Pass ID Card Image Downloader (Matches media_1795625261756_4f39acd3.png strictly)
  const handleDownloadImage = async () => {
    try {
      setIsDownloading(true);
      const canvas = document.createElement('canvas');
      const cardWidth = 1120;
      const cardHeight = 700;
      const shadowOffset = 18;
      const canvasWidth = cardWidth + shadowOffset + 80;
      const canvasHeight = cardHeight + shadowOffset + 80;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const cardX = 40;
      const cardY = 40;
      const radius = 40;

      // 1. Draw Solid Dark Shadow for the Card (offset-x: +18, offset-y: +18)
      ctx.save();
      drawRoundRect(ctx, cardX + shadowOffset, cardY + shadowOffset, cardWidth, cardHeight, radius);
      ctx.fillStyle = '#0F172A';
      ctx.fill();
      ctx.restore();

      // 2. Draw Card Body
      ctx.save();
      drawRoundRect(ctx, cardX, cardY, cardWidth, cardHeight, radius);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#0F172A';
      ctx.stroke();
      ctx.clip(); // clip contents inside card

      // Soft yellow decorative radial glow at top right
      const glowGrad = ctx.createRadialGradient(
        cardX + cardWidth,
        cardY,
        10,
        cardX + cardWidth,
        cardY,
        450
      );
      glowGrad.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
      glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(cardX, cardY, cardWidth, cardHeight);

      // 3. Draw Header: Logo & Branding
      // Load YBN Logo Image
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      logoImg.src = '/ybn-logo.png';
      await new Promise((resolve) => {
        if (logoImg.complete) resolve(null);
        else {
          logoImg.onload = () => resolve(null);
          logoImg.onerror = () => resolve(null);
        }
      });

      // Logo Circular Badge
      const logoSize = 64;
      const logoX = cardX + 52;
      const logoY = cardY + 46;
      ctx.save();
      ctx.beginPath();
      ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#0F172A';
      ctx.stroke();
      ctx.clip();
      if (logoImg.width > 0) {
        ctx.drawImage(logoImg, logoX + 2, logoY + 2, logoSize - 4, logoSize - 4);
      }
      ctx.restore();

      // Brand Name: YUNIFEST (Header: Source Serif 4)
      ctx.fillStyle = '#0F172A';
      ctx.font = "bold 34px 'Source Serif 4', Georgia, serif";
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('YUNIFEST', cardX + 132, cardY + 80);

      // Subtitle: YBN UNIVERSITY • RANCHI (Subheading: Roboto Bold)
      ctx.fillStyle = '#64748B';
      ctx.font = "700 13px 'Roboto', sans-serif";
      ctx.fillText('YBN UNIVERSITY  •  RANCHI', cardX + 132, cardY + 104);

      // VIP Pass Pill Badge (Top Right - Subheading: Roboto Bold)
      const badgeW = 200;
      const badgeH = 44;
      const badgeX = cardX + cardWidth - badgeW - 52;
      const badgeY = cardY + 48;
      ctx.save();
      drawRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 22);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#0F172A';
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.font = "700 14px 'Roboto', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText('VIP 3-DAY PASS', badgeX + badgeW / 2, badgeY + 28);
      ctx.restore();

      // 4. Attendee Details (Left Column)
      ctx.textAlign = 'left';

      // NAME : (Subheading: Roboto Bold)
      ctx.fillStyle = '#64748B';
      ctx.font = "700 14px 'Roboto', sans-serif";
      ctx.fillText('NAME :', cardX + 52, cardY + 175);

      // Attendee Name (Header: Source Serif 4)
      ctx.fillStyle = '#0A367B';
      ctx.font = "bold 34px 'Source Serif 4', Georgia, serif";
      const attendeeName = displayRecord.full_name || 'Attendee Name';
      ctx.fillText(attendeeName, cardX + 52, cardY + 220);

      // EMAIL : (Subheading: Roboto Bold)
      ctx.fillStyle = '#64748B';
      ctx.font = "700 14px 'Roboto', sans-serif";
      ctx.fillText('EMAIL :', cardX + 52, cardY + 275);

      // Email text (Body: Roboto Regular)
      ctx.fillStyle = '#0F172A';
      ctx.font = "400 19px 'Roboto', sans-serif";
      ctx.fillText(displayRecord.email || 'attendee@example.com', cardX + 52, cardY + 310);

      // ENROLL ID : (Subheading: Roboto Bold)
      ctx.fillStyle = '#64748B';
      ctx.font = "700 14px 'Roboto', sans-serif";
      ctx.fillText('ENROLL ID :', cardX + 52, cardY + 365);

      // Enroll ID text (Subheading: Roboto Bold)
      ctx.fillStyle = '#0284C7';
      ctx.font = "700 19px 'Roboto', sans-serif";
      ctx.fillText(displayRecord.student_id_number || 'YBN/2026/ENROLL-01', cardX + 52, cardY + 400);

      // Verified Badge Pill (Subheading: Roboto Bold)
      const pillW = 340;
      const pillH = 48;
      const pillX = cardX + 52;
      const pillY = cardY + 445;
      ctx.save();
      drawRoundRect(ctx, pillX, pillY, pillW, pillH, 14);
      ctx.fillStyle = '#ECFDF5';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#10B981';
      ctx.stroke();

      // Green Checkmark icon in badge
      const checkCx = pillX + 26;
      const checkCy = pillY + 24;
      ctx.beginPath();
      ctx.arc(checkCx, checkCy, 10, 0, Math.PI * 2);
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(checkCx - 4.5, checkCy - 0.5);
      ctx.lineTo(checkCx - 1, checkCy + 3.5);
      ctx.lineTo(checkCx + 5, checkCy - 3.5);
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text: PAID: ₹399 • VERIFIED (Subheading: Roboto Bold)
      ctx.fillStyle = '#065F46';
      ctx.font = "700 15px 'Roboto', sans-serif";
      ctx.fillText(`PAID: ₹${displayRecord.amount_inr} • VERIFIED`, pillX + 48, pillY + 30);
      ctx.restore();

      // 5. QR Code Box (Right Column)
      const qrBoxW = 320;
      const qrBoxH = 345;
      const qrBoxX = cardX + cardWidth - qrBoxW - 52;
      const qrBoxY = cardY + 150;

      ctx.save();
      drawRoundRect(ctx, qrBoxX, qrBoxY, qrBoxW, qrBoxH, 24);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#0F172A';
      ctx.stroke();

      // Copy QR pixels from rendered QRCodeCanvas
      const qrCanvas = document.getElementById('pass-qr-canvas') as HTMLCanvasElement;
      if (qrCanvas) {
        const qrDisplaySize = 225;
        const qrDispX = qrBoxX + (qrBoxW - qrDisplaySize) / 2;
        const qrDispY = qrBoxY + 35;
        ctx.drawImage(qrCanvas, qrDispX, qrDispY, qrDisplaySize, qrDisplaySize);
      }

      // Label: GATE QR BAR (Subheading: Roboto Bold)
      ctx.fillStyle = '#0F172A';
      ctx.font = "700 15px 'Roboto', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText('GATE QR BAR', qrBoxX + qrBoxW / 2, qrBoxY + 312);
      ctx.restore();

      // 6. Dashed Perforated Divider Line
      ctx.save();
      ctx.setLineDash([12, 10]);
      ctx.beginPath();
      ctx.moveTo(cardX + 52, cardY + 545);
      ctx.lineTo(cardX + cardWidth - 52, cardY + 545);
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // 7. Footer: Reference Code & Festival Dates
      // Left: REF (Subheading: Roboto Bold)
      ctx.fillStyle = '#0A367B';
      ctx.font = "700 17px 'Roboto', sans-serif";
      ctx.textAlign = 'left';
      ctx.fillText(`REF: ${displayRecord.registration_code}`, cardX + 52, cardY + 605);

      // Right: Dates (Body: Roboto Regular)
      ctx.fillStyle = '#475569';
      ctx.font = "400 17px 'Roboto', sans-serif";
      ctx.textAlign = 'right';
      ctx.fillText('DEC 10, 11 & 12, 2026', cardX + cardWidth - 52, cardY + 605);

      ctx.restore(); // restore clipping

      // 8. Trigger PNG image download (Strictly the ID card image!)
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `yunifest-pass-${displayRecord.registration_code}.png`;
      downloadLink.href = dataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error('Error generating pass image:', err);
      // Fallback
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 bg-[#F6F7F9] text-slate-950 relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[1.5px] border-slate-900 text-xs font-roboto font-bold text-slate-900 uppercase tracking-wider mb-3 shadow-xs">
            <Ticket className="w-3.5 h-3.5 text-[#0A367B]" />
            <span>Digital Festival Pass Portal</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-700 font-bold">Instant Pass Retrieval</span>
          </div>

          <h1 className="font-sourceserif font-bold text-2xl sm:text-3xl md:text-4xl text-slate-950 tracking-tight mb-2 uppercase">
            MY FESTIVAL <span className="text-[#0A367B]">PASS</span>
          </h1>
          <p className="font-roboto font-normal text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Enter your registered Name and Email to view and download your official YUNIFEST 2026 entry pass.
          </p>
        </div>

        {/* 2-Column Balanced Landscape Layout (Left: Landscape Input Form -> Right: Right-Tilted Pass + Stable Button) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (6 cols): Landscape Input Card designed for easy non-technical use */}
          <div className="lg:col-span-6 space-y-3">
            <div className="bg-white rounded-3xl border-[2px] border-slate-800 p-6 sm:p-8 md:p-9 shadow-solid-pop">
              
              <div className="mb-6 pb-3 border-b border-slate-200/80">
                <span className="font-roboto text-[11px] uppercase font-bold tracking-widest text-[#0A367B] block mb-1">
                  [ PASS VERIFICATION ]
                </span>
                <h3 className="font-sourceserif font-bold text-xl sm:text-2xl text-slate-950 uppercase">
                  ENTER PASS DETAILS
                </h3>
                <p className="font-roboto font-normal text-xs text-slate-500 mt-1">
                  Fill in your registered name or email to view your pass and gate QR code.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCheckPass();
                }}
                className="space-y-4"
              >
                {/* Full Name Input Field */}
                <div>
                  <label className="block font-roboto text-xs uppercase font-bold tracking-wider text-slate-900 mb-1.5 flex items-center justify-between">
                    <span>NAME :</span>
                    <span className="font-roboto text-[11px] text-slate-400 normal-case font-normal">As registered</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter registered full name"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 focus:border-[#0A367B] focus:bg-white text-sm text-slate-950 font-roboto font-normal focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                    />
                    <User className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Email Address Input Field */}
                <div>
                  <label className="block font-roboto text-xs uppercase font-bold tracking-wider text-slate-900 mb-1.5 flex items-center justify-between">
                    <span>EMAIL :</span>
                    <span className="font-roboto text-[11px] text-slate-400 normal-case font-normal">Where you received confirmation</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter registered email address"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 focus:border-[#0A367B] focus:bg-white text-sm text-slate-950 font-roboto font-normal focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                    />
                    <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Friendly Error Note */}
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Large Obvious Check Pass Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="btn-voltage w-full py-4 text-xs sm:text-sm justify-center font-black uppercase tracking-wider shadow-solid-pop hover:scale-[1.01] active:scale-95 transition-all inline-flex items-center gap-2"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>VERIFYING PASS RECORDS...</span>
                      </>
                    ) : (
                      <>
                        <FileCheck2 className="w-4 h-4" />
                        <span>CHECK PASS</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Reset Option */}
              {searched && (
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setName('');
                      setEmail('');
                      setSearched(false);
                      setPassRecord(null);
                      setErrorMsg(null);
                      setSearchParams({});
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#F6F7F9] hover:bg-slate-200 border border-slate-900 text-xs font-mono font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>RESET &amp; CHECK ANOTHER PERSON</span>
                  </button>
                </div>
              )}

              {/* Verified with Database Notes */}
              <div className="mt-5 pt-4 border-t border-slate-200/80 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified with YBN University Live Database</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <HelpCircle className="w-4 h-4 text-[#0A367B] shrink-0" />
                  <span>You can also enter your 10-digit mobile number in the email field.</span>
                </div>
              </div>
            </div>

            {/* Error Message when Not Found */}
            {searched && !isSearching && !passRecord && (
              <div className="p-5 rounded-2xl bg-white border-[2px] border-red-500 shadow-sm text-center space-y-2">
                <p className="font-headline font-bold text-xs text-red-600 uppercase">
                  No Registration Found for "{name || email}"
                </p>
                <p className="font-display text-xs text-slate-600">
                  Please verify spelling or register for your official 3-day festival pass below.
                </p>
                <Link
                  to="/register"
                  className="btn-voltage inline-flex items-center gap-1.5 text-xs py-2.5 px-4 mt-1"
                >
                  <span>REGISTER FOR FESTIVAL PASS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Right Column (6 cols): Pass Card Tilted to the RIGHT with a completely STABLE Download Button */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center py-4 lg:py-6">
            
            {/* The Compact Pass Card tilted specifically to the RIGHT (Clockwise +6deg on desktop) */}
            <div className="relative w-full max-w-[530px] transform lg:rotate-6 xl:rotate-7 lg:hover:rotate-0 transition-transform duration-500 ease-out origin-center">
              
              <div
                id="printable-pass"
                className="relative bg-white border-[2.5px] border-slate-900 rounded-[28px] p-5 sm:p-6 shadow-solid-pop-lg overflow-hidden text-slate-950 print:m-0 print:border-black print:text-black print:bg-white print:transform-none"
              >
                {/* Decorative soft glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FEF08A]/45 rounded-full blur-2xl pointer-events-none" />

                {/* Top Bar: YUNIFEST Branding */}
                <div className="flex items-center justify-between pb-3.5 border-b-[1.5px] border-slate-900/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white border-[1.5px] border-slate-900 p-0.5 shadow-xs flex items-center justify-center overflow-hidden">
                      <img src="/ybn-logo.png" alt="YBN Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="font-headline font-black text-lg text-slate-950 tracking-tight block leading-none">
                        YUNIFEST
                      </span>
                      <span className="font-mono text-[8.5px] text-slate-500 uppercase tracking-widest font-bold">
                        YBN UNIVERSITY • RANCHI
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] font-bold px-3 py-1 rounded-full bg-white text-slate-950 border-[1.5px] border-slate-900 shadow-2xs">
                    VIP 3-DAY PASS
                  </span>
                </div>

                {/* Pass Details & QR Code Grid (Compact Height matching screenshot) */}
                <div className="py-4 grid grid-cols-12 gap-3 sm:gap-4 items-center">
                  
                  {/* Left Side: Name, Email, Enroll */}
                  <div className="col-span-8 space-y-2">
                    {/* Attendee Name */}
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-0.5">
                        NAME :
                      </span>
                      <p className="font-sourceserif font-bold text-sm sm:text-base text-[#0A367B] truncate">
                        {displayRecord.full_name}
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-0.5">
                        EMAIL :
                      </span>
                      <p className="font-mono text-[11px] sm:text-xs font-bold text-slate-900 truncate">
                        {displayRecord.email}
                      </p>
                    </div>

                    {/* Enroll / Roll ID */}
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-0.5">
                        ENROLL ID :
                      </span>
                      <p className="font-mono text-[11px] sm:text-xs font-bold text-[#0284C7] truncate">
                        {displayRecord.student_id_number || 'YBN/2026/ENROLL-01'}
                      </p>
                    </div>

                    {/* Payment Status Badge */}
                    <div className="pt-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 border-[1.5px] border-emerald-500 text-emerald-950 text-[10px] font-mono font-bold shadow-2xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>PAID: ₹{displayRecord.amount_inr} • VERIFIED</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: QR Code Bar Box */}
                  <div className="col-span-4 flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white border-[1.5px] border-slate-900 shadow-xs">
                    <QRCodeCanvas
                      id="pass-qr-canvas"
                      value={qrData}
                      size={105}
                      level="H"
                      includeMargin={false}
                      className="w-full h-auto max-w-[95px]"
                    />
                    <span className="font-mono text-[8px] sm:text-[8.5px] font-black text-slate-900 uppercase tracking-tight mt-1.5">
                      GATE QR BAR
                    </span>
                  </div>

                </div>

                {/* Perforated ticket stub divider */}
                <div className="border-b-[1.5px] border-dashed border-slate-300 my-2 print:border-black" />

                {/* Bottom Bar: Reference Code & Festival Dates */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 pt-1">
                  <span className="font-bold text-[#0A367B]">
                    REF: {displayRecord.registration_code}
                  </span>
                  <span className="font-medium text-slate-600">
                    DEC 10, 11 &amp; 12, 2026
                  </span>
                </div>

              </div>

            </div>

            {/* STABLE Download Button: Completely flat, level, horizontal and outside the tilted div */}
            <div className="w-full max-w-[480px] mt-6 flex flex-col sm:flex-row items-center gap-2.5 transform-none print:hidden">
              <button
                type="button"
                onClick={handleDownloadImage}
                disabled={isDownloading}
                className="btn-voltage flex-1 w-full py-3.5 px-5 text-xs justify-center font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-solid-pop hover:scale-[1.02] active:scale-95 transition-all"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>GENERATING ID CARD IMAGE...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD / PRINT PASS</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto py-3.5 px-4 rounded-full bg-white hover:bg-slate-100 border-[1.5px] border-slate-900 text-xs font-mono font-bold text-slate-800 inline-flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0"
                title="Save PDF / Print"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PDF / PRINT</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default MyPassPage;
