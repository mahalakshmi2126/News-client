import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BreakingNewsBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [breakingNews, setBreakingNews] = useState([]);

  // ✅ Fetch news based on selected location
  const fetchBreakingNews = async () => {
    try {
      const selected = JSON.parse(localStorage.getItem('selectedLocation') || '{}');
      const params = new URLSearchParams();

      if (selected.state) params.append('state', selected.state);
      if (selected.district) params.append('district', selected.district);
      if (selected.taluk) params.append('taluk', selected.taluk);

      const res = await fetch(`http://localhost:5000/api/news/get?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setBreakingNews(data.articles);
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error('Failed to fetch breaking news:', err);
    }
  };


  // ✅ Initial fetch on mount
  useEffect(() => {
    fetchBreakingNews();
  }, []);

  // ✅ Refetch when location changes
  useEffect(() => {
    const handleLocationChange = () => {
      fetchBreakingNews();
    };

    document.addEventListener('locationChange', handleLocationChange);
    return () => {
      document.removeEventListener('locationChange', handleLocationChange);
    };
  }, []);

  // ✅ Auto-cycle through headlines
  useEffect(() => {
    if (breakingNews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [breakingNews]);

  if (!isVisible) return null;

  const currentNews = breakingNews[currentIndex];

  return (
    <div className="bg-error text-error-foreground w-full">
      <div className="px-2 py-2 sm:px-4 sm:py-3">
        {breakingNews.length === 0 ? (
          <div className="text-xs sm:text-sm text-center py-2 text-error-foreground opacity-80">
            No breaking news for the selected location.
          </div>
        ) : (
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0"
            style={{
              wordBreak: 'break-word',
              minHeight: '2.5rem',
            }}
          >
            {/* Left: Breaking Label + Headline */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0 overflow-x-auto hide-scrollbar">
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <div className="w-2 h-2 bg-error-foreground rounded-full animate-pulse"></div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">Breaking</span>
              </div>
              <Link
                to={`/article-reading-view?id=${currentNews._id}`}
                className="flex-1 min-w-0 hover:underline"
                style={{ minWidth: 0 }}
              >
                <p className="text-xs sm:text-sm font-medium truncate max-w-[70vw] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl">
                  {currentNews.title}
                </p>
                <p className="text-[10px] sm:text-xs opacity-90">
                  {new Date(currentNews.createdAt).toLocaleString([], {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </Link>
            </div>
            {/* Right: Dots + Close Button */}
            <div className="flex items-center space-x-1 sm:space-x-2 mt-0 ml-0 sm:ml-3 flex-shrink-0 min-w-fit">
              {breakingNews.length > 1 && (
                <div className="flex space-x-0.5 sm:space-x-1">
                  {breakingNews.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-opacity duration-300 ${index === currentIndex
                        ? 'bg-error-foreground'
                        : 'bg-error-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              )}
              <button
                onClick={() => setIsVisible(false)}
                className="p-0.5 sm:p-1 hover:bg-error-foreground/20 rounded transition-colors duration-150 flex items-center justify-center"
                aria-label="Close breaking news banner"
                style={{ minWidth: 24, minHeight: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon name="X" size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Hide scrollbars for horizontal scroll areas */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default BreakingNewsBanner;