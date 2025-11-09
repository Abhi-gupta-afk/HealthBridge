import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  FileText,
  Bell,
  LogOut,
  Users,
  Heart,
  Menu,
  X
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['ADMIN', 'DOCTOR', 'PATIENT'] },
    { path: '/appointments', icon: Calendar, label: 'Appointments', roles: ['DOCTOR', 'PATIENT'] },
    { path: '/payments', icon: CreditCard, label: 'Payments', roles: ['PATIENT'] },
    { path: '/reports', icon: FileText, label: 'Reports', roles: ['DOCTOR', 'PATIENT'] },
    { path: '/notifications', icon: Bell, label: 'Notifications', roles: ['ADMIN', 'DOCTOR', 'PATIENT'] },
    { path: '/admin', icon: Users, label: 'Admin Panel', roles: ['ADMIN'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.roles.some(role => hasRole(role))
  );

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-sky-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">HealthBridge</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.roles?.[0]?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-2 space-y-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
