import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown, Award, Medal, Star, Zap, Target,
  Shield, Network, BookOpen, Trophy, Home,
  TrendingUp, Clock, Target as TargetIcon, CheckCircle
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active
        ? 'bg-yellow-500/20 text-yellow-400'
        : 'text-htb-foreground hover:bg-htb-selection-background/50 hover:text-htb-bright-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const PremiumAchievements: React.FC = () => {
  const navigate = useNavigate();

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: 'Lab Warrior',
      description: 'Complete 100 hands-on labs',
      progress: 75,
      target: 100,
      icon: '🎯',
      reward: '500 XP',
      completed: false
    },
    {
      id: 2,
      title: 'Streak Master',
      description: 'Maintain a 30-day learning streak',
      progress: 7,
      target: 30,
      icon: '🔥',
      reward: '1000 XP',
      completed: false
    },
    {
      id: 3,
      title: 'Challenge Champion',
      description: 'Solve 50 cybersecurity challenges',
      progress: 42,
      target: 50,
      icon: '🏆',
      reward: '750 XP',
      completed: false
    },
    {
      id: 4,
      title: 'CTF Winner',
      description: 'Place 1st in a CTF competition',
      progress: 0,
      target: 1,
      icon: '🚩',
      reward: '2000 XP',
      completed: false
    },
    {
      id: 5,
      title: 'Mentor Support',
      description: 'Help 25 other learners with questions',
      progress: 25,
      target: 25,
      icon: '🤝',
      reward: '600 XP',
      completed: true
    },
    {
      id: 6,
      title: 'Learning Scholar',
      description: 'Complete all modules in a learning path',
      progress: 3,
      target: 5,
      icon: '📚',
      reward: '800 XP',
      completed: false
    },
    {
      id: 7,
      title: 'Speed Demon',
      description: 'Solve 10 challenges in under 10 minutes each',
      progress: 6,
      target: 10,
      icon: '⚡',
      reward: '400 XP',
      completed: false
    },
    {
      id: 8,
      title: 'Perfect Score',
      description: 'Get 100% on 5 challenge categories',
      progress: 2,
      target: 5,
      icon: '💯',
      reward: '900 XP',
      completed: false
    },
    {
      id: 9,
      title: 'Bug Bounty Hunter',
      description: 'Submit 10 valid vulnerability reports',
      progress: 10,
      target: 10,
      icon: '🐛',
      reward: '1500 XP',
      completed: true
    },
    {
      id: 10,
      title: 'Red Team Specialist',
      description: 'Complete all red team attack scenarios',
      progress: 8,
      target: 10,
      icon: '🔴',
      reward: '1200 XP',
      completed: false
    },
    {
      id: 11,
      title: 'Blue Team Guardian',
      description: 'Complete all blue team defense scenarios',
      progress: 6,
      target: 10,
      icon: '🔵',
      reward: '1200 XP',
      completed: false
    },
    {
      id: 12,
      title: 'Community Leader',
      description: 'Receive 100 upvotes on your writeups',
      progress: 45,
      target: 100,
      icon: '⭐',
      reward: '700 XP',
      completed: false
    }
  ];

  const completedAchievements = achievements.filter(a => a.completed);
  const inProgressAchievements = achievements.filter(a => !a.completed);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-htb-background border-r border-htb-selection-background flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Crown className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-htb-bright-white">Premium</h2>
          </div>

          <SidebarItem
            icon={<Home className="h-5 w-5" />}
            label="Home"
            onClick={() => navigate('/dashboard/premium')}
          />

          <SidebarItem
            icon={<Award className="h-5 w-5 text-yellow-400" />}
            label="Badges"
            onClick={() => navigate('/dashboard/premium/badges')}
          />

          <SidebarItem
            icon={<Medal className="h-5 w-5 text-amber-400" />}
            label="Achievements"
            active
            onClick={() => navigate('/dashboard/premium/achievements')}
          />

          <SidebarItem
            icon={<Star className="h-5 w-5 text-green-400" />}
            label="Certificates"
            onClick={() => navigate('/dashboard/premium/certificates')}
          />

          <div className="mt-6 pt-6 border-t border-htb-selection-background">
            <p className="px-4 text-xs text-htb-foreground uppercase tracking-wider mb-2">
              Training
            </p>
            <SidebarItem
              icon={<Target className="h-5 w-5" />}
              label="Red Team"
              onClick={() => navigate('/dashboard/red-team')}
            />
            <SidebarItem
              icon={<Shield className="h-5 w-5" />}
              label="Blue Team"
              onClick={() => navigate('/dashboard/blue-team')}
            />
            <SidebarItem
              icon={<Network className="h-5 w-5" />}
              label="Networking"
              onClick={() => navigate('/dashboard/networking')}
            />
            <SidebarItem
              icon={<Trophy className="h-5 w-5" />}
              label="Challenges"
              onClick={() => navigate('/challenges')}
            />
            <SidebarItem
              icon={<BookOpen className="h-5 w-5" />}
              label="Academy"
              onClick={() => navigate('/learning')}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Medal className="h-8 w-8 text-amber-400" />
            <h1 className="text-4xl font-bold text-htb-bright-white">
              My Achievements
            </h1>
          </div>
          <p className="text-lg text-htb-foreground">
            Track your progress and unlock rewards
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">{completedAchievements.length}</div>
            <div className="text-htb-foreground">Completed</div>
          </div>
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">{inProgressAchievements.length}</div>
            <div className="text-htb-foreground">In Progress</div>
          </div>
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {Math.round((completedAchievements.length / achievements.length) * 100)}%
            </div>
            <div className="text-htb-foreground">Completion Rate</div>
          </div>
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">5,250</div>
            <div className="text-htb-foreground">Total XP Earned</div>
          </div>
        </div>

        {/* Completed Achievements */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-htb-bright-white mb-4 flex items-center">
            <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
            Completed Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-6 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-htb-bright-white">{achievement.title}</h3>
                      <p className="text-sm text-htb-foreground">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-semibold">{achievement.reward}</div>
                    <div className="text-xs text-green-400">Completed!</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Achievements */}
        <div>
          <h2 className="text-2xl font-bold text-htb-bright-white mb-4 flex items-center">
            <TrendingUp className="h-6 w-6 text-blue-400 mr-2" />
            In Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inProgressAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-htb-selection-background/10 border border-htb-selection-background rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-htb-bright-white">{achievement.title}</h3>
                      <p className="text-sm text-htb-foreground">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-semibold">{achievement.reward}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-htb-foreground">Progress</span>
                    <span className="text-htb-bright-white">{achievement.progress} / {achievement.target}</span>
                  </div>
                  <div className="w-full bg-htb-selection-background rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumAchievements;

