import React from 'react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { navigate } = useApp();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo"><i className="fas fa-wind"></i> CleanWave</div>
          <p>Doorstep laundry & dry cleaning made simple, fast, and affordable.</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a onClick={() => navigate('home')}>Home</a>
          <a onClick={() => navigate('services')}>Services</a>
          <a onClick={() => navigate('booking')}>Book Pickup</a>
          <a onClick={() => navigate('orders')}>Track Order</a>
        </div>
        <div className="footer-links">
          <h4>Services</h4>
          <a href="#">Wash & Fold</a>
          <a href="#">Wash & Iron</a>
          <a href="#">Dry Cleaning</a>
          <a href="#">Steam Ironing</a>
        </div>
        <div className="footer-links">
          <h4>Support</h4>
          <a onClick={() => navigate('contact')}>Contact Us</a>
          <a onClick={() => navigate('invoice')}>My Invoice</a>
          <a onClick={() => navigate('login')}>My Account</a>
          <a href="#">FAQ</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 CleanWave Laundry Services. All rights reserved. | Demo Project</p>
      </div>
    </footer>
  );
}
