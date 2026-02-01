import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title?: string;
  className?: string;
}

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownSections?: DropdownSection[];
}

interface DropdownSection {
  title: string;
  items: NavItem[];
}

const Header: React.FC<HeaderProps> = ({
  className = ''
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  const clearDropdownTimeout = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const handleDropdownClose = () => {
    clearDropdownTimeout();
    setDropdownTimeout(setTimeout(() => {
      setActiveDropdown(null);
    }, 150));
  };

  const navItems: NavItem[] = [
    {
      name: 'product',
      href: '#',
      hasDropdown: true,
      dropdownSections: [
        {
          title: 'solution for ',
          items: [
            { name: 'teams', href: '/solutions/teams' },
            { name: 'schools', href: '/solutions/schools' },
            { name: 'individuals', href: '/solutions/individuals' }
          ]
        },
        {
          title: 'product we offer',
          items: [
            { name: 'courses&certifications', href: '/products/courses-certifications' },
            { name: 'Enterprise attack simulations', href: '/products/enterprise-attack-simulations' },
            { name: 'Gamified team assessment', href: '/products/gamified-team-assessment' },
            { name: 'talent sourcing and mentoring service', href: '/products/talent-sourcing-mentoring' }
          ]
        },
        {
          title: 'academy for business',
          items: [
            { name: 'Corporate Training', href: '/academy/corporate' },
            { name: 'Team Certification', href: '/academy/certification' },
            { name: 'Business Workshops', href: '/academy/workshops' }
          ]
        }
      ]
    },
    {
      name: 'Solutions',
      href: '/solutions',
      hasDropdown: true,
      dropdownSections: [
        {
          title: 'Job Roles',
          items: [
            { name: 'Red Team', href: '/solutions/red-team' },
            { name: 'Blue Team', href: '/solutions/blue-team' },
            { name: 'Networking', href: '/solutions/networking' }
          ]
        },
        {
          title: 'Industries',
          items: [
            { name: 'Healthcare', href: '/solutions/healthcare' },
            { name: 'Finance', href: '/solutions/finance' },
            { name: 'Government', href: '/solutions/government' }
          ]
        },
        {
          title: 'Use Cases',
          items: [
            { name: 'Compliance Training', href: '/solutions/compliance' },
            { name: 'Skill Assessment', href: '/solutions/assessment' },
            { name: 'Team Building', href: '/solutions/team-building' }
          ]
        }
      ]
    },
    {
      name: 'Resources',
      href: '/resources',
      hasDropdown: true,
      dropdownSections: [
        {
          title: 'Community',
          items: [
            { name: 'Forums', href: '/resources/forums' },
            { name: 'Discord Server', href: '/resources/discord' },
            { name: 'Events', href: '/resources/events' }
          ]
        },
        {
          title: 'Help Center',
          items: [
            { name: 'Documentation', href: '/resources/docs' },
            { name: 'Contact Support', href: '/resources/support' },
            { name: 'FAQ', href: '/resources/faq' }
          ]
        },
        {
          title: 'From the Blog',
          items: [
            { name: 'Latest Posts', href: '/resources/blog' },
            { name: 'Tutorials', href: '/resources/tutorials' },
            { name: 'Case Studies', href: '/resources/case-studies' }
          ]
        }
      ]
    },
    {
      name: 'Pricing',
      href: '/pricing'
    }
  ];

  const getActiveDropdownContent = (): DropdownSection[] => {
    const activeItem = navItems.find(item => item.name === activeDropdown);
    return activeItem?.dropdownSections || [];
  };

  return (
    <>
      <header className={`bg-htb-background border-b border-htb-selection-background ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand/Logo */}
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="flex items-center justify-center w-8 h-8 bg-htb-blue rounded-lg">
                <span className="text-white font-bold text-sm">LC</span>
              </div>
              {/* Brand Name */}
              <span className="text-xl font-semibold text-htb-bright-white">LETHCON</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    clearDropdownTimeout();
                    if (item.hasDropdown) {
                      setActiveDropdown(item.name);
                    }
                  }}
                  onMouseLeave={handleDropdownClose}
                >
                  <a
                    href={item.href}
                    className={`text-htb-bright-white hover:text-htb-bright-green px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      activeDropdown === item.name ? 'text-htb-bright-green' : ''
                    }`}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>

            {/* CTA Buttons / User Menu */}
            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="border border-htb-bright-green text-htb-bright-green hover:bg-htb-bright-green hover:text-htb-black px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="bg-htb-bright-green hover:bg-htb-bright-green/90 hover:scale-105 text-htb-black px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform"
                  >
                    Get Started
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="text-htb-bright-white hover:text-htb-bright-green px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={logout}
                    className="border border-htb-red text-htb-red hover:bg-htb-red hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Logout
                  </button>
                  <div 
                    className="w-8 h-8 bg-htb-blue rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer"
                    onClick={() => navigate('/profile')}
                    title={user?.username || 'User'}
                  >
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Dropdown Panel */}
      <div
        className={`absolute top-16 left-0 right-0 bg-htb-background border border-htb-selection-background shadow-lg z-50 transition-all duration-300 ${
          activeDropdown ? 'block' : 'hidden'
        }`}
        onMouseEnter={clearDropdownTimeout}
        onMouseLeave={handleDropdownClose}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getActiveDropdownContent().map((section: DropdownSection, index: number) => (
                <div key={section.title} className="relative">
                  {index < getActiveDropdownContent().length - 1 && (
                    <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-htb-selection-background" style={{right: '-16px'}}></div>
                  )}
                  <h3 className="text-htb-bright-green font-semibold text-sm mb-3 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((sectionItem: NavItem) => (
                      <a
                        key={sectionItem.name}
                        href={sectionItem.href}
                        className="block px-4 py-2 text-sm text-htb-bright-white hover:bg-htb-selection-background hover:text-htb-bright-green transition-all duration-200 rounded"
                      >
                        {sectionItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
