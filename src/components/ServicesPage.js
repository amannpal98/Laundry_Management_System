import React from 'react';
import { useApp } from '../context/AppContext';

const SERVICES = [
  {
    id: 'wash-fold', color: '#38bdf8', icon: 'fa-tshirt', badge: 'Most Popular',
    name: 'Wash & Fold', price: '₹50', unit: '/kg', time: '24 hours',
    desc: 'Perfect for everyday clothes. Machine washed, dried, and neatly folded for easy storage.',
    features: ['Machine wash with premium detergent', 'Tumble dried & folded', 'Fabric softener included'],
  },
  {
    id: 'wash-iron', color: '#34d399', icon: 'fa-shirt', badge: null,
    name: 'Wash & Iron', price: '₹30', unit: '/shirt', time: '36 hours',
    desc: 'Get your clothes washed and professionally ironed for a crisp, office-ready finish.',
    features: ['Hand/machine wash', 'Steam ironing included', 'Hanger packaging'],
  },
  {
    id: 'dry-cleaning', color: '#f472b6', icon: 'fa-wind', badge: null,
    name: 'Dry Cleaning', price: '₹150', unit: '/piece', time: '48 hours',
    desc: 'For delicate, premium fabrics and garments that require special care and expert handling.',
    features: ['Solvent-based cleaning', 'Delicate fabric care', 'Stain treatment included'],
  },
  {
    id: 'steam-iron', color: '#fbbf24', icon: 'fa-fire-alt', badge: null,
    name: 'Steam Ironing', price: '₹20', unit: '/piece', time: '12 hours',
    desc: 'Just need crisp, wrinkle-free clothes? Drop them off for our express steam ironing service.',
    features: ['Professional steam press', 'Crease removal guaranteed', 'Same-day available'],
  },
];

export default function ServicesPage() {
  const { navigate, showToast } = useApp();

  const selectService = (serviceName) => {
    navigate('booking');
    // Store selected service for BookingPage to pick up
    sessionStorage.setItem('selectedService', serviceName);
    showToast(`${serviceName} selected! Fill in your details below.`, '🧺');
  };

  return (
    <section className="page active" id="services">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">What We Offer</span>
          <h2>Our Services</h2>
          <p>Premium laundry solutions for every need, at prices that won't break the bank.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map(svc => (
            <div className="service-card" key={svc.id} data-service={svc.id}>
              <div className="service-icon-wrap" style={{ '--sc': svc.color }}>
                <i className={`fas ${svc.icon}`}></i>
              </div>
              {svc.badge && <div className="service-badge">{svc.badge}</div>}
              <h3>{svc.name}</h3>
              <p>{svc.desc}</p>
              <ul className="service-features">
                {svc.features.map(f => (
                  <li key={f}><i className="fas fa-check"></i> {f}</li>
                ))}
              </ul>
              <div className="service-pricing">
                <div className="price-tag">{svc.price} <span>{svc.unit}</span></div>
                <div className="delivery-time"><i className="fas fa-clock"></i> {svc.time}</div>
              </div>
              <button className="btn btn-service" onClick={() => selectService(svc.name)}>
                Select Service <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
