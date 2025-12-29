import Layout from '../../components/navigation/Layout';

const LearningPathsPage = () => {
  // Learning paths data organized by difficulty
  const learningPaths = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'Start your cybersecurity journey with fundamental concepts and hands-on labs',
      color: 'htb-green',
      icon: '🎯',
      paths: [
        {
          title: 'Linux Basics',
          description: 'Master essential Linux commands and filesystem navigation',
          duration: '2-3 weeks',
          labs: 8
        },
        {
          title: 'Network Fundamentals',
          description: 'Understand networking concepts and protocols',
          duration: '3-4 weeks',
          labs: 12
        },
        {
          title: 'Web Exploitation Basics',
          description: 'Learn common web vulnerabilities and basic exploitation techniques',
          duration: '4-5 weeks',
          labs: 15
        },
        {
          title: 'Cryptography Introduction',
          description: 'Explore basic encryption and cryptographic principles',
          duration: '2-3 weeks',
          labs: 6
        }
      ]
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'Build upon foundational skills with more advanced techniques and scenarios',
      color: 'htb-yellow',
      icon: '⚡',
      paths: [
        {
          title: 'Privilege Escalation',
          description: 'Learn techniques to escalate privileges on compromised systems',
          duration: '4-5 weeks',
          labs: 18
        },
        {
          title: 'SQL Injection Mastery',
          description: 'Master various SQL injection techniques and bypasses',
          duration: '3-4 weeks',
          labs: 14
        },
        {
          title: 'Forensics Investigation',
          description: 'Develop skills in digital forensics and incident response',
          duration: '5-6 weeks',
          labs: 20
        },
        {
          title: 'Binary Exploitation',
          description: 'Understand memory corruption and exploit development',
          duration: '6-7 weeks',
          labs: 22
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'Tackle complex scenarios and cutting-edge security challenges',
      color: 'htb-red',
      icon: '🔥',
      paths: [
        {
          title: 'Active Directory Security',
          description: 'Master AD exploitation and post-compromise techniques',
          duration: '6-8 weeks',
          labs: 25
        },
        {
          title: 'Advanced Buffer Overflows',
          description: 'Develop sophisticated buffer overflow exploits',
          duration: '7-8 weeks',
          labs: 28
        },
        {
          title: 'Multi-Container Environments',
          description: 'Navigate complex multi-container security scenarios',
          duration: '5-6 weeks',
          labs: 20
        },
        {
          title: 'Advanced Reverse Engineering',
          description: 'Deep dive into malware analysis and reverse engineering',
          duration: '8-10 weeks',
          labs: 30
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-htb-bright-white mb-4">
            Learning Paths
          </h1>
          <p className="text-xl text-htb-foreground max-w-3xl mx-auto">
            Choose your learning path and master cybersecurity skills through hands-on labs and real-world scenarios
          </p>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {learningPaths.map((path) => (
            <div
              key={path.id}
              className="bg-htb-selection-background rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl"
            >
              {/* Path Header */}
              <div className={`p-6 rounded-t-lg bg-gradient-to-r from-${path.color}/20 to-transparent`}>
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">{path.icon}</span>
                  <h2 className={`text-2xl font-bold text-${path.color}`}>
                    {path.title}
                  </h2>
                </div>
                <p className="text-htb-foreground text-sm">
                  {path.description}
                </p>
              </div>

              {/* Path Content */}
              <div className="p-6">
                <div className="space-y-4">
                  {path.paths.map((item, index) => (
                    <div
                      key={index}
                      className="bg-htb-background rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors duration-200 cursor-pointer"
                    >
                      <h3 className="font-semibold text-htb-bright-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-htb-foreground mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                          <span className="text-htb-cyan">
                            ⏱️ {item.duration}
                          </span>
                          <span className="text-htb-green">
                            🧪 {item.labs} labs
                          </span>
                        </div>
                        <button className={`text-${path.color} hover:text-${path.color}/80 transition-colors duration-200`}>
                          Start →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Path Footer */}
              <div className="px-6 pb-6">
                <button className={`w-full py-3 px-4 bg-${path.color} text-htb-background font-semibold rounded-lg hover:bg-${path.color}/90 transition-colors duration-200`}>
                  Explore {path.title} Path
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-htb-selection-background rounded-lg p-6 text-center border border-gray-700">
            <div className="text-2xl font-bold text-htb-green mb-2">12</div>
            <div className="text-sm text-htb-foreground">Total Paths</div>
          </div>
          <div className="bg-htb-selection-background rounded-lg p-6 text-center border border-gray-700">
            <div className="text-2xl font-bold text-htb-cyan mb-2">210+</div>
            <div className="text-sm text-htb-foreground">Hands-on Labs</div>
          </div>
          <div className="bg-htb-selection-background rounded-lg p-6 text-center border border-gray-700">
            <div className="text-2xl font-bold text-htb-yellow mb-2">50+</div>
            <div className="text-sm text-htb-foreground">Hours of Content</div>
          </div>
          <div className="bg-htb-selection-background rounded-lg p-6 text-center border border-gray-700">
            <div className="text-2xl font-bold text-htb-purple mb-2">3</div>
            <div className="text-sm text-htb-foreground">Difficulty Levels</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-htb-blue/20 to-htb-purple/20 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-htb-bright-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-htb-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of cybersecurity enthusiasts mastering skills through our comprehensive learning paths
          </p>
          <div className="space-x-4">
            <button className="px-6 py-3 bg-htb-green text-htb-background font-semibold rounded-lg hover:bg-htb-bright-green transition-colors duration-200">
              Get Started Free
            </button>
            <button className="px-6 py-3 border border-htb-bright-white text-htb-bright-white font-semibold rounded-lg hover:bg-htb-bright-white hover:text-htb-background transition-colors duration-200">
              View All Labs
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearningPathsPage;
