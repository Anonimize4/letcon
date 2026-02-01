import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown, Award, Medal, Star, Zap, Target,
  Shield, Network, BookOpen, Trophy, Home
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

const PremiumBadges: React.FC = () => {
  const navigate = useNavigate();

  // Mock badges data
  const badges = [
    { id: 1, name: 'First Blood', description: 'First to solve a challenge', icon: '🩸', rarity: 'legendary', earned: true, earnedDate: '2024-01-15' },
    { id: 2, name: 'Quick Solver', description: 'Solve a challenge in under 5 minutes', icon: '⚡', rarity: 'epic', earned: true, earnedDate: '2024-01-20' },
    { id: 3, name: 'Lab Master', description: 'Complete 50 labs', icon: '🎯', rarity: 'epic', earned: true, earnedDate: '2024-02-01' },
    { id: 4, name: 'Streak King', description: 'Maintain a 30-day streak', icon: '🔥', rarity: 'legendary', earned: false },
    { id: 5, name: 'Bug Hunter', description: 'Report 10 valid bugs', icon: '🐛', rarity: 'rare', earned: true, earnedDate: '2024-01-25' },
    { id: 6, name: 'Mentor Hero', description: 'Help 50 other users', icon: '🦸', rarity: 'epic', earned: false },
    { id: 7, name: 'CTF Champion', description: 'Win a CTF competition', icon: '🏆', rarity: 'legendary', earned: false },
    { id: 8, name: 'Learning Addict', description: 'Complete 100 learning modules', icon: '📚', rarity: 'rare', earned: true, earnedDate: '2024-02-10' },
    { id: 9, name: 'Red Team Pro', description: 'Complete all red team labs', icon: '🔴', rarity: 'epic', earned: false },
    { id: 10, name: 'Blue Team Elite', description: 'Complete all blue team labs', icon: '🔵', rarity: 'epic', earned: false },
    { id: 11, name: 'Networking Ninja', description: 'Master all networking labs', icon: '🌐', rarity: 'rare', earned: true, earnedDate: '2024-02-05' },
    { id: 12, name: 'Community Star', description: 'Get 100 upvotes on writeups', icon: '⭐', rarity: 'rare', earned: false },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-500/20 to-amber-500/10 border-yellow-500/50 text-yellow-400';
      case 'epic': return 'from-purple-500/20 to-violet-500/10 border-purple-500/50 text-purple-400';
      case 'rare': return 'from-blue-500/20 to-cyan-500/10 border-blue-500/50 text-blue-400';
      default: return 'from-gray-500/20 to-gray-500/10 border-gray-500/50 text-gray-400';
    }
  };

  const earnedBadges = badges.filter(b => b.earned);
  const unearnedBadges = badges.filter(b => !b.earned);

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
            active
            onClick={() => navigate('/dashboard/premium/badges')}
          />

          <SidebarItem
            icon={<Medal className="h-5 w-5 text-amber-400" />}
            label="Achievements"
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
            <Award className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-htb-bright-white">
              My Badges
            </h1>
          </div>
          <p className="text-lg text-htb-foreground">
            Collect badges by completing challenges and achievements
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">{earnedBadges.length}</div>
            <div className="text-htb-foreground">Badges Earned</div>
          </div>
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-gray-400 mb-2">{unearnedBadges.length}</div>
            <div className="text-htb-foreground">Badges Remaining</div>
          </div>
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">{badges.filter(b => b.rarity === 'legendary').length}</div>
            <div className="text-htb-foreground">Legendary Badges</div>
          </div>
        </div>

        {/* Earned Badges */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-htb-bright-white mb-4">Earned Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className={`bg-gradient-to-br ${getRarityColor(badge.rarity)} rounded-xl p-6 border text-center hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                <div className="text-5xl mb-4">{badge.icon}</div>
                <h3 className="text-lg font-semibold text-htb-bright-white mb-2">{badge.name}</h3>
                <p className="text-sm text-htb-foreground mb-3">{badge.description}</p>
                <span className={`text-xs px-2 py-1 rounded-full bg-opacity-20 capitalize ${
                  badge.rarity === 'legendary' ? 'bg-yellow-500 text-yellow-400' :
                  badge.rarity === 'epic' ? 'bg-purple-500 text-purple-400' :
                  'bg-blue-500 text-blue-400'
                }`}>
                  {badge.rarity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Badges */}
        <div>
          <h2 className="text-2xl font-bold text-htb-bright-white mb-4">Locked Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {unearnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-htb-selection-background/10 border border-htb-selection-background rounded-xl p-6 border-dashed opacity-50 text-center"
              >
                <div className="text-5xl mb-4 grayscale">🔒</div>
                <h3 className="text-lg font-semibold text-htb-bright-white mb-2">{badge.name}</h3>
                <p className="text-sm text-htb-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumBadges;

