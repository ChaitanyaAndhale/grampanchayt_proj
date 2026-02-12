-- Add families setting to existing database
-- Run this in Supabase SQL Editor if you already have the site_settings table

INSERT INTO site_settings (key, value) VALUES 
('families', '300+')
ON CONFLICT (key) DO NOTHING;
