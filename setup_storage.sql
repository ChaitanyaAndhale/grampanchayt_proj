-- 1. Create the 'gallery' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Remove existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

-- 3. Create Policy: Allow public read access to all files in the 'gallery' bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery' );

-- 4. Create Policy: Allow authenticated users to upload files to the 'gallery' bucket
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'gallery' AND auth.role() = 'authenticated' );

-- 5. Create Policy: Allow authenticated users to delete files from the 'gallery' bucket
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'gallery' AND auth.role() = 'authenticated' );
