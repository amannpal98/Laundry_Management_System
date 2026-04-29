import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { generateOrderId, getPriceInfo, getStatusFromDate, addDays, formatDate } from '../context/AppContext';

const initialForm = {
  custName: '', custMobile: '', custAddress: '',
  bookingService: '', custQty: '', pickupDate: '',
  pickupSlot: '', custInstructions: '',
};

export default function BookingPage() {
  const { navigate, showToast, addOrder } = useApp();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');
  const today = new Date().toISOString().split('T')[0];

  // Auto-fill service if navigated from Services or Calculator
  useEffect(() => {
    const svc = sessionStorage.getItem('selectedService');
    if (svc) {
      setForm(f => ({ ...f, bookingService: svc }));
      sessionStorage.removeItem('selectedService');
    }
  }, []);

  const rules = {
    custName:       v => v.trim().length >= 2,
    custMobile:     v => /^[6-9]\d{9}$/.test(v.replace(/\s+/g, '')),
    custAddress:    v => v.trim().length >= 10,
    bookingService: v => v !== '',
    custQty:        v => parseInt(v) >= 1,
    pickupDate:     v => v !== '',
    pickupSlot:     v => v !== '',
  };

  const msgs = {
    custName:       'Please enter your full name.',
    custMobile:     'Enter a valid 10-digit mobile number.',
    custAddress:    'Please enter a complete pickup address.',
    bookingService: 'Please select a service.',
    custQty:        'Enter a valid quantity (minimum 1).',
    pickupDate:     'Please select a pickup date.',
    pickupSlot:     'Please select a time slot.',
  };

  const validate = () => {
    const newErrors = {};
    let valid = true;
    Object.keys(rules).forEach(key => {
      if (!rules[key](form[key] || '')) {
        newErrors[key] = msgs[key];
        valid = false;
      }
    });
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { price } = getPriceInfo(form.bookingService);
    const qty = parseInt(form.custQty);
    const subtotal = price * qty;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    const order = {
      id: generateOrderId(),
      customer: form.custName.trim(),
      mobile: form.custMobile.trim(),
      address: form.custAddress.trim(),
      service: form.bookingService,
      qty,
      slot: form.pickupSlot,
      instructions: form.custInstructions.trim(),
      pickupDate: form.pickupDate,
      deliveryDate: addDays(form.pickupDate, 2),
      subtotal, tax, total,
      pricePerUnit: price,
      createdAt: new Date().toISOString(),
      status: getStatusFromDate(form.pickupDate),
    };

    addOrder(order);
    setLastOrderId(order.id);
    setModalOpen(true);
    setForm(initialForm);
  };

  return (
    <section className="page active" id="booking">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Schedule</span>
          <h2>Book a Pickup</h2>
          <p>Fill in the details below and we'll be at your door at the scheduled time.</p>
        </div>
        <div className="form-container">
          <form className="styled-form" noValidate onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label><i className="fas fa-user"></i> Customer Name</label>
                <input type="text" name="custName" value={form.custName} onChange={handleChange}
                  placeholder="Your full name" className={errors.custName ? 'error' : ''} />
                <span className="error-msg">{errors.custName}</span>
              </div>
              <div className="form-group">
                <label><i className="fas fa-phone"></i> Mobile Number</label>
                <input type="tel" name="custMobile" value={form.custMobile} onChange={handleChange}
                  placeholder="+91 98765 43210" className={errors.custMobile ? 'error' : ''} />
                <span className="error-msg">{errors.custMobile}</span>
              </div>
            </div>

            <div className="form-group full">
              <label><i className="fas fa-map-marker-alt"></i> Pickup Address</label>
              <textarea name="custAddress" value={form.custAddress} onChange={handleChange}
                placeholder="House no., Street, Area, City, PIN" rows="3"
                className={errors.custAddress ? 'error' : ''} />
              <span className="error-msg">{errors.custAddress}</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><i className="fas fa-soap"></i> Service Type</label>
                <select name="bookingService" value={form.bookingService} onChange={handleChange}
                  className={errors.bookingService ? 'error' : ''}>
                  <option value="">-- Select Service --</option>
                  <option value="Wash & Fold">Wash & Fold (₹50/kg)</option>
                  <option value="Wash & Iron">Wash & Iron (₹30/shirt)</option>
                  <option value="Dry Cleaning">Dry Cleaning (₹150/piece)</option>
                  <option value="Steam Ironing">Steam Ironing (₹20/piece)</option>
                </select>
                <span className="error-msg">{errors.bookingService}</span>
              </div>
              <div className="form-group">
                <label><i className="fas fa-layer-group"></i> Quantity / Weight</label>
                <input type="number" name="custQty" value={form.custQty} onChange={handleChange}
                  placeholder="e.g., 3 (pieces or kg)" min="1"
                  className={errors.custQty ? 'error' : ''} />
                <span className="error-msg">{errors.custQty}</span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><i className="fas fa-calendar"></i> Pickup Date</label>
                <input type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange}
                  min={today} className={errors.pickupDate ? 'error' : ''} />
                <span className="error-msg">{errors.pickupDate}</span>
              </div>
              <div className="form-group">
                <label><i className="fas fa-sun"></i> Pickup Time Slot</label>
                <select name="pickupSlot" value={form.pickupSlot} onChange={handleChange}
                  className={errors.pickupSlot ? 'error' : ''}>
                  <option value="">-- Select Slot --</option>
                  <option value="Morning (8am–12pm)">🌅 Morning (8am–12pm)</option>
                  <option value="Afternoon (12pm–4pm)">☀️ Afternoon (12pm–4pm)</option>
                  <option value="Evening (4pm–8pm)">🌆 Evening (4pm–8pm)</option>
                </select>
                <span className="error-msg">{errors.pickupSlot}</span>
              </div>
            </div>

            <div className="form-group full">
              <label><i className="fas fa-comment-alt"></i> Special Instructions (Optional)</label>
              <textarea name="custInstructions" value={form.custInstructions} onChange={handleChange}
                placeholder="Any specific care instructions, stain info, etc." rows="2" />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              <i className="fas fa-calendar-check"></i> Request Pickup
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div className="modal-overlay active">
          <div className="modal">
            <div className="modal-icon success"><i className="fas fa-check-circle"></i></div>
            <h3>Pickup Requested! 🎉</h3>
            <p>Your pickup has been scheduled successfully. <br /><strong>(Demo Only)</strong></p>
            <div className="modal-order-id">Order ID: {lastOrderId}</div>
            <button className="btn btn-primary" onClick={() => setModalOpen(false)}>Done</button>
          </div>
        </div>
      )}
    </section>
  );
}
