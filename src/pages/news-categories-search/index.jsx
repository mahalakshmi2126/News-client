// // import React, { useState, useEffect } from 'react';
// // import { useSearchParams } from 'react-router-dom';
// // import Icon from '../../components/AppIcon';
// // import Input from '../../components/ui/Input';
// // import Button from '../../components/ui/Button';
// // import GlobalHeader from '../../components/ui/GlobalHeader';
// // import CategoryGrid from './components/CategoryGrid';
// // import AdvancedSearchPanel from './components/AdvancedSearchPanel';
// // import SearchResultsGrid from './components/SearchResultsGrid';
// // import FilterChips from './components/FilterChips';
// // import SearchSuggestions from './components/SearchSuggestions';
// // import SubcategoryFilters from './components/SubcategoryFilters';

// // const NewsCategoriesSearch = () => {
// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [selectedSubcategories, setSelectedSubcategories] = useState([]);
// //   const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [sortBy, setSortBy] = useState('newest');
// //   const [activeFilters, setActiveFilters] = useState({
// //     dateRange: 'all',
// //     contentType: 'all',
// //     language: 'all',
// //     credibility: 'all',
// //     sortBy: 'relevance'
// //   });

// //   const categories = [
// //     { id: 'politics', name: 'Politics', icon: 'Vote', articleCount: 15420 },
// //     { id: 'technology', name: 'Technology', icon: 'Smartphone', articleCount: 23150 },
// //     { id: 'sports', name: 'Sports', icon: 'Trophy', articleCount: 18760 },
// //     { id: 'business', name: 'Business', icon: 'TrendingUp', articleCount: 21340 },
// //     { id: 'entertainment', name: 'Entertainment', icon: 'Film', articleCount: 16890 },
// //     { id: 'health', name: 'Health', icon: 'Heart', articleCount: 12450 },
// //     { id: 'science', name: 'Science', icon: 'Atom', articleCount: 9870 },
// //     { id: 'world', name: 'World News', icon: 'Globe', articleCount: 28560 }
// //   ];

// //   const mockSearchResults = [
// //     {
// //       id: 1,
// //       title: "Revolutionary AI Technology Transforms Healthcare Industry",
// //       excerpt: "New artificial intelligence breakthrough promises to revolutionize patient care and medical diagnosis with unprecedented accuracy rates.",
// //       image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
// //       category: "Technology",
// //       source: { name: "TechNews", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=20&h=20&fit=crop" },
// //       publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
// //       views: 15420,
// //       comments: 89,
// //       shares: 234,
// //       readTime: 5,
// //       isBookmarked: false
// //     },
// //     {
// //       id: 2,
// //       title: "Global Climate Summit Reaches Historic Agreement",
// //       excerpt: "World leaders unite on comprehensive climate action plan with binding commitments for carbon neutrality by 2050.",
// //       image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=250&fit=crop",
// //       category: "World News",
// //       source: { name: "Global Times", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=20&h=20&fit=crop" },
// //       publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
// //       views: 28750,
// //       comments: 156,
// //       shares: 892,
// //       readTime: 8,
// //       isBookmarked: true
// //     },
// //     {
// //       id: 3,
// //       title: "Stock Markets Surge Following Economic Recovery Data",
// //       excerpt: "Major indices hit record highs as latest employment figures exceed expectations, signaling strong economic momentum.",
// //       image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
// //       category: "Business",
// //       source: { name: "Financial Post", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=20&h=20&fit=crop" },
// //       publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
// //       views: 12340,
// //       comments: 67,
// //       shares: 178,
// //       readTime: 4,
// //       isBookmarked: false
// //     },
// //     {
// //       id: 4,
// //       title: "Championship Finals Draw Record Television Audience",
// //       excerpt: "Historic sports event captivates global audience with thrilling competition and outstanding athletic performances.",
// //       image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop",
// //       category: "Sports",
// //       source: { name: "Sports Central", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=20&h=20&fit=crop" },
// //       publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
// //       views: 45670,
// //       comments: 234,
// //       shares: 567,
// //       readTime: 6,
// //       isBookmarked: false
// //     },
// //     {
// //       id: 5,
// //       title: "Breakthrough Medical Research Offers Hope for Rare Disease",
// //       excerpt: "Scientists develop promising new treatment approach that could benefit thousands of patients worldwide.",
// //       image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop",
// //       category: "Health",
// //       source: { name: "Medical Journal", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=20&h=20&fit=crop" },
// //       publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
// //       views: 8920,
// //       comments: 45,
// //       shares: 123,
// //       readTime: 7,
// //       isBookmarked: true
// //     },
// //     {
// //       id: 6,
// //       title: "Space Mission Discovers Potentially Habitable Exoplanet",
// //       excerpt: "Astronomical breakthrough reveals Earth-like planet in habitable zone, raising possibilities for extraterrestrial life.",
// //       image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop",
// //       category: "Science",
// //       source: { name: "Space Today", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=20&h=20&fit=crop" },
// //       publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000),
// //       views: 34560,
// //       comments: 189,
// //       shares: 445,
// //       readTime: 9,
// //       isBookmarked: false
// //     }
// //   ];

