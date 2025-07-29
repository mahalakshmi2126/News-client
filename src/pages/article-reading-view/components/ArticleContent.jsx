// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Image from '../../../components/AppImage';
// import Button from '../../../components/ui/Button';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const ArticleContent = ({ article, currentLanguage, isTranslating }) => {
//   const [fontSize, setFontSize] = useState('base');
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [likes, setLikes] = useState(article.likes || 0);
//   const [dislikes, setDislikes] = useState(article.dislikes || 0);
//   const [userAction, setUserAction] = useState(null); // null, 'liked', or 'disliked'
//   const [isReportModalOpen, setIsReportModalOpen] = useState(false);
//   const [reportReason, setReportReason] = useState('');
//   const [reportComment, setReportComment] = useState('');
//   const [showLangMenu, setShowLangMenu] = useState(false);
//   const [translatedContent, setTranslatedContent] = useState(null);
//   const [isLangLoading, setIsLangLoading] = useState(false);


//   // Function to determine if media is a video based on URL extension
//   const isVideoMedia = (mediaUrl) => {
//     if (!mediaUrl || typeof mediaUrl !== 'string') return false;
//     const videoExtensions = ['.mp4', '.webm', '.ogg'];
//     return videoExtensions.some(ext => mediaUrl.toLowerCase().endsWith(ext));
//   };

//   const fontSizeClasses = {
//     sm: 'text-sm leading-relaxed',
//     base: 'text-base leading-relaxed',
//     lg: 'text-lg leading-relaxed',
//     xl: 'text-xl leading-relaxed',
//   };

