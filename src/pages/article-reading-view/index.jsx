// import React, { useState, useEffect, useRef } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import GlobalHeader from '../../components/ui/GlobalHeader';
// import ArticleHeader from './components/ArticleHeader';
// import ReadingProgressBar from './components/ReadingProgressBar';
// import ArticleContent from './components/ArticleContent';
// import SocialSharingPanel from './components/SocialSharingPanel';
// import RelatedArticlesCarousel from './components/RelatedArticlesCarousel';
// import CommentSection from './components/CommentSection';
// // import FloatingToolbar from './components/FloatingToolbar';
// import DesktopSidebar from './components/DesktopSidebar';

// const ArticleReadingView = () => {
//   const [searchParams] = useSearchParams();
//   const articleId = searchParams.get('id');
//   const [article, setArticle] = useState(null);
//   const [relatedArticles, setRelatedArticles] = useState([]);
//   const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isSharingPanelOpen, setIsSharingPanelOpen] = useState(false);
//   const [currentLanguage] = useState({ code: 'en', name: 'English', flag: '🇺🇸' });
//   const [articleRating, setArticleRating] = useState({ average: 4.2, count: 156 });
//   const [isLoading, setIsLoading] = useState(true);
//   const [comments, setComments] = useState([]);
//   const contentRef = useRef(null);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const res = await axios.get(` http://localhost:5000/api/comments/${articleId}`);
//         setComments(res.data.comments || []);
//       } catch (err) {
//         console.error('Error fetching comments:', err);
//         toast.error('Failed to load comments');
//       }
//     };

//     if (articleId) fetchComments();
//   }, [articleId]);

//   useEffect(() => {
//     const fetchArticleAndRelated = async () => {
//       if (!articleId) {
//         toast.error('No article ID provided');
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const articleResponse = await axios.get(` http://localhost:5000/api/news/news/${articleId}`);
//         const articleData = articleResponse.data;

//         setArticle({
//           id: articleData._id,
//           title: articleData.title || 'No Title',
//           content: `<p>${articleData.content || 'No Content'}</p>`,
//           category: articleData.category || 'general',
//           tags: articleData.tags || [],
//           views: articleData.views || 0,
//           comments: articleData.comments || 0,
//           shares: articleData.shares || 0,
//           readTime: articleData.readTime || 0,
//           isBookmarked: articleData.isBookmarked || false,
//           featuredImage: articleData.media?.[0] || 'https://via.placeholder.com/800x600',
//           author: {
//             name: articleData.reporter?.name || 'Unknown Author',
//             avatar: 'https://via.placeholder.com/32x32',
//           },
//           publishedAt: articleData.createdAt || new Date().toISOString(),
//         });
//         setIsBookmarked(articleData.isBookmarked || false);

//         const response = await axios.get(' http://localhost:5000/api/news/public');
//         const fetchedArticles = await Promise.all(
//           response.data
//             .filter((item) => {
//               if (item._id === articleId) return false;
//               const hasMatchingCategory = item.category === articleData.category;
//               const hasMatchingTag = item.tags?.some((tag) => articleData.tags?.includes(tag));
//               return hasMatchingCategory || hasMatchingTag;
//             })
//             .map(async (item) => {
//               let reporterName = item.reporter?.name || 'Unknown Author';
//               if (typeof item.reporter === 'string') {
//                 try {
//                   const reporterResponse = await axios.get(
//                     ` http://localhost:5000/api/reporters/${item.reporter}`
//                   );
//                   reporterName = reporterResponse.data.name || 'Unknown Author';
//                 } catch (error) {
//                   console.error(`Failed to fetch reporter for ID ${item.reporter}:`, error);
//                 }
//               }
//               return {
//                 id: item._id,
//                 title: item.title || 'No Title',
//                 content: item.content || '',
//                 category: item.category || 'general',
//                 featuredImage: item.media?.[0] || 'https://via.placeholder.com/400x300',
//                 author: {
//                   name: reporterName,
//                   avatar: 'https://via.placeholder.com/32x32',
//                 },
//                 publishedAt: item.createdAt || new Date().toISOString(),
//               };
//             })
//         );

//         setRelatedArticles(fetchedArticles.slice(0, 6));
//       } catch (error) {
//         console.error('Fetch error:', error.response?.status, error.response?.data);
//         toast.error(error?.response?.data?.message || 'Failed to load article or related articles.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchArticleAndRelated();
//   }, [articleId]);

