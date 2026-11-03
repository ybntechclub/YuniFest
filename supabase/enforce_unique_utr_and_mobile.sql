-- =========================================================================
-- YUNIFEST 2026 — Enforce Unique Transaction/UTR & 10-Digit Mobile Constraints
-- Run this in your Supabase Dashboard -> SQL Editor -> New Query -> Run
-- =========================================================================

-- 1. Enforce unique Transaction / UTR ID across all registrations
DROP INDEX IF EXISTS uq_registrations_transaction_id;

CREATE UNIQUE INDEX uq_registrations_transaction_id 
ON public.registrations (LOWER(TRIM(transaction_id))) 
WHERE transaction_id IS NOT NULL AND transaction_id != '';

-- 2. Enforce strictly 10-digit mobile numbers in public.registrations
ALTER TABLE public.registrations 
  DROP CONSTRAINT IF EXISTS chk_registrations_mobile;

ALTER TABLE public.registrations 
  ADD CONSTRAINT chk_registrations_mobile 
  CHECK (mobile ~ '^[0-9]{10}$');
