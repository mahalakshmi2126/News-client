// import React, { useState, useEffect, useContext } from 'react';
// import { toast } from 'react-toastify';
// import { UserContext } from '../../context/UserContext';
// import GlobalHeader from '../../components/ui/GlobalHeader';
// import Icon from '../../components/AppIcon';
// import Button from '../../components/ui/Button';
// import BookmarkCard from './components/BookmarkCard';
// // import HistoryItem from './components/HistoryItem';
// // import FolderSidebar from './components/FolderSidebar';
// // import ReadingStats from './components/ReadingStats';
// // import SearchAndFilter from './components/SearchAndFilter';
// import axios from 'axios';

// const BookmarksReading = () => {
//   const { user } = useContext(UserContext);
//   const [activeTab, setActiveTab] = useState('bookmarks');
//   const [selectedFolder, setSelectedFolder] = useState('all');
//   const [selectedBookmarks, setSelectedBookmarks] = useState([]);
//   const [showSelection, setShowSelection] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showStats, setShowStats] = useState(false);
//   const [filters, setFilters] = useState({
//     language: 'all',
//     category: 'All Categories',
//     dateRange: 'all',
//     completion: 'all',
//   });
//   const [bookmarks, setBookmarks] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [folders, setFolders] = useState([]);
//   const [readingStats, setReadingStats] = useState({
//     totalArticles: 0,
//     totalReadingTime: 0,
//     bookmarksCount: 0,
//     averageCompletion: 0,
//     currentStreak: 0,
//     topLanguages: [],
//     topSources: [],
//   });
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem('authToken');
//       //   if (!token || !user) {
//       //     toast.error('Please log in to access your collections.');
//       //     return;
//       //   }

//       try {
//         const [bookmarksRes, historyRes, categoriesRes, foldersRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/bookmark', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),

//           axios.get('http://localhost:5000/api/history', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get('http://localhost:5000/api/category/get', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get('http://localhost:5000/api/folder', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         const bookmarksData = bookmarksRes.data.news || [];
//         const historyData = historyRes.data.history || [];
//         const categoriesData = ['All Categories', ...(categoriesRes.data.categories?.map(c => c.name) || [])];
//         const foldersData = foldersRes.data.folders || [];
//         console.log('bookmarksData', bookmarksData);

//         console.log('Media check:');
//         [0, 3].forEach(i => { 
//           const media = bookmarksData[i]?.media?.[0];
//           if (typeof media === 'string') {
//             if (/\.(mp4|webm|ogg)$/i.test(media)) {
//               console.log(`📺 bookmarksData[${i}] is a VIDEO:`, media);
//             } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(media)) {
//               console.log(`🖼️ bookmarksData[${i}] is an IMAGE:`, media);
//             } else {
//               console.log(`❓ bookmarksData[${i}] has UNKNOWN media type:`, media);
//             }
//           } else {
//             console.log(`❌ bookmarksData[${i}] has invalid media format:`, bookmarksData[i]?.media);
//           }
//         });




//         setBookmarks(bookmarksData);
//         setHistory(historyData);
//         setCategories(categoriesData);
//         setFolders(foldersData);

//         // Compute reading stats
//         const totalArticles = historyData.length;
//         const totalReadingTime = historyData.reduce((sum, item) => sum + (item.timeSpent || 0), 0);
//         const bookmarksCount = bookmarksData.length;
//         const averageCompletion =
//           historyData.length > 0
//             ? Math.round(historyData.reduce((sum, item) => sum + (item.readingProgress || 0), 0) / historyData.length)
//             : 0;

//         // Compute current streak
//         const sortedDates = [...new Set(historyData.map(item => new Date(item.readDate).toDateString()))].sort(
//           (a, b) => new Date(b) - new Date(a)
//         );
//         let streak = 0;
//         const today = new Date().toDateString();
//         if (sortedDates[0] === today) streak++;
//         for (let i = 1; i < sortedDates.length; i++) {
//           const prevDate = new Date(sortedDates[i - 1]);
//           const currDate = new Date(sortedDates[i]);
//           prevDate.setDate(prevDate.getDate() - 1);
//           if (prevDate.toDateString() === currDate.toDateString()) streak++;
//           else break;
//         }

//         // Top languages
//         const languageCounts = historyData.reduce((acc, item) => {
//           const lang = item.language || 'en';
//           acc[lang] = (acc[lang] || 0) + 1;
//           return acc;
//         }, {});
//         const topLanguages = Object.entries(languageCounts)
//           .map(([code, count]) => ({
//             code,
//             name: code.toUpperCase(),
//             percentage: Math.round((count / totalArticles) * 100) || 0,
//           }))
//           .sort((a, b) => b.percentage - a.percentage)
//           .slice(0, 3);

