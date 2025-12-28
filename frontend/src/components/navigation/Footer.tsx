import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  className = ''
}) => {
  return (
    <footer className={`bg-htb-background border-t border-htb-selection-background ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-htb-blue rounded-lg">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <h3 className="text-lg font-semibold text-htb-foreground">LETHCON</h3>
            </div>
            <p className="text-htb-bright-black text-sm">
              Your comprehensive cybersecurity training platform. Learn through hands-on labs and challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-htb-foreground font-medium mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-htb-bright-black hover:text-htb-blue text-sm transition-colors">
                  Labs
                </a>
              </li>
              <li>
                <a href="#" className="text-htb-bright-black hover:text-htb-blue text-sm transition-colors">
                  Challenges
                </a>
              </li>
              <li>
                <a href="#" className="text-htb-bright-black hover:text-htb-blue text-sm transition-colors">
                  Learning Paths
                </a>
              </li>
              <li>
                <a href="#" className="text-htb-bright-black hover:text-htb-blue text-sm transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-htb-foreground font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-htb-bright-black hover:text-htb-blue text-sm transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-htb-bright-black hover:text-htb-blue text-sm transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-htb-bright-black hover:text-htb-blue text-sm transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-htb-bright-black hover:text-htb-blue text-sm transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-htb-selection-background mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-htb-bright-black text-sm">
            © 2024 LETHCON. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-htb-bright-black hover:text-htb-blue text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-htb-bright-black hover:text-htb-blue text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-htb-bright-black hover:text-htb-blue text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;