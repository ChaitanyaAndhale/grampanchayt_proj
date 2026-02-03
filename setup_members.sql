-- 1. Create Members Table (if not exists)
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

-- 2. Enable RLS
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies for Members Table
DROP POLICY IF EXISTS "Allow public read access on members" ON members;
CREATE POLICY "Allow public read access on members" ON members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert on members" ON members;
CREATE POLICY "Allow authenticated insert on members" ON members FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated update on members" ON members;
CREATE POLICY "Allow authenticated update on members" ON members FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated delete on members" ON members;
CREATE POLICY "Allow authenticated delete on members" ON members FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Create Storage Bucket for Members
INSERT INTO storage.buckets (id, name, public)
VALUES ('members', 'members', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Storage Policies
DROP POLICY IF EXISTS "Public Access Members" ON storage.objects;
CREATE POLICY "Public Access Members" ON storage.objects FOR SELECT USING ( bucket_id = 'members' );

DROP POLICY IF EXISTS "Authenticated Upload Members" ON storage.objects;
CREATE POLICY "Authenticated Upload Members" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'members' AND auth.role() = 'authenticated' );

DROP POLICY IF EXISTS "Authenticated Delete Members" ON storage.objects;
CREATE POLICY "Authenticated Delete Members" ON storage.objects FOR DELETE USING ( bucket_id = 'members' AND auth.role() = 'authenticated' );
