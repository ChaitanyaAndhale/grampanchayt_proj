-- Create Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Members Table
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

-- Create Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gram_sabha_meetings ENABLE ROW LEVEL SECURITY;

-- Create Policies (Allow read for everyone, write for authenticated users only)

-- Gallery Policies
CREATE POLICY "Allow public read access on gallery_images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on gallery_images" ON gallery_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on gallery_images" ON gallery_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on gallery_images" ON gallery_images FOR DELETE USING (auth.role() = 'authenticated');

-- Members Policies
CREATE POLICY "Allow public read access on members" ON members FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on members" ON members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on members" ON members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on members" ON members FOR DELETE USING (auth.role() = 'authenticated');

-- Site Settings Policies
CREATE POLICY "Allow public read access on site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on site_settings" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on site_settings" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on site_settings" ON site_settings FOR DELETE USING (auth.role() = 'authenticated');

-- Gram Sabha Policies (Assuming table exists, if not create it similar to others)
-- If gram_sabha_meetings table doesn't exist, run this:
/*
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
*/
CREATE POLICY "Allow public read access on gram_sabha_meetings" ON gram_sabha_meetings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert on gram_sabha_meetings" ON gram_sabha_meetings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on gram_sabha_meetings" ON gram_sabha_meetings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on gram_sabha_meetings" ON gram_sabha_meetings FOR DELETE USING (auth.role() = 'authenticated');

-- Insert Initial Site Settings (Optional)
INSERT INTO site_settings (key, value) VALUES 
('population', '1200+'),
('established_year', '1956'),
('area', '850'),
('contact_phone', '+91 98765 43210'),
('contact_email', 'office.golegaon@gov.in'),
('contact_address', 'Gram Panchayat Office, Golegaon Village, Maharashtra, India')
ON CONFLICT (key) DO NOTHING;