//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setIsHeaderCollapsed(currentScrollY > lastScrollY && currentScrollY > 100);
//       lastScrollY = currentScrollY;
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleToggleBookmark = async () => {
//     const newBookmarkState = !isBookmarked;
//     setIsBookmarked(newBookmarkState);
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         ` http://localhost:5000/api/news/news/${articleId}`,
//         { isBookmarked: newBookmarkState },
//         token ? { headers: { Authorization: `Bearer ${token}` } } : {}
//       );
//     } catch (error) {
//       console.error('Bookmark error:', error.response?.status, error.response?.data);
//       toast.error('Failed to update bookmark');
//       setIsBookmarked(!newBookmarkState);
//     }
//   };

//   const handleShare = () => {
//     setIsSharingPanelOpen(!isSharingPanelOpen);
//   };

//   const handleRateArticle = (rating) => {
//     setArticleRating((prev) => ({
//       average: (prev.average * prev.count + rating) / (prev.count + 1),
//       count: prev.count + 1,
//     }));
//   };

//   const handleToggleAudio = () => {
//     toast.info('Audio playback not implemented');
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <GlobalHeader />
//         <div className="max-w-4xl mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-12 bg-surface rounded mb-6"></div>
//             <div className="h-64 bg-surface rounded mb-8"></div>
//             <div className="space-y-4">
//               {[...Array(5)].map((_, i) => (
//                 <div key={i} className="h-4 bg-surface rounded w-full"></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!article) {
//     return (
//       <div className="min-h-screen bg-background">
//         <GlobalHeader />
//         <div className="max-w-4xl mx-auto px-4 py-8 text-center">
//           <h2 className="text-2xl font-bold text-text-primary mb-4">Article Not Found</h2>
//           <p className="text-text-secondary">The requested article could not be loaded. Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <GlobalHeader />
//       <ReadingProgressBar contentRef={contentRef} />
//       <ArticleHeader
//         isCollapsed={isHeaderCollapsed}
//         onToggleCollapse={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
//         isBookmarked={isBookmarked}
//         onToggleBookmark={handleToggleBookmark}
//         onShare={handleShare}
//         currentLanguage={currentLanguage}
//         availableLanguages={[{ code: 'en', name: 'English', flag: '🇺🇸' }]}
//         onLanguageChange={() => toast.info('Translations not available')}
//         article={article}
//       />
//       <main className="pt-16" ref={contentRef}>
//         <div className="max-w-7xl mx-auto flex">
//           <div className="flex-1 xl:mr-96">
//             <ArticleContent article={article} currentLanguage={currentLanguage} isTranslating={false} />
//             <RelatedArticlesCarousel
//               articles={relatedArticles}
//               currentArticleId={article.id}
//               category={article.category}
//               tags={article.tags}
//             />
//             <CommentSection articleId={article.id} comments={comments} />
//           </div>
//           <DesktopSidebar
//             article={article}
//             relatedArticles={relatedArticles}
//           />
//         </div>
//       </main>
//       {/* <FloatingToolbar
//         isBookmarked={isBookmarked}
//         onToggleBookmark={handleToggleBookmark}
//         onShare={handleShare}
//         articleRating={articleRating}
//         onRateArticle={handleRateArticle}
//         onToggleAudio={handleToggleAudio}
//         isAudioPlaying={false}
//       /> */}
//       <SocialSharingPanel
//         article={article}
//         isOpen={isSharingPanelOpen}
//         onToggle={() => setIsSharingPanelOpen(!isSharingPanelOpen)}
//       />
//     </div>
//   );
// };

// export default ArticleReadingView;




import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ArticleHeader from './components/ArticleHeader';
import ReadingProgressBar from './components/ReadingProgressBar';
import ArticleContent from './components/ArticleContent';
// import SocialSharingPanel from './components/SocialSharingPanel';
import RelatedArticlesCarousel from './components/RelatedArticlesCarousel';
import CommentSection from './components/CommentSection';
import DesktopSidebar from './components/DesktopSidebar';

const ArticleReadingView = () => {
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get('id');
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSharingPanelOpen, setIsSharingPanelOpen] = useState(false);
  const [currentLanguage] = useState({ code: 'en', name: 'English', flag: '🇺🇸' });
  const [articleRating, setArticleRating] = useState({ average: 4.2, count: 156 });
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${articleId}`);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error('Error fetching comments:', err);
        toast.error('Failed to load comments');
      }
    };

    if (articleId) fetchComments();
  }, [articleId]);

  useEffect(() => {
    const fetchArticleAndRelated = async () => {
      if (!articleId) {
        toast.error('No article ID provided');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const articleResponse = await axios.get(`http://localhost:5000/api/news/news/${articleId}`);
        const articleData = articleResponse.data;

        setArticle({
          id: articleData._id,
          title: articleData.title || 'No Title',
          content: `<p>${articleData.content || 'No Content'}</p>`,
          category: articleData.category || 'general',
          tags: articleData.tags || [],
          views: articleData.views || 0,
          comments: articleData.comments || 0,
          shares: articleData.shares || 0,
          readTime: articleData.readTime || 0,
          isBookmarked: articleData.isBookmarked || false,
          featuredImage: articleData.media?.[0] || 'https://via.placeholder.com/800x600',
          author: {
            name: articleData.reporter?.name || 'Unknown Author',
            avatar: 'https://via.placeholder.com/32x32',
          },
          publishedAt: articleData.createdAt || new Date().toISOString(),
        });
        setIsBookmarked(articleData.isBookmarked || false);

        const response = await axios.get('http://localhost:5000/api/news/public');
        const fetchedArticles = await Promise.all(
          response.data
            .filter((item) => {
              if (item._id === articleId) return false;
              const hasMatchingCategory = item.category === articleData.category;
              const hasMatchingTag = item.tags?.some((tag) => articleData.tags?.includes(tag));
              return hasMatchingCategory || hasMatchingTag;
            })
            .map(async (item) => {
              let reporterName = item.reporter?.name || 'Unknown Author';
              if (typeof item.reporter === 'string') {
                try {
                  const reporterResponse = await axios.get(
                    `http://localhost:5000/api/reporters/${item.reporter}`
                  );
                  reporterName = reporterResponse.data.name || 'Unknown Author';
                } catch (error) {
                  console.error(`Failed to fetch reporter for ID ${item.reporter}:`, error);
                }
              }
              return {
                id: item._id,
                title: item.title || 'No Title',
                content: item.content || '',
                category: item.category || 'general',
                featuredImage: item.media?.[0] || 'https://via.placeholder.com/400x300',
                author: {
                  name: reporterName,
                  avatar: 'https://via.placeholder.com/32x32',
                },
                publishedAt: item.createdAt || new Date().toISOString(),
              };
            })
        );

        setRelatedArticles(fetchedArticles.slice(0, 6));
      } catch (error) {
        console.error('Fetch error:', error.response?.status, error.response?.data);
        toast.error(error?.response?.data?.message || 'Failed to load article or related articles.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleAndRelated();
  }, [articleId]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderCollapsed(currentScrollY > lastScrollY && currentScrollY > 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleBookmark = async (articleId, newBookmarkState) => {
    setIsBookmarked(newBookmarkState);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/news/news/${articleId}`,
        { isBookmarked: newBookmarkState },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
    } catch (error) {
      console.error('Bookmark error:', error.response?.status, error.response?.data);
      setIsBookmarked(!newBookmarkState);
    }
  };

  const handleShare = async (article) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(
        `http://localhost:5000/api/news/news/${article.id}/share`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setArticle((prev) => ({
        ...prev,
        shares: prev.shares + 1,
      }));

      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.content.replace(/<[^>]+>/g, ''),
          url: `${window.location.origin}/article-reading-view?id=${article.id}`,
        });
      } else {
        navigator.clipboard.writeText(`${window.location.origin}/article-reading-view?id=${article.id}`);
        toast.info('Link copied to clipboard');
      }

      toast.success('Article shared and count updated!');
    } catch (error) {
      console.error('Error sharing article:', error);
      toast.error('Failed to share or update share count');
    }
    setIsSharingPanelOpen(!isSharingPanelOpen);
  };

  // const handleRateArticle = (rating) => {
  //   setArticleRating((prev) => ({
  //     average: (prev.average * prev.count + rating) / (prev.count + 1),
  //     count: prev.count + 1,
  //   }));
  // };

  // const handleToggleAudio = () => {
  //   toast.info('Audio playback not implemented');
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-surface rounded mb-6"></div>
            <div className="h-64 bg-surface rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-surface rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Article Not Found</h2>
          <p className="text-text-secondary">The requested article could not be loaded. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <ReadingProgressBar contentRef={contentRef} />
      <ArticleHeader
        isCollapsed={isHeaderCollapsed}
        onToggleCollapse={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
        isBookmarked={isBookmarked}
        onToggleBookmark={handleToggleBookmark}
        onShare={handleShare}
        currentLanguage={currentLanguage}
        availableLanguages={[{ code: 'en', name: 'English', flag: '🇺🇸' }]}
        onLanguageChange={() => toast.info('Translations not available')}
        article={article}
      />
      <main className="pt-16" ref={contentRef}>
        <div className="max-w-7xl mx-auto flex">
          <div className="flex-1 xl:mr-96">
            <ArticleContent
              article={article}
              currentLanguage={currentLanguage}
              isTranslating={false}
              onBookmark={handleToggleBookmark}
              onShare={handleShare}
            />
            <RelatedArticlesCarousel
              articles={relatedArticles}
              currentArticleId={article.id}
              category={article.category}
              tags={article.tags}
            />
            <CommentSection articleId={article.id} comments={comments} />
          </div>
          <DesktopSidebar
            article={article}
            relatedArticles={relatedArticles}
          />
        </div>
      </main>
      {/* <SocialSharingPanel
        article={article}
        isOpen={isSharingPanelOpen}
        onToggle={() => setIsSharingPanelOpen(!isSharingPanelOpen)}
      /> */}
    </div>
  );
};

export default ArticleReadingView;