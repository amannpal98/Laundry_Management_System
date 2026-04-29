import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();
  return (
    <div className={`toast${toast.visible ? ' show' : ''}`}>
      <span>{toast.icon}</span> {toast.msg}
    </div>
  );
}
