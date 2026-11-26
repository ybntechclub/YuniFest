import React, { useState } from 'react';
import { RegistrationRecord, RegistrationStatus } from '../../types/database';
import { registrationStore, TreasureTeamSlot } from '../../lib/registrationStore';
import { Users, Download, CheckCircle, Clock, AlertCircle, XCircle, ExternalLink, Shield, Compass, Search } from 'lucide-react';

interface TreasureHuntTeamsViewProps {
  registrations: RegistrationRecord[];
  onSelectRegistration: (reg: RegistrationRecord) => void;
  onStatusUpdate: (regId: string, newStatus: RegistrationStatus) => void;
  onRefresh?: () => void;
}

export const TreasureHuntTeamsView: React.FC<TreasureHuntTeamsViewProps> = ({
  registrations,
  onSelectRegistration,
  onStatusUpdate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeReceiptUrl, setActiveReceiptUrl] = useState<string | null>(null);

  const teamSlots: TreasureTeamSlot[] = registrationStore.getTreasureHuntingTeams(registrations);
  const occupiedSlots = teamSlots.filter(s => s.teamName !== null);
  const totalMembers = teamSlots.reduce((acc, s) => acc + s.memberCount, 0);

  // Filter team slots if search is active
  const filteredSlots = teamSlots.filter(slot => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    if (slot.teamName?.toLowerCase().includes(term)) return true;
    return slot.members.some(
      m => m.name.toLowerCase().includes(term) ||
           m.studentId.toLowerCase().includes(term) ||
           (m.utr && m.utr.toLowerCase().includes(term)) ||
           m.phone.includes(term)
    );
  });

  const handleExportAllTreasure = () => {
    // Collect all treasure hunting records
    const allTreasureMembers = teamSlots.flatMap(s => s.members);
    const matchedRecords = registrations.filter(r => 
      allTreasureMembers.some(m => m.id === r.id || m.code === r.registration_code)
    );
    const csvContent = registrationStore.exportRegistrationsToCSV(matchedRecords);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `yunifest-2026-treasure-hunt-6teams-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportSingleTeam = (slot: TreasureTeamSlot) => {
    if (!slot.teamName) return;
    const matchedRecords = registrations.filter(r => 
      slot.members.some(m => m.id === r.id || m.code === r.registration_code)
    );
    const csvContent = registrationStore.exportRegistrationsToCSV(matchedRecords);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `yunifest-2026-team-${slot.teamName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusBadges: Record<RegistrationStatus, { bg: string; text: string; icon: React.ElementType }> = {
    confirmed: { bg: 'bg-emerald-50 border-emerald-300', text: 'text-emerald-800', icon: CheckCircle },
    pending: { bg: 'bg-amber-50 border-amber-300', text: 'text-amber-800', icon: Clock },
    waitlisted: { bg: 'bg-blue-50 border-blue-300', text: 'text-blue-800', icon: AlertCircle },
    rejected: { bg: 'bg-red-50 border-red-300', text: 'text-red-800', icon: XCircle },
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Overview */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-[#FEF08A] border-[1.5px] border-slate-900 shadow-solid-pop">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-900 text-xs font-mono font-bold text-slate-900">
              <Compass className="w-3.5 h-3.5 text-[#2B59FF]" />
              <span>TREASURE HUNTING EXPEDITION — 6 TEAMS ROSTER</span>
            </div>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-950 uppercase tracking-tight">
              6 Teams Segregated by Official Team Name
            </h2>
            <p className="font-display text-xs sm:text-sm text-slate-800 max-w-2xl leading-relaxed">
              Strict capacity cap of 6 teams with up to 5 members each (30 participants maximum). Every attendee registers individually with their own UTR and pass, segregated under their team roster.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportAllTreasure}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 text-white font-display font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm"
              title="Download all Treasure Hunt teams and members with UTR numbers"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export All 6 Teams CSV</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Summary Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-900/15">
          <div className="p-4 rounded-2xl bg-white border border-slate-900/40">
            <span className="font-mono text-[10px] text-slate-600 uppercase font-bold block">Teams Formed</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline font-black text-2xl text-slate-950">{occupiedSlots.length}</span>
              <span className="font-mono text-xs font-bold text-slate-500">/ 6 Teams</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-900/40">
            <span className="font-mono text-[10px] text-slate-600 uppercase font-bold block">Registered Members</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline font-black text-2xl text-slate-950">{totalMembers}</span>
              <span className="font-mono text-xs font-bold text-slate-500">/ 30 Participants</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-900/40">
            <span className="font-mono text-[10px] text-slate-600 uppercase font-bold block">Available Team Slots</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline font-black text-2xl text-emerald-600">{6 - occupiedSlots.length}</span>
              <span className="font-mono text-xs font-bold text-slate-500">Empty Slots</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar for Teams / Members */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by team name, member name, student roll, or UTR number..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border-[1.5px] border-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#2B59FF] shadow-sm"
        />
      </div>

      {/* 6 Team Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSlots.map((slot) => {
          const isOccupied = slot.teamName !== null;
          const openSpots = Math.max(0, 5 - slot.memberCount);

          return (
            <div
              key={slot.slot}
              className={`rounded-[28px] border-[1.5px] border-slate-900 bg-white p-6 sm:p-7 shadow-solid-pop flex flex-col justify-between transition-all ${
                isOccupied ? 'ring-2 ring-slate-900/5' : 'border-dashed bg-[#FBFBFC]'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                      SLOT {slot.slot}
                    </span>
                    {isOccupied ? (
                      <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        slot.isFull 
                          ? 'bg-red-50 text-red-700 border-red-300' 
                          : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      }`}>
                        {slot.isFull ? 'TEAM FULL (5/5)' : `${slot.memberCount}/5 MEMBERS`}
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-300">
                        OPEN / UNCLAIMED
                      </span>
                    )}
                  </div>

                  {isOccupied && (
                    <button
                      type="button"
                      onClick={() => handleExportSingleTeam(slot)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-700 hover:text-slate-950 underline"
                      title="Export this team roster with UTRs"
                    >
                      <Download className="w-3 h-3" />
                      <span>Export Team</span>
                    </button>
                  )}
                </div>

                {/* Team Name */}
                <div className="mb-4">
                  {isOccupied ? (
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 uppercase font-bold block">Official Team Name:</span>
                      <h3 className="font-headline font-black text-2xl text-slate-950 tracking-tight">
                        {slot.teamName}
                      </h3>
                    </div>
                  ) : (
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">Available Slot:</span>
                      <h3 className="font-headline font-bold text-xl text-slate-400 italic">
                        Empty Team Slot #{slot.slot}
                      </h3>
                      <p className="font-display text-xs text-slate-500 mt-1">
                        Waiting for a YBN student to register and claim this team slot.
                      </p>
                    </div>
                  )}
                </div>

                {/* Member Progress Bar / Visual Pips */}
                <div className="mb-5 p-3 rounded-2xl bg-[#F6F7F9] border border-slate-200">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-700 mb-2">
                    <span>Team Roster ({slot.memberCount} of 5 Spots)</span>
                    <span className="text-slate-500">{openSpots > 0 ? `${openSpots} spots open` : 'Roster complete'}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[0, 1, 2, 3, 4].map((idx) => {
                      const member = slot.members[idx];
                      return (
                        <div
                          key={idx}
                          className={`h-2.5 rounded-full border border-slate-900 transition-colors ${
                            member ? 'bg-[#2B59FF]' : 'bg-white'
                          }`}
                          title={member ? `Member ${idx + 1}: ${member.name}` : `Spot ${idx + 1}: Open`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Member Rows */}
                {isOccupied && (
                  <div className="space-y-2 mb-4">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      Registered Team Members ({slot.members.length}):
                    </span>
                    {slot.members.map((member, mIdx) => {
                      const badge = statusBadges[member.status] || statusBadges.pending;
                      const Icon = badge.icon;
                      const originalReg = registrations.find(r => r.id === member.id || r.registration_code === member.code);

                      return (
                        <div
                          key={member.id}
                          className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-900 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-300">
                                #{mIdx + 1}
                              </span>
                              <span className="font-bold text-slate-950 font-display text-sm">
                                {member.name}
                              </span>
                              <span className="font-mono text-[10px] text-slate-500">
                                ({member.studentId || 'YBN Internal'})
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-slate-600">
                              <span>Fee: ₹{member.amount}</span>
                              <span className="text-slate-900 font-bold bg-[#FEF08A] px-1.5 py-0.2 rounded border border-slate-900/30">
                                UTR: {member.utr || 'Pending'}
                              </span>
                              {member.phone && <span>Ph: {member.phone}</span>}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            {/* Receipt button if uploaded */}
                            {member.receiptUrl && (
                              <button
                                type="button"
                                onClick={() => setActiveReceiptUrl(member.receiptUrl!)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 text-[#2B59FF] border border-blue-200 text-[10px] font-mono font-bold hover:bg-blue-100 transition-colors"
                                title="View payment receipt screenshot"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Receipt</span>
                              </button>
                            )}

                            {/* Status selector */}
                            <select
                              value={member.status}
                              onChange={(e) => onStatusUpdate(member.id, e.target.value as RegistrationStatus)}
                              className={`text-[10px] font-mono font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${badge.bg} ${badge.text}`}
                            >
                              <option value="confirmed">Verified</option>
                              <option value="pending">Pending</option>
                              <option value="rejected">Rejected</option>
                            </select>

                            {/* View Full Profile */}
                            {originalReg && (
                              <button
                                type="button"
                                onClick={() => onSelectRegistration(originalReg)}
                                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-mono font-bold border border-slate-300 transition-colors"
                                title="View complete registration modal"
                              >
                                View
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Empty Member Placeholders in this team */}
                    {Array.from({ length: openSpots }).map((_, emptyIdx) => (
                      <div
                        key={`empty-${emptyIdx}`}
                        className="p-2.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 text-slate-400 font-mono text-[11px] flex items-center justify-between"
                      >
                        <span>Spot #{slot.memberCount + emptyIdx + 1}: Available for teammate</span>
                        <span className="text-[10px] italic">Open to join with team name "{slot.teamName}"</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-200 font-mono text-[11px] text-slate-500 flex items-center justify-between">
                <span>Pass Access: Dec 11 (Day 2)</span>
                <span className="font-bold text-slate-950">
                  {isOccupied ? `${slot.memberCount} / 5 Confirmed` : 'Waiting for Roster'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Receipt Modal */}
      {activeReceiptUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white rounded-3xl border-[2px] border-slate-900 p-6 max-w-lg w-full shadow-solid-pop text-center space-y-4">
            <h3 className="font-headline font-bold text-lg text-slate-950 uppercase">
              Payment Receipt Screenshot
            </h3>
            <div className="max-h-[60vh] overflow-y-auto rounded-xl border border-slate-200 p-2 bg-slate-50 flex justify-center">
              <img
                src={activeReceiptUrl}
                alt="Payment Receipt"
                className="max-w-full h-auto object-contain rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => setActiveReceiptUrl(null)}
              className="btn-voltage text-xs py-2.5 px-6 w-full"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};