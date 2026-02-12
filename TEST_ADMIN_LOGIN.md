# 🧪 How to Test Admin Login - Step by Step

This guide will help you verify that your admin login is working correctly.

---

## 📋 What You'll Test

1. ✅ Local development server (if running)
2. ✅ Deployed website (on Vercel/your domain)
3. ✅ Admin user exists in Supabase
4. ✅ Login works on different devices

---

## 🚀 TEST 1: Local Development (Optional)

### Check if Dev Server is Running

**Your npm run dev is currently running!** You should see output like:

```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Test Login Locally

1. **Open your browser** (Chrome, Firefox, etc.)

2. **Go to:** 
   ```
   http://localhost:5173/login
   ```

3. **You should see:**
   - "Admin Login" header
   - Email input field
   - Password input field
   - Login button

4. **Enter credentials:**
   ```
   Email:    aplegolegaon@gmail.com
   Password: Aplegolegaon@1972
   ```

5. **Click "Login" button**

6. **Expected results:**

   ✅ **If working:**
   - Shows "Logged in successfully" message (toast)
   - Redirects to `/admin` page
   - You see the admin dashboard

   ❌ **If not working:**
   - Shows "Invalid credentials" or error message
   - Stays on login page
   
   → See "Troubleshooting" section below

---

## 🌐 TEST 2: Deployed Website (Production)

This is the MAIN test - your live website!

### Step 1: Open Deployed Site

Open your browser and go to **ONE** of these URLs:

```
https://aplegolegaon.com/login
```

OR (if custom domain not set up yet):

```
https://your-vercel-url.vercel.app/login
```

**To find your Vercel URL:**
1. Go to: https://vercel.com/dashboard
2. Click on your project
3. Look for the "Domains" section
4. Copy the `.vercel.app` URL

### Step 2: Test Login

1. **You should see the login form**

2. **Enter credentials:**
   ```
   Email:    aplegolegaon@gmail.com
   Password: Aplegolegaon@1972
   ```

3. **Click "Login"**

4. **Expected results:**

   ✅ **Success:**
   - Green toast: "Logged in successfully"
   - URL changes to: `https://your-site.com/admin`
   - Admin dashboard loads
   - You can see admin controls

   ❌ **Failed:**
   - Red error message
   - Stays on `/login`
   - See troubleshooting below

---

## 🔍 TEST 3: Verify User in Supabase

This checks if the admin user actually exists in the database.

### Step 1: Open Supabase

1. Go to: **https://supabase.com/dashboard**
2. Login with your Supabase account
3. Select project: **qrcxfjibagwwyafrmegg**

### Step 2: Check Users

1. In left sidebar, click: **"Authentication"**
2. Click: **"Users"** tab

### Step 3: Look for Admin User

You should see a table with users. Look for:

```
Email: aplegolegaon@gmail.com
```

**Check the status:**

✅ **Good signs:**
- User appears in the list
- Has a date in "Confirmed At" column (e.g., "2026-02-04 12:30:00")
- Shows green checkmark or "Confirmed" status

❌ **Problem signs:**
- User not in the list → User doesn't exist, create it!
- "Confirmed At" is empty/blank → User not confirmed
- Shows "Not Confirmed" or pending status

### Step 4: If User Not Confirmed

If the user shows as "Not Confirmed":

1. Click on the user email
2. Find "Confirm User" button
3. Click it
4. Try logging in again

---

## 📱 TEST 4: Different Devices

Test on multiple devices to ensure universal access:

### Desktop Computer
```
1. Open browser
2. Go to: https://aplegolegaon.com/login
3. Login with credentials
4. Should work ✅
```

### Mobile Phone
```
1. Open any browser (Chrome/Safari)
2. Go to: https://aplegolegaon.com/login
3. Login with SAME credentials
4. Should work ✅
```

### Tablet
```
1. Same process as mobile
2. Same credentials
3. Should work ✅
```

### Different Browsers
```
Try on: Chrome, Firefox, Safari, Edge
All should work with same credentials ✅
```

---

## 🔍 Check Browser Console (Advanced)

If login isn't working, check for errors:

### How to Open Console

**Windows/Linux:**
- Press `F12`
- OR Right-click → "Inspect" → "Console" tab

**Mac:**
- Press `Cmd + Option + J`
- OR Right-click → "Inspect Element" → "Console"

### What to Look For

**Good (No errors):**
```
No red error messages
```

**Problems (Red errors):**

**Error 1:** "Supabase is not defined"
```
→ Environment variables missing
→ Fix: Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
```

**Error 2:** "Invalid login credentials"
```
→ User not found or password wrong
→ Fix: Check user exists in Supabase, verify credentials
```

**Error 3:** "Email not confirmed"
```
→ User exists but not confirmed
→ Fix: Confirm user in Supabase dashboard
```

**Error 4:** Network errors (ERR_CONNECTION_REFUSED)
```
→ Dev server not running (local only)
→ Fix: Make sure npm run dev is running
```

---

## ✅ SUCCESS CRITERIA

Your admin login is working correctly when:

- [ ] Can see login form at `/login`
- [ ] Form has email and password fields
- [ ] Entering credentials works without errors
- [ ] Successful login shows green success message
- [ ] Redirects to `/admin` page after login
- [ ] Admin dashboard is accessible
- [ ] Works on desktop computer
- [ ] Works on mobile phone
- [ ] Works in different browsers
- [ ] User exists in Supabase as "Confirmed"

