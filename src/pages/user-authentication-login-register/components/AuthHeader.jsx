import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-background border-b border-border-light relative w-full">
      <div className="w-full max-w-md mx-auto px-3 xs:px-4 sm:px-8 py-3 xs:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/user-authentication-login-register"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-150"
          >
            <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Newspaper" size={18} className="xs:size-20 sm:size-22" color="white" />
            </div>
            <span className="text-base xs:text-lg sm:text-xl font-heading font-semibold text-primary">
              NewsHub
            </span>
          </Link>

          {/* User Icon with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(prev => !prev)}
              className="p-2 xs:p-2.5 sm:p-3 rounded-full hover:bg-accent/10 transition"
            >
              <Icon name="User" size={20} className="text-text-primary" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 xs:w-40 bg-white border border-border-light rounded shadow-lg z-50">
                <Link
                  to="/reporter-dashboard"
                  className="block px-3 xs:px-4 py-2 text-xs xs:text-sm sm:text-base text-text-primary hover:bg-accent/10"
                  onClick={() => setShowMenu(false)}
                >
                  Reporter Dashboard
                </Link>
                <Link
                  to="/admin-dashboard"
                  className="block px-3 xs:px-4 py-2 text-xs xs:text-sm sm:text-base text-text-primary hover:bg-accent/10"
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
