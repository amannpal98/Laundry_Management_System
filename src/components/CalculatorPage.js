import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const SERVICES_CALC = [
  { value: 'Wash & Fold',   label: 'Wash & Fold – ₹50/kg',       price: 50,  unit: 'kg' },
  { value: 'Wash & Iron',   label: 'Wash & Iron – ₹30/shirt',     price: 30,  unit: 'piece' },
  { value: 'Dry Cleaning',  label: 'Dry Cleaning – ₹150/piece',   price: 150, unit: 'piece' },
  { value: 'Steam Ironing', label: 'Steam Ironing – ₹20/piece',   price: 20,  unit: 'piece' },
];

export default function CalculatorPage() {
  const { navigate, showToast } = useApp();
  const [selectedService, setSelectedService] = useState('');
  const [qty, setQty] = useState('');
  const [result, setResult] = useState(null);

  const getSvcData = (val) => SERVICES_CALC.find(s => s.value === val);

  const calculatePrice = () => {
    const svc = getSvcData(selectedService);
    const q = parseFloat(qty) || 0;
    if (!svc || q <= 0) { setResult(null); return; }

    const subtotal = svc.price * q;
    const taxAmt = Math.round(subtotal * 0.18);
    const total = subtotal + taxAmt;
    setResult({ svc, q, subtotal, taxAmt, total });
  };

  const bookFromCalc = () => {
    if (!selectedService) { showToast('Please select a service first.', '⚠️'); return; }
    sessionStorage.setItem('selectedService', selectedService);
    navigate('booking');
    showToast(`${selectedService} selected! Fill in your details below.`, '🧺');
  };

  const unitLabel = getSvcData(selectedService)?.unit || 'piece';

  return (
    <section className="page active" id="calculator">
      <div className="section-container narrow">
        <div className="section-header">
          <span className="section-tag">Pricing</span>
          <h2>Price Calculator</h2>
          <p>Estimate your laundry cost before booking.</p>
        </div>
        <div className="calculator-card">
          <div className="calc-body">
            <div className="form-group">
              <label><i className="fas fa-soap"></i> Select Service</label>
              <select value={selectedService} onChange={e => { setSelectedService(e.target.value); setResult(null); }}>
                <option value="">-- Choose a Service --</option>
                {SERVICES_CALC.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label><i className="fas fa-weight-hanging"></i> Quantity <span>({unitLabel}s)</span></label>
              <input type="number" value={qty} onChange={e => { setQty(e.target.value); setResult(null); }}
                placeholder="Enter quantity" min="1" />
            </div>
            <button className="btn btn-primary btn-full" onClick={calculatePrice}>
              <i className="fas fa-calculator"></i> Calculate Price
            </button>
          </div>

          <div className="calc-result" id="calcResult">
            <div className="result-row"><span>Service</span><strong>{result ? result.svc.value : '—'}</strong></div>
            <div className="result-row"><span>Price per unit</span><strong>{result ? `₹${result.svc.price} / ${result.svc.unit}` : '—'}</strong></div>
            <div className="result-row"><span>Quantity</span><strong>{result ? `${result.q} ${result.svc.unit}${result.q > 1 ? 's' : ''}` : '—'}</strong></div>
            <div className="result-divider"></div>
            <div className="result-row subtotal"><span>Subtotal</span><strong>{result ? `₹${result.subtotal.toFixed(2)}` : '—'}</strong></div>
            <div className="result-row"><span>GST (18%)</span><strong>{result ? `₹${result.taxAmt.toFixed(2)}` : '—'}</strong></div>
            <div className="result-divider"></div>
            <div className="result-row total"><span>Total</span><strong>{result ? `₹${result.total.toFixed(2)}` : '—'}</strong></div>
            <button className="btn btn-primary btn-full" style={{ marginTop: '1.5rem' }} onClick={bookFromCalc}>
              <i className="fas fa-calendar-check"></i> Book This Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
