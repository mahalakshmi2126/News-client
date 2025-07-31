// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from './../../context/UserContext';
// import AuthHeader from './components/AuthHeader';
// import AuthTabs from './components/AuthTabs';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import ForgotPasswordForm from './components/ForgotPasswordForm';
// import Icon from '../../components/AppIcon';
// import { toast } from 'react-toastify';
// import { jwtDecode } from 'jwt-decode';


// const URL = import.meta.env.VITE_API_BASE_URL;

// const UserAuthenticationPage = () => {
//   const { setUser, setIsAuthenticated, refreshUserData } = useContext(UserContext);
//   const [activeTab, setActiveTab] = useState('login');
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [authError, setAuthError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     setAuthError('');
//     setShowForgotPassword(false);
//   }, [activeTab]);

//   const handleLogin = async (formData) => {
//   setIsLoading(true);
//   setAuthError('');

//   try {
//     let payload;

//     // ✅ Check if it's Google login
//     if (formData.googleCredential) {
//       const decoded = jwtDecode(formData.googleCredential.credential); // ✅ correct
//       payload = {
//         name: decoded.name,
//         email: decoded.email,
//       };

//       const response = await fetch(`${URL}/auth/google-login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Google login failed');

//       // ✅ Proceed with user validation
//       if (data.user.role !== 'user') {
//         throw new Error('This page is for regular users only. Please use the appropriate dashboard.');
//       }

//       const { token, user } = data;
//       const userObj = {
//         id: user._id,
//         _id: user._id,
//         name: user.name || 'User',
//         email: user.email || '',
//         avatar: user.avatar || '/assets/images/no_image.png',
//         initials: user.initials || (user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'),
//         role: user.role || 'user',
//         bio: user.bio || '',
//         location: user.location || { state: '', district: '', taluk: '' },
//         status: user.status || 'active',
//         isApproved: user.isApproved || false,
//         reporterFormSubmitted: user.reporterFormSubmitted || false,
//       };

//       localStorage.setItem('authToken', token);
//       localStorage.setItem('generalUser', JSON.stringify(userObj));
//       localStorage.setItem('role', userObj.role);
//       setUser(userObj);
//       setIsAuthenticated(true);
//       await refreshUserData();

//       toast.success('Google Login Successful!');
//       navigate('/personalized-news-dashboard', {
//         state: { fromAuth: true, message: 'Welcome back!' }
//       });
//       return; // ✅ return to stop here
//     }

//     // 👇 Regular email/password login
//     if (!formData.email || !formData.password) {
//       toast.error('Please enter both email and password');
//       return;
//     }

//     const response = await fetch(`${URL}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'Login failed');

//     if (data.user.role !== 'user') {
//       throw new Error('This page is for regular users only. Please use the appropriate dashboard.');
//     }

//     const { token, user } = data;
//     const userObj = {
//       id: user._id,
//       _id: user._id,
//       name: user.name || 'User',
//       email: user.email || '',
//       avatar: user.avatar || '/assets/images/no_image.png',
//       initials: user.initials || (user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'),
//       role: user.role || 'user',
//       bio: user.bio || '',
//       location: user.location || { state: '', district: '', taluk: '' },
//       status: user.status || 'active',
//       isApproved: user.isApproved || false,
//       reporterFormSubmitted: user.reporterFormSubmitted || false,
//     };

//     localStorage.setItem('authToken', token);
//     localStorage.setItem('generalUser', JSON.stringify(userObj));
//     localStorage.setItem('role', userObj.role);
//     setUser(userObj);
//     setIsAuthenticated(true);
//     await refreshUserData();

//     toast.success('Login Successful!');
//     navigate('/personalized-news-dashboard', {
//       state: { fromAuth: true, message: 'Welcome back!' }
//     });

//   } catch (error) {
//     toast.error(error.message);
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('generalUser');
//     localStorage.removeItem('role');
//     setUser(null);
//     setIsAuthenticated(false);
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const handleRegister = async (formData) => {
//     // Validate formData
//     if (!formData.fullName || !formData.email || !formData.password) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     setIsLoading(true);
//     setAuthError('');

//     try {
//       const response = await fetch(`${URL}/auth/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...formData, role: 'user' }), // Force user role
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed');
//       }

//       toast.success('Registration Successful! Please log in.');
//       setActiveTab('login');
//     } catch (error) {
//       toast.error(error.message || 'Registration Failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleForgotPassword = async (email) => {
//     if (!email) {
//       toast.error('Please enter your email address');
//       return;
//     }

//     setIsLoading(true);
//     setAuthError('');

//     try {
//       const response = await fetch(`${URL}/auth/forgot-password`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Failed to send email');

//       toast.success('Reset link sent to your email!');
//       setShowForgotPassword(false);
//     } catch (error) {
//       toast.error(error.message || 'Failed to send email');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBackToLogin = () => {
//     setShowForgotPassword(false);
//     setAuthError('');
//   };

//   const handleShowForgotPassword = () => {
//     setShowForgotPassword(true);
//     setAuthError('');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
//       <AuthHeader />
//       <main className="flex-1 flex items-center justify-center px-4 py-8">
//         <div className="w-full max-w-md">
//           <div className="bg-background rounded-2xl shadow-modal border border-border p-6 sm:p-8">
//             {authError && (
//               <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
//                 <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-medium text-error">Authentication Error</p>
//                   <p className="text-sm text-error/80 mt-1">{authError}</p>
//                 </div>
//               </div>
//             )}
//             {showForgotPassword ? (
//               <ForgotPasswordForm
//                 onSubmit={handleForgotPassword}
//                 onBack={handleBackToLogin}
//                 isLoading={isLoading}
//               />
//             ) : (
//               <>
//                 <div className="text-center mb-6">
//                   <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
//                     {activeTab === 'login' ? 'Welcome back' : 'Join NewsHub'}
//                   </h1>
//                   <p className="text-text-secondary">
//                     {activeTab === 'login'
//                       ? 'Sign in to access your personalized news feed (Users only)'
//                       : 'Create your account to get started with multilingual news'}
//                   </p>
//                 </div>
//                 <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
//                 <div className="space-y-6">
//                   {activeTab === 'login' ? (
//                     <LoginForm
//                       onSubmit={handleLogin}
//                       isLoading={isLoading}
//                       onForgotPassword={handleShowForgotPassword}
//                     />
//                   ) : (
//                     <RegisterForm
//                       onSubmit={handleRegister}
//                       isLoading={isLoading}
//                     />
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//           {!showForgotPassword && (
//             <div className="mt-6 text-center space-y-4">
//               <div className="text-sm text-text-secondary">
//                 {activeTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
//                 <button
//                   onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
//                   className="text-accent hover:text-accent/80 font-medium transition-colors duration-150"
//                   disabled={isLoading}
//                 >
//                   {activeTab === 'login' ? 'Create one' : 'Sign in'}
//                 </button>
//               </div>
//             </div>
//           )}
//           {isLoading && (
//             <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
//               <div className="bg-background rounded-lg p-6 shadow-modal border border-border flex items-center space-x-3">
//                 <div className="animate-spin w-5 h-5 border-2 border-accent border-t-transparent rounded-full"></div>
//                 <span className="text-text-primary font-medium">
//                   {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//       <div className="fixed inset-0 -z-10 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
//       </div>
//     </div>
//   );
// };

// export default UserAuthenticationPage;

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './../../context/UserContext';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Icon from '../../components/AppIcon';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const URL = import.meta.env.VITE_API_BASE_URL;

const UserAuthenticationPage = () => {
  const { setUser, setIsAuthenticated, refreshUserData } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract redirect query parameter
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/personalized-news-dashboard';

  useEffect(() => {
    setAuthError('');
    setShowForgotPassword(false);
  }, [activeTab]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setAuthError('');

    try {
      let payload;

      // Handle Google login
      if (formData.googleCredential) {
        const decoded = jwtDecode(formData.googleCredential.credential);
        payload = {
          name: decoded.name,
          email: decoded.email,
        };

        const response = await fetch(`${URL}/auth/google-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Google login failed');

        if (data.user.role !== 'user') {
          throw new Error('This page is for regular users only. Please use the appropriate dashboard.');
        }

        const { token, user } = data;
        const userObj = {
          id: user._id,
          _id: user._id,
          name: user.name || 'User',
          email: user.email || '',
          avatar: user.avatar || '/assets/images/no_image.png',
          initials: user.initials || (user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'),
          role: user.role || 'user',
          bio: user.bio || '',
          location: user.location || { state: '', district: '', taluk: '' },
          status: user.status || 'active',
          isApproved: user.isApproved || false,
          reporterFormSubmitted: user.reporterFormSubmitted || false,
        };

        localStorage.setItem('authToken', token);
        localStorage.setItem('generalUser', JSON.stringify(userObj));
        localStorage.setItem('role', userObj.role);
        setUser(userObj);
        setIsAuthenticated(true);
        await refreshUserData();

        toast.success('Google Login Successful!');
        navigate(redirectPath, {
          state: { fromAuth: true, message: 'Welcome back!' }
        });
        return;
      }

      // Regular email/password login
      if (!formData.email || !formData.password) {
        toast.error('Please enter both email and password');
        return;
      }

      const response = await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      if (data.user.role !== 'user') {
        throw new Error('This page is for regular users only. Please use the appropriate dashboard.');
      }

      const { token, user } = data;
      const userObj = {
        id: user._id,
        _id: user._id,
        name: user.name || 'User',
        email: user.email || '',
        avatar: user.avatar || '/assets/images/no_image.png',
        initials: user.initials || (user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'),
        role: user.role || 'user',
        bio: user.bio || '',
        location: user.location || { state: '', district: '', taluk: '' },
        status: user.status || 'active',
        isApproved: user.isApproved || false,
        reporterFormSubmitted: user.reporterFormSubmitted || false,
      };

      localStorage.setItem('authToken', token);
      localStorage.setItem('generalUser', JSON.stringify(userObj));
      localStorage.setItem('role', userObj.role);
      setUser(userObj);
      setIsAuthenticated(true);
      await refreshUserData();

      toast.success('Login Successful!');
      navigate(redirectPath, {
        state: { fromAuth: true, message: 'Welcome back!' }
      });
    } catch (error) {
      toast.error(error.message);
      localStorage.removeItem('authToken');
      localStorage.removeItem('generalUser');
      localStorage.removeItem('role');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    // Validate formData
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setAuthError('');

    try {
      const response = await fetch(`${URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'user' }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Registration Successful! Please log in.');
      setActiveTab('login');
      // Preserve redirect query parameter when switching to login tab
      navigate(`/user-authentication-login-register?redirect=${encodeURIComponent(redirectPath)}`);
    } catch (error) {
      toast.error(error.message || 'Registration Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setAuthError('');

    try {
      const response = await fetch(`${URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to send email');

      toast.success('Reset link sent to your email!');
      setShowForgotPassword(false);
    } catch (error) {
      toast.error(error.message || 'Failed to send email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setAuthError('');
    // Preserve redirect query parameter when returning to login
    navigate(`/user-authentication-login-register?redirect=${encodeURIComponent(redirectPath)}`);
  };

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
    setAuthError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      <AuthHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-background rounded-2xl shadow-modal border border-border p-6 sm:p-8">
            {authError && (
              <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
                <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-error">Authentication Error</p>
                  <p className="text-sm text-error/80 mt-1">{authError}</p>
                </div>
              </div>
            )}
            {showForgotPassword ? (
              <ForgotPasswordForm
                onSubmit={handleForgotPassword}
                onBack={handleBackToLogin}
                isLoading={isLoading}
              />
            ) : (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                    {activeTab === 'login' ? 'Welcome back' : 'Join NewsHub'}
                  </h1>
                  <p className="text-text-secondary">
                    {activeTab === 'login'
                      ? 'Sign in to access your personalized news feed (Users only)'
                      : 'Create your account to get started with multilingual news'}
                  </p>
                </div>
                <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="space-y-6">
                  {activeTab === 'login' ? (
                    <LoginForm
                      onSubmit={handleLogin}
                      isLoading={isLoading}
                      onForgotPassword={handleShowForgotPassword}
                    />
                  ) : (
                    <RegisterForm
                      onSubmit={handleRegister}
                      isLoading={isLoading}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          {!showForgotPassword && (
            <div className="mt-6 text-center space-y-4">
              <div className="text-sm text-text-secondary">
                {activeTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                  className="text-accent hover:text-accent/80 font-medium transition-colors duration-150"
                  disabled={isLoading}
                >
                  {activeTab === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </div>
            </div>
          )}
          {isLoading && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-background rounded-lg p-6 shadow-modal border border-border flex items-center space-x-3">
                <div className="animate-spin w-5 h-5 border-2 border-accent border-t-transparent rounded-full"></div>
                <span className="text-text-primary font-medium">
                  {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default UserAuthenticationPage;