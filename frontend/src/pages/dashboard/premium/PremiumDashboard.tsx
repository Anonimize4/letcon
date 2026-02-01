import React from 'react';
import Layout from '../../../components/navigation/Layout';
import { Crown, Star, Zap, Shield, TrendingUp, Users, Clock } from 'lucide-react';

const PremiumDashboard: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Crown className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-htb-bright-white">
              Premium Dashboard
            </h1>
          </div>
          <p className="text-lg text-htb-foreground">
            Welcome to your Premium Dashboard - Enjoy exclusive features
          </p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                Welcome Premium User
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Enjoy exclusive premium features with enhanced learning experience, 
                advanced labs, priority support, and unrestricted access to all platform content.
              </p>
            </div>
            <div className="hidden lg:block">
              <Crown className="h-24 w-24 text-yellow-400 opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Labs Completed</h3>
            </div>
            <div className="text-3xl font-bold text-htb-bright-white mb-2">24</div>
            <p className="text-sm text-htb-foreground">Keep up the great work!</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Current Streak</h3>
            </div>
            <div className="text-3xl font-bold text-htb-bright-white mb-2">7 Days</div>
            <p className="text-sm text-htb-foreground">Personal best!</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Mentor Sessions</h3>
            </div>
            <div className="text-3xl font-bold text-htb-bright-white mb-2">5</div>
            <p className="text-sm text-htb-foreground">Next: Tomorrow 2pm</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="h-6 w-6 text-htb-cyan" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Learning Time</h3>
            </div>
            <div className="text-3xl font-bold text-htb-bright-white mb-2">48h</div>
            <p className="text-sm text-htb-foreground">This month</p>
          </div>
        </div>

        {/* Premium Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Premium Labs</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">Unlimited</div>
            <p className="text-sm text-htb-foreground">Access to all premium labs</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Priority Support</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">24/7</div>
            <p className="text-sm text-htb-foreground">Premium assistance</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Crown className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Advanced Content</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">500+</div>
            <p className="text-sm text-htb-foreground">Exclusive challenges</p>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-htb-bright-white mb-4">Your Premium Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex justify-between">
              <span className="text-htb-foreground">Status:</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-htb-foreground">Member Since:</span>
              <span className="text-htb-bright-white">Jan 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-htb-foreground">Subscription:</span>
              <span className="text-htb-bright-white">Premium Plan</span>
            </div>
            <div className="flex justify-between">
              <span className="text-htb-foreground">Next Billing:</span>
              <span className="text-htb-bright-white">Mar 1, 2024</span>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">Premium Dashboard is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All premium features are working correctly. Welcome premium user!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PremiumDashboard;

