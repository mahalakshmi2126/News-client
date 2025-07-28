// import React from 'react';
// import Icon from '../../../components/AppIcon';

// const ReadingStats = ({ stats }) => {
//   const formatDuration = (minutes) => {
//     if (minutes < 60) {
//       return `${Math.round(minutes)}m`;
//     }
//     const hours = Math.floor(minutes / 60);
//     const remainingMinutes = minutes % 60;
//     return `${hours}h ${remainingMinutes}m`;
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

//   return (
//     <div className="bg-background border border-border rounded-lg p-6">
//       <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Reading Statistics</h3>

//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="text-center p-4 bg-surface rounded-lg">
//           <div className="text-2xl font-bold text-accent mb-1">{stats.totalArticles}</div>
//           <div className="text-sm text-text-secondary">Articles Read</div>
//         </div>
//         <div className="text-center p-4 bg-surface rounded-lg">
//           <div className="text-2xl font-bold text-success mb-1">{formatDuration(stats.totalReadingTime)}</div>
//           <div className="text-sm text-text-secondary">Reading Time</div>
//         </div>
//         <div className="text-center p-4 bg-surface rounded-lg">
//           <div className="text-2xl font-bold text-warning mb-1">{stats.bookmarksCount}</div>
//           <div className="text-sm text-text-secondary">Bookmarks</div>
//         </div>
//         <div className="text-center p-4 bg-surface rounded-lg">
//           <div className="text-2xl font-bold text-primary mb-1">{stats.averageCompletion}%</div>
//           <div className="text-sm text-text-secondary">Avg Completion</div>
//         </div>
//       </div>

//       <div className="mb-6">
//         <h4 className="text-sm font-semibold text-text-primary mb-3">Reading by Language</h4>
//         <div className="space-y-2">
//           {(stats.topLanguages || []).map((lang) => (
//             <div key={lang.code} className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <span className="text-lg">{getLanguageFlag(lang.code)}</span>
//                 <span className="text-sm text-text-primary">{lang.name}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-20 h-2 bg-surface rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-accent transition-all duration-300"
//                     style={{ width: `${lang.percentage}%` }}
//                   ></div>
//                 </div>
//                 <span className="text-xs text-text-secondary w-8 text-right">{lang.percentage}%</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mb-6">
//         <h4 className="text-sm font-semibold text-text-primary mb-3">Favorite Sources</h4>
//         <div className="space-y-2">
//           {(stats.topSources || []).map((source) => (
//             <div key={source.name} className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <Icon name="Globe" size={14} className="text-text-secondary" />
//                 <span className="text-sm text-text-primary">{source.name}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="text-xs text-text-secondary">{source.count} articles</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="p-4 bg-gradient-to-r from-accent/10 to-success/10 rounded-lg">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center">
//             <Icon name="Flame" size={20} />
//           </div>
//           <div>
//             <div className="text-lg font-bold text-text-primary">{stats.currentStreak} Day Streak</div>
//             <div className="text-sm text-text-secondary">Keep reading to maintain your streak!</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReadingStats;