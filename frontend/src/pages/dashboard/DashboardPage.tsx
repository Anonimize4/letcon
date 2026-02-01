import React from 'react';
import Layout from '../../components/navigation/Layout';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

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
          <button
            className="mt-4 px-6 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/20 transition-colors"
            onClick={() => navigate('/pro')}
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
