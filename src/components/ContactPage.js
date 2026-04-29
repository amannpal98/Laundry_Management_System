import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ContactPage() {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Message sent! We'll get back to you shortly.", '📩');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="page active" id="contact">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Get in Touch</span>
          <h2>Contact Us</h2>
          <p>Have questions? We'd love to hear from you.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            {[
              { icon: 'fa-map-marker-alt', title: 'Our Office', lines: ['42, Matiyari, Chinhat,', 'Lucknow – 226028'] },
              { icon: 'fa-phone-alt',      title: 'Phone',      lines: ['+91 98765 00000', '+91 98765 00001'] },
              { icon: 'fa-envelope',       title: 'Email',      lines: ['support@cleanwave.in', 'info@cleanwave.in'] },
              { icon: 'fa-clock',          title: 'Working Hours', lines: ['Mon – Sat: 8am – 8pm', 'Sunday: 9am – 6pm'] },
            ].map(item => (
              <div className="contact-item" key={item.title}>
                <div className="contact-icon"><i className={`fas ${item.icon}`}></i></div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.lines[0]}<br />{item.lines[1]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form-wrap">
            <form className="styled-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@email.com" required />
                </div>
              </div>
              <div className="form-group full">
                <label>Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help you?" required />
              </div>
              <div className="form-group full">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows="5" placeholder="Write your message here..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
