import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileSpreadsheet, Home, Settings } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Setup', href: '/setup', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center space-x-3">
            <FileSpreadsheet className="h-9 w-9 text-green-600" />
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Excel Mock Interviewer
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-base font-medium transition-colors duration-150 ${
                    isActive(item.href)
                      ? 'bg-green-100 text-green-700 shadow'
                      : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Tagline */}
          <div className="hidden md:block text-sm text-gray-500 font-light ml-6">
            AI-Powered Excel Assessment
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
