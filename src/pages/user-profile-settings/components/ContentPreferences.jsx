// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';

// const ContentPreferences = ({ preferences, onUpdatePreferences }) => {
//   const [localPreferences, setLocalPreferences] = useState(preferences);

//   const categories = [
//     { id: 'politics', name: 'Politics', icon: 'Vote' },
//     { id: 'technology', name: 'Technology', icon: 'Smartphone' },
//     { id: 'business', name: 'Business', icon: 'TrendingUp' },
//     { id: 'sports', name: 'Sports', icon: 'Trophy' },
//     { id: 'entertainment', name: 'Entertainment', icon: 'Film' },
//     { id: 'health', name: 'Health', icon: 'Heart' },
//     { id: 'science', name: 'Science', icon: 'Microscope' },
//     { id: 'world', name: 'World News', icon: 'Globe' },
//     { id: 'lifestyle', name: 'Lifestyle', icon: 'Coffee' },
//     { id: 'travel', name: 'Travel', icon: 'Plane' },
//     { id: 'food', name: 'Food', icon: 'UtensilsCrossed' },
//     { id: 'environment', name: 'Environment', icon: 'Leaf' }
//   ];

//   const sources = [
//     { id: 'bbc', name: 'BBC News', logo: '🏢' },
//     { id: 'cnn', name: 'CNN', logo: '📺' },
//     { id: 'reuters', name: 'Reuters', logo: '📰' },
//     { id: 'ap', name: 'Associated Press', logo: '📡' },
//     { id: 'guardian', name: 'The Guardian', logo: '🗞️' },
//     { id: 'nyt', name: 'New York Times', logo: '📄' },
//     { id: 'wsj', name: 'Wall Street Journal', logo: '💼' },
//     { id: 'economist', name: 'The Economist', logo: '📊' }
//   ];

//   const toggleCategory = (categoryId) => {
//     const updatedCategories = localPreferences.categories.includes(categoryId)
//       ? localPreferences.categories.filter(cat => cat !== categoryId)
//       : [...localPreferences.categories, categoryId];
    
//     const updatedPreferences = {
//       ...localPreferences,
//       categories: updatedCategories
//     };
//     setLocalPreferences(updatedPreferences);
//     onUpdatePreferences(updatedPreferences);
//   };

//   const toggleSource = (sourceId) => {
//     const updatedSources = localPreferences.sources.includes(sourceId)
//       ? localPreferences.sources.filter(src => src !== sourceId)
//       : [...localPreferences.sources, sourceId];
    
//     const updatedPreferences = {
//       ...localPreferences,
//       sources: updatedSources
//     };
//     setLocalPreferences(updatedPreferences);
//     onUpdatePreferences(updatedPreferences);
//   };

//   const toggleSetting = (setting) => {
//     const updatedPreferences = {
//       ...localPreferences,
//       [setting]: !localPreferences[setting]
//     };
//     setLocalPreferences(updatedPreferences);
//     onUpdatePreferences(updatedPreferences);
//   };

//   return (
//     <div className="space-y-6">
//       {/* News Categories */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Preferred News Categories
//         </h3>
//         <p className="text-xs text-text-secondary mb-3">
//           Select categories you're interested in to personalize your news feed.
//         </p>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
//           {categories.map((category) => (
//             <Button
//               key={category.id}
//               variant={localPreferences.categories.includes(category.id) ? "primary" : "ghost"}
//               onClick={() => toggleCategory(category.id)}
//               className="flex flex-col items-center space-y-2 p-3 h-20"
//             >
//               <Icon name={category.icon} size={20} />
//               <span className="text-xs font-medium text-center">{category.name}</span>
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* News Sources */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Preferred News Sources
//         </h3>
//         <p className="text-xs text-text-secondary mb-3">
//           Choose trusted sources for your news content.
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//           {sources.map((source) => (
//             <Button
//               key={source.id}
//               variant={localPreferences.sources.includes(source.id) ? "primary" : "ghost"}
//               onClick={() => toggleSource(source.id)}
//               className="flex items-center justify-between p-3"
//             >
//               <div className="flex items-center space-x-3">
//                 <span className="text-lg">{source.logo}</span>
//                 <span className="text-sm font-medium">{source.name}</span>
//               </div>
//               {localPreferences.sources.includes(source.id) && (
//                 <Icon name="Check" size={16} />
//               )}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Content Filtering */}
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium text-text-primary">Content Filtering</h3>
        
//         <div className="space-y-3">
//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('hideReadArticles')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="EyeOff" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Hide read articles</div>
//                 <div className="text-xs text-text-secondary">
//                   Don't show articles you've already read
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localPreferences.hideReadArticles ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localPreferences.hideReadArticles ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('showImages')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Image" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Show article images</div>
//                 <div className="text-xs text-text-secondary">
//                   Display images in article previews
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localPreferences.showImages ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localPreferences.showImages ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('adultContentFilter')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Shield" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Adult content filter</div>
//                 <div className="text-xs text-text-secondary">
//                   Filter out mature or sensitive content
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localPreferences.adultContentFilter ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localPreferences.adultContentFilter ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContentPreferences;