import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';

const addToMailchimp = async (email, amount, isMonthly, fund) => {
  if (!email) return;
  
  try {
    const response = await fetch( '/api/add-donor-to-mailchimp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        amount: amount,
        monthly: isMonthly,
        fund: fund,
        firstName: '',
        lastName: ''
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
    const sessionId = searchParams.get('session_id');
    const cancel = searchParams.get('cancel');

    if (cancel) {
      setStatus('error');
      setMessage('Payment was cancelled.');
      return;
    }

    if (sessionId) {
      setStatus('success');
      setMessage('Thank you! Your donation has been processed successfully.');
    } else {
      setStatus('error');
      setMessage('Something went wrong with the transaction.');
    }
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
              
              <a 
                href="https://billing.stripe.com/p/login/cNi28r9wb0YW1Y51MngrS00" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 text-sm text-gray-500 underline hover:text-gray-700 text-center"
              >
                Manage Subscription
              </a>
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