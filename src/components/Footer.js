import React from 'react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-brand">
          <div className="footer-logo">
            <i className="fas fa-wind"></i> CleanWave
          </div>
          <p>Doorstep laundry & dry cleaning made simple, fast, and affordable.</p>

          <div className="social-links">
            <a href="/" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="/" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="/" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <button onClick={() => navigate('home')}>Home</button>
          <button onClick={() => navigate('services')}>Services</button>
          <button onClick={() => navigate('booking')}>Book Pickup</button>
          <button onClick={() => navigate('orders')}>Track Order</button>
        </div>

        {/* Services */}
        <div className="footer-links">
          <h4>Services</h4>
          <a href="/">Wash & Fold</a>
          <a href="/">Wash & Iron</a>
          <a href="/">Dry Cleaning</a>
          <a href="/">Steam Ironing</a>
        </div>

        {/* Support */}
        <div className="footer-links">
          <h4>Support</h4>
          <button onClick={() => navigate('contact')}>Contact Us</button>
          <button onClick={() => navigate('invoice')}>My Invoice</button>
          <button onClick={() => navigate('login')}>My Account</button>
          <a href="/">FAQ</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 CleanWave Laundry Services. All rights reserved. | Demo Project</p>
      </div>
    </footer>
  );
}