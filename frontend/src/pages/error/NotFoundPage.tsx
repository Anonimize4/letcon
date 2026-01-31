import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/navigation/Layout';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-htb-red mb-4">404</h1>
            <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
            <p className="text-xl text-white/80 mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="bg-htb-blue hover:bg-htb-bright-blue text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 mr-4"
            >
              Go Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="border border-htb-bright-white text-htb-bright-white hover:bg-htb-bright-white hover:text-htb-black font-bold py-3 px-8 rounded-lg transition-all duration-200"
            >
              Go Back
            </button>
          </div>
          
          <div className="mt-12">
            <p className="text-white/60">
              Or try these popular pages:
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-htb-blue hover:text-htb-bright-blue underline"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/learning')}
                className="text-htb-blue hover:text-htb-bright-blue underline"
              >
                Learning Paths
              </button>
              <button
                onClick={() => navigate('/challenges')}
                className="text-htb-blue hover:text-htb-bright-blue underline"
              >
                Challenges
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
