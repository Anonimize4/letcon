import React from 'react';
import { Activity, Cpu, HardDrive, Wifi, Server, AlertTriangle } from 'lucide-react';

const SystemMonitorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-htb-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-htb-blue" />
            <h1 className="text-3xl font-bold text-htb-bright-white">System Monitor</h1>
          </div>
          <p className="text-htb-foreground mt-2">Welcome to System Monitor - This page works!</p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                System Monitoring Dashboard
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Real-time monitoring of platform performance, resource usage, and system health. 
                Track server metrics, monitor application performance, and ensure optimal system operation.
              </p>
            </div>
            <div className="hidden lg:block">
              <Server className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Cpu className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">CPU Usage</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">45%</div>
            <div className="w-full bg-htb-selection-background rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-sm text-htb-foreground mt-2">4 cores active</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <HardDrive className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Memory</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">8.2GB</div>
            <div className="w-full bg-htb-selection-background rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-htb-foreground mt-2">12.6GB total</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Wifi className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Network</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">125 MB/s</div>
            <div className="flex justify-between text-sm text-htb-foreground">
              <span>↑ 45 MB/s</span>
              <span>↓ 80 MB/s</span>
            </div>
            <p className="text-sm text-htb-foreground mt-2">Active connections: 234</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Server className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Uptime</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">99.9%</div>
            <div className="text-sm text-htb-foreground">
              <p>Last reboot: 15 days ago</p>
              <p>Total uptime: 342 days</p>
            </div>
          </div>
        </div>

        {/* Service Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Service Status</h3>
            <div className="space-y-4">
              {[
                { service: 'API Server', status: 'Operational', color: 'text-green-400', bgColor: 'bg-green-400' },
                { service: 'Database', status: 'Operational', color: 'text-green-400', bgColor: 'bg-green-400' },
                { service: 'Redis Cache', status: 'Operational', color: 'text-green-400', bgColor: 'bg-green-400' },
                { service: 'Docker Engine', status: 'Operational', color: 'text-green-400', bgColor: 'bg-green-400' },
                { service: 'Load Balancer', status: 'Maintenance', color: 'text-yellow-400', bgColor: 'bg-yellow-400' }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-htb-selection-background last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${service.bgColor} ${service.bgColor === 'bg-green-400' ? 'animate-pulse' : ''}`}></div>
                    <div>
                      <p className="text-htb-bright-white font-medium">{service.service}</p>
                      <p className="text-htb-foreground text-sm">Status: <span className={service.color}>{service.status}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-htb-foreground">Response: <span className="text-htb-bright-white">45ms</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Recent Alerts</h3>
            <div className="space-y-4">
              {[
                { type: 'warning', message: 'High memory usage detected', time: '5 minutes ago', icon: AlertTriangle },
                { type: 'info', message: 'Scheduled backup completed', time: '1 hour ago', icon: Activity },
                { type: 'success', message: 'System update installed', time: '2 hours ago', icon: Server },
                { type: 'warning', message: 'Disk space running low', time: '3 hours ago', icon: AlertTriangle }
              ].map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 py-3 border-b border-htb-selection-background last:border-0">
                  <alert.icon className={`h-5 w-5 mt-0.5 ${
                    alert.type === 'warning' ? 'text-yellow-400' : 
                    alert.type === 'success' ? 'text-green-400' : 'text-blue-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-htb-bright-white text-sm">{alert.message}</p>
                    <p className="text-htb-foreground text-xs mt-1">{alert.time}</p>
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
            <p className="text-green-400 font-medium">System Monitoring is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All monitoring features are working correctly. This is a placeholder page to confirm the routing is functional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitorPage;
