// import React, { useState } from 'react';
// import Input from '../../../components/ui/Input';
// import Button from '../../../components/ui/Button';
// import Icon from '../../../components/AppIcon';
// import { GoogleLogin } from '@react-oauth/google';
// const URL = import.meta.env.VITE_API_BASE_URL;

// const LoginForm = ({ onSubmit, isLoading, onForgotPassword }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSubmit(formData);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
//           Email Address
//         </label>
//         <Input
//           id="email"
//           name="email"
//           type="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={handleInputChange}
//           disabled={isLoading}
//           className={`w-full ${errors.email ? 'border-error focus:ring-error/20' : ''}`}
//         />
//         {errors.email && (
//           <p className="mt-1 text-sm text-error flex items-center space-x-1">
//             <Icon name="AlertCircle" size={14} />
//             <span>{errors.email}</span>
//           </p>
//         )}
//       </div>

//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
//           Password
//         </label>
//         <div className="relative">
//           <Input
//             id="password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleInputChange}
//             disabled={isLoading}
//             className={`w-full pr-10 ${errors.password ? 'border-error focus:ring-error/20' : ''}`}
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface"
//             disabled={isLoading}
//           >
//             <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} className="text-text-secondary" />
//           </Button>
//         </div>
//         {errors.password && (
//           <p className="mt-1 text-sm text-error flex items-center space-x-1">
//             <Icon name="AlertCircle" size={14} />
//             <span>{errors.password}</span>
//           </p>
//         )}
//       </div>

//       <div className="flex items-center justify-between">
//         <label className="flex items-center space-x-2 cursor-pointer">
//           <Input
//             name="rememberMe"
//             type="checkbox"
//             checked={formData.rememberMe}
//             onChange={handleInputChange}
//             disabled={isLoading}
//             className="w-4 h-4"
//           />
//           <span className="text-sm text-text-secondary">Remember me</span>
//         </label>

//         <button
//           onClick={onForgotPassword}
//           disabled={isLoading}
//           className="font-medium bg-white  text-blue-400 underline hover:text-blue-600"
//         >
//           Forgot password?
//         </button>
//       </div>

//       <Button
//         type="submit"
//         variant="primary"
//         loading={isLoading}
//         fullWidth
//         className="py-3 font-medium"
//       >
//         {isLoading ? 'Signing In...' : 'Sign In'}
//       </Button>

//       {/* Divider */}
//       <div className="relative my-4">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-border"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="bg-background px-2 text-text-secondary">or</span>
//         </div>
//       </div>

//       {/* Google Sign-In Button */}
//       <div className="w-full flex justify-center">
//        <GoogleLogin
//   onSuccess={(credentialResponse) => {
//     // 1️⃣ Extract the Google ID token
//     const idToken = credentialResponse.credential;

//     // 2️⃣ Call backend API directly here instead of passing to onSubmit
//     fetch(`${URL}/auth/google-login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id_token: idToken }) // backend will verify and auto-create/login
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           // 3️⃣ Store token & user data same as normal login
//           localStorage.setItem("token", data.token);
//           localStorage.setItem("user", JSON.stringify(data.user));
//           window.location.href = "/dashboard"; // or your home route
//         } else {
//           console.error("Google login failed:", data.message);
//         }
//       })
//       .catch(err => console.error("Error:", err));
//   }}
//   onError={() => {
//     console.log("Google Login Failed");
//   }}
//   size="large"
//   shape="pill"
// />

//       </div>
//     </form>
//   );
// };

// export default LoginForm;




import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { GoogleLogin } from '@react-oauth/google';
const URL = import.meta.env.VITE_API_BASE_URL;

const LoginForm = ({ onSubmit, isLoading, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isLoading}
          className={`w-full ${errors.email ? 'border-error focus:ring-error/20' : ''}`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoading}
            className={`w-full pr-10 ${errors.password ? 'border-error focus:ring-error/20' : ''}`}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} className="text-text-secondary" />
          </Button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Input
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-4 h-4"
          />
          <span className="text-sm text-text-secondary">Remember me</span>
        </label>

        <button
          onClick={onForgotPassword}
          disabled={isLoading}
          className="font-medium bg-white  text-blue-400 underline hover:text-blue-600"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        fullWidth
        className="py-3 font-medium"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-text-secondary">or</span>
        </div>
      </div>

      {/* Google Sign-In Button */}
      <div className="w-full flex justify-center">
       <GoogleLogin
  onSuccess={(credentialResponse) => {
    // 1️⃣ Extract the Google ID token
    const idToken = credentialResponse.credential;

    // 2️⃣ Call backend API directly here instead of passing to onSubmit
    fetch(`${URL}/auth/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: idToken }) // backend will verify and auto-create/login
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // 3️⃣ Store token & user data same as normal login
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "/personalized-news-dashboard"; // or your home route
        } else {
          console.error("Google login failed:", data.message);
        }
      })
      .catch(err => console.error("Error:", err));
  }}
  onError={() => {
    console.log("Google Login Failed");
  }}
  size="large"
  shape="pill"
/>

      </div>
    </form>
  );
};

export default LoginForm;