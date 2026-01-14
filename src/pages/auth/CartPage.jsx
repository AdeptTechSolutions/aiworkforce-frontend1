// src/pages/auth/CartPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/layout/Header';
import backgroundImage from '../../assets/Background.png';



// Check Icon
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Arrow Icon
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

// Lock Icon
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// Checkmark Icon for selection
const CheckmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Payment Processing Screen
const PaymentProcessingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        Great! We received your payment
      </h2>
      <p className="text-gray-500 mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        Please wait for a moment.
      </p>
      <div className="flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-900 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

// Default plan data if not passed via navigation
const defaultPlan = {
  id: 'tier3',
  name: 'Tier - 3',
  price: 1299,
  period: 'month per seat',
  credits: 1000,
  isBestseller: true,
  features: [
    'B2C Lead Builder Agent',
    'B2B Lead Builder Agent',
    'Get 2000 Enrichment Credits',
    'Organic Lead builder Agent',
    'Call Inbound Agent - 1000 Min. Credits',
    'Brochure Creating Agent',
    'SEO Blog & Content Engine Agent',
    'Personal Assistant Agent',
    'Meeting Notetaker / Summarizer',
    '4 Email hosting'
  ]
};

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentType, setPaymentType] = useState('yearly'); // 'monthly' or 'yearly'
  const [currency, setCurrency] = useState('GBP');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Get plan from navigation state or use default
  const plan = location.state?.plan || defaultPlan;
  const selectedCredits = location.state?.selectedCredits || 1000;

  const currencies = ['GBP', 'USD', 'EUR'];

  // Calculate prices
  const monthlyPrice = plan.price + 1; // Slight adjustment for monthly
  const yearlyPrice = Math.round(plan.price * 0.92); // 20% discount for yearly
  const currentPrice = paymentType === 'yearly' ? yearlyPrice : monthlyPrice;
  const planCost = paymentType === 'yearly' ? yearlyPrice - 12 : monthlyPrice - 12;
  const tax = 12;

  const handleProceedToPay = () => {
    setIsProcessing(true);
    // Simulate payment processing for 3 seconds
    setTimeout(() => {
      navigate('/integration-hub'); 
    }, 3000);
  };

  if (isProcessing) {
    return <PaymentProcessingScreen />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
    style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header */}
     <Header variant="simple" />

      <main className="w-full bg-white mt-6">
        <div  className="max-w-6xl mx-auto px-6 py-8 mt-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          In your Cart
        </h1>

        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Left Column - Plan Details */}
          <div className="space-y-6">
            {/* Main Plan Card */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-700">{plan.name}</h3>
                {plan.isBestseller && (
                  <span className="px-2 py-1 bg-gray-900 text-white text-xs rounded">BESTSELLER</span>
                )}
              </div>

              <div className="mb-2">
                <span className="text-5xl font-bold text-gray-900">£{plan.price}</span>
                <span className="text-gray-500">/ {plan.period}</span>
              </div>

              <p className="text-gray-700 mb-4">
                <span className="text-[#10B981] font-medium">Credit Count:</span> {selectedCredits}
              </p>

              {plan.id === 'tier3' && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-700 italic">
                  Both B2C Lead Builder Agent & B2B Lead Builder Agent <span className="font-medium">will be included in this plan</span>
                </div>
              )}

              <div className="mb-4">
                <p className="font-medium text-gray-900 mb-3">You will get</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <CheckIcon /> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => navigate('/choose-plan')}
                  className="flex items-center gap-1 text-[#4F46E5] font-medium hover:text-[#4338CA] transition-colors"
                >
                  Change Plan <ArrowIcon />
                </button>
              </div>
            </div>

            {/* Free Tier Card */}
            <div className="border border-gray-200 rounded-xl p-6">
              <p className="text-gray-500 text-sm">Tier - 0</p>
              <p className="text-4xl font-bold text-gray-900 my-2">£0</p>
              <p className="flex items-center gap-2 text-gray-600 mb-4">
                <CheckIcon /> 4000 Words.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[#10B981] font-medium">Free for all Tier</span>
                <button className="flex items-center gap-1 text-[#4F46E5] font-medium hover:text-[#4338CA]">
                  Upgrade <ArrowIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Options */}
          <div className="space-y-4">
            {/* Currency Selector */}
            <div className="flex justify-end">
              <div className="relative">
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <span className="text-gray-500">Currency</span>
                  <span className="font-medium">{currency}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {showCurrencyDropdown && (
                  <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                    {currencies.map(curr => (
                      <button
                        key={curr}
                        onClick={() => { setCurrency(curr); setShowCurrencyDropdown(false); }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Type Options */}
            <button
              onClick={() => setPaymentType('monthly')}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex justify-between items-center ${
                paymentType === 'monthly' ? 'border-[#4F46E5] bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div>
                <p className="text-gray-500 text-sm">Pay monthly</p>
                <p className="text-xl font-bold text-gray-900">£{monthlyPrice}/month</p>
              </div>
              {paymentType === 'monthly' && <CheckmarkIcon />}
            </button>

            <button
              onClick={() => setPaymentType('yearly')}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex justify-between items-center ${
                paymentType === 'yearly' ? 'border-[#4F46E5] bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-gray-500 text-sm">Pay yearly</p>
                  <p className="text-xl font-bold text-gray-900">£{yearlyPrice}/month</p>
                </div>
                <span className="px-2 py-1 bg-[#10B981] text-white text-xs rounded font-medium">Save 20%</span>
              </div>
              {paymentType === 'yearly' && <CheckmarkIcon />}
            </button>

            {/* Security Note */}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <LockIcon />
              <span>Secured from with UIB Banking</span>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Plan Cost</span>
                <span>£{planCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>£{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span>£{currentPrice}</span>
              </div>
            </div>

            {/* Terms Note */}
            <p className="text-gray-500 text-sm">
              By clicking "Proceed To Pay", you agree to be charged £{monthlyPrice} every month, unless you cancel.
            </p>

            {/* Pay Button */}
            <button
              onClick={handleProceedToPay}
              className="w-full h-12 bg-[#10B981] hover:bg-[#059669] text-white font-medium rounded-xl transition-colors"
            >
              Proceed To Pay
            </button>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;