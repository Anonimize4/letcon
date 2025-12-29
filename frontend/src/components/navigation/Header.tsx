import React, { useState } from 'react';

interface HeaderProps {
  title?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = 'LETHCON',
  className = ''
}) => {
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);

  const navItems = [
    {
      name: 'Products',
      href: '#',
      hasDropdown: true,
      dropdownSections: [
        {
          title: 'For Teams',
          items: [
            { name: 'Enterprise Security', href: '/products/enterprise' },
            { name: 'Team Training', href: '/products/team-training' },
            { name: 'Corporate Labs', href: '/products/corporate-labs' }
          ]
        },
        {
          title: 'For Schools',
          items: [
            { name: 'Educational Platform', href: '/products/education' },
            { name: 'Student Programs', href: '/products/students' },
            { name: 'Teacher Resources', href: '/products/teachers' }
          ]
        },
        {
          title: 'Certifications',
          items: [
            { name: 'Security+', href: '/certifications/security-plus' },
            { name: 'Network+', href: '/certifications/network-plus' },
            { name: 'Ethical Hacking', href: '/certifications/ethical-hacking' }
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
      name: 'Community',
      href: '#'
    },
    {
      name: 'Pricing',
      href: '/pricing'
    }
  ];

  return (
    <>
      <header className={`bg-htb-background border-b border-htb-selection-background ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand/Logo */}
            <div className="flex items-center space-x-3">
              {/* Logo/Brand Icon */}
              <div className="flex items-center justify-center w-10 h-10 bg-htb-blue rounded-lg">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              {/* Title */}
              <h1 className="text-xl font-semibold text-htb-bright-white">{title}</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.name === 'Products') setIsProductsDropdownOpen(true);
                    if (item.name === 'Solutions') setIsSolutionsDropdownOpen(true);
                    if (item.name === 'Resources') setIsResourcesDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (item.name === 'Products') setIsProductsDropdownOpen(false);
                    if (item.name === 'Solutions') setIsSolutionsDropdownOpen(false);
                    if (item.name === 'Resources') setIsResourcesDropdownOpen(false);
                  }}
                >
                  <a
                    href={item.href}
                    className="text-htb-bright-white hover:text-htb-bright-green px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    )}
                  </a>
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <button className="border border-htb-bright-green text-htb-bright-green hover:bg-htb-bright-green hover:text-htb-black px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform">
                Login
              </button>
              <button className="bg-htb-bright-green hover:bg-htb-bright-green/90 hover:scale-105 text-htb-black px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform">
                Get Started
              </button>
              {/* Placeholder for user menu or actions */}
              <div className="w-8 h-8 bg-htb-selection-background rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Dropdown Menus - Rendered outside header container for full width */}
      {navItems.map((item) => {
        if (!item.hasDropdown) return null;
        
        return (
          <div
            key={`${item.name}-dropdown`}
            className={`absolute top-16 left-0 right-0 bg-htb-background border border-htb-selection-background shadow-lg z-50 ${
              (item.name === 'Products' && isProductsDropdownOpen) || 
              (item.name === 'Solutions' && isSolutionsDropdownOpen) ||
              (item.name === 'Resources' && isResourcesDropdownOpen)
                ? 'block' : 'hidden'
            }`}
            onMouseEnter={() => {
              if (item.name === 'Products') setIsProductsDropdownOpen(true);
              if (item.name === 'Solutions') setIsSolutionsDropdownOpen(true);
              if (item.name === 'Resources') setIsResourcesDropdownOpen(true);
            }}
            onMouseLeave={() => {
              if (item.name === 'Products') setIsProductsDropdownOpen(false);
              if (item.name === 'Solutions') setIsSolutionsDropdownOpen(false);
              if (item.name === 'Resources') setIsResourcesDropdownOpen(false);
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6">
                {item.dropdownSections && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {item.dropdownSections.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-htb-bright-green font-semibold text-sm mb-3 uppercase tracking-wider">
                          {section.title}
                        </h3>
                        <div className="space-y-1">
                          {section.items.map((sectionItem) => (
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
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Header;
