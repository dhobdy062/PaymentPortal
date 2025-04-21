import React, { useState } from 'react';
import BusinessInfoForm from '../components/BusinessInfoForm';
import PaymentForm from '../components/PaymentForm';
import PostPaymentForm from '../components/PostPaymentForm';
import Confirmation from '../components/Confirmation';

function Home() {
  const [step, setStep] = useState('businessInfo');
  const [businessData, setBusinessData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const handleBusinessInfoSubmit = (data) => {
    setBusinessData(data);
    setStep('payment');
  };

  const handlePaymentSuccess = (data) => {
    setPaymentData(data);
    setStep('postPayment');
  };

  const handlePostPaymentSubmit = () => {
    setStep('confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Portal</h1>
        {step === 'businessInfo' && <BusinessInfoForm onSubmit={handleBusinessInfoSubmit} />}
        {step === 'payment' && <PaymentForm businessData={businessData} onSuccess={handlePaymentSuccess} />}
        {step === 'postPayment' && <PostPaymentForm businessData={businessData} paymentData={paymentData} onSubmit={handlePostPaymentSubmit} />}
        {step === 'confirmation' && <Confirmation businessData={businessData} paymentData={paymentData} />}
      </div>
    </div>
  );
}

export default Home;