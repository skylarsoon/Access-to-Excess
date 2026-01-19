import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonationForm from '../components/Donate';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Donate() {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(25);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const getPaymentIntent = async (currentAmount, currentEmail) => {
    if (!isValidEmail(currentEmail) || !currentAmount) return;
    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/create-donation-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: currentAmount, email: currentEmail }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="max-w-xl w-full text-center mb-6">
        <img 
          src="/public/about-image.jpg" 
          alt="Nonprofit Mission" 
          className="w-full h-40 object-cover rounded-2xl shadow-sm mb-4"
        />
        <h1 className="text-2xl font-black text-gray-900">Access to Excess</h1>
        <p>Donate to support our mission to feed people</p>
      </div>

      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-50">
          <div className="flex items-center mb-4">
            <span className="bg-green-100 text-green-700 w-7 h-7 rounded-full flex items-center justify-center font-bold mr-3 text-sm">1</span>
            <h2 className="text-md font-bold text-gray-800 uppercase tracking-wide">Contact Information</h2>
          </div>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => getPaymentIntent(amount, email)} 
            className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-gray-800"
            placeholder="Email Address"
          />
        </div>

        <div className="p-5 border-b border-gray-50 bg-gray-50/20">
          <div className="flex items-center mb-4">
            <span className="bg-green-100 text-green-700 w-7 h-7 rounded-full flex items-center justify-center font-bold mr-3 text-sm">2</span>
            <h2 className="text-md font-bold text-gray-800 uppercase tracking-wide">Donation Amount</h2>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => getPaymentIntent(amount, email)}
              className="w-full p-3 pl-8 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-500 text-lg font-bold text-gray-800 outline-none transition-all"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center mb-4">
            <span className="bg-green-100 text-green-700 w-7 h-7 rounded-full flex items-center justify-center font-bold mr-3 text-sm">3</span>
            <h2 className="text-md font-bold text-gray-800 uppercase tracking-wide">Payment Method</h2>
          </div>

          {!isValidEmail(email) ? (
            <div className="py-6 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50">
              <p className="text-gray-400 text-sm px-4 font-medium">Please enter your email to proceed.</p>
            </div>
          ) : loading ? (
            <div className="py-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            </div>
          ) : clientSecret ? (
            <Elements key={clientSecret} options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
              <DonationForm amount={amount} email={email} />
            </Elements>
          ) : null}
        </div>
      </div>
    </div>
  );
}