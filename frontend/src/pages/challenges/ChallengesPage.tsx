import React, { useState } from 'react';
import Layout from '../../components/navigation/Layout';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  category: string;
  points: number;
  solves: number;
  status: 'unsolved' | 'solved' | 'in-progress';
  tags: string[];
}

const ChallengesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock challenges data
  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'SQL Injection Basics',
      description: 'Learn the fundamentals of SQL injection attacks',
      difficulty: 'Easy',
      category: 'Web',
      points: 100,
      solves: 1234,
      status: 'solved',
      tags: ['SQLi', 'Web', 'Database']
    },
    {
      id: '2',
      title: 'Buffer Overflow 101',
      description: 'Introduction to memory exploitation',
      difficulty: 'Medium',
      category: 'Pwn',
      points: 200,
      solves: 567,
      status: 'in-progress',
      tags: ['Binary', 'Memory', 'Exploit']
    },
    {
      id: '3',
      title: 'Hidden Message',
      description: 'Find the secret message hidden in the image',
      difficulty: 'Easy',
      category: 'Forensics',
      points: 50,
      solves: 2345,
      status: 'unsolved',
      tags: ['Steganography', 'Image', 'Hidden']
    },
    {
      id: '4',
      title: 'RSA Encryption',
      description: 'Break the RSA encryption using provided parameters',
      difficulty: 'Hard',
      category: 'Crypto',
      points: 300,
      solves: 234,
      status: 'unsolved',
      tags: ['RSA', 'Crypto', 'Math']
    },
    {
      id: '5',
      title: 'XSS Challenge',
      description: 'Execute JavaScript in the vulnerable application',
      difficulty: 'Medium',
      category: 'Web',
      points: 150,
      solves: 890,
      status: 'solved',
      tags: ['XSS', 'Web', 'JavaScript']
    },
    {
      id: '6',
      title: 'Kernel Exploitation',
      description: 'Advanced kernel-level vulnerability exploitation',
      difficulty: 'Insane',
      category: 'Pwn',
      points: 500,
      solves: 45,
      status: 'unsolved',
      tags: ['Kernel', 'Linux', 'Privilege Escalation']
    }
  ];

  const categories = ['all', 'Web', 'Pwn', 'Crypto', 'Forensics', 'Reversing', 'Mobile'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard', 'Insane'];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesDifficulty = activeFilter === 'all' || challenge.difficulty.toLowerCase() === activeFilter.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-htb-green bg-htb-green/20';
      case 'Medium': return 'text-htb-yellow bg-htb-yellow/20';
      case 'Hard': return 'text-htb-orange bg-htb-orange/20';
      case 'Insane': return 'text-htb-red bg-htb-red/20';
      default: return 'text-htb-foreground bg-htb-selection-background/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved':
        return (
          <div className="w-6 h-6 rounded-full bg-htb-green/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-htb-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'in-progress':
        return (
          <div className="w-6 h-6 rounded-full bg-htb-blue/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-htb-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-htb-bright-white mb-2">
            Challenges
          </h1>
          <p className="text-htb-foreground">
            Test your skills with our collection of cybersecurity challenges
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-htb-selection-background/10 rounded-xl p-4 border border-htb-selection-background mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-htb-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-htb-background text-htb-bright-white placeholder-htb-foreground focus:outline-none focus:ring-2 focus:ring-htb-blue focus:border-transparent border-htb-selection-background"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-htb-blue text-white'
                      : 'bg-htb-selection-background/20 text-htb-bright-white hover:bg-htb-selection-background/40'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2 mt-4">
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setActiveFilter(difficulty)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeFilter === difficulty
                    ? 'bg-htb-bright-white text-htb-background'
                    : getDifficultyColor(difficulty)
                }`}
              >
                {difficulty === 'all' ? 'All Levels' : difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <div
              key={challenge.id}
              className="bg-htb-selection-background/10 rounded-xl p-6 border border-htb-selection-background hover:border-htb-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-htb-blue/10 cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(challenge.status)}
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <span className="text-htb-yellow font-semibold">{challenge.points} pts</span>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-htb-bright-white mb-2 group-hover:text-htb-blue transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-sm text-htb-foreground line-clamp-2">
                  {challenge.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-htb-foreground">
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{challenge.solves.toLocaleString()} solves</span>
                  </span>
                  <span>{challenge.category}</span>
                </div>

                <button className="text-htb-blue hover:text-htb-bright-blue text-sm font-medium transition-colors">
                  Start →
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {challenge.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded text-xs bg-htb-selection-background/20 text-htb-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-htb-selection-background/20 border border-htb-selection-background mb-4">
              <svg className="w-8 h-8 text-htb-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-htb-bright-white mb-2">No challenges found</h3>
            <p className="text-htb-foreground">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-8 bg-htb-selection-background/10 rounded-xl p-4 border border-htb-selection-background">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-6 text-sm text-htb-foreground">
              <span>Total Challenges: <strong className="text-htb-bright-white">{challenges.length}</strong></span>
              <span>Solved: <strong className="text-htb-green">{challenges.filter(c => c.status === 'solved').length}</strong></span>
              <span>In Progress: <strong className="text-htb-blue">{challenges.filter(c => c.status === 'in-progress').length}</strong></span>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button className="px-4 py-2 text-sm bg-htb-blue hover:bg-htb-bright-blue text-white rounded-lg transition-colors">
                Random Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChallengesPage;