//   // const recentSearches = [
//   //   { query: "artificial intelligence", resultsCount: 1234 },
//   //   { query: "climate change", resultsCount: 2456 },
//   //   { query: "cryptocurrency", resultsCount: 987 },
//   //   { query: "space exploration", resultsCount: 654 },
//   //   { query: "renewable energy", resultsCount: 1876 }
//   // ];

//   // const trendingQueries = [
//   //   { text: "breaking news", searchCount: 45670 },
//   //   { text: "election results", searchCount: 34520 },
//   //   { text: "stock market", searchCount: 28940 },
//   //   { text: "covid updates", searchCount: 23450 },
//   //   { text: "tech innovation", searchCount: 19870 },
//   //   { text: "sports scores", searchCount: 17650 },
//   //   { text: "weather forecast", searchCount: 15430 },
//   //   { text: "entertainment news", searchCount: 12890 }
//   // ];

//   // const savedSearches = [
//   //   { name: "Tech News Daily", query: "technology", filtersCount: 3 },
//   //   { name: "Local Politics", query: "politics local", filtersCount: 5 },
//   //   { name: "Health Updates", query: "health medical", filtersCount: 2 }
//   // ];

// //   useEffect(() => {
// //     const query = searchParams.get('q');
// //     const category = searchParams.get('category');

// //     if (query) {
// //       setSearchQuery(query);
// //       performSearch(query);
// //     }

// //     if (category) {
// //       const foundCategory = categories.find(cat => cat.id === category);
// //       if (foundCategory) {
// //         setSelectedCategory(foundCategory);
// //         performSearch('', foundCategory);
// //       }
// //     }
// //   }, [searchParams]);

// //   const performSearch = async (query = searchQuery, category = selectedCategory) => {
// //     setIsLoading(true);
// //     setShowSuggestions(false);

// //     // Simulate API call
// //     setTimeout(() => {
// //       let results = [...mockSearchResults];

// //       if (query) {
// //         results = results.filter(article => 
// //           article.title.toLowerCase().includes(query.toLowerCase()) ||
// //           article.excerpt.toLowerCase().includes(query.toLowerCase())
// //         );
// //       }

// //       if (category) {
// //         results = results.filter(article => 
// //           article.category.toLowerCase() === category.name.toLowerCase()
// //         );
// //       }

// //       setSearchResults(results);
// //       setIsLoading(false);
// //     }, 800);
// //   };

// //   const handleSearchSubmit = (e) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       const params = new URLSearchParams(searchParams);
// //       params.set('q', searchQuery);
// //       setSearchParams(params);
// //       performSearch(searchQuery);
// //     }
// //   };

// //   const handleCategorySelect = (category) => {
// //     setSelectedCategory(category);
// //     const params = new URLSearchParams(searchParams);
// //     params.set('category', category.id);
// //     setSearchParams(params);
// //     performSearch('', category);
// //   };

// //   const handleSubcategoryToggle = (subcategoryId) => {
// //     setSelectedSubcategories(prev => 
// //       prev.includes(subcategoryId)
// //         ? prev.filter(id => id !== subcategoryId)
// //         : [...prev, subcategoryId]
// //     );
// //   };

// //   const handleAdvancedFilters = (filters) => {
// //     setActiveFilters(filters);
// //     performSearch();
// //   };

// //   const handleRemoveFilter = (filterKey) => {
// //     const newFilters = { ...activeFilters };

// //     if (filterKey === 'category') {
// //       setSelectedCategory(null);
// //       const params = new URLSearchParams(searchParams);
// //       params.delete('category');
// //       setSearchParams(params);
// //     } else {
// //       newFilters[filterKey] = filterKey === 'sortBy' ? 'relevance' : 'all';
// //       setActiveFilters(newFilters);
// //     }

// //     performSearch();
// //   };

// //   const handleClearAllFilters = () => {
// //     setActiveFilters({
// //       dateRange: 'all',
// //       contentType: 'all',
// //       language: 'all',
// //       credibility: 'all',
// //       sortBy: 'relevance'
// //     });
// //     setSelectedCategory(null);
// //     setSelectedSubcategories([]);
// //     const params = new URLSearchParams(searchParams);
// //     params.delete('category');
// //     params.delete('q');
// //     setSearchParams(params);
// //     setSearchQuery('');
// //     setSearchResults([]);
// //   };

// //   const handleBookmark = (articleId) => {
// //     setSearchResults(prev => 
// //       prev.map(article => 
// //         article.id === articleId 
// //           ? { ...article, isBookmarked: !article.isBookmarked }
// //           : article
// //       )
// //     );
// //   };

// //   const handleSuggestionClick = (suggestion) => {
// //     setSearchQuery(suggestion);
// //     setShowSuggestions(false);
// //     const params = new URLSearchParams(searchParams);
// //     params.set('q', suggestion);
// //     setSearchParams(params);
// //     performSearch(suggestion);
// //   };

// //   const handleRemoveRecent = (index) => {
// //     // In a real app, this would update the user's search history console.log('Remove recent search at index:', index);
// //   };

// //   const handleRemoveSaved = (index) => {
// //     // In a real app, this would update the user's saved searches console.log('Remove saved search at index:', index);
// //   };

// //   const hasActiveSearch = searchQuery || selectedCategory || searchResults.length > 0;

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <GlobalHeader />

// //       <main className="pt-16">
// //         <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
// //           {/* Page Header */}
// //           <div className="mb-8">
// //             <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
// //               <span>NewsHub</span>
// //               <Icon name="ChevronRight" size={16} />
// //               <span>Explore</span>
// //               {selectedCategory && (
// //                 <>
// //                   <Icon name="ChevronRight" size={16} />
// //                   <span className="text-accent">{selectedCategory.name}</span>
// //                 </>
// //               )}
// //             </div>
// //             <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
// //               Discover News & Stories
// //             </h1>
// //             <p className="text-text-secondary max-w-2xl">
// //               Explore breaking news, trending topics, and in-depth stories from trusted sources worldwide. 
// //               Use advanced filters to find exactly what you're looking for.
// //             </p>
// //           </div>

// //           {/* Search Bar */}
// //           <div className="relative mb-8">
// //             <form onSubmit={handleSearchSubmit} className="relative">
// //               <div className="relative">
// //                 <Icon 
// //                   name="Search" 
// //                   size={20} 
// //                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
// //                 />
// //                 <Input
// //                   type="search"
// //                   placeholder="Search news, topics, sources..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   onFocus={() => setShowSuggestions(!hasActiveSearch)}
// //                   className="pl-12 pr-32 py-4 text-base bg-surface border-0 focus:bg-background focus:ring-2 focus:ring-accent/20"
// //                 />
// //                 <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
// //                   <Button
// //                     type="button"
// //                     variant="ghost"
// //                     onClick={() => setIsAdvancedSearchOpen(true)}
// //                     className="px-3 py-2 text-sm"
// //                   >
// //                     <Icon name="SlidersHorizontal" size={16} className="mr-1" />
// //                     Filters
// //                   </Button>
// //                   <Button
// //                     type="submit"
// //                     variant="primary"
// //                     className="px-4 py-2"
// //                   >
// //                     Search
// //                   </Button>
// //                 </div>
// //               </div>
// //             </form>

// //             {/* Search Suggestions */}
// //             {showSuggestions && !hasActiveSearch && (
// //               <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-modal z-10 max-h-96 overflow-y-auto">
// //                 <div className="p-4">
// //                   <SearchSuggestions
// //                     recentSearches={recentSearches}
// //                     trendingQueries={trendingQueries}
// //                     savedSearches={savedSearches}
// //                     onSuggestionClick={handleSuggestionClick}
// //                     onRemoveRecent={handleRemoveRecent}
// //                     onRemoveSaved={handleRemoveSaved}
// //                   />
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Filter Chips */}
// //           <FilterChips
// //             activeFilters={{
// //               ...activeFilters,
// //               category: selectedCategory?.name
// //             }}
// //             onRemoveFilter={handleRemoveFilter}
// //             onClearAll={handleClearAllFilters}
// //           />

// //           {/* Subcategory Filters */}
// //           {selectedCategory && (
// //             <SubcategoryFilters
// //               category={selectedCategory}
// //               selectedSubcategories={selectedSubcategories}
// //               onSubcategoryToggle={handleSubcategoryToggle}
// //               sortBy={sortBy}
// //               onSortChange={setSortBy}
// //               onClose={() => {
// //                 setSelectedCategory(null);
// //                 const params = new URLSearchParams(searchParams);
// //                 params.delete('category');
// //                 setSearchParams(params);
// //               }}
// //             />
// //           )}

// //           {/* Main Content */}
// //           {hasActiveSearch ? (
// //             <SearchResultsGrid
// //               results={searchResults}
// //               searchQuery={searchQuery}
// //               isLoading={isLoading}
// //               onBookmark={handleBookmark}
// //             />
// //           ) : (
// //             <>
// //               {/* Categories Grid */}
// //               <div className="mb-12">
// //                 <div className="flex items-center justify-between mb-6">
// //                   <h2 className="text-xl font-heading font-semibold text-text-primary">
// //                     Browse by Category
// //                   </h2>
// //                   <p className="text-sm text-text-secondary">
// //                     {categories.reduce((sum, cat) => sum + cat.articleCount, 0).toLocaleString()} total articles
// //                   </p>
// //                 </div>
// //                 <CategoryGrid
// //                   categories={categories}
// //                   onCategorySelect={handleCategorySelect}
// //                   selectedCategory={selectedCategory}
// //                 />
// //               </div>

// //               {/* Featured Content */}
// //               <div>
// //                 <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
// //                   Trending Stories
// //                 </h2>
// //                 <SearchResultsGrid
// //                   results={mockSearchResults.slice(0, 6)}
// //                   searchQuery=""
// //                   isLoading={false}
// //                   onBookmark={handleBookmark}
// //                 />
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </main>

// //       {/* Advanced Search Panel */}
// //       <AdvancedSearchPanel
// //         isOpen={isAdvancedSearchOpen}
// //         onClose={() => setIsAdvancedSearchOpen(false)}
// //         onApplyFilters={handleAdvancedFilters}
// //         currentFilters={activeFilters}
// //       />
// //     </div>
// //   );
// // };

// // export default NewsCategoriesSearch;


// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import Icon from '../../components/AppIcon';
// import Input from '../../components/ui/Input';
// import Button from '../../components/ui/Button';
// import GlobalHeader from '../../components/ui/GlobalHeader';
// import CategoryGrid from './components/CategoryGrid';
// import AdvancedSearchPanel from './components/AdvancedSearchPanel';
// import SearchResultsGrid from './components/SearchResultsGrid';
// import FilterChips from './components/FilterChips';
// import SearchSuggestions from './components/SearchSuggestions';
// import SubcategoryFilters from './components/SubcategoryFilters';

// const NewsCategoriesSearch = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//   const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [sortBy, setSortBy] = useState('newest');
//   const [categories, setCategories] = useState([]);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [trendingQueries, setTrendingQueries] = useState([]);
//   const [savedSearches, setSavedSearches] = useState([]);
//   const [activeFilters, setActiveFilters] = useState({
//     dateRange: 'all',
//     contentType: 'all',
//     language: 'all',
//     credibility: 'all',
//     sortBy: 'relevance'
//   });

//   useEffect(() => {
//     fetchCategories();
//     fetchSearchData();
//   }, []);

//   useEffect(() => {
//     const query = searchParams.get('q');
//     const categoryId = searchParams.get('category');

//     if (query) {
//       setSearchQuery(query);
//       performSearch(query);
//     }

//     if (categoryId && categories.length > 0) {
//       const foundCategory = categories.find(cat => cat.id === categoryId);
//       if (foundCategory) {
//         setSelectedCategory(foundCategory);
//         performSearch('', foundCategory);
//       }
//     }
//   }, [searchParams, categories]);

//   const fetchCategories = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/categories/get');
//       const data = await res.json();
//       if (data.success) {
//         setCategories(data.categories);
//       }
//     } catch (err) {
//       console.error("Failed to fetch categories", err);
//     }
//   };

//   const fetchSearchData = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/search-data/get');
//       const data = await res.json();
//       if (data.success) {
//         setRecentSearches(data.recentSearches);
//         setTrendingQueries(data.trendingQueries);
//         setSavedSearches(data.savedSearches);
//       }
//     } catch (err) {
//       console.error("Failed to fetch search data", err);
//     }
//   };

//   const performSearch = async (query = searchQuery, category = selectedCategory) => {
//     setIsLoading(true);
//     setShowSuggestions(false);

//     try {
//       const res = await fetch('http://localhost:5000/api/news-articles/get');
//       const data = await res.json();

//       let results = data;

//       if (query) {
//         results = results.filter(article =>
//           article.title.toLowerCase().includes(query.toLowerCase()) ||
//           article.excerpt.toLowerCase().includes(query.toLowerCase())
//         );
//       }

//       if (category) {
//         results = results.filter(article =>
//           article.category.toLowerCase() === category.name.toLowerCase()
//         );
//       }

//       setSearchResults(results);
//     } catch (error) {
//       console.error('Failed to fetch articles:', error);
//     }

//     setIsLoading(false);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       const params = new URLSearchParams(searchParams);
//       params.set('q', searchQuery);
//       setSearchParams(params);
//       performSearch(searchQuery);
//     }
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     const params = new URLSearchParams(searchParams);
//     params.set('category', category.id);
//     setSearchParams(params);
//     performSearch('', category);
//   };

//   const handleSubcategoryToggle = (subcategoryId) => {
//     setSelectedSubcategories(prev =>
//       prev.includes(subcategoryId)
//         ? prev.filter(id => id !== subcategoryId)
//         : [...prev, subcategoryId]
//     );
//   };

//   const handleAdvancedFilters = (filters) => {
//     setActiveFilters(filters);
//     performSearch();
//   };

//   const handleRemoveFilter = (filterKey) => {
//     const newFilters = { ...activeFilters };

//     if (filterKey === 'category') {
//       setSelectedCategory(null);
//       const params = new URLSearchParams(searchParams);
//       params.delete('category');
//       setSearchParams(params);
//     } else {
//       newFilters[filterKey] = filterKey === 'sortBy' ? 'relevance' : 'all';
//       setActiveFilters(newFilters);
//     }

//     performSearch();
//   };

//   const handleClearAllFilters = () => {
//     setActiveFilters({
//       dateRange: 'all',
//       contentType: 'all',
//       language: 'all',
//       credibility: 'all',
//       sortBy: 'relevance'
//     });
//     setSelectedCategory(null);
//     setSelectedSubcategories([]);
//     const params = new URLSearchParams(searchParams);
//     params.delete('category');
//     params.delete('q');
//     setSearchParams(params);
//     setSearchQuery('');
//     setSearchResults([]);
//   };

//   const handleBookmark = (articleId) => {
//     setSearchResults(prev =>
//       prev.map(article =>
//         article.id === articleId
//           ? { ...article, isBookmarked: !article.isBookmarked }
//           : article
//       )
//     );
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSearchQuery(suggestion);
//     setShowSuggestions(false);
//     const params = new URLSearchParams(searchParams);
//     params.set('q', suggestion);
//     setSearchParams(params);
//     performSearch(suggestion);
//   };

//   const handleRemoveRecent = (index) => {
//     // handle recent search removal
//   };

//   const handleRemoveSaved = (index) => {
//     // handle saved search removal
//   };

//   const hasActiveSearch = searchQuery || selectedCategory || searchResults.length > 0;

//   return (
//     <div className="min-h-screen bg-background">
//       <GlobalHeader />
//       <main className="pt-16">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">

