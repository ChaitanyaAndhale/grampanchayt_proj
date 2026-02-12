# 🔐 Admin Login Credentials Setup

## Universal Admin Access for All Devices

This guide will help you set up admin login credentials that work across **all devices** - computers, tablets, and mobile phones.

---

## 📋 Current Admin Credentials

**Admin Email:** `aplegolegaon@gmail.com`  
**Admin Password:** `Aplegolegaon@1972`

**Login URL:** `https://your-domain.com/login` or `https://your-vercel-url.vercel.app/login`

> ⚠️ **Important:** These credentials work on ANY device that has internet access. Once set up in Supabase, anyone with these credentials can login from anywhere.

---

## 🚀 How to Set Up Admin User in Supabase

Follow these steps to create the admin user that will work on all devices:

### **Step 1: Open Supabase Dashboard**

1. Go to: https://supabase.com/dashboard
2. Login with your account
3. Select your project: **qrcxfjibagwwyafrmegg**

---

### **Step 2: Navigate to Authentication**

1. In the left sidebar, click **"Authentication"**
2. Click on **"Users"** tab

---

### **Step 3: Create Admin User**

**Option A: Manual Creation (Easy)**

1. Click **"Add User"** button (top right)
2. Fill in the details:
   - **Email:** `aplegolegaon@gmail.com`
   - **Password:** `Aplegolegaon@1972`
   - **Auto Confirm User:** ✅ **Check this box** (Important!)
3. Click **"Create User"**

**Option B: Using SQL (Advanced)**

1. Go to **SQL Editor** in Supabase
2. Click **"New Query"**
3. Copy and paste the SQL from `create_admin_user.sql` file
4. Click **"Run"**

---

### **Step 4: Verify Admin User**

1. Go back to **Authentication → Users**
2. You should see the admin user with:
   - Email: `aplegolegaon@gmail.com`
   - Confirmed: ✅ (should show confirmed/green status)
3. If not confirmed, click on the user and click **"Send Confirmation Email"** or manually confirm

---

### **Step 5: Test Login on Multiple Devices**

1. **On Computer:**
   - Open: `https://your-website.com/login`
   - Enter email: `aplegolegaon@gmail.com`
   - Enter password: `Aplegolegaon@1972`
   - Click Login

2. **On Mobile/Tablet:**
   - Open the same login URL
   - Use the same credentials
   - Should work exactly the same!

3. **On Any Browser:**
   - Chrome, Firefox, Safari, Edge - all work
   - The credentials are stored in Supabase cloud
   - They work from anywhere in the world

---

## 🔄 How to Change Admin Credentials

If you want to change the password or email:

### **Change Password:**

1. Go to Supabase Dashboard
2. Authentication → Users
3. Click on the admin user
4. Click **"Reset Password"**
5. Enter new password
6. Click **"Update User"**

**OR** use SQL:

```sql
-- Change password for admin user
UPDATE auth.users 
SET encrypted_password = crypt('YOUR_NEW_PASSWORD', gen_salt('bf'))
WHERE email = 'aplegolegaon@gmail.com';
```

### **Change Email:**

1. Authentication → Users
2. Click on admin user
3. Edit email field
4. Save

---

## 👥 Adding Multiple Admin Users

If you want multiple people to have admin access:

### **Method 1: Create Additional Users**

1. Repeat the user creation process with different credentials
2. Example:
   - Email: `admin2@golegaon.com`
   - Password: `SecurePassword123`

### **Method 2: Using SQL Script**

Run this SQL in Supabase SQL Editor:

```sql
-- For each additional admin
SELECT create_admin_user(
    'admin2@golegaon.com',
    'SecurePassword123',
    'Admin Name'
);
```

---

## 🎯 Login Instructions for Users

Share these simple instructions with anyone who needs admin access:

### **How to Login:**

1. **Go to the website:**
   - Main site: `https://aplegolegaon.com` (or your domain)
   - Direct login: `https://aplegolegaon.com/login`

2. **Enter credentials:**
   - Email: `aplegolegaon@gmail.com`
   - Password: `Aplegolegaon@1972`

3. **Click "Login" button**

4. **You're in!** 
   - Will redirect to admin panel
   - Can manage all content from any device

---

## 📱 Testing on Different Devices

| Device Type | Browser | Status | URL |
|-------------|---------|--------|-----|
| Desktop PC | Chrome | ✅ | Login URL |
| Desktop PC | Firefox | ✅ | Login URL |
| Desktop PC | Edge | ✅ | Login URL |
| Mobile (Android) | Chrome | ✅ | Login URL |
| Mobile (iPhone) | Safari | ✅ | Login URL |
| Tablet | Any Browser | ✅ | Login URL |

**All devices use the SAME credentials!**

---

## 🔒 Security Best Practices

### **Recommended:**

1. ✅ Use a strong, unique password
2. ✅ Change default password after first login
3. ✅ Don't share credentials publicly
4. ✅ Use different passwords for different admins
5. ✅ Enable 2FA (if needed in future)

### **Current Password Strength:**

- Password: `Aplegolegaon@1972`
- Strength: **Strong** ✅
  - Contains uppercase
  - Contains lowercase  
  - Contains numbers
  - Contains special character (@)
  - Length: 18 characters

---

## 🛠️ Troubleshooting

### **Problem: Can't login on mobile**

**Solution:**
- Clear browser cache on mobile
- Try in incognito/private mode
- Check internet connection
- Verify you're using correct URL

### **Problem: "Invalid credentials" error**

**Solution:**
- Double-check email (case sensitive)
- Double-check password (exact characters)
- Verify user is confirmed in Supabase
- Check if user exists in Authentication → Users

### **Problem: Login works on one device but not another**

**Solution:**
- This shouldn't happen - credentials work globally
- Clear cookies/cache on the device that's failing
- Try different browser on that device
- Check if device can access the website at all

### **Problem: Need to reset password**

**Solution:**
1. Go to Supabase Dashboard
2. Authentication → Users
3. Find the user
4. Click "Reset Password"
5. Set new password

---

## ✅ Quick Checklist

- [ ] Admin user created in Supabase
- [ ] User is confirmed (not pending)
- [ ] Password is strong and secure
- [ ] Tested login on desktop
- [ ] Tested login on mobile
- [ ] Tested on different browsers
- [ ] Credentials documented securely
- [ ] Access instructions shared with authorized users

---

## 📞 Support Information

**Supabase Dashboard:** https://supabase.com/dashboard  
**Project ID:** qrcxfjibagwwyafrmegg  
**Project URL:** https://qrcxfjibagwwyafrmegg.supabase.co

**Website Login:** https://your-domain.com/login  
**Admin Panel:** https://your-domain.com/admin

---

## 🎉 Success!

Once set up, your admin credentials will work:
- ✅ On all devices
- ✅ From anywhere in the world  
- ✅ On any browser
- ✅ Immediately after creation
- ✅ No additional setup needed per device

**The credentials are stored in Supabase's cloud database, making them universally accessible!**

---

**Created:** February 2026  
**For:** Golegaon Gram Panchayat Website
