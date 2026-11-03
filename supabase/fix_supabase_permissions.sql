-- =========================================================================
-- YUNIFEST 2026 — Official Supabase Fix & Permissions Migration
-- =========================================================================
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/qopryjdzqylsjgymilyq
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Click "New Query"
-- 4. Paste this entire script into the editor and click "Run" (or Ctrl + Enter)
-- =========================================================================

-- Step 1: Ensure public schema permissions for API roles (anon and authenticated)
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- Step 2: Grant Table, Sequence, and Routine permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- Step 3: Ensure future tables and sequences automatically grant permissions
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO postgres, anon, authenticated, service_role;

-- Step 4: Ensure the events table exists
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  event_day VARCHAR(20) NOT NULL,
  timing_display VARCHAR(100) DEFAULT 'Schedule to be announced',
  venue VARCHAR(255) DEFAULT 'Main Campus, YBN University',
  registration_open BOOLEAN DEFAULT true,
  eligible_participant_types VARCHAR(50) DEFAULT 'all',
  capacity INTEGER DEFAULT NULL,
  capacity_unit VARCHAR(50) DEFAULT 'participants',
  rules TEXT[] DEFAULT '{}',
  student_coordinator VARCHAR(255) NOT NULL,
  faculty_coordinator VARCHAR(255) NOT NULL,
  icon_name VARCHAR(50) DEFAULT 'Award',
  accent_color VARCHAR(20) DEFAULT 'gold',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 5: Ensure the registrations table exists
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_code VARCHAR(50) UNIQUE NOT NULL,
  event_id VARCHAR(100) NOT NULL,
  participant_type VARCHAR(50) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  institution_name VARCHAR(255) NOT NULL,
  institution_location VARCHAR(255) DEFAULT NULL,
  department VARCHAR(255) DEFAULT NULL,
  course VARCHAR(255) NOT NULL,
  academic_year VARCHAR(50) NOT NULL,
  semester VARCHAR(50) DEFAULT NULL,
  student_id_number VARCHAR(100) NOT NULL,
  id_card_confirmed BOOLEAN DEFAULT false NOT NULL,
  participation_category VARCHAR(50) DEFAULT NULL,
  team_name VARCHAR(255) DEFAULT NULL,
  team_details TEXT DEFAULT NULL,
  event_specific_data JSONB DEFAULT '{}'::jsonb,
  consent BOOLEAN DEFAULT false NOT NULL,
  registration_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 6: Make event_id flexible (drop rigid UUID foreign key constraint if it exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'registrations_event_id_fkey' AND table_name = 'registrations'
  ) THEN
    ALTER TABLE public.registrations DROP CONSTRAINT registrations_event_id_fkey;
  END IF;
END $$;

ALTER TABLE public.registrations ALTER COLUMN event_id TYPE VARCHAR(100);

-- Step 7: Add Payment & UTR verification columns to registrations table
ALTER TABLE public.registrations 
  ADD COLUMN IF NOT EXISTS amount_inr INTEGER,
  ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'upi',
  ADD COLUMN IF NOT EXISTS transaction_id VARCHAR(100),
  ADD COLUMN IF NOT EXISTS payment_screenshot_url TEXT,
  ADD COLUMN IF NOT EXISTS payment_timestamp TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS payment_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS payment_verified_by VARCHAR(255);

-- Step 8: Re-apply grants after schema updates
GRANT ALL ON TABLE public.events TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.registrations TO anon, authenticated, service_role;

-- Step 9: Configure Row Level Security (RLS)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Events RLS: Public can view events
DROP POLICY IF EXISTS "Public can view active events" ON public.events;
CREATE POLICY "Public can view active events"
  ON public.events FOR SELECT
  TO anon, authenticated
  USING (true);

-- Registrations RLS: Public can submit registration
DROP POLICY IF EXISTS "Public can submit registration" ON public.registrations;
CREATE POLICY "Public can submit registration"
  ON public.registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    full_name IS NOT NULL 
    AND email IS NOT NULL 
    AND mobile IS NOT NULL
  );

-- Registrations RLS: Organizers & Attendees can view registrations
DROP POLICY IF EXISTS "Public and Admins can view registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can view all registrations" ON public.registrations;
CREATE POLICY "Public and Admins can view registrations"
  ON public.registrations FOR SELECT
  TO anon, authenticated
  USING (true);

-- Registrations RLS: Organizers can update registration status
DROP POLICY IF EXISTS "Admins can update registrations" ON public.registrations;
CREATE POLICY "Admins can update registrations"
  ON public.registrations FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Step 10: Seed official festival events if table is empty
