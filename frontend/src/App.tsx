// Cybersecurity Training Platform - Frontend Entry Point
// This file will contain main React application component

import Layout from './components/navigation/Layout';

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

// Main App component
export const App = () => {
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
        </div>
      </div>
    </Layout>
  );
};
