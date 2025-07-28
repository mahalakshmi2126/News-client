import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return setError('All fields are required');
    }

    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Reset failed');
      }

      toast.success('Password reset successful! Please login.');
      navigate('/user-authentication-login-register');
    } catch (err) {
      setError(err.message);
      toast.error('Reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthHeader />
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10 bg-gradient-to-br from-background via-surface to-background">
        <div className="w-full max-w-md bg-background rounded-2xl shadow-modal border border-border p-6 sm:p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-text-primary mb-1">Reset Your Password</h2>
            <p className="text-sm mb-3 text-text-secondary">
              Enter a new password below to reset your account.
            </p>
          </div>

          {error && (
            <div className="bg-error/10 text-error p-3 rounded-lg flex items-center space-x-2 text-sm mb-4">
              <Icon name="AlertCircle" size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                New Password
              </label>
              <Input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-9 text-text-secondary hover:text-text-primary"
                tabIndex={-1}
              >
                <Icon name={showNewPassword ? 'EyeOff' : 'Eye'} size={18} />
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-text-secondary hover:text-text-primary"
                tabIndex={-1}
              >
                <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              className="py-3 font-medium"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;