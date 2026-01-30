import React from 'react';
import Layout from '../../components/navigation/Layout';

const DashboardPage: React.FC = () => {
  // Mock user data
  const userStats = {
    rank: 42,
    points: 2450,
    completedLabs: 15,
    activeLabs: 3,
    challenges: 28,
    certificates: 2
  };

  // Mock recent activity
  const recentActivity = [
    { type: 'lab', name: 'Web Exploitation Basics', status: 'completed', date: '2 hours ago' },
    { type: 'challenge', name: 'SQL Injection Challenge', status: 'completed', date: '1 day ago' },
    { type: 'lab', name: 'Network Security Fundamentals', status: 'in-progress', date: '2 days ago' },
    { type: 'achievement', name: 'First Blood Badge', status: 'earned', date: '3 days ago' }
  ];

  // Mock upcoming events
  const upcomingEvents = [
    { name: 'Weekly CTF', date: 'Friday, 8:00 PM', type: 'competition' },
    { name: 'Live Workshop: Advanced XSS', date: 'Saturday, 6:00 PM', type: 'workshop' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-htb-bright-white mb-2">
            Welcome back, User!
          </h1>
          <p className="text-htb-foreground">
            Track your progress and continue your cybersecurity journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-htb-selection-background/10 rounded-xl p-4 border border-htb-selection-background">
            <div className="text-2xl font-bold text-htb-bright-white mb-1">{userStats.rank}</div>
            <div className="text-xs text-htb-foreground">Global Rank</div>
          </div>
          <div className="bg-htb-selection-background/10 rounded-xl p-4 border border-htb-selection-background">
            <div className="text-2xl font-bold text-htb-green mb-1">{userStats.points.toLocaleString()}</div>
            <div className="text-xs text-htb-foreground">Total Points</div>
          </div>
          <div className="bg-htb-selection-background/10 rounded-xl p-4 border border-htb-selection-background">
            <div className="text-2xl font-bold text-htb-blue mb-1">{userStats.completedLabs}</div>
            <div className="text-xs text-htb-foreground">Completed Labs</div>
          </div>
          <div className="bg-htb-selection-background/10 rounded-xl p-4 border border-htb-selection-background">
            <div className="text-2xl font-bold text-htb-yellow mb-1">{userStats.activeLabs}</div>
            <div className="text-xs text-htb-foreground">Active Labs</div>
          </div>
          <div className="bg-htb-selection-background/10 rounded-xl p-4 border border-htb-selection-background">
            <div className="text-2xl font-bold text-htb-purple mb-1">{userStats.challenges}</div>
            <div className="text-xs text-htb-foreground">Challenges</div>
          </div>
          <div className="bg-htb-selection-background/10 rounded-xl p-4 border border-htb-selection-background">
            <div className="text-2xl font-bold text-htb-cyan mb-1">{userStats.certificates}</div>
            <div className="text-xs text-htb-foreground">Certificates</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Activity & Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <div className="bg-htb-selection-background/10 rounded-xl p-6 border border-htb-selection-background">
              <h2 className="text-xl font-semibold text-htb-bright-white mb-4">Your Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-htb-foreground">Web Exploitation</span>
                    <span className="text-htb-green">75%</span>
                  </div>
                  <div className="h-2 bg-htb-selection-background rounded-full overflow-hidden">
                    <div className="h-full bg-htb-green rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-htb-foreground">Network Security</span>
                    <span className="text-htb-blue">45%</span>
                  </div>
                  <div className="h-2 bg-htb-selection-background rounded-full overflow-hidden">
                    <div className="h-full bg-htb-blue rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-htb-foreground">Reverse Engineering</span>
                    <span className="text-htb-purple">20%</span>
                  </div>
                  <div className="h-2 bg-htb-selection-background rounded-full overflow-hidden">
                    <div className="h-full bg-htb-purple rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-htb-selection-background/10 rounded-xl p-6 border border-htb-selection-background">
              <h2 className="text-xl font-semibold text-htb-bright-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-htb-selection-background/20 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.status === 'completed' ? 'bg-htb-green/20' :
                        activity.status === 'in-progress' ? 'bg-htb-blue/20' : 'bg-htb-yellow/20'
                      }`}>
                        {activity.status === 'completed' ? (
                          <svg className="w-5 h-5 text-htb-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : activity.status === 'in-progress' ? (
                          <svg className="w-5 h-5 text-htb-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-htb-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-htb-bright-white font-medium">{activity.name}</p>
                        <p className="text-xs text-htb-foreground capitalize">{activity.type} • {activity.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === 'completed' ? 'bg-htb-green/20 text-htb-green' :
                      activity.status === 'in-progress' ? 'bg-htb-blue/20 text-htb-blue' : 'bg-htb-yellow/20 text-htb-yellow'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 text-sm text-htb-blue hover:text-htb-bright-blue transition-colors">
                View All Activity →
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-htb-selection-background/10 rounded-xl p-6 border border-htb-selection-background">
              <h2 className="text-xl font-semibold text-htb-bright-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-htb-blue hover:bg-htb-bright-blue text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                  Start New Lab
                </button>
                <button className="w-full bg-htb-selection-background/20 hover:bg-htb-selection-background/40 text-htb-bright-white font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-htb-selection-background">
                  Join CTF
                </button>
                <button className="w-full bg-htb-selection-background/20 hover:bg-htb-selection-background/40 text-htb-bright-white font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-htb-selection-background">
                  Browse Learning Paths
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-htb-selection-background/10 rounded-xl p-6 border border-htb-selection-background">
              <h2 className="text-xl font-semibold text-htb-bright-white mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 rounded-lg bg-htb-selection-background/20 border border-htb-selection-background">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        event.type === 'competition' ? 'bg-htb-red/20' : 'bg-htb-purple/20'
                      }`}>
                        {event.type === 'competition' ? (
                          <svg className="w-4 h-4 text-htb-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-htb-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-htb-bright-white font-medium">{event.name}</p>
                        <p className="text-xs text-htb-foreground">{event.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-htb-selection-background/10 rounded-xl p-6 border border-htb-selection-background">
              <h2 className="text-xl font-semibold text-htb-bright-white mb-4">Recent Achievements</h2>
              <div className="flex flex-wrap gap-3">
                {['🏆 First Blood', '🔥 7-Day Streak', '💀 Root Access', '🔓 Crypto Master'].map((achievement, index) => (
                  <div key={index} className="px-3 py-2 rounded-lg bg-htb-selection-background/20 border border-htb-selection-background text-sm text-htb-bright-white">
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;

