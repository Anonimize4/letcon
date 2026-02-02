import React, { useState } from 'react';
import { LayoutDashboard, BarChart3, Users, Settings, Activity } from 'lucide-react';
import AdminSidebar, { AdminSidebarToggle } from '../../components/navigation/AdminSidebar';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-htb-background flex">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center h-16 px-4 border-b border-htb-selection-background bg-htb-selection-background/50">
          <AdminSidebarToggle onClick={() => setSidebarOpen(true)} />
          <span className="ml-4 text-lg font-semibold text-htb-bright-white">Admin Dashboard</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-8 w-8 text-htb-blue" />
            <h1 className="text-3xl font-bold text-htb-bright-white">Admin Dashboard</h1>
          </div>
          <p className="text-htb-foreground mt-2">Welcome to Admin Dashboard - This page works!</p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                Administrative Dashboard
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Centralized administration interface for managing the cybersecurity training platform. 
                Monitor system health, manage users, control content, and ensure optimal platform performance.
              </p>
            </div>
            <div className="hidden lg:block">
              <LayoutDashboard className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Users</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">1,234</div>
            <p className="text-sm text-htb-foreground">Total registered</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Active</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">89</div>
            <p className="text-sm text-htb-foreground">Currently online</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Performance</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">98%</div>
            <p className="text-sm text-htb-foreground">System health</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Tasks</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">12</div>
            <p className="text-sm text-htb-foreground">Pending actions</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-4">User Management</h3>
            <p className="text-htb-foreground text-sm mb-4">
              Manage users, roles, and permissions
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-htb-foreground">New users today</span>
                <span className="text-htb-bright-white">23</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-htb-foreground">Active sessions</span>
                <span className="text-htb-bright-white">89</span>
              </div>
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-4">Content Control</h3>
            <p className="text-htb-foreground text-sm mb-4">
              Manage courses, labs, and challenges
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-htb-foreground">Total courses</span>
                <span className="text-htb-bright-white">42</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-htb-foreground">Active labs</span>
                <span className="text-htb-bright-white">156</span>
              </div>
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-4">System Health</h3>
            <p className="text-htb-foreground text-sm mb-4">
              Monitor platform performance and status
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-htb-foreground">CPU usage</span>
                <span className="text-htb-bright-white">45%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-htb-foreground">Memory usage</span>
                <span className="text-htb-bright-white">67%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
          <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New user registration', user: 'john.doe@example.com', time: '5 minutes ago', type: 'info' },
              { action: 'Lab environment created', user: 'admin@system.com', time: '15 minutes ago', type: 'success' },
              { action: 'System backup completed', user: 'system', time: '1 hour ago', type: 'success' },
              { action: 'Security policy updated', user: 'admin@system.com', time: '2 hours ago', type: 'warning' },
              { action: 'New course published', user: 'instructor@platform.com', time: '3 hours ago', type: 'info' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-htb-selection-background last:border-0">
                <div className="flex-1">
                  <p className="text-htb-bright-white font-medium">{activity.action}</p>
                  <p className="text-htb-foreground text-sm">{activity.user} • {activity.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-400' : 
                  activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">Admin Dashboard is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All administrative features are working correctly. This is a placeholder page to confirm the routing is functional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
