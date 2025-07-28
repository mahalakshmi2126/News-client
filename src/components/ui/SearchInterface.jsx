// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import Icon from '../AppIcon';
// import Input from './Input';
// import Button from './Button';

// const SearchInterface = ({ isMobile = false, isMobileOverlay = false }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isMobileOverlayOpen, setIsMobileOverlayOpen] = useState(false);
//   const [newsData, setNewsData] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const searchRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setIsExpanded(false);
//         setShowSuggestions(false);
//       }
//     };

//     const handleEscape = (event) => {
//       if (event.key === 'Escape') {
//         setIsExpanded(false);
//         setShowSuggestions(false);
//         setIsMobileOverlayOpen(false);
//       }
//     };

//     const handleToggleMobileSearch = () => {
//       setIsMobileOverlayOpen(!isMobileOverlayOpen);
//     };

//     // Fetch news and categories on mount
//     const fetchInitialData = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
//         const [newsRes, categoriesRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/news/public', config),
//           axios.get('http://localhost:5000/api/category/get', config)
//         ]);
//         setNewsData(newsRes.data.articles || []);
//         setCategories(['All Categories', ...categoriesRes.data.categories.map(c => c.name)]);
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       }
//     };

//     fetchInitialData();
//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('keydown', handleEscape);
//     document.addEventListener('toggleMobileSearch', handleToggleMobileSearch);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', handleEscape);
//       document.removeEventListener('toggleMobileSearch', handleToggleMobileSearch);
//     };
//   }, [isMobileOverlayOpen]);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
    
//     if (value.length > 0) {
//       setIsLoading(true);
//       // Simulate API call with debounce
//       setTimeout(() => {
//         const filteredSuggestions = generateSuggestions(value);
//         setSuggestions(filteredSuggestions);
//         setShowSuggestions(true);
//         setIsLoading(false);
//       }, 300);
//     } else {
//       setSuggestions([]);
//       setShowSuggestions(false);
//       setIsLoading(false);
//     }
//   };

//   const generateSuggestions = (query) => {
//     const lowerQuery = query.toLowerCase();
//     const newsSuggestions = newsData
//       .filter(article => 
//         article.title.toLowerCase().includes(lowerQuery) || 
//         article.content.toLowerCase().includes(lowerQuery)
//       )
//       .slice(0, 3)
//       .map(article => ({
//         type: 'news',
//         label: article.title,
//         id: article._id
//       }));

//     const categorySuggestions = categories
//       .filter(category => category.toLowerCase().includes(lowerQuery) && category !== 'All Categories')
//       .map(category => ({
//         type: 'category',
//         label: category
//       }));

//     return [...newsSuggestions, ...categorySuggestions].slice(0, 5);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       performSearch(searchQuery);
//     }
//   };

//   const performSearch = (query) => {
//     console.log('Searching for:', query);
//     setShowSuggestions(false);
//     setIsExpanded(false);
//     setIsMobileOverlayOpen(false);
    
//     // Dispatch search event with query
//     document.dispatchEvent(new CustomEvent('performSearch', {
//       detail: { query }
//     }));
//   };

//   const handleSuggestionClick = (suggestion) => {
//     if (suggestion.type === 'news') {
//       // Navigate to news article or perform specific action
//       console.log('Navigating to news:', suggestion.id);
//       performSearch(suggestion.label);
//     } else if (suggestion.type === 'category') {
//       performSearch(suggestion.label);
//     }
//   };

//   const handleFocus = () => {
//     setIsExpanded(true);
//     if (searchQuery.length === 0) {
//       setShowSuggestions(true);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     setSuggestions([]);
//     setShowSuggestions(false);
//     inputRef.current?.focus();
//   };

//   // Mobile Overlay Version
//   if (isMobileOverlay) {
//     return (
//       <>
//         {isMobileOverlayOpen && (
//           <div className="fixed inset-0 z-1020 bg-background lg:hidden">
//             <div className="flex flex-col h-full">
//               {/* Header */}
//               <div className="flex items-center justify-between p-4 border-b border-border">
//                 <h2 className="text-lg font-heading font-semibold text-text-primary">
//                   Search News
//                 </h2>
//                 <Button
//                   variant="ghost"
//                   onClick={() => setIsMobileOverlayOpen(false)}
//                   className="p-2"
//                 >
//                   <Icon name="X" size={20} />
//                 </Button>
//               </div>

