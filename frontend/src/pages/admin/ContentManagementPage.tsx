import React from 'react';
import { FileText, FolderOpen, Edit, Upload } from 'lucide-react';

const ContentManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-htb-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-htb-blue" />
            <h1 className="text-3xl font-bold text-htb-bright-white">Content Management</h1>
          </div>
          <p className="text-htb-foreground mt-2">Welcome to Content Management - This page works!</p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                Content Management Portal
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Manage all platform content including learning materials, challenges, labs, and documentation. 
                Create, edit, organize, and publish educational content for the cybersecurity training platform.
              </p>
            </div>
            <div className="hidden lg:block">
              <FolderOpen className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Articles</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Manage learning articles
            </p>
            <div className="text-2xl font-bold text-htb-bright-white">156</div>
            <p className="text-sm text-htb-foreground">Total Articles</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Edit className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Challenges</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Edit cybersecurity challenges
            </p>
            <div className="text-2xl font-bold text-htb-bright-white">89</div>
            <p className="text-sm text-htb-foreground">Active Challenges</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FolderOpen className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Labs</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Manage lab environments
            </p>
            <div className="text-2xl font-bold text-htb-bright-white">42</div>
            <p className="text-sm text-htb-foreground">Lab Modules</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Upload className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Media</h3>
            </div>
            <p className="text-htb-foreground text-sm mb-4">
              Upload and manage media
            </p>
            <div className="text-2xl font-bold text-htb-bright-white">1.2GB</div>
            <p className="text-sm text-htb-foreground">Media Storage</p>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">Content Management System is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All content management features are working correctly. This is a placeholder page to confirm the routing is functional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;
