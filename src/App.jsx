import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Home from './pages/Home';
import './styles.css';

const paypalOptions = {
  'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: 'USD',
};

function App() {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <Home />
    </PayPalScriptProvider>
  );
}

export default App;