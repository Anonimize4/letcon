import React from 'react';
import { TrendingUp, TrendingDown, Award, Target, Calendar, Clock } from 'lucide-react';

interface AnalyticsData {
  totalPoints: number;
  rank: number;
  labsCompleted: number;
  challengesSolved: number;
  streak: number;
  weeklyProgress: { day: string; hours: number }[];
  skillsBreakdown: { skill: string; progress: number; level: string }[];
  achievements: { id: string; title: string; icon: string; date: string }[];
}

const PremiumAnalytics: React.FC = () => {
  const analytics: AnalyticsData = {
    totalPoints: 15420,
    rank: 156,
    labsCompleted: 48,
    challengesSolved: 234,
    streak: 12,
    weeklyProgress: [
      { day: 'Mon', hours: 2.5 },
      { day: 'Tue', hours: 3.0 },
      { day: 'Wed', hours: 1.5 },
      { day: 'Thu', hours: 4.0 },
      { day: 'Fri', hours: 2.0 },
      { day: 'Sat', hours: 5.5 },
      { day: 'Sun', hours: 3.0 }
    ],
    skillsBreakdown: [
      { skill: 'Network Security', progress: 85, level: 'Expert' },
      { skill: 'Web Application', progress: 72, level: 'Advanced' },
      { skill: 'Reverse Engineering', progress: 58, level: 'Intermediate' },
      { skill: 'Cryptography', progress: 65, level: 'Advanced' },
      { skill: 'Social Engineering', progress: 45, level: 'Intermediate' }
    ],
    achievements: [
      { id: '1', title: 'First Blood', icon: '🩸', date: '2024-01-15' },
      { id: '2', title: 'Lab Master', icon: '🏆', date: '2024-02-01' },
      { id: '3', title: '7 Day Streak', icon: '🔥', date: '2024-02-10' },
      { id: '4', title: 'Bug Hunter', icon: '🐛', date: '2024-02-15' }
    ]
  };

  const maxHours = Math.max(...analytics.weeklyProgress.map(d => d.hours));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-htb-bright-white">Analytics Dashboard</h2>
          <p className="text-htb-foreground">Track your learning progress and achievements</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-htb-cyan" />
          <span className="text-htb-foreground">Last 30 Days</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-htb-gold/20 to-htb-purple/10 rounded-xl p-6 border border-htb-gold/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-htb-gold/20 rounded-lg">
              <Award className="h-6 w-6 text-htb-gold" />
            </div>
            <div className="flex items-center text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+12%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{analytics.totalPoints.toLocaleString()}</div>
          <div className="text-sm text-white/60">Total Points</div>
        </div>

        <div className="bg-gradient-to-br from-htb-purple/20 to-htb-cyan/10 rounded-xl p-6 border border-htb-purple/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-htb-purple/20 rounded-lg">
              <Target className="h-6 w-6 text-htb-purple" />
            </div>
            <div className="flex items-center text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+8</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">#{analytics.rank}</div>
          <div className="text-sm text-white/60">Global Rank</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Clock className="h-6 w-6 text-green-400" />
            </div>
            <div className="flex items-center text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+3</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{analytics.streak}</div>
          <div className="text-sm text-white/60">Day Streak</div>
        </div>

        <div className="bg-gradient-to-br from-htb-cyan/20 to-htb-cyan/10 rounded-xl p-6 border border-htb-cyan/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-htb-cyan/20 rounded-lg">
              <Award className="h-6 w-6 text-htb-cyan" />
            </div>
            <div className="flex items-center text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+5</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{analytics.challengesSolved}</div>
          <div className="text-sm text-white/60">Challenges Solved</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Weekly Activity</h3>
          <div className="space-y-4">
            {analytics.weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm text-white/60">{day.day}</div>
                <div className="flex-1 bg-htb-selection-background/30 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-htb-gold to-htb-purple rounded-full transition-all duration-500"
                    style={{ width: `${(day.hours / maxHours) * 100}%` }}
                  />
                </div>
                <div className="w-16 text-right text-sm text-white font-medium">{day.hours}h</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-htb-selection-background/30 flex justify-between text-sm text-white/60">
            <span>Total: 21.5 hours</span>
            <span className="text-green-400">↑ 15% vs last week</span>
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Skills Progress</h3>
          <div className="space-y-4">
            {analytics.skillsBreakdown.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">{skill.skill}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      skill.level === 'Expert' ? 'bg-red-500/20 text-red-400' :
                      skill.level === 'Advanced' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                  <span className="text-sm text-white/60">{skill.progress}%</span>
                </div>
                <div className="bg-htb-selection-background/30 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-htb-cyan to-htb-purple rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Recent Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {analytics.achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className="bg-gradient-to-br from-htb-gold/20 to-htb-purple/10 rounded-lg p-4 border border-htb-gold/30 text-center hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="text-4xl mb-3">{achievement.icon}</div>
              <div className="text-sm font-medium text-white mb-1">{achievement.title}</div>
              <div className="text-xs text-white/60">{achievement.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumAnalytics;

