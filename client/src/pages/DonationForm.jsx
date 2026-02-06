import { useEffect, useState, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonationForm from '../components/Donate';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Fruit & Vegetable SVG Icons for decoration
const AppleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2c-1.5 0-2.5 1-3 2-2 0-4 1.5-4 4 0 4 3 10 7 12 4-2 7-8 7-12 0-2.5-2-4-4-4-.5-1-1.5-2-3-2z" />
    <path d="M12 2v4" />
    <path d="M10 1c1 0 2 1 2 2" />
  </svg>
);

const CarrotIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8 21l8-14" />
    <path d="M16 7c2-2 4-2 5-1s1 3-1 5l-8 8c-2 2-4 2-5 1s-1-3 1-5l8-8z" />
    <path d="M18 4l2 2" />
    <path d="M15 3l1 1" />
    <path d="M20 7l1 1" />
  </svg>
);

const GrapesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="2" />
    <circle cx="9" cy="12" r="2" />
    <circle cx="15" cy="12" r="2" />
    <circle cx="12" cy="16" r="2" />
    <circle cx="7" cy="16" r="2" />
    <circle cx="17" cy="16" r="2" />
    <path d="M12 2v4" />
    <path d="M10 3c1 0 2 1 2 1" />
  </svg>
);

const LemonIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="12" rx="8" ry="6" transform="rotate(45 12 12)" />
    <path d="M14 10c0 1-1 2-2 2s-2-1-2-2" />
  </svg>
);

const LeafIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 21c3-3 8-8 14-8-2 8-7 11-14 8z" />
    <path d="M6 21c-1-4 2-9 6-12" />
  </svg>
);

const BroccoliIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="6" r="3" />
    <circle cx="8" cy="9" r="2.5" />
    <circle cx="16" cy="9" r="2.5" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="14" cy="12" r="2" />
    <path d="M12 14v8" />
  </svg>
);

