// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Icon from '../../../components/AppIcon';
// const URL = import.meta.env.VITE_API_BASE_URL;
// const BreakingNewsBanner = () => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [breakingNews, setBreakingNews] = useState([]);

//   // ✅ Fetch news based on selected location
//   const fetchBreakingNews = async () => {
//     try {
//       const selected = JSON.parse(localStorage.getItem('selectedLocation') || '{}');
//       const params = new URLSearchParams();

//       if (selected.state) params.append('state', selected.state);
//       if (selected.district) params.append('district', selected.district);
//       if (selected.taluk) params.append('taluk', selected.taluk);

//       const res = await fetch(`${URL}/news/get?${params.toString()}`);
//       const data = await res.json();

//       if (data.success) {
//         setBreakingNews(data.articles);
//         setCurrentIndex(0);
//       }
//     } catch (err) {
//       console.error('Failed to fetch breaking news:', err);
//     }
//   };


//   // ✅ Initial fetch on mount
//   useEffect(() => {
//     fetchBreakingNews();
//   }, []);

//   // ✅ Refetch when location changes
//   useEffect(() => {
//     const handleLocationChange = () => {
//       fetchBreakingNews();
//     };

//     document.addEventListener('locationChange', handleLocationChange);
//     return () => {
//       document.removeEventListener('locationChange', handleLocationChange);
//     };
//   }, []);

//   // ✅ Auto-cycle through headlines
//   useEffect(() => {
//     if (breakingNews.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [breakingNews]);

//   if (!isVisible) return null;

//   const currentNews = breakingNews[currentIndex];

//   return (
//     <div className="bg-error text-error-foreground w-full">
//       <div className="px-2 py-2 sm:px-4 sm:py-3">
//         {breakingNews.length === 0 ? (
//           <div className="text-xs sm:text-sm text-center py-2 text-error-foreground opacity-80">
//             No breaking news for the selected location.
//           </div>
//         ) : (
//           <div
//             className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0"
//             style={{
//               wordBreak: 'break-word',
//               minHeight: '2.5rem',
//             }}
//           >
//             {/* Left: Breaking Label + Headline */}
//             <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0 overflow-x-auto hide-scrollbar">
//               <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
//                 <div className="w-2 h-2 bg-error-foreground rounded-full animate-pulse"></div>
//                 <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">Breaking</span>
//               </div>
//               <Link
//                 to={`/article-reading-view?id=${currentNews._id}`}
//                 className="flex-1 min-w-0 hover:underline"
//                 style={{ minWidth: 0 }}
//               >
//                 <p className="text-xs sm:text-sm font-medium truncate max-w-[70vw] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl">
//                   {currentNews.title}
//                 </p>
//                 <p className="text-[10px] sm:text-xs opacity-90">
//                   {new Date(currentNews.createdAt).toLocaleString([], {
//                     dateStyle: 'medium',
//                     timeStyle: 'short',
//                   })}
//                 </p>
//               </Link>
//             </div>
//             {/* Right: Dots + Close Button */}
//             <div className="flex items-center space-x-1 sm:space-x-2 mt-0 ml-0 sm:ml-3 flex-shrink-0 min-w-fit">
//               {breakingNews.length > 1 && (
//                 <div className="flex space-x-0.5 sm:space-x-1">
//                   {breakingNews.map((_, index) => (
//                     <div
//                       key={index}
//                       className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-opacity duration-300 ${index === currentIndex
//                         ? 'bg-error-foreground'
//                         : 'bg-error-foreground/50'
//                       }`}
//                     />
//                   ))}
//                 </div>
//               )}
//               <button
//                 onClick={() => setIsVisible(false)}
//                 className="p-0.5 sm:p-1 hover:bg-error-foreground/20 rounded transition-colors duration-150 flex items-center justify-center"
//                 aria-label="Close breaking news banner"
//                 style={{ minWidth: 24, minHeight: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//               >
//                 <Icon name="X" size={14} className="sm:w-4 sm:h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       {/* Hide scrollbars for horizontal scroll areas */}
//       <style>{`
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// };

