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
  created_at: string;
  updated_at?: string;
}

export interface AdminUser {
  user_id: string;
  email: string;
  role: 'superadmin' | 'organizer';
  created_at: string;
}
