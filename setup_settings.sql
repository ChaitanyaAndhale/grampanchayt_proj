-- 1. Create Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
DROP POLICY IF EXISTS "Allow public read access on site_settings" ON site_settings;
CREATE POLICY "Allow public read access on site_settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert on site_settings" ON site_settings;
CREATE POLICY "Allow authenticated insert on site_settings" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated update on site_settings" ON site_settings;
CREATE POLICY "Allow authenticated update on site_settings" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated delete on site_settings" ON site_settings;
CREATE POLICY "Allow authenticated delete on site_settings" ON site_settings FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Insert Initial Data (Optional)
INSERT INTO site_settings (key, value) VALUES 
('population', '1200+'),
('families', '300+'),
('established_year', '1956'),
('area', '850'),
('contact_phone', '+91 98765 43210'),
('contact_email', 'office.golegaon@gov.in'),
('contact_address', 'Gram Panchayat Office, Golegaon Village, Maharashtra, India')
ON CONFLICT (key) DO NOTHING;
