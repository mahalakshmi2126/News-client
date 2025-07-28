import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In' },
    { id: 'register', label: 'Create Account' }
  ];

  return (
    <div className="flex bg-surface rounded-lg p-1 mb-6">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "primary" : "ghost"}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-2 px-4 text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id 
              ? 'shadow-sm' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default AuthTabs;