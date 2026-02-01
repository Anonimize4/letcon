import React from 'react';
import Layout from '../../components/navigation/Layout';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Target, 
  Network, 
  Zap, 
  Lock, 
  Search,
  Terminal,
  Activity
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-htb-selection-background text-htb-bright-green' 
        : 'text-htb-foreground hover:bg-htb-selection-background/50 hover:text-htb-bright-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-htb-background border-r border-htb-selection-background flex-shrink-0">
          <div className="p-6">
            <h2 className="text-xl font-bold text-htb-bright-white mb-6">Dashboard</h2>
            
            {/* Red Team Section */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-htb-cyan uppercase tracking-wider mb-3 px-4">
                Red Team
              </h3>
              <div className="space-y-1">
                <SidebarItem 
                  icon={<Target className="h-5 w-5" />} 
                  label="Attack Simulations"
                  onClick={() => navigate('/dashboard/red-team')}
                />
                <SidebarItem 
                  icon={<Terminal className="h-5 w-5" />} 
                  label="Exploitation Labs"
                  onClick={() => navigate('/dashboard/red-team/labs')}
                />
                <SidebarItem 
                  icon={<Lock className="h-5 w-5" />} 
                  label="Vulnerability Testing"
                  onClick={() => navigate('/dashboard/red-team/vulnerabilities')}
                />
              </div>
            </div>

            {/* Blue Team Section */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-htb-bright-green uppercase tracking-wider mb-3 px-4">
                Blue Team
              </h3>
              <div className="space-y-1">
                <SidebarItem 
                  icon={<Shield className="h-5 w-5" />} 
                  label="Defense Operations"
                  onClick={() => navigate('/dashboard/blue-team')}
                />
                <SidebarItem 
                  icon={<Search className="h-5 w-5" />} 
                  label="Incident Response"
                  onClick={() => navigate('/dashboard/blue-team/incidents')}
                />
                <SidebarItem 
                  icon={<Activity className="h-5 w-5" />} 
                  label="Threat Monitoring"
                  onClick={() => navigate('/dashboard/blue-team/monitoring')}
                />
              </div>
            </div>

            {/* Networking Section */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 px-4">
                Networking
              </h3>
              <div className="space-y-1">
                <SidebarItem 
                  icon={<Network className="h-5 w-5" />} 
                  label="Network Security"
                  onClick={() => navigate('/dashboard/networking')}
                />
                <SidebarItem 
                  icon={<Zap className="h-5 w-5" />} 
                  label="Protocol Analysis"
                  onClick={() => navigate('/dashboard/networking/protocols')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-htb-bright-white mb-4">
              Welcome to Your Dashboard!
            </h1>
            <p className="text-lg text-htb-foreground mb-8">
              Select a category from the sidebar to get started with your cybersecurity training.
            </p>
            <button
              className="px-6 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/20 transition-colors"
              onClick={() => navigate('/pro')}
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
