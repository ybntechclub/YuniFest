import { EventItem, RegistrationRecord, RegistrationStatus, ParticipantType } from '../types/database';
import { INITIAL_EVENTS } from '../data/initialEvents';
import { supabase, isSupabaseConfigured } from './supabase';
import { generateRegistrationCode } from './utils';

const EVENTS_STORAGE_KEY = 'yunifest_events_v1';
const REGISTRATIONS_STORAGE_KEY = 'yunifest_registrations_v1';
const EVENT_OVERRIDES_KEY = 'yunifest_event_overrides_v1';

// Seed sample registrations (only used if Supabase is completely unconfigured)
const SAMPLE_REGISTRATIONS: RegistrationRecord[] = [];

class RegistrationStore {
  private events: EventItem[] = [];
  private registrations: RegistrationRecord[] = [];

  constructor() {
    this.init();
  }

  private init() {
    // Load events from LocalStorage or initialize with INITIAL_EVENTS
    const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (storedEvents) {
      try {
        this.events = JSON.parse(storedEvents);
      } catch {
        this.events = INITIAL_EVENTS;
      }
    } else {
      this.events = INITIAL_EVENTS;
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(this.events));
    }

    // Registrations Initialization:
    // If Supabase is configured, live database is the single source of truth.
    // Purge any legacy sample mock data from localStorage if present.
    const storedRegistrations = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    if (isSupabaseConfigured) {
      if (storedRegistrations && (storedRegistrations.includes('reg-sample-') || storedRegistrations.includes('Aman Kumar Verma') || storedRegistrations.includes('Priya Sundaram'))) {
        localStorage.removeItem(REGISTRATIONS_STORAGE_KEY);
        this.registrations = [];
      } else if (storedRegistrations) {
        try {
          this.registrations = JSON.parse(storedRegistrations);
        } catch {
          this.registrations = [];
        }
      } else {
        this.registrations = [];
      }
    } else {
      if (storedRegistrations) {
        try {
          this.registrations = JSON.parse(storedRegistrations);
        } catch {
          this.registrations = SAMPLE_REGISTRATIONS;
        }
      } else {
        this.registrations = SAMPLE_REGISTRATIONS;
        localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(this.registrations));
      }
    }
  }

  private saveEvents() {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(this.events));
  }

  private saveRegistrations() {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(this.registrations));
  }

  // Clear local storage cache
  clearLocalCache() {
    this.registrations = [];
    localStorage.removeItem(REGISTRATIONS_STORAGE_KEY);
  }

  // Local event parameter overrides (persists admin changes reliably)
  private loadEventOverrides(): Record<string, Partial<EventItem>> {
    try {
      const raw = localStorage.getItem(EVENT_OVERRIDES_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private saveEventOverride(event: EventItem) {
    try {
      const overrides = this.loadEventOverrides();
      if (event.id) overrides[event.id] = event;
      if (event.slug) overrides[event.slug] = event;
      localStorage.setItem(EVENT_OVERRIDES_KEY, JSON.stringify(overrides));
    } catch (err) {
      console.warn('Failed to save event override:', err);
    }
  }

  // Fetch events list
  async getEvents(): Promise<EventItem[]> {
    const overrides = this.loadEventOverrides();

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('name');
        if (!error && data && data.length > 0) {
          const dbEvents = data as EventItem[];
          // Merge Supabase events with any local overrides so admin edits persist
          this.events = dbEvents.map(evt => {
            const override = overrides[evt.id] || (evt.slug ? overrides[evt.slug] : undefined);
            return override ? { ...evt, ...override } : evt;
          });
          this.saveEvents();
          return [...this.events];
        }
      } catch (err) {
        console.warn('Supabase getEvents fallback to local store:', err);
      }
    }

    // Fallback: apply overrides to local events
    this.events = this.events.map(evt => {
      const override = overrides[evt.id] || (evt.slug ? overrides[evt.slug] : undefined);
      return override ? { ...evt, ...override } : evt;
    });
    return [...this.events];
  }

  // Get specific event by slug or id
  getEventBySlugOrId(identifier: string): EventItem | undefined {
    if (!identifier) return undefined;
    const clean = identifier.trim();
    const withoutPrefix = clean.replace(/^evt-/, '');
    return this.events.find(e => 
      e.slug === clean || 
      e.id === clean || 
      e.slug === withoutPrefix ||
      `evt-${e.slug}` === clean
    );
  }

  // Update event details (Admin feature)
  async updateEvent(updatedEvent: EventItem): Promise<{ success: boolean; cloudSynced: boolean; error?: string }> {
    const targetSlug = updatedEvent.slug || (updatedEvent.id ? updatedEvent.id.replace(/^evt-/, '') : '');
    const index = this.events.findIndex(e => 
      e.id === updatedEvent.id || 
      e.slug === updatedEvent.slug ||
      (targetSlug && e.slug === targetSlug)
    );
    if (index === -1) {
      return { success: false, cloudSynced: false, error: 'Event not found in directory' };
    }

    const current = this.events[index];
    const merged: EventItem = {
      ...current,
      ...updatedEvent,
      id: current.id || updatedEvent.id,
      slug: current.slug || updatedEvent.slug || targetSlug,
      updated_at: new Date().toISOString()
    };

    this.events[index] = merged;
    this.saveEvents();
    this.saveEventOverride(merged);

    let cloudSynced = false;
    let cloudError: string | undefined = undefined;

    if (isSupabaseConfigured) {
      try {
        const payload = {
          name: merged.name,
          description: merged.description,
          category: merged.category,
          event_day: merged.event_day,
          timing_display: merged.timing_display,
          venue: merged.venue,
          registration_open: merged.registration_open,
          eligible_participant_types: merged.eligible_participant_types,
          capacity: merged.capacity,
          capacity_unit: merged.capacity_unit,
          rules: merged.rules,
          student_coordinator: merged.student_coordinator,
          faculty_coordinator: merged.faculty_coordinator,
          updated_at: merged.updated_at
        };

        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(merged.id);
        let query = supabase.from('events').update(payload);
        if (isUuid) {
          query = query.eq('id', merged.id);
        } else if (merged.slug) {
          query = query.eq('slug', merged.slug);
        } else {
          query = query.eq('id', merged.id);
        }

        const { data, error } = await query.select();
        if (error) {
          console.warn('Supabase updateEvent error:', error);
          cloudError = error.message;
        } else if (data && data.length > 0) {
          cloudSynced = true;
          this.events[index] = data[0] as EventItem;
          this.saveEvents();
          this.saveEventOverride(this.events[index]);
        } else {
          console.warn('Supabase updateEvent affected 0 rows (RLS update policy may need fix_events_rls.sql)');
          cloudError = 'Database update policy blocked cloud sync. Run supabase/fix_events_rls.sql in Supabase Dashboard.';
        }
      } catch (err: any) {
        console.warn('Supabase updateEvent error:', err);
        cloudError = err.message || 'Error updating event in Supabase';
      }
    }

    return { success: true, cloudSynced, error: cloudError };
  }

  // Get current registration count for an event
  getRegistrationCount(eventId: string): number {
    const event = this.getEventBySlugOrId(eventId);
    const validIds = new Set<string>([eventId]);
    if (event) {
      if (event.id) validIds.add(event.id);
      if (event.slug) validIds.add(event.slug);
      if (event.slug) validIds.add(`evt-${event.slug}`);
    }
    return this.registrations.filter(r => validIds.has(r.event_id) && r.registration_status !== 'rejected').length;
  }

  // Check capacity limit
  checkCapacityAvailable(eventId: string): { available: boolean; currentCount: number; maxCapacity: number | null } {
    const event = this.getEventBySlugOrId(eventId);
    const currentCount = this.getRegistrationCount(eventId);
    if (!event || event.capacity === null) {
      return { available: true, currentCount, maxCapacity: null };
    }
    return {
      available: currentCount < event.capacity,
      currentCount,
      maxCapacity: event.capacity
    };
  }

  // Submit a new registration
  async submitRegistration(input: Omit<RegistrationRecord, 'id' | 'registration_code' | 'created_at' | 'registration_status'>): Promise<{ success: boolean; data?: RegistrationRecord; error?: string }> {
    const event = this.getEventBySlugOrId(input.event_id);
    if (!event) {
      return { success: false, error: "Selected event not found." };
    }

    if (!event.registration_open) {
      return { success: false, error: `Registration for ${event.name} is currently closed.` };
    }

    // Check eligibility
    if (input.participant_type === 'outside_student' && event.eligible_participant_types === 'ybn_only') {
      return { success: false, error: `This event is restricted to bonafide YBN University students only.` };
    }

    // Capacity verification
    const capacityStatus = this.checkCapacityAvailable(input.event_id);
    if (!capacityStatus.available) {
      return {
        success: false,
        error: `Registration capacity reached for ${event.name} (${capacityStatus.currentCount}/${capacityStatus.maxCapacity} ${event.capacity_unit}).`
      };
    }

    // 1. Mobile number validation (strictly 10 digits)
    const cleanMobile = input.mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      return { 
        success: false, 
        error: `Mobile number must be exactly 10 digits (received ${cleanMobile.length} digits).` 
      };
    }

    // 2. Transaction / UTR ID uniqueness check (across all registrations)
    if (input.transaction_id && input.transaction_id.trim()) {
      const cleanTxn = input.transaction_id.trim().toUpperCase();
      
      // Check local cache
      const isDuplicateTxn = this.registrations.some(
        r => r.transaction_id && r.transaction_id.trim().toUpperCase() === cleanTxn
      );
      if (isDuplicateTxn) {
        return {
          success: false,
          error: `Transaction / UTR ID "${input.transaction_id}" has already been used for another registration. Every registration must have a unique payment transaction ID.`
        };
      }

      // Check remote Supabase database
      if (isSupabaseConfigured) {
        try {
          const { data: existingTxn } = await supabase
            .from('registrations')
            .select('id, registration_code')
            .ilike('transaction_id', cleanTxn)
            .limit(1);

          if (existingTxn && existingTxn.length > 0) {
            return {
              success: false,
              error: `Transaction / UTR ID "${input.transaction_id}" has already been submitted for registration ${existingTxn[0].registration_code}. Duplicate payment references are not allowed.`
            };
          }
        } catch (err) {
          console.warn('Supabase remote txn check note:', err);
        }
      }
    }

    // 3. Student ID & Email duplicate check
    const cleanStudentId = input.student_id_number.trim().toLowerCase();
    const cleanEmail = input.email.trim().toLowerCase();

    const isDuplicate = this.registrations.some(
      r => r.event_id === input.event_id &&
           (r.student_id_number.trim().toLowerCase() === cleanStudentId ||
            r.email.trim().toLowerCase() === cleanEmail)
    );

    if (isDuplicate) {
      return {
        success: false,
        error: `A registration with ID "${input.student_id_number}" or email "${input.email}" already exists for this event.`
      };
    }

    const amount_inr = input.amount_inr || (input.participant_type === 'ybn_student' ? 399 : 499);
    const newRecord: RegistrationRecord = {
      ...input,
      amount_inr,
      payment_method: 'upi',
      id: "reg-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 7),
      registration_code: generateRegistrationCode(),
      event_name: event.name,
      registration_status: "pending", // Pending manual verification by payment head
      payment_timestamp: input.payment_timestamp || new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    // Save to memory and local storage
    this.registrations.unshift(newRecord);
    this.saveRegistrations();

    // If Supabase is connected, attempt remote insert
    if (isSupabaseConfigured) {
      try {
        // Resolve event ID: if database uses UUIDs, map by slug or name
        let dbEventId = newRecord.event_id;
        const matchingEvent = this.events.find(e => 
          e.id === newRecord.event_id || 
          e.slug === newRecord.event_id || 
          (event && (e.slug === event.slug || e.name === event.name))
        );
        if (matchingEvent && matchingEvent.id) {
          dbEventId = matchingEvent.id;
        }

        const { data, error } = await supabase.from('registrations').insert({
          registration_code: newRecord.registration_code,
          event_id: dbEventId,
          participant_type: newRecord.participant_type,
          full_name: newRecord.full_name,
          email: newRecord.email,
          mobile: newRecord.mobile.replace(/\D/g, '').slice(0, 10),
          institution_name: newRecord.institution_name,
          institution_location: newRecord.institution_location || null,
          department: newRecord.department || null,
          course: newRecord.course,
          academic_year: newRecord.academic_year,
          semester: newRecord.semester || null,
          student_id_number: newRecord.student_id_number,
          id_card_confirmed: newRecord.id_card_confirmed,
          participation_category: newRecord.participation_category || null,
          team_name: newRecord.team_name || null,
          team_details: newRecord.team_details || null,
          event_specific_data: newRecord.event_specific_data || {},
          consent: newRecord.consent,
          registration_status: newRecord.registration_status,
          amount_inr: newRecord.amount_inr,
          payment_method: newRecord.payment_method || 'upi',
          transaction_id: newRecord.transaction_id || null,
          payment_screenshot_url: newRecord.payment_screenshot_url || null,
          payment_timestamp: newRecord.payment_timestamp || null
        }).select();

        if (error) {
          console.error('Supabase insert error:', error.message, error);
          if (error.code === '23505') {
            return {
              success: false,
              error: `A registration with ID "${newRecord.student_id_number}" or email "${newRecord.email}" already exists for this event.`
            };
          }
          return {
            success: false,
            error: `Failed to save to Supabase: ${error.message}`
          };
        } else {
          console.log('Successfully saved registration to Supabase:', data);
        }
      } catch (err: any) {
        console.error('Supabase remote push failed:', err);
        return {
          success: false,
          error: `Network error saving to Supabase: ${err.message || 'Check your internet connection'}`
        };
      }
    }

    return { success: true, data: newRecord };
  }

  // Get registrations (Admin)
  async getRegistrations(): Promise<RegistrationRecord[]> {
    if (isSupabaseConfigured) {
      try {
        let result = await supabase
          .from('registrations')
          .select('*, events(name)')
          .order('created_at', { ascending: false });

        // Fallback to simple select if foreign join fails
        if (result.error) {
          result = await supabase
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false });
        }

        // When Supabase responds with data (even if 0 records []), it is the authoritative source:
        if (!result.error && Array.isArray(result.data)) {
          const mapped: RegistrationRecord[] = result.data.map((d: any) => ({
            ...d,
            event_name: d.events?.name || this.getEventBySlugOrId(d.event_id)?.name || 'Event'
          }));
          this.registrations = mapped;
          this.saveRegistrations();
          return mapped;
        } else if (result.error) {
          console.warn('Supabase query error:', result.error);
        }
      } catch (err) {
        console.warn('Supabase getRegistrations fallback to local:', err);
      }
    }
    return [...this.registrations];
  }

  // Update registration status (Admin)
  async updateRegistrationStatus(regId: string, status: RegistrationStatus): Promise<boolean> {
    const reg = this.registrations.find(r => r.id === regId || r.registration_code === regId);
    if (!reg) return false;

    reg.registration_status = status;
    if (status === 'confirmed') {
      reg.payment_verified_at = reg.payment_verified_at || new Date().toISOString();
      reg.payment_verified_by = reg.payment_verified_by || 'Payment Verification Desk';
    }
    reg.updated_at = new Date().toISOString();
    this.saveRegistrations();

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('registrations')
          .update({ 
            registration_status: status, 
            payment_verified_at: reg.payment_verified_at,
            payment_verified_by: reg.payment_verified_by,
            updated_at: reg.updated_at 
          })
          .or(`id.eq.${regId},registration_code.eq.${regId}`);
      } catch (err) {
        console.warn('Supabase update status failed:', err);
      }
    }

    return true;
  }

  // Manual payment verification with email confirmation simulation
  async verifyPayment(regId: string, verifiedBy: string = "Payment Head"): Promise<{ success: boolean; data?: RegistrationRecord; error?: string }> {
    const reg = this.registrations.find(r => r.id === regId || r.registration_code === regId);
    if (!reg) return { success: false, error: "Registration record not found." };

    reg.registration_status = 'confirmed';
    reg.payment_verified_at = new Date().toISOString();
    reg.payment_verified_by = verifiedBy;
    reg.updated_at = new Date().toISOString();
    this.saveRegistrations();

    return { success: true, data: reg };
  }

  // Delete registration record (Admin)
  async deleteRegistration(regId: string): Promise<boolean> {
    this.registrations = this.registrations.filter(r => r.id !== regId && r.registration_code !== regId);
    this.saveRegistrations();

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('registrations')
          .delete()
          .or(`id.eq.${regId},registration_code.eq.${regId}`);

        if (error) {
          console.error('Supabase delete registration error:', error);
          return false;
        }
      } catch (err) {
        console.error('Failed to delete registration from Supabase:', err);
        return false;
      }
    }
    return true;
  }

  // Export registrations as CSV
  exportRegistrationsToCSV(records: RegistrationRecord[]): string {
    const headers = [
      "Registration Code",
      "Event Name",
      "Participant Type",
      "Full Name",
      "Email",
      "Mobile",
      "Institution",
      "Course",
      "Academic Year",
      "Student ID Number",
      "Category",
      "Team Name",
      "Team Members",
      "Specific Details",
      "Status",
      "Registration Time"
    ];

    const escapeCSV = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = records.map(r => {
      const specificDetails = r.event_specific_data 
        ? Object.entries(r.event_specific_data).map(([k, v]) => `${k}: ${v}`).join('; ')
        : '';

      return [
        escapeCSV(r.registration_code),
        escapeCSV(r.event_name || this.getEventBySlugOrId(r.event_id)?.name || r.event_id),
        escapeCSV(r.participant_type === 'ybn_student' ? 'YBN Student' : 'Outside College'),
        escapeCSV(r.full_name),
        escapeCSV(r.email),
        escapeCSV(r.mobile),
        escapeCSV(r.institution_name),
        escapeCSV(r.course),
        escapeCSV(r.academic_year),
        escapeCSV(r.student_id_number),
        escapeCSV(r.participation_category || 'N/A'),
        escapeCSV(r.team_name || 'N/A'),
        escapeCSV(r.team_details || 'N/A'),
        escapeCSV(specificDetails),
        escapeCSV(r.registration_status),
        escapeCSV(r.created_at)
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }
}

export const registrationStore = new RegistrationStore();
