# 🌐 Domain Purchase Guide - aplegolegaon.com

## 💰 Price Comparison

| Provider | Price (First Year) | Price (Renewal) | Payment Methods | Auto-Connect to Vercel |
|----------|-------------------|-----------------|-----------------|----------------------|
| **Vercel** | $11.25 (~₹940) | $11.25/year | International Card | ✅ YES (Automatic) |
| **Hostinger India** | ₹149-399 | ₹799/year | UPI, Cards, NetBanking | ❌ Manual Setup |
| **GoDaddy India** | ₹199-799 | ₹999/year | UPI, Cards, NetBanking | ❌ Manual Setup |
| **BigRock** | ₹99-599 | ₹899/year | UPI, Cards, NetBanking | ❌ Manual Setup |

---

## 🎯 RECOMMENDATION: Hostinger India ⭐

**Why Hostinger?**
- ✅ Cheapest option (₹149-399)
- ✅ Indian payment methods (UPI, Cards)
- ✅ Good customer support (Hindi available)
- ✅ Easy to use control panel
- ✅ Trusted in India

**Only drawback:** Manual Vercel connection (but I'll help you!)

---

## 🛒 STEP-BY-STEP: Buy from Hostinger India

### Step 1: Open Hostinger

Go to: **https://www.hostinger.in**

### Step 2: Search Domain

1. On homepage, find "Domain" section
2. In search box, type: `aplegolegaon.com`
3. Click "Search" or "Check Availability"

### Step 3: Check Availability

If available, you'll see:
```
✅ aplegolegaon.com is available!
Price: ₹149 - ₹399 (first year)
```

### Step 4: Add to Cart

1. Click "Add to Cart" button
2. Choose 1 year or more (1 year recommended for now)
3. **Recommended Add-ons:**
   - ✅ Domain Privacy Protection (₹99/year) - Hides your personal info
   - ❌ Other services not needed right now

### Step 5: Create Hostinger Account

1. Click "Checkout" or "Proceed"
2. Create account:
   - Email address डालो
   - Password बनाओ
   - या Google/Facebook से signup करो

### Step 6: Choose Payment Method

**Available options:**
- **UPI** (PhonePe, Google Pay, Paytm) ⭐ Easiest
- Debit/Credit Card
- Net Banking
- Paytm Wallet

### Step 7: Complete Payment

1. Select payment method
2. Enter payment details
3. Complete payment
4. You'll get confirmation email

### Step 8: Domain Activation

- Domain activate होने में 5-30 minutes लगते हैं
- Email में confirmation आयेगा
- Hostinger dashboard में domain दिखेगा

---

## 🔗 STEP-BY-STEP: Connect Hostinger Domain to Vercel

After buying domain from Hostinger, connect it to Vercel:

### Part 1: Get DNS Records from Vercel

1. **Go to Vercel Dashboard:**
   ```
   https://vercel.com/dashboard
   ```

2. **Select Your Project:**
   - Click on: "grampanchayat-golegaon" project

3. **Go to Domains:**
   - Click "Settings" tab
   - Click "Domains" from left menu

4. **Add Custom Domain:**
   - Click "Add" or "Add Domain"
   - Enter: `aplegolegaon.com`
   - Also add: `www.aplegolegaon.com`
   - Click "Add"

5. **Vercel will show DNS records:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
   
   **📝 Write these down or take screenshot!**

---

### Part 2: Update DNS in Hostinger

1. **Login to Hostinger:**
   ```
   https://hpanel.hostinger.in
   ```

2. **Go to Domains:**
   - Click "Domains" in left menu
   - Find: `aplegolegaon.com`
   - Click "Manage"

3. **Open DNS Settings:**
   - Find "DNS / Name Servers" or "DNS Zone"
   - Click on it

4. **Add Vercel DNS Records:**

   **Record 1 (A Record):**
   ```
   Type: A
   Name: @ (or leave blank)
   Points to: 76.76.21.21
   TTL: 3600 (or default)
   ```
   Click "Add Record"

   **Record 2 (CNAME for www):**
   ```
   Type: CNAME
   Name: www
   Points to: cname.vercel-dns.com
   TTL: 3600 (or default)
   ```
   Click "Add Record"

5. **Save Changes:**
   - Click "Save" or "Save Changes"
   - DNS update होने में 15 mins - 24 hours लग सकते हैं

---

### Part 3: Verify in Vercel

1. **Go back to Vercel Dashboard**

2. **Check Domain Status:**
   - Settings → Domains
   - `aplegolegaon.com` के पास status देखो
   
3. **Wait for Verification:**
   - Initially: "Pending" या "Checking"
   - After DNS propagates: ✅ "Valid Configuration"
   - SSL Certificate: Automatically issued

4. **Test Your Domain:**
   ```
   https://aplegolegaon.com
   ```
   Should show your website! 🎉

---

## 🛒 ALTERNATIVE: Buy Directly from Vercel

### Advantages:
- ✅ Automatic DNS setup
- ✅ No manual configuration
- ✅ SSL automatic
- ✅ Ready in 5-10 minutes

### Disadvantages:
- ❌ More expensive ($11.25 vs ₹149-399)
- ❌ International payment needed

### Steps:

1. **You're already on the right page!**
   (The screenshot you showed)

2. **Click cart icon (🛒) next to aplegolegaon.com**

3. **Review Order:**
   - Domain: aplegolegaon.com
   - Price: $11.25/year
   - Auto-renewal: You can turn off later

4. **Add Payment Method:**
   - Click "Add Payment Method"
   - Enter credit/debit card details
   - International cards work (Visa, Mastercard)

5. **Complete Purchase:**
   - Click "Purchase"
   - Domain will be automatically connected to your project
   - SSL certificate automatic
   - Ready in 5-10 minutes!

6. **Done!**
   - Your website will be at: https://aplegolegaon.com
   - Login at: https://aplegolegaon.com/login

---

## 💳 Payment Methods Comparison

### For Hostinger/GoDaddy (Indian):
```
✅ UPI (PhonePe, Google Pay, Paytm)
✅ Indian Debit Cards
✅ Indian Credit Cards  
✅ Net Banking
✅ Paytm Wallet
```

### For Vercel:
```
✅ International Credit Cards (Visa, Mastercard, Amex)
✅ Debit Cards with international transaction enabled
❌ No UPI
❌ No local payment methods
```

---

## ⏱️ Timeline

### Buying from Hostinger:
```
1. Purchase: 5-10 minutes
2. Domain activation: 5-30 minutes
3. DNS configuration: 10 minutes
4. DNS propagation: 15 mins - 24 hours
Total: 30 mins - 24 hours (usually 1-2 hours)
```

### Buying from Vercel:
```
1. Purchase: 5 minutes
2. Automatic setup: 5-10 minutes
Total: 10-15 minutes ✅
```

---

## 🎯 My Final Recommendation

### **For You (Grampanchyat Project):**

**Use Hostinger India** ⭐

**Reasoning:**
1. **Budget-friendly:** ₹149-399 vs $11.25 (₹940)
2. **Indian payments:** UPI makes it easy
3. **Good for govt projects:** Cost-effective
4. **Easy renewal:** Indian payment methods
5. **Setup is just one-time effort**

**I'll help you with DNS setup!** It's not difficult, just copy-paste some values.

---

## 📝 Quick Comparison Summary

| Factor | Hostinger | Vercel |
|--------|-----------|--------|
| **Price** | ₹149-399 ✅ | $11.25 (₹940) |
| **Payment** | UPI, Cards ✅ | International Card only |
| **Setup** | Manual (10 mins) | Automatic ✅ |
| **Support** | Hindi available ✅ | English only |
| **Renewal** | Easy (Indian payment) ✅ | International card needed |
| **Total Time** | 1-2 hours | 10-15 mins ✅ |

---

## 🚀 Ready to Buy?

### If choosing Hostinger:
1. Go to: https://www.hostinger.in
2. Search: aplegolegaon.com
3. Buy with UPI/Card
4. **Then tell me** - I'll help you connect to Vercel!

### If choosing Vercel:
1. You're already there!
2. Click cart icon (🛒)
3. Complete purchase
4. Done automatically! ✅

---

## 📞 Need Help?

After buying the domain, let me know:
- Which provider you chose
- If you need help with DNS setup
- Any issues you face

I'll guide you through the connection process! 🎉

---

**Created:** February 2026  
**For:** Golegaon Gram Panchayat Domain Purchase  
**Domain:** aplegolegaon.com
