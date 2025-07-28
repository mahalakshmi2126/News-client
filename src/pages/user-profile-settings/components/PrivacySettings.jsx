import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacySettings = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings || {});

  // Define metadata for privacy settings (for UI display)
  const privacyOptionsMetadata = {
    profileVisibility: {
      title: 'Profile Visibility',
      description: 'Make your profile visible to other users',
      icon: 'Eye',
    },
    showReadingHistory: {
      title: 'Show Reading History',
      description: "Allow others to see articles you've read",
      icon: 'History',
    },
    showBookmarks: {
      title: 'Show Bookmarks',
      description: 'Make your bookmarked articles public',
      icon: 'Bookmark',
    },
    allowComments: {
      title: 'Allow Comments on Profile',
      description: 'Let other users comment on your profile',
      icon: 'MessageCircle',
    },
    shareReadingStats: {
      title: 'Share Reading Statistics',
      description: 'Display your reading stats publicly',
      icon: 'BarChart3',
    },
    // allowFollowers: {
    //   title: 'Allow Followers',
    //   description: 'Let other users follow your activity',
    //   icon: 'Users',
    // },
  };

  // Generate privacy options dynamically from settings keys
  const privacyOptions = Object.keys(localSettings)
    .map((key) => ({
      id: key,
      ...privacyOptionsMetadata[key],
    }))
    .filter((option) => option.title); // Ensure only valid options with metadata are shown

  const toggleSetting = async (setting) => {
    const previousSettings = { ...localSettings };
    const updatedSettings = {
      ...localSettings,
      [setting]: !localSettings[setting],
    };
    try {
      // Optimistic update: update UI immediately
      setLocalSettings(updatedSettings);
      await onUpdateSettings(updatedSettings);
      toast.success(`${privacyOptionsMetadata[setting]?.title || setting} updated`);
    } catch (error) {
      console.error('Error updating setting:', error);
      toast.error('Failed to update setting');
      // Revert to previous state on failure
      setLocalSettings(previousSettings);
    }
  };

  const handleDataExport = () => {
    console.log('Exporting user data...');
    toast.info('Data export requested (mock)');
  };

  const handleAccountDeletion = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmed) {
      console.log('Account deletion requested...');
      toast.info('Account deletion requested (mock)');
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Controls */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Privacy Controls
        </h3>
        <p className="text-xs text-text-secondary mb-3">
          Control what information is visible to other users.
        </p>
        <div className="space-y-3">
          {privacyOptions.length > 0 ? (
            privacyOptions.map((option) => (
              <Button
                key={option.id}
                variant="ghost"
                onClick={() => toggleSetting(option.id)}
                className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={option.icon} size={20} className="text-accent" />
                  <div className="text-left">
                    <div className="text-sm font-medium">{option.title}</div>
                    <div className="text-xs text-text-secondary">
                      {option.description}
                    </div>
                  </div>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    localSettings[option.id] ? 'bg-accent' : 'bg-border'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
                      localSettings[option.id] ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </Button>
            ))
          ) : (
            <p className="text-sm text-text-secondary">No privacy settings available.</p>
          )}
        </div>
      </div>

      {/* Data Management */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Data Management
        </h3>
        <p className="text-xs text-text-secondary mb-3">
          Export your data or delete your account.
        </p>
        <div className="space-y-3">
          <Button
            variant="ghost"
            onClick={handleDataExport}
            className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:bg-surface"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Download" size={20} className="text-accent" />
              <div className="text-left">
                <div className="text-sm font-medium">Export My Data</div>
                <div className="text-xs text-text-secondary">
                  Download a copy of your data
                </div>
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
          </Button>

          <Button
            variant="ghost"
            onClick={handleAccountDeletion}
            className="w-full flex items-center justify-between p-3 border border-error/20 rounded-lg hover:bg-error/5"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Trash2" size={20} className="text-error" />
              <div className="text-left">
                <div className="text-sm font-medium text-error">Delete Account</div>
                <div className="text-xs text-text-secondary">
                  Permanently delete your account and data
                </div>
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
          </Button>
        </div>
      </div>

      {/* Commented out sections */}
      {/* Data & Tracking */}
      {/* <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Data & Tracking
        </h3>
        <p className="text-xs text-text-secondary mb-3">
          Manage how your data is used for personalization and analytics.
        </p>
        <div className="space-y-3">
          {dataSettings.map((setting) => (
            <Button
              key={setting.id}
              variant="ghost"
              onClick={() => toggleSetting(setting.id)}
              className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Icon name={setting.icon} size={20} className="text-accent" />
                <div className="text-left">
                  <div className="text-sm font-medium">{setting.title}</div>
                  <div className="text-xs text-text-secondary">
                    {setting.description}
                  </div>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                localSettings[setting.id] ? 'bg-accent' : 'bg-border'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
                  localSettings[setting.id] ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
                }`} />
              </div>
            </Button>
          ))}
        </div>
      </div> */}

      {/* Connected Accounts */}
      {/* <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Connected Accounts
        </h3>
        <p className="text-xs text-text-secondary mb-3">
          Manage your connected social media accounts.
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">f</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">Facebook</div>
                <div className="text-xs text-success">Connected</div>
              </div>
            </div>
            <Button variant="ghost" className="text-sm text-error">
              Disconnect
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">t</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">Twitter</div>
                <div className="text-xs text-text-secondary">Not connected</div>
              </div>
            </div>
            <Button variant="primary" className="text-sm">
              Connect
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">Google</div>
                <div className="text-xs text-success">Connected</div>
              </div>
            </div>
            <Button variant="ghost" className="text-sm text-error">
              Disconnect
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PrivacySettings;