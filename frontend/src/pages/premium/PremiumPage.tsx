import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/navigation/Layout';

const PremiumPage = () => {
  const navigate = useNavigate();
  
  // Premium features data
  const premiumFeatures = [
    {
      id: 1,
      title: "Advanced Labs",
      description: "Access to exclusive hands-on labs with complex scenarios",
      icon: "🔬",
      color: "from-htb-purple/20 to-htb-purple/10",
      borderColor: "border-htb-purple/30",
      hoverBorder: "hover:border-htb-purple"
    },
    {
      id: 2,
      title: "Expert Mentors",
      description: "1-on-1 guidance from cybersecurity professionals",
      icon: "👨‍🏫",
      color: "from-htb-gold/20 to-htb-gold/10",
      borderColor: "border-htb-gold/30",
      hoverBorder: "hover:border-htb-gold"
    },
    {
      id: 3,
      title: "Priority Support",
      description: "24/7 premium support with faster response times",
      icon: "⚡",
      color: "from-htb-cyan/20 to-htb-cyan/10",
      borderColor: "border-htb-cyan/30",
      hoverBorder: "hover:border-htb-cyan"
    }
  ];

  // Premium learning paths
  const premiumPaths = [
    {
      id: 1,
      title: "Advanced Penetration Testing",
      description: "Master advanced exploitation techniques and post-exploitation",
      difficulty: "Expert",
      duration: "12 weeks",
      modules: 48,
      students: 2340,
      rating: 4.9,
      icon: "🎯",
      isPremium: true
    },
    {
      id: 2,
      title: "Enterprise Security Architecture",
      description: "Design and implement comprehensive security solutions",
      difficulty: "Advanced",
      duration: "10 weeks",
      modules: 40,
      students: 1890,
      rating: 4.8,
      icon: "🏢",
      isPremium: true
    },
    {
      id: 3,
      title: "Malware Analysis & Reverse Engineering",
      description: "Deep dive into malware analysis and reverse engineering",
      difficulty: "Expert",
      duration: "14 weeks",
      modules: 56,
      students: 1560,
      rating: 4.9,
      icon: "🔍",
      isPremium: true
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-htb-gold/20 to-htb-purple/20 rounded-full border border-htb-gold/30 mb-6">
              <span className="text-htb-gold font-semibold">✨ Premium Features</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-left mb-6">
              Unlock Your Full<br />Cybersecurity Potential
            </h1>
            <p className="text-xl text-white max-w-3xl leading-relaxed text-left mb-4">
              Premium access to advanced labs, expert mentorship, and exclusive content
            </p>
            <div className="mt-8 flex gap-4">
              <button className="bg-gradient-to-r from-htb-gold to-htb-purple hover:from-htb-bright-gold hover:to-htb-bright-purple text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                Upgrade to Premium
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="border border-htb-bright-white text-htb-bright-white hover:bg-htb-bright-white hover:text-htb-black px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                View Dashboard
              </button>
            </div>
          </div>

          {/* Premium Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {premiumFeatures.map((feature) => (
              <div key={feature.id} className={`bg-gradient-to-br ${feature.color} rounded-xl p-6 border ${feature.borderColor} ${feature.hoverBorder} hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer group`}>
                <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-center mb-4">
                  {feature.description}
                </p>
                <div className="text-center">
                  <button className="text-htb-gold hover:text-htb-bright-gold font-medium underline underline-offset-4 transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Learning Paths */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Premium Learning Paths</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Exclusive advanced content designed for serious cybersecurity professionals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {premiumPaths.map((path) => (
                <div key={path.id} className="bg-gradient-to-br from-htb-selection-background/20 to-htb-selection-background/10 rounded-xl p-6 border border-htb-gold/30 hover:border-htb-gold hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer group relative">
                  {/* Premium Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-htb-gold to-htb-purple text-white text-xs font-bold px-3 py-1 rounded-full">
                    PREMIUM
                  </div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{path.icon}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-red-500 text-white`}>
                      {path.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
                    {path.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {path.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                    <span>⏱️ {path.duration}</span>
                    <span>📚 {path.modules} modules</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-white">{path.rating}</span>
                    </div>
                    <div className="text-sm text-white/60">
                      {path.students.toLocaleString()} students
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-htb-gold to-htb-purple hover:from-htb-bright-gold hover:to-htb-bright-purple text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                    Start Premium Path
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-htb-gold/10 to-htb-purple/10 rounded-xl p-8 border border-htb-gold/30 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Level Up?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Join thousands of cybersecurity professionals who have accelerated their careers with LETHCON Premium
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-gradient-to-r from-htb-gold to-htb-purple hover:from-htb-bright-gold hover:to-htb-bright-purple text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                Start Free Trial
              </button>
              <button className="border border-htb-bright-white text-htb-bright-white hover:bg-htb-bright-white hover:text-htb-black px-6 py-3 rounded-lg font-medium transition-all duration-200">
                Compare Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PremiumPage;
