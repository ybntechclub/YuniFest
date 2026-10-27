import React, { useState, useMemo } from 'react';
import { RegistrationRecord, EventItem, RegistrationStatus } from '../../types/database';
import { registrationStore } from '../../lib/registrationStore';
import { 
  Search, Download, Filter, Eye, CheckCircle, Clock, XCircle, 
  AlertCircle, ArrowUpDown, Building2, GraduationCap, ChevronRight 
} from 'lucide-react';

interface RegistrationTableProps {
  registrations: RegistrationRecord[];
  events: EventItem[];
  onSelectRegistration: (reg: RegistrationRecord) => void;
  onStatusUpdate: (regId: string, newStatus: RegistrationStatus) => Promise<void>;
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
    confirmed: { bg: 'bg-emerald-950/80 border-emerald-500/40', text: 'text-emerald-300', icon: CheckCircle },
    pending: { bg: 'bg-amber-950/80 border-amber-500/40', text: 'text-amber-300', icon: Clock },
    waitlisted: { bg: 'bg-blue-950/80 border-blue-500/40', text: 'text-blue-300', icon: AlertCircle },
    rejected: { bg: 'bg-red-950/80 border-red-500/40', text: 'text-red-300', icon: XCircle },
  };

  return (
    <div className="bg-[#0D2345] border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-card-elevated">
      
      {/* Top Header & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display font-bold text-white text-lg">
            Participant Directory
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Showing <strong className="text-[#F5C451]">{filteredRegistrations.length}</strong> of {registrations.length} total participant records
          </p>
        </div>

        {/* Search & Export Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code, name, email, college..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-xs text-white placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] to-[#F5C451] hover:brightness-110 shadow-sm transition-all shrink-0"
          >
            <Download className="w-4 h-4 text-[#07152F]" />
            <span>Export CSV (Excel)</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-3 rounded-xl bg-[#07152F] border border-slate-800">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Filter by Event
          </label>
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0D2345] border border-slate-700 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">All Events</option>
            {events.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Participant Type
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0D2345] border border-slate-700 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="ybn_student">YBN Students Only</option>
            <option value="outside_student">Outside College Students</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Registration Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0D2345] border border-slate-700 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="waitlisted">Waitlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Registrations Responsive Table Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-700/80">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#07152F] uppercase text-[10px] font-bold tracking-wider text-slate-400 border-b border-slate-700">
            <tr>
              <th className="py-3 px-4">Ref Code</th>
              <th className="py-3 px-4">Participant</th>
              <th className="py-3 px-4">Event</th>
              <th className="py-3 px-4">Institution</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredRegistrations.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                  No registrations found matching the specified filters.
                </td>
              </tr>
            ) : (
              filteredRegistrations.map((reg) => {
                const badge = statusBadges[reg.registration_status] || statusBadges.pending;
                const StatusIcon = badge.icon;

                return (
                  <tr
                    key={reg.id}
                    className="hover:bg-[#112C57]/40 transition-colors cursor-pointer"
                    onClick={() => onSelectRegistration(reg)}
                  >
                    {/* Code */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#F5C451]">
                      {reg.registration_code}
                    </td>

                    {/* Participant */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">
                        {reg.full_name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {reg.email} • {reg.mobile}
                      </div>
                    </td>

                    {/* Event */}
                    <td className="py-3.5 px-4 font-medium text-slate-200">
                      {reg.event_name || reg.event_id}
                    </td>

                    {/* Institution */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        {reg.participant_type === 'ybn_student' ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F5C451]/20 text-[#F5C451]">
                            YBN
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300">
                            External
                          </span>
                        )}
                        <span className="truncate max-w-[140px] text-slate-300">
                          {reg.institution_name}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Roll: {reg.student_id_number}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="text-slate-300 font-semibold">
                        {reg.participation_category || 'Standard'}
                      </span>
                      {reg.team_name && (
                        <div className="text-[10px] text-[#F5C451] truncate max-w-[120px]">
                          {reg.team_name}
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${badge.bg} ${badge.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{reg.registration_status}</span>
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onSelectRegistration(reg)}
                        className="p-1.5 rounded-lg bg-[#07152F] hover:bg-[#112C57] text-slate-300 hover:text-white border border-slate-700"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
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
