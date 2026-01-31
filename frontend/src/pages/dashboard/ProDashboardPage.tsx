import React from 'react';
import Layout from '../../components/navigation/Layout';
import { Zap, Shield, Star, Crown } from 'lucide-react';

const ProDashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Zap className="h-8 w-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-htb-bright-white">
              Pro Dashboard
            </h1>
          </div>
          <p className="text-lg text-htb-foreground font-medium">
            Welcome to Pro Dashboard - This page works!
          </p>
          <div className="mt-4 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 font-semibold">✓ Pro user welcome message is rendered</p>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                Professional Dashboard
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Welcome to your professional workspace. Enjoy advanced features, 
                priority support, and comprehensive management tools for your cybersecurity training platform.
              </p>
            </div>
            <div className="hidden lg:block">
              <Zap className="h-24 w-24 text-purple-400 opacity-20" />
            </div>
          </div>
        </div>

        {/* Pro Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Advanced Tools</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">Full Access</div>
            <p className="text-sm text-htb-foreground">All pro features</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Priority Support</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">24/7</div>
            <p className="text-sm text-htb-foreground">Expert assistance</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Advanced Analytics</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">Real-time</div>
            <p className="text-sm text-htb-foreground">Deep insights</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Crown className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Custom Branding</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">Professional</div>
            <p className="text-sm text-htb-foreground">Experience</p>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">Pro Dashboard is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All pro features are working correctly. This is a placeholder page to confirm that routing is functional.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ProDashboardPage;
