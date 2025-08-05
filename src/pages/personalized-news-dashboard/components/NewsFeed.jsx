// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import NewsCard from './NewsCard';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';
// const URL = import.meta.env.VITE_API_BASE_URL;

// const NewsFeed = ({ selectedCategory, refreshTrigger }) => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);

//   const isVideoMedia = (mediaUrl) => {
//     if (!mediaUrl || typeof mediaUrl !== 'string') return false;
//     const videoExtensions = ['.mp4', '.webm', '.ogg'];
//     return videoExtensions.some((ext) => mediaUrl.toLowerCase().endsWith(ext));
//   };

//   const getThumbnailUrl = (mediaUrl) => {
//     if (!mediaUrl || typeof mediaUrl !== 'string') return 'https://placehold.co/800x600?text=No+Image';
//     if (isVideoMedia(mediaUrl)) {
//       return mediaUrl.replace('/upload/', '/upload/so_0/').replace(/\.\w+$/, '.jpg');
//     }
//     return mediaUrl;
//   };

//   const calculateReadingTime = (content) => {
//     if (!content) return 3;
//     const words = content.split(/\s+/).length;
//     const minutes = Math.ceil(words / 200);
//     return minutes > 0 ? minutes : 3;
//   };

//   const loadArticles = useCallback(
//     async (pageNum = 1, category = 'all', reset = false) => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('authToken');
//         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

//         const state = localStorage.getItem('selectedState');
//         const district = localStorage.getItem('selectedDistrict');
//         const taluk = localStorage.getItem('selectedTaluk');

//         const params = new URLSearchParams();
//         if (state) params.append('state', state);
//         if (district) params.append('district', district);
//         if (taluk) params.append('taluk', taluk);
//         if (category !== 'all') params.append('category', category);

//         const response = await axios.get(`${URL}/news/filter?${params}`, config);

//         const mappedArticles = response.data.articles.map((article) => ({
//           id: article._id,
//           headline: article.title || 'No Title',
//           summary: article.content || 'No Content',
//           imageUrl: getThumbnailUrl(article.media?.[0]) || 'https://placehold.co/800x600?text=No+Image',
//           originalMedia: article.media?.[0],
//           category: article.category || 'general',
//           language: 'en',
//           views: article.views || 0,
//           comments: article.comments || 0,
//           shares: article.shares || 0,
//           readingTime: article.readTime > 0 ? article.readTime : calculateReadingTime(article.content),
//           isBookmarked: article.isBookmarked || false,
//         }));

//         const startIndex = (pageNum - 1) * 6;
//         const endIndex = startIndex + 6;
//         const paginatedArticles = mappedArticles.slice(startIndex, endIndex);

//         if (reset) {
//           setArticles(paginatedArticles);
//         } else {
//           setArticles((prev) => [...prev, ...paginatedArticles]);
//         }

