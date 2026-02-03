# 🔧 Supabase Database Setup Guide

## ✅ Issue Fixed
The "Failed to fetch" error was caused by a mismatch between the Supabase URL in `.env.local` and the hardcoded URL in `supabaseClient.ts`. This has been **FIXED** - the client now uses environment variables.

---

## 📋 Step-by-Step Setup Instructions

### Step 1: Access Your Supabase Dashboard
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Open your project: **yzkdrkzfpgkeczpmkygd** (from your .env.local)

### Step 2: Run Database Schema Setup

#### Option A: Run the Complete Schema (Recommended)
1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase_schema.sql`
4. Click **Run** or press `Ctrl+Enter`

#### Option B: Run Individual Setup Files
Run these SQL files in order:

1. **setup_settings.sql** - Site settings table
2. **setup_gallery_table.sql** - Gallery images table
3. **setup_members.sql** - Members table
4. **setup_gram_sabha.sql** - Gram Sabha meetings table
5. **setup_newsletter.sql** - Newsletter subscribers table
6. **setup_storage.sql** - Storage buckets for file uploads
7. **setup_content.sql** - Additional content tables
8. **setup_subscriber_count.sql** - Subscriber count function

### Step 3: Set Up Storage Buckets
1. In Supabase Dashboard, go to **Storage**
2. Create the following buckets:
   - `gallery` (for gallery images)
   - `members` (for member photos)
   - `documents` (for Gram Sabha documents)
3. Set bucket policies to **Public** for read access

### Step 4: Create Admin User

#### Option A: Using the Setup Page
1. Navigate to `http://localhost:8080/admin/setup` (if route exists)
2. Click "Create Admin User"

#### Option B: Using Supabase Dashboard
1. Go to **Authentication** > **Users**
2. Click **Add User**
3. Enter:
   - **Email**: `Chaitanyasa37@gmail.com`
   - **Password**: `Golegaon@4321`
4. Click **Create User**

#### Option C: Using the Application
1. The `SetupAdmin.tsx` component can create the user
2. Access it and click the create button

### Step 5: Verify Setup
1. Refresh your application at `http://localhost:8080/`
2. Click the **Admin** button in the header
3. Log in with:
   - **Email**: `Chaitanyasa37@gmail.com`
   - **Password**: `Golegaon@4321`
4. You should now have access to the admin panel

---

## 🔐 Admin Credentials

| Field | Value |
|-------|-------|
| **Email** | Chaitanyasa37@gmail.com |
| **Password** | Golegaon@4321 |

---

## 🌐 Environment Variables

Your `.env.local` is configured with:
```
VITE_SUPABASE_URL=https://yzkdrkzfpgkeczpmkygd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ The application now correctly uses these environment variables.

---

## 🐛 Troubleshooting

### "Failed to fetch" Error
- ✅ **FIXED**: Updated `supabaseClient.ts` to use environment variables
- **Solution**: Restart the dev server (already done)

### "Table does not exist" Error
- **Cause**: Database tables not created
- **Solution**: Run the SQL schema files in Supabase Dashboard

### "Authentication Error" / "Invalid credentials"
- **Cause**: Admin user not created
- **Solution**: Create admin user using one of the methods above

### "Storage bucket not found"
- **Cause**: Storage buckets not created
- **Solution**: Create storage buckets in Supabase Dashboard

### CORS or Network Errors
- **Cause**: Supabase project settings
- **Solution**: Check project URL and ensure it's accessible

---

## 📊 Database Tables

Your project uses these tables:
- `gallery_images` - Gallery photos
- `members` - Village members/officials
- `site_settings` - Site configuration
- `gram_sabha_meetings` - Meeting records
- `newsletter_subscribers` - Email subscribers
- `content` - Dynamic content

---

## 🚀 Next Steps

1. ✅ Fixed Supabase client configuration
2. ⏳ Run database schema in Supabase Dashboard
3. ⏳ Create storage buckets
4. ⏳ Create admin user
5. ⏳ Test login and admin panel access

---

## 📞 Support

If you continue to face issues:
1. Check browser console for detailed error messages
2. Verify Supabase project is active and accessible
3. Ensure all SQL scripts ran without errors
4. Check that RLS policies are properly configured
