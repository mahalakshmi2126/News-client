import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileHeader = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');
  const [state, setState] = useState(user.location?.state || '');
  const [district, setDistrict] = useState(user.location?.district || '');
  const [taluk, setTaluk] = useState(user.location?.taluk || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarError, setAvatarError] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    // Initialize input fields with current user data
    setName(user.name || '');
    setBio(user.bio || '');
    setState(user.location?.state || '');
    setDistrict(user.location?.district || '');
    setTaluk(user.location?.taluk || '');
    setAvatarFile(null);
    setAvatarError(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset input fields
    setName(user.name || '');
    setBio(user.bio || '');
    setState(user.location?.state || '');
    setDistrict(user.location?.district || '');
    setTaluk(user.location?.taluk || '');
    setAvatarFile(null);
    setAvatarError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(
      { name, bio, location: { state, district, taluk } },
      { file: avatarFile }
    );
    setIsEditing(false); // Switch back to view mode
    setAvatarFile(null); // Clear file input
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            {avatarError || !user.avatar ? (
              <div className="w-full h-full bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center">
                {user.initials || user.name?.slice(0, 2).toUpperCase() || 'U'}
              </div>
            ) : (
              <Image
                src={user.avatar}
                alt={user.name || 'User'}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/no_image.png'; }}
              />
            )}
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">{user.name || 'Not set'}</h2>
            <p className="text-sm text-text-secondary">{user.bio || 'No bio provided'}</p>
            <p className="text-sm text-text-secondary">
              {user.location?.state || user.location?.district || user.location?.taluk
                ? `${user.location?.state || ''}, ${user.location?.district || ''}, ${user.location?.taluk || ''}`
                : 'No location provided'}
            </p>
          </div>
        </div>

        <div className="self-end sm:self-auto">
          {!isEditing && (
            <Button variant="primary" onClick={handleEdit} className="flex items-center space-x-2">
              <Icon name="Edit" size={18} />
              <span>Edit</span>
            </Button>
          )}
        </div>
      </div>


      {isEditing && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-text-primary">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-border rounded"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border border-border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border border-border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">District</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-2 border border-border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">Taluk</label>
            <input
              type="text"
              value={taluk}
              onChange={(e) => setTaluk(e.target.value)}
              className="w-full p-2 border border-border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              className="w-full border-b border-border"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileHeader;