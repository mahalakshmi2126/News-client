import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-background border-b border-border-light relative">
      <div className="max-w-md mx-auto px-30 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/user-authentication-login-register"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-150"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Newspaper" size={20} color="white" />
            </div>
            <span className="text-lg font-heading font-semibold text-primary">
              NewsHub
            </span>
          </Link>

          {/* User Icon with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(prev => !prev)}
              className="p-2 px-5 rounded-full hover:bg-accent/10 transition"
            >
              <Icon name="User" size={22} className="text-text-primary" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-border-light rounded shadow-lg z-50">
                <Link
                  to="/reporter-dashboard"
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-accent/10"
                  onClick={() => setShowMenu(false)}
                >
                  Reporter Dashboard
                </Link>
                <Link
                  to="/admin-dashboard"
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-accent/10"
                  onClick={() => setShowMenu(false)}
                >
                  Admin Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;