//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
//               <span>NewsHub</span>
//               <Icon name="ChevronRight" size={16} />
//               <span>Explore</span>
//               {selectedCategory && (
//                 <>
//                   <Icon name="ChevronRight" size={16} />
//                   <span className="text-accent">{selectedCategory.name}</span>
//                 </>
//               )}
//             </div>
//             <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
//               Discover News & Stories
//             </h1>
//             <p className="text-text-secondary max-w-2xl">
//               Explore breaking news, trending topics, and in-depth stories from trusted sources worldwide.
//               Use advanced filters to find exactly what you're looking for.
//             </p>
//           </div>

//           {/* Search Input */}
//           <div className="relative mb-8">
//             <form onSubmit={handleSearchSubmit} className="relative">
//               <div className="relative">
//                 <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
//                 <Input
//                   type="search"
//                   placeholder="Search news, topics, sources..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onFocus={() => setShowSuggestions(!hasActiveSearch)}
//                   className="pl-12 pr-32 py-4 text-base bg-surface border-0 focus:bg-background focus:ring-2 focus:ring-accent/20"
//                 />
//                 <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     onClick={() => setIsAdvancedSearchOpen(true)}
//                     className="px-3 py-2 text-sm"
//                   >
//                     <Icon name="SlidersHorizontal" size={16} className="mr-1" />
//                     Filters
//                   </Button>
//                   <Button type="submit" variant="primary" className="px-4 py-2">
//                     Search
//                   </Button>
//                 </div>
//               </div>
//             </form>

//             {/* Suggestions */}
//             {showSuggestions && !hasActiveSearch && (
//               <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-modal z-10 max-h-96 overflow-y-auto">
//                 <div className="p-4">
//                   <SearchSuggestions
//                     recentSearches={recentSearches}
//                     trendingQueries={trendingQueries}
//                     savedSearches={savedSearches}
//                     onSuggestionClick={handleSuggestionClick}
//                     onRemoveRecent={handleRemoveRecent}
//                     onRemoveSaved={handleRemoveSaved}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Filter Chips */}
//           <FilterChips
//             activeFilters={{
//               ...activeFilters,
//               category: selectedCategory?.name
//             }}
//             onRemoveFilter={handleRemoveFilter}
//             onClearAll={handleClearAllFilters}
//           />

//           {/* Subcategory Filters */}
//           {selectedCategory && (
//             <SubcategoryFilters
//               category={selectedCategory}
//               selectedSubcategories={selectedSubcategories}
//               onSubcategoryToggle={handleSubcategoryToggle}
//               sortBy={sortBy}
//               onSortChange={setSortBy}
//               onClose={() => {
//                 setSelectedCategory(null);
//                 const params = new URLSearchParams(searchParams);
//                 params.delete('category');
//                 setSearchParams(params);
//               }}
//             />
//           )}

//           {/* Main Content */}
//           {hasActiveSearch ? (
//             <SearchResultsGrid
//               results={searchResults}
//               searchQuery={searchQuery}
//               isLoading={isLoading}
//               onBookmark={handleBookmark}
//             />
//           ) : (
//             <>
//               {/* Category Grid */}
//               <div className="mb-12">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-heading font-semibold text-text-primary">
//                     Browse by Category
//                   </h2>
//                   <p className="text-sm text-text-secondary">
//                     {categories.reduce((sum, cat) => sum + (cat.articleCount || 0), 0).toLocaleString()} total articles
//                   </p>
//                 </div>
//                 <CategoryGrid
//                   categories={categories}
//                   onCategorySelect={handleCategorySelect}
//                   selectedCategory={selectedCategory}
//                 />
//               </div>

//               {/* Trending Section */}
//               <div>
//                 <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
//                   Trending Stories
//                 </h2>
//                 <SearchResultsGrid
//                   results={searchResults.slice(0, 6)}
//                   searchQuery=""
//                   isLoading={isLoading}
//                   onBookmark={handleBookmark}
//                 />
//               </div>
//             </>
            
//           )}
//         </div>
//       </main>

      

//       <AdvancedSearchPanel
//         isOpen={isAdvancedSearchOpen}
//         onClose={() => setIsAdvancedSearchOpen(false)}
//         onApplyFilters={handleAdvancedFilters}
//         currentFilters={activeFilters}
//       />
//     </div>
//   );
// };

// export default NewsCategoriesSearch;