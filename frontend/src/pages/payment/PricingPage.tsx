import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/navigation/Layout';

const PricingPage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Access to basic learning paths',
        'Community forum access',
        'Basic challenges',
        'Limited lab time'
      ],
      buttonText: 'Get Started',
      buttonClass: 'bg-gray-600 hover:bg-gray-700',
      popular: false
    },
    {
      name: 'Premium',
      price: '$29',
      period: 'per month',
      features: [
        'Everything in Free',
        'Advanced learning paths',
        'Premium labs & challenges',
        '1-on-1 mentorship',
        'Priority support',
        'Certificate of completion'
      ],
      buttonText: 'Start Free Trial',
      buttonClass: 'bg-htb-gold hover:bg-htb-bright-gold',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'Everything in Premium',
        'Custom learning paths',
        'Dedicated support',
        'Team management',
        'API access',
        'SLA guarantee'
      ],
      buttonText: 'Contact Sales',
      buttonClass: 'bg-htb-purple hover:bg-htb-bright-purple',
      popular: false
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your Learning Path
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Select the plan that best fits your cybersecurity learning goals
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-htb-selection-background/20 rounded-xl p-8 border ${plan.popular ? 'border-htb-gold' : 'border-htb-selection-background'} hover:shadow-lg transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-htb-gold text-white text-sm font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/80 ml-2">{plan.period}</span>
                  </div>
                  
                  <ul className="text-left space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-white">
                        <svg className="w-5 h-5 text-htb-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => navigate('/register')}
                    className={`w-full ${plan.buttonClass} text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
                <h3 className="text-lg font-semibold text-white mb-3">Can I cancel anytime?</h3>
                <p className="text-white/80">Yes, you can cancel your subscription at any time. No questions asked.</p>
              </div>
              <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
                <h3 className="text-lg font-semibold text-white mb-3">Is there a free trial?</h3>
                <p className="text-white/80">Premium plans come with a 7-day free trial with full access to all features.</p>
              </div>
              <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
                <h3 className="text-lg font-semibold text-white mb-3">What payment methods do you accept?</h3>
                <p className="text-white/80">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
              </div>
              <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
                <h3 className="text-lg font-semibold text-white mb-3">Do you offer discounts?</h3>
                <p className="text-white/80">Yes! We offer discounts for students, annual billing, and team subscriptions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