//         // Top sources
//         const sourceCounts = historyData.reduce((acc, item) => {
//           const source = item.source || 'Unknown';
//           acc[source] = (acc[source] || 0) + 1;
//           return acc;
//         }, {});
//         const topSources = Object.entries(sourceCounts)
//           .map(([name, count]) => ({ name, count }))
//           .sort((a, b) => b.count - a.count)
//           .slice(0, 3);

//         setReadingStats({
//           totalArticles,
//           totalReadingTime,
//           bookmarksCount,
//           averageCompletion,
//           currentStreak: streak,
//           topLanguages,
//           topSources,
//         });
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         toast.error('Failed to load data. Please try again.');
//       }
//     };

//     fetchData();
//   }, [user]);

//   const applyDateRangeFilter = (items, dateRange) => {
//     const now = new Date();
//     return items.filter((item) => {
//       const itemDate = new Date(item.savedDate || item.readDate || item.createdAt);
//       switch (dateRange) {
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

//   const filteredBookmarks = applyDateRangeFilter(bookmarks, filters.dateRange).filter((bookmark) => {
//     const matchesSearch =
//       bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (bookmark.reporter?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesLanguage = filters.language === 'all' || bookmark.language === filters.language;
//     const matchesCategory = filters.category === 'All Categories' || bookmark.category === filters.category;
//     const matchesFolder = selectedFolder === 'all' || bookmark.folder === selectedFolder;
//     return matchesSearch && matchesLanguage && matchesCategory && matchesFolder;
//   });

//   const filteredHistory = applyDateRangeFilter(history, filters.dateRange).filter((item) => {
//     const matchesSearch =
//       item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (item.reporter?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesLanguage = filters.language === 'all' || item.language === filters.language;
//     const matchesCategory = filters.category === 'All Categories' || item.category === filters.category;
//     let matchesCompletion = true;
//     if (filters.completion === 'completed') {
//       matchesCompletion = (item.readingProgress || 0) >= 90;
//     } else if (filters.completion === 'partial') {
//       matchesCompletion = (item.readingProgress || 0) >= 50 && (item.readingProgress || 0) < 90;
//     } else if (filters.completion === 'started') {
//       matchesCompletion = (item.readingProgress || 0) < 50;
//     }
//     return matchesSearch && matchesLanguage && matchesCategory && matchesCompletion;
//   });

//   const handleBookmarkSelect = (bookmarkId) => {
//     setSelectedBookmarks((prev) =>
//       prev.includes(bookmarkId) ? prev.filter((id) => id !== bookmarkId) : [...prev, bookmarkId]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedBookmarks.length === filteredBookmarks.length) {
//       setSelectedBookmarks([]);
//     } else {
//       setSelectedBookmarks(filteredBookmarks.map((b) => b._id));
//     }
//   };

//   const handleBulkDelete = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       await Promise.all(
//         selectedBookmarks.map((id) =>
//           axios.delete(`http://localhost:5000/api/bookmark/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         )
//       );
//       setBookmarks((prev) => prev.filter((b) => !selectedBookmarks.includes(b._id)));
//       setSelectedBookmarks([]);
//       setShowSelection(false);
//       toast.success('Selected bookmarks deleted.');
//     } catch (err) {
//       console.error('Error deleting bookmarks:', err);
//       toast.error('Failed to delete bookmarks.');
//     }
//   };

//   const handleRemoveBookmark = async (bookmarkId) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       await axios.delete(`http://localhost:5000/api/bookmark/${bookmarkId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
//       toast.success('Bookmark removed.');
//     } catch (err) {
//       console.error('Error removing bookmark:', err);
//       toast.error('Failed to remove bookmark.');
//     }
//   };

//   const handleMoveToFolder = async (bookmarkId, folderId) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       await axios.patch(
//         `http://localhost:5000/api/bookmark/${bookmarkId}/folder`,
//         { folderId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setBookmarks((prev) =>
//         prev.map((b) => (b._id === bookmarkId ? { ...b, folder: folderId } : b))
//       );
//       toast.success('Bookmark moved to folder.');
//     } catch (err) {
//       console.error('Error moving to folder:', err);
//       toast.error('Failed to move bookmark.');
//     }
//   };

//   const handleRemoveHistoryItem = async (itemId) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       await axios.delete(`http://localhost:5000/api/history/${itemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setHistory((prev) => prev.filter((h) => h._id !== itemId));
//       toast.success('History item removed.');
//     } catch (err) {
//       console.error('Error removing history item:', err);
//       toast.error('Failed to remove history item.');
//     }
//   };

//   const handleCreateFolder = async (name) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const folderId = name.toLowerCase().replace(/\s+/g, '-');
//       const res = await axios.post(
//         'http://localhost:5000/api/folder',
//         { name, id: folderId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setFolders((prev) => [...prev, res.data.folder]);
//       toast.success('Folder created.');
//     } catch (err) {
//       console.error('Error creating folder:', err);
//       toast.error('Failed to create folder.');
//     }
//   };

