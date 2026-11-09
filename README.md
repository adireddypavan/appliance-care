# Kadapa Appliance Care - Professional Website

A modern, responsive website for **Kadapa Appliance Care** - a professional appliance repair and installation service provider in Kadapa, Andhra Pradesh.

## 🚀 Features

### Core Functionality
- **Professional Landing Page** with hero section
- **Service Listings** with detailed service cards for 10+ services
- **Call & WhatsApp Integration** for instant customer communication
- **Service Request System** via WhatsApp with auto-generated Order IDs
- **Responsive Design** - works perfectly on mobile, tablet, and desktop
- **Modern UI/UX** with smooth animations and transitions

### Services Offered
- AC Service & Repair
- Refrigerator Repair
- Microwave Repair
- Washing Machine Service
- Water Purifier Service
- Geyser Repair
- Chimney Service
- Movers & Packers
- Double Cot Bed Assembly
- Hardware & PC Repair

### Technical Features
- Built with **React.js** (industry-standard framework)
- **Component-based architecture** for maintainability
- **React Icons** for professional icons
- **CSS animations** for enhanced user experience
- **Fully responsive** design with mobile-first approach
- **SEO-friendly** structure
- **WhatsApp Business Integration** for service requests
- **Automatic Order ID generation** for tracking

### WhatsApp Integration
When customers request service via WhatsApp, they send:
- Customer name and phone
- Service location/address
- Service type required
- Problem description
- **Auto-generated Order ID** (e.g., KAC1730891234567)

## 📋 Prerequisites

Before running this project, make sure you have:
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

## 🛠️ Installation & Setup

### 1. Navigate to Project Directory
```bash
cd kadapa-appliance-care
```

### 2. Install Dependencies (Already done, but if needed)
```bash
npm install
```

### 3. Configure Contact Details

**IMPORTANT:** Update the following contact information in these files:

#### Files to Update:
1. **src/components/Header.js** (Line 9-10)
2. **src/components/Hero.js** (Line 6-7)
3. **src/components/Services.js** (Line 84)
4. **src/components/ServiceRequestModal.js** (Line 14)
5. **src/components/ContactSection.js** (Line 6-8)
6. **src/components/Footer.js** (Line 6-8)

Replace with your actual contact details:
```javascript
const phoneNumber = '+919876543210';     // Your phone number with country code
const whatsappNumber = '919876543210';   // WhatsApp number (without +)
const email = 'info@kadapaappliancecare.com';  // Your email
```

### 4. Configure the backend email notifications (optional but required for delivery)
Create a `.env` file in the `server` folder using the sample provided in `server/.env.example` and fill in your Gmail SMTP credentials:

```bash
cd server
copy .env.example .env
```

Update the email values so the booking receipt can be emailed to `kadapaappliancecare@gmail.com`.

### 5. Start the booking API
```bash
npm run start:server
```

### 6. Run Development Server
```bash
npm start
```

The website will open automatically at `http://localhost:3000`

### 7. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📱 How WhatsApp Service Request Works

1. Customer clicks "Book Service" or "WhatsApp" button
2. Modal opens with service request form
3. Customer fills in:
   - Full Name
   - Phone Number
   - Service Type
   - Complete Address
   - Problem Description (optional)
4. System generates unique Order ID (e.g., `KAC1730891234567`)
5. WhatsApp opens with pre-filled message including:
   - Order ID
   - Customer details
   - Service address
   - Service type
   - Description
6. Message is sent to your WhatsApp Business number
7. You can track and respond with confirmation

## 🎨 Customization

### Colors
Edit color scheme in `src/App.css`:
```css
:root {
  --primary-color: #2563eb;    /* Main brand color */
  --secondary-color: #1e40af;  /* Secondary brand color */
  --accent-color: #f59e0b;     /* Accent color */
}
```

### Services
Add/modify services in `src/components/Services.js` in the `services` array.

### Logo
Replace the logo in `src/components/Header.js` - currently using an icon, can be replaced with an image.

## 📁 Project Structure

```
kadapa-appliance-care/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.js & Header.css
│   │   ├── Hero.js & Hero.css
│   │   ├── Services.js & Services.css
│   │   ├── ServiceRequestModal.js & ServiceRequestModal.css
│   │   ├── About.js & About.css
│   │   ├── ContactSection.js & ContactSection.css
│   │   └── Footer.js & Footer.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)
1. Create account at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build command: `npm run build`
4. Publish directory: `build`

### Option 2: Vercel
1. Create account at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy automatically

### Option 3: Traditional Hosting
1. Run `npm run build`
2. Upload contents of `build` folder to your web host
3. Configure server to serve `index.html` for all routes

## 📞 Contact Information to Update

Before going live, update these in ALL component files:
- **Phone Number**: +91-XXXXXXXXXX
- **WhatsApp Number**: 91XXXXXXXXXX (without +)
- **Email**: your-email@domain.com
- **Social Media Links**: In Footer.js

## 🎯 Features Implementation

### ✅ Implemented Features
- [x] Responsive header with sticky navigation
- [x] Hero section with call-to-actions
- [x] Service cards with booking functionality
- [x] WhatsApp integration with Order ID generation
- [x] Service request modal/form
- [x] About section with features
- [x] Contact section with info cards
- [x] Professional footer
- [x] Mobile responsive design
- [x] Smooth animations and transitions

### 🔮 Future Enhancements (Optional)
- [ ] Backend integration for form storage
- [ ] Customer testimonials section
- [ ] Gallery of completed work
- [ ] Blog section for tips
- [ ] Multi-language support
- [ ] Online payment integration
- [ ] Service tracking portal
- [ ] Customer login/dashboard

## 💡 Tips for Success

1. **Test WhatsApp Links** - Make sure your WhatsApp Business number is active
2. **Mobile Testing** - Most customers will visit from mobile
3. **Fast Response** - Respond quickly to WhatsApp messages
4. **Update Content** - Keep service prices and details current
5. **Add Photos** - Replace placeholder graphics with real photos
6. **SEO Optimization** - Add meta tags for better Google ranking
7. **Google My Business** - Link your GMB profile for local SEO

## 🆘 Troubleshooting

### Issue: npm start fails
**Solution**: Delete `node_modules` folder and run `npm install` again

### Issue: WhatsApp not opening
**Solution**: Check WhatsApp number format (no spaces, no +, include country code)

### Issue: Styles not loading
**Solution**: Clear browser cache or do hard refresh (Ctrl + Shift + R)

## 📄 License

This project is created for **Kadapa Appliance Care** - All rights reserved.

## 👨‍💻 Developer Notes

Built with 25+ years of development best practices:
- Clean, maintainable code
- Component-based architecture
- Responsive design patterns
- Modern ES6+ JavaScript
- CSS best practices
- Cross-browser compatibility
- Performance optimized
- Accessibility considerations

---

**Need Help?** Contact your development team for support and customizations.

**Version:** 1.0.0  
**Last Updated:** 2024
