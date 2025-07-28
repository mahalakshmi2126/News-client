// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';


// const AdvancedSearchPanel = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
//   const [filters, setFilters] = useState({
//     dateRange: currentFilters.dateRange || 'all',
//     sources: currentFilters.sources || [],
//     contentType: currentFilters.contentType || 'all',
//     language: currentFilters.language || 'all',
//     credibility: currentFilters.credibility || 'all',
//     sortBy: currentFilters.sortBy || 'relevance'
//   });

//   const dateRangeOptions = [
//     { value: 'all', label: 'All Time' },
//     { value: 'today', label: 'Today' },
//     { value: 'week', label: 'This Week' },
//     { value: 'month', label: 'This Month' },
//     { value: 'year', label: 'This Year' },
//     { value: 'custom', label: 'Custom Range' }
//   ];

//   const contentTypes = [
//     { value: 'all', label: 'All Content' },
//     { value: 'articles', label: 'Articles' },
//     { value: 'videos', label: 'Videos' },
//     { value: 'podcasts', label: 'Podcasts' },
//     { value: 'images', label: 'Photo Stories' }
//   ];

//   const languages = [
//     { value: 'all', label: 'All Languages' },
//     { value: 'en', label: 'English' },
//     { value: 'es', label: 'Spanish' },
//     { value: 'fr', label: 'French' },
//     { value: 'de', label: 'German' },
//     { value: 'zh', label: 'Chinese' },
//     { value: 'ja', label: 'Japanese' },
//     { value: 'ar', label: 'Arabic' }
//   ];

//   const credibilityLevels = [
//     { value: 'all', label: 'All Sources' },
//     { value: 'verified', label: 'Verified Only' },
//     { value: 'high', label: 'High Credibility' },
//     { value: 'medium', label: 'Medium Credibility' }
//   ];

//   const sortOptions = [
//     { value: 'relevance', label: 'Most Relevant' },
//     { value: 'newest', label: 'Newest First' },
//     { value: 'oldest', label: 'Oldest First' },
//     { value: 'popular', label: 'Most Popular' },
//     { value: 'shared', label: 'Most Shared' }
//   ];

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   const handleApply = () => {
//     onApplyFilters(filters);
//     onClose();
//   };

//   const handleReset = () => {
//     const resetFilters = {
//       dateRange: 'all',
//       sources: [],
//       contentType: 'all',
//       language: 'all',
//       credibility: 'all',
//       sortBy: 'relevance'
//     };
//     setFilters(resetFilters);
//     onApplyFilters(resetFilters);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
//       <div className="fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl max-h-[80vh] overflow-y-auto md:relative md:max-h-none md:rounded-lg md:max-w-2xl md:mx-auto md:mt-20">
//         {/* Header */}
//         <div className="sticky top-0 bg-background border-b border-border px-6 py-4 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-heading font-semibold text-text-primary">
//               Advanced Search Filters
//             </h2>
//             <Button variant="ghost" onClick={onClose} className="p-2">
//               <Icon name="X" size={20} />
//             </Button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Date Range */}
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-3">
//               Date Range
//             </label>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//               {dateRangeOptions.map((option) => (
//                 <button
//                   key={option.value}
//                   onClick={() => handleFilterChange('dateRange', option.value)}
//                   className={`p-3 text-sm rounded-lg border transition-colors duration-150 ${
//                     filters.dateRange === option.value
//                       ? 'border-accent bg-accent/10 text-accent' :'border-border bg-surface text-text-secondary hover:border-accent/50'
//                   }`}
//                 >
//                   {option.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Content Type */}
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-3">
//               Content Type
//             </label>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//               {contentTypes.map((type) => (
//                 <button
//                   key={type.value}
//                   onClick={() => handleFilterChange('contentType', type.value)}
//                   className={`p-3 text-sm rounded-lg border transition-colors duration-150 ${
//                     filters.contentType === type.value
//                       ? 'border-accent bg-accent/10 text-accent' :'border-border bg-surface text-text-secondary hover:border-accent/50'
//                   }`}
//                 >
//                   {type.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Language */}
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-3">
//               Language
//             </label>
//             <select
//               value={filters.language}
//               onChange={(e) => handleFilterChange('language', e.target.value)}
//               className="w-full p-3 border border-border rounded-lg bg-background text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/20"
//             >
//               {languages.map((lang) => (
//                 <option key={lang.value} value={lang.value}>
//                   {lang.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Source Credibility */}
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-3">
//               Source Credibility
//             </label>
//             <div className="grid grid-cols-2 gap-2">
//               {credibilityLevels.map((level) => (
//                 <button
//                   key={level.value}
//                   onClick={() => handleFilterChange('credibility', level.value)}
//                   className={`p-3 text-sm rounded-lg border transition-colors duration-150 ${
//                     filters.credibility === level.value
//                       ? 'border-accent bg-accent/10 text-accent' :'border-border bg-surface text-text-secondary hover:border-accent/50'
//                   }`}
//                 >
//                   {level.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Sort By */}
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-3">
//               Sort Results By
//             </label>
//             <select
//               value={filters.sortBy}
//               onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//               className="w-full p-3 border border-border rounded-lg bg-background text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/20"
//             >
//               {sortOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4">
//           <div className="flex space-x-3">
//             <Button
//               variant="outline"
//               onClick={handleReset}
//               className="flex-1"
//             >
//               Reset All
//             </Button>
//             <Button
//               variant="primary"
//               onClick={handleApply}
//               className="flex-1"
//             >
//               Apply Filters
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdvancedSearchPanel;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdvancedSearchPanel = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState({
    dateRange: currentFilters.dateRange || 'all',
    sources: currentFilters.sources || [],
    contentType: currentFilters.contentType || 'all',
    language: currentFilters.language || 'all',
    credibility: currentFilters.credibility || 'all',
    sortBy: currentFilters.sortBy || 'relevance'
  });

  const [filterOptions, setFilterOptions] = useState({
    dateRangeOptions: [],
    contentTypes: [],
    languages: [],
    credibilityLevels: [],
    sortOptions: []
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get('/api/filter-options');
        setFilterOptions(res.data);
      } catch (err) {
        console.error('Failed to load filter options:', err);
      }
    };
    fetchFilters();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: 'all',
      sources: [],
      contentType: 'all',
      language: 'all',
      credibility: 'all',
      sortBy: 'relevance'
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl max-h-[80vh] overflow-y-auto md:relative md:max-h-none md:rounded-lg md:max-w-2xl md:mx-auto md:mt-20">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Advanced Search Filters
            </h2>
            <Button variant="ghost" onClick={onClose} className="p-2">
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Date Range
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {filterOptions.dateRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('dateRange', option.value)}
                  className={`p-3 text-sm rounded-lg border transition-colors duration-150 ${
                    filters.dateRange === option.value
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-surface text-text-secondary hover:border-accent/50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Content Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {filterOptions.contentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleFilterChange('contentType', type.value)}
                  className={`p-3 text-sm rounded-lg border transition-colors duration-150 ${
                    filters.contentType === type.value
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-surface text-text-secondary hover:border-accent/50'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Language
            </label>
            <select
              value={filters.language}
              onChange={(e) => handleFilterChange('language', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-background text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {filterOptions.languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Credibility */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Source Credibility
            </label>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.credibilityLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => handleFilterChange('credibility', level.value)}
                  className={`p-3 text-sm rounded-lg border transition-colors duration-150 ${
                    filters.credibility === level.value
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-surface text-text-secondary hover:border-accent/50'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Sort Results By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-background text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {filterOptions.sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4">
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Reset All
            </Button>
            <Button variant="primary" onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchPanel;