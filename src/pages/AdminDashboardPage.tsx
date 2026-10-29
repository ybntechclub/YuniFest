import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationRecord, EventItem, RegistrationStatus } from '../types/database';
import { registrationStore } from '../lib/registrationStore';
import { AdminNavbar } from '../components/admin/AdminNavbar';
import { StatsOverview } from '../components/admin/StatsOverview';
import { RegistrationTable } from '../components/admin/RegistrationTable';
import { RegistrationDetailModal } from '../components/admin/RegistrationDetailModal';
import { EventManagementTab } from '../components/admin/EventManagementTab';
import { LiveQRCodeModal } from '../components/admin/LiveQRCodeModal';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'registrations' | 'events'>('registrations');
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [selectedReg, setSelectedReg] = useState<RegistrationRecord | null>(null);
  const [isLiveQROpen, setIsLiveQROpen] = useState(false);

  // Auth Guard
  useEffect(() => {
    const auth = sessionStorage.getItem('yunifest_admin_auth');
    if (!auth) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setIsLoading(true);
    const [regs, evts] = await Promise.all([
      registrationStore.getRegistrations(),
      registrationStore.getEvents(),
    ]);
    setRegistrations(regs);
    setEvents(evts);
    setIsLoading(false);
  };

  const handleStatusUpdate = async (regId: string, newStatus: RegistrationStatus) => {
    await registrationStore.updateRegistrationStatus(regId, newStatus);
    const updated = await registrationStore.getRegistrations();
    setRegistrations(updated);
    if (selectedReg && (selectedReg.id === regId || selectedReg.registration_code === regId)) {
      setSelectedReg({ ...selectedReg, registration_status: newStatus });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('yunifest_admin_auth');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-slate-950 flex flex-col">
      <AdminNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLiveQR={() => setIsLiveQROpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 text-sm font-mono">Loading organizer dashboard...</p>
          </div>
        ) : (
          <>
            {activeTab === 'registrations' && (
              <div className="space-y-8 animate-fadeIn">
                <StatsOverview registrations={registrations} events={events} />
                <RegistrationTable
                  registrations={registrations}
                  events={events}
                  onSelectRegistration={(reg) => setSelectedReg(reg)}
                  onStatusUpdate={handleStatusUpdate}
                />
              </div>
            )}

            {activeTab === 'events' && (
              <div className="animate-fadeIn">
                <EventManagementTab
                  events={events}
                  onRefreshEvents={loadData}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Detail Modal */}
      <RegistrationDetailModal
        registration={selectedReg}
        onClose={() => setSelectedReg(null)}
        onStatusUpdate={handleStatusUpdate}
      />

      {/* Live QR Modal */}
      <LiveQRCodeModal
        isOpen={isLiveQROpen}
        onClose={() => setIsLiveQROpen(false)}
      />
    </div>
  );
};
