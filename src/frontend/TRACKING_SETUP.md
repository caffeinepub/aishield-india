# LinkedIn Insight Tag & Meta Pixel Setup Guide

This guide provides step-by-step instructions for configuring LinkedIn Insight Tag and Meta Pixel for AIShield India, including conversion tracking setup for key business events.

## Table of Contents
1. [LinkedIn Insight Tag Setup](#linkedin-insight-tag-setup)
2. [LinkedIn Conversion Tracking Setup](#linkedin-conversion-tracking-setup)
3. [Meta Pixel Setup](#meta-pixel-setup)
4. [Verification & Testing](#verification--testing)
5. [Placeholder Reference Table](#placeholder-reference-table)

---

## LinkedIn Insight Tag Setup

### Step 1: Access LinkedIn Campaign Manager

1. Go to [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager/)
2. Sign in with your LinkedIn account
3. Select your ad account (or create one if needed)

### Step 2: Get LinkedIn Partner ID

1. In Campaign Manager, click **Account Assets** in the top navigation
2. Click **Insight Tag** in the left sidebar
3. If you don't have an Insight Tag yet, click **Install Insight Tag**
4. Copy your **Partner ID** (format: 7-digit number, e.g., `1234567`)

### Step 3: Update Frontend Code

1. Open `frontend/index.html`
2. Find the LinkedIn Insight Tag section (around line 35-50)
3. Replace `XXXXXXX` with your actual Partner ID in **two places**:
   ```html
   _linkedin_partner_id = "1234567";
   ```
   and
   ```html
   <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=1234567&fmt=gif" />
   ```
4. Save the file and deploy your changes

### Step 4: Verify Base Tag Installation

1. Deploy your updated code
2. Visit your website
3. In LinkedIn Campaign Manager, go to **Account Assets** > **Insight Tag**
4. Click **See Tag Status**
5. You should see "Active" status within 24 hours

---

## LinkedIn Conversion Tracking Setup

LinkedIn conversion tracking allows you to measure specific actions users take on your website after clicking your LinkedIn ads.

### Step 1: Create Conversion Events

For each conversion event, you'll need to create a conversion in LinkedIn Campaign Manager:

1. In Campaign Manager, go to **Account Assets** > **Conversions**
2. Click **Create Conversion**
3. Fill in the conversion details:
   - **Conversion name**: Use descriptive names (see table below)
   - **Conversion type**: Select appropriate type
   - **Attribution window**: Recommended 30 days
4. Click **Create**
5. Copy the **Conversion ID** (format: 7-digit number)

**Recommended Conversion Events:**

| Conversion Name | Type | Description |
|----------------|------|-------------|
| Advisory Application Submitted | Lead | Tracks completed advisory application form submissions |
| Strategy Call Click | Other | Tracks clicks on "Book Strategy Call" CTA buttons |
| Toolkit Purchase | Purchase | Tracks completed toolkit purchases |
| Checklist Download | Lead | Tracks free checklist downloads |

### Step 2: Update Conversion IDs in Code

Replace the placeholder `XXXXXXX` with your actual Conversion IDs in the following files:

#### Advisory Application (SecurityAdvisory.tsx)
1. Open `frontend/src/pages/SecurityAdvisory.tsx`
2. Find line with `window.lintrk('track', { conversion_id: XXXXXXX });` (around line 130)
3. Replace `XXXXXXX` with your "Advisory Application Submitted" conversion ID
4. Example: `window.lintrk('track', { conversion_id: 1234567 });`

#### Strategy Call Click (Header.tsx)
1. Open `frontend/src/components/Header.tsx`
2. Find line with `window.lintrk('track', { conversion_id: XXXXXXX });` (around line 20)
3. Replace `XXXXXXX` with your "Strategy Call Click" conversion ID

#### Strategy Call Click (Home.tsx)
1. Open `frontend/src/pages/Home.tsx`
2. Find line with `window.lintrk('track', { conversion_id: XXXXXXX });` (around line 20)
3. Replace `XXXXXXX` with your "Strategy Call Click" conversion ID
4. **Note**: Use the same conversion ID as Header.tsx for consistency

#### Toolkit Purchase (PaymentSuccess.tsx)
1. Open `frontend/src/pages/PaymentSuccess.tsx`
2. Find line with `conversion_id: XXXXXXX` (around line 30)
3. Replace `XXXXXXX` with your "Toolkit Purchase" conversion ID
4. This conversion includes order value tracking automatically

#### Checklist Download (FreeChecklist.tsx)
1. Open `frontend/src/pages/FreeChecklist.tsx`
2. Find line with `window.lintrk('track', { conversion_id: XXXXXXX });` (around line 40)
3. Replace `XXXXXXX` with your "Checklist Download" conversion ID

### Step 3: Deploy and Test Conversions

1. Save all modified files
2. Deploy your changes
3. Test each conversion by completing the action on your website
4. Verify conversions appear in LinkedIn Campaign Manager within 24 hours

---

## Meta Pixel Setup

### Step 1: Access Meta Events Manager

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Sign in with your Facebook account
3. Select your business account (or create one if needed)

### Step 2: Create Meta Pixel

1. In Events Manager, click **Connect Data Sources**
2. Select **Web** as the data source
3. Choose **Meta Pixel** and click **Connect**
4. Enter a name for your pixel: "AIShield India Website"
5. Enter your website URL
6. Click **Continue**

### Step 3: Get Pixel ID

1. In Events Manager, select your newly created pixel
2. Click **Settings** in the left sidebar
3. Copy your **Pixel ID** (format: 15-digit number, e.g., `123456789012345`)

### Step 4: Update Frontend Code

1. Open `frontend/index.html`
2. Find the Meta Pixel Code section (around line 52-65)
3. Replace `XXXXXXXXXXXXXXX` with your actual Pixel ID in **two places**:
   ```javascript
   fbq('init', '123456789012345');
   ```
   and
   ```html
   <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=123456789012345&ev=PageView&noscript=1" />
   ```
4. Save the file and deploy your changes

### Step 5: Verify Pixel Installation

1. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) Chrome extension
2. Visit your website
3. Click the Meta Pixel Helper icon in your browser
4. You should see your pixel firing with "PageView" event
5. Alternatively, check Events Manager > **Test Events** to see real-time pixel activity

### Step 6: Future Conversion Events (Optional)

When you're ready to run Meta ads, you can add custom conversion events similar to LinkedIn:
- Use `fbq('track', 'Lead')` for lead generation events
- Use `fbq('track', 'Purchase', {value: amount, currency: 'INR'})` for purchases
- Refer to [Meta Pixel documentation](https://developers.facebook.com/docs/meta-pixel) for more event types

---

## Verification & Testing

### LinkedIn Insight Tag Verification

1. **Browser Console Method:**
   - Open your website
   - Open browser Developer Tools (F12)
   - Go to Console tab
   - Type `_linkedin_data_partner_ids` and press Enter
   - You should see your Partner ID in the array

2. **Network Tab Method:**
   - Open Developer Tools > Network tab
   - Visit your website
   - Filter by "linkedin"
   - You should see requests to `px.ads.linkedin.com`

3. **LinkedIn Campaign Manager:**
   - Go to Account Assets > Insight Tag
   - Check "Tag Status" - should show "Active" within 24 hours

### LinkedIn Conversion Verification

1. **Test Each Conversion:**
   - Complete each action on your website (submit form, click CTA, etc.)
   - Check browser console for any JavaScript errors
   - Verify in LinkedIn Campaign Manager > Conversions within 24 hours

2. **Conversion Tracking:**
   - Go to Account Assets > Conversions
   - Select a conversion
   - Check "Recent Conversions" to see test events

### Meta Pixel Verification

1. **Meta Pixel Helper:**
   - Install the Chrome extension
   - Visit your website
   - Extension icon should show green checkmark
   - Click icon to see pixel details

2. **Events Manager:**
   - Go to Events Manager > Test Events
   - Enter your website URL
   - Open your website in a new tab
   - You should see PageView events in real-time

3. **Pixel Diagnostics:**
   - In Events Manager, select your pixel
   - Click **Diagnostics** tab
   - Check for any errors or warnings

---

## Placeholder Reference Table

This table lists all placeholder values that need to be replaced with your actual tracking IDs:

| File | Line(s) | Placeholder | Description | Format |
|------|---------|-------------|-------------|--------|
| `frontend/index.html` | ~37, ~50 | `XXXXXXX` | LinkedIn Partner ID | 7-digit number |
| `frontend/index.html` | ~60, ~68 | `XXXXXXXXXXXXXXX` | Meta Pixel ID | 15-digit number |
| `frontend/src/pages/SecurityAdvisory.tsx` | ~130 | `XXXXXXX` | LinkedIn Conversion ID (Advisory Application) | 7-digit number |
| `frontend/src/components/Header.tsx` | ~20 | `XXXXXXX` | LinkedIn Conversion ID (Strategy Call Click) | 7-digit number |
| `frontend/src/pages/Home.tsx` | ~20 | `XXXXXXX` | LinkedIn Conversion ID (Strategy Call Click) | 7-digit number |
| `frontend/src/pages/PaymentSuccess.tsx` | ~30 | `XXXXXXX` | LinkedIn Conversion ID (Toolkit Purchase) | 7-digit number |
| `frontend/src/pages/FreeChecklist.tsx` | ~40 | `XXXXXXX` | LinkedIn Conversion ID (Checklist Download) | 7-digit number |

### Quick Find & Replace Guide

Use your code editor's find & replace feature:

1. **LinkedIn Partner ID:**
   - Find: `_linkedin_partner_id = "XXXXXXX"`
   - Replace with: `_linkedin_partner_id = "YOUR_PARTNER_ID"`

2. **LinkedIn Conversion IDs:**
   - Find: `conversion_id: XXXXXXX`
   - Replace individually in each file with the appropriate conversion ID

3. **Meta Pixel ID:**
   - Find: `fbq('init', 'XXXXXXXXXXXXXXX')`
   - Replace with: `fbq('init', 'YOUR_PIXEL_ID')`

---

## Troubleshooting

### LinkedIn Insight Tag Not Firing

- **Check CSP Headers:** Ensure `px.ads.linkedin.com` and `snap.licdn.com` are allowed in Content-Security-Policy
- **Ad Blockers:** Disable ad blockers during testing
- **Browser Console:** Check for JavaScript errors
- **Network Requests:** Verify requests to LinkedIn domains in Network tab

### LinkedIn Conversions Not Tracking

- **Conversion ID Format:** Ensure conversion IDs are numbers, not strings (no quotes)
- **Timing:** Conversions may take up to 24 hours to appear in Campaign Manager
- **Test Mode:** Use LinkedIn's test events feature to verify real-time tracking
- **JavaScript Errors:** Check browser console for errors when conversion fires

### Meta Pixel Not Loading

- **Check CSP Headers:** Ensure `connect.facebook.net` is allowed in Content-Security-Policy
- **Pixel ID Format:** Verify pixel ID is exactly 15 digits
- **Browser Console:** Check for JavaScript errors
- **Meta Pixel Helper:** Use the Chrome extension to diagnose issues

### General Issues

- **Cache:** Clear browser cache and hard reload (Ctrl+Shift+R)
- **Deployment:** Ensure all changes are deployed to production
- **HTTPS:** Both tracking pixels require HTTPS
- **Privacy Settings:** Some browsers block third-party tracking by default

---

## Support & Resources

### LinkedIn Resources
- [LinkedIn Insight Tag Documentation](https://business.linkedin.com/marketing-solutions/insight-tag)
- [LinkedIn Conversion Tracking Guide](https://business.linkedin.com/marketing-solutions/conversion-tracking)
- [LinkedIn Campaign Manager Help](https://www.linkedin.com/help/lms)

### Meta Resources
- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [Meta Events Manager Guide](https://www.facebook.com/business/help/898185560232180)
- [Meta Pixel Helper Extension](https://chrome.google.com/webstore/detail/meta-pixel-helper/)

### Contact
For technical issues with AIShield India tracking setup:
- Email: Contact@AIshield.com
- Include: Browser console errors, screenshots, and steps to reproduce

---

**Last Updated:** February 2026
**Version:** 1.0
