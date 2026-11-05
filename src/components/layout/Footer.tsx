import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Instagram, QrCode, ArrowUpRight, Sparkles, X, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activeModalQr, setActiveModalQr] = useState<{ title: string; handle: string; img: string; url: string } | null>(null);

  const instagramChannels = [
    {
      id: 'yunifest',
      handle: '@yunifest2026.official',
      name: 'YUNIFEST 2026 Official',
      role: 'Festival Main Channel',
      qrImage: '/qr-instagram-yunifest.jpg',
      url: 'https://instagram.com/yunifest2026.official',
      badgeColor: 'bg-[#FEF08A] text-slate-950 border-slate-900',
    },
    {
      id: 'ybnranchi',
      handle: '@ybnranchi',
      name: 'YBN University Ranchi',
      role: 'Campus Headquarters',
      qrImage: '/qr-instagram-ybnranchi.jpg',
      url: 'https://instagram.com/ybnranchi',
      badgeColor: 'bg-[#E0E7FF] text-[#2B59FF] border-blue-400',
    },
    // {
    //   id: 'insidecse',
    //   handle: '@insidecse_ybn',
    //   name: 'Inside CSE YBN',
    //   role: 'Tech & Esports Club',
    //   qrImage: '/qr-instagram-insidecse.jpg',
    //   url: 'https://instagram.com/insidecse_ybn',
    //   badgeColor: 'bg-[#D1FAE5] text-emerald-950 border-emerald-400',
    // },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden pt-10 sm:pt-16">

      {/* 1. Iconic MDNT Semicircular Rotating Text Arch Dome */}
      <div className="relative w-full overflow-hidden flex flex-col items-center">

        {/* Dome Container */}
        <div className="relative w-full max-w-5xl h-[290px] sm:h-[360px] lg:h-[430px] overflow-hidden flex flex-col justify-end items-center">

          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[580px] h-[580px] sm:w-[720px] sm:h-[720px] lg:w-[860px] lg:h-[860px] pointer-events-none select-none">
            <div className="w-full h-full animate-spin-slow">
              <svg viewBox="0 0 1000 1000" className="w-full h-full">
                <defs>
                  <path
                    id="circlePath"
                    d="M 500, 500 m -390, 0 a 390,390 0 1,1 780,0 a 390,390 0 1,1 -780,0"
                    fill="none"
                  />
                </defs>
                <text
                  style={{ fontFamily: '"Anton", "Syne", sans-serif' }}
                  className="font-black text-[70px] sm:text-[76px] tracking-[0.05em] uppercase"
                >
                  <textPath href="#circlePath" startOffset="0%">
                    <tspan fill="#FFFFFF">LET'S </tspan>
                    <tspan fill="#CCFF00">ENJOY </tspan>
                    <tspan fill="#FFFFFF">TOGETHER • </tspan>
                    <tspan fill="#FFFFFF">LET'S </tspan>
                    <tspan fill="#CCFF00">ENJOY </tspan>
                    <tspan fill="#FFFFFF">TOGETHER • </tspan>
                    <tspan fill="#FFFFFF">LET'S </tspan>
                    <tspan fill="#CCFF00">ENJOY </tspan>
                    <tspan fill="#FFFFFF">TOGETHER • </tspan>
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Center Callout Box */}
          <div className="relative z-10 text-center max-w-[280px] sm:max-w-md lg:max-w-xl px-4 pb-6 sm:pb-8 lg:pb-10 flex flex-col items-center">
            <h3 className="font-sans font-extrabold text-base sm:text-xl md:text-2xl lg:text-[1.85rem] text-white leading-snug tracking-tight mb-3.5 sm:mb-4 select-none">
              Tell us what you're working on.<br />We'll show you what's possible.
            </h3>

            <Link
              to="/register"
              className="inline-flex items-center gap-2.5 bg-white hover:bg-[#CCFF00] hover:text-black text-slate-950 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-sans text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 shadow-2xl group border border-transparent"
            >
              <span>CLAIM PASS</span>
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] group-hover:scale-125 transition-transform" />
            </Link>
          </div>

        </div>
      </div>

      {/* 2. MDNT Iconic Neon Lime Divider Line */}
      <div className="w-full h-[2px] bg-[#CCFF00]" />

      {/* 3. Footer Metadata & Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-xs font-mono">

          {/* Address & Direct Helpline & Instagram Handles */}
          <div className="space-y-4">
            <div>
              <span className="text-white/40 uppercase tracking-widest text-[10px] block mb-1">
                ADDRESS:
              </span>
              <p className="text-white font-bold leading-relaxed">
                YBN UNIVERSITY, RAJAULATU,<br />
                NAMKUM, RANCHI, JHARKHAND — 834010
              </p>
            </div>

            {/* Helpline & Direct Contact */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <span className="text-[#CCFF00] uppercase tracking-widest text-[10px] font-black block">
                CONTACT &amp; INQUIRIES:
              </span>

              <a
                href="tel:9031274903"
                className="text-white hover:text-[#CCFF00] font-black text-sm flex items-center gap-2 transition-colors tracking-wide"
                title="Call 90312 74903"
              >
                <div className="w-5 h-5 rounded-full bg-[#CCFF00] text-black flex items-center justify-center shrink-0">
                  <Phone className="w-3 h-3" />
                </div>
                <span>+91 90312 74903</span>
              </a>

              <a
                href="https://wa.me/919031274903?text=Hi%2C%20I%20have%20an%20inquiry%20regarding%20YUNIFEST%202026."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 transition-colors pt-0.5"
              >
                <MessageSquare className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp: 90312 74903 ↗</span>
              </a>
            </div>

          </div>

          {/* Quick Nav Col 1 */}
          <div className="space-y-3 font-headline font-bold text-sm tracking-wider uppercase">
            <div>
              <Link to="/" className="text-[#8B5CF6] hover:text-white transition-colors block">
                HOME
              </Link>
            </div>
            <div>
              <Link to="/events" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                EVENTS EXPLORER
              </Link>
            </div>
            <div>
              <Link to="/schedule" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                3-DAY SCHEDULE
              </Link>
            </div>
            <div>
              <a
                href="/yunifest-2026-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CCFF00] hover:text-white transition-colors flex items-center gap-1 text-xs"
              >
                <span>BROCHURE &amp; SCHEDULE (PDF) ↗</span>
              </a>
            </div>
            <div>
              <Link to="/regulations" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                REGULATIONS &amp; ID
              </Link>
            </div>
            <div>
              <Link to="/my-pass" className="text-[#FEF08A] hover:text-white transition-colors flex items-center gap-1">
                <span>MY PASS (VERIFY &amp; PRINT)</span>
              </Link>
            </div>
          </div>

          {/* Quick Nav Col 2 */}
          <div className="space-y-3 font-headline font-bold text-sm tracking-wider uppercase">
            <div>
              <Link to="/leadership" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                STUDENT COORDINATORS
              </Link>
            </div>
            <div>
              <Link to="/register" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                GET PASS (₹399 / ₹499)
              </Link>
            </div>
            <div>
              <Link to="/admin" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                ORGANIZER PORTAL
              </Link>
            </div>
            <div>
              <a href="#rules" className="text-white/80 hover:text-[#CCFF00] transition-colors block">
                ID VERIFICATION DESK
              </a>
            </div>
            <div>
              <a
                href="tel:9031274903"
                className="text-emerald-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono font-bold"
              >
                <span>HELPLINE: 90312 74903</span>
              </a>
            </div>
          </div>

          {/* Dates & Mandate */}
          <div className="space-y-3 font-mono text-xs">
            <div>
              <span className="text-white/40 uppercase tracking-widest text-[10px] block mb-1">
                FESTIVAL DATES:
              </span>
              <p className="text-[#CCFF00] font-black text-sm">
                DECEMBER 10, 11 &amp; 12, 2026
              </p>
            </div>

            <div>
              <span className="text-white/40 uppercase tracking-widest text-[10px] block mb-1">
                ADMISSION POLICY:
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Delegate passes: ₹399 (YBN students) / ₹499 (Visiting scholars). Physical college/university ID card is strictly mandatory for campus entry.
              </p>
            </div>

            <div>
              <span className="text-white/40 uppercase tracking-widest text-[10px] block mb-1">
                OFFICIAL HELPLINE:
              </span>
              <p className="text-white font-black text-xs">
                PHONE: +91 90312 74903
              </p>
              <p className="text-[#CCFF00] font-bold text-[10px] mt-0.5">
                ACTIVE FOR REGISTRATION &amp; TRAVEL SUPPORT
              </p>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* Visual Instagram QR Scan Shelf (Directly in Footer) */}
        {/* ------------------------------------------------------------------------- */}
        <div className="mt-10 pt-10 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-black uppercase text-[#CCFF00] tracking-widest">
                <Sparkles className="w-3 h-3 text-[#CCFF00]" />
                <span>OFFICIAL INSTAGRAM COMMUNITY &amp; BACKSTAGE REELS</span>
              </div>
              <h4 className="font-headline font-black text-lg sm:text-xl text-white uppercase tracking-tight mt-0.5">
                Scan With Your Phone Camera To Follow
              </h4>
            </div>

            <a
              href="tel:9031274903"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#CCFF00] hover:text-black text-white text-xs font-mono font-bold transition-all self-start sm:self-auto border border-white/20"
            >
              <Phone className="w-3.5 h-3.5 text-[#CCFF00] group-hover:text-black" />
              <span>INQUIRIES: 90312 74903</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {instagramChannels.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#CCFF00]/60 transition-all flex items-center gap-4 group"
              >
                {/* QR Image Thumbnail */}
                <div
                  onClick={() => setActiveModalQr({ title: item.name, handle: item.handle, img: item.qrImage, url: item.url })}
                  className="w-20 h-20 rounded-xl bg-white p-1 shrink-0 overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-md"
                  title="Click to view full QR code"
                >
                  <img
                    src={item.qrImage}
                    alt={`Instagram QR for ${item.handle}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <span className="font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded bg-white/10 text-[#CCFF00] inline-block">
                    {item.role}
                  </span>
                  <div className="font-headline font-bold text-sm text-white truncate">
                    {item.name}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#CCFF00] hover:underline flex items-center gap-1 font-bold truncate"
                  >
                    <span>{item.handle}</span>
                    <ArrowUpRight className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 font-mono text-xs">

          {/* Official University Identity */}
          <div className="flex items-center gap-3">
            <img src="/ybn-logo.png" alt="YBN University Ranchi" className="w-7 h-7 rounded-full border border-white/20 bg-white object-contain p-0.5 animate-spin-slow" />
            <p className="text-white/60 text-[11px]">
              © 2026 YBN UNIVERSITY • YUNIFEST. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Quick Compliance Links */}
          <div className="flex items-center gap-6 text-[11px] text-white/50">
            <Link to="/regulations" className="hover:text-white transition-colors">
              MANDATORY ID POLICY
            </Link>
            <Link to="/admin" className="hover:text-[#CCFF00] transition-colors">
              COMMITTEE LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Pop-up Modal to view Full Scannable Instagram QR */}
      {activeModalQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white text-slate-950 rounded-3xl border-[2px] border-slate-900 p-6 sm:p-8 max-w-sm w-full shadow-solid-pop text-center space-y-4">

            <button
              type="button"
              onClick={() => setActiveModalQr(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-900 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-mono text-[10px] font-black uppercase mb-2">
                <Instagram className="w-3 h-3" />
                <span>INSTAGRAM SCANNER</span>
              </div>
              <h3 className="font-headline font-black text-xl text-slate-950 uppercase">
                {activeModalQr.title}
              </h3>
              <p className="font-mono text-sm font-bold text-[#2B59FF]">
                {activeModalQr.handle}
              </p>
            </div>

            {/* High-Resolution QR */}
            <div className="p-3 bg-[#F6F7F9] rounded-2xl border-[1.5px] border-slate-900 mx-auto max-w-[240px]">
              <img
                src={activeModalQr.img}
                alt={`Instagram QR Code for ${activeModalQr.handle}`}
                className="w-full h-auto rounded-lg object-contain shadow-sm"
              />
            </div>

            <p className="font-display text-xs text-slate-600">
              Point your smartphone camera to follow instantly on Instagram.
            </p>

            <a
              href={activeModalQr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-voltage w-full py-3 text-xs justify-center font-bold flex items-center gap-2"
            >
              <span>OPEN {activeModalQr.handle}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

          </div>
        </div>
      )}

            {/* 3.4. TICKER 1: OFFICIAL INQUIRY DESK & INSTAGRAM HANDLES TICKER TAPE */}
      <div className="w-full bg-black/90 border-t border-[#CCFF00]/40 py-3 relative overflow-hidden select-none backdrop-blur-md">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-default">
          {[1, 2].map((loopIndex) => (
            <div key={loopIndex} className="flex items-center gap-8 sm:gap-12 px-6 shrink-0 font-mono text-xs sm:text-sm uppercase tracking-wider">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/70 text-[#CCFF00]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#CCFF00]"></span>
                </span>
                <span className="font-black text-xs">OFFICIAL INQUIRY DESK</span>
              </div>

              <span className="text-white font-bold">
                HELPLINE: <a href="tel:9031274903" className="text-[#CCFF00] font-black hover:underline">+91 90312 74903</a>
              </span>

              <span className="text-white/40">///</span>

              <span className="text-white font-bold">
                INSTAGRAM: <span className="text-[#CCFF00]">@YUNIFEST2026.OFFICIAL</span> • <span className="text-[#CCFF00]">@YBNRANCHI</span> • <span className="text-[#CCFF00]">@INSIDECSE_YBN</span>
              </span>

              <span className="text-white/40">///</span>

              <span className="text-white font-bold">
                DEC 10, 11 &amp; 12, 2026 • YBN UNIVERSITY CAMPUS
              </span>

              <span className="text-white/40">///</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3.5. ULTRA HIGH-VISIBILITY AUTO-SLIDING ENGINEERING TICKER TAPE (Continuous Right-to-Left Infinite Scroll with Neon Blinkers) */}
      <div className="w-full bg-slate-950/95 border-y border-[#CCFF00]/40 py-3.5 relative overflow-hidden select-none backdrop-blur-md">
        {/* Soft edge fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        {/* Infinite scrolling marquee track running right-to-left */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-default">
          {[1, 2].map((loopIndex) => (
            <div key={loopIndex} className="flex items-center gap-8 sm:gap-12 px-6 shrink-0 font-mono text-xs sm:text-sm uppercase tracking-wider">

              {/* Glowing Neon Lime Blinker Beacon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/70 text-[#CCFF00]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#CCFF00] animate-blinker"></span>
                </span>
                <span className="font-black text-[11px] tracking-widest">LIVE DESK</span>
              </div>

              {/* Main Attribution Title */}
              <span className="text-white font-extrabold flex items-center gap-2">
                <span>⚡ DESIGNED BY STUDENTS OF</span>
                <span className="text-[#CCFF00] font-black underline decoration-[#CCFF00]/40 underline-offset-4">
                  DEPT OF ADVANCE COMPUTING
                </span>
              </span>

              {/* Royal Blue Blinker Dot */}
              <span className="w-2.5 h-2.5 rounded-full bg-[#2B59FF] animate-pulse" />

              {/* Student Creators with Sachin K, Satyam, Sachin V, and Pawan K */}
              <span className="text-slate-200 font-bold flex items-center gap-2">
                <span className="text-slate-400">CREW:</span>
                <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
                  SACHIN K.
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
                  SATYAM K.
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
                  SACHIN V.
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
                  PAWAN K.
                </span>
              </span>

              {/* University Badge with Royal Blue Blinker Beacon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B59FF]/20 border border-[#2B59FF]/60 text-[#2B59FF]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2B59FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2B59FF]"></span>
                </span>
                <span className="font-black text-[11px] tracking-widest text-white">YBN UNIVERSITY, RANCHI</span>
              </div>

              <span className="text-slate-400 font-bold">
                YUNIFEST 2026 OFFICIAL DIGITAL PLATFORM
              </span>

              {/* Butter Yellow Blinker Dot */}
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEF08A] animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* 4. GIGANTIC MDNT-STYLE CROPPED BOTTOM WORDMARK: YBNU (Calibrated font size so all 4 letters are 100% visible) */}
      <div className="w-full max-w-full overflow-hidden select-none pointer-events-none -mb-6 sm:-mb-10 lg:-mb-16 flex justify-center items-center">
        <h2 className="font-headline font-black text-[20vw] sm:text-[21vw] lg:text-[22vw] tracking-tighter text-white uppercase text-center leading-[0.72] opacity-95 select-none w-full block px-2">
          YBNU
        </h2>
      </div>

    </footer>
  );
};
