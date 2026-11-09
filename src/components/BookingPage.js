import React, { useState, useEffect, useRef } from 'react';
import './BookingPage.css';
import {
  FaUser, FaPhone, FaMapMarkerAlt, FaTools,
  FaFileAlt, FaWhatsapp, FaArrowLeft,
  FaCheckCircle, FaTimesCircle, FaEnvelope
} from 'react-icons/fa';

const API = 'http://localhost:5001';

const EMPTY = {
  name: '', mobile: '', email: '',
  address: '', city: 'Kadapa', pincode: '', landmark: '',
  serviceType: '', issueDescription: '',
  preferredDate: '', preferredTime: '',
  location: ''
};

const SERVICES = [
  'AC Service & Repair','Refrigerator Repair','Microwave Repair',
  'Washing Machine Service','Water Purifier Service','Geyser Repair',
  'Chimney Service','Movers & Packers','Furniture Assembly',
  'Computer Hardware Repair','TV Repair','Other Appliance'
];

const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`booking-toast ${toast.type}`}>
      <div className="toast-icon">
        {toast.type === 'success' ? <FaCheckCircle color="#10b981" /> : <FaTimesCircle color="#ef4444" />}
      </div>
      <div>
        <div className="toast-title">{toast.title}</div>
        <div className="toast-body">{toast.message}</div>
      </div>
    </div>
  );
};

