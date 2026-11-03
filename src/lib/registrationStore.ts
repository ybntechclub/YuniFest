import { EventItem, RegistrationRecord, RegistrationStatus, ParticipantType } from '../types/database';
import { INITIAL_EVENTS } from '../data/initialEvents';
import { supabase, isSupabaseConfigured } from './supabase';
import { generateRegistrationCode } from './utils';

const EVENTS_STORAGE_KEY = 'yunifest_events_v1';
const REGISTRATIONS_STORAGE_KEY = 'yunifest_registrations_v1';

// Sample seed registrations for demonstration & testing in dashboard
const SAMPLE_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: "reg-sample-1",
    registration_code: "YUNI-2026-A8F2",
    event_id: "evt-gaming-tournament",
    event_name: "Gaming Tournament (Free Fire & BGMI)",
    participant_type: "ybn_student",
    full_name: "Aman Kumar Verma",
    email: "aman.verma@ybn.edu.in",
    mobile: "9876543210",
    institution_name: "YBN University, Ranchi",
    department: "Computer Science & Engineering",
    course: "B.Tech CSE",
    academic_year: "3rd Year",
    semester: "5th Semester",
    student_id_number: "YBN/2023/BT-042",
    id_card_confirmed: true,
    participation_category: "Solo",
    event_specific_data: {
      gameChoice: "BGMI",
      gameId: "5123984712",
      gameIgn: "Soul_Striker99"
    },
    consent: true,
    registration_status: "confirmed",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: "reg-sample-2",
    registration_code: "YUNI-2026-K9P4",
    event_id: "evt-dance-competition",
    event_name: "Dance Competition",
    participant_type: "outside_student",
    full_name: "Priya Sundaram",
    email: "priya.sundaram@bitmesra.ac.in",
    mobile: "9835123456",
    institution_name: "Birla Institute of Technology, Mesra",
    institution_location: "Ranchi, Jharkhand",
    course: "BCA",
    academic_year: "2nd Year",
    semester: "3rd Semester",
    student_id_number: "BITM/2024/BCA-104",
    id_card_confirmed: true,
    participation_category: "Group",
    team_name: "Rhythm Waves",
    team_details: "1. Priya Sundaram (Lead)\n2. Shalini Kumari (BITM/2024/BCA-109)\n3. Riya Sen (BITM/2024/BCA-115)\n4. Aditi Roy (BITM/2024/BCA-118)",
    consent: true,
    registration_status: "pending",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "reg-sample-3",
    registration_code: "YUNI-2026-TR25",
    event_id: "evt-treasure-hunting",
    event_name: "Treasure Hunting",
    participant_type: "outside_student",
    full_name: "Rohit Raj",
    email: "rohit.raj@ranchiuniv.ac.in",
    mobile: "9431102938",
    institution_name: "Ranchi University",
    institution_location: "Ranchi, Jharkhand",
    course: "B.Sc Physics",
    academic_year: "3rd Year",
    student_id_number: "RU/2023/SCI-091",
    id_card_confirmed: true,
    participation_category: "Team",
    team_name: "The Cryptic Four",
    team_details: "Rohit Raj (Captain), Ankit Kumar, Vikas Yadav, Saurav Paul",
    consent: true,
    registration_status: "confirmed",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: "reg-sample-4",
    registration_code: "YUNI-2026-M7D1",
    event_id: "evt-model-presentation",
    event_name: "Model Presentation Competition",
    participant_type: "ybn_student",
    full_name: "Sneha Tigga",
    email: "sneha.tigga@ybn.edu.in",
    mobile: "9122334455",
    institution_name: "YBN University, Ranchi",
    department: "Faculty of Agriculture",
    course: "B.Sc (Hons) Agriculture",
    academic_year: "4th Year",
    semester: "7th Semester",
    student_id_number: "YBN/2022/AG-019",
    id_card_confirmed: true,
    participation_category: "Team",
    team_name: "AgriTech Innovators",
    team_details: "Model: Solar Automated Drip Irrigation System with Soil Moisture Telemetry",
    consent: true,
    registration_status: "confirmed",
    created_at: new Date(Date.now() - 3600000 * 6).toISOString()
  }
];

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

    // Load registrations from LocalStorage or initialize with sample records
    const storedRegistrations = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
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

  private saveEvents() {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(this.events));
  }

  private saveRegistrations() {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(this.registrations));
  }

  // Fetch events list
  async getEvents(): Promise<EventItem[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('name');
        if (!error && data && data.length > 0) {
          this.events = data as EventItem[];
          this.saveEvents();
          return this.events;
        }
      } catch (err) {
        console.warn('Supabase getEvents fallback to local store:', err);
      }
    }
    return [...this.events];
  }

  // Get specific event by slug or id
  getEventBySlugOrId(identifier: string): EventItem | undefined {
    return this.events.find(e => e.slug === identifier || e.id === identifier);
  }

  // Update event details (Admin feature)
  async updateEvent(updatedEvent: EventItem): Promise<boolean> {
    const index = this.events.findIndex(e => e.id === updatedEvent.id);
    if (index === -1) return false;

    this.events[index] = { ...updatedEvent, updated_at: new Date().toISOString() };
    this.saveEvents();

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('events')
          .update({
            name: updatedEvent.name,
            description: updatedEvent.description,
            category: updatedEvent.category,
            event_day: updatedEvent.event_day,
            timing_display: updatedEvent.timing_display,
            venue: updatedEvent.venue,
            registration_open: updatedEvent.registration_open,
            eligible_participant_types: updatedEvent.eligible_participant_types,
            capacity: updatedEvent.capacity,
            capacity_unit: updatedEvent.capacity_unit,
            rules: updatedEvent.rules,
            student_coordinator: updatedEvent.student_coordinator,
            faculty_coordinator: updatedEvent.faculty_coordinator,
            updated_at: new Date().toISOString()
          })
          .eq('id', updatedEvent.id);
      } catch (err) {
        console.warn('Supabase updateEvent error:', err);
      }
    }
    return true;
  }

  // Get current registration count for an event
  getRegistrationCount(eventId: string): number {
    return this.registrations.filter(r => r.event_id === eventId && r.registration_status !== 'rejected').length;
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

        if (!result.error && result.data && result.data.length > 0) {
          const mapped: RegistrationRecord[] = result.data.map((d: any) => ({
            ...d,
            event_name: d.events?.name || this.getEventBySlugOrId(d.event_id)?.name || 'Event'
          }));
          this.registrations = mapped;
          this.saveRegistrations();
          return mapped;
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
