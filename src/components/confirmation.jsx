import React from 'react';

function Confirmation({ businessData, paymentData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-green-600">Payment Successful!</h2>
      <p>Thank you, {businessData.contact}, for your payment.</p>
      <p><strong>Business Name:</strong> {businessData.client_business_name}</p>
      <p><strong>Email:</strong> {businessData.client_email}</p>
      <p><strong>Payment Amount:</strong> ${paymentData.payment_amount.toFixed(2)}</p>
      <p><strong>Amount After Fees:</strong> ${paymentData.amount_minus_fees.toFixed(2)}</p>
      <p><strong>Transaction ID:</strong> {paymentData.transaction_id}</p>
      <p><strong>Date of Payment:</strong> {new Date(paymentData.date_of_payment).toLocaleString()}</p>
      <p>A confirmation email has been sent to {businessData.client_email}.</p>
    </div>
  );
}

export default Confirmation;