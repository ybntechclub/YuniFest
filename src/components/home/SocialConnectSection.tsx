import React, { useState } from 'react';
import { Phone, MessageSquare, Instagram, Sparkles, ArrowUpRight, QrCode, ShieldCheck, X } from 'lucide-react';

export const SocialConnectSection: React.FC = () => {
  const [activeModalQr, setActiveModalQr] = useState<{ title: string; handle: string; img: string; url: string } | null>(null);

  const handles = [
    {
      id: 'yunifest',
      handle: '@yunifest2026.official',
      title: 'YUNIFEST 2026 Official',
      badge: 'OFFICIAL FESTIVAL CHANNEL',
      badgeColor: 'bg-[#FEF08A] text-slate-950 border-slate-900',
      description: 'Stage highlights, celebrity EDM DJ announcements, backstage adrenaline, and live winners roll.',
      qrImage: '/qr-instagram-yunifest.png',
      url: 'https://instagram.com/yunifest2026.official',
      tagline: 'Main Festival Handle',
    },
    {
      id: 'ybnranchi',
      handle: '@ybnranchi',
      title: 'YBN University Ranchi',
      badge: 'OFFICIAL UNIVERSITY CAMPUS',
      badgeColor: 'bg-[#E0E7FF] text-[#2B59FF] border-blue-400',
      description: 'Official university campus updates, student achievements, institutional excellence, and academic honors.',
      qrImage: '/qr-instagram-ybnranchi.png',
      url: 'https://instagram.com/ybnranchi',
      tagline: 'University Headquarters',
    },
    // {
    //   id: 'insidecse',
    //   handle: '@insidecse_ybn',
    //   title: 'Inside CSE YBN',
    //   badge: 'TECH CLUB & ESPORTS',
    //   badgeColor: 'bg-[#D1FAE5] text-emerald-950 border-emerald-400',
    //   description: 'Esports battle brackets, innovation prototypes, coding marathons, and technical club insider stories.',
    //   qrImage: '/qr-instagram-insidecse.png',
    //   url: 'https://instagram.com/insidecse_ybn',
    //   tagline: 'Tech & Gaming Hub',
    // },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F6F7F9] relative border-t-[1.5px] border-slate-900/15 overflow-hidden">
      
      {/* Decorative background accents */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#FEF08A]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#2B59FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-[1.5px] border-slate-900 font-mono text-xs font-bold text-slate-900 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2B59FF]" />
              <span>[ 07 // OFFICIAL INQUIRIES &amp; SOCIAL DISCOVERY ]</span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-5xl text-slate-950 uppercase tracking-tight">
              HELPLINE &amp; <span className="text-[#2B59FF]">INSTAGRAM CHANNELS</span>
            </h2>
            <p className="font-display text-slate-600 text-sm mt-3 leading-relaxed max-w-2xl">
              Have questions regarding passes, competition eligibility, or campus arrivals? Contact our official helpline desk or scan our official Instagram QR badges below for live backstage coverage!
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 font-mono text-xs font-bold text-slate-700 bg-white px-4 py-2.5 rounded-2xl border-[1.5px] border-slate-900 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>HELPLINE ACTIVE: 90312 74903</span>
          </div>
        </div>

        {/* 1. Official Helpline & Contact Banner */}
        <div className="mb-14 rounded-[32px] border-[2px] border-slate-900 bg-white p-6 sm:p-10 shadow-solid-pop relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF08A] border border-slate-900 text-slate-950 font-mono text-xs font-black uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                <span>OFFICIAL FESTIVAL INQUIRY &amp; SUPPORT DESK</span>
              </div>
              
              <h3 className="font-headline font-black text-2xl sm:text-4xl text-slate-950 uppercase tracking-tight">
                NEED ASSISTANCE? TALK TO US
              </h3>
              
              <p className="font-display text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect directly with the university organizing committee for queries about registration passes, payment verification, competition rules, accommodation, or campus directions.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-700">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="text-[#2B59FF]">●</span> Student Registration Support
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="text-[#2B59FF]">●</span> Visiting College Delegation
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="text-[#2B59FF]">●</span> Gate Check-In &amp; ID Help
                </span>
              </div>
            </div>

            {/* Direct Call & WhatsApp Action Box */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-80">
              {/* Call Button */}
              <a
                href="tel:9031274903"
                className="btn-voltage py-4 px-6 text-xs sm:text-sm justify-center group flex items-center gap-3 font-bold shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] block font-mono text-slate-800 uppercase tracking-wider font-normal">
                    CLICK TO CALL HELPLINE
                  </span>
                  <span className="font-headline font-black text-base sm:text-lg text-slate-950 tracking-wider">
                    +91 90312 74903
                  </span>
                </div>
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919031274903?text=Hi%2C%20I%20have%20an%20inquiry%20regarding%20YUNIFEST%202026%20at%20YBN%20University."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white border-[1.5px] border-slate-900 flex items-center justify-center gap-2.5 font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT ON WHATSAPP DESK</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

        {/* 2. Three Instagram Handles & Scannable QR Badges Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#2B59FF] block">
              [ SCAN OR CLICK TO FOLLOW ]
            </span>
            <h3 className="font-headline font-black text-2xl sm:text-3xl text-slate-950 uppercase mt-1">
              OFFICIAL INSTAGRAM COMMUNITY
            </h3>
            <p className="font-display text-slate-600 text-xs sm:text-sm mt-1">
              Point your smartphone camera to scan, or tap any QR code to enlarge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {handles.map((h) => (
              <div
                key={h.id}
                className="rounded-[32px] border-[2px] border-slate-900 bg-white p-6 sm:p-7 shadow-sm hover:shadow-solid-pop transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Category Badge & Platform Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`font-mono text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${h.badgeColor}`}>
                      {h.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 p-0.5 flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Clean Cropped QR Display Container (Clickable to Enlarge) */}
                  <div 
                    onClick={() => setActiveModalQr({ title: h.title, handle: h.handle, img: h.qrImage, url: h.url })}
                    className="relative mx-auto my-3 p-4 rounded-2xl bg-white border-[2px] border-slate-900 shadow-sm flex flex-col items-center cursor-pointer group-hover:scale-105 transition-transform duration-300"
                    title="Click to view full QR code"
                  >
                    <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1">
                      <img
                        src={h.qrImage}
                        alt={`Instagram QR Code for ${h.handle}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-slate-900 mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF08A] border border-slate-900">
                      <QrCode className="w-3.5 h-3.5 text-[#2B59FF]" />
                      <span>CLICK TO EXPAND QR</span>
                    </span>
                  </div>

                  {/* Handle & Details */}
                  <div className="text-center mt-4 space-y-1">
                    <div className="font-headline font-black text-xl text-slate-950 uppercase tracking-tight">
                      {h.title}
                    </div>
                    <div className="font-mono text-sm font-black text-[#2B59FF]">
                      {h.handle}
                    </div>
                    <p className="font-display text-xs text-slate-600 leading-relaxed pt-2">
                      {h.description}
                    </p>
                  </div>
                </div>

                {/* Follow Button */}
                <div className="pt-6 mt-4 border-t border-slate-900/10">
                  <a
                    href={h.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-[#2B59FF] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-sm"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>FOLLOW {h.handle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Pop-up Modal Showing ONLY the Clean Cropped QR Code */}
      {activeModalQr && (
        <div 
          onClick={() => setActiveModalQr(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white text-slate-950 rounded-[32px] border-[2px] border-slate-900 p-6 sm:p-8 max-w-sm w-full shadow-solid-pop text-center space-y-5 cursor-default"
          >
            <button
              type="button"
              onClick={() => setActiveModalQr(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-950 border border-slate-900 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-mono text-[10px] font-black uppercase mb-2">
                <Instagram className="w-3 h-3" />
                <span>INSTAGRAM QR CODE</span>
              </div>
              <h3 className="font-headline font-black text-xl text-slate-950 uppercase">
                {activeModalQr.title}
              </h3>
              <p className="font-mono text-sm font-black text-[#2B59FF] mt-0.5">
                {activeModalQr.handle}
              </p>
            </div>

            {/* ONLY the Cropped QR Code */}
            <div className="p-4 bg-white rounded-2xl border-[2px] border-slate-900 mx-auto max-w-[260px] shadow-sm">
              <img
                src={activeModalQr.img}
                alt={`Instagram QR Code for ${activeModalQr.handle}`}
                className="w-full h-auto aspect-square rounded-lg object-contain"
              />
            </div>

            <p className="font-display text-xs text-slate-600 font-medium">
              Point your smartphone or Instagram camera at this code to follow instantly.
            </p>

            <a
              href={activeModalQr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-voltage w-full py-3.5 text-xs justify-center font-bold flex items-center gap-2"
            >
              <span>OPEN {activeModalQr.handle}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

          </div>
        </div>
      )}

    </section>
  );
};
