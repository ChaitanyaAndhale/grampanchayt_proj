# Deployment via GitHub + Vercel

## Quick Setup Guide

### Step 1: Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - Gram Panchayat Website"
```

### Step 2: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `grampanchayat-golegaon`
3. Description: "Gram Panchayat Golegaon Official Website"
4. Public/Private: Your choice
5. Click "Create repository"

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/grampanchayat-golegaon.git
git branch -M main
git push -u origin main
```

### Step 4: Connect to Vercel
1. Go to Vercel dashboard
2. Click "Continue with GitHub"
3. Select your repository
4. Add environment variables
5. Deploy!

### Step 5: Future Updates
```bash
# Make changes
git add .
git commit -m "Updated content"
git push
# Vercel will auto-deploy!
```

## Alternative: Use .gitignore

Make sure sensitive files are not uploaded:
- .env.local
- node_modules/
- dist/
