# YouTube Video Integration Setup Guide

## 🎥 YouTube Video Feature

This guide explains how to add YouTube video embedding to your Gram Panchayat website.

## ✅ What's Been Implemented

1. **Database Table**: `videos` table for storing YouTube links
2. **Admin Panel**: Videos Manager at `/admin/videos`
3. **Public Display**: Videos section on the homepage
4. **Features**:
   - Add/Edit/Delete YouTube videos
   - Preview videos before adding
   - Show/Hide videos (toggle visibility)
   - Automatic video ID extraction from various YouTube URL formats
   - Bilingual support (English/Marathi)

## 📋 Setup Steps

### Step 1: Run the Database Setup

You need to create the `videos` table in your Supabase database:

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Run the SQL script from `setup_videos.sql`:

```sql
-- Create videos table for YouTube video links
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    youtube_url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to active videos"
    ON public.videos
    FOR SELECT
    USING (is_active = true);

CREATE POLICY "Allow authenticated users full access to videos"
    ON public.videos
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_videos_display_order ON public.videos(display_order);
CREATE INDEX IF NOT EXISTS idx_videos_is_active ON public.videos(is_active);
```

### Step 2: Access the Videos Manager

1. Go to your website
2. Login to the admin panel at `/admin`
3. Click **"Videos"** in the sidebar
4. You'll see the Videos Manager

### Step 3: Add Your First Video

1. Click **"Add Video"** button
2. Paste a YouTube URL (any format):
   - Regular: `https://www.youtube.com/watch?v=VIDEO_ID`
   - Short: `https://youtu.be/VIDEO_ID`
   - Shorts: `https://www.youtube.com/shorts/VIDEO_ID`
3. Enter a **Title** (e.g., "Village Development Meeting 2024")
4. Optionally add a **Description**
5. Click **"Add Video"**

### Step 4: Manage Videos

**Edit a Video:**
- Click the "Edit" button on any video card
- Update the URL, title, or description
- Click "Update Video"

**Hide/Show a Video:**
- Click the eye icon to toggle visibility
- Hidden videos won't appear on the public website

**Delete a Video:**
- Click the trash icon
- Confirm deletion

## 🌐 Public Display

Videos will automatically appear on the homepage in the **"Village Updates"** section (or "गावातील अपडेट्स" in Marathi).

The section will:
- Only show if there are active videos
- Display videos in a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- Show video title and description
- Allow visitors to watch videos directly

## 📱 Supported YouTube URL Formats

The system automatically extracts video IDs from:
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ`
- `https://www.youtube.com/embed/dQw4w9WgXcQ`
- `https://www.youtube.com/shorts/dQw4w9WgXcQ`

## 🎨 Features

✅ Responsive embed player
✅ Automatic video ID extraction
✅ Preview before adding
✅ Drag-free management
✅ Show/Hide toggle
✅ Bilingual interface (English/Marathi)
✅ Mobile-friendly admin panel

## 🔧 Troubleshooting

**Videos not showing on homepage?**
- Make sure videos are marked as "active" (eye icon should be open)
- Check that you've added at least one video

**Can't add videos?**
- Ensure you're logged in as admin
- Verify the database table was created successfully
- Check browser console for errors

**Invalid YouTube URL error?**
- Make sure you're using a valid YouTube URL
- Try copying the URL directly from YouTube

## 📝 Example Videos to Add

For testing, you can use these YouTube videos:
- Village development: `https://www.youtube.com/watch?v=9bZkp7q19f0`
- Community events: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

---

**Developed by Chaitanya Andhale**
