-- 1. Create Subscribers Table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable RLS
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
-- Allow public insert (anyone can subscribe)
DROP POLICY IF EXISTS "Allow public insert on subscribers" ON subscribers;
CREATE POLICY "Allow public insert on subscribers" ON subscribers FOR INSERT WITH CHECK (true);

-- Allow admin read (only authenticated users can see list)
DROP POLICY IF EXISTS "Allow authenticated read on subscribers" ON subscribers;
CREATE POLICY "Allow authenticated read on subscribers" ON subscribers FOR SELECT USING (auth.role() = 'authenticated');
