// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import DashboardLayout  from '../admin-dashboard/components/DashboardLayout';
// import LoginModal from '../admin-dashboard/components/LoginModal';
// import OnboardingForm from './components/OnboardingForm';
// import PostNewsForm from './components/PostNewsForm';
// import MyArticles from './components/MyArticles';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { uploadToCloudinary } from './components/utils/uploadToCloudinary';

// const ReporterDashboard = ({ initialTab = 'onboarding' }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [activeTab, setActiveTab] = useState(initialTab);
//   const [showLoginModal, setShowLoginModal] = useState(true);
//   const [reporterData, setReporterData] = useState(null);
//   const [isOnboarded, setIsOnboarded] = useState(false);
//   const [myArticles, setMyArticles] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const userData = localStorage.getItem('generalUser');
//     if (token && userData) {
//       try {
//         const user = JSON.parse(userData);
//         setIsLoggedIn(true);
//         setShowLoginModal(false);
//         setReporterData(user);
//         setIsOnboarded(user.reporterFormSubmitted && user.name && user.location);
//         if (user.role === 'user' && user.reporterFormSubmitted) {
//           toast.info('Your reporter application is pending admin approval.');
//           navigate('/personalized-news-dashboard');
//           return;
//         }
//         if (user.role === 'reporter' && !user.isApproved) {
//           toast.warning('Your application is awaiting approval. You cannot post news yet.');
//           setActiveTab('onboarding');
//         } else {
//           setActiveTab(user.isApproved ? initialTab : 'onboarding');
//         }
//       } catch (err) {
//         console.error('Invalid user data:', err);
//         localStorage.removeItem('generalUser');
//         localStorage.removeItem('authToken');
//         setShowLoginModal(true);
//       }
//     } else {
//       setShowLoginModal(true);
//     }
//   }, [initialTab, navigate]);

//   useEffect(() => {
//     if (!isLoggedIn) return;

//     const fetchMyNews = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/news/my-news', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
//         });
//         setMyArticles(res.data?.news || []);
//       } catch (err) {
//         console.error('Failed to load articles:', err.response?.data || err.message);
//         toast.error('Failed to load your articles.');
//       }
//     };

//     fetchMyNews();
//   }, [isLoggedIn]);

//   const handleLogin = async (credentials) => {
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.message || 'Login failed.');
//         return;
//       }

//       if (data.user.role !== 'reporter' || !data.user.isApproved) {
//         toast.error('Only approved reporters can access this dashboard.');
//         return;
//       }

//       const userObj = {
//         id: data.user._id,
//         _id: data.user._id,
//         name: data.user.name || 'User',
//         email: data.user.email || '',
//         role: data.user.role || 'reporter',
//         isApproved: data.user.isApproved || false,
//         reporterFormSubmitted: data.user.reporterFormSubmitted || false,
//         location: data.user.location || '',
//         bio: data.user.bio || '',
//         phone: data.user.phone || '',
//       };

//       setIsLoggedIn(true);
//       setShowLoginModal(false);
//       setReporterData(userObj);
//       localStorage.setItem('generalUser', JSON.stringify(userObj));
//       localStorage.setItem('authToken', data.token);

//       setIsOnboarded(userObj.reporterFormSubmitted && userObj.name && userObj.location);
//       setActiveTab(userObj.isApproved ? initialTab : 'onboarding');
//     } catch (err) {
//       console.error('Login error:', err);
//       toast.error('Server error. Please try again later.');
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowLoginModal(true);
//     setReporterData(null);
//     setIsOnboarded(false);
//     setActiveTab('onboarding');
//     localStorage.removeItem('generalUser');
//     localStorage.removeItem('authToken');
//     navigate('/user-authentication-login-register');
//   };

//   const handleTabChange = (tab) => {
//     if (!reporterData?.isApproved && tab !== 'onboarding') {
//       toast.warning('Your application is pending approval. Please wait.');
//       return;
//     }
//     setActiveTab(tab);
//     navigate('/reporter-dashboard', { state: { tab } });
//   };

//   const handleOnboardingComplete = (updatedUser) => {
//     setReporterData(updatedUser);
//     setIsOnboarded(true);
//     localStorage.setItem('generalUser', JSON.stringify(updatedUser));
//     toast.success('Request submitted! Awaiting admin approval.');
//     navigate('/personalized-news-dashboard');
//   };

