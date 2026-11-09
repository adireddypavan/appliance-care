import React, { useState, useEffect } from 'react';
import './BookingModal.css';
import {
  FaTimes, FaUser, FaMapMarkerAlt, FaTools,
  FaWhatsapp, FaPhone, FaCalendarAlt, FaArrowLeft, FaArrowRight
} from 'react-icons/fa';

const EMPTY = {
  name: '', mobile: '', email: '',
  address: '', city: 'Kadapa', pincode: '', landmark: '',
  issueDescription: '', preferredDate: '', preferredTime: '',
  location: '',
};

const SLOTS = ['Morning\n8-12', 'Afternoon\n12-4', 'Evening\n4-8', 'Flexible'];

function buildWhatsappMsg(b, mapLink) {
  return [
    `+------------------------------------------+`,
    `|        KADAPA APPLIANCE CARE             |`,
    `|            SERVICE REQUEST               |`,
    `+------------------------------------------+`,
    ``,
    `CUSTOMER DETAILS`,
    `--------------------------------------------`,
    `Name: ${b.name}`,
    `Mobile: ${b.mobile}`,
    b.email ? `Email: ${b.email}` : null,
    ``,
    `SERVICE LOCATION`,
    `--------------------------------------------`,
    b.address,
    `${b.city}${b.pincode ? ', ' + b.pincode : ''}`,
    b.landmark ? `Landmark: ${b.landmark}` : null,
    `${b.location ? 'Live location' : 'Address map'}: ${mapLink}`,
    ``,
    `SERVICE DETAILS`,
    `--------------------------------------------`,
    `Appliance: ${b.serviceType}`,
    b.preferredDate ? `Date: ${b.preferredDate}` : null,
    b.preferredTime ? `Time: ${b.preferredTime}` : null,
    ``,
    `ISSUE DESCRIPTION`,
    `--------------------------------------------`,
    b.issueDescription,
    ``,
    `--------------------------------------------`,
    `Kadapa Appliance Care | +91 63037 15808`,
  ].filter(Boolean).join('\n');
}

const BookingModal = ({ service, services, startAtDetails = false, onClose }) => {
  const [selectedService, setSelectedService] = useState(
    service && typeof service === 'object' ? service : null
  );
  const [step, setStep] = useState(startAtDetails ? 'details' : 'service');
  const [form, setForm] = useState({
    ...EMPTY,
    serviceType: startAtDetails && service && typeof service === 'object' ? service.name : ''
  });
  const [errors, setErrors]     = useState({});
  const [locationStatus, setLocationStatus] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const set  = (field, val) => setForm(p => ({ ...p, [field]: val }));
  const chg  = e => set(e.target.name, e.target.value);
  const requestLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus({ type: 'error', message: 'Live location is not available in this browser. You can continue with your address.' });
      return;
    }

    setLocationLoading(true);
    setLocationStatus({ type: 'loading', message: 'Waiting for location permission…' });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        set('location', `${coords.latitude},${coords.longitude}`);
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
  const handleServiceChange = e => {
    const nextService = services.find(item => String(item.id) === e.target.value);
    setSelectedService(nextService || null);
  };
  const handleBookNow = () => {
    if (!selectedService) return;
    setForm(p => ({ ...p, serviceType: selectedService.name }));
    setStep('details');
  };
  const handleChangeService = () => {
    setStep('service');
    setErrors({});
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                  e.name    = 'Name is required';
    if (!/^[0-9]{10}$/.test(form.mobile))  e.mobile  = 'Enter a valid 10-digit number';
    if (!form.address.trim())              e.address = 'Address is required';
    if (!form.issueDescription.trim())     e.issue   = 'Please describe the issue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const mapAddress = [form.address, form.landmark, form.city, form.pincode].filter(Boolean).join(', ');
    const mapLnk = form.location
      ? `https://www.google.com/maps?q=${encodeURIComponent(form.location)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}`;
    const waURL = `https://wa.me/916303715808?text=${encodeURIComponent(buildWhatsappMsg(form, mapLnk))}`;
    window.open(waURL, '_blank', 'noopener,noreferrer');
    onClose();
  };

  /* ── Main Form ── */
  return (
    <div className="bmodal-backdrop" onClick={onClose}>
      <div className="bmodal-sheet" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bmodal-head">
          <div
            className="bmodal-service-icon"
            style={selectedService
              ? { background: selectedService.bg, color: selectedService.color }
              : { background: '#e5f0fa', color: '#24527a' }}
          >
            {selectedService ? selectedService.icon : <FaTools />}
          </div>
          <div className="bmodal-service-info">
            <h2>{step === 'service' ? 'Choose a service' : 'Add your details'}</h2>
            <p>{step === 'service'
              ? 'Select the appliance or service you need help with.'
              : `${selectedService.name} — your request will be sent through WhatsApp.`}</p>
          </div>
          <button className="bmodal-close" onClick={onClose} aria-label="Close"><FaTimes /></button>
        </div>

        {/* Scrollable body with all fields */}
        <div className="bmodal-body">
          {step === 'service' ? (
            <div className="bm-section bm-service-picker">
              <div className="bm-field">
                <label htmlFor="booking-service">Type of service <span className="req">*</span></label>
                <select
                  id="booking-service"
                  value={selectedService ? String(selectedService.id) : ''}
                  onChange={handleServiceChange}
                >
                  <option value="">Select an appliance or service</option>
                  {services.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              {selectedService && (
                <div className="bm-selected-service">
                  <span
                    className="bm-selected-service-icon"
                    style={{ background: selectedService.bg, color: selectedService.color }}
                  >
                    {selectedService.icon}
                  </span>
                  <span>
                    <strong>{selectedService.name}</strong>
                    <small>{selectedService.desc}</small>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="bm-step-back">
                <button type="button" className="bm-change-service" onClick={handleChangeService}>
                  <FaArrowLeft /> Change service
                </button>
                <span>Service: <strong>{selectedService.name}</strong></span>
              </div>

          {/* ── Section 1: Personal ── */}
          <div className="bm-section">
            <div className="bm-section-title">
              <div className="bm-section-icon" style={{ background:'#e5f0fa', color:'#24527a' }}><FaUser /></div>
              Your Details
            </div>
            <div className="bm-row">
              <div className="bm-field">
                <label>Full Name <span className="req">*</span></label>
                <input name="name" value={form.name} onChange={chg} placeholder="e.g. Ravi Kumar" autoFocus />
                {errors.name && <span className="bm-error">{errors.name}</span>}
              </div>
              <div className="bm-field">
                <label>Mobile Number <span className="req">*</span></label>
                <input name="mobile" value={form.mobile} onChange={chg} placeholder="10-digit number" maxLength={10} inputMode="numeric" />
                {errors.mobile && <span className="bm-error">{errors.mobile}</span>}
              </div>
            </div>
            <div className="bm-field" style={{ marginTop: 12 }}>
              <label>Email <span className="opt">(optional)</span></label>
              <input name="email" type="email" value={form.email} onChange={chg} placeholder="your@email.com" />
            </div>
          </div>

          {/* ── Section 2: Location ── */}
          <div className="bm-section">
            <div className="bm-section-title">
              <div className="bm-section-icon" style={{ background:'#eaf3fa', color:'#376f9d' }}><FaMapMarkerAlt /></div>
              Service Location
            </div>
            <div className="bm-field">
              <label>Complete Address <span className="req">*</span></label>
              <textarea name="address" value={form.address} onChange={chg} placeholder="House No., Street, Area…" rows={2} />
              {errors.address && <span className="bm-error">{errors.address}</span>}
            </div>
            <div className="bm-row" style={{ marginTop: 12 }}>
              <div className="bm-field">
                <label>City <span className="req">*</span></label>
                <input name="city" value={form.city} onChange={chg} />
              </div>
              <div className="bm-field">
                <label>PIN Code <span className="opt">(optional)</span></label>
                <input name="pincode" value={form.pincode} onChange={chg} placeholder="516001" maxLength={6} inputMode="numeric" />
              </div>
            </div>
            <div className="bm-field" style={{ marginTop: 12 }}>
              <label>Landmark <span className="opt">(optional)</span></label>
              <input name="landmark" value={form.landmark} onChange={chg} placeholder="Near ABC School, Opposite XYZ Mall…" />
            </div>
            <div className="bm-location-picker">
              <button
                type="button"
                className="bm-location-button"
                onClick={requestLiveLocation}
                disabled={locationLoading}
              >
                <FaMapMarkerAlt />
                {locationLoading ? 'Requesting location…' : form.location ? 'Refresh live location' : 'Share my live location'}
              </button>
              <span className="bm-location-hint">Optional. Your browser will ask permission; the location link is included with your WhatsApp request.</span>
              {locationStatus && (
                <span className={`bm-location-status ${locationStatus.type}`} role="status" aria-live="polite">
                  {locationStatus.message}
                </span>
              )}
            </div>
          </div>

          {/* ── Section 3: Schedule & Issue ── */}
          <div className="bm-section">
            <div className="bm-section-title">
              <div className="bm-section-icon" style={{ background:'#e5f0fa', color:'#24527a' }}><FaCalendarAlt /></div>
              Schedule & Issue
            </div>
            <div className="bm-row">
              <div className="bm-field">
                <label>Preferred Date <span className="opt">(optional)</span></label>
                <input name="preferredDate" type="date" value={form.preferredDate} onChange={chg} min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="bm-field">
                <label>Preferred Time <span className="opt">(optional)</span></label>
                <div className="bm-slots">
                  {SLOTS.map(slot => {
                    const key     = slot.replace('\n', ' ');
                    const [l1,l2] = slot.split('\n');
                    return (
                      <button
                        key={slot}
                        type="button"
                        className={`bm-slot ${form.preferredTime === key ? 'sel' : ''}`}
                        onClick={() => set('preferredTime', key)}
                      >
                        <div>{l1}</div>
                        {l2 && <div style={{ fontSize: 10, opacity: 0.7 }}>{l2}</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="bm-field" style={{ marginTop: 12 }}>
              <label>
                <FaTools style={{ marginRight: 5, color:'#7c3aed', fontSize:11 }} />
                Describe the Issue <span className="req">*</span>
              </label>
              <textarea
                name="issueDescription"
                value={form.issueDescription}
                onChange={chg}
                placeholder={`What's happening with your ${selectedService.name}? e.g. not cooling, making noise, water leaking…`}
                rows={3}
              />
              {errors.issue && <span className="bm-error">{errors.issue}</span>}
              <span className="bm-hint">More detail helps our technician come fully prepared.</span>
            </div>
          </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bmodal-foot">
          {step === 'service' ? (
            <>
              <button className="bm-cancel" onClick={onClose}>
                <FaTimes size={11} /> Cancel
              </button>
              {selectedService && (
                <button className="bm-submit" onClick={handleBookNow}>
                  Book Now <FaArrowRight size={12} />
                </button>
              )}
            </>
          ) : (
            <>
              <button className="bm-cancel" onClick={handleChangeService}>
                <FaArrowLeft size={11} /> Change service
              </button>
              <a href="tel:+916303715808" style={{ display:'flex', alignItems:'center', gap:5, fontSize:13, color:'#64748b', textDecoration:'none', fontWeight:600 }}>
                <FaPhone size={11} /> +91 63037 15808
              </a>
              <button className="bm-submit" onClick={handleSubmit}>
                <FaWhatsapp size={15} /> Continue to WhatsApp
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
