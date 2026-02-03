-- ============================================
-- DISABLE STORAGE RLS COMPLETELY
-- ============================================

-- Disable RLS on storage.objects
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Drop all storage policies
DROP POLICY IF EXISTS "Public Access for Gallery Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON storage.objects;

DROP POLICY IF EXISTS "Public Access for Member Photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload member photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update member photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete member photos" ON storage.objects;

DROP POLICY IF EXISTS "Public Access for Documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete documents" ON storage.objects;

-- Verify storage.objects RLS is disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'storage' 
AND tablename = 'objects';