//   const reportReasons = [
//     'Inappropriate content',
//     'Misleading information',
//     'Offensive language',
//     'Spam or unrelated content',
//     'Other',
//   ];

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString(currentLanguage.code, {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const calculateReadingTime = (content) => {
//     const wordsPerMinute = 200;
//     const words = content.split(' ').length;
//     return Math.ceil(words / wordsPerMinute);
//   };

//   const handleLike = async () => {
//     if (userAction === 'liked') {
//       // Undo like
//       try {
//         const token = localStorage.getItem('authToken');
//         await axios.put(
//           `http://localhost:5000/api/news/news/${article.id}`,
//           { likes: likes - 1, dislikes },
//           token ? { headers: { Authorization: `Bearer ${token}` } } : {}
//         );
//         setLikes(likes - 1);
//         setUserAction(null);
//         toast.success('Like removed.');
//       } catch (error) {
//         console.error('Like removal error:', error.response?.status, error.response?.data);
//         toast.error('Failed to remove like.');
//       }
//     } else {
//       // Add like, remove dislike if present
//       const updates = {
//         likes: likes + 1,
//         dislikes: userAction === 'disliked' ? dislikes - 1 : dislikes,
//       };
//       try {
//         const token = localStorage.getItem('authToken');
//         await axios.put(
//           `http://localhost:5000/api/news/news/${article.id}`,
//           updates,
//           token ? { headers: { Authorization: `Bearer ${token}` } } : {}
//         );
//         setLikes(likes + 1);
//         if (userAction === 'disliked') setDislikes(dislikes - 1);
//         setUserAction('liked');
//         toast.success('Article liked!');
//       } catch (error) {
//         console.error('Like error:', error.response?.status, error.response?.data);
//         toast.error('Failed to update like.');
//       }
//     }
//   };

//   const handleDislike = async () => {
//     if (userAction === 'disliked') {
//       // Undo dislike
//       try {
//         const token = localStorage.getItem('authToken');
//         await axios.put(
//           `http://localhost:5000/api/news/news/${article.id}`,
//           { likes, dislikes: dislikes - 1 },
//           token ? { headers: { Authorization: `Bearer ${token}` } } : {}
//         );
//         setDislikes(dislikes - 1);
//         setUserAction(null);
//         toast.success('Dislike removed.');
//       } catch (error) {
//         console.error('Dislike removal error:', error.response?.status, error.response?.data);
//         toast.error('Failed to remove dislike.');
//       }
//     } else {
//       // Add dislike, remove like if present
//       const updates = {
//         likes: userAction === 'liked' ? likes - 1 : likes,
//         dislikes: dislikes + 1,
//       };
//       try {
//         const token = localStorage.getItem('authToken');
//         await axios.put(
//           `http://localhost:5000/api/news/news/${article.id}`,
//           updates,
//           token ? { headers: { Authorization: `Bearer ${token}` } } : {}
//         );
//         setDislikes(dislikes + 1);
//         if (userAction === 'liked') setLikes(likes - 1);
//         setUserAction('disliked');
//         toast.success('Article disliked.');
//       } catch (error) {
//         console.error('Dislike error:', error.response?.status, error.response?.data);
//         toast.error('Failed to update dislike.');
//       }
//     }
//   };

//   const handleTranslate = async (lang) => {
//   setIsLangLoading(true);
//   setShowLangMenu(false);

//   try {
//     const token = localStorage.getItem('authToken');
//     const res = await axios.post(
//   `http://localhost:5000/api/news/${article.id}/translate`,
//   { targetLang: lang }, // 👈 include this in the body!
//   token ? { headers: { Authorization: `Bearer ${token}` } } : {}
// );


//     const translations = res.data.translations;

//     setTranslatedContent({
//       title: translations[lang]?.title || article.title,
//       content: translations[lang]?.content || article.content
//     });

//     toast.success(`Translated to ${lang === 'ta' ? 'Tamil' : 'English'}!`);
//   } catch (error) {
//     console.error('Translate error:', error);
//     toast.error('Failed to translate article');
//   } finally {
//     setIsLangLoading(false);
//   }
// };


//   return (
//     <article
//       className={`max-w-4xl mx-auto px-4 py-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-text-primary'
//         }`}
//     >
//       {/* Breadcrumb */}
//       <nav className="mb-6" aria-label="Breadcrumb">
//         <ol className="flex items-center space-x-2 text-sm text-text-secondary">
//           <li>
//             <a href="/personalized-news-dashboard" className="hover:text-accent">
//               Home
//             </a>
//           </li>
//           <Icon name="ChevronRight" size={16} />
//           <li>
//             <a href="/news-categories-search" className="hover:text-accent">
//               {article.category}
//             </a>
//           </li>
//         </ol>
//       </nav>

//       {/* Article Header */}
//       <header className="mb-8">
//         <div className="mb-4">
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
//             {article.category}
//           </span>
//         </div>
//         <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6 leading-tight">
//           {isTranslating ? (
//             <div className="flex items-center space-x-2">
//               <div className="animate-spin w-5 h-5 border-2 border-accent border-t-transparent rounded-full"></div>
//               <span>Translating...</span>
//             </div>
//           ) : (
//             translatedContent?.title || article.title
//           )}
//         </h1>
//         <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-6">
//           <div className="flex items-center space-x-2">
//             <Image
//               src={article.author.avatar}
//               alt={article.author.name}
//               className="w-8 h-8 rounded-full"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://placehold.co/32x32?text=Avatar';
//               }}
//             />
//             <span className="font-medium text-text-primary">{article.author.name}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Icon name="Calendar" size={16} />
//             <span>{formatDate(article.publishedAt)}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Icon name="Clock" size={16} />
//             <span>{calculateReadingTime(article.content)} min read</span>
//           </div>
//         </div>
//         {article.featuredImage && (
//           <div className="mb-8 rounded-lg overflow-hidden">
//             {isVideoMedia(article.featuredImage) ? (
//               <video
//                 src={article.featuredImage}
//                 controls
//                 className="w-full h-auto max-h-[600px] object-contain"
//                 onError={(e) => {
//                   console.error('Video load failed:', article.featuredImage);
//                   e.target.poster = 'https://placehold.co/800x600?text=No+Video';
//                 }}
//               />
//             ) : (
//               <Image
//                 src={article.featuredImage}
//                 alt={article.title}
//                 className="w-full h-auto object-cover max-h-[600px]"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'https://placehold.co/800x600?text=No+Image';
//                   console.error('Image load failed:', article.featuredImage);
//                 }}
//               />
//             )}
//             {article.imageCaption && (
//               <p className="text-sm text-text-secondary mt-2 italic">{article.imageCaption}</p>
//             )}
//           </div>
//         )}
//       </header>

//       {/* Reading Controls */}
//       <div className="flex items-center justify-between mb-8 p-4 bg-surface rounded-lg">
//         <div className="flex items-center space-x-4">
//           <span className="text-sm font-medium text-text-secondary">Text Size:</span>
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="ghost"
//               onClick={() => setFontSize('sm')}
//               className={`p-2 text-xs ${fontSize === 'sm' ? 'bg-accent text-accent-foreground' : ''}`}
//             >
//               A
//             </Button>
//             <Button
//               variant="ghost"
//               onClick={() => setFontSize('base')}
//               className={`p-2 text-sm ${fontSize === 'base' ? 'bg-accent text-accent-foreground' : ''}`}
//             >
//               A
//             </Button>
//             <Button
//               variant="ghost"
//               onClick={() => setFontSize('lg')}
//               className={`p-2 text-base ${fontSize === 'lg' ? 'bg-accent text-accent-foreground' : ''}`}
//             >
//               A
//             </Button>
//             <Button
//               variant="ghost"
//               onClick={() => setFontSize('xl')}
//               className={`p-2 text-lg ${fontSize === 'xl' ? 'bg-accent text-accent-foreground' : ''}`}
//             >
//               A
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Article Content */}
//       <div
//         className={`prose prose-lg max-w-none ${fontSizeClasses[fontSize]} ${isDarkMode ? 'prose-invert' : ''
//           }`}
//       >
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-text-primary mb-2">Article Content</h2>
//         </div>
//         {isTranslating ? (
//           <div className="space-y-4">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="animate-pulse">
//                 <div className="h-4 bg-surface rounded w-full mb-2"></div>
//                 <div className="h-4 bg-surface rounded w-4/5 mb-2"></div>
//                 <div className="h-4 bg-surface rounded w-3/4"></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div dangerouslySetInnerHTML={{ __html: translatedContent?.content || article.content }} />
//         )}
//       </div>

//       {/* Like, Dislike, and Report */}
//       <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Button
//             variant="ghost"
//             onClick={handleLike}
//             className={`p-2 flex items-center space-x-2 ${userAction === 'liked' ? 'text-accent' : 'text-text-secondary'
//               }`}
//             aria-label={userAction === 'liked' ? 'Remove like' : 'Like article'}
//           >
//             <Icon name="ThumbsUp" size={20} />
//             <span>{likes}</span>
//           </Button>
//           <Button
//             variant="ghost"
//             onClick={handleDislike}
//             className={`p-2 flex items-center space-x-2 ${userAction === 'disliked' ? 'text-accent' : 'text-text-secondary'
//               }`}
//             aria-label={userAction === 'disliked' ? 'Remove dislike' : 'Dislike article'}
//           >
//             <Icon name="ThumbsDown" size={20} />
//             <span>{dislikes}</span>
//           </Button>
//           {/* <div className="relative">
//             <Button
//               variant="ghost"
//               onClick={() => setShowLangMenu(!showLangMenu)}
//               className="p-2 flex items-center space-x-2 text-text-secondary"
//             >
//               <Icon name="Globe" size={20} />
//               <span>Translate</span>
//             </Button>

//             {showLangMenu && (
//               <div className="absolute z-10 mt-2 w-32 bg-white border rounded shadow-md text-sm text-black">
//                 <button
//                   onClick={() => handleTranslate('en')}
//                   className="w-full px-4 py-2 hover:bg-gray-100 text-left"
//                 >
//                   English
//                 </button>
//                 <button
//                   onClick={() => handleTranslate('ta')}
//                   className="w-full px-4 py-2 hover:bg-gray-100 text-left"
//                 >
//                   Tamil
//                 </button>
//               </div>
//             )}
//           </div> */}

//         </div>
//       </div>

//       {/* Article Tags */}
//       {article.tags && article.tags.length > 0 && (
//         <div className="mt-8 pt-6 border-t border-border">
//           <h3 className="text-sm font-medium text-text-secondary mb-3">Tags:</h3>
//           <div className="flex flex-wrap gap-2">
//             {article.tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-surface text-text-primary hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-150"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </article>
//   );
// };

// export default ArticleContent;


import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

const ArticleContent = ({ article, currentLanguage, isTranslating, onBookmark, onShare }) => {
  const [fontSize, setFontSize] = useState('base');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [likes, setLikes] = useState(article.likes || 0);
  const [dislikes, setDislikes] = useState(article.dislikes || 0);
  const [userAction, setUserAction] = useState(null); // null, 'liked', or 'disliked'
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportComment, setReportComment] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [isLangLoading, setIsLangLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked || false);

  const isVideoMedia = (mediaUrl) => {
    if (!mediaUrl || typeof mediaUrl !== 'string') return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => mediaUrl.toLowerCase().endsWith(ext));
  };

  const fontSizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-relaxed',
  };

  const reportReasons = [
    'Inappropriate content',
    'Misleading information',
    'Offensive language',
    'Spam or unrelated content',
    'Other',
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage.code, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleLike = async () => {
    if (userAction === 'liked') {
      try {
        const token = localStorage.getItem('authToken');
        await axios.put(
          `${URL}/news/news/${article.id}`,
          { likes: likes - 1, dislikes },
          token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        );
        setLikes(likes - 1);
        setUserAction(null);
        toast.success('Like removed.');
      } catch (error) {
        console.error('Like removal error:', error.response?.status, error.response?.data);
        toast.error('Failed to remove like.');
      }
    } else {
      const updates = {
        likes: likes + 1,
        dislikes: userAction === 'disliked' ? dislikes - 1 : dislikes,
      };
      try {
        const token = localStorage.getItem('authToken');
        await axios.put(
          `${URL}/news/news/${article.id}`,
          updates,
          token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        );
        setLikes(likes + 1);
        if (userAction === 'disliked') setDislikes(dislikes - 1);
        setUserAction('liked');
        toast.success('Article liked!');
      } catch (error) {
        console.error('Like error:', error.response?.status, error.response?.data);
        toast.error('Failed to update like.');
      }
    }
  };

  const handleDislike = async () => {
    if (userAction === 'disliked') {
      try {
        const token = localStorage.getItem('authToken');
        await axios.put(
          `${URL}/news/news/${article.id}`,
          { likes, dislikes: dislikes - 1 },
          token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        );
        setDislikes(dislikes - 1);
        setUserAction(null);
        toast.success('Dislike removed.');
      } catch (error) {
        console.error('Dislike removal error:', error.response?.status, error.response?.data);
        toast.error('Failed to remove dislike.');
      }
    } else {
      const updates = {
        likes: userAction === 'liked' ? likes - 1 : likes,
        dislikes: dislikes + 1,
      };
      try {
        const token = localStorage.getItem('authToken');
        await axios.put(
          `${URL}/news/news/${article.id}`,
          updates,
          token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        );
        setDislikes(dislikes + 1);
        if (userAction === 'liked') setLikes(likes - 1);
        setUserAction('disliked');
        toast.success('Article disliked.');
      } catch (error) {
        console.error('Dislike error:', error.response?.status, error.response?.data);
        toast.error('Failed to update dislike.');
      }
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsBookmarked(!newBookmarkState);
        toast.error('Please sign in to bookmark articles');
        return;
      }
      await axios.put(
        `${URL}/news/news/${article.id}`,
        { isBookmarked: newBookmarkState },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onBookmark?.(article.id, newBookmarkState);
      toast.success(newBookmarkState ? 'Article bookmarked!' : 'Bookmark removed.');
    } catch (error) {
      console.error('Bookmark error:', error.response?.status, error.response?.data);
      setIsBookmarked(!newBookmarkState);
    }
  };

  const handleShare = () => {
    onShare?.(article);
  };

  const handleTranslate = async (lang) => {
    setIsLangLoading(true);
    setShowLangMenu(false);
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post(
        `${URL}/news/${article.id}/translate`,
        { targetLang: lang },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      const translations = res.data.translations;
      setTranslatedContent({
        title: translations[lang]?.title || article.title,
        content: translations[lang]?.content || article.content
      });
      toast.success(`Translated to ${lang === 'ta' ? 'Tamil' : 'English'}!`);
    } catch (error) {
      console.error('Translate error:', error);
      toast.error('Failed to translate article');
    } finally {
      setIsLangLoading(false);
    }
  };

  return (
    <article
      className={`max-w-4xl mx-auto px-4 py-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-text-primary'}`}
    >
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-text-secondary">
          <li>
            <a href="/personalized-news-dashboard" className="hover:text-accent">
              Home
            </a>
          </li>
          <Icon name="ChevronRight" size={16} />
          <li>
            <a href="/news-categories-search" className="hover:text-accent">
              {article.category}
            </a>
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            {article.category}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6 leading-tight">
          {isTranslating ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-5 h-5 border-2 border-accent border-t-transparent rounded-full"></div>
              <span>Translating...</span>
            </div>
          ) : (
            translatedContent?.title || article.title
          )}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-6">
          <div className="flex items-center space-x-2">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/32x32?text=Avatar';
              }}
            />
            <span className="font-medium text-text-primary">{article.author.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{calculateReadingTime(article.content)} min read</span>
          </div>
        </div>
        {article.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            {isVideoMedia(article.featuredImage) ? (
              <video
                src={article.featuredImage}
                controls
                className="w-full h-auto max-h-[600px] object-contain"
                onError={(e) => {
                  console.error('Video load failed:', article.featuredImage);
                  e.target.poster = 'https://placehold.co/800x600?text=No+Video';
                }}
              />
            ) : (
              <Image
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-auto object-cover max-h-[600px]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/800x600?text=No+Image';
                  console.error('Image load failed:', article.featuredImage);
                }}
              />
            )}
            {article.imageCaption && (
              <p className="text-sm text-text-secondary mt-2 italic">{article.imageCaption}</p>
            )}
          </div>
        )}
      </header>

      <div className="flex items-center justify-between mb-8 p-4 bg-surface rounded-lg">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-text-secondary">Text Size:</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => setFontSize('sm')}
              className={`p-2 text-xs ${fontSize === 'sm' ? 'bg-accent text-accent-foreground' : ''}`}
            >
              A
            </Button>
            <Button
              variant="ghost"
              onClick={() => setFontSize('base')}
              className={`p-2 text-sm ${fontSize === 'base' ? 'bg-accent text-accent-foreground' : ''}`}
            >
              A
            </Button>
            <Button
              variant="ghost"
              onClick={() => setFontSize('lg')}
              className={`p-2 text-base ${fontSize === 'lg' ? 'bg-accent text-accent-foreground' : ''}`}
            >
              A
            </Button>
            <Button
              variant="ghost"
              onClick={() => setFontSize('xl')}
              className={`p-2 text-lg ${fontSize === 'xl' ? 'bg-accent text-accent-foreground' : ''}`}
            >
              A
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`prose prose-lg max-w-none ${fontSizeClasses[fontSize]} ${isDarkMode ? 'prose-invert' : ''}`}
      >
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-text-primary mb-2">Article Content</h2>
        </div>
        {isTranslating ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-surface rounded w-full mb-2"></div>
                <div className="h-4 bg-surface rounded w-4/5 mb-2"></div>
                <div className="h-4 bg-surface rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: translatedContent?.content || article.content }} />
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={handleLike}
            className={`p-2 flex items-center space-x-2 ${userAction === 'liked' ? 'text-accent' : 'text-text-secondary'}`}
            aria-label={userAction === 'liked' ? 'Remove like' : 'Like article'}
          >
            <Icon name="ThumbsUp" size={20} />
            <span>{likes}</span>
          </Button>
          <Button
            variant="ghost"
            onClick={handleDislike}
            className={`p-2 flex items-center space-x-2 ${userAction === 'disliked' ? 'text-accent' : 'text-text-secondary'}`}
            aria-label={userAction === 'disliked' ? 'Remove dislike' : 'Dislike article'}
          >
            <Icon name="ThumbsDown" size={20} />
            <span>{dislikes}</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2 flex items-center space-x-2 text-black relative"
            aria-label="Translate article"
          >
            <Icon name="Languages" size={20} />
            {showLangMenu && (
              <div className="absolute top-10 left-0 bg-white  border border-border rounded-md shadow-md z-10">
                <button
                  onClick={() => handleTranslate('en')}
                  className="block px-4 py-2 w-full text-left  hover:text-black"
                >
                  English
                </button>
                <button
                  onClick={() => handleTranslate('ta')}
                  className="block px-4 py-2 w-full text-left  hover:text-black"
                >
                  Tamil
                </button>
              </div>
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={handleBookmark}
            className={`p-2 flex items-center space-x-2 ${isBookmarked ? 'text-accent' : 'text-text-secondary'}`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          >
            <Icon name={isBookmarked ? 'BookmarkCheck' : 'Bookmark'} size={20} />
          </Button>
          <Button
            variant="ghost"
            onClick={handleShare}
            className="p-2 flex items-center space-x-2 text-text-secondary"
            aria-label="Share article"
          >
            <Icon name="Share2" size={20} />
          </Button>
        </div>
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-text-secondary mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-surface text-text-primary hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-150"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default ArticleContent;