const BookingPage = () => {
  const [form, setForm]         = useState(EMPTY);
  const [submitting, setSubmit] = useState(false);
  const [toast, setToast]       = useState(null); // eslint-disable-line
  const [locationStatus, setLocationStatus] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const toastTimer              = useRef(null);

  /* Pre-fill service from URL */
  useEffect(() => {
    const svc = new URLSearchParams(window.location.search).get('service');
    if (svc) setForm(p => ({ ...p, serviceType: svc }));
  }, []);

  const showToast = (type, title, message, duration = 7000) => {
    clearTimeout(toastTimer.current);
    setToast({ type, title, message });
    toastTimer.current = setTimeout(() => setToast(null), duration);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const requestLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus({ type: 'error', message: 'Live location is not available in this browser. You can continue with your address.' });
      return;
    }

    setLocationLoading(true);
    setLocationStatus({ type: 'loading', message: 'Waiting for location permission…' });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setForm(p => ({ ...p, location: `${coords.latitude},${coords.longitude}` }));
        setLocationLoading(false);
        setLocationStatus({ type: 'success', message: 'Live location is ready and will be included in your WhatsApp request.' });
      },
      error => {
        const message = error.code === error.PERMISSION_DENIED
          ? 'Location permission was denied. Allow it in your browser settings, or continue with your address.'
          : error.code === error.POSITION_UNAVAILABLE
            ? 'Your location could not be detected. Check your device location settings or continue with your address.'
            : 'Location request timed out. Try again or continue with your address.';
        setLocationLoading(false);
        setLocationStatus({ type: 'error', message });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const generateOrderId = () => `KAC${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    const orderId   = generateOrderId();
    const mapLink   = form.location
      ? `https://www.google.com/maps?q=${encodeURIComponent(form.location)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${form.address}, ${form.city}`)}`;
    const payload   = { ...form, orderId, submittedAt: new Date().toISOString(), googleMapsLink: mapLink };

    let whatsappMsg = '';

    /* ── Try backend ── */
    try {
      const res  = await fetch(`${API}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        whatsappMsg = data.whatsappText || '';
        showToast(
          'success',
          '✅ Booking Confirmed!',
          `Order ID: ${orderId} — A professional PDF has been emailed to kadapaappliancecare@gmail.com. ${data.emailMessage || ''}`
        );
      } else {
        throw new Error(data.message || 'Server error');
      }
    } catch (err) {
      /* Backend offline — fall back to WhatsApp message */
      whatsappMsg = buildWhatsappFallback(payload, mapLink);
      showToast(
        'success',
        '📲 Redirecting to WhatsApp',
        `Order ID: ${orderId} — Your booking is being sent via WhatsApp.`
      );
    }

    /* ── Open WhatsApp ── */
    const waURL = `https://wa.me/916303715808?text=${encodeURIComponent(whatsappMsg)}`;
    setTimeout(() => {
      window.open(waURL, '_blank');
      setSubmit(false);
      setForm(EMPTY);
      setTimeout(() => { window.location.href = '/'; }, 3500);
    }, 1200);
  };

  return (
    <div className="booking-page">
      {/* Hero */}
      <div className="booking-hero">
        <div className="container booking-hero-inner">
          <a href="/" className="back-btn"><FaArrowLeft /> Back to Home</a>
          <h1>Book a Service</h1>
          <p>Fill in your details — we'll confirm within 30 minutes and send a PDF receipt.</p>
        </div>
      </div>

      <div className="container">
        <div className="booking-layout">
          {/* Sidebar */}
          <aside className="booking-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-card-title">How it works</div>
              <div className="sidebar-steps">
                {['Fill the form below','We confirm within 30 min','Technician arrives at door','Pay after satisfaction'].map((s,i) => (
                  <div className="step-item" key={i}>
                    <span className="step-num">{i+1}</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-title">Need Help?</div>
              <div className="sidebar-contact">
                <a href="tel:+916303715808" className="sidebar-contact-row"><FaPhone /> +91 63037 15808</a>
                <a href="https://wa.me/916303715808" target="_blank" rel="noopener noreferrer" className="sidebar-contact-row"><FaWhatsapp /> Chat on WhatsApp</a>
                <a href="mailto:kadapaappliancecare@gmail.com" className="sidebar-contact-row"><FaEnvelope /> Send Email</a>
              </div>
            </div>
          </aside>

          {/* Form */}
          <form className="booking-form-card" onSubmit={handleSubmit}>

            {/* Personal */}
            <div className="form-section-block">
              <div className="form-section-head">
                <div className="form-section-icon" style={{ background:'#eff6ff', color:'#2563eb' }}><FaUser /></div>
                <h3>Personal Information</h3>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name <span className="req">*</span></label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label>Mobile Number <span className="req">*</span></label>
                  <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} placeholder="10-digit number" pattern="[0-9]{10}" required />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: 14 }}>
                <label>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="optional — we'll email your PDF receipt" />
              </div>
            </div>

            {/* Location */}
            <div className="form-section-block">
              <div className="form-section-head">
                <div className="form-section-icon" style={{ background:'#ecfdf5', color:'#10b981' }}><FaMapMarkerAlt /></div>
                <h3>Service Location</h3>
              </div>
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label>Complete Address <span className="req">*</span></label>
                <textarea name="address" value={form.address} onChange={handleChange} placeholder="House/Flat No., Street, Area…" rows={3} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City <span className="req">*</span></label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>PIN Code</label>
                  <input type="text" name="pincode" value={form.pincode} onChange={handleChange} placeholder="516001" pattern="[0-9]{6}" />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: 14 }}>
                <label>Landmark</label>
                <input type="text" name="landmark" value={form.landmark} onChange={handleChange} placeholder="Near ABC School, Opposite XYZ Mall…" />
              </div>
              <div className="location-picker">
                <button
                  type="button"
                  className="location-request-btn"
                  onClick={requestLiveLocation}
                  disabled={locationLoading}
                >
                  <FaMapMarkerAlt />
                  {locationLoading ? 'Requesting location…' : form.location ? 'Refresh live location' : 'Share my live location'}
                </button>
                <span className="location-hint">Optional. Your browser will ask permission; the location link is included with your WhatsApp request.</span>
                {locationStatus && (
                  <span className={`location-status ${locationStatus.type}`} role="status" aria-live="polite">
                    {locationStatus.message}
                  </span>
                )}
              </div>
            </div>

            {/* Service */}
            <div className="form-section-block">
              <div className="form-section-head">
                <div className="form-section-icon" style={{ background:'#fffbeb', color:'#f59e0b' }}><FaTools /></div>
                <h3>Service Details</h3>
              </div>
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label>Service Type <span className="req">*</span></label>
                <select name="serviceType" value={form.serviceType} onChange={handleChange} required>
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                  <label>Preferred Time</label>
                  <select name="preferredTime" value={form.preferredTime} onChange={handleChange}>
                    <option value="">Any time</option>
                    <option value="Morning (8 AM – 12 PM)">Morning (8 AM – 12 PM)</option>
                    <option value="Afternoon (12 PM – 4 PM)">Afternoon (12 PM – 4 PM)</option>
                    <option value="Evening (4 PM – 8 PM)">Evening (4 PM – 8 PM)</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Issue */}
            <div className="form-section-block">
              <div className="form-section-head">
                <div className="form-section-icon" style={{ background:'#eaf3fa', color:'#376f9d' }}><FaFileAlt /></div>
                <h3>Issue Description</h3>
              </div>
              <div className="form-group">
                <label>Describe the Problem <span className="req">*</span></label>
                <textarea name="issueDescription" value={form.issueDescription} onChange={handleChange} placeholder="Describe the issue in detail — e.g. AC not cooling, making noise, water leakage…" rows={5} required />
                <span className="form-hint">More detail helps our technician come fully prepared.</span>
              </div>
            </div>

            {/* Submit */}
            <div className="form-submit-block">
              <p className="submit-info">
                On submit — a <strong>professional PDF receipt</strong> will be emailed to our team and you'll be redirected to WhatsApp for confirmation.
              </p>
              <button type="submit" className="btn-book-submit" disabled={submitting}>
                {submitting ? (
                  <><div className="spinner" /> Processing your booking…</>
                ) : (
                  <><FaWhatsapp /> Confirm Booking</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
};

/* Fallback plain-text WhatsApp message when backend is offline */
function buildWhatsappFallback(b, mapLink) {
  return [
    `*KADAPA APPLIANCE CARE — SERVICE BOOKING*`,
    ``,
    `Order ID: *${b.orderId}*`,
    `Status: ✅ Received`,
    ``,
    `*Customer*`,
    `Name: ${b.name}`,
    `Mobile: ${b.mobile}`,
    b.email ? `Email: ${b.email}` : '',
    ``,
    `*Location*`,
    b.address,
    `${b.city}${b.pincode ? ', ' + b.pincode : ''}`,
    b.landmark ? `Landmark: ${b.landmark}` : '',
    `${b.location ? 'Live location' : 'Address map'}: ${mapLink}`,
    ``,
    `*Service*`,
    `Type: ${b.serviceType}`,
    b.preferredDate ? `Date: ${b.preferredDate}` : '',
    b.preferredTime ? `Time: ${b.preferredTime}` : '',
    ``,
    `*Issue*`,
    b.issueDescription,
    ``,
    `_Kadapa Appliance Care | +91 63037 15808_`,
  ].filter(l => l !== undefined && l !== null && !(typeof l === 'string' && l === '')).join('\n');
}

export default BookingPage;
