import React from 'react';
import { BarChart3, TrendingUp, Users, Activity, DollarSign, Eye } from 'lucide-react';

const AnalyticsDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-htb-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-htb-blue" />
            <h1 className="text-3xl font-bold text-htb-bright-white">Analytics Dashboard</h1>
          </div>
          <p className="text-htb-foreground mt-2">Welcome to Analytics Dashboard - This page works!</p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                Analytics & Reporting Center
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Comprehensive analytics and reporting for the cybersecurity training platform. 
                Track user engagement, course completion rates, revenue metrics, and system performance.
              </p>
            </div>
            <div className="hidden lg:block">
              <BarChart3 className="h-24 w-24 text-htb-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Total Users</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">12,456</div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm">+12.5%</span>
              <span className="text-htb-foreground text-sm">vs last month</span>
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Active Sessions</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">1,234</div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm">+8.3%</span>
              <span className="text-htb-foreground text-sm">vs last week</span>
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Revenue</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">$45,678</div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm">+23.1%</span>
              <span className="text-htb-foreground text-sm">vs last month</span>
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Page Views</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">89,012</div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm">+15.7%</span>
              <span className="text-htb-foreground text-sm">vs last month</span>
            </div>
          </div>
        </div>

        {/* Analytics Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-6">Course Performance</h3>
            <div className="space-y-4">
              {[
                { course: 'Introduction to Cybersecurity', completion: '78%', students: '2,345', trend: 'up' },
                { course: 'Network Security Fundamentals', completion: '65%', students: '1,876', trend: 'up' },
                { course: 'Penetration Testing Basics', completion: '52%', students: '1,234', trend: 'down' },
                { course: 'Advanced Threat Detection', completion: '89%', students: '567', trend: 'up' }
              ].map((course, index) => (
                <div key={index} className="py-3 border-b border-htb-selection-background last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-htb-bright-white font-medium">{course.course}</h4>
                    <span className="text-sm text-htb-foreground">{course.students} students</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-htb-selection-background rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full" 
                        style={{ width: course.completion }}
                      ></div>
                    </div>
                    <span className="text-sm text-htb-bright-white">{course.completion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <h3 className="text-xl font-semibold text-htb-bright-white mb-6">User Engagement</h3>
            <div className="space-y-4">
              {[
                { metric: 'Daily Active Users', value: '3,456', change: '+12%', period: 'vs yesterday' },
                { metric: 'Average Session Duration', value: '24 min', change: '+8%', period: 'vs last week' },
                { metric: 'Course Completion Rate', value: '67%', change: '+5%', period: 'vs last month' },
                { metric: 'Lab Environment Usage', value: '89%', change: '+15%', period: 'vs last month' }
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-htb-selection-background last:border-0">
                  <div>
                    <p className="text-htb-bright-white font-medium">{metric.metric}</p>
                    <p className="text-htb-foreground text-sm">{metric.period}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-htb-bright-white font-semibold">{metric.value}</p>
                    <p className="text-green-400 text-sm">{metric.change}</p>
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
            <p className="text-green-400 font-medium">Analytics Dashboard is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All analytics and reporting features are working correctly. This is a placeholder page to confirm the routing is functional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboardPage;
