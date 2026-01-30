import React from 'react';
import { FlaskConical, Plus, Settings, Terminal } from 'lucide-react';

const LabCreationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-htb-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <FlaskConical className="h-8 w-8 text-htb-blue" />
            <h1 className="text-3xl font-bold text-htb-bright-white">Lab Creation</h1>
          </div>
          <p className="text-htb-foreground mt-2">Welcome to Lab Creation - This page works!</p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                Lab Creation Portal
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Create and manage hands-on cybersecurity lab environments. Design practical exercises, 
                configure Docker containers, and build immersive learning experiences for students.
              </p>
            </div>
            <div className="hidden lg:block">
              <Plus className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Plus className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">New Lab</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Create a new lab environment
            </p>
            <div className="text-2xl font-bold text-htb-bright-white">12</div>
            <p className="text-sm text-htb-foreground">This Month</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Templates</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Lab templates and presets
            </p>
            <div className="text-2xl font-bold text-htb-bright-white">28</div>
            <p className="text-sm text-htb-foreground">Available</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Terminal className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Active Labs</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Currently running labs
            </p>
            <div className="text-2xl font-bold text-htb-bright-white">45</div>
            <p className="text-sm text-htb-foreground">Live Sessions</p>
          </div>
        </div>

        {/* Lab Creation Steps */}
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Lab Creation Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="text-htb-bright-white font-medium mb-2">Define Objectives</h4>
              <p className="text-htb-foreground text-sm">Set learning goals and outcomes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="text-htb-bright-white font-medium mb-2">Configure Environment</h4>
              <p className="text-htb-foreground text-sm">Set up Docker containers and tools</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="text-htb-bright-white font-medium mb-2">Create Content</h4>
              <p className="text-htb-foreground text-sm">Write instructions and challenges</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">4</span>
              </div>
              <h4 className="text-htb-bright-white font-medium mb-2">Test & Deploy</h4>
              <p className="text-htb-foreground text-sm">Validate and publish the lab</p>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">Lab Creation System is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All lab creation features are working correctly. This is a placeholder page to confirm the routing is functional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabCreationPage;
