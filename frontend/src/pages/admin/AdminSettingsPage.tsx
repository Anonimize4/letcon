import React from 'react';
import { Settings, Shield, Bell, Database, Globe } from 'lucide-react';

const AdminSettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-htb-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Settings className="h-8 w-8 text-htb-blue" />
            <h1 className="text-3xl font-bold text-htb-bright-white">System Settings</h1>
          </div>
          <p className="text-htb-foreground mt-2">Welcome to System Settings - This page works!</p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                System Configuration Portal
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Configure system-wide settings, manage platform preferences, and customize the cybersecurity training environment. 
                Control authentication, notifications, database settings, and more.
              </p>
            </div>
            <div className="hidden lg:block">
              <Settings className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Settings Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Security</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Authentication, authorization, and security policies
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-htb-foreground">Two-Factor Auth</span>
                <span className="text-green-400">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-htb-foreground">Session Timeout</span>
                <span className="text-htb-bright-white">30 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-htb-foreground">Password Policy</span>
                <span className="text-htb-bright-white">Strict</span>
              </div>
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Notifications</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Email alerts, system notifications, and alerts
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-htb-foreground">Email Alerts</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-htb-foreground">System Alerts</span>
                <span className="text-green-400">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-htb-foreground">User Notifications</span>
                <span className="text-htb-bright-white">Custom</span>
              </div>
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Database</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Database connections, backups, and performance
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-htb-foreground">Auto Backup</span>
                <span className="text-green-400">Daily</span>
              </div>
              <div className="flex justify-between">
                <span className="text-htb-foreground">Connection Pool</span>
                <span className="text-htb-bright-white">20 max</span>
              </div>
              <div className="flex justify-between">
                <span className="text-htb-foreground">Query Cache</span>
                <span className="text-green-400">Enabled</span>
              </div>
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Platform</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              General platform settings and preferences
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-htb-foreground">Timezone</span>
                <span className="text-htb-bright-white">UTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-htb-foreground">Language</span>
                <span className="text-htb-bright-white">English</span>
              </div>
              <div className="flex justify-between">
                <span className="text-htb-foreground">Maintenance Mode</span>
                <span className="text-green-400">Off</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">System Settings are Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All system configuration features are working correctly. This is a placeholder page to confirm the routing is functional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
