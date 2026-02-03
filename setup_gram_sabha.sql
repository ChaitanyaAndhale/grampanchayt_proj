-- 1. Create Gram Sabha Meetings Table
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

-- 2. Enable Row Level Security (RLS)
ALTER TABLE gram_sabha_meetings ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
DROP POLICY IF EXISTS "Allow public read access on gram_sabha_meetings" ON gram_sabha_meetings;
CREATE POLICY "Allow public read access on gram_sabha_meetings" ON gram_sabha_meetings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert on gram_sabha_meetings" ON gram_sabha_meetings;
CREATE POLICY "Allow authenticated insert on gram_sabha_meetings" ON gram_sabha_meetings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated update on gram_sabha_meetings" ON gram_sabha_meetings;
CREATE POLICY "Allow authenticated update on gram_sabha_meetings" ON gram_sabha_meetings FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated delete on gram_sabha_meetings" ON gram_sabha_meetings;
CREATE POLICY "Allow authenticated delete on gram_sabha_meetings" ON gram_sabha_meetings FOR DELETE USING (auth.role() = 'authenticated');
