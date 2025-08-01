// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { UserContext } from '../../context/UserContext';
// import GlobalHeader from '../../components/ui/GlobalHeader';
// import Icon from '../../components/AppIcon';
// import Button from '../../components/ui/Button';
// import BookmarkCard from './components/BookmarkCard';
// import axios from 'axios';

// const URL = import.meta.env.VITE_API_BASE_URL;

// const BookmarksReading = () => {
//   const { user, isAuthenticated, refreshUserData } = useContext(UserContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [bookmarks, setBookmarks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filters, setFilters] = useState({
//     language: 'all',
//     category: 'All Categories',
//     dateRange: 'all',
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log('BookmarksReading useEffect running:', { isAuthenticated, user });
//       const token = localStorage.getItem('authToken');

//       if (!token) {
//         console.log('No token found, redirecting to login');
//         toast.error('Please log in to access your collections.');
//         navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
//         setIsLoading(false);
//         return;
//       }

//       if (!isAuthenticated || !user) {
//         console.log('Waiting for user authentication:', { isAuthenticated, user });
//         return;
//       }

//       setIsLoading(true);
//       try {
//         console.log('Fetching data with token:', token);
//         const [bookmarksRes, categoriesRes] = await Promise.all([
//           axios.get(`${URL}/bookmark`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${URL}/category/get`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         const bookmarksData = (bookmarksRes.data.news || []).map(bookmark => ({
//           ...bookmark,
//           image: bookmark.media?.[0] || '/default-news.jpg',
//         }));
//         const categoriesData = ['All Categories', ...(categoriesRes.data.categories?.map(c => c.name) || [])];

//         console.log('bookmarksData:', bookmarksData);
//         console.log('Media check:');
//         [0, 3].forEach(i => {
//           const media = bookmarksData[i]?.image;
//           if (typeof media === 'string') {
//             if (/\.(mp4|webm|ogg)$/i.test(media)) {
//               console.log(`📺 bookmarksData[${i}] is a VIDEO:`, media);
//             } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(media)) {
//               console.log(`🖼️ bookmarksData[${i}] is an IMAGE:`, media);
//             } else {
//               console.log(`❓ bookmarksData[${i}] has UNKNOWN media type:`, media);
//             }
//           } else {
//             console.log(`❌ bookmarksData[${i}] has invalid media format:`, media);
//           }
//         });

//         setBookmarks(bookmarksData);
//         setCategories(categoriesData);
//       } catch (err) {
//         console.error('Error fetching data:', err.response?.data?.error || err.message);
//         toast.error('Failed to load data. Please try again.');
//         if (err.response?.status === 401) {
//           console.log('401 error, refreshing user data');
//           await refreshUserData();
//           if (!isAuthenticated) {
//             navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
//           }
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [user, isAuthenticated, refreshUserData, navigate, location.pathname]);

//   const applyDateRangeFilter = (items) => {
//     const now = new Date();
//     return items.filter((item) => {
//       const itemDate = new Date(item.savedDate || item.createdAt);
//       switch (filters.dateRange) {
//         case 'today':
//           return itemDate.toDateString() === now.toDateString();
//         case 'week':
//           const oneWeekAgo = new Date(now);
//           oneWeekAgo.setDate(now.getDate() - 7);
//           return itemDate >= oneWeekAgo;
//         case 'month':
//           const oneMonthAgo = new Date(now);
//           oneMonthAgo.setMonth(now.getMonth() - 1);
//           return itemDate >= oneMonthAgo;
//         case 'year':
//           const oneYearAgo = new Date(now);
//           oneYearAgo.setFullYear(now.getFullYear() - 1);
//           return itemDate >= oneYearAgo;
//         default:
//           return true;
//       }
//     });
//   };

//   const filteredBookmarks = applyDateRangeFilter(bookmarks).filter((bookmark) => {
//     const matchesSearch =
//       bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (bookmark.reporter?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesLanguage = filters.language === 'all' || bookmark.language === filters.language;
//     const matchesCategory = filters.category === 'All Categories' || bookmark.category === filters.category;
//     return matchesSearch && matchesLanguage && matchesCategory;
//   });

