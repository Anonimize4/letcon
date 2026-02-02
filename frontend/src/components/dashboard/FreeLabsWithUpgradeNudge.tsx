import React from 'react';
import { Play, Clock, Users, Star, Lock, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FreeLab {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  participants: number;
  icon: string;
}

export const FreeLabsWithUpgradeNudge: React.FC = () => {
  const navigate = useNavigate();
  
  const freeLabs: FreeLab[] = [
    {
      id: '1',
      title: 'Introduction to Ethical Hacking',
      description: 'Learn the basics of ethical hacking and penetration testing',
      difficulty: 'Beginner',
      duration: '2 hours',
      participants: 5420,
      icon: '🔐'
    },
    {
      id: '2',
      title: 'Network Fundamentals',
      description: 'Understand TCP/IP, DNS, and common network protocols',
      difficulty: 'Beginner',
      duration: '3 hours',
      participants: 3890,
      icon: '🌐'
    },
    {
      id: '3',
      title: 'Linux Basics for Security',
      description: 'Essential Linux commands and operations for security professionals',
      difficulty: 'Beginner',
      duration: '4 hours',
      participants: 2340,
      icon: '🐧'
    },
    {
      id: '4',
      title: 'Web Security Basics',
      description: 'Introduction to OWASP Top 10 vulnerabilities',
      difficulty: 'Intermediate',
      duration: '3 hours',
      participants: 4560,
      icon: '🔒'
    },
    {
      id: '5',
      title: 'Password Security',
      description: 'Learn about password hashing, cracking, and best practices',
      difficulty: 'Intermediate',
      duration: '2 hours',
      participants: 1890,
      icon: '🔑'
    },
    {
      id: '6',
      title: 'Reconnaissance Techniques',
      description: 'Passive and active information gathering methods',
      difficulty: 'Intermediate',
      duration: '3 hours',
      participants: 1670,
      icon: '🔍'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-htb-bright-white">Free Labs</h2>
          <p className="text-htb-foreground">Get started with these beginner-friendly labs</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-htb-foreground">Limited Access</span>
          <Lock className="h-5 w-5 text-htb-foreground" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">12</div>
          <div className="text-sm text-htb-foreground">Available Labs</div>
        </div>
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">3</div>
          <div className="text-sm text-htb-foreground">Completed</div>
        </div>
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">156</div>
          <div className="text-sm text-htb-foreground">Available in Pro</div>
        </div>
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">85%</div>
          <div className="text-sm text-htb-foreground">Success Rate</div>
        </div>
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freeLabs.map((lab) => (
          <div 
            key={lab.id} 
            className="bg-gradient-to-br from-htb-selection-background/20 to-htb-selection-background/10 rounded-xl p-6 border border-htb-selection-background hover:border-htb-cyan hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer group relative"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{lab.icon}</div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lab.difficulty)}`}>
                {lab.difficulty}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-htb-cyan transition-colors">
              {lab.title}
            </h3>
            
            <p className="text-white/80 text-sm mb-4 line-clamp-2">
              {lab.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-white/60 mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{lab.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{lab.participants.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 bg-htb-cyan/20 text-htb-cyan hover:bg-htb-cyan hover:text-htb-background"
            >
              <Play className="h-4 w-4" />
              <span>Start Lab</span>
            </button>
          </div>
        ))}
      </div>

      {/* Upgrade Nudge */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-yellow-500/20 rounded-full">
              <Crown className="h-8 w-8 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-htb-bright-white mb-2">
                Unlock All Premium Labs
              </h3>
              <p className="text-htb-foreground">
                Get unlimited access to 156+ advanced labs, including network pentesting, 
                cloud security, malware analysis, and more.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/pricing')}
            className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-htb-background rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-200"
          >
            <Crown className="h-5 w-5" />
            <span>Upgrade to Pro</span>
          </button>
        </div>
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="bg-htb-selection-background/10 border border-htb-selection-background hover:border-htb-cyan text-htb-bright-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
          Load More Free Labs
        </button>
      </div>
    </div>
  );
};

