-- Create Storage Buckets for File Uploads

-- 1. Create gallery bucket (for gallery images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Create members bucket (for member photos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('members', 'members', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Create documents bucket (for Gram Sabha documents)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Set up storage policies for gallery bucket
CREATE POLICY "Public Access for Gallery Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update gallery images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- 5. Set up storage policies for members bucket
CREATE POLICY "Public Access for Member Photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'members');

CREATE POLICY "Authenticated users can upload member photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'members' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update member photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'members' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete member photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'members' AND auth.role() = 'authenticated');

-- 6. Set up storage policies for documents bucket
CREATE POLICY "Public Access for Documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents');

CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
