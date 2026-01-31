import React from 'react';
import { Calendar, Video, MessageCircle, Star, Clock, User, CheckCircle } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  sessions: number;
  availability: string;
  avatar: string;
  bio: string;
}

interface Session {
  id: string;
  mentorName: string;
  topic: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const PremiumMentoring: React.FC = () => {
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      specialty: 'Network Security',
      rating: 4.9,
      sessions: 156,
      availability: 'Available this week',
      avatar: '👩‍🏫',
      bio: 'Former NSA analyst with 15+ years in network security'
    },
    {
      id: '2',
      name: 'James Rodriguez',
      specialty: 'Web Application Security',
      rating: 4.8,
      sessions: 234,
      availability: 'Limited spots',
      avatar: '👨‍💻',
      bio: 'Bug bounty hunter and OWASP contributor'
    },
    {
      id: '3',
      name: 'Dr. Michael Park',
      specialty: 'Reverse Engineering',
      rating: 4.9,
      sessions: 89,
      availability: 'Available this week',
      avatar: '👨‍🔬',
      bio: 'Malware researcher and security consultant'
    },
    {
      id: '4',
      name: 'Emily Watson',
      specialty: 'Cloud Security',
      rating: 4.7,
      sessions: 167,
      availability: 'Available this week',
      avatar: '👩‍💼',
      bio: 'AWS Security Specialist and architect'
    }
  ];

  const sessions: Session[] = [
    {
      id: '1',
      mentorName: 'Dr. Sarah Chen',
      topic: 'Advanced Network Pentesting Techniques',
      date: 'Tomorrow',
      time: '2:00 PM EST',
      status: 'upcoming'
    },
    {
      id: '2',
      mentorName: 'James Rodriguez',
      topic: 'Web漏洞利用进阶',
      date: 'Feb 20, 2024',
      time: '3:00 PM EST',
      status: 'upcoming'
    },
    {
      id: '3',
      mentorName: 'Dr. Michael Park',
      topic: '恶意软件分析入门',
      date: 'Feb 15, 2024',
      time: '1:00 PM EST',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-htb-bright-white">Premium Mentoring</h2>
          <p className="text-htb-foreground">1-on-1 sessions with cybersecurity experts</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-htb-foreground">5 sessions remaining</span>
          <Calendar className="h-5 w-5 text-htb-gold" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">12</div>
          <div className="text-sm text-htb-foreground">Total Sessions</div>
        </div>
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">5</div>
          <div className="text-sm text-htb-foreground">Remaining</div>
        </div>
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">4.8</div>
          <div className="text-sm text-htb-foreground">Avg Rating</div>
        </div>
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-4">
          <div className="text-2xl font-bold text-htb-bright-white">2</div>
          <div className="text-sm text-htb-foreground">Upcoming</div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Upcoming Sessions</h3>
        <div className="space-y-4">
          {sessions.filter(s => s.status === 'upcoming').map((session) => (
            <div 
              key={session.id}
              className="bg-gradient-to-r from-htb-purple/10 to-htb-gold/10 rounded-lg p-4 border border-htb-purple/30 flex items-center justify-between hover:border-htb-gold transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-htb-purple/20 rounded-lg">
                  <Video className="h-6 w-6 text-htb-purple" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{session.topic}</h4>
                  <p className="text-sm text-white/60">with {session.mentorName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{session.date}</div>
                  <div className="text-sm text-white/60">{session.time}</div>
                </div>
                <button className="bg-gradient-to-r from-htb-gold to-htb-purple hover:from-htb-bright-gold hover:to-htb-bright-purple text-white px-4 py-2 rounded-lg font-medium transition-all duration-300">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Mentors */}
      <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Available Mentors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentors.map((mentor) => (
            <div 
              key={mentor.id}
              className="bg-gradient-to-br from-htb-selection-background/20 to-htb-selection-background/10 rounded-xl p-6 border border-htb-gold/30 hover:border-htb-gold hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="text-5xl">{mentor.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-semibold text-white">{mentor.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium text-white">{mentor.rating}</span>
                    </div>
                  </div>
                  <p className="text-htb-gold text-sm mb-2">{mentor.specialty}</p>
                  <p className="text-white/60 text-sm mb-4">{mentor.bio}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{mentor.sessions} sessions</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${
                        mentor.availability.includes('Limited') ? 'text-orange-400' : 'text-green-400'
                      }`}>
                        <Clock className="h-4 w-4" />
                        <span>{mentor.availability}</span>
                      </div>
                    </div>
                    <button className="bg-htb-gold/20 text-htb-gold hover:bg-htb-gold hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Sessions */}
      <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Recent Sessions</h3>
        <div className="space-y-3">
          {sessions.filter(s => s.status === 'completed').map((session) => (
            <div 
              key={session.id}
              className="bg-htb-selection-background/10 rounded-lg p-4 flex items-center justify-between opacity-75"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{session.topic}</h4>
                  <p className="text-sm text-white/60">with {session.mentorName} • {session.date}</p>
                </div>
              </div>
              <button className="text-htb-cyan hover:text-htb-bright-cyan text-sm font-medium">
                View Recording
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumMentoring;

