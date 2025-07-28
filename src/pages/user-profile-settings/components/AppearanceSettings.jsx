// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';

// const AppearanceSettings = ({ settings, onUpdateSettings }) => {
//   const [localSettings, setLocalSettings] = useState(settings);

//   const themes = [
//     { id: 'light', name: 'Light', icon: 'Sun', description: 'Clean and bright interface' },
//     { id: 'dark', name: 'Dark', icon: 'Moon', description: 'Easy on the eyes in low light' },
//     { id: 'system', name: 'System', icon: 'Monitor', description: 'Follow system preference' }
//   ];

//   const fontSizes = [
//     { id: 'small', name: 'Small', size: '14px' },
//     { id: 'medium', name: 'Medium', size: '16px' },
//     { id: 'large', name: 'Large', size: '18px' },
//     { id: 'extra-large', name: 'Extra Large', size: '20px' }
//   ];

//   const layouts = [
//     { id: 'comfortable', name: 'Comfortable', description: 'More spacing between elements' },
//     { id: 'compact', name: 'Compact', description: 'Tighter spacing, more content' },
//     { id: 'cozy', name: 'Cozy', description: 'Balanced spacing and readability' }
//   ];

//   const updateTheme = (themeId) => {
//     const updatedSettings = {
//       ...localSettings,
//       theme: themeId
//     };
//     setLocalSettings(updatedSettings);
//     onUpdateSettings(updatedSettings);
//   };

//   const updateFontSize = (sizeId) => {
//     const updatedSettings = {
//       ...localSettings,
//       fontSize: sizeId
//     };
//     setLocalSettings(updatedSettings);
//     onUpdateSettings(updatedSettings);
//   };

//   const updateLayout = (layoutId) => {
//     const updatedSettings = {
//       ...localSettings,
//       layout: layoutId
//     };
//     setLocalSettings(updatedSettings);
//     onUpdateSettings(updatedSettings);
//   };

//   const toggleSetting = (setting) => {
//     const updatedSettings = {
//       ...localSettings,
//       [setting]: !localSettings[setting]
//     };
//     setLocalSettings(updatedSettings);
//     onUpdateSettings(updatedSettings);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Theme Selection */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Theme
//         </h3>
//         <p className="text-xs text-text-secondary mb-3">
//           Choose your preferred color scheme.
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//           {themes.map((theme) => (
//             <Button
//               key={theme.id}
//               variant={localSettings.theme === theme.id ? "primary" : "ghost"}
//               onClick={() => updateTheme(theme.id)}
//               className="flex flex-col items-center space-y-3 p-4 h-24 border border-border rounded-lg"
//             >
//               <Icon name={theme.icon} size={24} />
//               <div className="text-center">
//                 <div className="text-sm font-medium">{theme.name}</div>
//                 <div className="text-xs opacity-70">{theme.description}</div>
//               </div>
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Font Size */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Font Size
//         </h3>
//         <p className="text-xs text-text-secondary mb-3">
//           Adjust text size for better readability.
//         </p>
//         <div className="space-y-2">
//           {fontSizes.map((size) => (
//             <Button
//               key={size.id}
//               variant={localSettings.fontSize === size.id ? "primary" : "ghost"}
//               onClick={() => updateFontSize(size.id)}
//               className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//             >
//               <div className="flex items-center space-x-3">
//                 <span style={{ fontSize: size.size }} className="font-medium">
//                   Aa
//                 </span>
//                 <div className="text-left">
//                   <div className="text-sm font-medium">{size.name}</div>
//                   <div className="text-xs text-text-secondary">{size.size}</div>
//                 </div>
//               </div>
//               {localSettings.fontSize === size.id && (
//                 <Icon name="Check" size={16} />
//               )}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Layout Density */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Layout Density
//         </h3>
//         <p className="text-xs text-text-secondary mb-3">
//           Choose how much content to show on screen.
//         </p>
//         <div className="space-y-2">
//           {layouts.map((layout) => (
//             <Button
//               key={layout.id}
//               variant={localSettings.layout === layout.id ? "primary" : "ghost"}
//               onClick={() => updateLayout(layout.id)}
//               className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//             >
//               <div className="text-left">
//                 <div className="text-sm font-medium">{layout.name}</div>
//                 <div className="text-xs text-text-secondary">{layout.description}</div>
//               </div>
//               {localSettings.layout === layout.id && (
//                 <Icon name="Check" size={16} />
//               )}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Accessibility Options */}
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium text-text-primary">Accessibility</h3>
        
//         <div className="space-y-3">
//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('highContrast')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Contrast" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">High contrast mode</div>
//                 <div className="text-xs text-text-secondary">
//                   Increase contrast for better visibility
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.highContrast ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.highContrast ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('reduceMotion')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Zap" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Reduce motion</div>
//                 <div className="text-xs text-text-secondary">
//                   Minimize animations and transitions
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.reduceMotion ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.reduceMotion ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('screenReaderOptimized')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Volume2" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Screen reader optimization</div>
//                 <div className="text-xs text-text-secondary">
//                   Optimize interface for screen readers
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.screenReaderOptimized ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.screenReaderOptimized ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>
//         </div>
//       </div>

//       {/* Display Options */}
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium text-text-primary">Display Options</h3>
        
//         <div className="space-y-3">
//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('showThumbnails')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Image" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Show article thumbnails</div>
//                 <div className="text-xs text-text-secondary">
//                   Display preview images for articles
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.showThumbnails ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.showThumbnails ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('showReadingTime')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Clock" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Show reading time</div>
//                 <div className="text-xs text-text-secondary">
//                   Display estimated reading time for articles
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.showReadingTime ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.showReadingTime ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('compactCards')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="LayoutGrid" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Compact article cards</div>
//                 <div className="text-xs text-text-secondary">
//                   Show more articles in less space
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.compactCards ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.compactCards ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppearanceSettings;