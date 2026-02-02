import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Crown,
  Flag,
  TrendingUp,
  Users,
  Trophy,
  BookOpen,
  Home,
  Trophy as TrophyIcon,
  Award,
  Medal,
  Star,
  Clock,
  Zap,
  Shield,
  FlaskConical,
  BarChart3
} from 'lucide-react';

// Import premium components
import { PremiumLabs, FreeLabsWithUpgradeNudge, PremiumAnalytics } from '../../components/dashboard';

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
  const { user } = useAuth();
  const [currentView, setCurrentView] = React.useState<'home' | 'labs' | 'analytics'>('home');

  // Check if user has premium access
  const isPremium = user?.role === 'pro' || user?.role === 'admin';

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-htb-background border-r border-htb-selection-background flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-htb-bright-white mb-6">Dashboard</h2>

          <SidebarItem
            icon={<Home className="h-5 w-5" />}
            label="Home"
            active={currentView === 'home'}
            onClick={() => setCurrentView('home')}
          />

          <SidebarItem
            icon={<FlaskConical className="h-5 w-5" />}
            label="Labs"
            active={currentView === 'labs'}
            onClick={() => setCurrentView('labs')}
          />

          <SidebarItem
            icon={<BarChart3 className="h-5 w-5" />}
            label="Analytics"
            active={currentView === 'analytics'}
            onClick={() => setCurrentView('analytics')}
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
          {isPremium && (
            <div className="mt-6 pt-6 border-t border-htb-selection-background">
              <p className="px-4 text-xs text-htb-foreground uppercase tracking-wider mb-2">
                Premium
              </p>
              <div className="flex items-center space-x-2 px-4 py-2">
                <Crown className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium">Premium Active</span>
              </div>
            </div>
          )}

          {/* Upgrade to Pro Button - Only show for non-premium users */}
          {!isPremium && (
            <div className="mt-8 px-4">
              <button
                onClick={() => navigate('/pricing')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 hover:from-yellow-500/30 hover:to-amber-500/30 hover:border-yellow-400 transition-all duration-200"
              >
                <Crown className="h-5 w-5" />
                <span className="font-semibold">Go to Pro</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {currentView === 'home' && (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                {isPremium && <Crown className="h-8 w-8 text-yellow-400" />}
                <h1 className="text-4xl font-bold text-htb-bright-white">
                  {isPremium ? 'Welcome, Premium User!' : 'Welcome to Your Dashboard!'}
                </h1>
              </div>
              <p className="text-lg text-htb-foreground">
                {isPremium 
                  ? 'Enjoy your exclusive premium features with enhanced learning experience.'
                  : 'Select a category from the sidebar to get started with your cybersecurity training.'}
              </p>
            </div>

            {/* Welcome Card - Show for premium users */}
            {isPremium && (
              <div className="gradient-bg rounded-lg p-8 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-htb-bright-white mb-2">
                      Premium Benefits Active
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
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Star className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-htb-bright-white">Labs Completed</h3>
                </div>
                <div className="text-3xl font-bold text-htb-bright-white mb-2">{isPremium ? '24' : '3'}</div>
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

              {isPremium && (
                <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="h-6 w-6 text-purple-400" />
                    <h3 className="text-lg font-semibold text-htb-bright-white">Mentor Sessions</h3>
                  </div>
                  <div className="text-3xl font-bold text-htb-bright-white mb-2">5</div>
                  <p className="text-sm text-htb-foreground">Next: Tomorrow 2pm</p>
                </div>
              )}

              <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-htb-cyan" />
                  <h3 className="text-lg font-semibold text-htb-bright-white">Learning Time</h3>
                </div>
                <div className="text-3xl font-bold text-htb-bright-white mb-2">48h</div>
                <p className="text-sm text-htb-foreground">This month</p>
              </div>
            </div>

            {/* Premium Features Grid - Show for premium users */}
            {isPremium && (
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
            )}

            {/* User Info - Show for premium users */}
            {isPremium && (
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
            )}

            {/* Status Message */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <p className="text-green-400 font-medium">Dashboard is Operational</p>
              </div>
              <p className="text-htb-foreground text-sm mt-1">
                All features are working correctly. Welcome to your cybersecurity training platform!
              </p>
            </div>
          </>
        )}

        {currentView === 'labs' && (
          <>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <FlaskConical className="h-8 w-8 text-htb-cyan" />
                <h1 className="text-4xl font-bold text-htb-bright-white">
                  {isPremium ? 'Premium Labs' : 'Labs'}
                </h1>
              </div>
              <p className="text-lg text-htb-foreground">
                {isPremium 
                  ? 'Access your exclusive premium lab environments.'
                  : 'Get started with free labs or upgrade for unlimited access.'}
              </p>
            </div>
            {user?.role === 'pro' || user?.role === 'admin' ? (
              <PremiumLabs />
            ) : (
              <FreeLabsWithUpgradeNudge />
            )}
          </>
        )}

        {currentView === 'analytics' && (
          <>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <BarChart3 className="h-8 w-8 text-htb-purple" />
                <h1 className="text-4xl font-bold text-htb-bright-white">
                  Analytics
                </h1>
              </div>
              <p className="text-lg text-htb-foreground">
                Track your learning progress and achievements.
              </p>
            </div>
            <PremiumAnalytics />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

