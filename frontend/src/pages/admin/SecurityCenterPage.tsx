import React from 'react';
import { Shield, Lock, Eye, AlertTriangle, Key, Fingerprint } from 'lucide-react';

const SecurityCenterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-htb-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-htb-blue" />
            <h1 className="text-3xl font-bold text-htb-bright-white">Security Center</h1>
          </div>
          <p className="text-htb-foreground mt-2">Welcome to Security Center - This page works!</p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                Security Operations Center
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Monitor security threats, manage access controls, and ensure platform integrity. 
                Track authentication attempts, manage security policies, and respond to security incidents.
              </p>
            </div>
            <div className="hidden lg:block">
              <Shield className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Auth Success</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">98.5%</div>
            <p className="text-sm text-htb-foreground">Last 24 hours</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Threats Blocked</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">47</div>
            <p className="text-sm text-htb-foreground">This week</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Active Sessions</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">234</div>
            <p className="text-sm text-htb-foreground">Currently active</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Key className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">API Keys</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">12</div>
            <p className="text-sm text-htb-foreground">Active keys</p>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Security Features</h3>
            <div className="space-y-4">
              {[
                { feature: 'Two-Factor Authentication', status: 'Enabled', icon: Fingerprint, color: 'text-green-400' },
                { feature: 'Rate Limiting', status: 'Active', icon: Shield, color: 'text-green-400' },
                { feature: 'IP Whitelisting', status: 'Configured', icon: Lock, color: 'text-green-400' },
                { feature: 'Audit Logging', status: 'Active', icon: Eye, color: 'text-green-400' },
                { feature: 'Encryption at Rest', status: 'Enabled', icon: Key, color: 'text-green-400' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-htb-selection-background last:border-0">
                  <div className="flex items-center space-x-3">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <div>
                      <p className="text-htb-bright-white font-medium">{item.feature}</p>
                    </div>
                  </div>
                  <span className={item.color}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Recent Security Events</h3>
            <div className="space-y-4">
              {[
                { type: 'warning', event: 'Multiple failed login attempts', user: 'user@example.com', time: '2 minutes ago' },
                { type: 'info', event: 'Password reset requested', user: 'admin@example.com', time: '15 minutes ago' },
                { type: 'success', event: 'New API key generated', user: 'system', time: '1 hour ago' },
                { type: 'warning', event: 'Unusual access pattern detected', user: 'user123@example.com', time: '2 hours ago' },
                { type: 'info', event: 'Security policy updated', user: 'admin', time: '3 hours ago' }
              ].map((event, index) => (
                <div key={index} className="flex items-start space-x-3 py-3 border-b border-htb-selection-background last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    event.type === 'warning' ? 'bg-yellow-400' : 
                    event.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-htb-bright-white text-sm">{event.event}</p>
                    <p className="text-htb-foreground text-xs mt-1">{event.user} • {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">Security Center is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All security monitoring and management features are working correctly. This is a placeholder page to confirm the routing is functional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenterPage;
