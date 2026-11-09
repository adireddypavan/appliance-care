import React, { useState } from 'react';
import './Hero.css';
import {
  FaPhone, FaMapMarkerAlt, FaCheckCircle, FaArrowRight
} from 'react-icons/fa';
import BookingModal from './BookingModal';
import { SERVICES } from './Services';

const QUICK = SERVICES.slice(0, 4);
const STATS = [
  { value: '10', label: 'Listed service categories' },
  { value: '3', label: 'Ways to contact us' },
  { value: 'Local', label: 'Kadapa service area' },
  { value: 'Direct', label: 'WhatsApp booking' }
];

const Hero = () => {
  const [booking, setBooking] = useState(null);

  return (
    <section className="hero" id="home">
      <div className="hero-main container">
        <div className="hero-left">
          <h1 className="hero-h1">
            Appliance Repair<br />
            <em>Services in Kadapa</em>
          </h1>

          <p className="hero-sub">
            Find local help for AC service, refrigerator repair, washing machine
            service, microwave repair and other home appliance needs in Kadapa,
            Andhra Pradesh. Contact us to confirm availability for your area.
          </p>

          <div className="hero-ctas">
            <button className="btn btn-gold btn-lg" onClick={() => setBooking(true)}>
              Book a service <FaArrowRight size={13} />
            </button>
            <a href="tel:+916303715808" className="btn btn-outline btn-lg">
              <FaPhone size={13} /> Need help now? Call us
            </a>
          </div>

          <div className="hero-assurance">
            <span><FaCheckCircle /> Doorstep repairs</span>
            <span><FaCheckCircle /> Upfront communication</span>
            <span><FaMapMarkerAlt /> Kadapa &amp; nearby areas</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Kadapa Appliance Care service information">
          <div className="hero-visual-glow" />
          <div className="hero-stats">
            {STATS.map(stat => (
              <div className="hero-stat" key={stat.label}>
                <div className="hero-stat-number">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-quick">
        <div className="container hero-quick-inner">
          <span className="hero-quick-label">Popular services</span>
          <div className="hero-chips">
            {QUICK.map(svc => (
              <button
                key={svc.id}
                className="hero-chip"
                onClick={() => setBooking(svc)}
              >
                <span className="hero-chip-icon">{svc.icon}</span>
                {svc.name}
                <FaArrowRight className="hero-chip-arrow" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {booking && <BookingModal service={booking} services={SERVICES} onClose={() => setBooking(null)} />}
    </section>
  );
};

export default Hero;