//               {/* Search Form */}
//               <div className="p-4">
//                 <form onSubmit={handleSearchSubmit} className="relative">
//                   <div className="relative">
//                     <Icon 
//                       name="Search" 
//                       size={20} 
//                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
//                     />
//                     <Input
//                       ref={inputRef}
//                       type="search"
//                       placeholder="Search news, topics, categories..."
//                       value={searchQuery}
//                       onChange={handleSearchChange}
//                       className="pl-10 pr-10 py-3 text-base"
//                       autoFocus
//                     />
//                     {searchQuery && (
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         onClick={clearSearch}
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
//                       >
//                         <Icon name="X" size={16} />
//                       </Button>
//                     )}
//                   </div>
//                 </form>
//               </div>

//               {/* Search Content */}
//               <div className="flex-1 overflow-y-auto px-4 pb-4">
//                 {searchQuery.length > 0 && suggestions.length > 0 && (
//                   <div className="mb-6">
//                     <h3 className="text-sm font-medium text-text-secondary mb-3">
//                       Suggestions
//                     </h3>
//                     <div className="space-y-2">
//                       {suggestions.map((suggestion, index) => (
//                         <button
//                           key={index}
//                           onClick={() => handleSuggestionClick(suggestion)}
//                           className="w-full flex items-center space-x-3 p-3 text-left hover:bg-surface rounded-lg transition-colors duration-150"
//                         >
//                           <Icon name={suggestion.type === 'news' ? 'FileText' : 'Tag'} size={16} className="text-text-secondary" />
//                           <span className="text-text-primary">{suggestion.label}</span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {searchQuery.length === 0 && (
//                   <>
//                     {/* Popular Categories */}
//                     <div className="mb-6">
//                       <h3 className="text-sm font-medium text-text-secondary mb-3">
//                         Popular Categories
//                       </h3>
//                       <div className="flex flex-wrap gap-2">
//                         {categories.map((category, index) => (
//                           <button
//                             key={index}
//                             onClick={() => handleSuggestionClick({ type: 'category', label: category })}
//                             className="px-3 py-2 bg-surface text-text-primary text-sm rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
//                           >
//                             {category}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }

//   // Desktop and Mobile Inline Versions
//   return (
//     <div className="relative" ref={searchRef}>
//       <form onSubmit={handleSearchSubmit}>
//         <div className={`relative transition-all duration-300 ${
//           isExpanded ? 'w-80' : isMobile ? 'w-full' : 'w-64'
//         }`}>
//           <Icon 
//             name="Search" 
//             size={18} 
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
//           />
//           <Input
//             ref={inputRef}
//             type="search"
//             placeholder={isMobile ? "Search news..." : "Search news, topics, categories..."}
//             value={searchQuery}
//             onChange={handleSearchChange}
//             onFocus={handleFocus}
//             className={`pl-10 pr-10 ${isMobile ? 'py-2' : 'py-2'} bg-surface border-0 focus:bg-background focus:ring-2 focus:ring-accent/20`}
//           />
//           {searchQuery && (
//             <Button
//               type="button"
//               variant="ghost"
//               onClick={clearSearch}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-background"
//             >
//               <Icon name="X" size={14} />
//             </Button>
//           )}
//           {isLoading && (
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//               <div className="animate-spin w-4 h-4 border-2 border-accent border-t-transparent rounded-full"></div>
//             </div>
//           )}
//         </div>
//       </form>

//       {/* Suggestions Dropdown */}
//       {showSuggestions && (isExpanded || isMobile) && (
//         <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-modal z-1010 animate-slide-down">
//           <div className="py-2 max-h-80 overflow-y-auto">
//             {searchQuery.length > 0 && suggestions.length > 0 && (
//               <>
//                 <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide">
//                   Suggestions
//                 </div>
//                 {suggestions.map((suggestion, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleSuggestionClick(suggestion)}
//                     className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface transition-colors duration-150"
//                   >
//                     <Icon name={suggestion.type === 'news' ? 'FileText' : 'Tag'} size={16} className="text-text-secondary" />
//                     <span className="text-text-primary">{suggestion.label}</span>
//                   </button>
//                 ))}
//               </>
//             )}

//             {searchQuery.length === 0 && (
//               <>
//                 <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide">
//                   Popular Categories
//                 </div>
//                 {categories.slice(0, 3).map((category, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleSuggestionClick({ type: 'category', label: category })}
//                     className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface transition-colors duration-150"
//                   >
//                     <Icon name="Tag" size={16} className="text-text-secondary" />
//                     <span className="text-text-primary">{category}</span>
//                   </button>
//                 ))}
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchInterface;