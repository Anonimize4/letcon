import React from 'react';
import { Play, Clock, Users, Star, Lock, CheckCircle } from 'lucide-react';

interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  participants: number;
  rating: number;
  isCompleted: boolean;
  icon: string;
}

export const PremiumLabs: React.FC = () => {
  const labs: Lab[] = [
    {
      id: '1',
      title: 'Advanced Network Pentesting',
      description: 'Master advanced network exploitation techniques including lateral movement',
      difficulty: 'Expert',
      duration: '4 hours',
      participants: 1250,
      rating: 4.9,
      isCompleted: true,
      icon: '🎯'
    },
    {
      id: '2',
      title: 'Web Application Security',
      description: 'Comprehensive OWASP Top 10 with hands-on labs',
      difficulty: 'Advanced',
      duration: '6 hours',
      participants: 2340,
      rating: 4.8,
      isCompleted: false,
      icon: '🌐'
    },
    {
      id: '3',
      title: 'Cloud Security Assessment',
      description: 'AWS and Azure security testing methodologies',
      difficulty: 'Expert',
      duration: '5 hours',
      participants: 890,
      rating: 4.9,
      isCompleted: false,
      icon: '☁️'
    },
    {
      id: '4',
      title: 'Malware Analysis Fundamentals',
      description: 'Reverse engineering and static/dynamic analysis',
      difficulty: 'Expert',
      duration: '8 hours',
      participants: 567,
      rating: 4.9,
      isCompleted: false,
      icon: '🔬'
    },
    {
      id: '5',
      title: 'Social Engineering',
      description: 'Phishing, pretexting, and physical security testing',
      difficulty: 'Advanced',
      duration: '3 hours',
      participants: 1234,
      rating: 4.7,
      isCompleted: false,
      icon: '🎭'
    },
    {
      id: '6',
      title: 'Container Security',
      description: 'Docker and Kubernetes security auditing',
      difficulty: 'Advanced',
      duration: '4 hours',
      participants: 789,
      rating: 4.8,
      isCompleted: false,
      icon: '🐳'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-orange-500/20 text-orange-400';
      case 'Expert': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-htb-bright-white">Premium Labs</h2>
          <p className="text-htb-foreground">Exclusive hands-on security challenges</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-htb-foreground">Unlimited Access</span>
          <Lock className="h-5 w-5 text-yellow-400" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">24</div>
          <div className="text-sm text-htb-foreground">Completed</div>
        </div>
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">12</div>
          <div className="text-sm text-htb-foreground">In Progress</div>
        </div>
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">156</div>
          <div className="text-sm text-htb-foreground">Available</div>
        </div>
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">92%</div>
          <div className="text-sm text-htb-foreground">Success Rate</div>
        </div>
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <div 
            key={lab.id} 
            className="bg-gradient-to-br from-htb-selection-background/20 to-htb-selection-background/10 rounded-xl p-6 border border-htb-gold/30 hover:border-htb-gold hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer group relative"
          >
            {lab.isCompleted && (
              <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            )}
            
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{lab.icon}</div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lab.difficulty)}`}>
                {lab.difficulty}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
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
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400" />
                <span>{lab.rating}</span>
              </div>
            </div>
            
            <button 
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                lab.isCompleted
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  : 'bg-gradient-to-r from-htb-gold to-htb-purple hover:from-htb-bright-gold hover:to-htb-bright-purple text-white hover:shadow-lg'
              }`}
            >
              {lab.isCompleted ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Start Lab</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="bg-htb-selection-background/10 border border-htb-selection-background hover:border-htb-gold text-htb-bright-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
          Load More Labs
        </button>
      </div>
    </div>
  );
};

