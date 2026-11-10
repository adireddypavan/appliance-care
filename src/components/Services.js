import React, { useState, useEffect, useRef } from 'react';
import './Services.css';
import BookingModal from './BookingModal';
import {
  FaSnowflake, FaFan, FaUtensils, FaTshirt,
  FaTint, FaFire, FaTruckMoving, FaWind,
  FaTools, FaWhatsapp, FaArrowRight, FaPhone, FaMicrochip
} from 'react-icons/fa';

export const SERVICES = [
  { id:1,  name:'AC Service & Repair',     icon:<FaSnowflake/>, color:'#c94b18', bg:'#fff0e6', desc:'AC service in Kadapa, including repair, installation, deep cleaning and gas refilling.', features:['Gas Refilling','Deep Cleaning','Installation'], bookingOptions:['Repair','Installation','Deep cleaning','Gas refilling','Maintenance'] },
  { id:2,  name:'Refrigerator Repair',     icon:<FaFan/>,       color:'#246b68', bg:'#e4f2ee', desc:'Fridge and refrigerator repair for cooling issues, gas leaks and compressor problems.', features:['Cooling Issues','Gas Leak Fix','Compressor Repair'], bookingOptions:['Repair','Installation','Cooling issue','Gas leak','Compressor repair','Maintenance'] },
  { id:4,  name:'Washing Machine',         icon:<FaTshirt/>,    color:'#246b68', bg:'#e4f2ee', desc:'Washing machine repair, maintenance and installation for common machine types.', features:['Drum Issues','Water Drainage','Motor Repair'], bookingOptions:['Repair','Installation','Drum issue','Drainage issue','Motor repair','Maintenance'] },
  { id:3,  name:'Microwave Oven Repair',   icon:<FaUtensils/>,  color:'#c94b18', bg:'#fff0e6', desc:'Microwave oven repair and maintenance for heating and control-panel issues.', features:['Heating Issues','Control Panel','Magnetron Repair'], bookingOptions:['Repair','Installation','Heating issue','Control panel repair','Maintenance'] },
  { id:7,  name:'Chimney Service',         icon:<FaWind/>,      color:'#246b68', bg:'#e4f2ee', desc:'Kitchen chimney cleaning, repair and installation services.', features:['Deep Cleaning','Motor Repair','Installation'], bookingOptions:['Repair','Installation','Deep cleaning','Motor repair','Maintenance'] },
  { id:11, name:'PCB Board Repair',        icon:<FaMicrochip/>, color:'#c94b18', bg:'#fff0e6', desc:'PCB board diagnosis and repair for ACs, refrigerators, washing machines, microwave ovens and chimneys. Select the appliance when booking.', features:['AC','Refrigerator','Washing Machine','Microwave Oven','Chimney'], pcbAppliances:['AC','Refrigerator','Washing Machine','Microwave Oven','Chimney'], bookingOptions:['PCB diagnosis and repair'] },
  { id:5,  name:'Water Purifier',          icon:<FaTint/>,      color:'#246b68', bg:'#e4f2ee', desc:'RO and water purifier service, filter replacement and installation.', features:['Filter Change','Installation','AMC Available'], bookingOptions:['Repair','Installation','Filter replacement','RO service','AMC / maintenance'] },
  { id:6,  name:'Geyser Repair',           icon:<FaFire/>,      color:'#c94b18', bg:'#fff0e6', desc:'Electric and gas geyser repair, maintenance and installation.', features:['Element Change','Thermostat Fix','Installation'], bookingOptions:['Repair','Installation','Heating element replacement','Thermostat repair','Maintenance'] },
  { id:8,  name:'Movers & Packers',       icon:<FaTruckMoving/>,color:'#246b68',bg:'#e4f2ee', desc:'Home and office relocation, packing, transportation and unpacking.', features:['Packing','Transportation','Unpacking'], bookingOptions:['Packing','Transportation','Unpacking','Full relocation'] },
  { id:9,  name:'Furniture Assembly',      icon:<FaTools/>,     color:'#c94b18', bg:'#fff0e6', desc:'Furniture assembly, repair and maintenance for home and office.', features:['Assembly','Repair','Maintenance'], bookingOptions:['Assembly','Repair','Maintenance'] },
];

/* ── Service card ── */
const ServiceCard = ({ service, index, onBook }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="service-card reveal"
      style={{ transitionDelay: `${(index % 4) * 70}ms` }}
      onClick={() => onBook(service, true)}
    >
      <div className="scard-num">{String(index + 1).padStart(2, '0')}</div>
      <div className="scard-top">
        <div className="scard-icon" style={{ background: service.bg, color: service.color }}>
          {service.icon}
        </div>
        <div className="scard-arrow"><FaArrowRight /></div>
      </div>
      <h3 className="scard-name">{service.name}</h3>
      <p className="scard-desc">{service.desc}</p>
      <ul className="scard-features">
        {service.features.map(f => (
          <li key={f}>
            <span className="feat-dot" style={{ background: service.color }} />{f}
          </li>
        ))}
      </ul>
      <button className="scard-btn" onClick={e => { e.stopPropagation(); onBook(service, true); }}>
        Book Now <FaArrowRight size={11} />
      </button>
    </div>
  );
};

/* ── Main section ── */
const Services = () => {
  const [selected, setSelected] = useState(null);
  const [bookDirectly, setBookDirectly] = useState(false);

  const openBooking = (service, direct = false) => {
    setSelected(service);
    setBookDirectly(direct);
  };

  return (
    <>
      {/* ── Services ── */}
      <section className="services section" id="services">
        <div className="container">
          <div className="services-head">
            <div className="reveal">
              <div className="eyebrow">What We Do</div>
              <h2 className="section-heading">Appliance Repair &amp; Home Services in <em>Kadapa</em></h2>
              <p className="section-sub">
                Explore AC service in Kadapa, fridge and refrigerator repair, washing machine
                service, microwave oven repair, chimney cleaning and appliance PCB board repair,
                along with RO water purifier maintenance, geyser repair, computer support and
                other listed services. Select a service to book and contact us to confirm
                appointment and home-visit availability for your address.
              </p>
            </div>
            <a
              href="https://wa.me/916303715808?text=Hello!%20I%20need%20service."
              target="_blank" rel="noopener noreferrer"
              className="btn btn-outline reveal d2"
            >
              <FaWhatsapp size={13} /> Chat with Us
            </a>
          </div>

          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} index={i} onBook={openBooking} />
            ))}
          </div>

          <div className="svc-cta reveal">
            <div className="svc-cta-text">
              <h3>Can't find your appliance?</h3>
              <p>Choose AC, refrigerator, washing machine, microwave oven, chimney or PCB board repair, or tell us what else needs fixing.</p>
            </div>
            <div className="svc-cta-actions">
              <a href="tel:+916303715808" className="btn btn-white">
                <FaPhone size={12} /> Call Now
              </a>
              <a
                href="https://wa.me/916303715808?text=Hello!%20I%20have%20a%20custom%20service%20requirement."
                target="_blank" rel="noopener noreferrer"
                className="btn btn-gold"
              >
                <FaWhatsapp size={13} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {selected && (
        <BookingModal
          service={selected}
          services={SERVICES}
          startAtDetails={bookDirectly}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
};

export default Services;
