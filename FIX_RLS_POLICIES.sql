-- Fix Row Level Security Policies for Gallery Images

-- First, drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated insert on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated update on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated delete on gallery_images" ON gallery_images;

-- Create new policies with correct permissions
CREATE POLICY "Allow public read access on gallery_images" 
ON gallery_images FOR SELECT 
USING (true);

CREATE POLICY "Allow authenticated insert on gallery_images" 
ON gallery_images FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated update on gallery_images" 
ON gallery_images FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated delete on gallery_images" 
ON gallery_images FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Fix storage policies for gallery bucket
DROP POLICY IF EXISTS "Public Access for Gallery Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON storage.objects;

-- Create storage policies
CREATE POLICY "Public Access for Gallery Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update gallery images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery' AND auth.uid() IS NOT NULL);

-- Verify RLS is enabled
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
