-- =========================================================================
-- YUNIFEST 2026 — Unified Backend Schema & Multi-Day Event Updates
-- =========================================================================
-- Purpose:
-- 1. Updates official event definitions for:
--    - Ramp Walk / Fashion Show (Waste to Wow & Divas and Beasts, Unlimited Seats)
--    - Model Representation & Poster Making (Merged single event, IKS theme)
--    - Face Painting & Tattoo Making (Body art & temporary tattooing)
--    - Gaming Tournament (BGMI & Free Fire Max 4-member squad rosters)
-- 2. Enhances public.registrations with dedicated columns for 3-day multi-event tracking:
--    - day_1_event_id, day_2_event_id, day_3_event_id
--    - selected_events_by_day (JSONB)
--    - gaming_squad_members (JSONB for 4 players' Names, IGNs, and UIDs)
--    - ramp_walk_theme, iks_presentation_format, face_art_category
-- 3. Adds auto-sync trigger from event_specific_data to ensure 100% backward & forward compatibility.
-- 4. Creates reporting view (v_festival_master_passes) and fast lookup indexes.
--
-- How to apply:
-- 1. Open Supabase Dashboard: https://supabase.com/dashboard/project/qopryjdzqylsjgymilyq
-- 2. Go to "SQL Editor" -> Click "New Query"
-- 3. Paste this entire file and click "Run" (or Ctrl + Enter)
-- =========================================================================

-- -------------------------------------------------------------------------
-- STEP 1: ADD DEDICATED COLUMNS TO public.registrations
-- -------------------------------------------------------------------------
ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS selected_events_by_day JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS day_1_event_id VARCHAR(100) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS day_2_event_id VARCHAR(100) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS day_3_event_id VARCHAR(100) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS gaming_squad_members JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS ramp_walk_theme VARCHAR(150) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS iks_presentation_format VARCHAR(150) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS face_art_category VARCHAR(150) DEFAULT NULL;

-- -------------------------------------------------------------------------
-- STEP 2: CREATE PERFORMANCE & LOOKUP INDEXES
-- -------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_registrations_mobile ON public.registrations(mobile);
CREATE INDEX IF NOT EXISTS idx_registrations_code ON public.registrations(registration_code);
CREATE INDEX IF NOT EXISTS idx_registrations_student_id ON public.registrations(student_id_number);
CREATE INDEX IF NOT EXISTS idx_registrations_day_1 ON public.registrations(day_1_event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_day_2 ON public.registrations(day_2_event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_day_3 ON public.registrations(day_3_event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_events_jsonb ON public.registrations USING gin (selected_events_by_day);
CREATE INDEX IF NOT EXISTS idx_registrations_squad_jsonb ON public.registrations USING gin (gaming_squad_members);

-- -------------------------------------------------------------------------
-- STEP 3: AUTOMATIC SYNC TRIGGER FOR JSON & DEDICATED COLUMNS
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.sync_registration_event_data()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_specific_data IS NOT NULL THEN
    -- 3-Day Selected Events Map
    IF NEW.selected_events_by_day IS NULL OR NEW.selected_events_by_day = '{}'::jsonb THEN
      NEW.selected_events_by_day := COALESCE(NEW.event_specific_data->'selectedEventsByDay', '{}'::jsonb);
    END IF;

    -- Day-specific Event IDs
    IF NEW.day_1_event_id IS NULL THEN
      NEW.day_1_event_id := NEW.event_specific_data->'selectedEventsByDay'->'day_1'->>'id';
    END IF;

    IF NEW.day_2_event_id IS NULL THEN
      NEW.day_2_event_id := NEW.event_specific_data->'selectedEventsByDay'->'day_2'->>'id';
    END IF;

    IF NEW.day_3_event_id IS NULL THEN
      NEW.day_3_event_id := NEW.event_specific_data->'selectedEventsByDay'->'day_3'->>'id';
    END IF;

    -- 4-Player Gaming Squad Members
    IF NEW.gaming_squad_members IS NULL OR NEW.gaming_squad_members = '[]'::jsonb THEN
      NEW.gaming_squad_members := COALESCE(NEW.event_specific_data->'squadMembers', '[]'::jsonb);
    END IF;

    -- Ramp Walk Theme
    IF NEW.ramp_walk_theme IS NULL THEN
      NEW.ramp_walk_theme := NEW.event_specific_data->>'rampWalkTheme';
    END IF;

    -- Indian Knowledge System Presentation Format
    IF NEW.iks_presentation_format IS NULL THEN
      NEW.iks_presentation_format := NEW.event_specific_data->>'iksFormat';
    END IF;

    -- Face Art / Tattoo Category
    IF NEW.face_art_category IS NULL THEN
      NEW.face_art_category := NEW.event_specific_data->>'faceArtCategory';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_registration_event_data ON public.registrations;
CREATE TRIGGER trg_sync_registration_event_data
  BEFORE INSERT OR UPDATE ON public.registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_registration_event_data();

-- Backfill any existing historical registrations
UPDATE public.registrations
SET 
  selected_events_by_day = COALESCE(selected_events_by_day, event_specific_data->'selectedEventsByDay', '{}'::jsonb),
  day_1_event_id = COALESCE(day_1_event_id, event_specific_data->'selectedEventsByDay'->'day_1'->>'id'),
  day_2_event_id = COALESCE(day_2_event_id, event_specific_data->'selectedEventsByDay'->'day_2'->>'id'),
  day_3_event_id = COALESCE(day_3_event_id, event_specific_data->'selectedEventsByDay'->'day_3'->>'id'),
  gaming_squad_members = COALESCE(gaming_squad_members, event_specific_data->'squadMembers', '[]'::jsonb),
  ramp_walk_theme = COALESCE(ramp_walk_theme, event_specific_data->>'rampWalkTheme'),
  iks_presentation_format = COALESCE(iks_presentation_format, event_specific_data->>'iksFormat'),
  face_art_category = COALESCE(face_art_category, event_specific_data->>'faceArtCategory')
WHERE event_specific_data IS NOT NULL;

-- -------------------------------------------------------------------------
-- STEP 4: UPDATE OFFICIAL EVENTS MASTER DATA
-- -------------------------------------------------------------------------

-- 1. Ramp Walk / Fashion Show (Themes: Waste to Wow & Divas and Beasts, Unlimited Capacity)
UPDATE public.events
SET 
  name = 'Ramp Walk / Fashion Show',
  description = 'A glamorous runway showcase featuring two official themes: ''Waste to Wow'' (Sustainable Upcycled Couture) OR ''Divas and Beasts'' (High Glamour & Fantasy Avant-Garde).',
  category = 'cultural',
  event_day = 'day_3',
  timing_display = 'Evening Gala // 05:00 PM',
  venue = 'Grand Open-Air Main Stage',
  eligible_participant_types = 'all',
  capacity = NULL, -- UNLIMITED SEATS / NO MAX CAP
  capacity_unit = 'participants',
  rules = ARRAY[
    'Official Runway Themes: 1. ''Waste to Wow'' (Creative Eco-Fashion & Recycled Sustainable Couture) OR 2. ''Divas and Beasts'' (High Glamour, Mythological Elegance & Avant-Garde Fantasy).',
    'No maximum seat limit — open to all passionate delegates and student models.',
    'Costume styling and background music tracks must be registered with coordinators 2 hours prior to the showcase.',
    'Choreographed runway sequence featuring solo walks and duo pairings.'
  ],
  student_coordinator = 'Megha Kumari',
  faculty_coordinator = 'Namrata Mam',
  icon_name = 'Crown',
  updated_at = NOW()
WHERE slug = 'ramp-walk-fashion-show';

-- 2. Model Representation & Poster Making (Merged Single Event, IKS Theme)
UPDATE public.events
SET 
  name = 'Model Representation & Poster Making',
  description = 'Showcase innovative working/static models or research posters celebrating the Indian Knowledge System (IKS) — traditional sciences, indigenous technology, heritage architecture & Vedic mathematics.',
  category = 'technical',
  event_day = 'day_1',
  timing_display = 'Morning Session // 10:00 AM',
  venue = 'YBN Innovation & Exhibition Gallery',
  eligible_participant_types = 'all',
  capacity = 60,
  capacity_unit = 'teams',
  rules = ARRAY[
    'Official Theme: Indian Knowledge System (IKS) / Bhartiya Gyan Parampara.',
    'Participants can present either a Working/Static 3D Model OR an Academic/Cultural Poster (A1/A2 size).',
    'Teams of 1 to 4 members permitted.',
    '5-minute live briefing and presentation to the jury panel.',
    'Originality of concept, IKS depth, societal utility, and presentation carry key marks.'
  ],
  student_coordinator = 'Aryan Sharma',
  faculty_coordinator = 'Dr. Asha Puran Mam',
  icon_name = 'Cpu',
  updated_at = NOW()
WHERE slug IN ('model-presentation', 'poster-making');

-- 3. Face Painting & Tattoo Making (Body Art & Temporary Tattooing)
UPDATE public.events
SET 
  name = 'Face Painting & Tattoo Making',
  description = 'Transform your canvas with vibrant expressions, cultural motifs, creative temporary tattoo designs, and festival body art.',
  category = 'creative',
  event_day = 'day_1',
  timing_display = 'Schedule to be announced',
  venue = 'Central Courtyard Area',
  eligible_participant_types = 'all',
  capacity = 50,
  capacity_unit = 'participants',
  rules = ARRAY[
    'Categories: Thematic Face Painting or Creative Temporary Tattoo Art.',
    'Participants must bring their own skin-friendly, cosmetic-grade paints/inks and brushes.',
    'Time limit: 60 minutes strictly.',
    'Themes include: Indian Folklore, Futuristic Cyberpunk, Nature & Wildlife, or Tribal Heritage.',
    'Every participant must be accompanied by their model.'
  ],
  student_coordinator = 'Shreya Shukla',
  faculty_coordinator = 'Mrs. Pinky Kumari',
  icon_name = 'Palette',
  updated_at = NOW()
WHERE slug = 'face-painting';

-- 4. Gaming Tournament (BGMI & Free Fire Max 4-Member Squad Rosters)
UPDATE public.events
SET 
  name = 'Gaming Tournament (Free Fire & BGMI)',
  description = 'Battle Royale esports showdown featuring tactical squad gameplay in BGMI and Free Fire Max. Strictly 4 players per squad roster with all Character UIDs.',
  category = 'gaming',
  event_day = 'day_1',
  timing_display = 'Morning & Afternoon Brackets',
  venue = 'Main Auditorium / Computer Lab 1',
  eligible_participant_types = 'all',
  capacity = 64,
  capacity_unit = 'teams',
  rules = ARRAY[
    'Teams must register exactly 4 squad members with verified In-Game Names (IGNs) and Player UIDs.',
    'Tournament games: Battlegrounds Mobile India (BGMI) & Free Fire Max.',
    'Players must play on mobile devices (smartphones/tablets). Emulators and external triggers are strictly prohibited.',
    'All 4 players must present valid physical College/University ID cards during check-in.'
  ],
  student_coordinator = 'Rounak Dubey',
  faculty_coordinator = 'Neha Lakra Mam',
  icon_name = 'Gamepad2',
  updated_at = NOW()
WHERE slug = 'gaming-tournament';

-- -------------------------------------------------------------------------
-- STEP 5: ORGANIZER DASHBOARD & REPORTING VIEW
-- -------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.v_festival_master_passes AS
SELECT 
  r.id,
  r.registration_code,
  r.participant_type,
  r.full_name,
  r.email,
  r.mobile,
  r.institution_name,
  r.course,
  r.academic_year,
  r.student_id_number,
  r.id_card_confirmed,
  r.registration_status,
  r.amount_inr,
  r.transaction_id,
  r.day_1_event_id,
  r.selected_events_by_day->'day_1'->>'name' AS day_1_event_name,
  r.day_2_event_id,
  r.selected_events_by_day->'day_2'->>'name' AS day_2_event_name,
  r.day_3_event_id,
  r.selected_events_by_day->'day_3'->>'name' AS day_3_event_name,
  r.ramp_walk_theme,
  r.iks_presentation_format,
  r.face_art_category,
  r.team_name,
  r.gaming_squad_members,
  r.payment_screenshot_url,
  r.created_at
FROM public.registrations r;

-- -------------------------------------------------------------------------
-- STEP 6: BACKEND CHECKER FUNCTION FOR "MY PASS"
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.check_festival_pass(search_term TEXT)
RETURNS SETOF public.registrations
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT *
  FROM public.registrations
  WHERE 
    LOWER(TRIM(registration_code)) = LOWER(TRIM(search_term))
    OR mobile = REGEXP_REPLACE(search_term, '\D', '', 'g')
    OR LOWER(TRIM(email)) = LOWER(TRIM(search_term))
    OR LOWER(TRIM(student_id_number)) = LOWER(TRIM(search_term))
  ORDER BY created_at DESC
  LIMIT 1;
$$;

-- -------------------------------------------------------------------------
-- STEP 7: ENSURE PERMISSIONS & RLS POLICIES
-- -------------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE public.events TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE public.registrations TO postgres, anon, authenticated, service_role;
GRANT SELECT ON public.v_festival_master_passes TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.check_festival_pass(TEXT) TO postgres, anon, authenticated, service_role;

-- Done!
SELECT 'YUNIFEST 2026 backend schema successfully updated!' AS status;
