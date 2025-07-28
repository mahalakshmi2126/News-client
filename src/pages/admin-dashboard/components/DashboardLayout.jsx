import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DashboardLayout = ({ 
  children, 
  role, 
  userData, 
  activeTab, 
  onTabChange 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // 👉 Hook for redirect

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/user-authentication-login-register'); // 👉 Redirect after logout
  };

  const getMenuItems = () => {
    if (role === 'admin') {
      return [
        { id: 'news', label: 'News Management', icon: 'FileText' },
        { id: 'requests', label: 'Reporter Requests', icon: 'UserPlus' },
        { id: 'reporters', label: 'Reporters', icon: 'Users' },
        { id: 'locations', label: 'Locations', icon: 'MapPin' },
        { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
      ];
    } else {
      return [
        // { id: 'onboarding', label: 'Profile Setup', icon: 'User' },
        { id: 'post-news', label: 'Post News', icon: 'Plus' },
        { id: 'my-articles', label: 'My Articles', icon: 'FileText' }
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-card p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Newspaper" size={20} color="white" />
          </div>
          <span className="text-lg font-heading font-semibold text-primary">
            NewsHub {role === 'admin' ? 'Admin' : 'Reporter'}
          </span>
        </div>
        <Button
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2"
        >
          <Icon name="Menu" size={20} />
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-card transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border-light">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Newspaper" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-lg font-heading font-semibold text-primary">
                  NewsHub
                </h1>
                <p className="text-sm text-text-secondary">
                  {role === 'admin' ? 'Admin Panel' : 'Reporter Panel'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'primary' : 'ghost'}
                onClick={() => {
                  onTabChange(item.id);
                  setIsSidebarOpen(false);
                }}
                className="w-full justify-start text-left"
              >
                <Icon name={item.icon} size={18} className="mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border-light bg-surface">
            <div className="mb-3">
              <p className="text-sm font-medium text-text-primary">
                {userData?.name || 'User'}
              </p>
              <p className="text-xs text-text-secondary">
                {userData?.email || 'user@example.com'}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full"
            >
              <Icon name="LogOut" size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;