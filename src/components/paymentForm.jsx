import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

function PaymentForm({ businessData, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value && !/^\d+(\.\d{0,2})?$/.test(value)) {
      setError('Please enter a valid amount (e.g., 100.00)');
      return;
    }
    setAmount(value);
    setError('');
  };

  const createOrder = (data, actions) => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid payment amount');
      return Promise.reject(new Error('Invalid amount'));
    }
    return actions.order.create({
      purchase_units: [
        {
          description: `Payment for ${businessData.client_business_name}`,
          amount: {
            currency_code: 'USD',
            value: parseFloat(amount).toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const fee = parseFloat(amount) * 0.029 + 0.30;
      const amountMinusFees = parseFloat(amount) - fee;
      const paymentData = {
        transaction_id: details.id,
        payment_amount: parseFloat(amount),
        amount_minus_fees: parseFloat(amountMinusFees.toFixed(2)),
        date_of_payment: new Date().toISOString(),
      };
      onSuccess(paymentData);
    });
  };

  const onError = (err) => {
    setError('An error occurred during payment. Please try again.');
    console.error(err);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Payment Amount ($)</label>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount (e.g., 100.00)"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  );
}

export default PaymentForm;