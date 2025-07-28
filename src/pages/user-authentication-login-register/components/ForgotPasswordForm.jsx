import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ForgotPasswordForm = ({ onSubmit, onBack, isLoading }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      onSubmit(email);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name="Mail" size={32} className="text-success" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-text-primary">Check your email</h3>
          <p className="text-sm text-text-secondary">
            We've sent a password reset link to{' '}
            <span className="font-medium text-text-primary">{email}</span>
          </p>
        </div>

        <div className="bg-surface/50 rounded-lg p-4 text-left">
          <h4 className="text-sm font-medium text-text-primary mb-2">Next steps:</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>Check your email inbox</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>Click the reset link in the email</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>Create a new password</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setEmail('');
            }}
            fullWidth
            className="py-2"
          >
            Try different email
          </Button>
          
          <Button
            variant="ghost"
            onClick={onBack}
            fullWidth
            className="py-2 text-text-secondary"
          >
            Back to sign in
          </Button>
        </div>

        <div className="text-xs text-text-secondary">
          Didn't receive the email? Check your spam folder or{' '}
          <Button
            variant="link"
            onClick={() => setIsSubmitted(false)}
            className="text-accent hover:text-accent/80 p-0 text-xs"
          >
            try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name="Lock" size={24} className="text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary">Forgot your password?</h3>
        <p className="text-sm text-text-secondary">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="resetEmail" className="block text-sm font-medium text-text-primary mb-2">
            Email Address
          </label>
          <Input
            id="resetEmail"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleInputChange}
            disabled={isLoading}
            className={`w-full ${error ? 'border-error focus:ring-error/20' : ''}`}
          />
          {error && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{error}</span>
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            fullWidth
            className="py-3 font-medium"
          >
            {isLoading ? 'Sending...' : 'Send reset link'}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={isLoading}
            fullWidth
            className="py-2 text-text-secondary"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back to sign in
          </Button>
        </div>
      </form>

      <div className="text-center text-xs text-text-secondary">
        Remember your password?{' '}
        <Button
          variant="link"
          onClick={onBack}
          className="text-accent hover:text-accent/80 p-0 text-xs"
        >
          Sign in instead
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;



// import React, { useState } from 'react';
// import Input from '../../../components/ui/Input';
// import Button from '../../../components/ui/Button';
// import Icon from '../../../components/AppIcon';
// import axios from 'axios';

// const ForgotPasswordForm = ({ onBack }) => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setEmail(e.target.value);
//     if (error) {
//       setError('');
//     }
//   };

//   const validateEmail = () => {
//     if (!email.trim()) {
//       setError('Email is required');
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError('Please enter a valid email address');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateEmail()) return;

//     try {
//       setIsLoading(true);
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/forgot-password`, { email });
//       setIsSubmitted(true);
//     } catch (err) {
//       setError(
//         err?.response?.data?.message || 'Something went wrong. Please try again.'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="text-center space-y-4">
//         <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
//           <Icon name="Mail" size={32} className="text-success" />
//         </div>
//         <div className="space-y-2">
//           <h3 className="text-lg font-semibold text-text-primary">Check your email</h3>
//           <p className="text-sm text-text-secondary">
//             We've sent a password reset link to{' '}
//             <span className="font-medium text-text-primary">{email}</span>
//           </p>
//         </div>
//         <div className="space-y-3">
//           <Button variant="outline" onClick={() => {
//             setIsSubmitted(false);
//             setEmail('');
//           }} fullWidth>
//             Try different email
//           </Button>
//           <Button variant="ghost" onClick={onBack} fullWidth className="text-text-secondary">
//             Back to sign in
//           </Button>
//         </div>
//         <div className="text-xs text-text-secondary">
//           Didn't receive the email? Check your spam folder or{' '}
//           <Button variant="link" onClick={() => setIsSubmitted(false)} className="p-0 text-accent text-xs">
//             try again
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="text-center space-y-2">
//         <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
//           <Icon name="Lock" size={24} className="text-accent" />
//         </div>
//         <h3 className="text-lg font-semibold text-text-primary">Forgot your password?</h3>
//         <p className="text-sm text-text-secondary">
//           No worries! Enter your email address and we'll send you a link to reset your password.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="resetEmail" className="block text-sm font-medium text-text-primary mb-2">
//             Email Address
//           </label>
//           <Input
//             id="resetEmail"
//             type="email"
//             placeholder="Enter your email address"
//             value={email}
//             onChange={handleInputChange}
//             disabled={isLoading}
//             className={`w-full ${error ? 'border-error focus:ring-error/20' : ''}`}
//           />
//           {error && (
//             <p className="mt-1 text-sm text-error flex items-center space-x-1">
//               <Icon name="AlertCircle" size={14} />
//               <span>{error}</span>
//             </p>
//           )}
//         </div>

//         <div className="space-y-3">
//           <Button type="submit" variant="primary" loading={isLoading} fullWidth className="py-3 font-medium">
//             {isLoading ? 'Sending...' : 'Send reset link'}
//           </Button>
//           <Button type="button" variant="ghost" onClick={onBack} disabled={isLoading} fullWidth>
//             <Icon name="ArrowLeft" size={16} className="mr-2" />
//             Back to sign in
//           </Button>
//         </div>
//       </form>

//       <div className="text-center text-xs text-text-secondary">
//         Remember your password?{' '}
//         <Button variant="link" onClick={onBack} className="text-accent hover:text-accent/80 p-0 text-xs">
//           Sign in instead
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordForm;