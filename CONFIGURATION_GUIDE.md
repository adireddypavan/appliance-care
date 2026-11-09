# Configuration Guide - Kadapa Appliance Care Website

## 🔧 Quick Configuration Checklist

Before launching your website, follow this checklist:

### 1. Update Contact Information

#### Phone Number Configuration
Update in these 6 files:

**File: src/components/Header.js (Lines 9-10)**
```javascript
const phoneNumber = '+919876543210'; // Change to your number
const whatsappNumber = '919876543210'; // Change to your WhatsApp
```

**File: src/components/Hero.js (Lines 6-7)**
```javascript
const phoneNumber = '+919876543210';
const whatsappNumber = '919876543210';
```

**File: src/components/Services.js (Line 84)**
```javascript
const whatsappNumber = '919876543210';
```

**File: src/components/ServiceRequestModal.js (Line 14)**
```javascript
const whatsappNumber = '919876543210';
```

**File: src/components/ContactSection.js (Lines 6-8)**
```javascript
const phoneNumber = '+919876543210';
const whatsappNumber = '919876543210';
const email = 'info@kadapaappliancecare.com';
```

**File: src/components/Footer.js (Lines 6-8)**
```javascript
const phoneNumber = '+919876543210';
const whatsappNumber = '919876543210';
const email = 'info@kadapaappliancecare.com';
```

#### Format Guidelines:
- **phoneNumber**: Include country code with + (e.g., +919876543210)
- **whatsappNumber**: NO + sign, just country code (e.g., 919876543210)
- **email**: Your business email address

---

### 2. Update Business Details

#### Business Name & Location
**File: src/components/ContactSection.js (Line 52)**
```javascript
<p className="address">Kadapa, Andhra Pradesh</p>
```

**File: src/components/Footer.js (Line 39)**
```javascript
<FaMapMarkerAlt /> Kadapa, Andhra Pradesh
```

#### Working Hours
**File: src/components/ContactSection.js (Lines 61-72)**
```javascript
<div className="hours-row">
  <span>Monday - Saturday:</span>
  <span>8:00 AM - 8:00 PM</span> // Change times as needed
</div>
```

---

### 3. Customize Services

**File: src/components/Services.js (Lines 11-71)**

To add a new service:
```javascript
{
  id: 11, // Increment ID
  name: 'Your Service Name',
  icon: <FaIcon />, // Choose appropriate icon
  description: 'Service description here',
  features: ['Feature 1', 'Feature 2', 'Feature 3']
}
```

To remove a service: Simply delete the service object from the array.

---

### 4. Customize Colors & Branding

**File: src/App.css (Lines 7-13)**
```css
:root {
  --primary-color: #2563eb;      /* Main blue - change to your brand color */
  --secondary-color: #1e40af;    /* Darker blue */
  --accent-color: #f59e0b;       /* Orange/Yellow accent */
  --text-dark: #1f2937;          /* Dark text */
  --text-light: #6b7280;         /* Light text */
  --bg-light: #f9fafb;           /* Background */
  --white: #ffffff;              /* White */
  --success: #10b981;            /* Success green */
  --danger: #ef4444;             /* Error red */
}
```

**Pro Tip**: Use a color picker tool to match your existing brand colors.

---

### 5. Update Social Media Links

**File: src/components/Footer.js (Lines 71-86)**
```javascript
<a href="https://facebook.com/yourpage" target="_blank">
  <FaFacebook />
</a>
<a href="https://instagram.com/yourpage" target="_blank">
  <FaInstagram />
</a>
// Update with your actual social media URLs
```

---

### 6. Configure WhatsApp Messages

#### Default WhatsApp Message Templates

**Header Button** - src/components/Header.js (Line 51)
```javascript
`https://wa.me/${whatsappNumber}?text=Hello!%20I%20would%20like%20to%20know%20about%20your%20services.`
```

**Hero Section** - src/components/Hero.js (Line 51)
```javascript
`https://wa.me/${whatsappNumber}?text=Hello!%20I%20need%20appliance%20repair%20service.`
```

**Service Request** - Automatically generates structured message with:
- Order ID
- Customer details
- Service type
- Location
- Description

**Customize the message format** in src/components/ServiceRequestModal.js (Lines 31-51)

---

### 7. SEO Configuration

**File: public/index.html**
Add these meta tags in the `<head>` section:

```html
<meta name="description" content="Professional appliance repair services in Kadapa. AC, Refrigerator, Washing Machine, and more. 25+ years experience, doorstep service available.">
<meta name="keywords" content="appliance repair Kadapa, AC repair, refrigerator repair, washing machine service, Kadapa services">
<meta name="author" content="Kadapa Appliance Care">
<meta property="og:title" content="Kadapa Appliance Care - Professional Appliance Services">
<meta property="og:description" content="Expert appliance repair and installation services in Kadapa">
<meta property="og:type" content="website">
<title>Kadapa Appliance Care - Professional Appliance Repair Services</title>
```

---

### 8. Add Your Logo

#### Option 1: Replace Icon with Logo Image

**File: src/components/Header.js (Lines 27-32)**

Replace:
```javascript
<FaTools className="logo-icon" />
```

With:
```javascript
<img src="/logo.png" alt="Kadapa Appliance Care" className="logo-image" />
```

Add to **src/components/Header.css**:
```css
.logo-image {
  height: 45px;
  width: auto;
}
```

#### Option 2: Keep Icon and Customize
Change the icon by importing a different icon from react-icons.

---

### 9. Statistics & Numbers

Update these to match your actual business stats:

**File: src/components/Hero.js (Lines 61-75)**
```javascript
<div className="stat-number">1000+</div>  // Happy Customers
<div className="stat-number">15+</div>    // Services Offered
<div className="stat-number">24/7</div>   // Support
```

**File: src/components/About.js (Lines 59-71)**
```javascript
<div className="highlight-number">25+</div>   // Years
<div className="highlight-number">1000+</div> // Customers
<div className="highlight-number">15+</div>   // Services
```

---

### 10. Service Coverage Area

**File: src/components/About.js (Lines 102-110)**
```javascript
<p>
  We provide doorstep services within <strong>25 kilometers</strong> radius of Kadapa city.
</p>
```

Change "25 kilometers" to your actual service radius.

---

## 🎨 Advanced Customizations

### Adding a New Section

1. Create new component files:
   - `src/components/YourSection.js`
   - `src/components/YourSection.css`

2. Import in App.js:
```javascript
import YourSection from './components/YourSection';
```

3. Add to App.js render:
```javascript
<YourSection />
```

### Changing Animations

Animations are in the CSS files. Look for:
- `@keyframes` definitions
- `animation:` properties
- `transition:` properties

### Mobile Responsiveness

Responsive breakpoints in CSS:
- `@media (max-width: 992px)` - Tablets
- `@media (max-width: 768px)` - Small tablets
- `@media (max-width: 480px)` - Mobile phones

---

## 🧪 Testing Checklist

Before going live, test:

- [ ] All phone numbers dial correctly
- [ ] WhatsApp links open with correct number
- [ ] Email link opens email client
- [ ] All buttons and links work
- [ ] Forms submit properly
- [ ] Responsive design on mobile
- [ ] Responsive design on tablet
- [ ] All images load correctly
- [ ] Navigation menu works
- [ ] Smooth scrolling works
- [ ] Footer links function
- [ ] Social media links correct
- [ ] WhatsApp messages format correctly
- [ ] Order ID generates properly

---

## 📱 WhatsApp Business Setup

### Recommended Setup:

1. **Get WhatsApp Business Account**
   - Download WhatsApp Business app
   - Set up business profile
   - Add business hours
   - Set up auto-replies

2. **Create Quick Replies**
   - Service confirmation template
   - Pricing template
   - Technician on-way template
   - Service completed template

3. **Auto-Reply Messages**
   - Welcome message
   - Away message
   - Business hours message

4. **Labels for Organization**
   - New Request
   - In Progress
   - Completed
   - Follow-up needed

---

## 🚀 Performance Optimization

### Before Deployment:

1. **Optimize Images** (if you add any)
   - Use WebP format
   - Compress images
   - Use appropriate sizes

2. **Build for Production**
```bash
npm run build
```

3. **Test Production Build**
```bash
npm install -g serve
serve -s build
```

4. **Check Performance**
   - Use Google PageSpeed Insights
   - Test loading speed
   - Check mobile performance

---

## 📞 Support & Maintenance

### Regular Updates Needed:
- Contact information (if changed)
- Service prices
- Working hours (holidays, etc.)
- New services
- Customer statistics
- Testimonials

### Monthly Checks:
- All links working
- WhatsApp number active
- Email receiving messages
- Website loading properly
- Mobile version working
- Forms functioning

---

## 🔐 Security Considerations

1. **Never commit sensitive data** to GitHub
2. **Use environment variables** for production
3. **Keep dependencies updated**: `npm audit fix`
4. **Use HTTPS** in production
5. **Validate form inputs**
6. **Sanitize user data**

---

## 📊 Analytics Setup (Optional)

Add Google Analytics to track visitors:

**File: public/index.html** (in `<head>`)
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

---

## ✅ Final Pre-Launch Checklist

- [ ] All contact info updated
- [ ] Business details correct
- [ ] Services list complete
- [ ] Colors match brand
- [ ] Logo added (if applicable)
- [ ] Social media links added
- [ ] WhatsApp tested
- [ ] Phone numbers tested
- [ ] Email tested
- [ ] Mobile responsive checked
- [ ] All sections reviewed
- [ ] SEO tags added
- [ ] Performance tested
- [ ] Forms working
- [ ] Analytics added (optional)

---

**Configuration Complete!** Your website is ready to launch. 🎉

For technical support or advanced customizations, refer to the README.md file.
