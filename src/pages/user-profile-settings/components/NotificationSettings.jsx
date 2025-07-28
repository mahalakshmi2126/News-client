// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';

// const NotificationSettings = ({ settings, onUpdateSettings }) => {
//   const [localSettings, setLocalSettings] = useState(settings);

//   const notificationTypes = [
//     {
//       id: 'breakingNews',
//       title: 'Breaking News Alerts',
//       description: 'Get notified about urgent news updates',
//       icon: 'AlertTriangle'
//     },
//     {
//       id: 'personalizedRecommendations',
//       title: 'Personalized Recommendations',
//       description: 'Articles recommended based on your interests',
//       icon: 'Target'
//     },
//     {
//       id: 'commentReplies',
//       title: 'Comment Replies',
//       description: 'When someone replies to your comments',
//       icon: 'MessageCircle'
//     },
//     {
//       id: 'weeklyDigest',
//       title: 'Weekly News Digest',
//       description: 'Summary of top stories from the week',
//       icon: 'Calendar'
//     },
//     {
//       id: 'trendingTopics',
//       title: 'Trending Topics',
//       description: 'Popular stories and discussions',
//       icon: 'TrendingUp'
//     },
//     {
//       id: 'followedSources',
//       title: 'Followed Sources',
//       description: 'New articles from your favorite sources',
//       icon: 'Bookmark'
//     }
//   ];

//   const deliveryMethods = [
//     { id: 'push', name: 'Push Notifications', icon: 'Smartphone' },
//     { id: 'email', name: 'Email', icon: 'Mail' },
//     { id: 'sms', name: 'SMS', icon: 'MessageSquare' }
//   ];

//   const quietHours = [
//     { id: 'none', name: 'No quiet hours' },
//     { id: '22-08', name: '10 PM - 8 AM' },
//     { id: '23-07', name: '11 PM - 7 AM' },
//     { id: '00-06', name: '12 AM - 6 AM' },
//     { id: 'custom', name: 'Custom hours' }
//   ];

//   const toggleNotification = (notificationId) => {
//     const updatedSettings = {
//       ...localSettings,
//       notifications: {
//         ...localSettings.notifications,
//         [notificationId]: !localSettings.notifications[notificationId]
//       }
//     };
//     setLocalSettings(updatedSettings);
//     onUpdateSettings(updatedSettings);
//   };

//   const toggleDeliveryMethod = (method) => {
//     const updatedMethods = localSettings.deliveryMethods.includes(method)
//       ? localSettings.deliveryMethods.filter(m => m !== method)
//       : [...localSettings.deliveryMethods, method];
    
//     const updatedSettings = {
//       ...localSettings,
//       deliveryMethods: updatedMethods
//     };
//     setLocalSettings(updatedSettings);
//     onUpdateSettings(updatedSettings);
//   };

//   const updateQuietHours = (hours) => {
//     const updatedSettings = {
//       ...localSettings,
//       quietHours: hours
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
//       {/* Notification Types */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Notification Types
//         </h3>
//         <div className="space-y-3">
//           {notificationTypes.map((notification) => (
//             <Button
//               key={notification.id}
//               variant="ghost"
//               onClick={() => toggleNotification(notification.id)}
//               className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//             >
//               <div className="flex items-center space-x-3">
//                 <Icon name={notification.icon} size={20} className="text-accent" />
//                 <div className="text-left">
//                   <div className="text-sm font-medium">{notification.title}</div>
//                   <div className="text-xs text-text-secondary">
//                     {notification.description}
//                   </div>
//                 </div>
//               </div>
//               <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//                 localSettings.notifications[notification.id] ? 'bg-accent' : 'bg-border'
//               }`}>
//                 <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                   localSettings.notifications[notification.id] ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//                 }`} />
//               </div>
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Delivery Methods */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Delivery Methods
//         </h3>
//         <p className="text-xs text-text-secondary mb-3">
//           Choose how you want to receive notifications.
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
//           {deliveryMethods.map((method) => (
//             <Button
//               key={method.id}
//               variant={localSettings.deliveryMethods.includes(method.id) ? "primary" : "ghost"}
//               onClick={() => toggleDeliveryMethod(method.id)}
//               className="flex flex-col items-center space-y-2 p-4"
//             >
//               <Icon name={method.icon} size={24} />
//               <span className="text-sm font-medium">{method.name}</span>
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Quiet Hours */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Quiet Hours
//         </h3>
//         <p className="text-xs text-text-secondary mb-3">
//           Set times when you don't want to receive notifications.
//         </p>
//         <div className="space-y-2">
//           {quietHours.map((hours) => (
//             <Button
//               key={hours.id}
//               variant={localSettings.quietHours === hours.id ? "primary" : "ghost"}
//               onClick={() => updateQuietHours(hours.id)}
//               className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//             >
//               <span className="text-sm font-medium">{hours.name}</span>
//               {localSettings.quietHours === hours.id && (
//                 <Icon name="Check" size={16} />
//               )}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Additional Settings */}
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium text-text-primary">Additional Settings</h3>
        
//         <div className="space-y-3">
//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('soundEnabled')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Volume2" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Notification sounds</div>
//                 <div className="text-xs text-text-secondary">
//                   Play sound for notifications
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.soundEnabled ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.soundEnabled ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('vibrationEnabled')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Vibrate" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Vibration</div>
//                 <div className="text-xs text-text-secondary">
//                   Vibrate for notifications on mobile
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.vibrationEnabled ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.vibrationEnabled ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('groupNotifications')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Layers" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Group notifications</div>
//                 <div className="text-xs text-text-secondary">
//                   Bundle similar notifications together
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.groupNotifications ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.groupNotifications ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationSettings;