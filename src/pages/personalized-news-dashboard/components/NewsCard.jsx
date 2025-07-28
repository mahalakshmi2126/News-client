import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NewsCard = ({ article, onBookmark, onShare, onTranslate }) => {
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked || false);
  const [showActions, setShowActions] = useState(false);
  const cardRef = useRef(null);

  // Hide actions on mobile when clicking outside
  useEffect(() => {
    if (!showActions) return;
    const handleTouchOrClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowActions(false);
      }
    };
    document.addEventListener('touchstart', handleTouchOrClick);
    document.addEventListener('mousedown', handleTouchOrClick);
    return () => {
      document.removeEventListener('touchstart', handleTouchOrClick);
      document.removeEventListener('mousedown', handleTouchOrClick);
    };
  }, [showActions]);

const handleBookmark = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const newBookmarkState = !isBookmarked;
  setIsBookmarked(newBookmarkState);
  onBookmark?.(article.id, newBookmarkState);

  try {
    const token = localStorage.getItem('authToken');
    await axios.post(
  `http://localhost:5000/api/bookmark/${article.id}`,
  {},
  { headers: { Authorization: `Bearer ${token}` } }
);

  } catch (error) {
    toast.error('Failed to update bookmark');
    setIsBookmarked(!newBookmarkState);
  }
};



  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.(article);
  };

  const handleTranslate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onTranslate?.(article);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Map categories to display names and styles
  const getCategoryDisplay = (category) => {
    const categoryMap = {
      sports: { name: 'Sports', style: 'bg-blue-500 text-white' },
      bick: { name: 'Bike', style: 'bg-green-500 text-white' }, // Map "bick" to "Bike"
      general: { name: 'General', style: 'bg-accent text-accent-foreground' },
      breaking: { name: 'Breaking', style: 'bg-error text-error-foreground' },
    };
    return categoryMap[category] || { name: category, style: 'bg-accent text-accent-foreground' };
  };

  const categoryDisplay = getCategoryDisplay(article.category);

  return (
    <article
      ref={cardRef}
      className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-300 group w-full max-w-full sm:max-w-md md:max-w-lg mx-auto"
    >
      <Link to={`/article-reading-view?id=${article.id}`} className="block">
        {/* Article Image */}
        <div
          className="relative aspect-[16/9] overflow-hidden"
          onMouseEnter={() => {
            if (window.matchMedia('(hover: hover)').matches) setShowActions(true);
          }}
          onMouseLeave={() => {
            if (window.matchMedia('(hover: hover)').matches) setShowActions(false);
          }}
          onTouchStart={e => {
            if (!showActions) {
              setShowActions(true);
              e.stopPropagation();
            }
          }}
        >
          <Image
            src={article.imageUrl}
            alt={article.headline}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category Badge */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full ${categoryDisplay.style}`}>
              {categoryDisplay.name}
            </span>
          </div>

          {/* Quick Actions Overlay */}
          <div
            className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${showActions ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            {showActions && (
              <div className="flex space-x-2 sm:space-x-4 sm:gap-3">
                <Button
                  variant="ghost"
                  onClick={handleBookmark}
                  className="bg-background/90 backdrop-blur-sm hover:bg-background p-1.5 sm:p-2"
                >
                  <Icon
                    name={isBookmarked ? 'BookmarkCheck' : 'Bookmark'}
                    size={14}
                    className={isBookmarked ? 'text-accent' : 'text-text-secondary'}
                  />
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleShare}
                  className="bg-background/90 backdrop-blur-sm hover:bg-background p-1.5 sm:p-2"
                >
                  <Icon name="Share2" size={14} className="text-text-secondary" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="p-2 xs:p-3 sm:p-4">
          {/* Headline */}
          <h2 className="text-sm xs:text-base sm:text-lg font-heading font-semibold text-text-primary mb-1 xs:mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
            {article.headline}
          </h2>

          {/* Summary */}
          <p className="text-xs xs:text-sm sm:text-base text-text-secondary line-clamp-3 mb-1.5 xs:mb-2 sm:mb-3">
            {article.summary}
          </p>

          {/* Engagement Metrics */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 xs:gap-2 sm:gap-0">
            <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-0.5 xs:space-x-1">
                <Icon name="Eye" size={12} className="text-text-secondary" />
                <span className="text-[10px] xs:text-xs sm:text-sm text-text-secondary">
                  {article.views.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-0.5 xs:space-x-1">
                <Icon name="MessageCircle" size={12} className="text-text-secondary" />
                <span className="text-[10px] xs:text-xs sm:text-sm text-text-secondary">
                  {article.comments}
                </span>
              </div>
              <div className="flex items-center space-x-0.5 xs:space-x-4">
                <Icon name="Share2" size={12} className="text-text-secondary" />
                <span className="text-[10px] xs:text-xs sm:text-sm text-text-secondary">
                  {article.shares}
                </span>
              </div>
            </div>

            {/* Reading Time */}
            <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-2.5">
              <Icon name="Clock" size={12} className="text-text-secondary" />
              <span className="text-[10px] xs:text-xs sm:text-sm text-text-secondary">
                {article.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default NewsCard;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Icon from '../../../components/AppIcon';
// import Image from '../../../components/AppImage';
// import Button from '../../../components/ui/Button';

// const NewsCard = ({ article, onBookmark, onShare, onTranslate, onDelete, isAdmin }) => {
//   const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked || false);
//   const [showActions, setShowActions] = useState(false);

//   const handleBookmark = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsBookmarked(!isBookmarked);
//     onBookmark?.(article._id, !isBookmarked);
//   };

//   const handleShare = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     onShare?.(article);
//   };

//   const handleTranslate = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     onTranslate?.(article);
//   };

//   const handleDelete = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (window.confirm("Are you sure you want to delete this article?")) {
//       onDelete?.(article._id);
//     }
//   };

//   const getTimeAgo = (timestamp) => {
//     const now = new Date();
//     const diff = now - new Date(timestamp);
//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(diff / 3600000);
//     const days = Math.floor(diff / 86400000);

//     if (minutes < 60) return `${minutes}m ago`;
//     if (hours < 24) return `${hours}h ago`;
//     return `${days}d ago`;
//   };

//   return (
//     <article className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-300 group">
//       <Link to={`/article-reading-view?id=${article._id}`} className="block">
//         <div className="relative aspect-video overflow-hidden">
//           <Image
//             src={article.imageUrl}
//             alt={article.title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//           <div className="absolute top-3 left-3">
//             <span className="px-2 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium text-text-primary rounded-full">
//               {article.language.toUpperCase()}
//             </span>
//           </div>
//           <div className="absolute top-3 right-3">
//             <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//               article.category === 'breaking' ? 'bg-error text-error-foreground' : 'bg-accent text-accent-foreground'
//             }`}>
//               {article.category}
//             </span>
//           </div>

