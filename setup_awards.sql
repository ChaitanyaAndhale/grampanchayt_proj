-- Create awards table with image and date support
CREATE TABLE IF NOT EXISTS awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_mr TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_mr TEXT NOT NULL,
    description_en TEXT NOT NULL,
    year TEXT,
    award_date DATE,
    organization_mr TEXT,
    organization_en TEXT,
    image_url TEXT,
    icon_name TEXT DEFAULT 'Trophy',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;

-- Public can view active awards
CREATE POLICY "Public can view active awards"
    ON awards FOR SELECT
    USING (is_active = true);

-- Authenticated users can manage awards
CREATE POLICY "Authenticated users can manage awards"
    ON awards FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert sample awards with images and dates
INSERT INTO awards (title_mr, title_en, description_mr, description_en, year, award_date, organization_mr, organization_en, image_url, icon_name, display_order) VALUES
(
    'सर्वोत्तम ग्रामपंचायत पुरस्कार',
    'Best Gram Panchayat Award',
    'राज्यस्तरावरील सर्वोत्तम कामगिरीसाठी सन्मान',
    'State level recognition for outstanding performance and development',
    '2023',
    '2023-12-15',
    'महाराष्ट्र शासन - ग्रामविकास विभाग',
    'Government of Maharashtra - Rural Development Department',
    NULL,  -- Add your image URL here
    'Trophy',
    1
),
(
    'स्वच्छ गाव पुरस्कार',
    'Clean Village Award',
    'स्वच्छता आणि पर्यावरण संरक्षणातील उत्कृष्ट कामगिरीसाठी',
    'Excellence in cleanliness and environmental conservation',
    '2023',
    '2023-11-20',
    'स्वच्छ भारत अभियान',
    'Swachh Bharat Mission',
    NULL,  -- Add your image URL here
    'Award',
    2
),
(
    'डिजिटल गाव पुरस्कार',
    'Digital Village Award',
    'डिजिटलीकरण आणि ई-गव्हर्नन्समध्ये प्रगतीसाठी',
    'For advancement in digitalization and e-governance',
    '2022',
    '2022-10-05',
    'डिजिटल इंडिया कार्यक्रम',
    'Digital India Program',
    NULL,  -- Add your image URL here
    'Star',
    3
),
(
    'जल संवर्धन पुरस्कार',
    'Water Conservation Award',
    'जल संवर्धन आणि व्यवस्थापनातील नाविन्यपूर्ण कार्यासाठी',
    'For innovative work in water conservation and management',
    '2022',
    '2022-08-15',
    'जलयुक्त शिवार अभियान',
    'Jalyukt Shivar Abhiyan',
    NULL,  -- Add your image URL here
    'Medal',
    4
);

-- Verify the data
SELECT id, title_en, year, award_date, image_url FROM awards ORDER BY display_order;
