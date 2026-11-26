import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Trophy, QrCode, Smartphone, Users, Zap, Compass, CheckCircle2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RollText } from '../ui/RollText';
import { registrationStore, TreasureTeamSlot } from '../../lib/registrationStore';

export const FestOverview: React.FC = () => {
  const [treasureSlots, setTreasureSlots] = useState<TreasureTeamSlot[]>(() =>
    registrationStore.getTreasureHuntingTeams()
  );
  const [isTreasureModalOpen, setIsTreasureModalOpen] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registrationStore.getRegistrations().then(regs => {
      setTreasureSlots(registrationStore.getTreasureHuntingTeams(regs));
    });
  }, []);

  // Lock body scroll when modal is open so mouse scroll operates on modal
  useEffect(() => {
    if (isTreasureModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isTreasureModalOpen]);

  const occupiedTeams = treasureSlots.filter(s => s.teamName !== null).length;
  const totalTreasureMembers = treasureSlots.reduce((acc, s) => acc + s.memberCount, 0);
  return (
    <section className="py-20 sm:py-28 bg-[#F6F7F9] relative border-t-[1.5px] border-slate-900/15">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header: Minimalist Editorial Title */}
        <div className="max-w-4xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-[1.5px] border-slate-900 font-mono text-xs font-bold text-slate-900 mb-4 shadow-sm">
            <span>[ 01 // FESTIVAL SHOWCASES &amp; PILLARS ]</span>
          </div>

          <h2 className="font-headline font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-slate-950 tracking-tight leading-tight">
            TRANSLATING YOUTH ENERGY <br className="hidden sm:inline" />
            <span className="whitespace-nowrap inline-block">
              INTO MOMENTS{' '}
              <span className="font-editorial italic font-normal text-[#2B59FF] normal-case tracking-normal text-[1.08em]">
                People Remember
              </span>
            </span>
          </h2>

          <p className="font-display text-sm sm:text-base text-slate-700 mt-4 leading-relaxed max-w-2xl">
            YBN University, Ranchi brings together innovators, performers, strategists, and gamers across Jharkhand for three relentless days of celebration and competition.
          </p>
        </div>

        {/* 6 High-End Neo-Brutalist Light Cards (Matching Image 2 Reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          
          {/* Card 1: Electric Royal Blue Card (Top Left in Reference) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[30px] border-[1.5px] border-slate-900 bg-[#2B59FF] text-white p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-solid-pop hover:-translate-y-1.5 transition-all duration-300 min-h-[380px]"
          >
            {/* Floating Illustrated Circles (Like the Reference) */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border-[1.5px] border-slate-900 text-slate-900 flex items-center justify-center font-bold text-xs shadow-sm rotate-6">
                BGMI
              </div>
              <div className="w-14 h-14 rounded-full bg-[#A7F3D0] border-[1.5px] border-slate-900 text-slate-900 flex items-center justify-center font-bold text-[11px] shadow-sm -rotate-12">
                FREE FIRE
              </div>
            </div>

            <div>
              <span className="font-mono text-xs uppercase font-bold tracking-wider opacity-85 block mb-2">
                [ 01 // TACTICAL ESPORTS ]
              </span>
              <h3 className="font-headline font-black text-2xl sm:text-3xl text-white uppercase leading-tight max-w-[220px]">
                Battle Royale &amp; Innovation
              </h3>
              <p className="font-display text-xs sm:text-sm text-blue-100 mt-3 leading-relaxed max-w-[240px]">
                High-stakes mobile tournaments on dedicated campus LAN, alongside working agricultural telemetry prototypes.
              </p>
            </div>

            <div className="pt-6">
              <Link
                to="/register?event=gaming-tournament"
                className="inline-flex items-center gap-2 bg-slate-950 hover:bg-white hover:text-slate-950 text-white px-6 py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all border-[1.5px] border-slate-950 shadow-sm"
              >
                <span>JOIN TOURNAMENT</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Off-White Minimalist Card (Top Center in Reference) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[30px] border-[1.5px] border-slate-900 bg-white text-slate-950 p-7 sm:p-8 flex flex-col justify-between shadow-solid-pop hover:-translate-y-1.5 transition-all duration-300 min-h-[380px]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase font-bold tracking-wider text-slate-500">
                  [ 02 // MULTIDISCIPLINARY ]
                </span>
                <span className="font-mono text-[10px] font-bold px-3 py-1 rounded-full bg-[#FEF08A] border border-slate-900">
                  15+ SHOWCASES
                </span>
              </div>

              {/* Graphic Component Box */}
              <div className="p-4 rounded-2xl bg-[#F6F7F9] border-[1.5px] border-slate-900 my-4 space-y-2.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-slate-800">CULTURAL SHOWDOWN</span>
                  <span className="text-[#2B59FF] font-black">SOLO / GROUP</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2B59FF] h-full w-[85%]" />
                </div>
                <div className="flex items-center justify-between font-mono text-xs pt-1">
                  <span className="font-bold text-slate-800">TECHNICAL GALLERIES</span>
                  <span className="text-emerald-600 font-black">ALL FACULTIES</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[92%]" />
                </div>
              </div>

              <h3 className="font-headline font-bold text-xl sm:text-2xl text-slate-950 uppercase leading-snug">
                Complementarity of Disciplines
              </h3>
              <p className="font-display text-xs text-slate-600 mt-2 leading-relaxed">
                From classical music to cutting-edge robotics presentations across 3 university zones.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="font-display text-xs font-bold text-slate-700">Explore Catalog</span>
              <Link to="/events" className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-[#2B59FF] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 3: Mint Green Graph Card (Top Right in Reference) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[30px] border-[1.5px] border-slate-900 bg-[#D1FAE5] text-slate-950 p-7 sm:p-8 flex flex-col justify-between shadow-solid-pop hover:-translate-y-1.5 transition-all duration-300 min-h-[380px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase font-bold tracking-wider text-emerald-900">
                  [ 03 // ADVENTURE ]
                </span>
                <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-900 text-slate-950">
                  CAP: 6 TEAMS
                </span>
              </div>

              <h3 className="font-headline font-black text-2xl text-slate-950 uppercase leading-tight mb-3">
                Campus-Wide Clue Expedition
              </h3>

              {/* Floating Graph Metric Card inside Mint Card with Live Team Slots */}
              <div className="p-4 rounded-2xl bg-white border-[1.5px] border-slate-900 shadow-sm space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-500 uppercase font-bold">Team Quota</span>
                  <span className="font-mono text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                    Strict Cap
                  </span>
                </div>
                <div className="font-headline font-black text-2xl text-slate-950">
                  6 Teams (5 each)
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>First-Come Registration Guarantee</span>
                </div>

                {/* Live 6 Team Slots Visual Progress */}
                <div className="pt-2 border-t border-slate-200 mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-700">
                    <span>TEAM SLOTS:</span>
                    <span className="text-emerald-700 font-bold">{occupiedTeams}/6 Claimed • {6 - occupiedTeams} Open</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {treasureSlots.map(s => (
                      <div
                        key={s.slot}
                        className={`h-2 rounded-full border border-slate-900 transition-all ${
                          s.teamName ? (s.isFull ? 'bg-red-500' : 'bg-[#2B59FF]') : 'bg-slate-200'
                        }`}
                        title={s.teamName ? `Slot ${s.slot}: Team ${s.teamName} (${s.memberCount}/5)` : `Slot ${s.slot}: Open`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setIsTreasureModalOpen(true)}
                      className="text-[#2B59FF] font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Check Team Slots</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                    <span className="text-slate-500">{30 - totalTreasureMembers} spots left</span>
                  </div>
                </div>
              </div>

              <p className="font-display text-xs text-emerald-950 leading-relaxed">
                Decipher cryptic trail markers across all academic blocks and central grounds to claim the championship.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-300 flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold uppercase text-emerald-900">TREASURE HUNTING</span>
              <Link to="/register?event=treasure-hunting" className="text-xs font-bold text-slate-950 underline hover:text-[#2B59FF]">
                REGISTER TEAM →
              </Link>
            </div>
          </motion.div>

          {/* Card 4: Editorial Serif Card with Overlapping Color Discs (Bottom Left in Reference) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-[30px] border-[1.5px] border-slate-900 bg-white text-slate-950 p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-solid-pop hover:-translate-y-1.5 transition-all duration-300 min-h-[380px]"
          >
            <div className="relative z-10">
              <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500 font-bold block mb-1">
                FESTIVAL SPECTRUM
              </span>
              <h3 className="font-editorial font-bold text-3xl sm:text-4xl text-slate-950 leading-[1.08] mt-2 mb-3">
                Get Ready to <span className="italic font-normal text-[#2B59FF]">Experience</span> the Rhythm
              </h3>
              <p className="font-display text-xs text-slate-600 leading-relaxed max-w-[260px]">
                Classical rhythms, high-energy Bollywood, hip-hop faceoffs, and viral 60-second festival reels.
              </p>
            </div>

            {/* Overlapping Colorful Semicircular Discs (Exact match to Reference Image 2!) */}
            <div className="relative w-full h-24 overflow-hidden mt-6">
              <div className="absolute -bottom-8 left-0 right-0 flex justify-center items-end -space-x-8">
                <div className="w-20 h-20 rounded-full bg-[#C7D2FE] border-[1.5px] border-slate-900" />
                <div className="w-20 h-20 rounded-full bg-[#2B59FF] border-[1.5px] border-slate-900" />
                <div className="w-20 h-20 rounded-full bg-[#6EE7B7] border-[1.5px] border-slate-900" />
                <div className="w-20 h-20 rounded-full bg-[#FEF08A] border-[1.5px] border-slate-900" />
                <div className="w-20 h-20 rounded-full bg-[#F43F5E] border-[1.5px] border-slate-900" />
              </div>
            </div>
          </motion.div>

          {/* Card 5: Warm Butter Yellow Card with Phone Mockup (Bottom Center in Reference) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-[30px] border-[1.5px] border-slate-900 bg-[#FEF08A] text-slate-950 p-7 sm:p-8 flex flex-col justify-between shadow-solid-pop hover:-translate-y-1.5 transition-all duration-300 min-h-[380px]"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-slate-950 text-[#FEF08A] font-headline font-black text-base flex items-center justify-center mb-3">
                Y
              </div>

              <h3 className="font-editorial font-bold text-2xl sm:text-3xl text-slate-950 leading-tight mb-2">
                Digital Pass &amp; Check-In
              </h3>

              <p className="font-display text-xs text-slate-800 leading-relaxed mb-4">
                Instant digital passes delivered with scannable QR badge for verified Gate 1 &amp; 2 entry.
              </p>

              {/* Minimalist Phone Pass Mockup */}
              <div className="p-3.5 rounded-2xl bg-white border-[1.5px] border-slate-900 shadow-sm space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] font-bold text-slate-500">
                  <span>OFFICIAL BADGE</span>
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">CONFIRMED</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-black text-slate-950 block">YUNI-2026-PASS</span>
                    <span className="text-[10px] text-slate-500">Official Pass (₹399/₹499)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/register"
                className="btn-voltage w-full text-center text-xs justify-center py-2.5"
              >
                <span>REGISTER NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 6: Grand Finale & DJ Night Card with Isometric Icons (Bottom Right in Reference) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-[30px] border-[1.5px] border-slate-900 bg-white text-slate-950 p-7 sm:p-8 flex flex-col justify-between shadow-solid-pop hover:-translate-y-1.5 transition-all duration-300 min-h-[380px]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase font-bold tracking-wider text-slate-500">
                  [ 06 // GRAND FINALE ]
                </span>
                <span className="font-mono text-[10px] font-bold px-3 py-1 rounded-full bg-[#EDE9FE] border border-slate-900 text-purple-900">
                  DAY 03 CELEBRATION
                </span>
              </div>

              {/* Hexagonal Isometric Box Arrangement */}
              <div className="py-2 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-2 p-3 bg-[#FAF8F5] rounded-2xl border-[1.5px] border-slate-900">
                  <div className="w-9 h-9 rounded-lg bg-[#F43F5E] border border-slate-900 flex items-center justify-center text-white text-[10px] font-bold">EDM</div>
                  <div className="w-9 h-9 rounded-lg bg-[#FEF08A] border border-slate-900 flex items-center justify-center text-slate-900 text-[10px] font-bold">RAMP</div>
                  <div className="w-9 h-9 rounded-lg bg-[#6EE7B7] border border-slate-900 flex items-center justify-center text-slate-900 text-[10px] font-bold">LASER</div>
                  <div className="w-9 h-9 rounded-lg bg-[#2B59FF] border border-slate-900 flex items-center justify-center text-white text-[10px] font-bold">DJ</div>
                  <div className="w-9 h-9 rounded-lg bg-[#DDD6FE] border border-slate-900 flex items-center justify-center text-purple-900 text-[10px] font-bold">YBN</div>
                  <div className="w-9 h-9 rounded-lg bg-[#FBBF24] border border-slate-900 flex items-center justify-center text-slate-900 text-[10px] font-bold">LIVE</div>
                </div>
              </div>

              <h3 className="font-headline font-bold text-xl sm:text-2xl text-slate-950 uppercase leading-snug mt-3">
                Runway Couture &amp; Open-Air DJ Night
              </h3>
              <p className="font-display text-xs text-slate-600 mt-1 leading-relaxed">
                Designer ramp walk sequences, university honor roll awards, and an open-air laser EDM concert.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-purple-700">Dec 12 // 18:00 IST</span>
              <Link to="/schedule" className="text-xs font-bold text-slate-950 underline hover:text-[#2B59FF]">
                VIEW TIMELINE →
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Minimalist Editorial Metrics Strip */}
        <div className="rounded-3xl border-[1.5px] border-slate-900 bg-white p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="font-headline font-black text-4xl sm:text-5xl text-slate-950">
                03
              </div>
              <div className="font-mono text-xs font-bold text-[#2B59FF] uppercase tracking-wider">
                INTENSE DAYS
              </div>
              <div className="font-mono text-[10px] text-slate-500 uppercase">
                DECEMBER 10, 11 &amp; 12
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-headline font-black text-4xl sm:text-5xl text-slate-950">
                15+
              </div>
              <div className="font-mono text-xs font-bold text-[#2B59FF] uppercase tracking-wider">
                OFFICIAL SHOWCASES
              </div>
              <div className="font-mono text-[10px] text-slate-500 uppercase">
                TECHNICAL &amp; CULTURAL
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-headline font-black text-4xl sm:text-5xl text-slate-950">
                ₹399
              </div>
              <div className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-wider">
                ENTRY PASS
              </div>
              <div className="font-mono text-[10px] text-slate-500 uppercase">
                ₹399 YBN / ₹499 VISITING
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-headline font-black text-4xl sm:text-5xl text-slate-950">
                06
              </div>
              <div className="font-mono text-xs font-bold text-amber-600 uppercase tracking-wider">
                TREASURE HUNT TEAMS
              </div>
              <div className="font-mono text-[10px] text-slate-500 uppercase">
                STRICT 5 MEMBERS EACH
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Treasure Hunt 6 Team Slots Modal with Smooth Direct Mouse Wheel Scrolling */}
      {isTreasureModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsTreasureModalOpen(false);
          }}
          onWheel={(e) => {
            if (modalScrollRef.current) {
              modalScrollRef.current.scrollTop += e.deltaY;
            }
          }}
        >
          <div
            className="relative bg-white rounded-[32px] border-[2px] border-slate-900 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-solid-pop text-left overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => {
              if (modalScrollRef.current) {
                modalScrollRef.current.scrollTop += e.deltaY;
              }
            }}
          >
            
            {/* Modal Header: Sticky at Top */}
            <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-slate-200 shrink-0 bg-white">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FEF08A] border border-slate-900 text-[10px] font-mono font-bold text-slate-950">
                  <Compass className="w-3 h-3 text-[#2B59FF]" />
                  <span>DAY 2 EXPEDITION • 6 TEAMS CAP</span>
                </div>
                <h3 className="font-headline font-black text-xl sm:text-2xl text-slate-950 uppercase">
                  Treasure Hunt Live Team Slots
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTreasureModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Slots Container: Native, effortless direct mouse-wheel scrolling with min-h-0 and direct onWheel */}
            <div
              ref={modalScrollRef}
              className="overflow-y-auto overscroll-contain min-h-0 p-5 sm:p-6 space-y-4 flex-1 scroll-smooth"
            >
              <p className="font-display text-xs sm:text-sm text-slate-700 leading-relaxed">
                Exactly 6 teams are permitted to compete, with 5 members per team (30 participants total). Students can join any team that currently has open slots, or found a new team in any unclaimed slot.
              </p>

              {/* 6 Team Slots Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {treasureSlots.map(slot => {
                  const isOccupied = slot.teamName !== null;
                  const openCount = Math.max(0, 5 - slot.memberCount);

                  return (
                    <div
                      key={slot.slot}
                      className={`p-4 rounded-2xl border-[1.5px] border-slate-900 flex flex-col justify-between ${
                        isOccupied ? 'bg-white shadow-sm' : 'bg-slate-50/70 border-dashed'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                            SLOT {slot.slot}
                          </span>
                          <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            slot.isFull
                              ? 'bg-red-50 text-red-700 border-red-300'
                              : isOccupied
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}>
                            {slot.isFull ? 'FULL (5/5)' : `${openCount} SLOTS LEFT`}
                          </span>
                        </div>

                        <div className="font-headline font-bold text-base text-slate-950 mb-1">
                          {isOccupied ? slot.teamName : `Available Slot #${slot.slot}`}
                        </div>

                        {/* Visual 5 Member Pips & Left Slot Status (No Student Names) */}
                        <div className="mt-3 p-2.5 rounded-xl bg-[#F6F7F9] border border-slate-200">
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-700 mb-1.5">
                            <span>Team Slots:</span>
                            <span className={openCount === 0 ? 'text-red-600 font-bold' : 'text-emerald-700 font-bold'}>
                              {openCount === 0 ? 'Team Full (5/5)' : `${openCount} of 5 spots left`}
                            </span>
                          </div>
                          <div className="grid grid-cols-5 gap-1.5">
                            {[0, 1, 2, 3, 4].map((idx) => (
                              <div
                                key={idx}
                                className={`h-2 rounded-full border border-slate-900 transition-colors ${
                                  slot.members[idx] ? 'bg-[#2B59FF]' : 'bg-white'
                                }`}
                                title={slot.members[idx] ? `Occupied Spot #${idx + 1}` : `Open Spot #${idx + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                        <span>Roster: {slot.memberCount}/5</span>
                        {isOccupied ? (
                          slot.isFull ? (
                            <span className="font-bold text-red-600">Full</span>
                          ) : (
                            <Link
                              to={`/register?event=treasure-hunting&team=${encodeURIComponent(slot.teamName!)}`}
                              className="font-bold text-[#2B59FF] hover:underline"
                              onClick={() => setIsTreasureModalOpen(false)}
                            >
                              Join Team →
                            </Link>
                          )
                        ) : (
                          <Link
                            to="/register?event=treasure-hunting"
                            className="font-bold text-emerald-700 hover:underline"
                            onClick={() => setIsTreasureModalOpen(false)}
                          >
                            Claim Slot →
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer: Sticky at Bottom */}
            <div className="p-4 sm:p-6 pt-3.5 border-t border-slate-200 bg-[#FAF9F6] shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-mono text-xs text-slate-500">
                {occupiedTeams} of 6 Teams Claimed • {30 - totalTreasureMembers} Open Spots
              </span>
              <Link
                to="/register?event=treasure-hunting"
                onClick={() => setIsTreasureModalOpen(false)}
                className="btn-voltage text-xs py-2.5 px-6 w-full sm:w-auto text-center"
              >
                <span>Register for Treasure Hunt</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