//         setHasMore(endIndex < mappedArticles.length);
//       } catch (error) {
//         toast.error(error?.response?.data?.message || 'Failed to load articles. Please try again.');
//         setHasMore(false);
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   useEffect(() => {
//     const handleLocationChange = (event) => {
//       // Only react to locationChange events with state or district (from LocationSelector)
//       if (event.detail.state || event.detail.district) {
//         setPage(1);
//         loadArticles(1, selectedCategory, true);
//       }
//     };

//     document.addEventListener('locationChange', handleLocationChange);
//     return () => {
//       document.removeEventListener('locationChange', handleLocationChange);
//     };
//   }, [selectedCategory, loadArticles]);

//   useEffect(() => {
//     setPage(1);
//     loadArticles(1, selectedCategory, true);
//   }, [selectedCategory, refreshTrigger, loadArticles]);

//   const loadMore = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);
//     loadArticles(nextPage, selectedCategory, false);
//   };

//   const handleBookmark = (articleId, isBookmarked) => {
//     setArticles((prev) =>
//       prev.map((article) =>
//         article.id === articleId ? { ...article, isBookmarked } : article
//       )
//     );
//   };

// const handleShare = async (article) => {
//   try {
//     const token = localStorage.getItem('authToken');

//     // 1. Update share count in backend
//     await axios.patch(
//       `${URL}/news/news/${article.id}/share`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     // 2. Update share count locally in state
//     setArticles((prev) =>
//       prev.map((item) =>
//         item.id === article.id
//           ? { ...item, shares: item.shares + 1 }
//           : item
//       )
//     );

//     // 3. Perform the actual share
//     if (navigator.share) {
//       await navigator.share({
//         title: article.headline,
//         text: article.summary,
//         url: `${window.location.origin}/article-reading-view?id=${article.id}`,
//       });
//     } else {
//       navigator.clipboard.writeText(`${window.location.origin}/article-reading-view?id=${article.id}`);
//       toast.info('Link copied to clipboard');
//     }

//     toast.success('Article shared and count updated!');
//   } catch (error) {
//     console.error('Error sharing article:', error);
//     toast.error('Failed to share or update share count');
//   }
// };



//   const handleTranslate = (article) => {
//     toast.info(`Translation not implemented for article: ${article.headline}`);
//   };

//   const LoadingSkeleton = () => (
//     <div className="bg-background border border-border rounded-lg overflow-hidden animate-pulse">
//       <div className="aspect-video bg-surface"></div>
//       <div className="p-4 space-y-3">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div className="w-5 h-5 bg-surface rounded-full"></div>
//             <div className="w-20 h-4 bg-surface rounded"></div>
//           </div>
//           <div className="w-12 h-3 bg-surface rounded"></div>
//         </div>
//         <div className="space-y-2">
//           <div className="w-full h-5 bg-surface rounded"></div>
//           <div className="w-3/4 h-5 bg-surface rounded"></div>
//         </div>
//         <div className="space-y-2">
//           <div className="w-full h-3 bg-surface rounded"></div>
//           <div className="w-full h-3 bg-surface rounded"></div>
//           <div className="w-1/2 h-3 bg-surface rounded"></div>
//         </div>
//       </div>
//     </div>
//   );

//     useEffect(() => {
//     const handleSearch = async (event) => {
//       const query = event.detail.query?.toLowerCase();
//       if (!query) return;

//       setLoading(true);

//       try {
//         const token = localStorage.getItem('authToken');
//         const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

//         const response = await axios.get(`${URL}/news/public`, config);

//         const filtered = response.data.filter((article) =>
//           article.title?.toLowerCase().includes(query) ||
//           article.content?.toLowerCase().includes(query)
//         );

//         const mappedArticles = filtered.map((article) => ({
//           id: article._id,
//           headline: article.title || 'No Title',
//           summary: article.content || 'No Content',
//           imageUrl: getThumbnailUrl(article.media?.[0]),
//           originalMedia: article.media?.[0],
//           category: article.category || 'general',
//           // language: 'en',
//           views: article.views || 0,
//           comments: article.comments || 0,
//           shares: article.shares || 0,
//           readingTime: article.readTime > 0 ? article.readTime : calculateReadingTime(article.content),
//           isBookmarked: article.isBookmarked || false,
//         }));

//         setArticles(mappedArticles);
//         setHasMore(false); // Disable "Load More" after search
//       } catch (error) {
//         toast.error('Search failed. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     document.addEventListener('performSearch', handleSearch);
//     return () => document.removeEventListener('performSearch', handleSearch);
//   }, []);


//   return (
//     <div className="max-w-full sm:max-w-4xl mx-auto px-1.5 xs:px-2 sm:px-4 py-3 xs:py-4 sm:py-6">
//       <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-6 mb-4 xs:mb-6 sm:mb-8">
//         {articles.map((article) => (
//           <NewsCard
//             key={article.id}
//             article={article}
//             onBookmark={handleBookmark}
//             onShare={handleShare}
//             onTranslate={handleTranslate}
//           />
//         ))}
//         {loading &&
//           [...Array(6)].map((_, index) => <LoadingSkeleton key={`skeleton-${index}`} />)}
//       </div>

//       {hasMore && !loading && (
//         <div className="text-center">
//           <Button
//             variant="outline"
//             onClick={loadMore}
//             className="px-4 xs:px-6 py-2 xs:py-2.5 sm:px-8 sm:py-3 text-xs xs:text-sm sm:text-base"
//           >
//             <Icon name="ChevronDown" size={16} className="mr-2" />
//             Load More Articles
//           </Button>
//         </div>
//       )}

//       {!loading && articles.length === 0 && (
//         <div className="text-center py-6 xs:py-8 sm:py-12">
//           <Icon
//             name="FileText"
//             size={32}
//             className="text-text-secondary mx-auto mb-2 xs:mb-3 sm:mb-4"
//           />
//           <h3 className="text-sm xs:text-base sm:text-lg font-medium text-text-primary mb-1 xs:mb-1.5 sm:mb-2">
//             No articles found
//           </h3>
//           <p className="text-xs xs:text-sm sm:text-base text-text-secondary mb-2 xs:mb-3 sm:mb-4">
//             Try selecting a different category or check back later
//           </p>
//           <Button
//             variant="primary"
//             onClick={() => loadArticles(1, 'all', true)}
//             className="text-xs xs:text-sm sm:text-base px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3"
//           >
//             <Icon name="RefreshCw" size={14} className="mr-2" />
//             Refresh Feed
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewsFeed;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NewsCard from './NewsCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
const URL = import.meta.env.VITE_API_BASE_URL;


const NewsFeed = ({ selectedCategory, refreshTrigger }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const isVideoMedia = (mediaUrl) => {
    if (!mediaUrl || typeof mediaUrl !== 'string') return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some((ext) => mediaUrl.toLowerCase().endsWith(ext));
  };

  const getThumbnailUrl = (mediaUrl) => {
    if (!mediaUrl || typeof mediaUrl !== 'string') return 'https://placehold.co/800x600?text=No+Image';
    if (isVideoMedia(mediaUrl)) {
      return mediaUrl.replace('/upload/', '/upload/so_0/').replace(/\.\w+$/, '.jpg');
    }
    return mediaUrl;
  };

  const calculateReadingTime = (content) => {
    if (!content) return 3;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes > 0 ? minutes : 3;
  };

  const loadArticles = useCallback(
    async (pageNum = 1, category = 'all', reset = false) => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        const state = localStorage.getItem('selectedState');
        const district = localStorage.getItem('selectedDistrict');
        const taluk = localStorage.getItem('selectedTaluk');

        const params = new URLSearchParams();
        if (state) params.append('state', state);
        if (district) params.append('district', district);
        if (taluk) params.append('taluk', taluk);
        if (category !== 'all') params.append('category', category);

        const response = await axios.get(`${URL}/news/filter?${params}`, config);

        const mappedArticles = response.data.articles.map((article) => ({
          id: article._id,
          headline: article.title || 'No Title',
          summary: article.content || 'No Content',
          imageUrl: getThumbnailUrl(article.media?.[0]) || 'https://placehold.co/800x600?text=No+Image',
          originalMedia: article.media?.[0],
          category: article.category || 'general',
          language: 'en',
          views: article.views || 0,
          comments: article.comments || 0,
          shares: article.shares || 0,
          readingTime: article.readTime > 0 ? article.readTime : calculateReadingTime(article.content),
          isBookmarked: article.isBookmarked || false,
        }));

        const startIndex = (pageNum - 1) * 6;
        const endIndex = startIndex + 6;
        const paginatedArticles = mappedArticles.slice(startIndex, endIndex);

        if (reset) {
          setArticles(paginatedArticles);
        } else {
          setArticles((prev) => [...prev, ...paginatedArticles]);
        }

        setHasMore(endIndex < mappedArticles.length);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load articles. Please try again.');
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const handleLocationChange = (event) => {
      // Only react to locationChange events with state or district (from LocationSelector)
      if (event.detail.state || event.detail.district) {
        setPage(1);
        loadArticles(1, selectedCategory, true);
      }
    };

    document.addEventListener('locationChange', handleLocationChange);
    return () => {
      document.removeEventListener('locationChange', handleLocationChange);
    };
  }, [selectedCategory, loadArticles]);

  useEffect(() => {
    setPage(1);
    loadArticles(1, selectedCategory, true);
  }, [selectedCategory, refreshTrigger, loadArticles]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadArticles(nextPage, selectedCategory, false);
  };

  const handleBookmark = (articleId, isBookmarked) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === articleId ? { ...article, isBookmarked } : article
      )
    );
  };

  // const handleShare = async (article) => {

  //   const token = localStorage.getItem('authToken');

  //   // ✅ If not signed in, show message and stop execution
  //   if (!token) {
  //     toast.warning('Please sign in to share articles');
  //     return; // ❌ Do not navigate, do not proceed
  //   }

  //   try {
  //     // ✅ Update share count in backend
  //     await axios.patch(
  //       `${URL}/news/news/${article.id}/share`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // ✅ Update local share count
  //     setArticles((prev) =>
  //       prev.map((item) =>
  //         item.id === article.id
  //           ? { ...item, shares: item.shares + 1 }
  //           : item
  //       )
  //     );

  //     // ✅ Share the link or copy to clipboard
  //     if (navigator.share) {
  //       await navigator.share({
  //         title: article.headline,
  //         text: article.summary,
  //         url: previewUrl,
  //       });
  //     } else {
  //       navigator.clipboard.writeText(previewUrl);
  //       toast.info('Link copied to clipboard');
  //     }

  //     toast.success('Article shared and count updated!');
  //   } catch (error) {
  //     console.error('Error sharing article:', error);
  //     toast.error('Failed to share or update share count');
  //   }
  // };