//   const handleDeleteFolder = async (folderId) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       await axios.delete(`http://localhost:5000/api/folder/${folderId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFolders((prev) => prev.filter((f) => f.id !== folderId));
//       setBookmarks((prev) => prev.map((b) => (b.folder === folderId ? { ...b, folder: null } : b)));
//       if (selectedFolder === folderId) setSelectedFolder('all');
//       toast.success('Folder deleted.');
//     } catch (err) {
//       console.error('Error deleting folder:', err);
//       toast.error('Failed to delete folder.');
//     }
//   };

//   const handleRenameFolder = async (folderId, newName) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       await axios.patch(
//         `http://localhost:5000/api/folder/${folderId}`,
//         { name: newName },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setFolders((prev) =>
//         prev.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
//       );
//       toast.success('Folder renamed.');
//     } catch (err) {
//       console.error('Error renaming folder:', err);
//       toast.error('Failed to rename folder.');
//     }
//   };

//   const handleFilterChange = (filterType, value) => {
//     setFilters((prev) => ({ ...prev, [filterType]: value }));
//   };

//   const handleClearFilters = () => {
//     setFilters({
//       language: 'all',
//       category: 'All Categories',
//       dateRange: 'all',
//       completion: 'all',
//     });
//     setSearchQuery('');
//   };

