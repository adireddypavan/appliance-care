import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import BookingModal from './BookingModal';
import { SERVICES } from './Services';

const Header = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActive]  = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [booking, setBooking]       = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const ids = ['home','services','about','contact'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom >= 120) { setActive(id); break; }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close drawer on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e) => {
      if (!e.target.closest('.header-inner')) setMobileOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [mobileOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const NAV = [
    { label: 'Home',     id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'About',    id: 'about' },
    { label: 'Contact',  id: 'contact' },
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'shadowed' : ''}`}>
        <div className="nav-container header-inner">
          <nav className="nav">

            {/* Logo */}
            <button type="button" className="logo" onClick={() => scrollTo('home')} aria-label="Home">
              <img src="/logo-mark.png" alt="Kadapa Appliance Care" className="logo-img" />
              <div className="logo-text">
                <span className="l-name">Kadapa Appliance Care</span>
                <span className="l-tag">ESTD 2026 · Kadapa</span>
              </div>
            </button>

            {/* Desktop links */}
            <ul className="nav-links desktop-only">
              {NAV.map(l => (
                <li key={l.id}>
                  <button
                    type="button"
                    className={`nav-link-btn ${activeSection === l.id ? 'active' : ''}`}
                    onClick={() => scrollTo(l.id)}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right */}
            <div className="nav-right">
              <a href="tel:+916303715808" className="btn-nav-call desktop-only">
                <FaPhone size={12} /> +91 63037 15808
              </a>
              <button type="button" className="btn-nav-book desktop-only" onClick={() => setBooking(true)}>
                Book Service
              </button>
              <a href="https://wa.me/916303715808" target="_blank" rel="noopener noreferrer" className="btn-nav-wa mobile-only">
                <FaWhatsapp size={15} />
              </a>
              {/* Hamburger */}
              <button
                type="button"
                className={`hamburger mobile-only ${mobileOpen ? 'open' : ''}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                <span /><span /><span />
              </button>
            </div>
          </nav>

          {/* Mobile drawer */}
          {mobileOpen && (
            <div className="mobile-drawer">
              {NAV.map(l => (
                <button
                  key={l.id}
                  type="button"
                  className={`mob-link ${activeSection === l.id ? 'active' : ''}`}
                  onClick={() => scrollTo(l.id)}
                >
                  {l.label}
                </button>
              ))}
              <div className="mob-actions">
                <a href="tel:+916303715808" className="mob-btn mob-btn-call">
                  <FaPhone size={13} /> Call +91 63037 15808
                </a>
                <a href="https://wa.me/916303715808?text=Hello!%20I%20need%20service." target="_blank" rel="noopener noreferrer" className="mob-btn mob-btn-wa">
                  <FaWhatsapp size={14} /> WhatsApp Us
                </a>
                <button type="button" className="mob-btn mob-btn-book" onClick={() => { setBooking(true); setMobileOpen(false); }}>
                  📅 Book a Service
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {booking && <BookingModal service={booking} services={SERVICES} onClose={() => setBooking(null)} />}
    </>
  );
};

export default Header;