INSERT INTO public.events (
  slug, name, description, category, event_day, timing_display, venue, 
  registration_open, eligible_participant_types, capacity, capacity_unit, 
  rules, student_coordinator, faculty_coordinator, icon_name, accent_color
) VALUES
  (
    'gaming-tournament',
    'Gaming Tournament (Free Fire & BGMI)',
    'Battle Royale esports showdown featuring intense tactical gameplay in Free Fire and Battlegrounds Mobile India. Compete for ultimate campus supremacy.',
    'gaming', 'day_1', 'Schedule to be announced', 'Main Auditorium / Computer Lab 1',
    true, 'all', 64, 'participants',
    ARRAY['Participants must choose between BGMI or Free Fire upon registration.', 'Players must carry their own mobile devices with the latest update.', 'Emulators, hacks, or third-party mods lead to instant disqualification.', 'Valid physical College ID card is mandatory at physical check-in.'],
    'Rounak Dubey', 'Neha Lakra Mam', 'Gamepad2', 'cyan'
  ),
  (
    'model-presentation',
    'Model Presentation Competition',
    'Showcase innovative working and static models addressing modern engineering, agricultural, environmental, and healthcare challenges.',
    'technical', 'day_1', 'Schedule to be announced', 'YBN Innovation Gallery',
    true, 'ybn_only', 30, 'teams',
    ARRAY['Open to bonafide YBN University students.', 'Teams must present live model and deliver a 5-minute technical briefing.', 'Originality and societal utility carry key evaluation marks.'],
    'Aryan Sharma', 'Dr. Asha Puran Mam', 'Cpu', 'gold'
  ),
  (
    'face-painting',
    'Face Painting Competition',
    'Transform your canvas with vibrant expressions, cultural motifs, and futuristic festival themes.',
    'creative', 'day_1', 'Schedule to be announced', 'Central Courtyard Area',
    true, 'ybn_only', 40, 'participants',
    ARRAY['Participants bring skin-friendly paints and brushes.', 'Time limit: 60 minutes.', 'Theme announced 15 minutes before start.', 'Participant must bring their own model.'],
    'Anmol Kumar', 'Dr. Chinnmaya Mam', 'Palette', 'magenta'
  ),
  (
    'creative-craft-workshop',
    'Creative Craft Workshop',
    'Hands-on masterclass focusing on sustainable craft design, indigenous art, and upcycling materials.',
    'creative', 'day_1', 'Schedule to be announced', 'Design Studio, Block B',
    true, 'ybn_only', 50, 'participants',
    ARRAY['Basic crafting materials provided by host faculty.', 'Bring scissors and measuring tools.', 'Certificates awarded upon project submission.'],
    'Anmol Kumar', 'Dr. Chinnmaya Mam', 'Scissors', 'gold'
  ),
  (
    'food-fest-flea-market',
    'Food Fest & Flea Market',
    'Gastronomic celebration featuring student culinary stalls, regional delicacies, and artisan crafts.',
    'special', 'day_1', 'All Day Event', 'Main Campus Grounds',
    false, 'ybn_only', 20, 'teams',
    ARRAY['Stall allotments coordinated directly by organizing committee.', 'Strict food hygiene standards must be upheld.', 'All registered YUNIFEST attendees enjoy open entry.'],
    'Meenu Mahato', 'Dr. Rachna Kumari', 'Utensils', 'gold'
  ),
  (
    'treasure-hunting',
    'Treasure Hunting',
    'A fast-paced, brain-teasing campus-wide adventure solving cryptic clues and uncovering hidden checkpoints.',
    'competition', 'day_2', 'Schedule to be announced', 'Entire Campus Grounds',
    true, 'all', 25, 'teams',
    ARRAY['Maximum capacity capped at 25 entries strictly.', 'Clues must be solved sequentially.', 'Tampering with physical clue markers results in disqualification.', 'Physical student ID card verification required.'],
    'Agrani Shrivastava', 'Dr. Sapna Kasari', 'Compass', 'gold'
  ),
  (
    'dance-competition',
    'Dance Competition',
    'Unleash electrifying choreography across classical, folk, contemporary, and hip-hop beats in solo, duo, and group divisions.',
    'cultural', 'day_2', 'Schedule to be announced', 'Main University Amphitheatre',
    true, 'all', 50, 'participants',
    ARRAY['Categories: Solo (3-4 mins), Duo (4-5 mins), or Group (5-8 mins, max 12 members).', 'Audio tracks submitted in MP3 format before event.', 'Costumes and props must adhere to university decorum.'],
    'Antara Chakraborty', 'Sheetal Sir', 'Music', 'magenta'
  ),
  (
    'singing-competition',
    'Singing Competition',
    'Vocal showdown welcoming Eastern classical, Bollywood, folk, Western, and acoustic talents.',
    'cultural', 'day_2', 'Schedule to be announced', 'Auditorium Stage 1',
    true, 'all', 40, 'participants',
    ARRAY['Categories: Solo or Duo vocal performance.', 'Time limit: 3-4 minutes.', 'Live acoustic instruments or standard karaoke backing tracks permitted.'],
    'Varshana Chatterjee', 'Dr. Madhumati Mam', 'Mic2', 'cyan'
  ),
  (
    'reel-competition',
    'Reel Competition',
    'Capture the pulse, adrenaline, and aesthetic vibes of YUNIFEST in 30-60 second cinematic reels.',
    'creative', 'day_2', 'Schedule to be announced', 'Digital Submission & Media Desk',
    true, 'all', 100, 'participants',
    ARRAY['Reel duration strictly 30 to 60 seconds.', 'Footage must be captured on YBN University campus during YUNIFEST 2026.', 'Must tag official fest handles.', 'Original content only.'],
    'Aryan Sharma', 'Dr. Asha Puran Mam', 'Video', 'magenta'
  ),
  (
    'mimicry-competition',
    'Mimicry Competition',
    'Master the art of theatrical impressions, voice modulation, and satire.',
    'cultural', 'day_2', 'Schedule to be announced', 'Open Stage B',
    true, 'all', 25, 'participants',
    ARRAY['Individual solo performance with maximum 4 minutes on stage.', 'No defamatory, religious, or political insults.', 'Voice clarity and humor evaluated.'],
    'Astha Kachhap', 'Abhilasha Mam', 'Smile', 'gold'
  ),
  (
    'stand-up-comedy',
    'Stand-up Comedy',
    'Grab the mic, share hilarious observations, and have the campus roaring with laughter.',
    'cultural', 'day_2', 'Schedule to be announced', 'Open Stage B',
    true, 'all', 25, 'participants',
    ARRAY['Performance time: 4 to 6 minutes strictly.', 'Content must be original.', 'No vulgar or communally sensitive remarks permitted.'],
    'Astha Kachhap', 'Abhilasha Mam', 'Sparkles', 'cyan'
  ),
  (
    'ramp-walk-fashion-show',
    'Ramp Walk / Fashion Show',
    'A showcase of haute couture, cultural heritage, and contemporary fashion aesthetics on the grand runway.',
    'cultural', 'day_3', 'Evening Gala', 'Grand Stage Arena',
    true, 'ybn_only', 35, 'participants',
    ARRAY['Open to bonafide YBN University students.', 'Themes and dress codes verified by faculty coordinators prior to event.'],
    'Megha Kumari', 'Namrata Mam', 'Crown', 'gold'
  ),
  (
    'official-award-ceremony',
    'Official Award Ceremony',
    'Honoring champions, innovators, cultural performers, and organizers with official university laurels.',
    'special', 'day_3', 'Late Afternoon', 'Grand Stage Arena',
    false, 'all', NULL, 'participants',
    ARRAY['All competition finalists and registered participants attend with ID cards.', 'Certificates and trophies conferred by University dignitaries.'],
    'Core Committee', 'YBN Advisory Board', 'Award', 'gold'
  ),
  (
    'dj-night-celebration',
    'Mega DJ Night Celebration',
    'The grand high-energy culmination of YUNIFEST 2026 featuring pulsating EDM beats and laser shows.',
    'special', 'day_3', 'Night Finale', 'Grand Open Stadium',
    false, 'all', NULL, 'participants',
    ARRAY['Strict entry with YUNIFEST 2026 Registration QR Pass and ID.', 'University security protocols apply throughout arena.'],
    'Core Organizing Committee', 'University Student Welfare', 'Radio', 'magenta'
  ),
  (
    'quiz-competition',
    'Quiz Competition',
    'Battle of intellect testing general awareness, science, technology, history, and pop culture.',
    'competition', 'tbd', 'Schedule to be announced', 'Auditorium Hall C',
    true, 'all', 50, 'teams',
    ARRAY['Teams of 2 participants.', 'Preliminary written screening round followed by live buzzer on-stage finals.', 'Timing will be officially announced and notified on this dashboard.'],
    'Core Academic Committee', 'Dr. Asha Puran Mam', 'HelpCircle', 'gold'
  ),
  (
    'poster-making',
    'Poster Making Competition',
    'Visual advocacy competition communicating themes of sustainable technology and cultural preservation.',
    'creative', 'tbd', 'Schedule to be announced', 'Fine Arts Gallery, Ground Floor',
    true, 'all', 40, 'participants',
    ARRAY['Standard A2 / A3 chart paper provided.', 'Bring own sketching and painting medium.', 'Time duration: 2 hours.'],
    'Aryan Sharma', 'Dr. Asha Puran Mam', 'FileImage', 'cyan'
  )
ON CONFLICT (slug) DO NOTHING;
