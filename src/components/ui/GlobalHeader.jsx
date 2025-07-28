import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import LocationSelector from './LocationSelector';
// import SearchInterface from './SearchInterface';
import UserMenu from './UserMenu';

const GlobalHeader = ({ onToggleMobileSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/personalized-news-dashboard',
      icon: 'Home',
      isActive: location.pathname === '/personalized-news-dashboard',
    },
    {
      label: 'My Library',
      path: '/bookmarks-reading-history',
      icon: 'Bookmark',
      isActive: location.pathname === '/bookmarks-reading-history',
    },
    {
      label: 'Profile',
      path: '/user-profile-settings',
      icon: 'User',
      isActive: location.pathname === '/user-profile-settings',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileSearchToggle = () => {
    if (onToggleMobileSearch) {
      onToggleMobileSearch();
    }
    document.dispatchEvent(new CustomEvent('toggleMobileSearch'));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] bg-background transition-all duration-200 ${
        isScrolled ? 'shadow-card backdrop-blur-md bg-background/95' : ''
      }`}
    >
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link
            to="/personalized-news-dashboard"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-150"
            onClick={closeMobileMenu}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Newspaper" size={16} sm:size-20 color="white" />
            </div>
            <span className="text-base sm:text-lg md:text-xl font-heading font-semibold text-primary">
              NewsHub
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 hover:bg-surface ${
                  item.isActive
                    ? 'text-accent bg-surface'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={item.icon} size={14} sm:size-16 />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            {/* <div className="hidden lg:block">
              <SearchInterface />
            </div> */}
            <div className="hidden md:block">
              <LocationSelector />
            </div>
            <UserMenu />
            <Button
              variant="ghost"
              className="md:hidden p-1 sm:p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={18} sm:size-20 />
            </Button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border-light bg-background">
            <nav className="py-2 sm:py-4 space-y-1 sm:space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-150 hover:bg-surface ${
                    item.isActive
                      ? 'text-accent bg-surface border-r-2 border-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={item.icon} size={18} sm:size-20 />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="px-4 py-2 sm:py-3">
                <LocationSelector />
              </div>
              {/* <div className="px-4 py-2 sm:py-3">
                <SearchInterface isMobile />
              </div> */}
            </nav>
          </div>
        )}
      </div>
      {/* <SearchInterface isMobileOverlay /> */}
      <style>{`
        .header-container { overflow: visible; }
        @media (max-width: 640px) {
          .header-container { padding: 8px 12px; }
        }
        @media (min-width: 640px) and (max-width: 1024px) {
          .header-container { padding: 12px 16px; }
        }
        @media (min-width: 1024px) {
          .header-container { padding: 16px 24px; }
        }
      `}</style>
    </header>
  );
};

export default GlobalHeader;