import React from 'react';

interface HeaderProps {
  title?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = 'LETHCON',
  className = ''
}) => {
  const navItems = [
    {
      name: 'Products',
      href: '#'
    },
    {
      name: 'Labs',
      href: '#'
    },
    {
      name: 'Community',
      href: '#'
    },
    {
      name: 'Pricing',
      href: '#'
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
            <h1 className="text-xl font-semibold text-htb-foreground">{title}</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-htb-foreground hover:text-htb-bright-green px-3 py-2 text-sm font-medium transition-all duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <button className="bg-htb-bright-green hover:bg-htb-bright-green/90 hover:scale-105 text-htb-black px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform">
              Start Learning
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
