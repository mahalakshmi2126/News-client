import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginModal = ({ isOpen, onLogin, title, subtitle }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await onLogin(formData);
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-white rounded-lg shadow-modal w-full max-w-md">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} color="white" />
            </div>
            <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
              {title}
            </h2>
            <p className="text-text-secondary">
              {subtitle}
            </p>
          </div>

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

            <Button
              type="submit"
              variant="primary"
              loading={isLoading}
              fullWidth
              className="py-3 font-medium mt-6"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;



// import React, { useState } from 'react';
// import Button from '../../../components/ui/Button';
// import Input from '../../../components/ui/Input';
// import Icon from '../../../components/AppIcon';

// const LoginModal = ({ isOpen, onLogin, title, subtitle }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
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

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (validateForm()) {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });
//       const data = await response.json();
//       if (response.ok && data.success) {
//         // 🔐 Save token & user info
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         await onLogin(data.user);
//       } else {
//         setErrors({ password: data.message || 'Login failed' });
//       }
//     } catch (error) {
//       setErrors({ password: 'Server error. Try again.' });
//     } finally {
//       setIsLoading(false);
//     }
//   }
// };


//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
//       <div className="bg-white rounded-lg shadow-modal w-full max-w-md">
//         <div className="p-6">
//           <div className="text-center mb-6">
//             <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
//               <Icon name="Shield" size={32} color="white" />
//             </div>
//             <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
//               {title}
//             </h2>
//             <p className="text-text-secondary">
//               {subtitle}
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
//                 Email Address
//               </label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 className={`w-full ${errors.email ? 'border-error focus:ring-error/20' : ''}`}
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-error flex items-center space-x-1">
//                   <Icon name="AlertCircle" size={14} />
//                   <span>{errors.email}</span>
//                 </p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   disabled={isLoading}
//                   className={`w-full pr-10 ${errors.password ? 'border-error focus:ring-error/20' : ''}`}
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface"
//                   disabled={isLoading}
//                 >
//                   <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} className="text-text-secondary" />
//                 </Button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-error flex items-center space-x-1">
//                   <Icon name="AlertCircle" size={14} />
//                   <span>{errors.password}</span>
//                 </p>
//               )}
//             </div>

//             <Button
//               type="submit"
//               variant="primary"
//               loading={isLoading}
//               fullWidth
//               className="py-3 font-medium mt-6"
//             >
//               {isLoading ? 'Signing In...' : 'Sign In'}
//             </Button>

//             <div className="text-center text-sm text-text-secondary mt-4">
//               <span>Demo credentials: </span>
//               <span className="font-mono text-accent">
//                 {title.includes('Admin') ? 'admin@newshub.com / admin123' : 'reporter@newshub.com / reporter123'}
//               </span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;