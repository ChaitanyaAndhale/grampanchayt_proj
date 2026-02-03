-- ============================================
-- FINAL FIX: Correct RLS Policies for All Tables
-- This uses auth.role() instead of auth.uid()
-- ============================================

-- 1. FIX MEMBERS TABLE POLICIES
DROP POLICY IF EXISTS "Allow public read access on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated insert on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated update on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated delete on members" ON members;

CREATE POLICY "Allow public read access on members" 
ON members FOR SELECT 
TO public
USING (true);

CREATE POLICY "Allow authenticated insert on members" 
ON members FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on members" 
ON members FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated delete on members" 
ON members FOR DELETE 
TO authenticated
USING (true);

-- 2. FIX GALLERY_IMAGES TABLE POLICIES
DROP POLICY IF EXISTS "Allow public read access on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated insert on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated update on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated delete on gallery_images" ON gallery_images;

CREATE POLICY "Allow public read access on gallery_images" 
ON gallery_images FOR SELECT 
TO public
USING (true);

CREATE POLICY "Allow authenticated insert on gallery_images" 
ON gallery_images FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on gallery_images" 
ON gallery_images FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated delete on gallery_images" 
ON gallery_images FOR DELETE 
TO authenticated
USING (true);

-- 3. FIX GRAM_SABHA_MEETINGS TABLE POLICIES
DROP POLICY IF EXISTS "Allow public read access on gram_sabha_meetings" ON gram_sabha_meetings;
DROP POLICY IF EXISTS "Allow authenticated insert on gram_sabha_meetings" ON gram_sabha_meetings;
DROP POLICY IF EXISTS "Allow authenticated update on gram_sabha_meetings" ON gram_sabha_meetings;
DROP POLICY IF EXISTS "Allow authenticated delete on gram_sabha_meetings" ON gram_sabha_meetings;

CREATE POLICY "Allow public read access on gram_sabha_meetings" 
ON gram_sabha_meetings FOR SELECT 
TO public
USING (true);

CREATE POLICY "Allow authenticated insert on gram_sabha_meetings" 
ON gram_sabha_meetings FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on gram_sabha_meetings" 
ON gram_sabha_meetings FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated delete on gram_sabha_meetings" 
ON gram_sabha_meetings FOR DELETE 
TO authenticated
USING (true);

-- 4. FIX SITE_SETTINGS TABLE POLICIES
DROP POLICY IF EXISTS "Allow public read access on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated insert on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated update on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated delete on site_settings" ON site_settings;

CREATE POLICY "Allow public read access on site_settings" 
ON site_settings FOR SELECT 
TO public
USING (true);

CREATE POLICY "Allow authenticated insert on site_settings" 
ON site_settings FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on site_settings" 
ON site_settings FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated delete on site_settings" 
ON site_settings FOR DELETE 
TO authenticated
USING (true);

-- 5. VERIFY RLS IS ENABLED
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gram_sabha_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DONE! This should fix all RLS issues
-- ============================================
