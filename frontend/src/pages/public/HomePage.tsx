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
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-htb-bright-white mb-4">
              Welcome to LETHCON
            </h1>
            <p className="text-xl text-htb-bright-white max-w-2xl mx-auto">
              Your comprehensive cybersecurity training platform for hands-on learning and skill development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <h3 className="text-lg font-semibold text-htb-bright-white mb-3">Hands-on Labs</h3>
              <p className="text-htb-bright-white">
                Practice cybersecurity techniques in realistic, isolated virtual environments.
              </p>
            </div>

            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <h3 className="text-lg font-semibold text-htb-bright-white mb-3">CTF Challenges</h3>
              <p className="text-htb-bright-white">
                Compete in capture-the-flag challenges with players from around the world.
              </p>
            </div>

            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <h3 className="text-lg font-semibold text-htb-bright-white mb-3">Learning Paths</h3>
              <p className="text-htb-bright-white">
                Structured curriculum from beginner to advanced cybersecurity concepts.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-htb-selection-background/10 rounded-lg p-8 border border-htb-selection-background">
            <h2 className="text-2xl font-bold text-htb-bright-white mb-4">Why Choose LETHCON?</h2>
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
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-htb-red rounded-full animate-pulse"></div>
              <div className="absolute top-20 right-20 w-16 h-16 bg-htb-blue rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-htb-green rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-htb-purple rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>

            <h2 className="text-3xl font-bold text-htb-bright-white text-center mb-8 relative z-10">Master Cybersecurity Skills</h2>
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