**If ALL are checked ✅ → Everything is working perfectly!**

---

## 🛠️ TROUBLESHOOTING

### Problem 1: "Invalid login credentials"

**Causes:**
- User doesn't exist in Supabase
- Wrong email or password
- User not confirmed

**Solutions:**

**Step 1:** Verify credentials are exactly:
```
Email:    aplegolegaon@gmail.com
Password: Aplegolegaon@1972
```
(No spaces, correct case!)

**Step 2:** Check user in Supabase
- Go to: Authentication → Users
- Look for: aplegolegaon@gmail.com
- If not there: Create the user (see QUICK_ADMIN_SETUP.md)

**Step 3:** Confirm user
- Click on user in Supabase
- Check "Confirmed At" has a date
- If empty, click "Confirm User" button

---

### Problem 2: Login form not showing

**Causes:**
- Wrong URL
- Dev server not running (local)
- Deployment failed (production)

**Solutions:**

**For Local:**
```bash
# Make sure dev server is running
npm run dev

# Then open: http://localhost:5173/login
```

**For Production:**
- Check deployment at: https://vercel.com/dashboard
- Look for latest deployment status
- Should show "Ready" with green checkmark
- If failed, redeploy:
  ```bash
  vercel --prod
  ```

---

### Problem 3: "Supabase not defined" error

**Cause:** Environment variables missing

**Solution:**

**For Local:**
Check `.env.local` file exists with:
```
VITE_SUPABASE_URL=https://qrcxfjibagwwyafrmegg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-key...
```

**For Production (Vercel):**
1. Go to: https://vercel.com/dashboard
2. Select project
3. Settings → Environment Variables
4. Verify both variables exist:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. If missing, add them
6. Redeploy:
   ```bash
   vercel --prod
   ```

---

### Problem 4: Redirects to login after logging in

**Cause:** Session not saving

**Solution:**
1. Clear browser cookies/cache
2. Try in incognito/private window
3. Check for JavaScript errors in console
4. Verify Supabase JWT secret is correct

---

### Problem 5: Works on desktop but not mobile

**Solutions:**
1. Clear mobile browser cache
2. Try mobile browser's private mode
3. Check if using exact same URL
4. Verify mobile has internet connection
5. Try different mobile browser

---

## 📸 What Success Looks Like

### 1. Login Page
```
┌──────────────────────────┐
│                          │
│     🏛️ Admin Login       │
│                          │
│  Email                   │
│  [aplegolegaon@gmail.com]│
│                          │
│  Password                │
│  [••••••••••••••••••••]  │
│                          │
│     [Login Button]       │
│                          │
└──────────────────────────┘
```

### 2. After Login Success
```
✅ "Logged in successfully" (green toast)

URL changes to: /admin

┌──────────────────────────────┐
│  Admin Dashboard             │
│  ────────────────────────    │
│  - Manage Members            │
│  - Manage Gallery            │
│  - Gram Sabha Records        │
│  - Settings                  │
│  - etc.                      │
└──────────────────────────────┘
```

### 3. User in Supabase
```
Authentication → Users

Email                        | Confirmed At        | Created
─────────────────────────────────────────────────────────────
aplegolegaon@gmail.com      | 2026-02-04 12:30:00 | 2026-02-04
✅ Confirmed
```

---

## 🎯 Quick Test Commands

### Test Local Development
```
1. Open: http://localhost:5173/login
2. Login with: aplegolegaon@gmail.com / Aplegolegaon@1972
3. Should redirect to: http://localhost:5173/admin
```

### Test Production
```
1. Open: https://aplegolegaon.com/login
2. Login with: same credentials
3. Should redirect to: https://aplegolegaon.com/admin
```

### Verify in Supabase
```
1. Open: https://supabase.com/dashboard
2. Project: qrcxfjibagwwyafrmegg
3. Go to: Authentication → Users
4. Check: aplegolegaon@gmail.com exists and is confirmed
```

---

## 📞 Still Having Issues?

If none of the troubleshooting helps:

1. **Check all files exist:**
   - Project has `.env.local` file
   - Supabase credentials are correct
   - Vercel has environment variables

2. **Review setup:**
   - Read: `COMPLETE_ADMIN_LOGIN_GUIDE.md`
   - Follow: `QUICK_ADMIN_SETUP.md`
   - Run: `create_admin_user.sql` in Supabase

3. **Verify deployment:**
   - Check Vercel dashboard for errors
   - Look at deployment logs
   - Ensure build succeeded

---

## ✅ Final Checklist

After testing, you should have:

- [ ] ✅ User exists in Supabase (Authentication → Users)
- [ ] ✅ User is confirmed (has date in "Confirmed At")
- [ ] ✅ Can access login page (both local and production)
- [ ] ✅ Login form displays correctly
- [ ] ✅ Can enter email and password
- [ ] ✅ Login button works
- [ ] ✅ Shows success message after login
- [ ] ✅ Redirects to /admin page
- [ ] ✅ Admin dashboard is accessible
- [ ] ✅ Works on desktop
- [ ] ✅ Works on mobile
- [ ] ✅ Works in multiple browsers

**All checked? Congratulations! 🎉 Your admin login is working perfectly!**

---

**Created:** February 2026  
**For:** Testing Admin Login Functionality  
**Status:** Ready to use ✅
