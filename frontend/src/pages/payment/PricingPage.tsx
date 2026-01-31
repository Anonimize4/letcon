import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/navigation/Layout';
import { Check, X, Crown, Zap, Shield, Users, BookOpen, Terminal, Award } from 'lucide-react';

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

  // Comparison data for Free vs Premium
  const comparisonData = [
    {
      category: 'Learning Content',
      icon: <BookOpen className="h-5 w-5" />,
      items: [
        { feature: 'Basic Learning Paths', free: true, premium: true },
        { feature: 'Advanced Learning Paths', free: false, premium: true },
        { feature: 'Premium-Only Modules', free: false, premium: true },
        { feature: 'Real-World Scenarios', free: false, premium: true },
        { feature: 'Career Guidance', free: false, premium: true },
      ]
    },
    {
      category: 'Hands-On Labs',
      icon: <Terminal className="h-5 w-5" />,
      items: [
        { feature: 'Basic Lab Access', free: true, premium: true },
        { feature: 'Unlimited Lab Time', free: false, premium: true },
        { feature: 'Private Lab Environments', free: false, premium: true },
        { feature: 'Custom Lab Builder', free: false, premium: true },
        { feature: 'Advanced Docker Labs', free: false, premium: true },
        { feature: 'Real-World Exploitation', free: false, premium: true },
      ]
    },
    {
      category: 'Challenges',
      icon: <Zap className="h-5 w-5" />,
      items: [
        { feature: 'Basic Challenges', free: true, premium: true },
        { feature: 'Intermediate Challenges', free: true, premium: true },
        { feature: 'Advanced/Hard Challenges', free: false, premium: true },
        { feature: 'CTF Competitions', free: false, premium: true },
        { feature: 'Bug Bounty Preparation', free: false, premium: true },
        { feature: 'OSCP-style Exams', free: false, premium: true },
      ]
    },
    {
      category: 'Support & Community',
      icon: <Users className="h-5 w-5" />,
      items: [
        { feature: 'Community Forum', free: true, premium: true },
        { feature: 'Discord Community', free: true, premium: true },
        { feature: '1-on-1 Mentorship', free: false, premium: true },
        { feature: 'Priority Support', free: false, premium: true },
        { feature: 'Live Sessions', free: false, premium: true },
        { feature: 'Direct Mentor Chat', free: false, premium: true },
      ]
    },
    {
      category: 'Certifications & Rewards',
      icon: <Award className="h-5 w-5" />,
      items: [
        { feature: 'Progress Tracking', free: true, premium: true },
        { feature: 'Completion Badges', free: true, premium: true },
        { feature: 'Free Certificate of Completion', free: false, premium: true },
        { feature: 'Industry-Recognized Certs', free: false, premium: true },
        { feature: 'LinkedIn Certifications', free: false, premium: true },
        { feature: 'Job Placement Support', free: false, premium: true },
      ]
    },
    {
      category: 'Platform Benefits',
      icon: <Shield className="h-5 w-5" />,
      items: [
        { feature: 'Web-based Lab Access', free: true, premium: true },
        { feature: 'Browser-based Terminal', free: true, premium: true },
        { feature: 'No VPN Required', free: true, premium: true },
        { feature: 'API Access', free: false, premium: true },
        { feature: 'Team Collaboration', free: false, premium: true },
        { feature: 'Custom Learning Paths', free: false, premium: true },
      ]
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

          {/* Comparison Section - Free vs Premium */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Crown className="h-8 w-8 text-htb-gold" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Free vs Premium
              </h2>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              See what's included in each plan and unlock your full cybersecurity potential
            </p>
            
            <div className="bg-htb-selection-background/20 rounded-xl border border-htb-selection-background overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-htb-selection-background/30 border-b border-htb-selection-background">
                <div className="col-span-6 p-4 text-left">
                  <span className="text-lg font-bold text-white">Feature Comparison</span>
                </div>
                <div className="col-span-3 p-4 text-center">
                  <span className="text-lg font-bold text-gray-300">Free</span>
                </div>
                <div className="col-span-3 p-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Crown className="h-5 w-5 text-htb-gold" />
                    <span className="text-lg font-bold text-htb-gold">Premium</span>
                  </div>
                </div>
              </div>
              
              {/* Comparison Categories */}
              {comparisonData.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  {/* Category Header */}
                  <div className="grid grid-cols-12 bg-htb-selection-background/10 border-b border-htb-selection-background">
                    <div className="col-span-12 p-4 flex items-center space-x-3">
                      <div className="text-htb-cyan">{category.icon}</div>
                      <span className="text-lg font-semibold text-white">{category.category}</span>
                    </div>
                  </div>
                  
                  {/* Category Items */}
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className={`grid grid-cols-12 border-b border-htb-selection-background/30 last:border-0 ${
                        itemIndex % 2 === 0 ? 'bg-transparent' : 'bg-htb-selection-background/5'
                      }`}
                    >
                      <div className="col-span-6 p-4 text-left">
                        <span className="text-white/90">{item.feature}</span>
                      </div>
                      <div className="col-span-3 p-4 flex items-center justify-center">
                        {item.free ? (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-htb-green/20">
                            <Check className="h-5 w-5 text-htb-green" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20">
                            <X className="h-5 w-5 text-red-400" />
                          </div>
                        )}
                      </div>
                      <div className="col-span-3 p-4 flex items-center justify-center">
                        {item.premium ? (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-htb-gold/20">
                            <Check className="h-5 w-5 text-htb-gold" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20">
                            <X className="h-5 w-5 text-red-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* CTA After Comparison */}
            <div className="mt-8 p-6 bg-gradient-to-r from-htb-gold/10 to-htb-cyan/10 rounded-lg border border-htb-gold/30">
              <p className="text-white text-lg">
                <span className="font-bold text-htb-gold">Ready to level up?</span>{' '}
                <span className="text-white/80">Upgrade to Premium and get unlimited access to all features!</span>
              </p>
              <button
                onClick={() => navigate('/register')}
                className="mt-4 bg-htb-gold hover:bg-htb-bright-gold text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-htb-gold/25 transform hover:-translate-y-1"
              >
                Start Free Trial
              </button>
            </div>
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
