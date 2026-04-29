import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDate } from '../context/AppContext';

const STATUS_STEPS = [
  { label: 'Pickup Scheduled',   icon: 'fa-calendar-check' },
  { label: 'Washing in Progress', icon: 'fa-soap' },
  { label: 'Ironing',            icon: 'fa-fire-alt' },
  { label: 'Out for Delivery',   icon: 'fa-truck' },
  { label: 'Delivered',          icon: 'fa-box-open' },
];

const STATUS_BADGE_CLASS = {
  'Pickup Scheduled':   'status-pickup',
  'Washing in Progress':'status-washing',
  'Ironing':            'status-ironing',
  'Out for Delivery':   'status-out-for-delivery',
  'Delivered':          'status-delivered',
};

function getStepIndex(status) {
  return STATUS_STEPS.findIndex(s => s.label === status);
}

export default function OrdersPage() {
  const { orders, navigate } = useApp();
  const [search, setSearch] = useState('');

  const filtered = orders
    .filter(o =>
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
    )
    .slice()
    .reverse();

  return (
    <section className="page active" id="orders">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Track</span>
          <h2>Order Status</h2>
          <p>Real-time tracking of your laundry orders.</p>
        </div>

        <div className="order-lookup">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by Order ID or your name..."
          />
          <button className="btn btn-primary">
            <i className="fas fa-search"></i> Search
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-box-open"></i>
            <h3>No Orders Found</h3>
            <p>You haven't placed any orders yet, or no orders match your search.</p>
            <button className="btn btn-primary" onClick={() => navigate('booking')}>Book a Pickup</button>
          </div>
        ) : (
          <div id="ordersContainer">
            {filtered.map(order => {
              const stepIdx = getStepIndex(order.status);
              const progress = (((stepIdx + 1) / STATUS_STEPS.length) * 100).toFixed(0);
              return (
                <div className="order-card" key={order.id}>
                  <div className="order-card-header">
                    <div>
                      <div className="order-id">{order.id}</div>
                      <div className="order-details-row">
                        <div className="order-detail-item"><i className="fas fa-soap"></i> {order.service}</div>
                        <div className="order-detail-item"><i className="fas fa-user"></i> {order.customer}</div>
                        <div className="order-detail-item"><i className="fas fa-calendar"></i> Pickup: {formatDate(order.pickupDate)}</div>
                        <div className="order-detail-item"><i className="fas fa-truck"></i> Delivery: {formatDate(order.deliveryDate)}</div>
                        <div className="order-detail-item"><i className="fas fa-rupee-sign"></i> ₹{order.total}</div>
                      </div>
                    </div>
                    <div className={`order-status-badge ${STATUS_BADGE_CLASS[order.status] || 'status-pickup'}`}>
                      {order.status}
                    </div>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="progress-label">
                      <span>Order Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                  <div className="order-tracker">
                    <div className="tracker-steps">
                      {STATUS_STEPS.map((step, i) => {
                        let cls = '';
                        if (i < stepIdx) cls = 'done';
                        else if (i === stepIdx) cls = 'done current';
                        return (
                          <div className={`tracker-step ${cls}`} key={step.label}>
                            <div className="tracker-dot"><i className={`fas ${step.icon}`}></i></div>
                            <div className="tracker-label">{step.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
