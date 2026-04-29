import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDate, getPriceInfo } from '../context/AppContext';

export default function InvoicePage() {
  const { orders, showToast } = useApp();
  const [selectedId, setSelectedId] = useState('');

  const sorted = [...orders].reverse();
  const order = sorted.find(o => o.id === selectedId);

  const downloadInvoice = () => {
    showToast('Opening print dialog for PDF save...', '📄');
    setTimeout(() => window.print(), 500);
  };

  return (
    <section className="page active" id="invoice">
      <div className="section-container narrow">
        <div className="section-header">
          <span className="section-tag">Billing</span>
          <h2>Invoice</h2>
          <p>View and download your order invoice.</p>
        </div>

        <div className="invoice-select">
          <label>Select Order</label>
          <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
            <option value="">-- Choose an Order --</option>
            {sorted.map(o => (
              <option key={o.id} value={o.id}>
                {o.id} – {o.customer} ({formatDate(o.pickupDate)})
              </option>
            ))}
          </select>
        </div>

        {order && (
          <div className="invoice-wrapper">
            <div className="invoice-paper" id="invoicePaper">
              <div className="invoice-header">
                <div className="invoice-brand">
                  <i className="fas fa-wind"></i>
                  <div>
                    <h2>CleanWave</h2>
                    <span>Laundry Services</span>
                  </div>
                </div>
                <div className="invoice-meta">
                  <div className="invoice-title">INVOICE</div>
                  <table>
                    <tbody>
                      <tr><td>Invoice #</td><td>{order.id}</td></tr>
                      <tr><td>Date</td><td>{formatDate(order.pickupDate)}</td></tr>
                      <tr><td>Due Date</td><td>{formatDate(order.deliveryDate)}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="invoice-parties">
                <div>
                  <label>From</label>
                  <strong>CleanWave Laundry Services</strong>
                  <p>Mumbai, Maharashtra 400001<br />support@cleanwave.in<br />+91 98765 00000</p>
                </div>
                <div>
                  <label>Bill To</label>
                  <strong>{order.customer}</strong>
                  <p>{order.address || '—'}</p>
                </div>
              </div>

              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Qty / Unit</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>{order.service}</td>
                    <td>{order.qty} {order.service === 'Wash & Fold' ? 'kg' : 'piece'}(s)</td>
                    <td>₹{getPriceInfo(order.service).price}</td>
                    <td>₹{order.subtotal}</td>
                  </tr>
                </tbody>
              </table>

              <div className="invoice-totals">
                <div className="inv-row"><span>Subtotal</span><strong>₹{order.subtotal}</strong></div>
                <div className="inv-row"><span>Pickup & Delivery</span><strong>FREE</strong></div>
                <div className="inv-row"><span>GST (18%)</span><strong>₹{order.tax}</strong></div>
                <div className="inv-row total"><span>Total Amount</span><strong>₹{order.total}</strong></div>
              </div>

              <div className="invoice-footer">
                <p>Thank you for choosing CleanWave! 💧 We hope your clothes smell amazing.</p>
                <p className="demo-note">* This is a demo invoice for UI simulation purposes only.</p>
              </div>
            </div>

            <button className="btn btn-primary" onClick={downloadInvoice} style={{ marginTop: '1.5rem' }}>
              <i className="fas fa-file-pdf"></i> Download Invoice (PDF Simulation)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
