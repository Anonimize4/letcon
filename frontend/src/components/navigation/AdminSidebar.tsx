import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  FlaskConical,
  LayoutDashboard,
  Settings,
  Shield,
  BarChart3,
  Database,
  FileText,
  Server,
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    title: 'User Management',
    icon: Users,
    path: '/admin/users'
  },
  {
    title: 'Lab Management',
    icon: FlaskConical,
    path: '/admin/labs'
  }
];

const otherItems = [
  {
    title: 'Content Management',
    icon: FileText,
    path: '/admin/content'
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    path: '/admin/analytics'
  },
  {
    title: 'System Monitor',
    icon: Server,
    path: '/admin/system'
  },
  {
    title: 'Database',
    icon: Database,
    path: '/admin/database'
  },
  {
    title: 'Docker Management',
    icon: LayoutDashboard,
    path: '/admin/docker'
  },
  {
    title: 'Audit Logs',
    icon: FileText,
    path: '/admin/audit-logs'
  },
  {
    title: 'Security Center',
    icon: Shield,
    path: '/admin/security'
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/admin/settings'
  }
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-htb-selection-background border-r border-htb-selection-background transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-htb-selection-background">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-htb-blue/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-htb-blue" />
              </div>
              <span className="text-lg font-semibold text-htb-bright-white">
                Admin Panel
              </span>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-md text-htb-foreground hover:text-htb-bright-white hover:bg-htb-selection-background/50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-6">
              <p className="text-xs font-medium text-htb-foreground uppercase tracking-wider">
                Main
              </p>
            </div>
            <ul className="space-y-1 px-3 mb-6">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-htb-blue/20 text-htb-blue'
                          : 'text-htb-foreground hover:text-htb-bright-white hover:bg-htb-selection-background/50'
                      }`
                    }
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="px-4 mb-6">
              <p className="text-xs font-medium text-htb-foreground uppercase tracking-wider">
                Others
              </p>
            </div>
            <ul className="space-y-1 px-3">
              {otherItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-htb-blue/20 text-htb-blue'
                          : 'text-htb-foreground hover:text-htb-bright-white hover:bg-htb-selection-background/50'
                      }`
                    }
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-htb-selection-background p-4">
            <button className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-htb-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

// Mobile toggle button component for use in the header
export const AdminSidebarToggle: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-lg text-htb-foreground hover:text-htb-bright-white hover:bg-htb-selection-background/50 transition-colors"
  >
    <Menu className="h-5 w-5" />
  </button>
);

export default AdminSidebar;

