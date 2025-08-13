import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const URL = import.meta.env.VITE_API_BASE_URL;

const NewsManagement = ({ articles, onUpdateStatus, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Function to determine if media is a video based on URL extension
  const isVideoMedia = (mediaUrl) => {
    if (!mediaUrl || typeof mediaUrl !== 'string') return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => mediaUrl.toLowerCase().endsWith(ext));
  };

  // Function to generate Cloudinary thumbnail URL for videos
  const getThumbnailUrl = (mediaUrl) => {
    if (!mediaUrl || typeof mediaUrl !== 'string') return 'https://placehold.co/80x80?text=No+Image';
    if (isVideoMedia(mediaUrl)) {
      return mediaUrl.replace('/upload/', '/upload/so_0/').replace(/\.\w+$/, '.jpg');
    }
    return mediaUrl;
  };

  // Filter out null/undefined articles and ensure valid data
  const filteredArticles = Array.isArray(articles)
    ? articles
        .filter((article) => article && typeof article === 'object' && article._id)
        .filter((article) => {
          const matchesSearch =
            article?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article?.author?.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesStatus = statusFilter === 'all' || article?.status === statusFilter;
          return matchesSearch && matchesStatus;
        })
    : [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-success bg-success/10';
      case 'rejected':
        return 'text-error bg-error/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      default:
        return 'text-text-secondary bg-surface';
    }
  };

  const handleStatusUpdate = (id, status) => {
    onUpdateStatus(id, status);
    setSelectedArticle(null);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(
        `${URL}/news/${selectedArticle._id}`,
        {
          title: selectedArticle.title,
          content: selectedArticle.content,
          category: selectedArticle.category,
          tags:
            typeof selectedArticle.tags === 'string'
              ? selectedArticle.tags.split(',').map((tag) => tag.trim())
              : selectedArticle.tags,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Article updated:', selectedArticle);
      setIsEditing(false);
      toast.success('Article updated successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update article');
    }
  };

  const handleChange = (field, value) => {
    setSelectedArticle((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6 p-4 sm:p-0">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-semibold text-text-primary">
            News Management
          </h1>
          <p className="text-sm sm:text-base text-text-secondary">Review and manage news articles</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full text-base"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-8 py-2 border border-input rounded-md bg-background text-base w-full sm:w-auto"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-border-light">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Article</th>
                <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Content</th>
                <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Author</th>
                <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Date</th>
                <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Views</th>
                <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article._id} className="border-b border-border-light hover:bg-surface/50">
                  <td className="py-3 px-4">
                    <div className="flex gap-3 items-start">
                      {article.media?.[0] && typeof article.media[0] === 'string' ? (
                        <img
                          src={getThumbnailUrl(article.media[0])}
                          alt="Thumbnail"
                          className="w-16 h-16 object-cover rounded-md"
                          width={64}
                          height={64}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/64x64?text=No+Image';
                            console.log('Image failed to load:', article.media[0]);
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                          <Icon name="Image" size={20} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <h3 className="font-medium text-text-primary text-sm line-clamp-2">
                        {article.title || 'No Title'}
                      </h3>
                      <p className="text-xs text-text-secondary line-clamp-1 mt-1">
                        {article.content || 'No Content'}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-secondary text-sm">
                    {article.reporter?.name || 'Unknown Author'}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        article.status
                      )}`}
                    >
                      {article?.status
                        ? article.status.charAt(0).toUpperCase() + article.status.slice(1)
                        : 'Unknown'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary text-sm">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-text-secondary text-sm">
                    {article.views?.toLocaleString() || 0}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedArticle(article)}
                        className="min-h-[40px] text-sm"
                      >
                        <Icon name="Eye" size={16} className="mr-1" />
                        View
                      </Button>
                      {article.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(article._id, 'approved')}
                            className="text-success hover:bg-success/10 min-h-[40px]"
                          >
                            <Icon name="Check" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(article._id, 'rejected')}
                            className="text-error hover:bg-error/10 min-h-[40px]"
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(article._id)}
                        className="text-error hover:bg-error/10 min-h-[40px]"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="sm:hidden space-y-4">
        {filteredArticles.map((article) => (
          <div
            key={article._id}
            className="bg-white rounded-lg shadow-card p-4 border border-border-light"
          >
            <div className="flex gap-4">
              {article.media?.[0] && typeof article.media[0] === 'string' ? (
                <img
                  src={getThumbnailUrl(article.media[0])}
                  alt="Thumbnail"
                  className="w-20 h-20 object-cover rounded-md"
                  width={80}
                  height={80}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/80x80?text=No+Image';
                    console.log('Image failed to load:', article.media[0]);
                  }}
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-md">
                  <Icon name="Image" size={20} />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-medium text-text-primary text-base line-clamp-2">
                  {article.title || 'No Title'}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2 mt-1">
                  {article.content || 'No Content'}
                </p>
              </div>
            </div>
            <div className="mt-3 space-y-2 text-sm text-text-secondary">
              <p>
                <span className="font-medium">Author:</span> {article.reporter?.name || 'Unknown Author'}
              </p>
              <p>
                <span className="font-medium">Status:</span>{' '}
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    article.status
                  )}`}
                >
                  {article?.status
                    ? article.status.charAt(0).toUpperCase() + article.status.slice(1)
                    : 'Unknown'}
                </span>
              </p>
              <p>
                <span className="font-medium">Date:</span>{' '}
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Views:</span> {article.views?.toLocaleString() || 0}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedArticle(article)}
                className="min-h-[40px] text-sm flex-1"
              >
                <Icon name="Eye" size={16} className="mr-1" />
                View
              </Button>
              {article.status === 'pending' && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStatusUpdate(article._id, 'approved')}
                    className="text-success hover:bg-success/10 min-h-[40px] flex-1"
                  >
                    <Icon name="Check" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStatusUpdate(article._id, 'rejected')}
                    className="text-error hover:bg-error/10 min-h-[40px] flex-1"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(article._id)}
                className="text-error hover:bg-error/10 min-h-[40px] flex-1"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Preview Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg shadow-modal w-full max-w-[90vw] sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg sm:text-xl font-heading font-semibold text-text-primary">
                  {isEditing ? 'Edit Article' : 'Article Preview'}
                </h2>
                <div className="flex items-center space-x-2">
                  {!isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="min-h-[40px] text-sm"
                    >
                      <Icon name="Edit" size={16} className="mr-1" />
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedArticle(null);
                      setIsEditing(false);
                    }}
                    className="p-2"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div className="space-y-1">
                  <p className="font-semibold text-text-primary text-sm">Title:</p>
                  {isEditing ? (
                    <Input
                      value={selectedArticle.title || ''}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="w-full text-base"
                    />
                  ) : (
                    <p className="text-base">{selectedArticle.title || 'No Title'}</p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <p className="font-semibold text-text-primary text-sm mb-2">Category:</p>
                  {isEditing ? (
                    <Input
                      value={selectedArticle.category || ''}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full text-base"
                    />
                  ) : (
                    <p className="text-base">{selectedArticle.category || 'No Category'}</p>
                  )}
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary border-b pb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{new Date(selectedArticle.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span>{selectedArticle.views?.toLocaleString() || 0} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="ThumbsUp" size={14} />
                    <span>{selectedArticle.likes || 0} Likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="ThumbsDown" size={14} />
                    <span>{selectedArticle.dislikes || 0} Dislikes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Share2" size={14} />
                    <span>{selectedArticle.shares || 0} Shares</span>
                  </div>
                </div>

                {/* Media Preview */}
                {selectedArticle.media?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-2">
                      Media Attachments ({selectedArticle.media?.length || 0})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedArticle.media.map((media, index) => (
                        <div
                          key={index}
                          className="h-48 bg-surface rounded-lg flex items-center justify-center overflow-hidden"
                        >
                          {typeof media === 'string' ? (
                            isVideoMedia(media) ? (
                              <video
                                src={media}
                                controls
                                className="max-h-full w-auto object-contain"
                                onError={(e) => console.log(`Video load failed: ${media}`, e)}
                              />
                            ) : (
                              <img
                                src={media}
                                alt={`Media ${index + 1}`}
                                className="max-h-full w-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://placehold.co/150x150?text=No+Image';
                                  console.log('Image failed to load:', media);
                                }}
                              />
                            )
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              <Icon name="Image" size={32} className="text-text-secondary" />
                              <p className="text-sm text-text-secondary mt-1">Invalid Media</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-border">
                  <div className="space-y-1">
                    <p className="font-semibold text-text-primary text-sm mb-2">Tags:</p>
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          value={selectedArticle.tags || ''}
                          onChange={(e) => handleChange('tags', e.target.value)}
                          placeholder="Enter tags (comma-separated)"
                          className="w-full text-base"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(selectedArticle.tags)
                          ? selectedArticle.tags
                          : typeof selectedArticle.tags === 'string'
                            ? selectedArticle.tags.split(',').map((tag) => tag.trim())
                            : []
                        ).length > 0 ? (
                          (Array.isArray(selectedArticle.tags)
                            ? selectedArticle.tags
                            : selectedArticle.tags.split(',').map((tag) => tag.trim())
                          ).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-text-secondary text-sm">No tags</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 text-text-secondary leading-relaxed mt-4">
                  <div>
                    <p className="font-semibold text-text-primary text-sm mb-2">Content:</p>
                    {isEditing ? (
                      <textarea
                        value={selectedArticle.content || ''}
                        onChange={(e) => handleChange('content', e.target.value)}
                        className="w-full h-32 p-3 border border-input rounded-md bg-background text-base"
                      />
                    ) : (
                      <p className="text-base">{selectedArticle.content || 'No Content'}</p>
                    )}
                  </div>
                </div>

                {/* Edit Mode Buttons */}
                {isEditing && (
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-border-light">
                    <Button
                      variant="primary"
                      onClick={handleSave}
                      className="flex-1 min-h-[48px] text-base"
                    >
                      <Icon name="Save" size={18} className="mr-2" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 min-h-[48px] border-error text-error hover:bg-error hover:text-white text-base"
                    >
                      <Icon name="X" size={18} className="mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManagement;