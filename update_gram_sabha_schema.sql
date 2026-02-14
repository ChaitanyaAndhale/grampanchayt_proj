-- Add file_url column to gram_sabha_meetings table
ALTER TABLE gram_sabha_meetings ADD COLUMN IF NOT EXISTS file_url TEXT;
