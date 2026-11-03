-- =========================================================================
-- YUNIFEST 2026 — Fix Events Table Row Level Security (RLS)
-- =========================================================================
-- Purpose:
-- Allows the Organizer / Admin Dashboard to update event parameters
-- (gate open/closed, capacity, timings, venue, coordinators) directly
-- in the Supabase database.
--
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/qopryjdzqylsjgymilyq
-- 2. Click "SQL Editor" in the left navigation sidebar
-- 3. Click "New Query"
-- 4. Paste this entire script into the editor
-- 5. Click "Run" (or Ctrl + Enter)
-- =========================================================================

-- 1. Ensure schema and table permissions are granted to anon & authenticated
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE public.events TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE public.registrations TO postgres, anon, authenticated, service_role;

-- 2. Allow Admin/Organizer panel to UPDATE events
DROP POLICY IF EXISTS "Admins can update events" ON public.events;
CREATE POLICY "Admins can update events"
  ON public.events FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 3. Allow Admin/Organizer panel to INSERT events
DROP POLICY IF EXISTS "Admins can insert events" ON public.events;
CREATE POLICY "Admins can insert events"
  ON public.events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. Allow Admin/Organizer panel to DELETE events if needed
DROP POLICY IF EXISTS "Admins can delete events" ON public.events;
CREATE POLICY "Admins can delete events"
  ON public.events FOR DELETE
  TO anon, authenticated
  USING (true);

-- 5. Ensure Public & Admins can SELECT events
DROP POLICY IF EXISTS "Public can view active events" ON public.events;
CREATE POLICY "Public can view active events"
  ON public.events FOR SELECT
  TO anon, authenticated
  USING (true);

-- 6. Also ensure registrations can be deleted by admin panel
DROP POLICY IF EXISTS "Admins can delete registrations" ON public.registrations;
CREATE POLICY "Admins can delete registrations"
  ON public.registrations FOR DELETE
  TO anon, authenticated
  USING (true);
