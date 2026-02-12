-- EMERGENCY FIX: Disable Row Level Security temporarily/permanently to check visibility
-- This ensures that NO polices block the view.
alter table public.announcements disable row level security;

-- Verify the table exists and has data (you can run this select to check)
-- select * from public.announcements;
