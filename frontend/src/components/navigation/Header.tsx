import React from 'react';

interface HeaderProps {
  title?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'LETHCON',
  className = '' 
}) => {
  return (
    <header className={`bg-htb-background border-b border-htb-selectionBackground ${className}`}>
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

          {/* Navigation/Empty List Section */}
          <nav className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              {/* Empty list container - can be populated later */}
              <ul className="flex items-center space-x-6">
                {/* List items will go here - currently empty */}
              </ul>
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Placeholder for user menu or actions */}
            <div className="w-8 h-8 bg-htb-selectionBackground rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
