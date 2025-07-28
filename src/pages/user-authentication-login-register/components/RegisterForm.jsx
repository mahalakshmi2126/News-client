import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    preferredLanguages: [],
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // const availableLanguages = [
  //   { code: 'en', name: 'English' },
  //   { code: 'es', name: 'Spanish' },
  //   { code: 'fr', name: 'French' },
  //   { code: 'de', name: 'German' },
  //   { code: 'it', name: 'Italian' },
  //   { code: 'pt', name: 'Portuguese' },
  //   { code: 'ru', name: 'Russian' },
  //   { code: 'zh', name: 'Chinese' },
  //   { code: 'ja', name: 'Japanese' },
  //   { code: 'ar', name: 'Arabic' },
  //   { code: 'hi', name: 'Hindi' }
  // ];

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

  // const handleLanguageToggle = (languageCode) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     preferredLanguages: prev.preferredLanguages.includes(languageCode)
  //       ? prev.preferredLanguages.filter(lang => lang !== languageCode)
  //       : [...prev.preferredLanguages, languageCode]
  //   }));
  // };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // if (formData.preferredLanguages.length === 0) {
    //   newErrors.preferredLanguages = 'Please select at least one language';
    // }
    
    // if (!formData.acceptTerms) {
    //   newErrors.acceptTerms = 'You must accept the terms and conditions';
    // }
    
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
        <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
          Full Name
        </label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleInputChange}
          disabled={isLoading}
          className={`w-full ${errors.fullName ? 'border-error focus:ring-error/20' : ''}`}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.fullName}</span>
          </p>
        )}
      </div>

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
            placeholder="Create a strong password"
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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            disabled={isLoading}
            className={`w-full pr-10 ${errors.confirmPassword ? 'border-error focus:ring-error/20' : ''}`}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface"
            disabled={isLoading}
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} className="text-text-secondary" />
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.confirmPassword}</span>
          </p>
        )}
      </div>

      {/* <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Preferred Languages
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-32 overflow-y-auto p-2 border border-border rounded-lg bg-surface/50">
          {availableLanguages.map((language) => (
            <label
              key={language.code}
              className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-background transition-colors duration-150"
            >
              <Input
                type="checkbox"
                checked={formData.preferredLanguages.includes(language.code)}
                onChange={() => handleLanguageToggle(language.code)}
                disabled={isLoading}
                className="w-4 h-4"
              />
              <span className="text-sm text-text-primary">{language.name}</span>
            </label>
          ))}
        </div>
        {errors.preferredLanguages && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.preferredLanguages}</span>
          </p>
        )}
      </div> */}

      {/* <div>
        <label className="flex items-start space-x-2 cursor-pointer">
          <Input
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            disabled={isLoading}
            className={`w-4 h-4 mt-0.5 ${errors.acceptTerms ? 'border-error' : ''}`}
          />
          <span className="text-sm text-text-secondary leading-relaxed">
            I agree to the{' '}
            <Button variant="link" className="text-accent hover:text-accent/80 p-0 text-sm">
              Terms of Service
            </Button>{' '}
            and{' '}
            <Button variant="link" className="text-accent hover:text-accent/80 p-0 text-sm">
              Privacy Policy
            </Button>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.acceptTerms}</span>
          </p>
        )}
      </div> */}

      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        fullWidth
        className="py-3 font-medium"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;












// import React, { useState } from 'react';
// import Input from '../../../components/ui/Input';
// import Button from '../../../components/ui/Button';
// import Icon from '../../../components/AppIcon';

// const RegisterForm = ({ onSubmit, isLoading }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     preferredLanguages: [],
//     acceptTerms: false
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     } else if (formData.fullName.trim().length < 2) {
//       newErrors.fullName = 'Full name must be at least 2 characters';
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//       newErrors.password = 'Password must contain uppercase, lowercase, and number';
//     }
    
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     if (formData.preferredLanguages.length === 0) {
//       newErrors.preferredLanguages = 'Please select at least one language';
//     }
    
//     if (!formData.acceptTerms) {
//       newErrors.acceptTerms = 'You must accept the terms and conditions';
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
//         <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
//           Full Name
//         </label>
//         <Input
//           id="fullName"
//           name="fullName"
//           type="text"
//           placeholder="Enter your full name"
//           value={formData.fullName}
//           onChange={handleInputChange}
//           disabled={isLoading}
//           className={`w-full ${errors.fullName ? 'border-error focus:ring-error/20' : ''}`}
//         />
//         {errors.fullName && (
//           <p className="mt-1 text-sm text-error flex items-center space-x-1">
//             <Icon name="AlertCircle" size={14} />
//             <span>{errors.fullName}</span>
//           </p>
//         )}
//       </div>

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
//             placeholder="Create a strong password"
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

//       <div>
//         <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
//           Confirm Password
//         </label>
//         <div className="relative">
//           <Input
//             id="confirmPassword"
//             name="confirmPassword"
//             type={showConfirmPassword ? "text" : "password"}
//             placeholder="Confirm your password"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             disabled={isLoading}
//             className={`w-full pr-10 ${errors.confirmPassword ? 'border-error focus:ring-error/20' : ''}`}
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface"
//             disabled={isLoading}
//           >
//             <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} className="text-text-secondary" />
//           </Button>
//         </div>
//         {errors.confirmPassword && (
//           <p className="mt-1 text-sm text-error flex items-center space-x-1">
//             <Icon name="AlertCircle" size={14} />
//             <span>{errors.confirmPassword}</span>
//           </p>
//         )}
//       </div>

//       <Button
//         type="submit"
//         variant="primary"
//         loading={isLoading}
//         fullWidth
//         className="py-3 font-medium"
//       >
//         {isLoading ? 'Creating Account...' : 'Create Account'}
//       </Button>
//     </form>
//   );
// };

// export default RegisterForm;