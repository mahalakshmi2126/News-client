  // import React from 'react';
  // import Button from '../../../components/ui/Button';
  // import Icon from '../../../components/AppIcon';

  // const SocialLoginButtons = ({ onSocialLogin, isLoading }) => {
  //   const socialProviders = [
  //     {
  //       id: 'google',
  //       name: 'Google',
  //       icon: 'Chrome',
  //       color: 'bg-red-500 hover:bg-red-600',
  //       textColor: 'text-white'
  //     },
  //     {
  //       id: 'facebook',
  //       name: 'Facebook',
  //       icon: 'Facebook',
  //       color: 'bg-blue-600 hover:bg-blue-700',
  //       textColor: 'text-white'
  //     },
  //     {
  //       id: 'twitter',
  //       name: 'Twitter',
  //       icon: 'Twitter',
  //       color: 'bg-sky-500 hover:bg-sky-600',
  //       textColor: 'text-white'
  //     }
  //   ];

  //   return (
  //     <div className="space-y-3">
  //       <div className="relative">
  //         <div className="absolute inset-0 flex items-center">
  //           <div className="w-full border-t border-border-light"></div>
  //         </div>
  //         <div className="relative flex justify-center text-sm">
  //           <span className="px-2 bg-background text-text-secondary">Or continue with</span>
  //         </div>
  //       </div>

  //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
  //         {socialProviders.map((provider) => (
  //           <Button
  //             key={provider.id}
  //             variant="outline"
  //             onClick={() => onSocialLogin(provider.id)}
  //             disabled={isLoading}
  //             className={`flex items-center justify-center space-x-2 py-3 border-2 hover:border-transparent transition-all duration-200 ${provider.color} ${provider.textColor} hover:shadow-md`}
  //           >
  //             <Icon name={provider.icon} size={18} />
  //             <span className="hidden sm:inline font-medium">{provider.name}</span>
  //           </Button>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // export default SocialLoginButtons;









  

// import React from 'react';
// import Button from '../../../components/ui/Button';
// import Icon from '../../../components/AppIcon';

// const SocialLoginButtons = ({ isLoading }) => {
//   const handleGoogleLogin = () => {
//     window.google.accounts.id.initialize({
//       client_id: '306293956343-64n7ehu5kj9fc5krvgiqnni8kq0q553n.apps.googleusercontent.com', // 🔁 Replace with your actual Client ID
//       callback: async (response) => {
//         const userInfo = parseJwt(response.credential);

//         const res = await fetch('http://localhost:5000/api/auth/google-login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             email: userInfo.email,
//             name: userInfo.name,
//           }),
//         });

//         const data = await res.json();
//         if (data.success) {
//           localStorage.setItem('token', data.token);
//           window.location.href = '/dashboard'; // ✅ redirect after login
//         } else {
//           alert(data.message || 'Login failed');
//         }
//       },
//     });

//     window.google.accounts.id.prompt(); // 👉 Shows the popup
//   };

//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       return null;
//     }
//   };

//   const socialProviders = [
//     {
//       id: 'google',
//       name: 'Google',
//       icon: 'Chrome',
//       onClick: handleGoogleLogin,
//       color: 'bg-red-500 hover:bg-red-600',
//       textColor: 'text-white',
//     },
//     {
//       id: 'facebook',
//       name: 'Facebook',
//       icon: 'Facebook',
//       onClick: () => alert('Facebook login not implemented'),
//       color: 'bg-blue-600 hover:bg-blue-700',
//       textColor: 'text-white',
//     },
//     {
//       id: 'twitter',
//       name: 'Twitter',
//       icon: 'Twitter',
//       onClick: () => alert('Twitter login not implemented'),
//       color: 'bg-sky-500 hover:bg-sky-600',
//       textColor: 'text-white',
//     },
//   ];

//   return (
//     <div className="space-y-3">
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-border-light"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-2 bg-background text-text-secondary">Or continue with</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//         {socialProviders.map((provider) => (
//           <Button
//             key={provider.id}
//             variant="outline"
//             onClick={provider.onClick}
//             disabled={isLoading}
//             className={`flex items-center justify-center space-x-2 py-3 border-2 hover:border-transparent transition-all duration-200 ${provider.color} ${provider.textColor} hover:shadow-md`}
//           >
//             <Icon name={provider.icon} size={18} />
//             <span className="hidden sm:inline font-medium">{provider.name}</span>
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SocialLoginButtons;