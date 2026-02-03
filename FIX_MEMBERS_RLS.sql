-- Fix Row Level Security Policies for Members Table

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated insert on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated update on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated delete on members" ON members;

-- Create new policies with correct permissions
CREATE POLICY "Allow public read access on members" 
ON members FOR SELECT 
USING (true);

CREATE POLICY "Allow authenticated insert on members" 
ON members FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated update on members" 
ON members FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated delete on members" 
ON members FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Verify RLS is enabled
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
