// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';
// import Input from '../../../components/ui/Input';

// const SocialSharingPanel = ({ article, isOpen, onToggle }) => {
//   const [copied, setCopied] = useState(false);
//   const [customMessage, setCustomMessage] = useState('');

//   const shareUrl = `${window.location.origin}/article-reading-view?id=${article.id}`;
//   const shareTitle = article.title;
//   const shareText = `Check out this article: ${shareTitle}`;

//   const socialPlatforms = [
//     {
//       name: 'Twitter',
//       icon: 'Twitter',
//       color: 'text-blue-500',
//       url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'Facebook',
//       icon: 'Facebook',
//       color: 'text-blue-600',
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'LinkedIn',
//       icon: 'Linkedin',
//       color: 'text-blue-700',
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'WhatsApp',
//       icon: 'MessageCircle',
//       color: 'text-green-500',
//       url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
//     },
//     {
//       name: 'Telegram',
//       icon: 'Send',
//       color: 'text-blue-500',
//       url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
//     },
//     {
//       name: 'Reddit',
//       icon: 'MessageSquare',
//       color: 'text-orange-500',
//       url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`
//     }
//   ];

//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy link:', err);
//     }
//   };

//   const handlePlatformShare = (platform) => {
//     window.open(platform.url, '_blank', 'width=600,height=400');
//   };

//   const handleEmailShare = () => {
//     const subject = encodeURIComponent(`Interesting article: ${shareTitle}`);
//     const body = encodeURIComponent(`${customMessage}\n\n${shareText}\n\n${shareUrl}`);
//     window.location.href = `mailto:?subject=${subject}&body=${body}`;
//   };

//   return (
//     <div className={`fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border transform transition-transform duration-300 ${
//       isOpen ? 'translate-y-0' : 'translate-y-full'
//     }`}>
//       <div className="max-w-4xl mx-auto p-4">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-heading font-semibold text-text-primary">Share Article</h3>
//           <Button
//             variant="ghost"
//             onClick={onToggle}
//             className="p-2"
//             aria-label="Close sharing panel"
//           >
//             <Icon name="X" size={20} />
//           </Button>
//         </div>

//         {/* Social Platforms */}
//         <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
//           {socialPlatforms.map((platform) => (
//             <button
//               key={platform.name}
//               onClick={() => handlePlatformShare(platform)}
//               className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-surface transition-colors duration-150"
//             >
//               <div className={`w-12 h-12 rounded-full bg-surface flex items-center justify-center ${platform.color}`}>
//                 <Icon name={platform.icon} size={24} />
//               </div>
//               <span className="text-xs font-medium text-text-secondary">{platform.name}</span>
//             </button>
//           ))}
//         </div>

//         {/* Copy Link */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-text-secondary mb-2">
//             Copy Link
//           </label>
//           <div className="flex items-center space-x-2">
//             <Input
//               type="text"
//               value={shareUrl}
//               readOnly
//               className="flex-1 bg-surface"
//             />
//             <Button
//               variant={copied ? "success" : "primary"}
//               onClick={handleCopyLink}
//               className="px-4"
//             >
//               {copied ? (
//                 <>
//                   <Icon name="Check" size={16} className="mr-2" />
//                   Copied
//                 </>
//               ) : (
//                 <>
//                   <Icon name="Copy" size={16} className="mr-2" />
//                   Copy
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Email Share */}
//         {/* <div className="mb-4">
//           <label className="block text-sm font-medium text-text-secondary mb-2">
//             Share via Email
//           </label>
//           <div className="space-y-2">
//             <Input
//               type="text"
//               placeholder="Add a personal message (optional)"
//               value={customMessage}
//               onChange={(e) => setCustomMessage(e.target.value)}
//               className="w-full"
//             />
//             <Button
//               variant="outline"
//               onClick={handleEmailShare}
//               className="w-full"
//             >
//               <Icon name="Mail" size={16} className="mr-2" />
//               Share via Email
//             </Button>
//           </div>
//         </div> */}

//         {/* Quick Actions */}
//         <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
//           <Button
//             variant="ghost"
//             onClick={() => {
//               if (navigator.share) {
//                 navigator.share({
//                   title: shareTitle,
//                   text: shareText,
//                   url: shareUrl
//                 });
//               }
//             }}
//             className="text-sm"
//           >
//             <Icon name="Share" size={16} className="mr-2" />
//             Native Share
//           </Button>
          
//           <Button
//             variant="ghost"
//             onClick={() => window.print()}
//             className="text-sm"
//           >
//             <Icon name="Printer" size={16} className="mr-2" />
//             Print
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SocialSharingPanel;
