// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import Icon from '../../../components/AppIcon';
// import Image from '../../../components/AppImage';
// import Button from '../../../components/ui/Button';
// import Input from '../../../components/ui/Input';

// const ProfileHeader = ({ user, onUpdateProfile }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({
//     name: user?.name || '',
//     bio: user?.bio || '',
//     location: user?.location || '',
//   });
//   const [avatarItem, setAvatarItem] = useState({ file: null, url: '' });
//   const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Update avatar preview when user.avatar changes
//   useEffect(() => {
//     setAvatarPreview(user?.avatar || null);
//   }, [user?.avatar]);

//   if (!user) return null;

//   const handleAvatarFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size exceeds 5MB limit');
//         return;
//       }
//       if (!file.type.startsWith('image/')) {
//         toast.error('Only images are allowed');
//         return;
//       }
//       setAvatarItem({ file, url: '' });
//       setAvatarPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleAvatarUrlChange = (e) => {
//     const url = e.target.value;
//     setAvatarItem({ file: null, url });
//     setAvatarPreview(url);
//   };

//   const handleInputChange = (field, value) => {
//     setEditData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = () => {
//     if (avatarItem.file && avatarItem.url) {
//       toast.error('Please choose either a file or a URL, not both');
//       return;
//     }
//     onUpdateProfile(editData, avatarItem);
//     setIsEditing(false);
//     setAvatarItem({ file: null, url: '' });
//   };

//   const handleCancel = () => {
//     setEditData({
//       name: user.name || '',
//       bio: user.bio || '',
//       location: user.location || '',
//     });
//     setAvatarItem({ file: null, url: '' });
//     setAvatarPreview(user.avatar || null);
//     setIsEditing(false);
//   };

//   const handleAvatarClick = () => {
//     if (!isEditing && user.avatar) {
//       setIsModalOpen(true);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <div className="bg-background border border-border rounded-lg p-6 mb-6">
//         <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
//           <div className="relative">
//             <div className="w-24 h-24 rounded-full overflow-hidden bg-surface border-4 border-accent/20">
//               <Image
//                 src={avatarPreview || user.initials}
//                 alt={user.name}
//                 className="w-full h-full object-cover cursor-pointer"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   e.target.nextSibling.style.display = 'flex';
//                 }}
//               />
//               <div className="w-full h-full bg-accent text-accent-foreground text-xl font-medium flex items-center justify-center hidden">
//                 {user.initials}
//               </div>
//               {isEditing && (
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleAvatarFileChange}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   title="Upload avatar"
//                 />
//               )}
//             </div>
//           </div>
//           <div className="flex-1 w-full md:w-auto">
//             {!isEditing ? (
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <h1 className="text-2xl font-heading font-bold text-text-primary">{user.name}</h1>
//                   <Button variant="ghost" onClick={() => setIsEditing(true)} className="text-sm" iconName="Edit2" iconSize={16}>
//                     Edit Profile
//                   </Button>
//                 </div>
//                 <p className="text-text-secondary">{user.bio || 'No bio provided'}</p>
//                 <div className="flex items-center space-x-4 text-sm text-text-secondary">
//                   <div className="flex items-center space-x-1">
//                     <Icon name="MapPin" size={16} />
//                     <span>{user.location || 'No location provided'}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Icon name="Calendar" size={16} />
//                     <span>Joined {user.joinDate || 'Unknown'}</span>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-heading font-semibold text-text-primary">Edit Profile</h2>
//                   <div className="flex space-x-2">
//                     <Button variant="ghost" onClick={handleCancel} className="text-sm">Cancel</Button>
//                     <Button variant="primary" onClick={handleSave} className="text-sm">Save</Button>
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   <Input type="text" placeholder="Display Name" value={editData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
//                   <Input type="text" placeholder="Bio" value={editData.bio} onChange={(e) => handleInputChange('bio', e.target.value)} />
//                   <Input type="text" placeholder="Location" value={editData.location} onChange={(e) => handleInputChange('location', e.target.value)} />
//                   {/* <Input
//                     type="url"
//                     placeholder="Avatar URL (optional)"
//                     value={avatarItem.url}
//                     onChange={handleAvatarUrlChange}
//                   /> */}
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* <div className="flex md:flex-col space-x-6 md:space-x-0 md:space-y-4 text-center">
//             <div>
//               <div className="text-2xl font-bold text-accent">{user.stats?.articlesRead || 0}</div>
//               <div className="text-xs text-text-secondary">Articles Read</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-accent">{user.stats?.bookmarks || 0}</div>
//               <div className="text-xs text-text-secondary">Bookmarks</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-accent">{user.stats?.comments || 0}</div>
//               <div className="text-xs text-text-secondary">Comments</div>
//             </div>
//           </div> */}
//         </div>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
//           <div className="bg-background p-4 rounded-lg max-w-[90%] max-h-[90%]">
//             <Image
//               src={user.avatar}
//               alt={user.name}
//               className="max-w-full max-h-[80vh] object-contain"
//             />
//             <Button variant="primary" onClick={closeModal} className="mt-4 w-full">
//               Close
//             </Button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfileHeader;


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
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            {avatarError || !user.avatar ? (
              <div className="w-full h-full bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center">
                {user.initials || user.name?.slice(0, 2).toUpperCase() || 'U'}
              </div>
            ) : (
              <Image
                src={user.avatar || '/assets/images/avatar-placeholder.jpg'}
                alt={user.name || 'User'}
                className="w-full h-full object-cover"
                onError={() => setAvatarError(true)}
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
        {!isEditing && (
          <Button variant="primary" onClick={handleEdit} className="flex items-center space-x-2">
            <Icon name="Edit" size={18} />
            <span>Edit</span>
          </Button>
        )}
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