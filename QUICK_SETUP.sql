-- ============================================
-- QUICK SETUP: Copy and paste this entire file into Supabase SQL Editor
-- ============================================

-- 1. Create gram_sabha_meetings table
CREATE TABLE IF NOT EXISTS gram_sabha_meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  meeting_number INTEGER,
  meeting_date DATE NOT NULL,
  agenda TEXT,
  present_count INTEGER DEFAULT 0,
  absent_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Members Table
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  contact TEXT,
  email TEXT,
  photo_url TEXT,
  role TEXT CHECK (role IN ('sarpanch', 'upsarpanch', 'member')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gram_sabha_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 7. Create Policies - Gallery
DROP POLICY IF EXISTS "Allow public read access on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated insert on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated update on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated delete on gallery_images" ON gallery_images;

CREATE POLICY "Allow public read access on gallery_images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on gallery_images" ON gallery_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on gallery_images" ON gallery_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on gallery_images" ON gallery_images FOR DELETE USING (auth.role() = 'authenticated');

-- 8. Create Policies - Members
DROP POLICY IF EXISTS "Allow public read access on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated insert on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated update on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated delete on members" ON members;

CREATE POLICY "Allow public read access on members" ON members FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on members" ON members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on members" ON members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on members" ON members FOR DELETE USING (auth.role() = 'authenticated');

-- 9. Create Policies - Site Settings
DROP POLICY IF EXISTS "Allow public read access on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated insert on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated update on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated delete on site_settings" ON site_settings;

CREATE POLICY "Allow public read access on site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on site_settings" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on site_settings" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on site_settings" ON site_settings FOR DELETE USING (auth.role() = 'authenticated');

-- 10. Create Policies - Gram Sabha
DROP POLICY IF EXISTS "Allow public read access on gram_sabha_meetings" ON gram_sabha_meetings;
DROP POLICY IF EXISTS "Allow authenticated insert on gram_sabha_meetings" ON gram_sabha_meetings;
DROP POLICY IF EXISTS "Allow authenticated update on gram_sabha_meetings" ON gram_sabha_meetings;
DROP POLICY IF EXISTS "Allow authenticated delete on gram_sabha_meetings" ON gram_sabha_meetings;

CREATE POLICY "Allow public read access on gram_sabha_meetings" ON gram_sabha_meetings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on gram_sabha_meetings" ON gram_sabha_meetings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on gram_sabha_meetings" ON gram_sabha_meetings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on gram_sabha_meetings" ON gram_sabha_meetings FOR DELETE USING (auth.role() = 'authenticated');

-- 11. Create Policies - Newsletter
DROP POLICY IF EXISTS "Allow public read access on newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public insert on newsletter_subscribers" ON newsletter_subscribers;

CREATE POLICY "Allow public read access on newsletter_subscribers" ON newsletter_subscribers FOR SELECT USING (true);
CREATE POLICY "Allow public insert on newsletter_subscribers" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- 12. Insert Initial Site Settings
INSERT INTO site_settings (key, value) VALUES 
('population', '1200+'),
('established_year', '1956'),
('area', '850'),
('contact_phone', '+91 98765 43210'),
('contact_email', 'office.golegaon@gov.in'),
('contact_address', 'Gram Panchayat Office, Golegaon Village, Maharashtra, India'),
('gram_panchayat_name', 'Golegaon Gram Panchayat'),
('gram_panchayat_logo', '')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- DONE! Your database is now set up.
-- Next: Create admin user in Authentication > Users
-- Email: Chaitanyasa37@gmail.com
-- Password: Golegaon@4321
-- ============================================
