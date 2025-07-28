// import React, { useState } from 'react';

// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';

// const FloatingActionButton = () => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const actions = [
//     {
//       icon: 'Plus',
//       label: 'Submit Article',
//       action: () => console.log('Submit article'),
//       color: 'bg-accent text-accent-foreground'
//     },
//     {
//       icon: 'Camera',
//       label: 'Upload Photo',
//       action: () => console.log('Upload photo'),
//       color: 'bg-success text-success-foreground'
//     },
//     {
//       icon: 'Mic',
//       label: 'Voice Note',
//       action: () => console.log('Voice note'),
//       color: 'bg-warning text-warning-foreground'
//     }
//   ];

//   const toggleExpanded = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {/* Action Buttons */}
//       {isExpanded && (
//         <div className="absolute bottom-16 right-0 space-y-3 animate-slide-up">
//           {actions.map((action, index) => (
//             <div
//               key={index}
//               className="flex items-center space-x-3"
//               style={{ animationDelay: `${index * 50}ms` }}
//             >
//               <span className="bg-background text-text-primary px-3 py-2 rounded-lg shadow-modal text-sm font-medium whitespace-nowrap">
//                 {action.label}
//               </span>
//               <Button
//                 variant="ghost"
//                 onClick={action.action}
//                 className={`w-12 h-12 rounded-full shadow-modal hover:scale-110 transition-all duration-200 ${action.color}`}
//               >
//                 <Icon name={action.icon} size={20} />
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Main FAB */}
//       <Button
//         variant="primary"
//         onClick={toggleExpanded}
//         className={`w-14 h-14 rounded-full shadow-modal hover:scale-110 transition-all duration-300 ${
//           isExpanded ? 'rotate-45' : 'rotate-0'
//         }`}
//         aria-label={isExpanded ? 'Close actions menu' : 'Open actions menu'}
//       >
//         <Icon name="Plus" size={24} />
//       </Button>

//       {/* Backdrop */}
//       {isExpanded && (
//         <div
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
//           onClick={() => setIsExpanded(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default FloatingActionButton;
