import React from 'react';
import './ContactSection.css';
import {
  FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt,
  FaClock, FaInstagram, FaCheck
} from 'react-icons/fa';

const CARDS = [
  {
    icon:<FaPhone/>, color:'#24527a', bg:'#e5f0fa',
    title:'Call Us', href:'tel:+916303715808',
    val:'+91 63037 15808', sub:'Call to discuss service availability',
  },
  {
    icon:<FaWhatsapp/>, color:'#25d366', bg:'#ecfdf5',
    title:'WhatsApp', href:'https://wa.me/916303715808?text=Hello!%20I%20need%20service.',
    val:'Chat with us', sub:'Ask about services and appointments', target:'_blank',
  },
  {
    icon:<FaEnvelope/>, color:'#376f9d', bg:'#eaf3fa',
    title:'Email', href:'mailto:kadapaappliancecare@gmail.com',
    val:'kadapaappliancecare@gmail.com', sub:'For queries & PDF receipts',
  },
  {
    icon:<FaInstagram/>, color:'#4d86b5', bg:'#e8f1f8',
    title:'Instagram', href:'https://www.instagram.com/kadapa_appliances_care/',
    val:'@kadapa_appliances_care', sub:'Follow for tips & updates', target:'_blank',
  },
  {
    icon:<FaMapMarkerAlt/>, color:'#24527a', bg:'#e5f0fa',
    title:'Location', href:null,
    val:'Kadapa, Andhra Pradesh', sub:'Serving within 25 km radius',
  },
];

const ContactSection = () => (
  <section className="contact section" id="contact">
    <div className="container">
      <div className="reveal">
        <div className="eyebrow">Get In Touch</div>
        <h2 className="section-heading">We're Here to <em>Help</em></h2>
        <p className="section-sub">
          Contact Kadapa Appliance Care to discuss your appliance and check service availability in your area.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left: contact cards + hours */}
        <div className="contact-cards reveal-left">
          {CARDS.map(c => {
            const Inner = (
              <>
                <div className="ccard-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
                <div className="ccard-body">
                  <h4>{c.title}</h4>
                  <div className="val">{c.val}</div>
                  <div className="sub">{c.sub}</div>
                </div>
              </>
            );
            return c.href ? (
              <a key={c.title} href={c.href} className="ccard" target={c.target || '_self'} rel="noopener noreferrer">
                {Inner}
              </a>
            ) : (
              <div key={c.title} className="ccard">{Inner}</div>
            );
          })}

          {/* Working hours */}
          <div className="ccard" style={{ alignItems: 'flex-start' }}>
            <div className="ccard-icon" style={{ background: '#eaf3fa', color: '#376f9d', marginTop: 2 }}><FaClock /></div>
            <div className="ccard-body">
              <h4>Working Hours</h4>
              <div className="hours">
                <div className="hour-row"><span>Mon – Sat</span><span>8:00 AM – 8:00 PM</span></div>
                <div className="hour-row"><span>Sunday</span><span>9:00 AM – 6:00 PM</span></div>
                <div className="hour-row emg"><span>Emergency</span><span>24 / 7 Available</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: action card */}
        <div className="contact-action reveal-right">
          <h3>Need Appliance Repair in Kadapa?</h3>
          <p>Call or WhatsApp to discuss the issue, service options and appointment availability.</p>

          <div className="action-btns">
            <a href="tel:+916303715808" className="btn-contact-call">
              <FaPhone /> Call +91 63037 15808
            </a>
            <a
              href="https://wa.me/916303715808?text=Hello!%20I%20need%20urgent%20appliance%20service."
              target="_blank" rel="noopener noreferrer"
              className="btn-contact-wa"
            >
              <FaWhatsapp /> WhatsApp Now
            </a>
          </div>

          <ul className="promise-list">
            {[
              'Choose from the listed appliance services',
              'Discuss your appliance issue before booking',
              'Confirm appointment timing directly',
              'Ask whether home visits cover your address',
              'Send your service request through WhatsApp',
              'Call for service and booking questions',
            ].map(item => (
              <li key={item}>
                <span className="pdot"><FaCheck /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
