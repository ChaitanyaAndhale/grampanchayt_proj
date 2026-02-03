-- ============================================
-- COMPLETE RLS FIX FOR ALL TABLES
-- Run this once to fix all RLS policies
-- ============================================

-- 1. FIX GALLERY_IMAGES TABLE
DROP POLICY IF EXISTS "Allow public read access on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated insert on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated update on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated delete on gallery_images" ON gallery_images;

CREATE POLICY "Allow public read access on gallery_images" 
ON gallery_images FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on gallery_images" 
ON gallery_images FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated update on gallery_images" 
ON gallery_images FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated delete on gallery_images" 
ON gallery_images FOR DELETE USING (auth.uid() IS NOT NULL);

-- 2. FIX MEMBERS TABLE
DROP POLICY IF EXISTS "Allow public read access on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated insert on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated update on members" ON members;
DROP POLICY IF EXISTS "Allow authenticated delete on members" ON members;

CREATE POLICY "Allow public read access on members" 
ON members FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on members" 
ON members FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated update on members" 
ON members FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated delete on members" 
ON members FOR DELETE USING (auth.uid() IS NOT NULL);

-- 3. FIX GRAM_SABHA_MEETINGS TABLE
DROP POLICY IF EXISTS "Allow public read access on gram_sabha_meetings" ON gram_sabha_meetings;
DROP POLICY IF EXISTS "Allow authenticated insert on gram_sabha_meetings" ON gram_sabha_meetings;
DROP POLICY IF EXISTS "Allow authenticated update on gram_sabha_meetings" ON gram_sabha_meetings;
DROP POLICY IF EXISTS "Allow authenticated delete on gram_sabha_meetings" ON gram_sabha_meetings;

CREATE POLICY "Allow public read access on gram_sabha_meetings" 
ON gram_sabha_meetings FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on gram_sabha_meetings" 
ON gram_sabha_meetings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated update on gram_sabha_meetings" 
ON gram_sabha_meetings FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated delete on gram_sabha_meetings" 
ON gram_sabha_meetings FOR DELETE USING (auth.uid() IS NOT NULL);

-- 4. FIX SITE_SETTINGS TABLE
DROP POLICY IF EXISTS "Allow public read access on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated insert on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated update on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated delete on site_settings" ON site_settings;

CREATE POLICY "Allow public read access on site_settings" 
ON site_settings FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on site_settings" 
ON site_settings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated update on site_settings" 
ON site_settings FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated delete on site_settings" 
ON site_settings FOR DELETE USING (auth.uid() IS NOT NULL);

-- 5. FIX NEWSLETTER_SUBSCRIBERS TABLE
DROP POLICY IF EXISTS "Allow public read access on newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public insert on newsletter_subscribers" ON newsletter_subscribers;

CREATE POLICY "Allow public read access on newsletter_subscribers" 
ON newsletter_subscribers FOR SELECT USING (true);

CREATE POLICY "Allow public insert on newsletter_subscribers" 
ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- 6. VERIFY RLS IS ENABLED ON ALL TABLES
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gram_sabha_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DONE! All RLS policies fixed
-- ============================================