export default function Donate() {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(50);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [donationType, setDonationType] = useState('once'); // 'once' or 'monthly'
  const [selectedPreset, setSelectedPreset] = useState(50);

  // Other Ways to Donate - dropdown state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('venmo'); // 'venmo' or 'cashapp'

  // Form refs for scroll-to
  const donateMoneyRef = useRef(null);
  const donateFoodRef = useRef(null);

  const presetAmounts = [25, 50, 100, 250, 500];

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

  const handlePresetClick = (preset) => {
    setSelectedPreset(preset);
    setAmount(preset);
    if (isValidEmail(email)) {
      getPaymentIntent(preset, email);
    }
  };

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(val);
    setSelectedPreset(null);
  };

  const scrollToDonateMoney = () => {
    donateMoneyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDonateFood = () => {
    donateFoodRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle payment method dropdown
  const togglePaymentMethod = (method) => {
    setSelectedPaymentMethod(selectedPaymentMethod === method ? null : method);
  };

  // Food Donation Form State
  const [foodFormData, setFoodFormData] = useState({
    name: '',
    foodType: '',
    contact: '',
    message: ''
  });
  const [foodFormSubmitting, setFoodFormSubmitting] = useState(false);
  const [foodFormSuccess, setFoodFormSuccess] = useState(false);

  const handleFoodFormChange = (e) => {
    const { name, value } = e.target;
    setFoodFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFoodFormSubmit = async (e) => {
    e.preventDefault();
    setFoodFormSubmitting(true);
    // Simulate form submission (replace with actual API call if needed)
    setTimeout(() => {
      setFoodFormSubmitting(false);
      setFoodFormSuccess(true);
      setFoodFormData({ name: '', foodType: '', contact: '', message: '' });
    }, 1000);
  };

  return (
    <div className="animate-fade-in bg-white">
      {/* ========================================== */}
      {/* HERO SECTION */}
      {/* ========================================== */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-start overflow-hidden -mt-20">
        {/* Background Image - Using the produce/lettuce image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/lettuce-hero.jpg"
            alt="Fresh produce at Access to Excess"
            className="w-full h-full object-cover"
          />
          {/* Linear Gradient Overlay - Left to Right (dark on left, fades right) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)'
            }}
          ></div>
          {/* Additional dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-20">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-[1.15]">
              Saving <span className="text-pro-light-green">Excess</span> food<br />
              & Increasing <span className="text-pro-light-green">Access</span> to it.
            </h1>
            <div className="flex flex-row gap-4 mt-8">
              <button
                onClick={scrollToDonateMoney}
                className="px-6 py-3 bg-pro-green hover:bg-pro-dark text-white text-[15px] font-bold rounded-md shadow-lg transition-all"
              >
                Donate Funds
              </button>
              <button
                onClick={scrollToDonateFood}
                className="px-6 py-3 bg-pro-green hover:bg-pro-dark text-white text-[15px] font-bold rounded-md shadow-lg transition-all"
              >
                Donate Food
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* DONATE MONEY SECTION (Green Background) */}
      {/* ========================================== */}
      <section ref={donateMoneyRef} className="relative bg-pro-dark py-16 md:py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Decorative fruit icons */}
        <div className="absolute top-6 left-6 opacity-20">
          <AppleIcon className="w-10 h-10 text-white" />
        </div>
        <div className="absolute top-12 left-20 opacity-20">
          <CarrotIcon className="w-12 h-12 text-white" />
        </div>
        <div className="absolute top-24 left-8 opacity-20">
          <GrapesIcon className="w-9 h-9 text-white" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <LemonIcon className="w-11 h-11 text-white" />
        </div>
        <div className="absolute bottom-20 right-24 opacity-20">
          <LeafIcon className="w-8 h-8 text-white" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Donate Money
          </h2>
          <p className="text-xl md:text-2xl text-white font-medium">
            Every Dollar makes a difference
          </p>
          <p className="text-white/90 mt-3 text-sm">
            All monetary donations go toward operations. Fuel, electric bill, insurance and program expenses.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-start relative z-10">
          {/* LEFT: Stripe Donation Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Donate via Stripe</h3>
              <p className="text-sm text-gray-500">Secure online donation processing</p>
            </div>

            {/* Give Once / Monthly Toggle */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`px-6 py-2 text-sm font-semibold rounded-md transition-all ${donationType === 'once'
                    ? 'bg-[#FFC570] text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                  onClick={() => setDonationType('once')}
                >
                  GIVE ONCE
                </button>
                <button
                  className={`px-6 py-2 text-sm font-semibold rounded-md transition-all ${donationType === 'monthly'
                    ? 'bg-[#FFC570] text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                  onClick={() => setDonationType('monthly')}
                >
                  MONTHLY
                </button>
              </div>
            </div>

            {/* Preset Amount Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetClick(preset)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-all ${selectedPreset === preset
                    ? 'bg-pro-light-green border-pro-light-green text-white'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-pro-light-green'
                    }`}
                >
                  ${preset}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Enter an amount to give
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                <span className="px-4 text-gray-500 font-semibold text-lg">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  onBlur={() => getPaymentIntent(amount, email)}
                  className="flex-1 p-3 bg-transparent border-none focus:outline-none text-lg text-gray-800"
                  placeholder="0"
                />
                <span className="px-4 text-gray-400 text-sm">USD</span>
              </div>
            </div>

            {/* Email Input for Stripe */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => getPaymentIntent(amount, email)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-[#166534] focus:ring-1 focus:ring-[#166534] transition-colors text-gray-800"
                placeholder="your@email.com"
              />
            </div>

            {/* 501c3 Notice */}
            <div className="bg-[#fef9e7] border border-[#FFC570]/30 rounded-lg p-3 mb-6">
              <p className="text-xs text-gray-600 leading-relaxed">
                Access to Excess is a 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law.
              </p>
            </div>

            {/* Stripe Payment Element Area */}
            {!isValidEmail(email) ? (
              <div className="py-6 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 mb-4">
                <p className="text-gray-400 text-sm px-4 font-medium">Please enter your email to proceed.</p>
              </div>
            ) : loading ? (
              <div className="py-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#166534] mx-auto"></div>
              </div>
            ) : clientSecret ? (
              <Elements key={clientSecret} options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
                <DonationFormWrapper amount={amount} email={email} />
              </Elements>
            ) : (
              <button
                onClick={() => getPaymentIntent(amount, email)}
                disabled={!isValidEmail(email)}
                className="w-full py-4 bg-pro-light-green border-pro-light-green text-white font-bold rounded-lg hover:bg-pro-green transition-colors text-lg shadow-md disabled:opacity-50"
              >
                GIVE NOW
              </button>
            )}
          </div>

          {/* RIGHT: Other Ways to Donate (Dropdown with QR codes) */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h4 className="text-center font-bold text-gray-800 mb-6">Other Ways to Donate</h4>

            {/* Venmo Dropdown */}
            <div className="mb-3">
              <button
                onClick={() => togglePaymentMethod('venmo')}
                className={`flex items-center justify-between w-full py-3 px-4 border-2 rounded-lg font-semibold transition-all ${selectedPaymentMethod === 'venmo'
                  ? 'border-[#008CFF] bg-[#008CFF]/5'
                  : 'border-[#008CFF] hover:bg-[#008CFF]/5'
                  }`}
              >
                <div className="flex items-center gap-2 text-[#008CFF]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.27 3c.83 0 1.5.67 1.5 1.5 0 .09-.01.17-.02.26l-2.25 14.74c-.09.59-.59 1-.18 1H8.18c-.59 0-1.09-.41-1.18-1L4.75 4.76c-.02-.09-.02-.17-.02-.26 0-.83.67-1.5 1.5-1.5h13.04zM8.97 8.5l1.76 7.62c-1.31 1.3-2.66 2.38-4.04 2.38-1.74 0-2.56-1.18-2.56-2.82 0-2.54 2.33-6.85 3.74-8.55.39-.47.89-.63 1.33-.63.78 0 1.28.59 1.28 1.38 0 .28-.06.59-.19.89l-.15.36h-.01c-.95 2.19-2.9 5.66-2.9 6.85 0 .35.13.55.46.55.52 0 1.23-.6 2.12-1.61l-.84-3.79c.59-1.06 1.2-2.04 1.88-2.93.61-.79 1.33-1.2 2.17-1.2.75 0 1.36.47 1.36 1.42 0 .24-.03.47-.09.71l-.39 1.37z" />
                  </svg>
                  Donate via Venmo
                </div>
                <svg
                  className={`w-4 h-4 text-[#008CFF] transition-transform duration-200 ${selectedPaymentMethod === 'venmo' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Venmo QR Code */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${selectedPaymentMethod === 'venmo' ? 'max-h-[400px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="bg-white border-2 border-[#008CFF] rounded-xl p-6 flex flex-col items-center">
                  <div className="w-48 h-48 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                    <img
                      src="/venmo_QR_code.avif"
                      alt="Venmo QR Code"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <p className="text-gray-600 text-sm mt-4 text-center">Scan to donate via Venmo</p>
                </div>
              </div>
            </div>

            {/* Cash App Dropdown */}
            <div>
              <button
                onClick={() => togglePaymentMethod('cashapp')}
                className={`flex items-center justify-between w-full py-3 px-4 border-2 rounded-lg font-semibold transition-all ${selectedPaymentMethod === 'cashapp'
                  ? 'border-[#00D632] bg-[#00D632]/5'
                  : 'border-[#00D632] hover:bg-[#00D632]/5'
                  }`}
              >
                <div className="flex items-center gap-2 text-[#00D632]">
                  <span className="text-lg font-bold">$</span>
                  Donate via Cash App
                </div>
                <svg
                  className={`w-4 h-4 text-[#00D632] transition-transform duration-200 ${selectedPaymentMethod === 'cashapp' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Cash App QR Code */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${selectedPaymentMethod === 'cashapp' ? 'max-h-[400px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="bg-white border-2 border-[#00D632] rounded-xl p-6 flex flex-col items-center">
                  <div className="w-48 h-48 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                    <img
                      src="/cash_app_QR_code.avif"
                      alt="Cash App QR Code"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <p className="text-gray-600 text-sm mt-4 text-center">Scan to donate via Cash App</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* DONATE FOOD SECTION (Light Background) */}
      {/* ========================================== */}
      <section ref={donateFoodRef} className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 relative">
        {/* Decorative Icons (Top Right) */}
        <div className="absolute top-8 right-8 opacity-20 hidden lg:flex items-start gap-2">
          <svg className="w-8 h-8 text-[#166534]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <svg className="w-6 h-6 text-[#166534]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT: Title + What We Accept */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003300] mb-2">
              DONATE FOOD
            </h2>
            <p className="text-sm text-[#138622] font-semibold uppercase tracking-wide mb-6">
              (Food Businesses & Home Gardeners)
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Do you have extra food or garden produce? We make it easy for you to donate your surplus! Whether you're looking to donate, partner, organize, or just learn more, we're looking forward to hearing from you!
            </p>

            {/* What We Accept Card */}
            <div className="bg-[#fef9e7] rounded-xl shadow-md p-8 border border-[#FFC570]/30">
              <h4 className="text-[#138622] font-bold text-xl mb-6">What We Accept</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#138622] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-base">Fresh Perishables Only</span>
                    <p className="text-sm text-[#138622] mt-0.5">Produce, bread, dairy, eggs, groceries</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#138622] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41C2.99 13.81 3.5 14 4 14C4.5 14 5 13.81 5.41 13.41L6 12.83V21C6 21.55 6.45 22 7 22H11V16H13V22H17C17.55 22 18 21.55 18 21V12.83L18.59 13.41C19.37 14.2 20.63 14.2 21.41 13.41C21.81 13.01 22 12.5 22 12C22 11.5 21.81 11 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M16 6H18V8L16 6Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-base">Garden Produce</span>
                    <p className="text-sm text-[#138622] mt-0.5">Fresh vegetables, fruits, and herbs from gardens</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-base">No Canned/Shelf-Stable Items</span>
                    <p className="text-sm text-[#138622] mt-0.5">We only accept fresh, daily items</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#138622] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-base">Same-Day Distribution</span>
                    <p className="text-sm text-[#138622] mt-0.5">Food reaches families the same day you donate</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">FILL OUT THIS FORM</h3>
            <p className="text-center text-[#138622] text-sm mb-6">OR TEXT/CALL 937-931-3279</p>

            <form onSubmit={handleFoodFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Name or Food Business *
                </label>
                <input
                  type="text"
                  name="name"
                  value={foodFormData.name}
                  onChange={handleFoodFormChange}
                  placeholder="Your name or business name"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#138622] focus:ring-1 focus:ring-[#138622] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Type of Food (Produce, Bread, Misc, etc) *
                </label>
                <input
                  type="text"
                  name="foodType"
                  value={foodFormData.foodType}
                  onChange={handleFoodFormChange}
                  placeholder="e.g., Fresh produce, baked goods, dairy"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#138622] focus:ring-1 focus:ring-[#138622] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Email or Contact Number *
                </label>
                <input
                  type="text"
                  name="contact"
                  value={foodFormData.contact}
                  onChange={handleFoodFormChange}
                  placeholder="your.email@example.com or 937-XXX-XXXX"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#138622] focus:ring-1 focus:ring-[#138622] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  How Can We Help? *
                </label>
                <textarea
                  name="message"
                  value={foodFormData.message}
                  onChange={handleFoodFormChange}
                  rows={4}
                  placeholder="Tell us about what food is available to donate - share details on dates, times and locations if possible!"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#138622] focus:ring-1 focus:ring-[#138622] transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={foodFormSubmitting}
                className="w-full py-4 bg-[#138622] text-white font-bold rounded-lg hover:bg-[#0d6518] transition-colors text-lg shadow-md disabled:opacity-50"
              >
                {foodFormSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
              </button>

              {foodFormSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-green-700 font-medium">Thank you! We'll be in touch soon.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* DONATE GARDEN PRODUCE SECTION (Dark Green) */}
      {/* ========================================== */}
      <section className="relative bg-pro-dark py-16 md:py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Decorative fruit icons */}
        <div className="absolute top-8 left-8 opacity-20">
          <AppleIcon className="w-11 h-11 text-white" />
        </div>
        <div className="absolute top-16 left-24 opacity-20">
          <BroccoliIcon className="w-14 h-14 text-white" />
        </div>
        <div className="absolute top-28 left-12 opacity-20">
          <CarrotIcon className="w-10 h-10 text-white" />
        </div>
        <div className="absolute bottom-16 right-12 opacity-20">
          <GrapesIcon className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-10 right-28 opacity-20">
          <LemonIcon className="w-10 h-10 text-white" />
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* LEFT: Content */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Donate Garden Produce
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Download the Fresh Food Connect app to easily donate your homegrown produce and find drop-off locations near you.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-200">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                Find nearby drop-off locations in real-time
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                  </svg>
                </div>
                Schedule pickups for larger donations
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                  </svg>
                </div>
                Track your produce donations and impact
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                  </svg>
                </div>
                Links to over 60 community organizations nationwide
              </li>
            </ul>
            <a
              href="https://freshfoodconnect.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-[#FFC570] text-gray-900 font-bold rounded-lg hover:bg-[#e5b060] transition-colors text-lg shadow-md disabled:opacity-50"
            >
              Download the App
            </a>
          </div>

          {/* RIGHT: Fresh Food Connect Logo/Image */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-[#003300] rounded-2xl p-4 max-w-xs">
              <img
                src="/fresh-food-connect.png"
                alt="Fresh Food Connect"
                className="w-full h-auto"
                onError={(e) => {
                  // Fallback with text if image doesn't exist
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden flex-col items-center text-center p-6 bg-[#FFC570] rounded-xl">
                <div className="text-3xl font-bold text-[#003300] leading-tight">FRESH</div>
                <div className="text-3xl font-bold text-[#003300] leading-tight">FOOD</div>
                <div className="text-3xl font-bold text-[#003300] leading-tight">CONNECT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* IMPACT STATS SECTION */}
      {/* ========================================== */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Your Donations Make a Difference
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Every donation—whether money, produce, or food—helps us rescue surplus, reduce waste, and feed families in Dayton.
          </p>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-pro-green rounded-2xl p-8">
              <div className="text-4xl md:text-5xl font-bold text-white mb-3">100%</div>
              <p className="text-white text-sm">of donations go directly to food rescue operations</p>
            </div>
            <div className="bg-pro-green rounded-2xl p-8">
              <div className="text-4xl md:text-5xl font-bold text-white mb-3">Same Day</div>
              <p className="text-white text-sm">fresh food reaches families the same day</p>
            </div>
            <div className="bg-pro-green rounded-2xl p-8">
              <div className="text-4xl md:text-5xl font-bold text-white mb-3">501(c)(3)</div>
              <p className="text-white text-sm">nonprofit status means tax-deductible donations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Wrapper component to style the existing DonationForm within the new design
function DonationFormWrapper({ amount, email }) {
  return (
    <div className="stripe-form-wrapper">
      <DonationForm amount={amount} email={email} />
      <style>{`
        .stripe-form-wrapper form {
          padding: 0 !important;
          box-shadow: none !important;
          border: none !important;
          max-width: none !important;
          margin: 0 !important;
        }
        .stripe-form-wrapper form h2 {
          display: none !important;
        }
        .stripe-form-wrapper form button {
          background-color: #FFC570 !important;
          color: #1a1a1a !important;
        }
        .stripe-form-wrapper form button:hover {
          background-color: #e5b060 !important;
        }
      `}</style>
    </div>
  );
}