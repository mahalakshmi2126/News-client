import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import CategoryChips from './components/CategoryChips';
import BreakingNewsBanner from './components/BreakingNewsBanner';
import NewsFeed from './components/NewsFeed';
import TrendingSidebar from './components/TrendingSidebar';
import PullToRefresh from './components/PullToRefresh';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TopNewsFeed from './components/TopNewsFeed';
import OnboardingForm from './components/OnboardingForm';
import { toast } from 'react-toastify';
import axios from 'axios';

const PersonalizedNews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedLocation, setSelectedLocation] = useState(() => {
    const stored = localStorage.getItem('selectedLocation');
    return stored ? JSON.parse(stored) : null;
  });
  const [showOnboardingForm, setShowOnboardingForm] = useState(
    location.pathname === '/personalized-news-dashboard/onboarding'
  );
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem('generalUser');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleLocationChange = (event) => {
      if (event.detail?.location) {
        const loc = event.detail.location;
        localStorage.setItem('selectedLocation', JSON.stringify(loc));
        setSelectedLocation(loc);
        document.dispatchEvent(new CustomEvent('weatherlocationChange', { detail: { location: loc } }));
      }
    };
    document.addEventListener('locationChange', handleLocationChange);
    return () => document.removeEventListener('locationChange', handleLocationChange);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowNotificationBadge(true);
      }
    }, 30000);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(notificationInterval);
    };
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshTrigger((prev) => prev + 1);
    setShowNotificationBadge(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openLocationForm = () => {
    document.dispatchEvent(new CustomEvent('openLocationForm'));
  };

  const handleOnboardingComplete = async (updatedUser) => {
    console.log('handleOnboardingComplete:', { updatedUser });
    setUserData(updatedUser);
    localStorage.setItem('generalUser', JSON.stringify(updatedUser));
    toast.success('Reporter application submitted! Awaiting admin approval.');
    setShowOnboardingForm(false);
    navigate('/personalized-news-dashboard', { replace: true });
  };

  const handlePostNewsClick = () => {
    console.log('Post News button clicked');
    const token = localStorage.getItem('authToken');
    const userDataString = localStorage.getItem('generalUser');
    if (!token || token === 'undefined' || token === 'null') {
      toast.warning('Please sign in first – Token missing');
      navigate('/user-authentication-login-register');
      return;
    }
    if (!userDataString) {
      toast.warning('Please sign in first – User data missing');
      navigate('/user-authentication-login-register');
      return;
    }
    try {
      const user = JSON.parse(userDataString);
      if (user.role === 'reporter' && user.isApproved) {
        navigate('/reporter-dashboard');
      } else if (user.role === 'user') {
        if (user.reporterFormSubmitted) {
          toast.info('Your reporter application is pending approval.');
        } else {
          navigate('/personalized-news-dashboard/onboarding');
          setShowOnboardingForm(true);
        }
      } else {
        toast.warning('Only users or approved reporters can access this feature.');
      }
    } catch (err) {
      toast.error('Invalid user data. Please sign in again.');
      navigate('/user-authentication-login-register');
    }
  };

  const handleToggleMobileSearch = () => {
    document.dispatchEvent(new CustomEvent('toggleMobileSearch'));
  };

  return (
  <div className="min-h-screen bg-background pt-14 sm:pt-16">
    <GlobalHeader onToggleMobileSearch={handleToggleMobileSearch} />

    {showOnboardingForm && userData?.role === 'user' && !userData?.reporterFormSubmitted && (
      <OnboardingForm
        onComplete={handleOnboardingComplete}
        isCompleted={userData?.reporterFormSubmitted || false}
        existingData={userData}
      />
    )}

    {!isOnline && (
      <div className="bg-warning text-warning-foreground px-2 sm:px-4 py-2 text-center text-xs sm:text-sm font-medium">
        <Icon name="WifiOff" size={12} className="inline mr-1 sm:mr-2 sm:size-14" />
        You're offline. Some features may not be available.
      </div>
    )}

    {/* Category Chips */}
    <div className="category-container sticky top-14 sm:top-16 z-30 bg-background border-b border-border-light px-2 sm:px-4 py-2 sm:py-3">
      <div className="flex items-center gap-2 w-full max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 overflow-x-auto hide-scrollbar">
          <CategoryChips
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
        <div className="flex-shrink-0">
          <Button
            variant="primary"
            className="ml-2 whitespace-nowrap px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium shadow-sm post-news-button"
            style={{ minWidth: '90px', height: '32px', backgroundColor: '#3b82f6', color: '#fff' }}
            onClick={handlePostNewsClick}
          >
            + Post News
          </Button>
        </div>
      </div>
    </div>

    {/* Breaking News */}
    <div className="breaking-news-container px-2 sm:px-4 py-2 sm:py-3">
      <BreakingNewsBanner selectedCategory={selectedCategory} />
    </div>

    {/* Main + Sidebar */}
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-2 sm:px-4 min-h-[calc(100vh-4rem)] items-start">
      <main className="flex-1 min-w-0 self-stretch">
        <PullToRefresh onRefresh={handleRefresh}>
          <NewsFeed
            selectedCategory={selectedCategory}
            refreshTrigger={refreshTrigger}
            isAdmin={false}
            onDelete={() => setRefreshTrigger((prev) => prev + 1)}
          />
          <TopNewsFeed refreshTrigger={refreshTrigger} />
        </PullToRefresh>
      </main>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:ml-4 w-full max-w-xs sticky top-[100px] self-start">
        <TrendingSidebar
          selectedLocation={selectedLocation?.district || 'Chennai'}
          onToggle={toggleSidebar}
          onLocationChange={openLocationForm}
        />
      </aside>
    </div>

    {/* Mobile Sidebar Slide-In */}
    {isSidebarOpen && (
      <div className="lg:hidden fixed inset-0 z-50 bg-black/60 flex justify-end">
        <div className="w-11/12 max-w-xs bg-background p-4 overflow-y-auto">
          <TrendingSidebar
            selectedLocation={selectedLocation?.district || 'Chennai'}
            onToggle={toggleSidebar}
            onLocationChange={openLocationForm}
          />
          <button
            className="mt-4 text-sm underline text-white"
            onClick={toggleSidebar}
          >
            Close
          </button>
        </div>
      </div>
    )}

    {/* Mobile Toggle Button */}
    <Button
      variant="ghost"
      className="lg:hidden fixed bottom-20 right-4 w-10 h-10 rounded-full shadow-modal bg-background z-50"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
    >
      <Icon name={isSidebarOpen ? 'X' : 'Menu'} size={16} className="sm:size-18" />
    </Button>

    {/* Back to Top */}
    <Button
      variant="secondary"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-12 left-4 w-10 h-10 sm:bottom-16 sm:left-4 sm:w-12 sm:h-12 rounded-full shadow-modal bg-background z-50"
      style={{ opacity: window.scrollY > 500 ? 1 : 0 }}
      aria-label="Back to top"
    >
      <Icon name="ArrowUp" size={16} className="sm:size-18" />
    </Button>

    {/* Notification Badge */}
    {showNotificationBadge && (
      <div className="fixed top-16 right-4 z-40">
        <div className="flex items-center space-x-2">
          {/* Notification badge can go here */}
        </div>
      </div>
    )}

    {/* Styles */}
    <style>{`
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .category-container { overflow: visible; }
      .post-news-button { z-index: 10; }
      @media (max-width: 640px) {
        .category-container { padding: 8px 12px; }
        .breaking-news-container { margin-top: 4px; }
      }
      @media (min-width: 640px) and (max-width: 1024px) {
        .category-container { padding: 12px 16px; }
        .breaking-news-container { margin-top: 6px; }
      }
      @media (min-width: 1024px) {
        .category-container { padding: 16px 24px; }
        .breaking-news-container { margin-top: 8px; }
      }
    `}</style>
  </div>
);

};

export default PersonalizedNews;