# 🔧 YouTube Videos - Troubleshooting Guide

## ❌ Error: "Failed to add video"

This error usually means the **videos table hasn't been created yet** in your Supabase database.

### ✅ Solution: Run the Database Setup

Follow these steps carefully:

#### 1. Open Supabase Dashboard
- Go to: https://supabase.com/dashboard/projects
- Click on your Gram Panchayat project

#### 2. Open SQL Editor
- Click on **"SQL Editor"** in the left sidebar
- Click **"New Query"** button

#### 3. Copy and Paste the SQL
Open the file `setup_videos.sql` from your project folder and copy ALL the content.

Or copy this SQL directly:

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
-- Allow public read access for active videos
CREATE POLICY "Allow public read access to active videos"
    ON public.videos
    FOR SELECT
    USING (is_active = true);

-- Allow authenticated users (admins) full access
CREATE POLICY "Allow authenticated users full access to videos"
    ON public.videos
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_videos_display_order ON public.videos(display_order);
CREATE INDEX IF NOT EXISTS idx_videos_is_active ON public.videos(is_active);
```

#### 4. Run the SQL
- Click the green **"Run"** button (or press `Ctrl+Enter`)
-  You should see: **"Success. No rows returned"**

#### 5. Verify Table Creation
- Go to **"Table Editor"** in the left sidebar
- You should now see a **"videos"** table listed

#### 6. Try Adding a Video Again
- Go back to your website
- Navigate to `/admin/videos`
- Try adding a video again - it should work now! ✅

---

## 🔍 Use the Diagnostic Tool

I've created a diagnostic page to automatically check your setup:

### How to Access:
1. Go to: http://localhost:5173/admin/videos-diagnostic
2. The page will automatically check:
   ✓ Supabase connection
   ✓ User authentication
   ✓ Videos table existence
   ✓ Insert/delete permissions

### What It Shows:
- ✅ **Green checks** = Everything is working
- ⚠️ **Yellow warnings** = Minor issues (like not logged in)
- ❌ **Red errors** = Must fix (like missing table)

### If You See Errors:
The diagnostic page will tell you exactly what's wrong and how to fix it!

---

## 📝 Common Error Messages & Solutions

### Error: "Videos table not found"
**Cause:** Database table hasn't been created
**Solution:** Run `setup_videos.sql` in Supabase SQL Editor (see steps above)

### Error: "Permission denied"
**Cause:** RLS policies not set up correctly
**Solution:** Make sure you ran the COMPLETE SQL including the policies section

### Error: "Not logged in"
**Cause:** You're not authenticated
**Solution:** 
1. Go to `/login`
2. Login with your admin credentials
3. Try again

### Error: "Invalid YouTube URL"
**Cause:** The URL format isn't recognized
**Solution:** 
- Copy the URL directly from YouTube's address bar
- Supported formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/shorts/VIDEO_ID`

---

## 🆘 Still Having Issues?

### Check Browser Console
1. Press `F12` to open Developer Tools
2. Click on the **"Console"** tab
3. Try adding a video again
4. Look for error messages in red
5. The console will show the exact error code

### Common Console Errors:

**Error Code 42P01:**
- Table doesn't exist
- Run the setup SQL

**Error Code 42501:**
- Permission error
- Check RLS policies
- Make sure you're logged in

**JWT Error:**
- Authentication problem
- Log out and log in again

---

## ✅ Step-by-Step Verification

Follow this checklist to make sure everything is set up:

### Database Setup
- [ ] Opened Supabase dashboard
- [ ] Went to SQL Editor
- [ ] Pasted and ran setup_videos.sql
- [ ] Saw "Success. No rows returned"
- [ ] Videos table appears in Table Editor

### Authentication
- [ ] Logged into admin panel
- [ ] Can access /admin/videos
- [ ] User email shows in top right

### Browser Check
- [ ] No errors in browser console (F12)
- [ ] Supabase connection working
- [ ] Page loads without errors

### Test Video
- [ ] Clicked "Add Video" button
- [ ] Pasted a valid YouTube URL
- [ ] Entered a title
- [ ] Clicked "Add Video"
- [ ] Got success message
- [ ] Video appears in list

---

## 📸 Visual Guide

### 1. Supabase SQL Editor
Look for: **SQL Editor** → **New Query** → Paste SQL → **Run**

### 2. Success Message
You should see: `Success. No rows returned`

### 3. Table Editor
You should see: **videos** table with these columns:
- id
- youtube_url
- title
- description
- display_order
- is_active
- created_at

### 4. Admin Panel
You should see: "Videos Manager" with "Add Video" button

---

## 🎯 Quick Test

To verify everything works:

1. **Go to diagnostic page:**
   ```
   http://localhost:5173/admin/videos-diagnostic
   ```

2. **Check all green:**
   - Supabase connection ✅
   - Authentication ✅
   - Videos table ✅
   - Permissions ✅

3. **Add a test video:**
   ```
   URL: https://www.youtube.com/watch?v=9bZkp7q19f0
   Title: Test Video
   Description: Testing the videos feature
   ```

4. **Success!**
   - Video appears in admin panel
   - Video shows on homepage
   - Can edit/delete video

---

## 📞 Need More Help?

### Email the Error Details:
If you're still stuck, send this information:

1. **What you did:** (e.g., "Tried to add a video")
2. **What happened:** (e.g., "Got 'failed to add video' error")
3. **Console errors:** (Press F12, copy errors from Console tab)
4. **Diagnostic results:** (Run /admin/videos-diagnostic, take screenshot)

### Check These Files:
- `YOUTUBE_QUICK_START.md` - Basic setup guide
- `YOUTUBE_SETUP_GUIDE.md` - Detailed instructions
- `setup_videos.sql` - The SQL you need to run

---

## ✨ After It Works

Once you successfully add your first video:

✅ Videos appear on homepage automatically
✅ Only active videos are shown
✅ Videos are responsive (work on mobile)
✅ Can edit/delete anytime
✅ Can hide videos without deleting

**Enjoy your new YouTube integration!** 🎉

---

**Pro Tip:** Use the diagnostic page (`/admin/videos-diagnostic`) anytime you have issues. It will automatically tell you what's wrong!
