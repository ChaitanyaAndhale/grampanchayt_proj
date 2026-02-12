# Success Stories Setup Guide

## Overview
This guide will help you populate the Success Stories section with the predefined content.

## Step 1: Run the SQL Script

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Go to your project
3. Navigate to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste the content from `setup_success_stories.sql`
6. Click **Run** button

## Step 2: Verify the Stories

After running the script, verify the stories are loaded:

1. Go to **Table Editor** in Supabase
2. Select `success_stories` table
3. You should see 9 stories with these titles:

   1. ग्रामीण परिवर्तन प्रवास (Sparkles icon)
   2. गौरवशाली यश आणि पुरस्कार (Award icon)
   3. सामाजिक परिवर्तन उपक्रम (Users icon)
   4. हरित गाव - स्वच्छ आणि सुंदर (Leaf icon - needs to be added to iconMap)
   5. ज्ञानज्योत - शिक्षण प्रगती (GraduationCap icon - needs to be added)
   6. सुरक्षित घर - सामाजिक सुरक्षा योजना (Home icon)
   7. समृद्ध शेतकरी - रोजगार संधी (Tractor icon - needs to be added)
   8. आमची संस्कृती - एकता आणि सामाजिक सौहार्द (Heart icon)
   9. आदर्श प्रशासन - पारदर्शक प्रशासन (Shield icon)

## Step 3: Check the Website

1. Visit your website
2. Scroll to the Success Stories section
3. You should see all 9 cards with:
   - Alternating orange and green colors
   - Matching icons for each story
   - Full descriptions visible in preview
   - Click "अधिक वाचा" to read full content

## Icon Reference

The following icons are used:
- **Sparkles** - Village Transformation Journey
- **Award** - Glorious Success and Awards  
- **Users** - Social Transformation Initiatives
- **Leaf** - Green Village (if available)
- **GraduationCap** - Education Progress (if available)
- **Home** - Social Security Schemes
- **Tractor** - Prosperous Farmers (if available)
- **Heart** - Culture and Unity
- **Shield** - Ideal Governance

## Troubleshooting

If icons don't appear:
1. Check that `icon_name` in database matches the iconMap in SuccessStoriesSection.tsx
2. Ensure the icon component is imported from lucide-react
3. Add missing icons to the iconMap if needed

## Customization

To modify any story:
1. Go to Supabase → Table Editor → success_stories
2. Click on the row you want to edit
3. Update title or description
4. Save changes
5. Refresh website to see updates