//   return (
//     <div className="min-h-screen bg-surface">
//       <GlobalHeader />
//       <div className="pt-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h1 className="text-3xl font-heading font-bold text-text-primary">My Library</h1>
//                 <p className="text-text-secondary mt-2">Manage your bookmarks and track your reading history</p>
//               </div>
//               {/* <div className="flex items-center space-x-3">
//                 <Button
//                   variant={showStats ? 'primary' : 'ghost'}
//                   onClick={() => setShowStats(!showStats)}
//                   className="hidden lg:flex items-center space-x-2"
//                 >
//                   <Icon name="BarChart3" size={18} />
//                   <span>Stats</span>
//                 </Button>
//                 {activeTab === 'bookmarks' && (
//                   <Button
//                     variant={showSelection ? 'primary' : 'ghost'}
//                     onClick={() => {
//                       setShowSelection(!showSelection);
//                       setSelectedBookmarks([]);
//                     }}
//                     className="flex items-center space-x-2"
//                   >
//                     <Icon name="CheckSquare" size={18} />
//                     <span className="hidden sm:inline">Select</span>
//                   </Button>
//                 )}
//               </div> */}
//             </div>
//             <div className="flex space-x-1 bg-surface border border-border rounded-lg p-1">
//               <button
//                 onClick={() => setActiveTab('bookmarks')}
//                 className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${activeTab === 'bookmarks' ? 'bg-background text-accent shadow-sm' : 'text-text-secondary hover:text-text-primary'
//                   }`}
//               >
//                 <Icon name="Bookmark" size={16} />
//                 <span>Bookmarks</span>
//                 <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">{filteredBookmarks.length}</span>
//               </button>
//               {/* <button
//                 onClick={() => setActiveTab('history')}
//                 className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${activeTab === 'history' ? 'bg-background text-accent shadow-sm' : 'text-text-secondary hover:text-text-primary'
//                   }`}
//               >
//                 <Icon name="History" size={16} />
//                 <span>History</span>
//                 <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">{filteredHistory.length}</span>
//               </button> */}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//             {activeTab === 'bookmarks' && (
//               <div className="hidden lg:block lg:col-span-3">
//                 {/* <FolderSidebar
//                   folders={folders}
//                   selectedFolder={selectedFolder}
//                   onFolderSelect={setSelectedFolder}
//                   onCreateFolder={handleCreateFolder}
//                   onDeleteFolder={handleDeleteFolder}
//                   onRenameFolder={handleRenameFolder}
//                 /> */}
//               </div>
//             )}
//             <div className={`${activeTab === 'bookmarks' ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
//               <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
//                 <div className={`${showStats ? 'xl:col-span-3' : 'xl:col-span-4'}`}>
//                   {/* <SearchAndFilter
//                     searchQuery={searchQuery}
//                     onSearchChange={setSearchQuery}
//                     filters={filters}
//                     onFilterChange={handleFilterChange}
//                     onClearFilters={handleClearFilters}
//                     activeTab={activeTab}
//                     categories={categories}
//                   /> */}
//                   {/* {showSelection && selectedBookmarks.length > 0 && (
//                     <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium text-accent">{selectedBookmarks.length} bookmark(s) selected</span>
//                         <div className="flex space-x-2">
//                           <Button variant="ghost" onClick={handleSelectAll} className="text-sm">
//                             {selectedBookmarks.length === filteredBookmarks.length ? 'Deselect All' : 'Select All'}
//                           </Button>
//                           <Button variant="danger" onClick={handleBulkDelete} className="text-sm">
//                             Delete Selected
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   )} */}
//                   {activeTab === 'bookmarks' ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                       {filteredBookmarks.map((bookmark) => (
//                         <BookmarkCard
//                           key={bookmark._id}
//                           bookmark={bookmark}
//                           isSelected={selectedBookmarks.includes(bookmark._id)}
//                           onSelect={handleBookmarkSelect}
//                           onRemove={handleRemoveBookmark}
//                           onMoveToFolder={handleMoveToFolder}
//                           showSelection={showSelection}
//                           folders={folders}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {filteredHistory.map((item) => (
//                         <HistoryItem key={item._id} item={item} onRemove={handleRemoveHistoryItem} />
//                       ))}
//                     </div>
//                   )}
//                   {((activeTab === 'bookmarks' && filteredBookmarks.length === 0) || (activeTab === 'history' && filteredHistory.length === 0)) && (
//                     <div className="text-center py-12">
//                       <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Icon name={activeTab === 'bookmarks' ? 'Bookmark' : 'History'} size={24} className="text-text-secondary" />
//                       </div>
//                       <h3 className="text-lg font-semibold text-text-primary mb-2">
//                         {activeTab === 'bookmarks' ? 'No bookmarks found' : 'No reading history found'}
//                       </h3>
//                       <p className="text-text-secondary mb-6">
//                         {activeTab === 'bookmarks'
//                           ? 'Start bookmarking articles to see them here'
//                           : 'Your reading history will appear here as you read articles'}
//                       </p>
//                       {(searchQuery || filters.language !== 'all' || filters.category !== 'All Categories' || filters.dateRange !== 'all') && (
//                         <Button variant="primary" onClick={handleClearFilters}>
//                           Clear Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//                 {showStats && (
//                   <div className="xl:col-span-1">
//                     {/* <ReadingStats stats={readingStats} /> */}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
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
      console.log('BookmarksReading useEffect running:', { isAuthenticated, user });
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.log('No token found, redirecting to login');
        toast.error('Please log in to access your collections.');
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
        setIsLoading(false);
        return;
      }

      if (!isAuthenticated || !user) {
        console.log('Waiting for user authentication:', { isAuthenticated, user });
        return;
      }

      setIsLoading(true);
      try {
        console.log('Fetching data with token:', token);
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

        console.log('bookmarksData:', bookmarksData);
        console.log('Media check:');
        [0, 3].forEach(i => {
          const media = bookmarksData[i]?.image;
          if (typeof media === 'string') {
            if (/\.(mp4|webm|ogg)$/i.test(media)) {
              console.log(`📺 bookmarksData[${i}] is a VIDEO:`, media);
            } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(media)) {
              console.log(`🖼️ bookmarksData[${i}] is an IMAGE:`, media);
            } else {
              console.log(`❓ bookmarksData[${i}] has UNKNOWN media type:`, media);
            }
          } else {
            console.log(`❌ bookmarksData[${i}] has invalid media format:`, media);
          }
        });

        setBookmarks(bookmarksData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching data:', err.response?.data?.error || err.message);
        toast.error('Failed to load data. Please try again.');
        if (err.response?.status === 401) {
          console.log('401 error, refreshing user data');
          await refreshUserData();
          if (!isAuthenticated) {
            navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
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
    console.log('handleRemoveBookmark called with bookmarkId:', bookmarkId); // Debug log
    const prevBookmarks = [...bookmarks];
    setBookmarks((prev) => {
      const newBookmarks = prev.filter((b) => b._id !== bookmarkId);
      console.log('Optimistic update - newBookmarks:', newBookmarks); // Debug log
      return newBookmarks;
    });

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.log('No token found for remove bookmark');
        toast.error('Please log in to remove bookmarks');
        setBookmarks(prevBookmarks);
        return;
      }

      console.log('Sending POST request to:', `${URL}/bookmark/${bookmarkId}`); // Debug log
      const response = await axios.post(
        `${URL}/bookmark/${bookmarkId}`,
        {}, // Empty body as backend doesn't expect data
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('POST response:', response.data); // Debug log
      if (response.data.message === 'Bookmark removed') {
        toast.success('Bookmark removed');
      } else {
        throw new Error('Unexpected response: Bookmark not removed');
      }
    } catch (err) {
      console.error('Error removing bookmark:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      toast.error('Failed to remove bookmark');
      setBookmarks(prevBookmarks);
      if (err.response?.status === 401) {
        console.log('401 error, refreshing user data');
        await refreshUserData();
        if (!isAuthenticated) {
          navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
        }
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
