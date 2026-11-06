import { EventItem, RegistrationRecord, RegistrationStatus, ParticipantType } from '../types/database';
import { INITIAL_EVENTS } from '../data/initialEvents';
import { supabase, isSupabaseConfigured } from './supabase';
import { generateRegistrationCode } from './utils';

const EVENTS_STORAGE_KEY = 'yunifest_events_v3_2026';
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
    // Purge outdated event caches from previous versions to ensure new rules & eligibility apply
    try {
      localStorage.removeItem('yunifest_events_v1');
      localStorage.removeItem('yunifest_events_v2');
    } catch {
      // ignore
    }

    // Load events from LocalStorage or initialize with INITIAL_EVENTS
    const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (storedEvents) {
      try {
        const parsed = JSON.parse(storedEvents);
        // Verify that latest Day 1 events (like model-presentation open to 'all') are present
        const hasLatestEvents = Array.isArray(parsed) && parsed.some(
          (e: EventItem) => e.slug === 'model-presentation' && e.eligible_participant_types === 'all'
        );
        if (hasLatestEvents) {
          this.events = parsed;
        } else {
          this.events = INITIAL_EVENTS;
          this.saveEvents();
        }
      } catch {
        this.events = INITIAL_EVENTS;
        this.saveEvents();
      }
    } else {
      this.events = INITIAL_EVENTS;
      this.saveEvents();
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

    // Alias poster-making to combined model-presentation event
    if (clean === 'poster-making' || withoutPrefix === 'poster-making') {
      const merged = this.events.find(e => e.slug === 'model-presentation');
      if (merged) return merged;
    }

    // Safety fallback for 3-day composite festival pass
    if (clean === 'fest-3day-pass' || clean === 'fest-pass') {
      return {
        id: 'fest-3day-pass',
        slug: 'fest-3day-pass',
        name: 'YUNIFEST 2026 Three-Day Pass',
        description: 'All-access 3-day festival pass with full admission to competitions and cultural nights.',
        category: 'cultural',
        event_day: 'tbd',
        timing_display: 'Dec 10, 11 & 12, 2026',
        venue: 'YBN University Main Campus',
        registration_open: true,
        eligible_participant_types: 'all',
        capacity: null,
        capacity_unit: 'participants',
        rules: [],
        student_coordinator: 'Organizing Committee',
        faculty_coordinator: 'Faculty Mentors',
        icon_name: 'Sparkles',
        accent_color: 'gold',
        created_at: new Date().toISOString()
      };
    }

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
    // Temporary pending code — real YUNI-2026-XXXX token assigned only after admin confirms payment
    const tempCode = `PENDING-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const newRecord: RegistrationRecord = {
      ...input,
      amount_inr,
      payment_method: 'upi',
      id: "reg-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 7),
      registration_code: tempCode,
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

        const dayEvents = (newRecord.event_specific_data as any)?.selectedEventsByDay || {};
        const squadList = (newRecord.event_specific_data as any)?.squadMembers || [];
        const rampTheme = (newRecord.event_specific_data as any)?.rampWalkTheme || null;
        const iksFmt = (newRecord.event_specific_data as any)?.iksFormat || null;
        const faceArt = (newRecord.event_specific_data as any)?.faceArtCategory || null;

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
          payment_timestamp: newRecord.payment_timestamp || null,
          selected_events_by_day: dayEvents,
          day_1_event_id: dayEvents.day_1?.id || null,
          day_2_event_id: dayEvents.day_2?.id || null,
          day_3_event_id: dayEvents.day_3?.id || null,
          gaming_squad_members: squadList,
          ramp_walk_theme: rampTheme,
          iks_presentation_format: iksFmt,
          face_art_category: faceArt,
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
        const result = await supabase
          .from('registrations')
          .select('*')
          .order('created_at', { ascending: false });

        // When Supabase responds with data (even if 0 records []), it is the authoritative source:
        if (!result.error && Array.isArray(result.data)) {
          const mapped: RegistrationRecord[] = result.data.map((d: any) => ({
            ...d,
            event_name: this.getEventBySlugOrId(d.event_id)?.name || 'YUNIFEST 2026 Pass'
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

    // Generate official registration token when admin confirms payment
    if (status === 'confirmed') {
      if (!reg.registration_code || reg.registration_code.startsWith('PENDING-')) {
        reg.registration_code = generateRegistrationCode();
      }
      reg.payment_verified_at = reg.payment_verified_at || new Date().toISOString();
      reg.payment_verified_by = reg.payment_verified_by || 'Payment Verification Desk';
    }
    reg.updated_at = new Date().toISOString();
    this.saveRegistrations();

    if (isSupabaseConfigured) {
      try {
        const updatePayload: Record<string, unknown> = { 
          registration_status: status, 
          updated_at: reg.updated_at 
        };
        if (status === 'confirmed') {
          updatePayload.registration_code = reg.registration_code;
          updatePayload.payment_verified_at = reg.payment_verified_at;
          updatePayload.payment_verified_by = reg.payment_verified_by;
        }
        await supabase
          .from('registrations')
          .update(updatePayload)
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
    const rawId = (regId || '').trim();
    if (!rawId) return false;

    // Find record in memory to ensure we have both internal UUID id and human-readable registration_code
    const existing = this.registrations.find(r => r.id === rawId || r.registration_code === rawId);
    const targetId = existing?.id || rawId;
    const targetCode = existing?.registration_code || (rawId.startsWith('YUNI-') || rawId.startsWith('PENDING-') ? rawId : undefined);

    // Filter out from memory and persistent localStorage immediately
    this.registrations = this.registrations.filter(r => 
      r.id !== targetId && 
      r.id !== rawId && 
      r.registration_code !== targetCode && 
      r.registration_code !== rawId
    );
    this.saveRegistrations();

    if (isSupabaseConfigured) {
      try {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetId);
        let deleted = false;

        // 1. Delete by UUID if targetId matches UUID format
        if (isUuid) {
          const { error, count } = await supabase
            .from('registrations')
            .delete({ count: 'exact' })
            .eq('id', targetId);

          if (!error && (count ?? 0) > 0) {
            deleted = true;
          }
        }

        // 2. If not deleted yet, delete by registration_code (VARCHAR)
        if (!deleted && targetCode) {
          const { error: codeErr } = await supabase
            .from('registrations')
            .delete()
            .eq('registration_code', targetCode);

          if (codeErr) {
            console.warn('Supabase delete by registration_code warning:', codeErr);
          } else {
            deleted = true;
          }
        }

        // 3. Fallback: if rawId was passed and hasn't matched UUID, also attempt registration_code match
        if (!deleted && !isUuid && rawId) {
          await supabase
            .from('registrations')
            .delete()
            .eq('registration_code', rawId);
        }
      } catch (err) {
        console.error('Failed to delete registration from Supabase:', err);
        return false;
      }
    }
    return true;
  }

  // Lookup registration by code, mobile, email, or student ID (Backend Checker for My Pass)
  async getRegistrationByReference(query: string): Promise<RegistrationRecord | null> {
    const raw = query.trim();
    if (!raw) return null;
    const cleanDigits = raw.replace(/\D/g, '');

    // 1. Try Supabase backend if configured
    if (isSupabaseConfigured) {
      try {
        let filterParts: string[] = [
          `registration_code.ilike.%${raw}%`,
          `email.ilike.%${raw}%`,
          `student_id_number.ilike.%${raw}%`
        ];
        if (cleanDigits.length >= 7) {
          filterParts.push(`mobile.ilike.%${cleanDigits}%`);
        }

        const { data, error } = await supabase
          .from('registrations')
          .select('*')
          .or(filterParts.join(','))
          .order('created_at', { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0) {
          const row = data[0];
          return {
            ...row,
            event_name: this.getEventBySlugOrId(row.event_id)?.name || 'YUNIFEST 2026 Pass'
          } as RegistrationRecord;
        }
      } catch (err) {
        console.warn('Supabase getRegistrationByReference error:', err);
      }
    }

    // 2. Check local store fallback
    const lower = raw.toLowerCase();
    const local = this.registrations.find(r => 
      r.registration_code?.toLowerCase().includes(lower) ||
      r.email?.toLowerCase().includes(lower) ||
      r.student_id_number?.toLowerCase().includes(lower) ||
      (cleanDigits.length >= 7 && r.mobile?.replace(/\D/g, '').includes(cleanDigits))
    );

    return local || null;
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
