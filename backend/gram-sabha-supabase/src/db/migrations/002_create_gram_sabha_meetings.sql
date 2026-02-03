-- Migration: create gram_sabha_meetings table with RLS and admin table
-- Requires pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.gram_sabha_meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year integer NOT NULL,
  meeting_number integer NOT NULL,
  meeting_date date NOT NULL,
  agenda text NOT NULL,
  present_count integer NOT NULL,
  absent_count integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admins table to track which users are allowed to write
CREATE TABLE IF NOT EXISTS public.gram_sabha_admins (
  user_id uuid PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.gram_sabha_meetings ENABLE ROW LEVEL SECURITY;

-- Public can SELECT
CREATE POLICY "public_select" ON public.gram_sabha_meetings
  FOR SELECT USING (true);

-- Allow authenticated admins (present in gram_sabha_admins) to INSERT/UPDATE/DELETE
CREATE POLICY "admins_write" ON public.gram_sabha_meetings
  FOR ALL
  USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.gram_sabha_admins a WHERE a.user_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.gram_sabha_admins a WHERE a.user_id = auth.uid()
    )
  );

-- Trigger to update updated_at on row update
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_updated_at ON public.gram_sabha_meetings;
CREATE TRIGGER trg_set_updated_at
  BEFORE UPDATE ON public.gram_sabha_meetings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
