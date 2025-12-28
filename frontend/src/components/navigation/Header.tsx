import React from 'react';

interface HeaderProps {
  title?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'Cybersecurity Training Platform',
  className = '' 
}) => {
  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
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
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
