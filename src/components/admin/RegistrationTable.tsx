import React, { useState, useMemo } from 'react';
import { RegistrationRecord, EventItem, RegistrationStatus, ParticipantType } from '../../types/database';
import { registrationStore } from '../../lib/registrationStore';
import { 
  Search, Download, Filter, Eye, CheckCircle, Clock, 
  XCircle, AlertCircle, ArrowUpDown, ChevronRight 
} from 'lucide-react';

interface RegistrationTableProps {
  registrations: RegistrationRecord[];
  events: EventItem[];
  onSelectRegistration: (reg: RegistrationRecord) => void;
  onStatusUpdate: (regId: string, status: RegistrationStatus) => void;
}

export const RegistrationTable: React.FC<RegistrationTableProps> = ({
  registrations,
  events,
  onSelectRegistration,
  onStatusUpdate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        r.full_name.toLowerCase().includes(q) ||
        r.registration_code.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.institution_name.toLowerCase().includes(q) ||
        r.student_id_number.toLowerCase().includes(q);

      // Event
      const matchEvent = eventFilter === 'all' || r.event_id === eventFilter;

      // Type
      const matchType = typeFilter === 'all' || r.participant_type === typeFilter;

      // Status
      const matchStatus = statusFilter === 'all' || r.registration_status === statusFilter;

      return matchSearch && matchEvent && matchType && matchStatus;
    });
  }, [registrations, searchQuery, eventFilter, typeFilter, statusFilter]);

  // Export CSV Handler
  const handleExportCSV = () => {
    const csvContent = registrationStore.exportRegistrationsToCSV(filteredRegistrations);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `yunifest-2026-registrations-${new Date().toISOString().slice(0, 10)}.csv`);
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
    <div className="bg-white border-[1.5px] border-slate-900 rounded-[32px] p-6 sm:p-8 shadow-solid-pop text-slate-950">
      
      {/* Top Controls: Search + Multi-Filters + Export Button */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-6 pb-6 border-b border-slate-200">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search code, participant name, college, email, or student ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F6F7F9] border-[1.5px] border-slate-900 focus:border-[#2B59FF] text-xs sm:text-sm text-slate-950 font-medium focus:outline-none"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Event Filter */}
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 font-bold focus:outline-none"
          >
            <option value="all">All Events</option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 font-bold focus:outline-none"
          >
            <option value="all">All Participants</option>
            <option value="ybn_student">YBN Students</option>
            <option value="outside_student">Visiting Delegates</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 font-bold focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="waitlisted">Waitlisted</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FEF08A] hover:bg-yellow-300 text-slate-950 font-display font-bold text-xs border border-slate-900 transition-colors shadow-sm ml-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

      </div>

      {/* Counter bar */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4 px-1">
        <span>Showing <strong>{filteredRegistrations.length}</strong> of <strong>{registrations.length}</strong> records</span>
        <span>Click any row to view full participant profile</span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F6F7F9] border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4">Ref Code</th>
              <th className="py-3 px-4">Participant</th>
              <th className="py-3 px-4">Institution</th>
              <th className="py-3 px-4">Event</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {filteredRegistrations.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500 font-mono text-xs">
                  No registration records matching the selected query.
                </td>
              </tr>
            ) : (
              filteredRegistrations.map((reg) => {
                const StatusIcon = statusBadges[reg.registration_status].icon;
                return (
                  <tr
                    key={reg.id}
                    onClick={() => onSelectRegistration(reg)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    {/* Code */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#2B59FF] whitespace-nowrap">
                      {reg.registration_code}
                    </td>

                    {/* Participant */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-950">{reg.full_name}</div>
                      <div className="font-mono text-[10px] text-slate-500">{reg.student_id_number}</div>
                    </td>

                    {/* Institution */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="truncate text-slate-800 font-medium">{reg.institution_name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{reg.course}</div>
                    </td>

                    {/* Event */}
                    <td className="py-3.5 px-4 max-w-[180px]">
                      <div className="font-bold text-slate-950 truncate">{reg.event_name}</div>
                      {reg.team_name && (
                        <div className="text-[10px] text-[#2B59FF] font-mono truncate">Team: {reg.team_name}</div>
                      )}
                    </td>

                    {/* Participant Type */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {reg.participant_type === 'ybn_student' ? (
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border border-slate-900">
                          YBN
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0E7FF] text-[#2B59FF] border border-blue-300">
                          VISITING
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${statusBadges[reg.registration_status].bg} ${statusBadges[reg.registration_status].text}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{reg.registration_status.toUpperCase()}</span>
                      </span>
                    </td>

                    {/* Quick Status Toggle */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1">
                        <select
                          value={reg.registration_status}
                          onChange={(e) => onStatusUpdate(reg.id, e.target.value as RegistrationStatus)}
                          className="px-2 py-1 rounded-lg bg-white border border-slate-300 text-[10px] font-bold text-slate-800 focus:outline-none"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="waitlisted">Waitlist</option>
                          <option value="rejected">Reject</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => onSelectRegistration(reg)}
                          className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          title="Inspect Record"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
