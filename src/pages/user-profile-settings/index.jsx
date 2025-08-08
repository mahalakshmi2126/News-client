// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../context/UserContext';
// import GlobalHeader from '../../components/ui/GlobalHeader';
// import ProfileHeader from './components/ProfileHeader';
// import SettingsSection from './components/SettingsSection';
// import Button from '../../components/ui/Button';
// import Icon from '../../components/AppIcon';
// import { uploadToCloudinary } from '../reporter-dashboard/components/utils/uploadToCloudinary';

// const URL = import.meta.env.VITE_API_BASE_URL;

// const UserProfileSettings = () => {
//   const { user, isAuthenticated, setUser, setIsAuthenticated, refreshUserData, signOut } = useContext(UserContext);
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isMobile, setIsMobile] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     const checkAuth = async () => {
//       setIsLoading(true);
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token || !isAuthenticated) {
//           setShowLoginModal(true);
//           setIsLoading(false);
//           return;
//         }
//         const cachedUser = localStorage.getItem('user');
//         if (cachedUser) {
//           setUser(JSON.parse(cachedUser)); // Set cached user data immediately
//         }
//         await refreshUserData(); // Fetch latest data
//         if (user && user.role !== 'user') {
//           toast.info('Redirecting to appropriate dashboard');
//           navigate(user.role === 'reporter' ? '/reporter-dashboard' : '/admin-dashboard');
//           return;
//         }
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error checking auth:', error.message);
//         toast.error(error.response?.data?.message || 'Failed to load profile');
//         setShowLoginModal(true);
//         setIsLoading(false);
//       }
//     };
//     checkAuth();
//   }, [navigate, isAuthenticated, refreshUserData]);

//   const handleLogin = async (credentials) => {
//     try {
//       const res = await fetch(`${URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.message || 'Login failed');
//         return;
//       }
//       if (data.user.role !== 'user') {
//         toast.error('Only users can access this dashboard');
//         return;
//       }
//       setUser(data.user); // Set initial user data
//       localStorage.setItem('user', JSON.stringify(data.user)); // Cache user data
//       localStorage.setItem('authToken', data.token);
//       localStorage.setItem('role', data.user.role);
//       setIsAuthenticated(true);
//       await refreshUserData(); // Fetch additional data
//       setShowLoginModal(false);
//       navigate('/user-profile-settings');
//     } catch (err) {
//       console.error('Login error:', err);
//       toast.error('Server error. Please try again later.');
//     }
//   };

//   const handleLogout = () => {
//     signOut();
//     navigate('/');
//     toast.success('Signed out successfully');
//   };

//   const handleUpdateProfile = async (updatedData, avatarItem) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       let avatarUrl = user.avatar || '/assets/images/avatar-placeholder.jpg';
//       if (avatarItem?.file) {
//         if (!avatarItem.file.type.startsWith('image/')) {
//           toast.error('Only images are allowed');
//           return;
//         }
//         avatarUrl = await uploadToCloudinary(avatarItem.file);
//       } else if (avatarItem?.url) {
//         avatarUrl = avatarItem.url;
//       }
//       const response = await axios.put(
//         `${URL}/auth/me`,
//         { ...updatedData, avatarUrl },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const updatedUser = {
//         ...user,
//         ...response.data,
//         initials: response.data.initials || (response.data.name ? response.data.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'),
//       };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       console.error('Error updating profile:', error.response?.status, error.response?.data);
//       toast.error(error.response?.data?.message || 'Failed to update profile');
//     }
//   };

//   const handleUpdateSettings = async (type, updatedSettings) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const updatedUserSettings = { ...user.settings, [type]: updatedSettings };
//       const response = await axios.put(
//         `${URL}/auth/me`,
//         { settings: updatedUserSettings },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const updatedUser = { ...user, settings: response.data.settings };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//       toast.success('Settings updated successfully');
//     } catch (error) {
//       console.error('Error updating settings:', error.response?.status, error.response?.data);
//       toast.error(error.response?.data?.message || 'Failed to update settings');
//     }
//   };

//   const tabs = [
//     { id: 'profile', name: 'Profile', icon: 'User' },
//   ];

//   const renderTabContent = () => {
//     if (isLoading) {
//       return <div className="text-center py-12">Loading...</div>;
//     }
//     if (!user || !user.name) {
//       return (
//         <div className="text-center py-12">
//           <p>Failed to load profile. Please log in.</p>
//           <Button variant="primary" onClick={() => setShowLoginModal(true)} className="mt-4">
//             Log In
//           </Button>
//         </div>
//       );
//     }
//     switch (activeTab) {
//       case 'profile':
//         return (
//           <div className="space-y-6">
//             <ProfileHeader user={user} onUpdateProfile={handleUpdateProfile} />
//             <div className="bg-background border border-border rounded-lg p-6">
//               <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Account Information</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between py-3 border-b border-border-light">
//                   <div>
//                     <div className="text-sm font-medium text-text-primary">Name</div>
//                     <div className="text-sm text-text-secondary">{user.name || 'Not set'}</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between py-3 border-b border-border-light">
//                   <div>
//                     <div className="text-sm font-medium text-text-primary">Email Address</div>
//                     <div className="text-sm text-text-secondary">{user.email || 'Not set'}</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between py-3 border-b border-border-light">
//                   <div>
//                     <div className="text-sm font-medium text-text-primary">Location</div>
//                     <div className="text-sm text-text-secondary">
//                       {user.location?.state || user.location?.district || user.location?.taluk
//                         ? `${user.location?.state || ''}, ${user.location?.district || ''}, ${user.location?.taluk || ''}`
//                         : 'No location provided'}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between py-3 border-b border-border-light">
//                   <div>
//                     <div className="text-sm font-medium text-text-primary">Bio</div>
//                     <div className="text-sm text-text-secondary">{user.bio || 'No bio provided'}</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between py-3">
//                   <div>
//                     <div className="text-sm font-medium text-text-primary">Account Status</div>
//                     <div className="text-sm text-success">{user.status || 'Active'}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-between">
//               <Button variant="primary" onClick={() => navigate('/')}>
//                 View News
//               </Button>
//               <Button variant="danger" onClick={handleLogout}>
//                 Log Out
//               </Button>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   if (isMobile) {
//     return (
//       <div className="min-h-screen bg-surface">
//         <GlobalHeader />
//         <div className="pt-16">
//           {isLoading ? (
//             <div className="text-center py-12">Loading...</div>
//           ) : !user || !user.name ? (
//             <div className="text-center py-12">
//               <p>Failed to load profile. Please log in.</p>
//               <Button variant="primary" onClick={() => setShowLoginModal(true)} className="mt-4">
//                 Log In
//               </Button>
//             </div>
//           ) : (
//             <>
//               {activeTab === 'profile' && (
//                 <div className="p-4">
//                   {renderTabContent()}
//                 </div>
//               )}
//             </>
//           )}
//           {showLoginModal && (
//             <LoginModal
//               isOpen={showLoginModal}
//               onLogin={handleLogin}
//               onClose={() => setShowLoginModal(false)}
//               title="User Login"
//               subtitle="Access your profile settings"
//             />
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-surface">
//       <GlobalHeader />
//       <div className="pt-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="flex flex-col lg:flex-row gap-8">
//             <div className="lg:w-64 flex-shrink-0">
//               <div className="bg-background border border-border rounded-lg p-4 sticky top-24">
//                 <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">Settings</h2>
//                 <nav className="space-y-1">
//                   {tabs.map((tab) => (
//                     <Button
//                       key={tab.id}
//                       variant={activeTab === tab.id ? 'primary' : 'ghost'}
//                       onClick={() => setActiveTab(tab.id)}
//                       className="w-full flex items-center justify-start space-x-3 p-3"
//                     >
//                       <Icon name={tab.icon} size={18} />
//                       <span className="text-sm font-medium">{tab.name}</span>
//                     </Button>
//                   ))}
//                 </nav>
//               </div>
//             </div>
//             <div className="flex-1">
//               <div className="bg-background border border-border rounded-lg p-6">{renderTabContent()}</div>
//             </div>
//           </div>
//           {showLoginModal && (
//             <LoginModal
//               isOpen={showLoginModal}
//               onLogin={handleLogin}
//               onClose={() => setShowLoginModal(false)}
//               title="User Login"
//               subtitle="Access your profile settings"
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfileSettings;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ProfileHeader from './components/ProfileHeader';
// import SettingsSection from './components/SettingsSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { uploadToCloudinary } from '../reporter-dashboard/components/utils/uploadToCloudinary';

const URL = import.meta.env.VITE_API_BASE_URL;

const UserProfileSettings = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated, refreshUserData, signOut } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token || !isAuthenticated) {
          setShowLoginModal(true);
          navigate(`/user-authentication-login-register?redirect=${encodeURIComponent('/user-profile-settings')}`);
          setIsLoading(false);
          return;
        }
        const cachedUser = localStorage.getItem('user');
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
        }
        await refreshUserData();
        if (user && user.role !== 'user') {
          toast.info('Redirecting to appropriate dashboard');
          navigate(user.role === 'reporter' ? '/reporter-dashboard' : '/admin-dashboard');
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking auth:', error.message);
        toast.error(error.response?.data?.message || 'Failed to load profile');
        setShowLoginModal(true);
        navigate(`/user-authentication-login-register?redirect=${encodeURIComponent('/user-profile-settings')}`);
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate, isAuthenticated, refreshUserData, user, setUser]);

  const handleLogin = async (credentials) => {
    try {
      const res = await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Login failed');
        return;
      }
      if (data.user.role !== 'user') {
        toast.error('Only users can access this dashboard');
        return;
      }
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('role', data.user.role);
      setIsAuthenticated(true);
      await refreshUserData();
      setShowLoginModal(false);
      navigate('/user-profile-settings');
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Server error. Please try again later.');
    }
  };

  const handleLogout = () => {
    signOut();
    navigate('/user-authentication-login-register');
    toast.success('Signed out successfully');
  };

  const handleUpdateProfile = async (updatedData, avatarItem) => {
    try {
      const token = localStorage.getItem('authToken');
      let avatarUrl = user.avatar || '/assets/images/avatar-placeholder.jpg';
      if (avatarItem?.file) {
        if (!avatarItem.file.type.startsWith('image/')) {
          toast.error('Only images are allowed');
          return;
        }
        avatarUrl = await uploadToCloudinary(avatarItem.file);
      } else if (avatarItem?.url) {
        avatarUrl = avatarItem.url;
      }
      const response = await axios.put(
        `${URL}/auth/me`,
        { ...updatedData, avatarUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedUser = {
        ...user,
        ...response.data,
        initials: response.data.initials || (response.data.name ? response.data.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'),
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.response?.status, error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleUpdateSettings = async (type, updatedSettings) => {
    try {
      const token = localStorage.getItem('authToken');
      const updatedUserSettings = { ...user.settings, [type]: updatedSettings };
      const response = await axios.put(
        `${URL}/auth/me`,
        { settings: updatedUserSettings },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedUser = { ...user, settings: response.data.settings };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error.response?.status, error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to update settings');
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'User' },
  ];

  const renderTabContent = () => {
    if (isLoading) {
      return <div className="text-center py-12">Loading...</div>;
    }
    if (!user || !user.name) {
      return (
        <div className="text-center py-12">
          <p>Failed to load profile. Please log in.</p>
          <Button variant="primary" onClick={() => setShowLoginModal(true)} className="mt-4">
            Log In
          </Button>
        </div>
      );
    }
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <ProfileHeader user={user} onUpdateProfile={handleUpdateProfile} />
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border-light">
                  <div>
                    <div className="text-sm font-medium text-text-primary">Name</div>
                    <div className="text-sm text-text-secondary">{user.name || 'Not set'}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border-light">
                  <div>
                    <div className="text-sm font-medium text-text-primary">Email Address</div>
                    <div className="text-sm text-text-secondary">{user.email || 'Not set'}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border-light">
                  <div>
                    <div className="text-sm font-medium text-text-primary">Location</div>
                    <div className="text-sm text-text-secondary">
                      {user.location?.state || user.location?.district || user.location?.taluk
                        ? `${user.location?.state || ''}, ${user.location?.district || ''}, ${user.location?.taluk || ''}`
                        : 'No location provided'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border-light">
                  <div>
                    <div className="text-sm font-medium text-text-primary">Bio</div>
                    <div className="text-sm text-text-secondary">{user.bio || 'No bio provided'}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm font-medium text-text-primary">Account Status</div>
                    <div className="text-sm text-success">{user.status || 'Active'}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="primary" onClick={() => navigate('/')}>
                View News
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-surface">
        <GlobalHeader />
        <div className="pt-16">
          {isLoading ? (
            <div className="text-center py-12">Loading...</div>
          ) : !user || !user.name ? (
            <div className="text-center py-12">
              <p>Failed to load profile. Please log in.</p>
              <Button variant="primary" onClick={() => setShowLoginModal(true)} className="mt-4">
                Log In
              </Button>
            </div>
          ) : (
            <>
              {activeTab === 'profile' && (
                <div className="p-4">
                  {renderTabContent()}
                </div>
              )}
            </>
          )}
          {showLoginModal && (
            <LoginModal
              isOpen={showLoginModal}
              onLogin={handleLogin}
              onClose={() => setShowLoginModal(false)}
              title="User Login"
              subtitle="Access your profile settings"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <GlobalHeader />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-background border border-border rounded-lg p-4 sticky top-24">
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">Settings</h2>
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? 'primary' : 'ghost'}
                      onClick={() => setActiveTab(tab.id)}
                      className="w-full flex items-center justify-start space-x-3 p-3"
                    >
                      <Icon name={tab.icon} size={18} />
                      <span className="text-sm font-medium">{tab.name}</span>
                    </Button>
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-background border border-border rounded-lg p-6">{renderTabContent()}</div>
            </div>
          </div>
          {showLoginModal && (
            <LoginModal
              isOpen={showLoginModal}
              onLogin={handleLogin}
              onClose={() => setShowLoginModal(false)}
              title="User Login"
              subtitle="Access your profile settings"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;