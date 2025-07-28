// import React from 'react';
// import { Link } from 'react-router-dom';
// import Icon from '../../../components/AppIcon';
// import Image from '../../../components/AppImage';

// const HistoryItem = ({ item, onRemove }) => {
//   const formatDate = (date) => {
//     const now = new Date();
//     const itemDate = new Date(date);
//     const diffInHours = Math.floor((now - itemDate) / (1000 * 60 * 60));

//     if (diffInHours < 1) {
//       return 'Just now';
//     } else if (diffInHours < 24) {
//       return `${diffInHours}h ago`;
//     } else if (diffInHours < 48) {
//       return 'Yesterday';
//     } else {
//       return itemDate.toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: itemDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
//       });
//     }
//   };

//   const getLanguageFlag = (language) => {
//     const flags = {
//       en: '🇺🇸',
//       es: '🇪🇸',
//       fr: '🇫🇷',
//       de: '🇩🇪',
//       it: '🇮🇹',
//       pt: '🇵🇹',
//       ru: '🇷🇺',
//       zh: '🇨🇳',
//       ja: '🇯🇵',
//       ko: '🇰🇷',
//       ar: '🇸🇦',
//       hi: '🇮🇳',
//       ta: '🇮🇳',
//     };
//     return flags[language] || '🌐';
//   };

//   const getCompletionColor = (percentage) => {
//     if (percentage >= 90) return 'text-success';
//     if (percentage >= 50) return 'text-warning';
//     return 'text-text-secondary';
//   };

//   return (
//     <div className="group flex items-start space-x-4 p-4 hover:bg-surface rounded-lg transition-colors duration-150">
//       <Link to={`/article-reading-view?id=${item._id}`} className="flex-shrink-0">
//         <div className="w-20 h-14 rounded-lg overflow-hidden bg-surface">
//           <Image
//             src={item.image || '/default-news.jpg'}
//             alt={item.title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         </div>
//       </Link>

//       <div className="flex-1 min-w-0">
//         <Link to={`/article-reading-view?id=${item._id}`}>
//           <h3 className="text-sm font-medium text-text-primary mb-1 line-clamp-2 group-hover:text-accent transition-colors duration-150">
//             {item.title || 'Untitled'}
//           </h3>
//         </Link>

//         <div className="flex items-center space-x-3 text-xs text-text-secondary mb-2">
//           <div className="flex items-center space-x-1">
//             <span>{getLanguageFlag(item.language)}</span>
//             <span>{item.source || 'Unknown'}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Icon name="Clock" size={12} />
//             <span>{formatDate(item.readDate)}</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div className="w-16 h-1 bg-surface rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-accent transition-all duration-300"
//                 style={{ width: `${item.readingProgress || 0}%` }}
//               ></div>
//             </div>
//             <span className={`text-xs font-medium ${getCompletionColor(item.readingProgress || 0)}`}>
//               {item.readingProgress || 0}%
//             </span>
//           </div>

//           <div className="flex items-center space-x-1 text-xs text-text-secondary">
//             <Icon name="Timer" size={12} />
//             <span>{item.timeSpent || 0}m</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//         <button
//           onClick={() => onRemove(item._id)}
//           className="p-1 text-text-secondary hover:text-error transition-colors duration-150"
//           title="Remove from history"
//         >
//           <Icon name="X" size={16} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HistoryItem;