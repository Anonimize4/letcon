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
      dropdownItems: [
        { name: 'Teams', href: '/products/teams' },
        { name: 'Schools', href: '/products/schools' },
        { name: 'Individuals', href: '/products/individuals' }
      ]
    },
    {
      name: 'Solutions',
      href: '/solutions',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Red Team', href: '/solutions/red-team' },
        { name: 'Blue Team', href: '/solutions/blue-team' },
        { name: 'Networking', href: '/solutions/networking' }
      ]
    },
    {
      name: 'Resources',
      href: '/resources',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Upcoming Events', href: '/resources/events' },
        { name: 'Meetups', href: '/resources/meetups' },
        { name: 'Contact Support', href: '/resources/support' },
        { name: 'Help Center', href: '/resources/help' }
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
                {item.hasDropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-48 bg-htb-background border border-htb-selection-background rounded-md shadow-lg z-50 ${
                    (item.name === 'Products' && isProductsDropdownOpen) || 
                    (item.name === 'Solutions' && isSolutionsDropdownOpen) ||
                    (item.name === 'Resources' && isResourcesDropdownOpen)
                      ? 'block' : 'hidden'
                  }`}>
                    {item.dropdownItems?.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-htb-bright-white hover:bg-htb-selection-background hover:text-htb-bright-green transition-all duration-200"
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                )}
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
  );
};

export default Header;