//           <div
//             className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
//             onMouseEnter={() => setShowActions(true)}
//             onMouseLeave={() => setShowActions(false)}
//           >
//             {showActions && (
//               <div className="flex space-x-2">
//                 <Button variant="ghost" onClick={handleBookmark} className="bg-background/90 backdrop-blur-sm hover:bg-background p-2">
//                   <Icon
//                     name={isBookmarked ? "BookmarkCheck" : "Bookmark"}
//                     size={16}
//                     className={isBookmarked ? "text-accent" : "text-text-secondary"}
//                   />
//                 </Button>
//                 <Button variant="ghost" onClick={handleShare} className="bg-background/90 backdrop-blur-sm hover:bg-background p-2">
//                   <Icon name="Share2" size={16} className="text-text-secondary" />
//                 </Button>
//                 <Button variant="ghost" onClick={handleTranslate} className="bg-background/90 backdrop-blur-sm hover:bg-background p-2">
//                   <Icon name="Languages" size={16} className="text-text-secondary" />
//                 </Button>
//                 {isAdmin && (
//                   <Button variant="ghost" onClick={handleDelete} className="bg-background/90 backdrop-blur-sm hover:bg-background p-2">
//                     <Icon name="Trash" size={16} className="text-red-500" />
//                   </Button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="p-4">
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center space-x-2">
//               <Image
//                 src={article?.source?.logo}
//                 alt={article?.source?.name}
//                 className="w-5 h-5 rounded-full"
//               />
//               <span className="text-sm font-medium text-text-secondary">
//                 {article.source.name}
//               </span>
//             </div>
//             <span className="text-xs text-text-secondary">
//               {getTimeAgo(article.publishedAt)}
//             </span>
//           </div>

//           <h2 className="text-lg font-heading font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
//             {article.title}
//           </h2>

//           <p className="text-sm text-text-secondary line-clamp-3 mb-3">
//             {article.content}
//           </p>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-1">
//                 <Icon name="Eye" size={14} className="text-text-secondary" />
//                 <span className="text-xs text-text-secondary">
//                   {article?.views?.toLocaleString()?.() || 0}
//                 </span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Icon name="MessageCircle" size={14} className="text-text-secondary" />
//                 <span className="text-xs text-text-secondary">
//                   {article.comments}
//                 </span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Icon name="Share2" size={14} className="text-text-secondary" />
//                 <span className="text-xs text-text-secondary">
//                   {article.shares}
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Icon name="Clock" size={14} className="text-text-secondary" />
//               <span className="text-xs text-text-secondary">
//                 {article.readingTime} min read
//               </span>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// };

// export default NewsCard;