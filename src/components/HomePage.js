import React from 'react';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { navigate } = useApp();

  return (
    <section className="page active" id="home">
      {/* Hero */}
      <div className="hero">
        <div className="hero-bubbles">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div className="hero-content">
          <span className="hero-badge"><i className="fas fa-star"></i> #1 Laundry Service</span>
          <h1 className="hero-title">Doorstep Laundry &<br />Dry Cleaning <em>Made Easy</em></h1>
          <p className="hero-sub">We pick up, clean, and deliver your clothes—fresh and on time, every time.</p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => navigate('booking')}>
              <i className="fas fa-calendar-check"></i> Book Pickup Now
            </button>
            <button className="btn btn-outline" onClick={() => navigate('services')}>
              Our Services <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="hero-highlights">
            <div className="highlight"><i className="fas fa-check-circle"></i> Free Pickup & Delivery</div>
            <div className="highlight"><i className="fas fa-check-circle"></i> Fast Washing & Dry Cleaning</div>
            <div className="highlight"><i className="fas fa-check-circle"></i> Affordable Pricing</div>
            <div className="highlight"><i className="fas fa-check-circle"></i> Real-Time Order Tracking</div>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-card floating">
            <i className="fas fa-tshirt"></i>
            <div><strong>500+</strong><span>Happy Customers</span></div>
          </div>
          <div className="washing-machine">
            <div className="machine-body">
              <div className="machine-door">
                <div className="machine-drum">
                  <i className="fas fa-sync-alt spinning"></i>
                </div>
              </div>
              <div className="machine-controls">
                <span></span><span></span>
              </div>
            </div>
          </div>
          <div className="hero-card floating delay">
            <i className="fas fa-truck"></i>
            <div><strong>24hr</strong><span>Delivery</span></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat"><strong>10,000+</strong><span>Orders Delivered</span></div>
        <div className="stat"><strong>500+</strong><span>Happy Customers</span></div>
        <div className="stat"><strong>4.9★</strong><span>Average Rating</span></div>
        <div className="stat"><strong>24hr</strong><span>Turnaround Time</span></div>
      </div>

      {/* How It Works */}
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Simple Process</span>
          <h2>How It Works</h2>
          <p>Four easy steps to fresh, clean clothes delivered to your door.</p>
        </div>
        <div className="steps-grid">
          {[
            { color: '#38bdf8', icon: 'fa-mobile-alt', num: '01', title: 'Book Online', desc: 'Schedule a pickup in under 2 minutes using our easy booking form.' },
            { color: '#34d399', icon: 'fa-truck',      num: '02', title: 'Free Pickup', desc: 'Our agent picks up your laundry from your doorstep at the scheduled time.' },
            { color: '#fbbf24', icon: 'fa-soap',       num: '03', title: 'Expert Cleaning', desc: 'Professional washing, dry cleaning, and ironing using premium products.' },
            { color: '#f472b6', icon: 'fa-box-open',   num: '04', title: 'Delivered Fresh', desc: 'Your clothes are delivered back fresh, clean, and neatly folded/ironed.' },
          ].map(step => (
            <div className="step-card" key={step.num}>
              <div className="step-icon" style={{ '--c': step.color }}><i className={`fas ${step.icon}`}></i></div>
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section">
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2>What Our Customers Say</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"CleanWave saved me so much time! My clothes come back perfectly pressed and smelling wonderful."</p>
            <div className="reviewer"><div className="avatar">P</div><div><strong>Priya Sharma</strong><span>Mumbai</span></div></div>
          </div>
          <div className="testimonial-card featured">
            <div className="stars">★★★★★</div>
            <p>"Best laundry service I've ever used. The dry cleaning is top-notch and the pricing is very reasonable."</p>
            <div className="reviewer"><div className="avatar">R</div><div><strong>Rahul Mehta</strong><span>Pune</span></div></div>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"Super fast delivery and really affordable. I've been a customer for 6 months now and I'm very happy!"</p>
            <div className="reviewer"><div className="avatar">A</div><div><strong>Ananya Patel</strong><span>Delhi</span></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
