-- DISABLE RLS TEMPORARILY TO TEST
-- This will help us confirm if RLS is the issue

-- Disable RLS on members table (TEMPORARY - for testing only)
ALTER TABLE members DISABLE ROW LEVEL SECURITY;

-- Try adding a member now
-- If it works, then RLS policies were the issue
-- If it still fails, there's another problem

-- IMPORTANT: After testing, re-enable RLS with:
-- ALTER TABLE members ENABLE ROW LEVEL SECURITY;
