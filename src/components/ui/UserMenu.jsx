import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';
import { useUser } from '../../context/UserContext';

const UserMenu = () => {
  const { user, isAuthenticated, signOut } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('UserMenu user data:', { user, isAuthenticated }); // Debug log
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSignIn = () => {
    navigate('/user-authentication-login-register');
  };

  const handleSignOut = () => {
    signOut();
    navigate('/user-authentication-login-register');
    toast.success('Signed out successfully');
  };

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  // Improved initials extraction logic
  const getInitials = () => {
    if (user.name && typeof user.name === 'string') {
      if (user.initials) {
        return user.initials;
      }
      const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      return initials || 'U';
    }
    if (user.email && typeof user.email === 'string') {
      return user.email.slice(0, 2).toUpperCase() || 'U';
    }
    return 'U';
  };

  if (!isAuthenticated) {
    return (
      <Button
        variant="primary"
        onClick={handleSignIn}
        className="text-sm px-4 py-2"
      >
        Sign In
      </Button>
    );
  }

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const menuItems = [
    { label: 'Profile Settings', path: '/user-profile-settings', icon: 'User', description: 'Manage your account' },
    { label: 'My Library', path: '/bookmarks-reading-history', icon: 'Bookmark', description: 'Bookmarks & history' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-1 hover:bg-surface rounded-full transition-all duration-150"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface border-2 border-transparent hover:border-accent/20 transition-colors duration-150">
            {avatarError || !user.avatar ? (
              <div className="w-full h-full bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center">
                {getInitials()}
              </div>
            ) : (
              <Image
                src={user.avatar}
                alt={user.name || 'User'}
                className="w-full h-full object-cover"
                onError={handleAvatarError}
              />
            )}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-background rounded-full"></div>
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-text-primary truncate max-w-24">
            {user.name || user.email || 'User'}
          </div>
        </div>
        <Icon
          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          className="hidden md:block text-text-secondary transition-transform duration-150"
        />
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-modal z-1010 animate-slide-down">
          <div className="px-4 py-3 border-b border-border-light">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface">
                {avatarError || !user.avatar ? (
                  <div className="w-full h-full bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center">
                    {getInitials()}
                  </div>
                ) : (
                  <Image
                    src={user.avatar}
                    alt={user.name || 'User'}
                    className="w-full h-full object-cover"
                    onError={handleAvatarError}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">
                  {user.name || user.email || 'User'}
                </div>
                <div className="text-xs text-text-secondary truncate">
                  {user.email || 'No email'}
                </div>
              </div>
            </div>
          </div>
          <div className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={closeDropdown}
                className="flex items-center space-x-3 px-4 py-3 text-left hover:bg-surface transition-colors duration-150 group"
              >
                <Icon
                  name={item.icon}
                  size={18}
                  className="text-text-secondary group-hover:text-accent transition-colors duration-150"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors duration-150">
                    {item.label}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {item.description}
                  </div>
                </div>
                <Icon
                  name="ChevronRight"
                  size={16}
                  className="text-text-secondary group-hover:text-accent transition-colors duration-150"
                />
              </Link>
            ))}
          </div>
          <div className="border-t border-border-light py-2">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-error/5 transition-colors duration-150 group"
            >
              <Icon
                name="LogOut"
                size={18}
                className="text-text-secondary group-hover:text-error transition-colors duration-150"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary group-hover:text-error transition-colors duration-150">
                  Sign Out
                </div>
                <div className="text-xs text-text-secondary">
                  Sign out of your account
                </div>
              </div>
            </button>
          </div>
          <div className="border-t border-border-light px-4 py-2">
            <div className="text-xs text-text-secondary text-center">
              NewsHub v2.1.0
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;