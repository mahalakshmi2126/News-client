// import React, { useState, useEffect } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';

// const FloatingToolbar = ({ 
//   isBookmarked, 
//   onToggleBookmark, 
//   onShare, 
//   articleRating, 
//   onRateArticle,
//   onToggleAudio,
//   isAudioPlaying 
// }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [userRating, setUserRating] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrolled = window.scrollY;
//       setIsVisible(scrolled > 300);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleRatingSubmit = (rating) => {
//     setUserRating(rating);
//     onRateArticle(rating);
//     setShowRatingModal(false);
//   };

//   const toolbarItems = [
//     {
//       icon: isBookmarked ? 'Bookmark' : 'BookmarkPlus',
//       label: isBookmarked ? 'Bookmarked' : 'Bookmark',
//       onClick: onToggleBookmark,
//       active: isBookmarked,
//       color: isBookmarked ? 'text-accent' : 'text-text-secondary'
//     },
//     {
//       icon: 'Share2',
//       label: 'Share',
//       onClick: onShare,
//       active: false,
//       color: 'text-text-secondary'
//     },
//     {
//       icon: 'Star',
//       label: 'Rate',
//       onClick: () => setShowRatingModal(true),
//       active: userRating > 0,
//       color: userRating > 0 ? 'text-yellow-500' : 'text-text-secondary'
//     },
//     {
//       icon: isAudioPlaying ? 'Pause' : 'Play',
//       label: isAudioPlaying ? 'Pause' : 'Listen',
//       onClick: onToggleAudio,
//       active: isAudioPlaying,
//       color: isAudioPlaying ? 'text-accent' : 'text-text-secondary'
//     }
//   ];

//   return (
//     <>
//       {/* Floating Toolbar */}
//       <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 ${
//         isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
//       }`}>
//         <div className="bg-background/95 backdrop-blur-md border border-border rounded-full shadow-modal p-2 space-y-2">
//           {toolbarItems.map((item, index) => (
//             <Button
//               key={index}
//               variant="ghost"
//               onClick={item.onClick}
//               className={`w-12 h-12 rounded-full p-0 hover:bg-surface transition-all duration-150 ${item.color}`}
//               aria-label={item.label}
//               title={item.label}
//             >
//               <Icon name={item.icon} size={20} />
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Rating Modal */}
//       {showRatingModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-background border border-border rounded-lg shadow-modal p-6 max-w-sm w-full mx-4">
//             <div className="text-center mb-6">
//               <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
//                 Rate this Article
//               </h3>
//               <p className="text-sm text-text-secondary">
//                 How would you rate the quality of this article?
//               </p>
//             </div>

//             {/* Star Rating */}
//             <div className="flex items-center justify-center space-x-2 mb-6">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   onClick={() => handleRatingSubmit(star)}
//                   className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 ${
//                     star <= userRating 
//                       ? 'text-yellow-500' :'text-text-secondary hover:text-yellow-400'
//                   }`}
//                 >
//                   <Icon 
//                     name={star <= userRating ? 'Star' : 'Star'} 
//                     size={24}
//                     className={star <= userRating ? 'fill-current' : ''}
//                   />
//                 </button>
//               ))}
//             </div>

//             {/* Rating Labels */}
//             <div className="text-center mb-6">
//               <div className="text-sm text-text-secondary">
//                 {userRating === 0 && 'Click a star to rate'}
//                 {userRating === 1 && 'Poor'}
//                 {userRating === 2 && 'Fair'}
//                 {userRating === 3 && 'Good'}
//                 {userRating === 4 && 'Very Good'}
//                 {userRating === 5 && 'Excellent'}
//               </div>
//             </div>

//             {/* Current Article Rating */}
//             {articleRating && (
//               <div className="text-center mb-6 p-3 bg-surface rounded-lg">
//                 <div className="text-sm text-text-secondary mb-1">Article Rating</div>
//                 <div className="flex items-center justify-center space-x-1">
//                   <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
//                   <span className="font-medium text-text-primary">
//                     {articleRating.average.toFixed(1)}
//                   </span>
//                   <span className="text-text-secondary">
//                     ({articleRating.count} ratings)
//                   </span>
//                 </div>
//               </div>
//             )}

//             {/* Actions */}
//             <div className="flex items-center space-x-3">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowRatingModal(false)}
//                 className="flex-1"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="primary"
//                 onClick={() => handleRatingSubmit(userRating)}
//                 disabled={userRating === 0}
//                 className="flex-1"
//               >
//                 Submit Rating
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FloatingToolbar;