// export default BreakingNewsBanner;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import Icon from '../../../components/AppIcon';

const URL = import.meta.env.VITE_API_BASE_URL;

const BreakingNewsBanner = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isVideoMedia = (mediaUrl) => {
    if (!mediaUrl || typeof mediaUrl !== 'string') return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => mediaUrl.toLowerCase().endsWith(ext));
  };

  const getThumbnailUrl = (mediaUrl) => {
    if (!mediaUrl || typeof mediaUrl !== 'string') return '/fallback-news.jpg';
    if (isVideoMedia(mediaUrl)) {
      return mediaUrl.includes('/upload/')
        ? mediaUrl.replace('/upload/', '/upload/so_0/').replace(/\.\w+$/, '.jpg')
        : '/fallback-news.jpg';
    }
    return mediaUrl.startsWith('http') ? mediaUrl : `${URL}/${mediaUrl.replace(/\\/g, '/')}`;
  };

  const fetchBreakingNews = async () => {
    try {
      const selected = JSON.parse(localStorage.getItem('selectedLocation') || '{}');
      const params = new URLSearchParams();
      if (selected.state) params.append('state', selected.state);
      if (selected.district) params.append('district', selected.district);
      if (selected.taluk) params.append('taluk', selected.taluk);

      const res = await fetch(`${URL}/news/get?${params.toString()}`);
      const data = await res.json();

      if (data.success && data.articles.length > 0) {
        const formatted = data.articles.map(article => ({
          ...article,
          image: getThumbnailUrl(article.media?.[0]),
          likes: article.likes || 0,
          comments: article.comments || 0,
          createdTime: new Date(article.createdAt).toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'short',
          }),
        }));
        setBreakingNews(formatted);
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error('Failed to fetch breaking news:', err);
    }
  };

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  useEffect(() => {
    const handleLocationChange = () => fetchBreakingNews();
    document.addEventListener('locationChange', handleLocationChange);
    return () => document.removeEventListener('locationChange', handleLocationChange);
  }, []);

  useEffect(() => {
    if (breakingNews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % breakingNews.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [breakingNews]);

  const current = breakingNews[currentIndex];

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length),
    onSwipedRight: () =>
      setCurrentIndex((prev) => (prev - 1 + breakingNews.length) % breakingNews.length),
    trackMouse: true,
  });

  if (!current) {
    return (
      <div className="w-full bg-background border rounded-lg p-4 text-center text-sm text-muted-foreground">
        No breaking news available for your location.
      </div>
    );
  }

  return (
    <div
      {...handlers}
      className="w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-md relative"
    >
      {/* Image with full coverage */}
      <Link to={`/article-reading-view?id=${current._id}`}>
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-[300px] sm:h-[350px] object-cover"
        />
      </Link>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
        <div className="text-xs opacity-90 flex items-center gap-2 mb-1">
          {current.source && (
            <span className="bg-white text-black text-[10px] px-1.5 py-0.5 rounded-sm font-semibold uppercase">
              {current.source}
            </span>
          )}
          <span>{current.createdTime}</span>
        </div>
        <h2 className="text-sm sm:text-lg font-bold line-clamp-2">
          {current.title}
        </h2>
      </div>

      {/* Left & Right arrows */}
      {breakingNews.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + breakingNews.length) % breakingNews.length)
            }
            className="absolute top-1/2 left-2 sm:left-3 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % breakingNews.length)
            }
            className="absolute top-1/2 right-2 sm:right-3 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </>
      )}

      {/* Custom Dot Indicator (centered bottom like your screenshot) */}
      <div className="absolute bottom-2 w-full flex justify-center items-center">
        <div className="bg-black/70 rounded-full px-3 py-1 flex gap-1">
          {breakingNews.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
            />
          ))}
        </div>
      </div>
    </div>

  );
};

export default BreakingNewsBanner;