import Layout from '../../components/navigation/Layout';

const PlatformPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-htb-bright-white mb-4">
              LETHCON Platform Overview
            </h1>
            <p className="text-xl text-htb-bright-white max-w-3xl mx-auto">
              A comprehensive training ground to master your cybersecurity skills. Explore our learning paths, tackle real-world challenges, and join a global community of hackers and security professionals.
            </p>
          </div>

          {/* Featured Paths Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-htb-bright-white text-center mb-8">Featured Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Path 1: Web Application Penetration Testing */}
              <div className="bg-gradient-to-br from-htb-purple/20 to-htb-purple/10 rounded-xl p-6 border border-htb-purple/30 hover:border-htb-purple hover:shadow-lg hover:shadow-htb-purple/20 transition-all duration-500 hover:scale-105 cursor-pointer group">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-htb-bright-white mb-2">Web Application Penetration Testing</h3>
                  <p className="text-htb-bright-white text-sm mb-4">Master the art of finding and exploiting vulnerabilities in web applications. From SQL injection to XSS, this path covers it all.</p>
                  <button className="bg-htb-purple hover:bg-htb-bright-purple text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-htb-purple/30 transform hover:-translate-y-1">
                    Explore Path
                  </button>
                </div>
              </div>

              {/* Path 2: Network Security & Forensics */}
              <div className="bg-gradient-to-br from-htb-blue/20 to-htb-blue/10 rounded-xl p-6 border border-htb-blue/30 hover:border-htb-blue hover:shadow-lg hover:shadow-htb-blue/20 transition-all duration-500 hover:scale-105 cursor-pointer group">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-htb-bright-white mb-2">Network Security & Forensics</h3>
                  <p className="text-htb-bright-white text-sm mb-4">Dive deep into network protocols, traffic analysis, and incident response. Learn to defend and analyze network-based threats.</p>
                  <button className="bg-htb-blue hover:bg-htb-bright-blue text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-htb-blue/30 transform hover:-translate-y-1">
                    Explore Path
                  </button>
                </div>
              </div>

              {/* Path 3: Red Team Operations */}
              <div className="bg-gradient-to-br from-htb-red/20 to-htb-red/10 rounded-xl p-6 border border-htb-red/30 hover:border-htb-red hover:shadow-lg hover:shadow-htb-red/20 transition-all duration-500 hover:scale-105 cursor-pointer group">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-htb-bright-white mb-2">Red Team Operations</h3>
                  <p className="text-htb-bright-white text-sm mb-4">Simulate real-world adversaries. Learn advanced persistent threat (APT) techniques and enhance your offensive security skills.</p>
                  <button className="bg-htb-red hover:bg-htb-bright-red text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-htb-red/30 transform hover:-translate-y-1">
                    Explore Path
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Call-to-Action Section */}
          <div className="mt-16 bg-htb-selection-background/10 rounded-lg p-8 border border-htb-selection-background text-center">
            <h2 className="text-2xl font-bold text-htb-bright-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-htb-bright-white max-w-2xl mx-auto mb-6">
              Whether you're a beginner taking your first steps or a seasoned pro looking for a new challenge, LETHCON has something for you.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-htb-green hover:bg-htb-bright-green text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-htb-green/30 transform hover:-translate-y-1">
                Sign Up for Free
              </button>
              <button className="bg-transparent border-2 border-htb-bright-white text-htb-bright-white font-bold py-3 px-8 rounded-lg hover:bg-htb-bright-white hover:text-htb-black transition-all duration-300">
                Explore All Labs
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlatformPage;
