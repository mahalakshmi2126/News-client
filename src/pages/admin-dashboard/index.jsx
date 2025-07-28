import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from './components/DashboardLayout';
import LoginModal from './components/LoginModal';
import NewsManagement from './components/NewsManagement';
import ReporterManagement from './components/ReporterManagement';
import LocationManagement from './components/LocationManagement';
import Analytics from './components/Analytics';
import ReporterRequests from './components/ReporterRequests';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5000';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('news');
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const [reporters, setReporters] = useState([]);
  const [reporterRequests, setReporterRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = localStorage.getItem('authToken');
  //     console.log('Token from localStorage:', token);
  //     if (token) {
  //       try {
  //         const res = await axios.get(`${API_BASE_URL}/api/auth/me`, {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         console.log('User data from /me:', res.data);
  //         if (res.data.role === 'admin' && res.data.isApproved) {
  //           setIsLoggedIn(true);
  //           setShowLoginModal(false);
  //           setAdminData(res.data);
  //         } else {
  //           localStorage.removeItem('authToken');
  //           setIsLoggedIn(false);
  //           setShowLoginModal(true);
  //           toast.error('Access denied. Only approved admins can log in.');
  //         }
  //       } catch (err) {
  //         console.error('Error in /me endpoint:', err);
  //         localStorage.removeItem('authToken');
  //         setIsLoggedIn(false);
  //         setShowLoginModal(true);
  //       }
  //     } else {
  //       setIsLoggedIn(false);
  //       setShowLoginModal(true);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      console.log('Fetching data, token:', token);
      if (!token || !isLoggedIn) return;

      setIsLoading(true);
      try {
        const [newsRes, reportersRes, requestsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/news/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/api/news/reporters`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/api/news/pending-requests`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        console.log('✅ News Response:', newsRes.data);

        setNewsArticles(newsRes.data.articles || []);
        setReporters(reportersRes.data);
        setReporterRequests(requestsRes.data);
      } catch (err) {
        console.error('Fetch data error:', err);
        if (err.response?.status === 401) {
          toast.error('Session expired. Please log in again.');
          handleLogout();
        } else {
          toast.error('Failed to load data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const handleLogin = async (credentials) => {
    try {
      console.log('Attempting login with:', credentials);
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: credentials.email,
        password: credentials.password,
      });

      const { token, user } = res.data;
      console.log('Login response:', { token, user });

      if (!user || user.role !== 'admin' || !user.isApproved) {
        toast.error('Access denied. Only approved admins can log in to this dashboard.');
        return;
      }

      setIsLoggedIn(true);
      setAdminData(user);
      setShowLoginModal(false);

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', user.role);
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLoginModal(true);
    setAdminData(null);
    setActiveTab('news');
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
  };

  const updateNewsStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('authToken');
      const { data } = await axios.patch(
        `${API_BASE_URL}/api/news/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewsArticles((prev) =>
        prev.map((article) =>
          article._id === id ? { ...article, status: data.news.status } : article
        )
      );
      if (status === 'approved') toast.success('News approved successfully');
      else if (status === 'rejected') toast.error('News rejected');
      else toast.info('Status updated');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update status');
    }
  };

  const deleteNews = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${API_BASE_URL}/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewsArticles((prev) => prev.filter((article) => article._id !== id));
      toast.success('News deleted successfully');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete article');
    }
  };

  const acceptReporterRequest = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.patch(
        `${API_BASE_URL}/api/news/approve/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newReporter = res.data?.user;
      if (newReporter) setReporters((prev) => [...prev, newReporter]);
      setReporterRequests((prev) => prev.filter((req) => req._id !== id));
      toast.success('Reporter request accepted!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to accept request');
    }
  };

  const rejectReporterRequest = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(
        `${API_BASE_URL}/api/news/reject/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReporterRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: 'rejected' } : req))
      );
      toast.success('Reporter request rejected!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to reject request');
    }
  };

  const deleteReporter = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${API_BASE_URL}/api/news/reporter/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReporters((prev) => prev.filter((reporter) => reporter._id !== id));
      toast.success('Reporter deleted successfully!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete reporter');
    }
  };

  const handleViewClick = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/api/news/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched article", response.data);
      return response.data.article;
    } catch (err) {
      console.error('View failed', err);
      return null;
    }
  };

  console.log('isLoggedIn:', isLoggedIn, 'showLoginModal:', showLoginModal);
  if (!isLoggedIn) {
    return (
      <LoginModal
        isOpen={showLoginModal}
        onLogin={handleLogin}
        title="Admin Login"
        subtitle="Access the admin dashboard"
      />
    );
  }

  return (
    <DashboardLayout
      role="admin"
      userData={adminData}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6">
          {activeTab === 'news' && (
            <NewsManagement
              articles={newsArticles}
              handleViewClick={handleViewClick}
              onUpdateStatus={updateNewsStatus}
              onDelete={deleteNews}
            />
          )}
          {activeTab === 'requests' && (
            <ReporterRequests
              requests={reporterRequests}
              onAcceptRequest={acceptReporterRequest}
              onRejectRequest={rejectReporterRequest}
            />
          )}
          {activeTab === 'reporters' && (
            <ReporterManagement
              reporters={reporters}
              onDelete={deleteReporter}
            />
          )}
          {activeTab === 'locations' && <LocationManagement />}
          {activeTab === 'analytics' && <Analytics />}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;