//   const handlePostNews = async (newsData) => {
//     const token = localStorage.getItem('authToken');
//     let mediaUrl = '';

//     if (!newsData.media || newsData.media.length === 0) {
//       toast.error('At least one media file or URL is required.');
//       return { success: false, message: 'At least one media file or URL is required.' };
//     }

//     const mediaItem = newsData.media[0];
//     if (mediaItem?.file) {
//       const type = mediaItem.file.type;
//       if (type.startsWith('image/') || type.startsWith('video/')) {
//         try {
//           mediaUrl = await uploadToCloudinary(mediaItem.file);
//         } catch (err) {
//           toast.error('Failed to upload media to Cloudinary.');
//           return { success: false, message: 'Cloudinary upload failed.' };
//         }
//       } else {
//         toast.error('Only image or video files are allowed.');
//         return { success: false, message: 'Only image or video is allowed.' };
//       }
//     } else if (mediaItem?.url) {
//       mediaUrl = mediaItem.url;
//     } else {
//       toast.error('Invalid media format.');
//       return { success: false, message: 'Invalid media format.' };
//     }

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/news/create',
//         {
//           title: newsData.title,
//           content: newsData.content,
//           category: newsData.category,
//           tags: newsData.tags || [],
//           state: newsData.state,
//           district: newsData.district,
//           mediaUrls: [mediaUrl],
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setMyArticles((prev) => [res.data.news, ...prev]);
//       setActiveTab('my-articles');
//       navigate('/reporter-dashboard', { state: { tab: 'my-articles' } });

//       return { success: true, news: res.data.news };
//     } catch (err) {
//       console.error('Error posting news:', err.response?.data || err.message);
//       toast.error(err.response?.data?.message || 'Failed to post news article.');
//       return {
//         success: false,
//         message: err.response?.data?.message || 'Failed to post news article.',
//       };
//     }
//   };

//   const handleDeleteArticle = (id) => {
//     setMyArticles((prev) => prev.filter((article) => article._id !== id));
//   };

//   if (!isLoggedIn || !reporterData) {
//     return (
//       <LoginModal
//         isOpen={showLoginModal}
//         onLogin={handleLogin}
//         title="Reporter Login"
//         subtitle="Access your reporter dashboard"
//       />
//     );
//   }

//   if (reporterData.role === 'user') {
//     return (
//       <div className="p-6">
//         <OnboardingForm
//           onComplete={handleOnboardingComplete}
//           isCompleted={isOnboarded}
//           existingData={reporterData}
//         />
//       </div>
//     );
//   }

//   return (
//     <DashboardLayout
//       role="reporter"
//       userData={reporterData}
//       activeTab={activeTab}
//       onTabChange={handleTabChange}
//       onLogout={handleLogout}
//     >
//       <div className="p-6">
//         {!reporterData.isApproved && (
//           <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-3 mb-6 rounded">
//             ⚠️ Your application is under review. News posting is disabled until admin approval.
//           </div>
//         )}
//         {activeTab === 'onboarding' && (
//           <OnboardingForm
//             onComplete={handleOnboardingComplete}
//             isCompleted={isOnboarded}
//             existingData={reporterData}
//           />
//         )}
//         {activeTab === 'post-news' && reporterData?.isApproved ? (
//           <PostNewsForm onSubmit={handlePostNews} reporterData={reporterData} />
//         ) : activeTab === 'post-news' ? (
//           <div className="text-center text-red-600 font-medium">
//             🚫 You cannot post news until your application is approved.
//           </div>
//         ) : null}
//         {activeTab === 'my-articles' && reporterData?.isApproved ? (
//           <MyArticles articles={myArticles} onDelete={handleDeleteArticle} />
//         ) : activeTab === 'my-articles' ? (
//           <div className="text-center text-red-600 font-medium">
//             🚫 You cannot view articles until your application is approved.
//           </div>
//         ) : null}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default ReporterDashboard;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../admin-dashboard/components/DashboardLayout';
import LoginModal from '../admin-dashboard/components/LoginModal';
import PostNewsForm from './components/PostNewsForm';
import MyArticles from './components/MyArticles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { uploadToCloudinary } from './components/utils/uploadToCloudinary';

