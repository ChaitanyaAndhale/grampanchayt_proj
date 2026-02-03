# 🚀 Deployment Guide - Gram Panchayat Golegaon Website

## ✅ Website Status: READY TO PUBLISH

Your website is fully functional with:
- ✅ Admin Panel (Login, Dashboard, Members, Gallery, Gram Sabha, Settings)
- ✅ Public Website (Homepage, About, Services, Contact)
- ✅ Supabase Backend (Database + Storage)
- ✅ Authentication System
- ✅ Bilingual Support (English & Marathi)

---

## 📋 Pre-Deployment Checklist

### ✅ Completed:
- [x] Supabase project created
- [x] Database tables created
- [x] Storage buckets configured
- [x] Admin user created
- [x] Environment variables set
- [x] RLS policies configured
- [x] Development server tested

### 🔍 Final Checks:
- [ ] Test all admin features (add/edit/delete members, gallery, etc.)
- [ ] Test login/logout
- [ ] Test public website pages
- [ ] Test language toggle (English/Marathi)
- [ ] Test on mobile devices

---

## 🌐 Deployment Options

### **Option 1: Vercel (Recommended - FREE)**

#### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub/GitLab/Email

#### Step 2: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 3: Login to Vercel
```bash
vercel login
```

#### Step 4: Deploy
```bash
# From project directory
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? grampanchayat-golegaon
# - Directory? ./
# - Override settings? No
```

#### Step 5: Add Environment Variables
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   VITE_SUPABASE_URL = https://qrcxfjibagwwyafrmegg.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyY3hmamliYWd3d3lhZnJtZWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMjg3MjMsImV4cCI6MjA4NTcwNDcyM30.0DDm6akG4yrrEk6GKH77ILDMF5gF-14MLSyiNbA4HKY
   ```

#### Step 6: Redeploy
```bash
vercel --prod
```

**Your site will be live at:** `https://grampanchayat-golegaon.vercel.app`

---

### **Option 2: Netlify (Alternative - FREE)**

#### Step 1: Create Netlify Account
1. Go to https://netlify.com
2. Sign up with GitHub/Email

#### Step 2: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 3: Build Project
```bash
npm run build
```

#### Step 4: Deploy
```bash
netlify deploy --prod

# When prompted:
# - Create new site? Yes
# - Publish directory? dist
```

#### Step 5: Add Environment Variables
1. Netlify Dashboard → Site Settings → Environment Variables
2. Add the same variables as Vercel

---

### **Option 3: GitHub Pages (FREE but requires GitHub)**

#### Step 1: Create GitHub Repository
1. Go to https://github.com
2. Create new repository: `grampanchayat-golegaon`

#### Step 2: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/grampanchayat-golegaon.git
git push -u origin main
```

#### Step 3: Configure GitHub Pages
1. Repository → Settings → Pages
2. Source: GitHub Actions
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Step 4: Add Secrets
1. Repository → Settings → Secrets and variables → Actions
2. Add secrets for environment variables

---

## 🔐 Admin Access

### Admin Login URL:
```
https://your-domain.com/login
```

### Admin Credentials:
```
Email: aplegolegaon@gmail.com
Password: Aplegolegaon@1972
```

**⚠️ IMPORTANT:** Change password after first login!

---

## 📱 Custom Domain (Optional)

### For Vercel:
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Netlify:
1. Netlify Dashboard → Domain Settings → Add custom domain
2. Update DNS records

---

## 🛠️ Post-Deployment Tasks

### 1. Test Everything
- [ ] Visit public website
- [ ] Login to admin panel
- [ ] Add test member
- [ ] Upload test image
- [ ] Create test Gram Sabha meeting
- [ ] Update settings

### 2. Update Content
- [ ] Add real members
- [ ] Upload village photos
- [ ] Add Gram Sabha records
- [ ] Update village information
- [ ] Update contact details

### 3. Security
- [ ] Change admin password
- [ ] Review RLS policies
- [ ] Enable 2FA on Supabase (optional)

---

## 📊 Analytics (Optional)

### Add Google Analytics:
1. Create GA4 property
2. Add tracking code to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🆘 Troubleshooting

### Issue: Environment variables not working
**Solution:** Make sure to redeploy after adding environment variables

### Issue: Images not loading
**Solution:** Check Supabase storage bucket is public

### Issue: Login not working
**Solution:** Verify Supabase URL and anon key are correct

### Issue: 404 on refresh
**Solution:** Add `_redirects` file for Netlify or configure Vercel routing

---

## 📞 Support

For issues or questions:
- Check Supabase Dashboard for errors
- Review browser console (F12)
- Check deployment logs

---

## 🎉 Congratulations!

Your Gram Panchayat website is now live! 🚀

**Next Steps:**
1. Share the URL with village members
2. Train admin users
3. Regularly update content
4. Monitor analytics

---

**Developed with ❤️ for Golegaon Gram Panchayat**
