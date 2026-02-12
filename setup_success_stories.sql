-- Setup Success Stories with Marathi and English versions
-- Delete existing stories first
DELETE FROM success_stories;

-- Insert all 9 success stories with bilingual support
INSERT INTO success_stories (title_mr, title_en, content_mr, content_en, icon, display_order, is_active) VALUES
(
  'ग्रामीण परिवर्तन प्रवास',
  'Village Transformation Journey',
  'आमच्या गावाने अलिकडच्या वर्षांत अभूतपूर्व प्रगती केली आहे. पायाभूत सुविधांपासून ते शैक्षणिक विकासापर्यंत, आमचा प्रवास प्रेरणादायी आहे.',
  'Our village has made unprecedented progress in recent years. From infrastructure to educational development, our journey is inspiring.',
  'Sparkles',
  1,
  true
),
(
  'गौरवशाली यश आणि पुरस्कार',
  'Glorious Success and Awards',
  'राज्यस्तरीय पुरस्कार, विशेष मान्यता आणि आमच्या गावकऱ्यांच्या उल्लेखनीय यशोगाथा.',
  'State level awards, special recognitions and remarkable achievements of our villagers.',
  'Award',
  2,
  true
),
(
  'सामाजिक परिवर्तन उपक्रम',
  'Social Transformation Initiatives',
  'समाज कल्याण, गाव विकास उपक्रम आणि सामुदायिक कार्यक्रमांची माहिती.',
  'Information about social welfare, village development initiatives and community programs.',
  'Users',
  3,
  true
),
(
  'हरित गाव - स्वच्छ आणि सुंदर',
  'Green Village - Clean & Beautiful',
  'स्वच्छता मोहिमे, पर्यावरण संरक्षण, वृक्षारोपण आणि जल संवर्धन प्रकल्प.',
  'Cleanliness drives, environment protection, tree plantation and water conservation projects.',
  'Leaf',
  4,
  true
),
(
  'ज्ञानज्योत - शिक्षण प्रगती',
  'Knowledge Light - Education Progress',
  'शाळा विकास, विद्यार्थी यश, डिजिटल शिक्षण आणि गुणवत्ता सुधारणा.',
  'School development, student success, digital education and quality improvements.',
  'GraduationCap',
  5,
  true
),
(
  'सुरक्षित घर - सामाजिक सुरक्षा योजना',
  'Safe Home - Social Security Schemes',
  'गृहनिर्माण योजना, पेन्शन, सामाजिक सुरक्षा आणि कल्याणकारी योजनांचे लाभ.',
  'Housing schemes, pension, social security and welfare scheme benefits.',
  'Home',
  6,
  true
),
(
  'समृद्ध शेतकरी - रोजगार संधी',
  'Prosperous Farmers - Employment Opportunities',
  'शेतकरी सहाय्य, आधुनिक शेती, सिंचन, रोजगार योजना आणि कौशल्य विकास.',
  'Farmer support, modern agriculture, irrigation, employment schemes and skill development.',
  'Tractor',
  7,
  true
),
(
  'आमची संस्कृती - एकता आणि सामाजिक सौहार्द',
  'Our Culture - Unity and Social Harmony',
  'संस्कृती, सण, एकता कार्यक्रम, सामुदायिक सौहार्द आणि परंपरा.',
  'Culture, festivals, unity programs, community harmony and traditions.',
  'Heart',
  8,
  true
),
(
  'आदर्श प्रशासन - पारदर्शक प्रशासन',
  'Ideal Governance - Transparent Administration',
  'प्रशासकीय यश, डिजिटल सेवा, योजना अंमलबजावणी आणि पारदर्शकता.',
  'Governance achievements, digital services, scheme implementation and transparency.',
  'Shield',
  9,
  true
);

-- Verify the data
SELECT id, title_mr, title_en, icon, display_order, is_active FROM success_stories ORDER BY display_order;
