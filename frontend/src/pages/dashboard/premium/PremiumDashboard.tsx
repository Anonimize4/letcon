import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown, Star, Zap, Shield, TrendingUp, Users, Clock,
  BarChart3, BookOpen, MessageCircle, Trophy, Home, Bot,
  Award, Medal, FileCheck, Flag
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
        ? 'bg-yellow-500/20 text-yellow-400' 
        : 'text-htb-foreground hover:bg-htb-selection-background/50 hover:text-htb-bright-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const PremiumDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-htb-background border-r border-htb-selection-background flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Crown className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-htb-bright-white">Premium</h2>
          </div>

          <SidebarItem
            icon={<Home className="h-5 w-5" />}
            label="Home"
            onClick={() => navigate('/')}
          />

          <SidebarItem
            icon={<Crown className="h-5 w-5 text-yellow-400" />}
            label="Dashboard"
            active
            onClick={() => navigate('/dashboard/premium')}
          />

          <SidebarItem
            icon={<BookOpen className="h-5 w-5" />}
            label="Labs"
            onClick={() => navigate('/dashboard/premium/labs')}
          />

          <SidebarItem
            icon={<BarChart3 className="h-5 w-5" />}
            label="Analytics"
            onClick={() => navigate('/dashboard/premium/analytics')}
          />

          <SidebarItem
            icon={<MessageCircle className="h-5 w-5" />}
            label="Mentoring"
            onClick={() => navigate('/dashboard/premium/mentoring')}
          />

          <SidebarItem
            icon={<Bot className="h-5 w-5 text-purple-400" />}
            label="Ask AI"
            onClick={() => navigate('/dashboard/premium/ask-ai')}
          />

          {/* Achievements Section */}
          <div className="mt-6 pt-6 border-t border-htb-selection-background">
            <p className="px-4 text-xs text-htb-foreground uppercase tracking-wider mb-2">
              Achievements
            </p>
            <SidebarItem
              icon={<Award className="h-5 w-5 text-yellow-400" />}
              label="Badges"
              onClick={() => navigate('/dashboard/premium/badges')}
            />
            <SidebarItem
              icon={<Medal className="h-5 w-5 text-amber-400" />}
              label="Achievements"
              onClick={() => navigate('/dashboard/premium/achievements')}
            />
            <SidebarItem
              icon={<FileCheck className="h-5 w-5 text-green-400" />}
              label="Certificates"
              onClick={() => navigate('/dashboard/premium/certificates')}
            />
          </div>

          {/* Other Pages Section */}
          <div className="mt-6 pt-6 border-t border-htb-selection-background">
            <p className="px-4 text-xs text-htb-foreground uppercase tracking-wider mb-2">
              Explore
            </p>
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
                icon={<Trophy className="h-5 w-5" />}
                label="Scoreboard"
                onClick={() => navigate('/community/leaderboard')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Crown className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-htb-bright-white">
              Premium Dashboard
            </h1>
          </div>
          <p className="text-lg text-htb-foreground">
            Welcome to your Premium Dashboard - Enjoy exclusive features
          </p>
        </div>

        {/* Welcome Card */}
        <div className="gradient-bg rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                Welcome Premium User
              </h2>
              <p className="text-htb-foreground max-w-2xl">
                Enjoy exclusive premium features with enhanced learning experience,
                advanced labs, priority support, and unrestricted access to all platform content.
              </p>
            </div>
            <div className="hidden lg:block">
              <Crown className="h-24 w-24 text-yellow-400 opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Labs Completed</h3>
            </div>
            <div className="text-3xl font-bold text-htb-bright-white mb-2">24</div>
            <p className="text-sm text-htb-foreground">Keep up the great work!</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Current Streak</h3>
            </div>
            <div className="text-3xl font-bold text-htb-bright-white mb-2">7 Days</div>
            <p className="text-sm text-htb-foreground">Personal best!</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Mentor Sessions</h3>
            </div>
            <div className="text-3xl font-bold text-htb-bright-white mb-2">5</div>
            <p className="text-sm text-htb-foreground">Next: Tomorrow 2pm</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="h-6 w-6 text-htb-cyan" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Learning Time</h3>
            </div>
            <div className="text-3xl font-bold text-htb-bright-white mb-2">48h</div>
            <p className="text-sm text-htb-foreground">This month</p>
          </div>
        </div>

        {/* Premium Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Premium Labs</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">Unlimited</div>
            <p className="text-sm text-htb-foreground">Access to all premium labs</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Priority Support</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">24/7</div>
            <p className="text-sm text-htb-foreground">Premium assistance</p>
          </div>

          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Crown className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-htb-bright-white">Advanced Content</h3>
            </div>
            <div className="text-2xl font-bold text-htb-bright-white mb-2">500+</div>
            <p className="text-sm text-htb-foreground">Exclusive challenges</p>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-htb-bright-white mb-4">Your Premium Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex justify-between">
              <span className="text-htb-foreground">Status:</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-htb-foreground">Member Since:</span>
              <span className="text-htb-bright-white">Jan 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-htb-foreground">Subscription:</span>
              <span className="text-htb-bright-white">Premium Plan</span>
            </div>
            <div className="flex justify-between">
              <span className="text-htb-foreground">Next Billing:</span>
              <span className="text-htb-bright-white">Mar 1, 2024</span>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">Premium Dashboard is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            All premium features are working correctly. Welcome premium user!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumDashboard;

