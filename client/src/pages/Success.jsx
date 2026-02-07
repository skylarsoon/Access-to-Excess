import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const addToMailchimp = async (paymentIntent) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/add-donor-to-mailchimp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: paymentIntent.receipt_email,
        amount: (paymentIntent.amount / 100).toFixed(2), // Convert from cents to dollars
        monthly: paymentIntent.metadata?.recurring === 'true',
        fund: paymentIntent.metadata?.fund || 'General Operations',
        firstName: '', // You might want to collect this during donation
        lastName: ''   // You might want to collect this during donation
      })
    });
    
    if (!response.ok) {
      console.error('Failed to add donor to Mailchimp:', await response.text());
    }
  } catch (error) {
    console.error('Error adding donor to Mailchimp:', error);
  }
};

export default function Success() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const clientSecret = searchParams.get('payment_intent_client_secret');

    if (!clientSecret) {
      setStatus('error');
      return;
    }

    stripePromise.then(async (stripe) => {
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      switch (paymentIntent.status) {
        case 'succeeded':
          // Add donor to Mailchimp
          await addToMailchimp(paymentIntent);
          setStatus('success');
          setMessage('Thank you! Your donation has been processed successfully.');
          break;
        case 'processing':
          setStatus('processing');
          setMessage("Your payment is processing. We'll update you via email.");
          break;
        default:
          setStatus('error');
          setMessage('Something went wrong with the transaction.');
          break;
      }
    });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center">
        
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-500">Confirming your gift...</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Success!</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {message} <br />
              <span className="text-sm font-medium text-gray-500">A receipt has been sent to your email.</span>
            </p>

            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => navigate('/donate')}
                className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Donate More
              </button>
              
              <Link 
                to="/" 
                className="w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all text-center"
              >
                Return Home
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link to="/donate" className="block w-full py-4 bg-gray-900 text-white font-bold rounded-2xl">
              Try Again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}