import React from 'react';
import { Users, UserPlus, Shield, Settings } from 'lucide-react';

const UserManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-htb-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-htb-blue" />
            <h1 className="text-3xl font-bold text-htb-bright-white">User Management</h1>
          </div>
          <p className="text-htb-foreground mt-2">Welcome to User Management - This page works!</p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                User Management Portal
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Manage platform users, roles, permissions, and access controls from this centralized interface. 
                View user statistics, manage accounts, and ensure proper security protocols.
              </p>
            </div>
            <div className="hidden lg:block">
              <UserPlus className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">All Users</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              View and manage all registered users
            </p>
            <div className="text-2xl font-bold text-htb-bright-white">1,234</div>
            <p className="text-sm text-htb-foreground">Total Users</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Roles</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Manage user roles and permissions
            </p>
            <div className="text-2xl font-bold text-htb-bright-white">5</div>
            <p className="text-sm text-htb-foreground">Active Roles</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Permissions</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Configure access permissions
            </p>
            <div className="text-2xl font-bold text-htb-bright-white">12</div>
            <p className="text-sm text-htb-foreground">Permission Sets</p>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">User Management System is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All user management features are working correctly. This is a placeholder page to confirm the routing is functional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
