import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Shield, 
  Settings, 
  BarChart3, 
  Database, 
  Activity,
  Lock,
  Eye,
  AlertTriangle
} from 'lucide-react';

export const AdminWelcomePage: React.FC = () => {
  const adminStats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Active Sessions',
      value: '89',
      change: '+5%',
      icon: Activity,
      color: 'text-green-400'
    },
    {
      title: 'System Health',
      value: '98%',
      change: 'Stable',
      icon: Shield,
      color: 'text-purple-400'
    },
    {
      title: 'Security Alerts',
      value: '3',
      change: '-2',
      icon: AlertTriangle,
      color: 'text-yellow-400'
    }
  ];

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20'
    },
    {
      title: 'System Settings',
      description: 'Configure system-wide settings',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20'
    },
    {
      title: 'Security Center',
      description: 'Monitor security and access controls',
      icon: Shield,
      href: '/admin/security',
      color: 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View system analytics and reports',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20'
    },
    {
      title: 'Database Management',
      description: 'Manage database and backups',
      icon: Database,
      href: '/admin/database',
      color: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
    },
    {
      title: 'Audit Logs',
      description: 'View system audit logs',
      icon: Eye,
      href: '/admin/audit',
      color: 'bg-pink-500/10 border-pink-500/30 text-pink-400 hover:bg-pink-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-htb-background">
      {/* Header */}
      <div className="border-b border-htb-selection-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-htb-bright-white">Admin Panel</h1>
              <p className="text-htb-foreground mt-1">Welcome back, Administrator</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-htb-selection-background/10 border border-htb-selection-background rounded-lg text-htb-bright-white hover:bg-htb-selection-background/20 transition-colors">
                <Lock className="h-4 w-4" />
                <span>Security</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <div key={index} className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-htb-foreground text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-htb-bright-white mt-1">{stat.value}</p>
                  <p className="text-sm mt-2">
                    <span className={stat.color}>{stat.change}</span>
                    <span className="text-htb-foreground ml-1">from last month</span>
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Welcome Section */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                Welcome to the Admin Dashboard
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                This is your centralized command center for managing the cybersecurity training platform. 
                Monitor system health, manage users, configure settings, and ensure optimal platform performance.
              </p>
            </div>
            <div className="hidden lg:block">
              <Shield className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-htb-bright-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className={`p-6 rounded-lg border transition-all duration-200 card-hover ${action.color}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-opacity-20">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-htb-bright-white mb-1">
                      {action.title}
                    </h3>
                    <p className="text-htb-foreground text-sm">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-lg font-semibold text-htb-bright-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { user: 'John Doe', action: 'Created new lab environment', time: '2 minutes ago' },
                { user: 'Jane Smith', action: 'Updated user permissions', time: '15 minutes ago' },
                { user: 'System', action: 'Backup completed successfully', time: '1 hour ago' },
                { user: 'Mike Johnson', action: 'Modified security settings', time: '2 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-htb-selection-background last:border-0">
                  <div>
                    <p className="text-htb-bright-white font-medium">{activity.action}</p>
                    <p className="text-htb-foreground text-sm">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-lg font-semibold text-htb-bright-white mb-4">System Status</h3>
            <div className="space-y-4">
              {[
                { service: 'API Server', status: 'Operational', color: 'text-green-400' },
                { service: 'Database', status: 'Operational', color: 'text-green-400' },
                { service: 'Docker Containers', status: 'Operational', color: 'text-green-400' },
                { service: 'Authentication', status: 'Maintenance', color: 'text-yellow-400' }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-htb-selection-background last:border-0">
                  <div>
                    <p className="text-htb-bright-white font-medium">{service.service}</p>
                    <p className="text-htb-foreground text-sm">Status: <span className={service.color}>{service.status}</span></p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${service.color} bg-opacity-20`}>
                    <div className={`w-3 h-3 rounded-full ${service.color} animate-pulse`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcomePage;
