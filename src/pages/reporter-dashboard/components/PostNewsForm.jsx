import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import {uploadToCloudinary} from "../components/utils/uploadToCloudinary"
import Icon from '../../../components/AppIcon';
import { toast } from 'react-toastify';
const URL = import.meta.env.VITE_API_BASE_URL;
const PostNewsForm = ({ onSubmit, reporterData }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    tags: '',
    state: reporterData?.state || '',
    district: reporterData?.district || '',
  });
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [locationStage, setLocationStage] = useState('state');
  const [selectedState, setSelectedState] = useState(reporterData?.state || '');
  const [allDistricts, setAllDistricts] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${URL}/category/get`);
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        toast.error('Failed to load categories.');
      }
    };

    const fetchDistricts = async () => {
      try {
        const res = await fetch(`${URL}/location/districts`);
        const data = await res.json();
        const districts = Array.isArray(data) ? data : data.districts || [];
        setAllDistricts(districts);
        if (selectedState) {
          setDistricts(districts.filter((d) => d.state === selectedState));
        }
      } catch (err) {
        console.error('Failed to fetch districts:', err);
        toast.error('Failed to load districts.');
        setAllDistricts([]);
      }
    };

    fetchCategories();
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (selectedState) {
      setDistricts(allDistricts.filter((d) => d.state === selectedState));
    } else {
      setDistricts([]);
    }
  }, [selectedState, allDistricts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileSelect = (files) => {
    const file = files[0];
    if (!file) return;
    const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
    const isValidSize = file.size <= 80 * 1024 * 1024; // Changed to 20MB
    if (!isValidType || !isValidSize) {
      toast.error('Invalid file. Upload an image or video under 80MB.');
      return;
    }
    setMedia([{ file }]);
    if (errors.media) {
      setErrors((prev) => ({ ...prev, media: '' }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeMedia = (index) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (!formData.district) {
      newErrors.district = 'District is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (media.length === 0) {
      newErrors.media = 'At least one media attachment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const result = await onSubmit({
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t !== '') : [],
        media,
      });

      if (result.success) {
        setFormData({
          title: '',
          content: '',
          category: 'General',
          tags: '',
          state: reporterData?.state || '',
          district: reporterData?.district || '',
        });
        setMedia([]);
        setSelectedState(reporterData?.state || '');
        setLocationStage('state');
        setErrors({});
        toast.success('News submitted successfully!');
      } else {
        toast.error(result.message || 'Failed to post news.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error?.message || 'Failed to post news.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-semibold text-text-primary">
          Post News Article
        </h1>
        <p className="text-text-secondary">
          Share important news with your community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-medium text-text-primary mb-4">Article Details</h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
                Article Title *
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter a compelling news headline..."
                value={formData.title}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full ${errors.title ? 'border-error focus:ring-error/20' : ''}`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.title}</span>
                </p>
              )}
              <p className="mt-1 text-xs text-text-secondary">
                {formData.title.length}/100 characters
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    errors.category ? 'border-error' : ''
                  }`}
                >
                  <option value="">Select a category</option>
                  {Array.isArray(categories) &&
                    categories.map((category) => (
                      <option key={category._id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-error flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} />
                    <span>{errors.category}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-text-primary mb-2">
                  Location *
                </label>
                <select
                  id="location"
                  value={locationStage === 'state' ? selectedState : formData.district}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (locationStage === 'state') {
                      setSelectedState(value);
                      setFormData((prev) => ({ ...prev, state: value, district: '' }));
                      setLocationStage('district');
                    } else {
                      setFormData((prev) => ({ ...prev, district: value }));
                    }
                  }}
                  className={`w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    errors.state || errors.district ? 'border-error' : ''
                  }`}
                  disabled={isLoading}
                >
                  <option value="">
                    {locationStage === 'district' ? '-- Select District --' : '-- Select State --'}
                  </option>
                  {locationStage === 'state' &&
                    [...new Set(allDistricts.map((loc) => loc.state))]
                      .filter(Boolean)
                      .map((state, i) => (
                        <option key={i} value={state}>
                          {state}
                        </option>
                      ))}
                  {locationStage === 'district' &&
                    districts.map((dist) => (
                      <option key={dist._id} value={dist.name}>
                        {dist.name}
                      </option>
                    ))}
                </select>
                {(errors.state || errors.district) && (
                  <p className="mt-1 text-sm text-error flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} />
                    <span>{errors.state || errors.district}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-text-primary mb-2">
                Article Content *
              </label>
              <textarea
                id="content"
                name="content"
                rows={8}
                placeholder="Write your news article here. Include all relevant details, facts, and quotes..."
                value={formData.content}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`flex w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none ${
                  errors.content ? 'border-error' : 'border-input'
                }`}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.content}</span>
                </p>
              )}
              <p className="mt-1 text-xs text-text-secondary">
                {formData.content.length} characters (minimum 50 required)
              </p>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-text-primary mb-2">
                Tags (Optional)
              </label>
              <Input
                id="tags"
                name="tags"
                type="text"
                placeholder="Add tags separated by commas (e.g., breaking, local, government)"
                value={formData.tags}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div
          className={`bg-white rounded-lg shadow-card p-6 border-2 ${
            dragActive ? 'border-primary' : 'border-dashed border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <h2 className="text-lg font-medium text-text-primary mb-4">Media Attachments *</h2>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            id="media-upload"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('media-upload')?.click()}
            disabled={isLoading}
          >
            <Icon name="FolderOpen" size={16} className="mr-2" />
            Choose from Gallery or Files
          </Button>
          <p className="text-xs text-text-secondary mt-2">
            Supported: JPG, PNG, MP4 (max 80MB) {/* Updated to 20MB */}
          </p>
          {errors.media && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.media}</span>
            </p>
          )}
          {media.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-text-primary mb-2">Uploaded File</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {media.map((item, index) => {
                  const isImage = item?.file
                    ? item.file.type.startsWith('image/')
                    : item?.type?.includes('image');
                  const mediaSrc = item.file ? uploadToCloudinary(item.file) : item.url;
                  return (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-surface rounded-lg flex items-center justify-center overflow-hidden">
                        {isImage ? (
                          <img src={mediaSrc} alt="Uploaded" className="w-full h-full object-cover" />
                        ) : (
                          <video src={mediaSrc} controls className="w-full h-full object-cover" />
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedia(index)}
                        className="absolute -top-2 -right-2 bg-error text-white hover:bg-error/90 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon name="X" size={12} />
                      </Button>
                      <p className="text-xs text-text-secondary mt-1 truncate">
                        {item.file?.name || 'Media'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-accent mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-2">
                Publishing Guidelines
              </h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Ensure all information is accurate and verified</li>
                <li>• Include credible sources and quotes when possible</li>
                <li>• Articles will be reviewed by our editorial team</li>
                <li>• You'll be notified once your article is approved</li>
                <li>• Follow journalistic ethics and avoid biased reporting</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            className="flex-1 py-3 font-medium"
          >
            {isLoading ? 'Publishing Article...' : 'Publish Article'}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            className="px-8 py-3"
            onClick={() => {
              setFormData({
                title: '',
                content: '',
                category: 'General',
                tags: '',
                state: reporterData?.state || '',
                district: reporterData?.district || '',
              });
              setMedia([]);
              setErrors({});
              setSelectedState(reporterData?.state || '');
              setLocationStage('state');
            }}
          >
            Clear Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostNewsForm;
