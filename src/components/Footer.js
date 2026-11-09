import React from 'react';
import './Footer.css';
import {
  FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt,
  FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaArrowRight
} from 'react-icons/fa';
import BookingModal from './BookingModal';
import { SERVICES } from './Services';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const SVC_LINKS = SERVICES.slice(0, 7).map(s => s.name);
const QUICK_LINKS = [
  { label: 'Home',     id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'About Us', id: 'about' },
  { label: 'Contact',  id: 'contact' },
];
const SOCIALS = [
  { icon:<FaInstagram/>, href:'https://www.instagram.com/kadapa_appliances_care/', label:'Instagram' },
  { icon:<FaFacebook/>,  href:'https://www.facebook.com', label:'Facebook' },
  { icon:<FaTwitter/>,   href:'https://www.twitter.com',  label:'Twitter' },
  { icon:<FaYoutube/>,   href:'https://www.youtube.com',  label:'YouTube' },
];

const Footer = () => {
  const [booking, setBooking] = React.useState(null);

  return (
    <footer className="footer">
      <div className="footer-bar" />
      <div className="container">
        <div className="footer-main">

          {/* Brand */}
          <div>
            <div className="footer-brand-lockup">
              <img src="/logo.svg" alt="" className="footer-logo-img" />
              <span>
                <strong>Kadapa Appliance Care</strong>
                <small>Home Appliance Services</small>
              </span>
            </div>
            <p className="footer-brand-desc">
              Reliable doorstep appliance repairs and installations for homes across Kadapa.
              Tell us what needs attention and we'll help you find the right service.
            </p>
            <div className="footer-contacts">
              <a href="tel:+916303715808" className="footer-contact-link"><FaPhone /> +91 63037 15808</a>
              <a href="mailto:kadapaappliancecare@gmail.com" className="footer-contact-link"><FaEnvelope /> kadapaappliancecare@gmail.com</a>
              <div className="footer-contact-link"><FaMapMarkerAlt /> Kadapa, Andhra Pradesh</div>
              <div className="footer-coverage-note">Home visits in Kadapa and nearby areas</div>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              {SVC_LINKS.map(s => (
                <li key={s}><button type="button" onClick={() => scrollTo('services')}>{s}</button></li>
              ))}
            </ul>
          </div>

          {/* Quick Links + Socials */}
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links" style={{ marginBottom: 24 }}>
              {QUICK_LINKS.map(l => (
                <li key={l.id}><button type="button" onClick={() => scrollTo(l.id)}>{l.label}</button></li>
              ))}
            </ul>
            <div className="footer-col-title">Follow Us</div>
            <div className="footer-socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <div className="footer-col-title">Quick Service</div>
            <div className="footer-cta-box">
              <span className="footer-cta-eyebrow">We're ready to help</span>
              <h4>Need immediate service?</h4>
              <p>Call us to discuss your appliance and check the next available visit.</p>
              <div className="footer-cta-btns">
                <a href="tel:+916303715808" className="btn-f-call"><FaPhone /> Call Now</a>
                <a href="https://wa.me/916303715808?text=Hello!%20I%20need%20service." target="_blank" rel="noopener noreferrer" className="btn-f-wa">
                  <FaWhatsapp /> WhatsApp
                </a>
                <button type="button" className="btn-f-book" onClick={() => setBooking(true)}>
                  Book a Service <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} <strong>Kadapa Appliance Care</strong>. All rights reserved.</p>
          <a className="footer-back-top" href="#home">Back to top <FaArrowRight /></a>
        </div>
      </div>

      {booking && <BookingModal service={booking} services={SERVICES} onClose={() => setBooking(null)} />}
    </footer>
  );
};

export default Footer;
