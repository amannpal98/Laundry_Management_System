import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ── Utilities ──────────────────────────────────────────────────────────────────

export function generateOrderId() {
  return 'CW-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function getStorage(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}

export function setStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function getPriceInfo(serviceName) {
  const map = {
    'Wash & Fold':   { price: 50,  unit: 'kg' },
    'Wash & Iron':   { price: 30,  unit: 'piece' },
    'Dry Cleaning':  { price: 150, unit: 'piece' },
    'Steam Ironing': { price: 20,  unit: 'piece' },
  };
  return map[serviceName] || { price: 0, unit: '' };
}

export function getStatusFromDate(pickupDateStr) {
  const pickup = new Date(pickupDateStr);
  const now = new Date();
  const diffDays = Math.floor((now - pickup) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'Pickup Scheduled';
  if (diffDays === 0) return 'Washing in Progress';
  if (diffDays === 1) return 'Ironing';
  if (diffDays === 2) return 'Out for Delivery';
  return 'Delivered';
}

// ── Seed demo data ─────────────────────────────────────────────────────────────

function seedDemoData() {
  const existing = getStorage('cw_orders');
  if (existing.length > 0) return;
  const today = new Date().toISOString().split('T')[0];
  const sampleOrders = [
    {
      id: 'CW-DEMO001', customer: 'Priya Sharma', mobile: '9876543210',
      address: '12, Rose Garden Apartments, Bandra West, Mumbai – 400050',
      service: 'Wash & Fold', qty: 5, slot: 'Morning (8am–12pm)',
      instructions: 'Please use fragrance-free detergent.',
      pickupDate: addDays(today, -3), deliveryDate: addDays(today, -1),
      subtotal: 250, tax: 45, total: 295, pricePerUnit: 50,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Delivered',
    },
    {
      id: 'CW-DEMO002', customer: 'Rahul Mehta', mobile: '8765432109',
      address: '7, Sunrise Colony, Koregaon Park, Pune – 411001',
      service: 'Dry Cleaning', qty: 3, slot: 'Afternoon (12pm–4pm)',
      instructions: 'Suit jacket – handle with extra care.',
      pickupDate: addDays(today, -1), deliveryDate: addDays(today, 1),
      subtotal: 450, tax: 81, total: 531, pricePerUnit: 150,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Ironing',
    },
    {
      id: 'CW-DEMO003', customer: 'Ananya Patel', mobile: '7654321098',
      address: '34, Connaught Place, New Delhi – 110001',
      service: 'Wash & Iron', qty: 8, slot: 'Evening (4pm–8pm)',
      instructions: '',
      pickupDate: addDays(today, 1), deliveryDate: addDays(today, 3),
      subtotal: 240, tax: 43, total: 283, pricePerUnit: 30,
      createdAt: new Date().toISOString(),
      status: 'Pickup Scheduled',
    },
  ];
  setStorage('cw_orders', sampleOrders);
}

// ── Context ────────────────────────────────────────────────────────────────────

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [toast, setToast] = useState({ visible: false, msg: '', icon: '✓' });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    seedDemoData();
    setOrders(getStorage('cw_orders'));
  }, []);

  const navigate = useCallback((pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showToast = useCallback((msg, icon = '✓') => {
    setToast({ visible: true, msg, icon });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3200);
  }, []);

  const addOrder = useCallback((order) => {
    const updated = [...getStorage('cw_orders'), order];
    setStorage('cw_orders', updated);
    setOrders(updated);
  }, []);

  return (
    <AppContext.Provider value={{ currentPage, navigate, showToast, toast, orders, addOrder }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
