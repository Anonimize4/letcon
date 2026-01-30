import React from 'react';
import { Eye, FileText, Search, Filter, Download, Calendar, User, Activity } from 'lucide-react';

const AuditLogsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-htb-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Eye className="h-8 w-8 text-htb-blue" />
            <h1 className="text-3xl font-bold text-htb-bright-white">Audit Logs</h1>
          </div>
          <p className="text-htb-foreground mt-2">Welcome to Audit Logs - This page works!</p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                System Audit Trail
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Comprehensive audit logging for all system activities and user actions. 
                Track security events, monitor administrative changes, and maintain compliance records.
              </p>
            </div>
            <div className="hidden lg:block">
              <Eye className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Log Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Total Logs</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">1.2M</div>
            <p className="text-sm text-htb-foreground">All time records</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Today</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">3,456</div>
            <p className="text-sm text-htb-foreground">Events logged</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <User className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Active Users</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">892</div>
            <p className="text-sm text-htb-foreground">Unique today</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Retention</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">90 days</div>
            <p className="text-sm text-htb-foreground">Log retention period</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-htb-foreground" />
                <input
                  type="text"
                  placeholder="Search audit logs..."
                  className="pl-10 pr-4 py-2 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white placeholder-htb-foreground focus:outline-none focus:border-htb-blue"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-htb-blue/10 border border-htb-blue/30 rounded-lg text-htb-blue hover:bg-htb-blue/20 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Recent Audit Logs */}
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
          <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Recent Audit Events</h3>
          <div className="space-y-4">
            {[
              {
                timestamp: '2024-01-30 14:35:22',
                user: 'admin@system.com',
                action: 'User role modified',
                target: 'user@example.com',
                ip: '192.168.1.100',
                severity: 'warning',
                details: 'Changed role from student to instructor'
              },
              {
                timestamp: '2024-01-30 14:32:15',
                user: 'john.doe@example.com',
                action: 'Lab environment accessed',
                target: 'Network Security Lab #42',
                ip: '10.0.0.45',
                severity: 'info',
                details: 'Started lab session'
              },
              {
                timestamp: '2024-01-30 14:28:09',
                user: 'system',
                action: 'Backup completed',
                target: 'Database',
                ip: 'localhost',
                severity: 'success',
                details: 'Automated daily backup successful'
              },
              {
                timestamp: '2024-01-30 14:25:33',
                user: 'jane.smith@example.com',
                action: 'Challenge completed',
                target: 'SQL Injection - Level 3',
                ip: '172.16.0.23',
                severity: 'info',
                details: 'Completed with score: 95%'
              },
              {
                timestamp: '2024-01-30 14:22:18',
                user: 'admin@system.com',
                action: 'Security policy updated',
                target: 'Password Policy',
                ip: '192.168.1.100',
                severity: 'warning',
                details: 'Updated minimum password length to 12 characters'
              },
              {
                timestamp: '2024-01-30 14:18:45',
                user: 'mike.johnson@example.com',
                action: 'Failed login attempt',
                target: 'Authentication System',
                ip: '203.0.113.45',
                severity: 'error',
                details: 'Invalid password - 3rd consecutive failure'
              }
            ].map((log, index) => (
              <div key={index} className="flex items-start space-x-4 py-4 border-b border-htb-selection-background last:border-0">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  log.severity === 'error' ? 'bg-red-400' : 
                  log.severity === 'warning' ? 'bg-yellow-400' : 
                  log.severity === 'success' ? 'bg-green-400' : 'bg-blue-400'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-htb-bright-white font-medium">{log.action}</span>
                        <span className="text-htb-foreground text-sm">by</span>
                        <span className="text-htb-blue text-sm">{log.user}</span>
                      </div>
                      <p className="text-htb-foreground text-sm mb-1">{log.details}</p>
                      <div className="flex items-center space-x-4 text-xs text-htb-foreground">
                        <span>Target: {log.target}</span>
                        <span>IP: {log.ip}</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      log.severity === 'error' ? 'bg-red-500/20 text-red-400' : 
                      log.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : 
                      log.severity === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {log.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">Audit Logging System is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All audit logging features are working correctly. This is a placeholder page to confirm the routing is functional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsPage;
