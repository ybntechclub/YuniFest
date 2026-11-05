export type ParticipantType = 'ybn_student' | 'outside_student';

export type EventDay = 'day_1' | 'day_2' | 'day_3' | 'tbd';

export type EventCategory = 
  | 'technical' 
  | 'cultural' 
  | 'gaming' 
  | 'creative' 
  | 'competition'
  | 'special';

export type EligibilityType = 'all' | 'ybn_only' | 'outside_only';

export type RegistrationStatus = 'pending' | 'confirmed' | 'waitlisted' | 'rejected';

export interface EventItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: EventCategory;
  event_day: EventDay;
  timing_display: string;
  venue: string;
  registration_open: boolean;
  eligible_participant_types: EligibilityType;
  capacity: number | null;
  capacity_unit: 'participants' | 'teams';
  rules: string[];
  student_coordinator: string;
  faculty_coordinator: string;
  icon_name: string;
  accent_color?: 'gold' | 'cyan' | 'magenta';
  created_at?: string;
  updated_at?: string;
}

export interface RegistrationRecord {
  id: string;
  registration_code: string;
  event_id: string;
  event_name?: string; // hydrated helper
  participant_type: ParticipantType;
  full_name: string;
  email: string;
  mobile: string;
  institution_name: string;
  institution_location?: string;
  department?: string;
  course: string;
  academic_year: string;
  semester?: string;
  student_id_number: string;
  id_card_confirmed: boolean;
  participation_category?: string; // Solo, Duo, Group
  team_name?: string;
  team_details?: string;
  day_1_event_id?: string;
  day_2_event_id?: string;
  day_3_event_id?: string;
  selected_events_by_day?: Record<string, any>;
  gaming_squad_members?: Array<{ name: string; ign: string; uid: string; role?: string }>;
  ramp_walk_theme?: string;
  iks_presentation_format?: string;
  face_art_category?: string;
  event_specific_data?: {
    gameChoice?: 'Free Fire' | 'BGMI';
    gameId?: string;
    gameIgn?: string;
    subCategory?: string;
    notes?: string;
    [key: string]: any;
  };
  consent: boolean;
  registration_status: RegistrationStatus;
  amount_inr?: number; // 399 for ybn_student, 499 for outside_student
  payment_method?: 'upi';
  transaction_id?: string; // UTR or Txn ID entered by user
  payment_screenshot_url?: string; // Data URL or storage URL
  payment_timestamp?: string; // ISO date-time of when user submitted payment
  payment_verified_at?: string; // ISO date-time when verified by payment head
  payment_verified_by?: string; // Name/email of verifier
  created_at: string;
  updated_at?: string;
}

export interface AdminUser {
  user_id: string;
  email: string;
  role: 'superadmin' | 'organizer';
  created_at: string;
}