//   const handleShare = async (article) => {
//   const token = localStorage.getItem('authToken');

//   if (!token) {
//     toast.warning('Please sign in to share articles');
//     window.location.href = '/user-authentication-login-register';
//     return;
//   }

//   try {
//     // 1. Update backend share count
//     await axios.patch(
//       `${URL}/news/news/${article.id}/share`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     // 2. Update frontend state
//     setArticles((prev) =>
//       prev.map((item) =>
//         item.id === article.id
//           ? { ...item, shares: item.shares + 1 }
//           : item
//       )
//     );

//     // 3. Share link using navigator or fallback
//     const shareUrl = `${window.location.origin}/article-reading-view?id=${article.id}`;

//     if (navigator.share) {
//       await navigator.share({
//         title: article.headline,
//         text: article.summary,
//         url: shareUrl,
//       });
//     } else {
//       navigator.clipboard.writeText(shareUrl);
//       toast.info('Link copied to clipboard');
//     }

//     toast.success('Article shared and count updated!');
//   } catch (error) {
//     console.error('Error sharing article:', error);
//     toast.error('Failed to share or update share count');
//   }
// };


const handleShare = async (article) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    toast.warning('Please sign in to share articles');
    window.location.href = '/user-authentication-login-register';
    return;
  }

  try {
    // 1. Update backend share count
    await axios.patch(
      `${URL}/news/news/${article.id}/share`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 2. Update frontend state
    setArticles((prev) =>
      prev.map((item) =>
        item.id === article.id
          ? { ...item, shares: item.shares + 1 }
          : item
      )
    );

    // 3. Share link using navigator or fallback
    const shareUrl = `${window.location.origin}/article-reading-view?id=${article.id}`;

    if (navigator.share) {
      await navigator.share({
        title: article.headline,
        text: article.caption || article.summary || '',
        url: shareUrl,
        // Note: navigator.share does not support images directly
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.info('Link copied to clipboard');
    }

    toast.success('Article shared and count updated!');
  } catch (error) {
    console.error('Error sharing article:', error);
    toast.error('Failed to share or update share count');
  }
};


  const handleTranslate = (article) => {
    toast.info(`Translation not implemented for article: ${article.headline}`);
  };

  const LoadingSkeleton = () => (
    <div className="bg-background border border-border rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-video bg-surface"></div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-surface rounded-full"></div>
            <div className="w-20 h-4 bg-surface rounded"></div>
          </div>
          <div className="w-12 h-3 bg-surface rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="w-full h-5 bg-surface rounded"></div>
          <div className="w-3/4 h-5 bg-surface rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="w-full h-3 bg-surface rounded"></div>
          <div className="w-full h-3 bg-surface rounded"></div>
          <div className="w-1/2 h-3 bg-surface rounded"></div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const handleSearch = async (event) => {
      const query = event.detail.query?.toLowerCase();
      if (!query) return;

      setLoading(true);

      try {
        const token = localStorage.getItem('authToken');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        const response = await axios.get(`${URL}/news/public`, config);

        const filtered = response.data.filter((article) =>
          article.title?.toLowerCase().includes(query) ||
          article.content?.toLowerCase().includes(query)
        );

        const mappedArticles = filtered.map((article) => ({
          id: article._id,
          headline: article.title || 'No Title',
          summary: article.content || 'No Content',
          imageUrl: getThumbnailUrl(article.media?.[0]),
          originalMedia: article.media?.[0],
          category: article.category || 'general',
          // language: 'en',
          views: article.views || 0,
          comments: article.comments || 0,
          shares: article.shares || 0,
          readingTime: article.readTime > 0 ? article.readTime : calculateReadingTime(article.content),
          isBookmarked: article.isBookmarked || false,
        }));

        setArticles(mappedArticles);
        setHasMore(false); // Disable "Load More" after search
      } catch (error) {
        toast.error('Search failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    document.addEventListener('performSearch', handleSearch);
    return () => document.removeEventListener('performSearch', handleSearch);
  }, []);


  return (
    <div className="max-w-full sm:max-w-4xl mx-auto px-1.5 xs:px-2 sm:px-4 py-3 xs:py-4 sm:py-6">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-6 mb-4 xs:mb-6 sm:mb-8">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onBookmark={handleBookmark}
            onShare={handleShare}
            onTranslate={handleTranslate}
          />
        ))}
        {loading &&
          [...Array(6)].map((_, index) => <LoadingSkeleton key={`skeleton-${index}`} />)}
      </div>

      {hasMore && !loading && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={loadMore}
            className="px-4 xs:px-6 py-2 xs:py-2.5 sm:px-8 sm:py-3 text-xs xs:text-sm sm:text-base"
          >
            <Icon name="ChevronDown" size={16} className="mr-2" />
            Load More Articles
          </Button>
        </div>
      )}

      {!loading && articles.length === 0 && (
        <div className="text-center py-6 xs:py-8 sm:py-12">
          <Icon
            name="FileText"
            size={32}
            className="text-text-secondary mx-auto mb-2 xs:mb-3 sm:mb-4"
          />
          <h3 className="text-sm xs:text-base sm:text-lg font-medium text-text-primary mb-1 xs:mb-1.5 sm:mb-2">
            No articles found
          </h3>
          <p className="text-xs xs:text-sm sm:text-base text-text-secondary mb-2 xs:mb-3 sm:mb-4">
            Try selecting a different category or check back later
          </p>
          <Button
            variant="primary"
            onClick={() => loadArticles(1, 'all', true)}
            className="text-xs xs:text-sm sm:text-base px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3"
          >
            <Icon name="RefreshCw" size={14} className="mr-2" />
            Refresh Feed
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;