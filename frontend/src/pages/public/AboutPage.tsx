import React from 'react';
import Layout from '../../components/navigation/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About LETHCON
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Your premier platform for cybersecurity education and hands-on training
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <h3 className="text-lg font-semibold text-white mb-3">Our Mission</h3>
              <p className="text-white">
                To provide accessible, high-quality cybersecurity education through hands-on learning experiences.
              </p>
            </div>
            
            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <h3 className="text-lg font-semibold text-white mb-3">Our Vision</h3>
              <p className="text-white">
                To become the leading platform for cybersecurity skill development and career advancement.
              </p>
            </div>
            
            <div className="bg-htb-selection-background/20 rounded-lg p-6 border border-htb-selection-background">
              <h3 className="text-lg font-semibold text-white mb-3">Our Values</h3>
              <p className="text-white">
                Excellence, innovation, and community-driven learning in cybersecurity education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
