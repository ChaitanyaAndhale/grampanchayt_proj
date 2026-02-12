# Awards Section Setup Guide

## Overview
This guide will help you set up the new Awards (पुरस्कार) section with photo and date support.

## Step 1: Run the SQL Script

1. Open **Supabase Dashboard**: https://supabase.com/dashboard
2. Navigate to your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste content from `setup_awards.sql`
6. Click **Run**

## Step 2: Upload Award Photos

### Option A: Direct URL (Recommended for testing)
1. Use any image URL (award certificates, photos)
2. Update the `image_url` field in Supabase Table Editor

### Option B: Upload to Supabase Storage
1. Go to **Storage** in Supabase
2. Create bucket named `awards` (make it public)
3. Upload award photos/certificates
4. Copy the public URL
5. Paste URL in the `image_url` field

## Step 3: Add/Edit Awards

### Required Fields:
- **title_mr**: Marathi title (e.g., "सर्वोत्तम ग्रामपंचायत पुरस्कार")
- **title_en**: English title (e.g., "Best Gram Panchayat Award")
- **description_mr**: Marathi description
- **description_en**: English description
- **year**: Award year (e.g., "2023")
- **award_date**: Full date (format: YYYY-MM-DD, e.g., "2023-12-15")
- **organization_mr**: Awarding organization in Marathi
- **organization_en**: Awarding organization in English

### Optional Fields:
- **image_url**: Photo/certificate URL
- **icon_name**: Trophy, Award, Medal, or Star (default: Trophy)
- **display_order**: Order of appearance
- **is_active**: true/false to show/hide

## Features

### 🖼️ **Image Display**
- Award photo displayed at top of card
- Click image to view in lightbox (full screen)
- Smooth zoom on hover
- Gradient overlay for better text readability
- Icon badge overlaid on image

### 📅 **Date Display**
- Year badge in top-right corner of image
- Formatted full date below title (e.g., "15 December 2023")
- Bilingual date formatting (English/Marathi)

### 🎨 **Visual Design**
- Gold/orange alternating colors
- Trophy icons with animations
- Organization info with location pin
- Responsive grid layout

## Layout Options

### With Image:
```
┌─────────────────────┐
│   Award Photo       │ ← Click to enlarge
│   (with icon)   (yr)│
├─────────────────────┤
│ Title               │
│ 📅 Full Date        │
│ Description         │
│ 📍 Organization     │
└─────────────────────┘
```

### Without Image:
```
┌─────────────────────┐
│ 🏆        (year)    │
│ Title               │
│ 📅 Full Date        │
│ Description         │
│ 📍 Organization     │
└─────────────────────┘
```

## Example: Adding Award with Photo

1. Go to Supabase → Table Editor → awards
2. Click "Insert row"
3. Fill in:
```
title_mr: "राष्ट्रीय स्वच्छता पुरस्कार"
title_en: "National Cleanliness Award"
description_mr: "संपूर्ण भारतातील सर्वोत्तम स्वच्छ गाव"
description_en: "Best clean village across India"
year: "2024"
award_date: "2024-01-26"
organization_mr: "केंद्र सरकार"
organization_en: "Central Government"
image_url: "https://your-image-url.com/certificate.jpg"
icon_name: "Trophy"
display_order: 1
is_active: true
```
4. Save

## Image Guidelines

**Recommended:**
- Format: JPG, PNG, WebP
- Size: 800x600px or similar (4:3 ratio works best)
- Max file size: 2MB
- Content: Award certificate, group photo, or trophy photo

## Date Formatting

The system automatically formats dates based on language:
- **English**: "15 December 2023"
- **Marathi**: "१५ डिसेंबर २०२३"

**Important**: Always use `YYYY-MM-DD` format in database (e.g., "2023-12-15")

## Troubleshooting

**Image not showing:**
- Verify image URL is publicly accessible
- Check if image URL starts with `http://` or `https://`
- Try opening URL directly in browser

**Date not displaying:**
- Ensure `award_date` field has valid date
- Format must be YYYY-MM-DD

**Section empty:**
- Check if any awards have `is_active = true`
- Verify table exists in Supabase

## Icon Options

- **Trophy** - Large trophy (best for major awards)
- **Award** - Award ribbon (for recognitions)
- **Medal** - Medal/badge (for achievements)
- **Star** - Star icon (for excellence awards)
