import Layout from '../../components/navigation/Layout';

export interface AppConfig {
  title: string;
  version: string;
  environment: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const appConfig: AppConfig = {
  title: 'LETHCON',
  version: '1.0.0',
  environment: 'development'
};

const HomePage = () => {
  // Featured learning paths data
  const featuredPaths = [
    {
      id: 1,
      title: "Web Exploitation Fundamentals",
      description: "Master the art of finding and exploiting web vulnerabilities",
      difficulty: "Beginner",
      duration: "6 weeks",
      modules: 24,
      students: 15420,
      rating: 4.8,
      icon: "🌐",
      color: "from-htb-blue/20 to-htb-blue/10",
      borderColor: "border-htb-blue/30",
      hoverBorder: "hover:border-htb-blue",
      buttonColor: "bg-htb-blue hover:bg-htb-bright-blue"
    },
    {
      id: 2,
      title: "Penetration Testing Pro",
      description: "Advanced techniques for comprehensive security assessments",
      difficulty: "Advanced",
      duration: "8 weeks",
      modules: 32,
      students: 8930,
      rating: 4.9,
      icon: "🔐",
      color: "from-htb-red/20 to-htb-red/10",
      borderColor: "border-htb-red/30",
      hoverBorder: "hover:border-htb-red",
      buttonColor: "bg-htb-red hover:bg-htb-bright-red"
    },
    {
      id: 3,
      title: "Network Security Essentials",
      description: "Build a strong foundation in network security and defense",
      difficulty: "Intermediate",
      duration: "5 weeks",
      modules: 20,
      students: 12350,
      rating: 4.7,
      icon: "🛡️",
      color: "from-htb-green/20 to-htb-green/10",
      borderColor: "border-htb-green/30",
      hoverBorder: "hover:border-htb-green",
      buttonColor: "bg-htb-green hover:bg-htb-bright-green"
    }
  ];

  // Platform statistics
  const platformStats = [
    { label: "Active Users", value: "45.2K+", change: "+12%" },
    { label: "Hands-on Labs", value: "280+", change: "+8" },
    { label: "CTF Challenges", value: "150+", change: "+15" },
    { label: "Success Rate", value: "92%", change: "+3%" }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-left mb-6">
              Anyone can learn cyber security with<br />LETHCON
            </h1>
            <p className="text-xl text-white max-w-3xl leading-relaxed text-left mb-4">
              Hands-on cyber security training through real-world scenarios
            </p>
            <p className="text-xl text-white max-w-3xl leading-relaxed text-left mb-4">
              Get your mentor and grow your Ethical hacking skills
            </p>
            <div className="mt-8 flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-64 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-htb-blue text-black"
              />
              <button className="bg-htb-red hover:bg-htb-bright-red text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                Join for Free
              </button>
            </div>
            <div className="mt-4 flex gap-4 text-white">
              <span>✓ Beginner friendly</span>
              <span>✓ Guides and challenges</span>
            </div>
          </div>

          {/* Platform Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-htb-selection-background/10 rounded-xl p-6 border border-htb-selection-background">
            {platformStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/80 mb-2">{stat.label}</div>
                <div className="text-xs text-green-400 font-medium">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Featured Learning Paths */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Featured Learning Paths</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPaths.map((path) => (
                <div key={path.id} className={`bg-gradient-to-br ${path.color} rounded-xl p-6 border ${path.borderColor} ${path.hoverBorder} hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer group`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{path.icon}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      path.difficulty === 'Beginner' ? 'bg-green-500 text-white' :
                      path.difficulty === 'Intermediate' ? 'bg-yellow-500 text-black' :
                      'bg-red-500 text-white'
                    }`}>
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
                  
                  <button className={`w-full ${path.buttonColor} text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
                    Start Path
                  </button>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button className="text-htb-bright-white hover:text-htb-bright-white/80 font-medium underline underline-offset-4 transition-colors">
                View All Learning Paths →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <h3 className="text-lg font-semibold text-white mb-3">Hands-on Labs</h3>
              <p className="text-white">
                Practice cybersecurity in realistic virtual environments.
              </p>
            </div>

            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <h3 className="text-lg font-semibold text-white mb-3">CTF Challenges</h3>
              <p className="text-white">
                Compete in capture-the-flag challenges.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-htb-selection-background/10 rounded-lg p-8 border border-htb-selection-background">
            <h2 className="text-2xl font-bold text-htb-bright-white mb-4">Why  LETHCON?</h2>
            <ul className="space-y-3 text-htb-bright-white">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-htb-bright-green rounded-full"></div>
                <span>Realistic virtual environments for hands-on learning</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-htb-bright-green rounded-full"></div>
                <span>Comprehensive learning paths for all skill levels</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-htb-bright-green rounded-full"></div>
                <span>Community-driven challenges and competitions</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-htb-bright-green rounded-full"></div>
                <span>Expert-designed lab scenarios based on real-world threats</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-htb-bright-green rounded-full"></div>
                <span>Progress tracking and performance analytics</span>
              </li>
            </ul>
          </div>

          {/* Call-To-Action Section */}
          <div className="mt-12 relative overflow-hidden">
            {/* Simplified Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-20 right-20 w-16 h-16 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            </div>

            <h2 className="text-3xl font-bold text-white text-center mb-8 relative z-10">Master Cybersecurity Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Red Team Card */}
              <div className="bg-gradient-to-br from-htb-red/20 to-htb-red/10 rounded-xl p-6 border border-htb-red/30 hover:border-htb-red hover:shadow-lg hover:shadow-htb-red/20 transition-all duration-500 hover:scale-105 cursor-pointer group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-htb-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-spin">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-htb-bright-white mb-2">Red Team</h3>
                  <p className="text-htb-bright-white text-sm mb-4">Learn offensive security techniques, penetration testing, and ethical hacking to identify vulnerabilities.</p>
                  <button className="bg-htb-red hover:bg-htb-bright-red text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-htb-red/30 transform hover:-translate-y-1">
                    Start Red Team
                  </button>
                </div>
              </div>

              {/* Blue Team Card */}
              <div className="bg-gradient-to-br from-htb-blue/20 to-htb-blue/10 rounded-xl p-6 border border-htb-blue/30 hover:border-htb-blue hover:shadow-lg hover:shadow-htb-blue/20 transition-all duration-500 hover:scale-105 cursor-pointer group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-htb-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-htb-bright-white mb-2">Blue Team</h3>
                  <p className="text-htb-bright-white text-sm mb-4">Master defensive security, incident response, and threat detection to protect systems and networks.</p>
                  <button className="bg-htb-blue hover:bg-htb-bright-blue text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-htb-blue/30 transform hover:-translate-y-1">
                    Start Blue Team
                  </button>
                </div>
              </div>

              {/* Networking Card */}
              <div className="bg-gradient-to-br from-htb-green/20 to-htb-green/10 rounded-xl p-6 border border-htb-green/30 hover:border-htb-green hover:shadow-lg hover:shadow-htb-green/20 transition-all duration-500 hover:scale-105 cursor-pointer group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-htb-green rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-htb-bright-white mb-2">Networking</h3>
                  <p className="text-htb-bright-white text-sm mb-4">Explore network fundamentals, protocols, and infrastructure security in hands-on virtual environments.</p>
                  <button className="bg-htb-green hover:bg-htb-bright-green text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-htb-green/30 transform hover:-translate-y-1">
                    Start Networking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
