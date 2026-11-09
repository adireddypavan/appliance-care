import React from 'react';
import './About.css';
import { FaMapMarkerAlt, FaTools, FaPhone, FaArrowRight, FaCalendarCheck, FaWrench } from 'react-icons/fa';

const FEATURES = [
  { icon:<FaMapMarkerAlt/>, color:'#24527a', bg:'#e5f0fa', title:'Kadapa Service Area', desc:'Contact us to check home-visit availability for your location.' },
  { icon:<FaWrench/>,       color:'#4d86b5', bg:'#eaf3fa', title:'Repair & Installation', desc:'Browse appliance repair, maintenance and installation options.' },
  { icon:<FaTools/>,        color:'#24527a', bg:'#e8f1f8', title:'Multiple Services', desc:'Choose from the services listed for common home and office needs.' },
  { icon:<FaCalendarCheck/>,color:'#376f9d', bg:'#e5f0fa', title:'Simple Booking', desc:'Select a service, share your details and contact us through WhatsApp.' },
  { icon:<FaPhone/>,        color:'#24527a', bg:'#eaf3fa', title:'Direct Contact', desc:'Call or message to discuss your appliance and service needs.' },
  { icon:<FaTools/>,        color:'#4d86b5', bg:'#e8f1f8', title:'Service Options', desc:'AC, refrigerator, washing machine, purifier and other services.' },
];

const About = () => (
  <section className="about section" id="about">
    <div className="container">
      <div className="about-grid">
        {/* Left */}
        <div className="about-copy reveal-left">
          <div className="eyebrow">About Us</div>
          <h2 className="section-heading">Local Appliance Service in <em>Kadapa</em></h2>

          <p>
            <strong>Kadapa Appliance Care</strong> helps customers find appliance repair
            and home service options in Kadapa, Andhra Pradesh. Browse services for ACs,
            refrigerators, washing machines, microwaves, water purifiers and more.
          </p>
          <p>
            Use the booking form to choose a service and send your request through
            WhatsApp. Home-visit availability and appointment timing can be confirmed
            directly for your location.
          </p>

          <div className="about-kpis">
            {[
              { num: '10', unit: '', label: 'Listed service categories' },
              { num: '3', unit: '', label: 'Ways to contact us' },
              { num: 'Local', unit: '', label: 'Kadapa service area' },
            ].map(k => (
              <div className="kpi" key={k.label}>
                <div className="kpi-num">{k.num}<span>{k.unit}</span></div>
                <div className="kpi-label">{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="about-features reveal-right">
          {FEATURES.map((f, i) => (
            <div className={`feat-card reveal d${i + 1}`} key={f.title}>
              <div className="feat-icon" style={{ background: f.bg, color: f.color }}>{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="coverage reveal">
        <div className="coverage-copy">
          <div className="coverage-eyebrow">Where we work</div>
          <h3>Our Service Coverage Area</h3>
          <p>We serve Kadapa and may cover nearby areas. Contact us to confirm availability for your address.</p>
          <a href="tel:+916303715808" className="coverage-link">
            Check if we reach your area <FaArrowRight />
          </a>
        </div>
        <div className="coverage-visual" aria-label="Kadapa service area">
          <div className="coverage-ring coverage-ring-outer" />
          <div className="coverage-ring coverage-ring-inner" />
          <div className="coverage-pin"><FaMapMarkerAlt /></div>
          <span className="coverage-city">Kadapa</span>
          <span className="coverage-radius">Kadapa &amp; nearby areas</span>
          <div className="coverage-note">
            <FaPhone />
            <span>Not sure? Call us to confirm your address.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
