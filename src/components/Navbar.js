import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const NAV_LINKS = [
  { page: 'home',       label: 'Home' },
  { page: 'services',   label: 'Services' },
  { page: 'booking',    label: 'Book Pickup' },
  { page: 'calculator', label: 'Calculator' },
  { page: 'orders',     label: 'Orders' },
  { page: 'invoice',    label: 'Invoice' },
  { page: 'login',      label: 'Login' },
  { page: 'contact',    label: 'Contact' },
];

export default function Navbar() {
  const { currentPage, navigate } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (page) => {
    navigate(page);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-brand">
        <i className="fas fa-wind"></i> CleanWave
      </div>
      <button
        className={`nav-toggle${menuOpen ? ' open' : ''}`}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(o => !o)}
      >
        <span></span><span></span><span></span>
      </button>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(({ page, label }) => (
          <li key={page}>
            <a
              href={`#${page}`}
              className={`nav-link${currentPage === page ? ' active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNav(page); }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
