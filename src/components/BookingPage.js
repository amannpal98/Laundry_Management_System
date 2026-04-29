import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { generateOrderId, getPriceInfo, getStatusFromDate, addDays } from '../context/AppContext';

const initialForm = {
  custName: '',
  custMobile: '',
  custAddress: '',
  bookingService: '',
  custQty: '',
  pickupDate: '',
  pickupSlot: '',
  custInstructions: '',
};

export default function BookingPage() {
  const { addOrder } = useApp();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const svc = sessionStorage.getItem('selectedService');
    if (svc) {
      setForm((f) => ({ ...f, bookingService: svc }));
      sessionStorage.removeItem('selectedService');
    }
  }, []);

  const rules = {
    custName: (v) => v.trim().length >= 2,
    custMobile: (v) => /^[6-9]\d{9}$/.test(v.replace(/\s+/g, '')),
    custAddress: (v) => v.trim().length >= 10,
    bookingService: (v) => v !== '',
    custQty: (v) => parseInt(v) >= 1,
    pickupDate: (v) => v !== '',
    pickupSlot: (v) => v !== '',
  };

  const msgs = {
    custName: 'Please enter your full name.',
    custMobile: 'Enter a valid 10-digit mobile number.',
    custAddress: 'Please enter a complete pickup address.',
    bookingService: 'Please select a service.',
    custQty: 'Enter a valid quantity (minimum 1).',
    pickupDate: 'Please select a pickup date.',
    pickupSlot: 'Please select a time slot.',
  };

  const validate = () => {
    const newErrors = {};
    let valid = true;

    Object.keys(rules).forEach((key) => {
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
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: '' }));
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
      subtotal,
      tax,
      total,
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
                <label>Customer Name</label>
                <input
                  type="text"
                  name="custName"
                  value={form.custName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={errors.custName ? 'error' : ''}
                />
                <span className="error-msg">{errors.custName}</span>
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="custMobile"
                  value={form.custMobile}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className={errors.custMobile ? 'error' : ''}
                />
                <span className="error-msg">{errors.custMobile}</span>
              </div>
            </div>

            <div className="form-group full">
              <label>Pickup Address</label>
              <textarea
                name="custAddress"
                value={form.custAddress}
                onChange={handleChange}
                rows="3"
                className={errors.custAddress ? 'error' : ''}
              />
              <span className="error-msg">{errors.custAddress}</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Service Type</label>
                <select
                  name="bookingService"
                  value={form.bookingService}
                  onChange={handleChange}
                  className={errors.bookingService ? 'error' : ''}
                >
                  <option value="">-- Select Service --</option>
                  <option value="Wash & Fold">Wash & Fold</option>
                  <option value="Wash & Iron">Wash & Iron</option>
                  <option value="Dry Cleaning">Dry Cleaning</option>
                  <option value="Steam Ironing">Steam Ironing</option>
                </select>
                <span className="error-msg">{errors.bookingService}</span>
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="custQty"
                  value={form.custQty}
                  onChange={handleChange}
                  min="1"
                  className={errors.custQty ? 'error' : ''}
                />
                <span className="error-msg">{errors.custQty}</span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Pickup Date</label>
                <input
                  type="date"
                  name="pickupDate"
                  value={form.pickupDate}
                  onChange={handleChange}
                  min={today}
                  className={errors.pickupDate ? 'error' : ''}
                />
                <span className="error-msg">{errors.pickupDate}</span>
              </div>

              <div className="form-group">
                <label>Pickup Slot</label>
                <select
                  name="pickupSlot"
                  value={form.pickupSlot}
                  onChange={handleChange}
                  className={errors.pickupSlot ? 'error' : ''}
                >
                  <option value="">-- Select Slot --</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
                <span className="error-msg">{errors.pickupSlot}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Request Pickup
            </button>
          </form>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay active">
          <div className="modal">
            <h3>Pickup Requested!</h3>
            <p>Order ID: {lastOrderId}</p>
            <button onClick={() => setModalOpen(false)}>Done</button>
          </div>
        </div>
      )}
    </section>
  );
}