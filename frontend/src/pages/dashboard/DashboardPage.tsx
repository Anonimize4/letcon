import React from 'react';
import Layout from '../../components/navigation/Layout';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-htb-bright-white mb-4">
            Welcome to Your Dashboard!
          </h1>
          <p className="text-lg text-htb-foreground">
            You have successfully logged in.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