const ReporterDashboard = ({ initialTab = 'post-news' }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [reporterData, setReporterData] = useState(null);
  const [myArticles, setMyArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('generalUser');
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        if (user.role !== 'reporter' || !user.isApproved) {
          toast.warning('Access denied. You must be an approved reporter.');
          navigate('/personalized-news-dashboard');
          return;
        }
        setIsLoggedIn(true);
        setShowLoginModal(false);
        setReporterData(user);
        setActiveTab(initialTab);
      } catch {
        localStorage.removeItem('generalUser');
        localStorage.removeItem('authToken');
        setShowLoginModal(true);
      }
    } else {
      setShowLoginModal(true);
    }
  }, [initialTab, navigate]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchMyNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/news/my-news', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setMyArticles(res.data?.news || []);
      } catch (err) {
        console.error('Failed to load articles:', err.response?.data || err.message);
        toast.error('Failed to load your articles.');
      }
    };

    fetchMyNews();
  }, [isLoggedIn]);

  const handleLogin = async (credentials) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Login failed.');
        return;
      }

      if (data.user.role !== 'reporter' || !data.user.isApproved) {
        toast.error('Only approved reporters can access this dashboard.');
        return;
      }

      const userObj = {
        id: data.user._id,
        _id: data.user._id,
        name: data.user.name || 'User',
        email: data.user.email || '',
        role: data.user.role || 'reporter',
        isApproved: data.user.isApproved || false,
        location: data.user.location || '',
        bio: data.user.bio || '',
        phone: data.user.phone || '',
        articlesCount: data.user.articlesCount || 0,
      };

      setIsLoggedIn(true);
      setShowLoginModal(false);
      setReporterData(userObj);
      localStorage.setItem('generalUser', JSON.stringify(userObj));
      localStorage.setItem('authToken', data.token);
      setActiveTab(initialTab);
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Server error. Please try again later.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLoginModal(true);
    setReporterData(null);
    setActiveTab('post-news');
    localStorage.removeItem('generalUser');
    localStorage.removeItem('authToken');
    navigate('/user-authentication-login-register');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate('/reporter-dashboard', { state: { tab } });
  };

  const handlePostNews = async (newsData) => {
    const token = localStorage.getItem('authToken');
    let mediaUrl = '';

    if (!newsData.media || newsData.media.length === 0) {
      toast.error('At least one media file or URL is required.');
      return { success: false, message: 'At least one media file or URL is required.' };
    }

    const mediaItem = newsData.media[0];
    if (mediaItem?.file) {
      const type = mediaItem.file.type;
      if (type.startsWith('image/') || type.startsWith('video/')) {
        try {
          mediaUrl = await uploadToCloudinary(mediaItem.file);
        } catch (err) {
          toast.error('Failed to upload media to Cloudinary.');
          return { success: false, message: 'Cloudinary upload failed.' };
        }
      } else {
        toast.error('Only image or video files are allowed.');
        return { success: false, message: 'Only image or video is allowed.' };
      }
    } else if (mediaItem?.url) {
      mediaUrl = mediaItem.url;
    } else {
      toast.error('Invalid media format.');
      return { success: false, message: 'Invalid media format.' };
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/news/create',
        {
          title: newsData.title,
          content: newsData.content,
          category: newsData.category,
          tags: newsData.tags || [],
          state: newsData.state,
          district: newsData.district,
          mediaUrls: [mediaUrl],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMyArticles((prev) => [res.data.news, ...prev]);
      setActiveTab('my-articles');
      navigate('/reporter-dashboard', { state: { tab: 'my-articles' } });

      return { success: true, news: res.data.news };
    } catch (err) {
      console.error('Error posting news:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to post news article.');
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to post news article.',
      };
    }
  };

  const handleDeleteArticle = (id) => {
    setMyArticles((prev) => prev.filter((article) => article._id !== id));
  };

  if (!isLoggedIn || !reporterData) {
    return (
      <LoginModal
        isOpen={showLoginModal}
        onLogin={handleLogin}
        title="Reporter Login"
        subtitle="Access your reporter dashboard"
      />
    );
  }

  return (
    <DashboardLayout
      role="reporter"
      userData={reporterData}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onLogout={handleLogout}
    >
      <div className="p-6">
        {activeTab === 'post-news' && (
          <PostNewsForm onSubmit={handlePostNews} reporterData={reporterData} />
        )}
        {activeTab === 'my-articles' && (
          <MyArticles articles={myArticles} onDelete={handleDeleteArticle} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ReporterDashboard;