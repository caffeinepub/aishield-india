# Google Analytics & Search Console Setup Guide

This guide provides step-by-step instructions for configuring Google Analytics and Google Search Console for AIShield India, including how to grant access to the project owner.

## Table of Contents
1. [Google Analytics Setup](#google-analytics-setup)
2. [Google Search Console Setup](#google-search-console-setup)
3. [Security & Compliance](#security--compliance)
4. [Troubleshooting](#troubleshooting)

---

## Google Analytics Setup

### Step 1: Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **Admin** (gear icon in bottom left)
4. Under **Account**, click **Create Account** (or select existing account)
5. Under **Property**, click **Create Property**
6. Fill in property details:
   - **Property name**: AIShield India
   - **Reporting time zone**: India Standard Time (IST)
   - **Currency**: Indian Rupee (INR)
7. Click **Next** and complete business information
8. Accept Terms of Service

### Step 2: Get Measurement ID

1. In your new property, go to **Admin** > **Data Streams**
2. Click **Add stream** > **Web**
3. Enter your website URL (e.g., `https://aishield.com`)
4. Enter stream name: "AIShield India Website"
5. Click **Create stream**
6. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Update Frontend Code

1. Open `frontend/index.html`
2. Find the Google Analytics script section (around line 18-30)
3. Replace **both instances** of `G-XXXXXXXXXX` with your actual Measurement ID:
   ```html
   gtag('config', 'G-YOUR-ACTUAL-ID', {
   ```
   and
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
   ```
4. Save the file and deploy your changes

### Step 4: Grant Dashboard Access to Project Owner

1. In Google Analytics, go to **Admin** (gear icon)
2. Under **Property**, click **Property Access Management**
3. Click **+** (Add users) in top right
4. Enter the project owner's email address
5. Select role: **Administrator** (full access to property)
6. Uncheck "Notify new users by email" if you'll inform them separately
7. Click **Add**

**Access Levels Explained:**
- **Administrator**: Full control (recommended for project owner)
- **Editor**: Can edit but not manage users
- **Analyst**: Can create reports and configure
- **Viewer**: Read-only access

### Step 5: Verify Tracking

1. Deploy your updated code
2. Visit your website
3. In Google Analytics, go to **Reports** > **Realtime**
4. You should see your visit appear within 30 seconds
5. Check that page views are being tracked correctly

---

## Google Search Console Setup

### Step 1: Add Property

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Sign in with your Google account
3. Click **Add Property**
4. Choose **URL prefix** method
5. Enter your website URL (e.g., `https://aishield.com`)
6. Click **Continue**

### Step 2: Get Verification Code

1. On the verification screen, select **HTML tag** method
2. Copy the verification code from the meta tag
   - It looks like: `<meta name="google-site-verification" content="ABC123XYZ..." />`
3. Copy only the content value: `ABC123XYZ...`

### Step 3: Update Frontend Code

1. Open `frontend/index.html`
2. Find the Google Search Console verification meta tag (around line 10):
   ```html
   <meta name="google-site-verification" content="REPLACE_WITH_YOUR_VERIFICATION_CODE" />
   ```
3. Replace `REPLACE_WITH_YOUR_VERIFICATION_CODE` with your actual verification code
4. Save the file and deploy your changes

### Step 4: Complete Verification

1. Wait 2-5 minutes after deployment for changes to propagate
2. Return to Google Search Console verification screen
3. Click **Verify**
4. You should see "Ownership verified" confirmation

### Step 5: Grant Console Access to Project Owner

1. In Google Search Console, click **Settings** (gear icon in left sidebar)
2. Click **Users and permissions**
3. Click **Add user**
4. Enter the project owner's email address
5. Select permission level: **Owner** (full access)
6. Click **Add**

**Permission Levels Explained:**
- **Owner**: Full control, can add/remove users (recommended for project owner)
- **Full**: Can view all data and take most actions
- **Restricted**: Limited access to most data

### Step 6: Submit Sitemap (Optional but Recommended)

1. In Google Search Console, click **Sitemaps** in left sidebar
2. Enter sitemap URL: `sitemap.xml`
3. Click **Submit**
4. Google will begin crawling your site

---

## Security & Compliance

### DPDP Act 2023 Compliance

The Google Analytics implementation includes consent mode configuration to comply with India's Digital Personal Data Protection Act 2023:

