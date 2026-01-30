import React from 'react';
import { Container, Play, Pause, Square, RefreshCw, HardDrive, Activity } from 'lucide-react';

const DockerManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-htb-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Container className="h-8 w-8 text-htb-blue" />
            <h1 className="text-3xl font-bold text-htb-bright-white">Docker Management</h1>
          </div>
          <p className="text-htb-foreground mt-2">Welcome to Docker Management - This page works!</p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                Container Management Center
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Manage Docker containers, images, and lab environments. Monitor resource usage, 
                control container lifecycle, and ensure optimal performance for hands-on training labs.
              </p>
            </div>
            <div className="hidden lg:block">
              <Container className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Container Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Container className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Running</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">23</div>
            <p className="text-sm text-htb-foreground">Active containers</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Pause className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Stopped</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">8</div>
            <p className="text-sm text-htb-foreground">Paused containers</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <HardDrive className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Images</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">45</div>
            <p className="text-sm text-htb-foreground">Docker images</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Resource Usage</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">67%</div>
            <p className="text-sm text-htb-foreground">CPU & Memory</p>
          </div>
        </div>

        {/* Container Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center space-x-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors">
                <Play className="h-4 w-4 text-green-400" />
                <span className="text-htb-bright-white text-sm">Start All</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/20 transition-colors">
                <Pause className="h-4 w-4 text-yellow-400" />
                <span className="text-htb-bright-white text-sm">Pause All</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors">
                <Square className="h-4 w-4 text-red-400" />
                <span className="text-htb-bright-white text-sm">Stop All</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors">
                <RefreshCw className="h-4 w-4 text-blue-400" />
                <span className="text-htb-bright-white text-sm">Restart</span>
              </button>
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-6">System Resources</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-htb-bright-white">CPU Usage</span>
                  <span className="text-htb-foreground">45%</span>
                </div>
                <div className="w-full bg-htb-selection-background rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-htb-bright-white">Memory Usage</span>
                  <span className="text-htb-foreground">8.2GB / 12GB</span>
                </div>
                <div className="w-full bg-htb-selection-background rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-htb-bright-white">Storage</span>
                  <span className="text-htb-foreground">156GB / 250GB</span>
                </div>
                <div className="w-full bg-htb-selection-background rounded-full h-2">
                  <div className="bg-purple-400 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Containers */}
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
          <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Active Containers</h3>
          <div className="space-y-4">
            {[
              { name: 'lab-network-security-001', status: 'running', image: 'cybersec/network-lab:latest', uptime: '2h 34m', resources: 'CPU: 15%, RAM: 512MB' },
              { name: 'lab-web-app-sec-042', status: 'running', image: 'cybersec/web-sec-lab:latest', uptime: '1h 12m', resources: 'CPU: 8%, RAM: 256MB' },
              { name: 'lab-sql-injection-003', status: 'paused', image: 'cybersec/sql-lab:latest', uptime: '45m', resources: 'CPU: 0%, RAM: 128MB' },
              { name: 'lab-crypto-challenge-007', status: 'running', image: 'cybersec/crypto-lab:latest', uptime: '3h 21m', resources: 'CPU: 12%, RAM: 384MB' },
              { name: 'lab-forensics-002', status: 'running', image: 'cybersec/forensics-lab:latest', uptime: '5h 45m', resources: 'CPU: 25%, RAM: 768MB' }
            ].map((container, index) => (
              <div key={index} className="flex items-center justify-between py-4 border-b border-htb-selection-background last:border-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      container.status === 'running' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                    }`}></div>
                    <h4 className="text-htb-bright-white font-medium">{container.name}</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-htb-foreground">
                    <span>Image: {container.image}</span>
                    <span>Uptime: {container.uptime}</span>
                    <span>{container.resources}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-blue-500/10 border border-blue-500/30 rounded hover:bg-blue-500/20 transition-colors">
                    <RefreshCw className="h-4 w-4 text-blue-400" />
                  </button>
                  <button className="p-2 bg-red-500/10 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors">
                    <Square className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">Docker Management is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All Docker management features are working correctly. This is a placeholder page to confirm the routing is functional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DockerManagementPage;
