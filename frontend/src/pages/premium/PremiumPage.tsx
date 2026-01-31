import React from 'react';
import Layout from '../../components/navigation/Layout';
import { Crown, Star, Zap, Shield, TrendingUp, Users, Clock, Check } from 'lucide-react';

const PremiumPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Crown className="h-10 w-10 text-htb-gold" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Upgrade to Premium
            </h1>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Unlock your full cybersecurity potential with unlimited access to premium labs, 
            challenges, mentorship, and exclusive content.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Free Plan */}
          <div className="bg-htb-selection-background/20 rounded-xl p-8 border border-htb-selection-background">
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-white/80 ml-2">forever</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-green mr-3" />
                Basic learning paths
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-green mr-3" />
                Community forum
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-green mr-3" />
                Basic challenges
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-green mr-3" />
                Limited lab time
              </li>
            </ul>
            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all">
              Get Started
            </button>
          </div>

          {/* Premium Plan */}
          <div className="relative bg-htb-selection-background/20 rounded-xl p-8 border-2 border-htb-gold transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-htb-gold text-white text-sm font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>
            <h3 className="text-2xl font-bold text-htb-gold mb-2">Premium</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$29</span>
              <span className="text-white/80 ml-2">per month</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-gold mr-3" />
                Everything in Free
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-gold mr-3" />
                Advanced learning paths
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-gold mr-3" />
                Premium labs & challenges
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-gold mr-3" />
                1-on-1 Mentorship
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-gold mr-3" />
                Priority support
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-gold mr-3" />
                Certificates
              </li>
            </ul>
            <button className="w-full bg-htb-gold hover:bg-htb-bright-gold text-white font-bold py-3 px-6 rounded-lg transition-all">
              Start Free Trial
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-htb-selection-background/20 rounded-xl p-8 border border-htb-selection-background">
            <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">Custom</span>
              <span className="text-white/80 ml-2">contact us</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-purple mr-3" />
                Everything in Premium
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-purple mr-3" />
                Custom learning paths
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-purple mr-3" />
                Dedicated support
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-purple mr-3" />
                Team management
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-purple mr-3" />
                API access
              </li>
              <li className="flex items-center text-white/90">
                <Check className="h-5 w-5 text-htb-purple mr-3" />
                SLA guarantee
              </li>
            </ul>
            <button className="w-full bg-htb-purple hover:bg-htb-bright-purple text-white font-bold py-3 px-6 rounded-lg transition-all">
              Contact Sales
            </button>
          </div>
        </div>

        {/* Premium Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Why Go Premium?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-htb-gold/20 mb-4">
                <Zap className="h-6 w-6 text-htb-gold" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Unlimited Labs</h3>
              <p className="text-white/70 text-sm">
                Practice as much as you want with unlimited access to all premium labs
              </p>
            </div>

            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-htb-cyan/20 mb-4">
                <Users className="h-6 w-6 text-htb-cyan" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">1-on-1 Mentorship</h3>
              <p className="text-white/70 text-sm">
                Get personalized guidance from industry experts
              </p>
            </div>

            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 mb-4">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Priority Support</h3>
              <p className="text-white/70 text-sm">
                Skip the queue with 24/7 premium support
              </p>
            </div>

            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-4">
                <Star className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Certificates</h3>
              <p className="text-white/70 text-sm">
                Earn industry-recognized certificates to showcase your skills
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-htb-selection-background/20 rounded-xl p-8 border border-htb-selection-background mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Premium by the Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-htb-gold mb-2">500+</div>
              <p className="text-white/70">Premium Challenges</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-htb-gold mb-2">100+</div>
              <p className="text-white/70">Advanced Labs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-htb-gold mb-2">24/7</div>
              <p className="text-white/70">Mentor Access</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-htb-gold mb-2">50+</div>
              <p className="text-white/70">Expert Mentors</p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-r from-htb-gold/10 to-htb-cyan/10 rounded-xl p-8 border border-htb-gold/30">
          <div className="text-center">
            <p className="text-xl text-white/90 italic mb-6">
              "The premium plan was a game-changer for my career. The mentorship sessions 
              helped me land my dream job as a security analyst!"
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-htb-gold flex items-center justify-center">
                <span className="text-white font-bold">JD</span>
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">John Doe</p>
                <p className="text-white/70 text-sm">Security Analyst at TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PremiumPage;

