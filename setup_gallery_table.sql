-- 1. Create Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
DROP POLICY IF EXISTS "Allow public read access on gallery_images" ON gallery_images;
CREATE POLICY "Allow public read access on gallery_images" ON gallery_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert on gallery_images" ON gallery_images;
CREATE POLICY "Allow authenticated insert on gallery_images" ON gallery_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated update on gallery_images" ON gallery_images;
CREATE POLICY "Allow authenticated update on gallery_images" ON gallery_images FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated delete on gallery_images" ON gallery_images;
CREATE POLICY "Allow authenticated delete on gallery_images" ON gallery_images FOR DELETE USING (auth.role() = 'authenticated');
