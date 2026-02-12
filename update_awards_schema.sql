-- Update awards table to add image support
ALTER TABLE awards ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE awards ADD COLUMN IF NOT EXISTS award_date DATE;

-- Update existing awards with sample data (casting text to DATE)
UPDATE awards SET 
  award_date = CASE 
    WHEN year = '2023' THEN '2023-12-15'::DATE
    WHEN year = '2022' THEN '2022-11-20'::DATE
    ELSE '2023-01-01'::DATE
  END
WHERE award_date IS NULL;

-- Verify the updated schema
SELECT id, title_en, year, award_date, image_url FROM awards ORDER BY display_order;
