// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';

// const LanguageSettings = ({ settings, onUpdateSettings }) => {
//   const [localSettings, setLocalSettings] = useState(settings);

//   const languages = [
//     { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
//     { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
//     { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
//     { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
//     { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
//     { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
//     { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
//     { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
//     { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
//     { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
//     { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' }
//   ];

//   const handleInterfaceLanguageChange = (languageCode) => {
//     const updatedSettings = {
//       ...localSettings,
//       interfaceLanguage: languageCode
//     };
//     setLocalSettings(updatedSettings);
//     onUpdateSettings(updatedSettings);
//   };

//   const toggleContentLanguage = (languageCode) => {
//     const updatedContentLanguages = localSettings.contentLanguages.includes(languageCode)
//       ? localSettings.contentLanguages.filter(lang => lang !== languageCode)
//       : [...localSettings.contentLanguages, languageCode];
    
//     const updatedSettings = {
//       ...localSettings,
//       contentLanguages: updatedContentLanguages
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
//       {/* Interface Language */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">Interface Language</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//           {languages.slice(0, 6).map((language) => (
//             <Button
//               key={language.code}
//               variant={localSettings.interfaceLanguage === language.code ? "primary" : "ghost"}
//               onClick={() => handleInterfaceLanguageChange(language.code)}
//               className="flex items-center justify-start space-x-3 p-3"
//             >
//               <span className="text-lg">{language.flag}</span>
//               <div className="text-left">
//                 <div className="text-sm font-medium">{language.name}</div>
//                 <div className="text-xs opacity-70">{language.nativeName}</div>
//               </div>
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Content Languages */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Preferred Content Languages
//         </h3>
//         <p className="text-xs text-text-secondary mb-3">
//           Select languages for news content. Articles will be prioritized in these languages.
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//           {languages.map((language) => (
//             <Button
//               key={language.code}
//               variant={localSettings.contentLanguages.includes(language.code) ? "primary" : "ghost"}
//               onClick={() => toggleContentLanguage(language.code)}
//               className="flex items-center justify-between p-3"
//             >
//               <div className="flex items-center space-x-3">
//                 <span className="text-lg">{language.flag}</span>
//                 <div className="text-left">
//                   <div className="text-sm font-medium">{language.name}</div>
//                   <div className="text-xs opacity-70">{language.nativeName}</div>
//                 </div>
//               </div>
//               {localSettings.contentLanguages.includes(language.code) && (
//                 <Icon name="Check" size={16} />
//               )}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Translation Settings */}
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium text-text-primary">Translation Settings</h3>
        
//         <div className="space-y-3">
//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('autoTranslate')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Languages" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Auto-translate articles</div>
//                 <div className="text-xs text-text-secondary">
//                   Automatically translate articles to your interface language
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.autoTranslate ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.autoTranslate ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('showOriginalText')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Eye" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Show original text</div>
//                 <div className="text-xs text-text-secondary">
//                   Display original text alongside translations
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.showOriginalText ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.showOriginalText ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('rtlSupport')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="AlignRight" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">RTL text support</div>
//                 <div className="text-xs text-text-secondary">
//                   Enable right-to-left text layout for Arabic, Hebrew, etc.
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.rtlSupport ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.rtlSupport ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LanguageSettings;