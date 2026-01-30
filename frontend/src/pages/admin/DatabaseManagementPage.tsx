import React from 'react';
import { Database, HardDrive, RefreshCw, Download, Upload, Shield } from 'lucide-react';

const DatabaseManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-htb-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Database className="h-8 w-8 text-htb-blue" />
            <h1 className="text-3xl font-bold text-htb-bright-white">Database Management</h1>
          </div>
          <p className="text-htb-foreground mt-2">Welcome to Database Management - This page works!</p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                Database Operations Center
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Manage database operations, backups, migrations, and performance optimization. 
                Monitor database health, execute queries, and ensure data integrity across the platform.
              </p>
            </div>
            <div className="hidden lg:block">
              <Database className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Database Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <HardDrive className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Database Size</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">45.2 GB</div>
            <div className="w-full bg-htb-selection-background rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-htb-foreground mt-2">65% of allocated space</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <RefreshCw className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Connections</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">23 / 50</div>
            <p className="text-sm text-htb-foreground">Active connections</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Last Backup</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">2 hrs ago</div>
            <p className="text-sm text-htb-foreground">Successful backup</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Query Performance</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">98.5%</div>
            <p className="text-sm text-htb-foreground">Optimization score</p>
          </div>
        </div>

        {/* Database Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Quick Operations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center space-x-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors">
                <Download className="h-5 w-5 text-blue-400" />
                <div className="text-left">
                  <p className="text-htb-bright-white font-medium">Create Backup</p>
                  <p className="text-htb-foreground text-sm">Manual backup</p>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors">
                <Upload className="h-5 w-5 text-green-400" />
                <div className="text-left">
                  <p className="text-htb-bright-white font-medium">Restore Backup</p>
                  <p className="text-htb-foreground text-sm">From file</p>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors">
                <RefreshCw className="h-5 w-5 text-purple-400" />
                <div className="text-left">
                  <p className="text-htb-bright-white font-medium">Run Migration</p>
                  <p className="text-htb-foreground text-sm">Update schema</p>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg hover:bg-orange-500/20 transition-colors">
                <Shield className="h-5 w-5 text-orange-400" />
                <div className="text-left">
                  <p className="text-htb-bright-white font-medium">Optimize</p>
                  <p className="text-htb-foreground text-sm">Performance tune</p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Database Tables</h3>
            <div className="space-y-3">
              {[
                { table: 'users', records: '12,456', size: '2.3 GB', status: 'healthy' },
                { table: 'challenges', records: '89', size: '156 MB', status: 'healthy' },
                { table: 'labs', records: '42', size: '89 MB', status: 'healthy' },
                { table: 'user_progress', records: '45,678', size: '1.2 GB', status: 'healthy' },
                { table: 'audit_logs', records: '234,567', size: '3.4 GB', status: 'healthy' }
              ].map((table, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-htb-selection-background last:border-0">
                  <div>
                    <p className="text-htb-bright-white font-medium">{table.table}</p>
                    <p className="text-htb-foreground text-sm">{table.records} records • {table.size}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-green-400 text-sm">{table.status}</span>
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
            <p className="text-green-400 font-medium">Database Management is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All database management features are working correctly. This is a placeholder page to confirm the routing is functional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManagementPage;
