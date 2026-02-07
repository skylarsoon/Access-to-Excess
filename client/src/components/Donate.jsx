import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function DonationForm({ amount, email, isMonthlyGift }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!email) {
      setErrorMessage("Please enter an email address.");
      return;
    }

    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
        receipt_email: email, // This sends the official Stripe receipt
      },
    });

    if (error) setErrorMessage(error.message);
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-2xl border border-gray-100 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Payment Details</h2>
      
      <PaymentElement className="mb-6" />
      
      <button 
        disabled={isProcessing || !stripe}
        className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 text-lg shadow-lg"
      >
        {isProcessing ? "Processing..." : (isMonthlyGift ? `Donate $${amount} Monthly` : `Donate $${amount}`)}
      </button>

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
          {errorMessage}
        </div>
      )}
    </form>
  );
}