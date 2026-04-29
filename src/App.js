import React from 'react';
import './App.css';
import { AppProvider, useApp } from './context/AppContext';

import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import Toast       from './components/Toast';
import HomePage    from './components/HomePage';
import ServicesPage   from './components/ServicesPage';
import BookingPage    from './components/BookingPage';
import CalculatorPage from './components/CalculatorPage';
import OrdersPage     from './components/OrdersPage';
import InvoicePage    from './components/InvoicePage';
import LoginPage      from './components/LoginPage';
import ContactPage    from './components/ContactPage';

function PageRouter() {
  const { currentPage } = useApp();
  return (
    <>
      {currentPage === 'home'       && <HomePage />}
      {currentPage === 'services'   && <ServicesPage />}
      {currentPage === 'booking'    && <BookingPage />}
      {currentPage === 'calculator' && <CalculatorPage />}
      {currentPage === 'orders'     && <OrdersPage />}
      {currentPage === 'invoice'    && <InvoicePage />}
      {currentPage === 'login'      && <LoginPage />}
      {currentPage === 'contact'    && <ContactPage />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Navbar />
      <PageRouter />
      <Footer />
      <Toast />
    </AppProvider>
  );
}
