-- 1. Create the 'documents' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Create Policy: Allow public read access to all files in the 'documents' bucket
DROP POLICY IF EXISTS "Public Access Documents" ON storage.objects;
CREATE POLICY "Public Access Documents"
ON storage.objects FOR SELECT
USING ( bucket_id = 'documents' );

-- 3. Create Policy: Allow authenticated users to upload files to the 'documents' bucket
DROP POLICY IF EXISTS "Authenticated Upload Documents" ON storage.objects;
CREATE POLICY "Authenticated Upload Documents"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'documents' AND auth.role() = 'authenticated' );

-- 4. Create Policy: Allow authenticated users to delete files from the 'documents' bucket
DROP POLICY IF EXISTS "Authenticated Delete Documents" ON storage.objects;
CREATE POLICY "Authenticated Delete Documents"
ON storage.objects FOR DELETE
USING ( bucket_id = 'documents' AND auth.role() = 'authenticated' );
