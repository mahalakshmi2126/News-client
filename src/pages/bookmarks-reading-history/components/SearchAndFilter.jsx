// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import { toast } from 'react-toastify';
// import { UserContext } from '../../../context/UserContext';
// import Icon from '../../../components/AppIcon';
// import Input from '../../../components/ui/Input';
// import Button from '../../../components/ui/Button';
// import axios from 'axios';

// const SearchAndFilter = ({
//   searchQuery,
//   onSearchChange,
//   filters,
//   onFilterChange,
//   onClearFilters,
//   activeTab,
//   categories = [],
// }) => {
//   const { user } = useContext(UserContext);
//   const [showFilters, setShowFilters] = useState(false);
//   const [languages, setLanguages] = useState([{ code: 'all', name: 'All Languages', flag: '🌐' }]);

//   useEffect(() => {
//     const fetchLanguages = async () => {
//       const token = localStorage.getItem('authToken');
//       if (!token || !user) {
//         toast.error('Please log in to access filters.');
//         return;
//       }

//       try {
//         const [bookmarksRes, historyRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/bookmark', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get('http://localhost:5000/api/history', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         const bookmarkLanguages = bookmarksRes.data.bookmarks?.flatMap((b) => [
//           b.language,
//           ...Object.keys(b.translations || {}),
//         ]) || [];
//         const historyLanguages = historyRes.data.history?.flatMap((h) => [
//           h.language,
//           ...Object.keys(h.translations || {}),
//         ]) || [];

//         const uniqueLanguages = [...new Set([...bookmarkLanguages, ...historyLanguages])].filter(Boolean);
//         const languageOptions = uniqueLanguages.map((code) => ({
//           code,
//           name: code.toUpperCase(),
//           flag:
//             {
//               en: '🇺🇸',
//               ta: '🇮🇳',
//               hi: '🇮🇳',
//               es: '🇪🇸',
//               fr: '🇫🇷',
//               de: '🇩🇪',
//               it: '🇮🇹',
//               zh: '🇨🇳',
//               ja: '🇯🇵',
//               ar: '🇸🇦',
//             }[code] || '🌐',
//         }));
//         setLanguages([{ code: 'all', name: 'All Languages', flag: '🌐' }, ...languageOptions]);
//       } catch (err) {
//         console.error('Error fetching languages:', err);
//         toast.error('Failed to load language filters.');
//       }
//     };
//     fetchLanguages();
//   }, [user]);

//   const dateRanges = [
//     { value: 'all', label: 'All Time' },
//     { value: 'today', label: 'Today' },
//     { value: 'week', label: 'This Week' },
//     { value: 'month', label: 'This Month' },
//     { value: 'year', label: 'This Year' },
//   ];

//   const completionFilters = [
//     { value: 'all', label: 'All Articles' },
//     { value: 'completed', label: 'Completed (90%+)' },
//     { value: 'partial', label: 'Partially Read (50-89%)' },
//     { value: 'started', label: 'Just Started (<50%)' },
//   ];

//   const hasActiveFilters = useCallback(() => {
//     return (
//       filters.language !== 'all' ||
//       filters.category !== 'All Categories' ||
//       filters.dateRange !== 'all' ||
//       (activeTab === 'history' && filters.completion !== 'all')
//     );
//   }, [filters, activeTab]);

//   return (
//     <div className="bg-background border border-border rounded-lg p-4 mb-6">
//       <div className="flex items-center space-x-4 mb-4">
//         <div className="flex-1 relative">
//           <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
//           <Input
//             type="search"
//             placeholder={activeTab === 'bookmarks' ? 'Search bookmarks...' : 'Search reading history...'}
//             value={searchQuery}
//             onChange={(e) => onSearchChange(e.target.value)}
//             className="pl-10 pr-4"
//           />
//         </div>
//         <Button
//           variant={showFilters ? 'primary' : 'ghost'}
//           onClick={() => setShowFilters(!showFilters)}
//           className="flex items-center space-x-2"
//         >
//           <Icon name="Filter" size={18} />
//           <span className="hidden sm:inline">Filters</span>
//           {hasActiveFilters() && <span className="w-2 h-2 bg-accent rounded-full"></span>}
//         </Button>
//         {hasActiveFilters() && (
//           <Button
//             variant="ghost"
//             onClick={onClearFilters}
//             className="text-text-secondary hover:text-error"
//             title="Clear all filters"
//           >
//             <Icon name="X" size={18} />
//           </Button>
//         )}
//       </div>
//       {showFilters && (
//         <div className="border-t border-border pt-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-2">Language</label>
//             <div className="flex flex-wrap gap-2">
//               {languages.map((lang) => (
//                 <button
//                   key={lang.code}
//                   onClick={() => onFilterChange('language', lang.code)}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
//                     filters.language === lang.code
//                       ? 'bg-accent text-accent-foreground'
//                       : 'bg-surface text-text-primary hover:bg-accent/10'
//                   }`}
//                 >
//                   <span>{lang.flag}</span>
//                   <span>{lang.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-2">Category</label>
//             <div className="flex flex-wrap gap-2">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => onFilterChange('category', category)}
//                   className={`px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
//                     filters.category === category
//                       ? 'bg-accent text-accent-foreground'
//                       : 'bg-surface text-text-primary hover:bg-accent/10'
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-2">Date Range</label>
//             <div className="flex flex-wrap gap-2">
//               {dateRanges.map((range) => (
//                 <button
//                   key={range.value}
//                   onClick={() => onFilterChange('dateRange', range.value)}
//                   className={`px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
//                     filters.dateRange === range.value
//                       ? 'bg-accent text-accent-foreground'
//                       : 'bg-surface text-text-primary hover:bg-accent/10'
//                   }`}
//                 >
//                   {range.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//           {activeTab === 'history' && (
//             <div>
//               <label className="block text-sm font-medium text-text-primary mb-2">Reading Completion</label>
//               <div className="flex flex-wrap gap-2">
//                 {completionFilters.map((completion) => (
//                   <button
//                     key={completion.value}
//                     onClick={() => onFilterChange('completion', completion.value)}
//                     className={`px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
//                       filters.completion === completion.value
//                         ? 'bg-accent text-accent-foreground'
//                         : 'bg-surface text-text-primary hover:bg-accent/10'
//                     }`}
//                   >
//                     {completion.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchAndFilter;