// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import Button from '../../../components/ui/Button';
// import Input from '../../../components/ui/Input';
// import Icon from '../../../components/AppIcon';

// const OnboardingForm = ({ onComplete, isCompleted, existingData }) => {
//   const [formData, setFormData] = useState({
//     name: existingData?.name || '',
//     location: existingData?.location || { state: '', district: '', taluk: '' },
//     bio: existingData?.bio || '',
//     phone: existingData?.phone || '',
//     avatar: existingData?.avatar || '',
//   });
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const storedUser = localStorage.getItem('generalUser');
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setFormData({
//         name: user.name || '',
//         location: user.location || { state: '', district: '', taluk: '' },
//         bio: user.bio || '',
//         phone: user.phone || '',
//         avatar: user.avatar || '',
//       });
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('location.')) {
//       const field = name.split('.')[1];
//       setFormData((prev) => ({
//         ...prev,
//         location: { ...prev.location, [field]: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleFileChange = (e) => {
//     setAvatarFile(e.target.files[0]);
//   };

//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'your_cloudinary_preset'); // Replace with your preset
//     try {
//       const res = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);
//       return res.data.secure_url;
//     } catch (err) {
//       console.error('Cloudinary upload failed:', err);
//       throw new Error('Failed to upload avatar');
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Full name is required';
//     if (!formData.location.state.trim()) newErrors['location.state'] = 'State is required';
//     if (!formData.location.district.trim()) newErrors['location.district'] = 'District is required';
//     if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
//       newErrors.phone = 'Please enter a valid 10-digit phone number';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm() || isCompleted) {
//       if (isCompleted) toast.info('Onboarding already completed.');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('authToken');
//       const userId = existingData?._id;
//       if (!userId || !token) {
//         toast.error('User ID or token missing. Please log in again.');
//         return;
//       }
//       let avatarUrl = formData.avatar;
//       if (avatarFile) {
//         avatarUrl = await uploadToCloudinary(avatarFile);
//       }
//       const res = await axios.post(
//         'http://localhost:5000/api/reporter/onboarding',
//         {
//           userId,
//           name: formData.name,
//           location: formData.location,
//           bio: formData.bio,
//           phone: formData.phone,
//           avatar: avatarUrl,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const updatedUser = {
//         ...existingData,
//         ...res.data.user,
//         reporterFormSubmitted: true,
//       };
//       localStorage.setItem('generalUser', JSON.stringify(updatedUser));
//       onComplete(updatedUser);
//     } catch (err) {
//       console.error('Error submitting onboarding:', err.response?.data || err.message);
//       toast.error(err.response?.data?.message || 'Failed to submit onboarding.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isCompleted) {
//     return (
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-lg shadow-card p-8 text-center">
//           <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
//             <Icon name="CheckCircle" size={32} color="white" />
//           </div>
//           <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
//             Profile Setup Complete!
//           </h2>
//           <p className="text-text-secondary mb-6">
//             Welcome to NewsHub, {existingData?.name}! Your profile has been submitted for approval.
//           </p>
//           <div className="bg-surface rounded-lg p-4 mb-6">
//             <div className="space-y-2 text-left">
//               <div className="flex justify-between">
//                 <span className="text-text-secondary">Name:</span>
//                 <span className="text-text-primary font-medium">{existingData?.name}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-text-secondary">Location:</span>
//                 <span className="text-text-primary font-medium">
//                   {existingData?.location?.district}, {existingData?.location?.state}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-text-secondary">Email:</span>
//                 <span className="text-text-primary font-medium">{existingData?.email}</span>
//               </div>
//             </div>
//           </div>
//           <p className="text-text-secondary text-sm">
//             Your application is pending admin approval. You’ll be notified once approved.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="mb-6">
//         <h1 className="text-2xl font-heading font-semibold text-text-primary">
//           Become a NewsHub Reporter
//         </h1>
//         <p className="text-text-secondary">
//           Fill out your profile to apply as a news reporter
//         </p>
//       </div>
//       <div className="bg-white rounded-lg shadow-card p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
//                 Full Name *
//               </label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 className={errors.name ? 'border-error focus:ring-error/20' : ''}
//               />
//               {errors.name && (
//                 <p className="mt-1 text-sm text-error flex items-center space-x-1">
//                   <Icon name="AlertCircle" size={14} />
//                   <span>{errors.name}</span>
//                 </p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
//                 Phone Number (Optional)
//               </label>
//               <Input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 className={errors.phone ? 'border-error focus:ring-error/20' : ''}
//               />
//               {errors.phone && (
//                 <p className="mt-1 text-sm text-error flex items-center space-x-1">
//                   <Icon name="AlertCircle" size={14} />
//                   <span>{errors.phone}</span>
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label htmlFor="location.state" className="block text-sm font-medium text-text-primary mb-2">
//                 State *
//               </label>
//               <Input
//                 id="location.state"
//                 name="location.state"
//                 type="text"
//                 placeholder="Enter state"
//                 value={formData.location.state}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 className={errors['location.state'] ? 'border-error focus:ring-error/20' : ''}
//               />
//               {errors['location.state'] && (
//                 <p className="mt-1 text-sm text-error flex items-center space-x-1">
//                   <Icon name="AlertCircle" size={14} />
//                   <span>{errors['location.state']}</span>
//                 </p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="location.district" className="block text-sm font-medium text-text-primary mb-2">
//                 District *
//               </label>
//               <Input
//                 id="location.district"
//                 name="location.district"
//                 type="text"
//                 placeholder="Enter district"
//                 value={formData.location.district}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 className={errors['location.district'] ? 'border-error focus:ring-error/20' : ''}
//               />
//               {errors['location.district'] && (
//                 <p className="mt-1 text-sm text-error flex items-center space-x-1">
//                   <Icon name="AlertCircle" size={14} />
//                   <span>{errors['location.district']}</span>
//                 </p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="location.taluk" className="block text-sm font-medium text-text-primary mb-2">
//                 Taluk (Optional)
//               </label>
//               <Input
//                 id="location.taluk"
//                 name="location.taluk"
//                 type="text"
//                 placeholder="Enter taluk"
//                 value={formData.location.taluk}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="bio" className="block text-sm font-medium text-text-primary mb-2">
//               Bio (Optional)
//             </label>
//             <textarea
//               id="bio"
//               name="bio"
//               rows={4}
//               placeholder="Tell us about yourself and your reporting interests..."
//               value={formData.bio}
//               onChange={handleInputChange}
//               disabled={isLoading}
//               className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
//             />
//           </div>
//           <div>
//             <label htmlFor="avatar" className="block text-sm font-medium text-text-primary mb-2">
//               Profile Picture (Optional)
//             </label>
//             <Input
//               id="avatar"
//               name="avatar"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               disabled={isLoading}
//               className="w-full"
//             />
//           </div>
//           <div className="bg-surface rounded-lg p-4">
//             <div className="flex items-start space-x-3">
//               <Icon name="Info" size={20} className="text-accent mt-0.5" />
//               <div>
//                 <h3 className="text-sm font-medium text-text-primary mb-1">
//                   Getting Started Tips
//                 </h3>
//                 <ul className="text-sm text-text-secondary space-y-1">
//                   <li>• Ensure your location is accurate for local news coverage</li>
//                   <li>• All articles will be reviewed before publication</li>
//                   <li>• You can edit your profile later after approval</li>
//                   <li>• Include at least one media attachment with each article</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <Button
//             type="submit"
//             variant="primary"
//             loading={isLoading}
//             fullWidth
//             className="py-3 font-medium"
//           >
//             {isLoading ? 'Submitting Application...' : 'Submit Reporter Application'}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OnboardingForm;


import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
const URL = import.meta.env.VITE_API_BASE_URL;

const OnboardingForm = ({ onComplete, isCompleted, existingData }) => {
  const [formData, setFormData] = useState({
    name: existingData?.name || '',
    location: existingData?.location || { state: '', district: '', taluk: '' },
    bio: existingData?.bio || '',
    phone: existingData?.phone || '',
    avatar: existingData?.avatar || '/assets/images/no_image.png',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('generalUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData({
        name: user.name || '',
        location: user.location || { state: '', district: '', taluk: '' },
        bio: user.bio || '',
        phone: user.phone || '',
        avatar: user.avatar || '/assets/images/no_image.png',
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.location.state.trim()) newErrors['location.state'] = 'State is required';
    if (!formData.location.district.trim()) newErrors['location.district'] = 'District is required';
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (isCompleted) {
      toast.info('Onboarding already completed.');
      onComplete(existingData); // Trigger navigation back to dashboard
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Token missing. Please log in again.');
        return;
      }
      const res = await axios.post(
        `${URL}/user/reporter-request`,
        {
          name: formData.name,
          location: formData.location,
          bio: formData.bio,
          phone: formData.phone,
          avatar: formData.avatar,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.data.success) {
        throw new Error(res.data.message || 'Failed to submit onboarding.');
      }
      const updatedUser = {
        ...existingData,
        ...res.data.user,
        reporterFormSubmitted: true,
      };
      localStorage.setItem('generalUser', JSON.stringify(updatedUser));
      toast.success('Reporter application submitted successfully!');
      console.log('Calling onComplete with updatedUser:', updatedUser);
      onComplete(updatedUser);
    } catch (err) {
      console.error('Error submitting onboarding:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || 'Failed to submit onboarding.';
      if (err.response?.status === 400 && errorMessage.includes('already submitted')) {
        toast.info('Reporter application already submitted.');
        onComplete({ ...existingData, reporterFormSubmitted: true });
        return; 
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isCompleted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-8 md:p-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-heading font-semibold text-text-primary">
            Become a NewsHub Reporter
          </h1>
          <p className="text-text-secondary mt-3">
            Fill out your profile to apply as a news reporter
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                Full Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                className={errors.name ? 'border-error focus:ring-error/20' : ''}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                Phone Number (Optional)
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isLoading}
                className={errors.phone ? 'border-error focus:ring-error/20' : ''}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Location Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* State */}
            <div>
              <label htmlFor="location.state" className="block text-sm font-medium text-text-primary mb-2">
                State *
              </label>
              <Input
                id="location.state"
                name="location.state"
                type="text"
                placeholder="Enter state"
                value={formData.location.state}
                onChange={handleInputChange}
                disabled={isLoading}
                className={errors['location.state'] ? 'border-error focus:ring-error/20' : ''}
              />
              {errors['location.state'] && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors['location.state']}</span>
                </p>
              )}
            </div>

            {/* District */}
            <div>
              <label htmlFor="location.district" className="block text-sm font-medium text-text-primary mb-2">
                District *
              </label>
              <Input
                id="location.district"
                name="location.district"
                type="text"
                placeholder="Enter district"
                value={formData.location.district}
                onChange={handleInputChange}
                disabled={isLoading}
                className={errors['location.district'] ? 'border-error focus:ring-error/20' : ''}
              />
              {errors['location.district'] && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors['location.district']}</span>
                </p>
              )}
            </div>

            {/* Taluk */}
            <div>
              <label htmlFor="location.taluk" className="block text-sm font-medium text-text-primary mb-2">
                Taluk (Optional)
              </label>
              <Input
                id="location.taluk"
                name="location.taluk"
                type="text"
                placeholder="Enter taluk"
                value={formData.location.taluk}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-text-primary mb-2">
              Bio (Optional)
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              placeholder="Tell us about yourself and your reporting interests..."
              value={formData.bio}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-accent mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-1">Getting Started Tips</h3>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Ensure your location is accurate for local news coverage</li>
                  <li>• All articles will be reviewed before publication</li>
                  <li>• You can edit your profile later after approval</li>
                  <li>• Include at least one media attachment with each article</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            fullWidth
            className="py-3 font-medium"
          >
            {isLoading ? 'Submitting Application...' : 'Submit Reporter Application'}
          </Button>
        </form>
      </div>
    </div>
  );

};

export default OnboardingForm;