//   const handleFilterChange = (filterType, value) => {
//     setFilters((prev) => ({ ...prev, [filterType]: value }));
//   };

//   const handleClearFilters = () => {
//     setFilters({
//       language: 'all',
//       category: 'All Categories',
//       dateRange: 'all',
//     });
//     setSearchQuery('');
//   };

//   const handleRemoveBookmark = async (bookmarkId) => {
//     console.log('handleRemoveBookmark called with bookmarkId:', bookmarkId); // Debug log
//     const prevBookmarks = [...bookmarks];
//     setBookmarks((prev) => {
//       const newBookmarks = prev.filter((b) => b._id !== bookmarkId);
//       console.log('Optimistic update - newBookmarks:', newBookmarks); // Debug log
//       return newBookmarks;
//     });

//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         console.log('No token found for remove bookmark');
//         toast.error('Please log in to remove bookmarks');
//         setBookmarks(prevBookmarks);
//         return;
//       }

//       console.log('Sending POST request to:', `${URL}/bookmark/${bookmarkId}`); // Debug log
//       const response = await axios.post(
//         `${URL}/bookmark/${bookmarkId}`,
//         {}, // Empty body as backend doesn't expect data
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log('POST response:', response.data); // Debug log
//       if (response.data.message === 'Bookmark removed') {
//         toast.success('Bookmark removed');
//       } else {
//         throw new Error('Unexpected response: Bookmark not removed');
//       }
//     } catch (err) {
//       console.error('Error removing bookmark:', {
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//       });
//       toast.error('Failed to remove bookmark');
//       setBookmarks(prevBookmarks);
//       if (err.response?.status === 401) {
//         console.log('401 error, refreshing user data');
//         await refreshUserData();
//         if (!isAuthenticated) {
//           navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
//         }
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-surface flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-surface">
//       <GlobalHeader />
//       <div className="pt-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h1 className="text-3xl font-heading font-bold text-text-primary">My Bookmarks</h1>
//                 <p className="text-text-secondary mt-2">View and manage your bookmarked news</p>
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 mb-6">
//               <input
//                 type="text"
//                 placeholder="Search bookmarks..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
//               />
//               <select
//                 value={filters.category}
//                 onChange={(e) => handleFilterChange('category', e.target.value)}
//                 className="px-8 py-3 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
//               >
//                 {categories.map((category) => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//               <select
//                 value={filters.dateRange}
//                 onChange={(e) => handleFilterChange('dateRange', e.target.value)}
//                 className="px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
//               >
//                 <option value="all">All Time</option>
//                 <option value="today">Today</option>
//                 <option value="week">Last Week</option>
//                 <option value="month">Last Month</option>
//                 <option value="year">Last Year</option>
//               </select>
//               {(searchQuery || filters.language !== 'all' || filters.category !== 'All Categories' || filters.dateRange !== 'all') && (
//                 <Button variant="ghost" onClick={handleClearFilters}>
//                   Clear Filters
//                 </Button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredBookmarks.map((bookmark) => (
//               <BookmarkCard
//                 key={bookmark._id}
//                 bookmark={bookmark}
//                 onRemove={handleRemoveBookmark}
//                 showSelection={false}
//                 folders={[]}
//               />
//             ))}
//           </div>
//           {filteredBookmarks.length === 0 && (
//             <div className="text-center py-12">
//               <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Icon name="Bookmark" size={24} className="text-text-secondary" />
//               </div>
//               <h3 className="text-lg font-semibold text-text-primary mb-2">No bookmarks found</h3>
//               <p className="text-text-secondary mb-6">Start bookmarking articles to see them here</p>
//               {(searchQuery || filters.language !== 'all' || filters.category !== 'All Categories' || filters.dateRange !== 'all') && (
//                 <Button variant="primary" onClick={handleClearFilters}>
//                   Clear Filters
//                 </Button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookmarksReading;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import GlobalHeader from '../../components/ui/GlobalHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookmarkCard from './components/BookmarkCard';
import axios from 'axios';

const URL = import.meta.env.VITE_API_BASE_URL;

const BookmarksReading = () => {
  const { user, isAuthenticated, refreshUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [bookmarks, setBookmarks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    language: 'all',
    category: 'All Categories',
    dateRange: 'all',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');

      if (!token || !isAuthenticated) {
        toast.error('Please log in to access your collections.');
        // navigate(`/user-authentication-login-register?redirect=${encodeURIComponent(location.pathname)}`);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const [bookmarksRes, categoriesRes] = await Promise.all([
          axios.get(`${URL}/bookmark`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${URL}/category/get`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const bookmarksData = (bookmarksRes.data.news || []).map(bookmark => ({
          ...bookmark,
          image: bookmark.media?.[0] || '/default-news.jpg',
        }));
        const categoriesData = ['All Categories', ...(categoriesRes.data.categories?.map(c => c.name) || [])];

        setBookmarks(bookmarksData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching data:', err.response?.data?.error || err.message);
        toast.error('Failed to load data. Please try again.');
        if (err.response?.status === 401) {
          await refreshUserData();
          if (!isAuthenticated) {
            navigate(`/user-authentication-login-register?redirect=${encodeURIComponent(location.pathname)}`);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, isAuthenticated, refreshUserData, navigate, location.pathname]);

  const applyDateRangeFilter = (items) => {
    const now = new Date();
    return items.filter((item) => {
      const itemDate = new Date(item.savedDate || item.createdAt);
      switch (filters.dateRange) {
        case 'today':
          return itemDate.toDateString() === now.toDateString();
        case 'week':
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(now.getDate() - 7);
          return itemDate >= oneWeekAgo;
        case 'month':
          const oneMonthAgo = new Date(now);
          oneMonthAgo.setMonth(now.getMonth() - 1);
          return itemDate >= oneMonthAgo;
        case 'year':
          const oneYearAgo = new Date(now);
          oneYearAgo.setFullYear(now.getFullYear() - 1);
          return itemDate >= oneYearAgo;
        default:
          return true;
      }
    });
  };

  const filteredBookmarks = applyDateRangeFilter(bookmarks).filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bookmark.reporter?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = filters.language === 'all' || bookmark.language === filters.language;
    const matchesCategory = filters.category === 'All Categories' || bookmark.category === filters.category;
    return matchesSearch && matchesLanguage && matchesCategory;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      language: 'all',
      category: 'All Categories',
      dateRange: 'all',
    });
    setSearchQuery('');
  };

  const handleRemoveBookmark = async (bookmarkId) => {
    const prevBookmarks = [...bookmarks];
    setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `${URL}/bookmark/${bookmarkId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.message === 'Bookmark removed') {
        toast.success('Bookmark removed');
      } else {
        throw new Error('Unexpected response: Bookmark not removed');
      }
    } catch (err) {
      console.error('Error removing bookmark:', err.response?.data || err.message);
      toast.error('Failed to remove bookmark');
      setBookmarks(prevBookmarks);
      if (err.response?.status === 401) {
        await refreshUserData();
        navigate(`/user-authentication-login-register?redirect=${encodeURIComponent(location.pathname)}`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <GlobalHeader />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary">My Bookmarks</h1>
                <p className="text-text-secondary mt-2">View and manage your bookmarked news</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-8 py-3 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
              {(searchQuery || filters.language !== 'all' || filters.category !== 'All Categories' || filters.dateRange !== 'all') && (
                <Button variant="ghost" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                onRemove={handleRemoveBookmark}
                showSelection={false}
                folders={[]}
              />
            ))}
          </div>
          {filteredBookmarks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Bookmark" size={24} className="text-text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No bookmarks found</h3>
              <p className="text-text-secondary mb-6">Start bookmarking articles to see them here</p>
              {(searchQuery || filters.language !== 'all' || filters.category !== 'All Categories' || filters.dateRange !== 'all') && (
                <Button variant="primary" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksReading;