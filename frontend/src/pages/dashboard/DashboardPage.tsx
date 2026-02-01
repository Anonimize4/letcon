import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Target,
  Network,
  Crown,
  Flag,
  TrendingUp,
  Users,
  Trophy,
  BookOpen,
  Home,
  Trophy as TrophyIcon
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-htb-background border-r border-htb-selection-background flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-htb-bright-white mb-6">Dashboard</h2>

          <SidebarItem
            icon={<Home className="h-5 w-5" />}
            label="Home"
            onClick={() => navigate('/')}
          />

          <SidebarItem
            icon={<Target className="h-5 w-5" />}
            label="Red Team"
            onClick={() => navigate('/dashboard/red-team')}
          />

          <SidebarItem
            icon={<Shield className="h-5 w-5" />}
            label="Blue Team"
            onClick={() => navigate('/dashboard/blue-team')}
          />

          <SidebarItem
            icon={<Network className="h-5 w-5" />}
            label="Networking"
            onClick={() => navigate('/dashboard/networking')}
          />

          <SidebarItem
            icon={<Trophy className="h-5 w-5" />}
            label="Challenges"
            onClick={() => navigate('/challenges')}
          />

          <SidebarItem
            icon={<BookOpen className="h-5 w-5" />}
            label="Academy"
            onClick={() => navigate('/learning')}
          />

          <SidebarItem
            icon={<Flag className="h-5 w-5" />}
            label="CTF"
            onClick={() => navigate('/ctf')}
          />

          {/* Scoreboard Section */}
          <div className="mt-6 pt-6 border-t border-htb-selection-background">
            <p className="px-4 text-xs text-htb-foreground uppercase tracking-wider mb-2">
              Community
            </p>
            <SidebarItem
              icon={<TrophyIcon className="h-5 w-5" />}
              label="Scoreboard"
              onClick={() => navigate('/community/leaderboard')}
            />
          </div>

          {/* Premium Section */}
          <div className="mt-6 pt-6 border-t border-htb-selection-background">
            <p className="px-4 text-xs text-htb-foreground uppercase tracking-wider mb-2">
              Premium
            </p>
            <SidebarItem
              icon={<Crown className="h-5 w-5 text-yellow-400" />}
              label="Premium Dashboard"
              onClick={() => navigate('/dashboard/premium')}
            />
            <SidebarItem
              icon={<Target className="h-5 w-5" />}
              label="Premium Labs"
              onClick={() => navigate('/dashboard/premium/labs')}
            />
            <SidebarItem
              icon={<TrendingUp className="h-5 w-5" />}
              label="Analytics"
              onClick={() => navigate('/dashboard/premium/analytics')}
            />
            <SidebarItem
              icon={<Users className="h-5 w-5" />}
              label="Mentoring"
              onClick={() => navigate('/dashboard/premium/mentoring')}
            />
          </div>

          {/* Upgrade to Pro Button */}
          <div className="mt-8 px-4">
            <button
              onClick={() => navigate('/pro')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 hover:from-yellow-500/30 hover:to-amber-500/30 hover:border-yellow-400 transition-all duration-200"
            >
              <Crown className="h-5 w-5" />
              <span className="font-semibold">Go to Pro</span>
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

