import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const MyArticles = ({ articles, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  console.log("filteredArticles", articles);

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
      // Replace /upload/ with /upload/so_0/ to get the first frame as a thumbnail
      return mediaUrl.replace('/upload/', '/upload/so_0/').replace(/\.\w+$/, '.jpg');
    }
    return mediaUrl;
  };

  const filteredArticles = articles?.filter(article => {
    const matchesSearch = article?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article?.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article?.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-success bg-success/10';
      case 'rejected': return 'text-error bg-error/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-surface';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'pending': return 'Clock';
      default: return 'FileText';
    }
  };

  const stats = {
    total: articles?.length || 0,
    approved: articles?.filter(a => a.status === 'approved').length || 0,
    pending: articles?.filter(a => a.status === 'pending').length || 0,
    rejected: articles?.filter(a => a.status === 'rejected').length || 0,
    totalViews: articles?.reduce((sum, a) => sum + (a.views || 0), 0) || 0
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-text-primary">
          My Articles
        </h1>
        <p className="text-text-secondary">
          Manage your published and draft articles
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total</p>
              <p className="text-xl font-semibold text-text-primary">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Approved</p>
              <p className="text-xl font-semibold text-text-primary">{stats.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Pending</p>
              <p className="text-xl font-semibold text-text-primary">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="XCircle" size={20} className="text-error" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Rejected</p>
              <p className="text-xl font-semibold text-text-primary">{stats.rejected}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Views</p>
              <p className="text-xl font-semibold text-text-primary">{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background text-sm"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-lg shadow-card">
        {filteredArticles.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="FileText" size={48} className="mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No articles found' : 'No articles yet'}
            </h3>
            <p className="text-text-secondary">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filter criteria.' : 'Start by creating your first news article.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-light">
            {filteredArticles.map((article) => (
              <div key={article._id} className="p-6 hover:bg-surface/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      {article.media?.[0] && typeof article.media[0] === 'string' ? (
                        <img
                          src={getThumbnailUrl(article.media[0])}
                          alt="Article Thumbnail"
                          className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/80x80?text=No+Image';
                            console.log('Image failed to load:', article.media[0]);
                          }}
                        />
                      ) : (
                        <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gray-200 flex items-center justify-center rounded-md">
                          <Icon name="Image" size={30} />
                        </div>
                      )}
                      <h3 className="text-lg font-medium text-text-primary line-clamp-2 flex-1">
                        {article.title}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                        <Icon name={getStatusIcon(article.status)} size={12} className="mr-1" />
                        {article?.status?.charAt(0).toUpperCase() + article?.status?.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-text-secondary line-clamp-2 mb-3">
                      {article.content}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Tag" size={14} />
                        <span>{article.category}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={14} />
                        <span>{article.views?.toLocaleString() || 0} views</span>
                      </div>
                      {article.media?.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Paperclip" size={14} />
                          <span>{article.media.length} attachment{article.media.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <Icon name="Eye" size={16} className="mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(article.id)}
                      className="text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={16} className="mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article Preview Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
          <div className="bg-white rounded-lg shadow-modal w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Article Preview
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedArticle(null)}
                  className="p-1"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-medium text-text-primary">
                      {selectedArticle.title}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedArticle.status)}`}>
                      <Icon name={getStatusIcon(selectedArticle.status)} size={14} className="mr-1" />
                      {selectedArticle?.status?.charAt(0).toUpperCase() + selectedArticle?.status?.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{new Date(selectedArticle.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Tag" size={14} />
                      <span>{selectedArticle.category}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} />
                      <span>{selectedArticle.views?.toLocaleString() || 0} views</span>
                    </div>
                  </div>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  <div className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                    {selectedArticle.content}
                  </div>
                </div>
                
                {selectedArticle.media?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-2">
                      Media Attachments ({selectedArticle.media.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                                className="max-h-full w-auto object-contain"
                                onError={(e) => {
                                  e.target.src = 'https://placehold.co/150x150?text=No+Image';
                                  console.log(`Image load failed: ${media}`);
                                }}
                              />
                            )
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              <Icon name="Image" size={32} className="text-text-secondary" />
                              <p className="text-xs text-text-secondary mt-1">Invalid Media</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-1">
                  <div className="text-sm font-medium text-text-secondary">Tags:</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedArticle.tags?.length > 0 ? (
                      selectedArticle.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-text-secondary">No tags</span>
                    )}
                  </div>
                </div>

                {/* Extra Fields */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-2">
                    <Icon name="ThumbsUp" size={16} />
                    <span>{selectedArticle.likes || 0} Likes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="ThumbsDown" size={16} />
                    <span>{selectedArticle.dislikes || 0} Dislikes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MessageSquare" size={16} />
                    <span>{selectedArticle.comments || 0} Comments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Share2" size={16} />
                    <span>{selectedArticle.shares || 0} Shares</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>{selectedArticle.readTime || 0} min read</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name={selectedArticle.isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
                    <span>{selectedArticle.isBookmarked ? "Bookmarked" : "Not Bookmarked"}</span>
                  </div>
                </div>

                {/* Translations (optional Tamil example) */}
                {selectedArticle?.translations?.ta?.title && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-1">Tamil Title:</h4>
                    <p className="text-text-secondary">{selectedArticle.translations.ta.title}</p>
                  </div>
                )}
                {selectedArticle?.translations?.ta?.content && (
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold text-text-primary mb-1">Tamil Content:</h4>
                    <p className="text-text-secondary whitespace-pre-wrap">{selectedArticle.translations.ta.content}</p>
                  </div>
                )}

                {/* Reports */}
                {selectedArticle?.reports?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-2">Reports</h4>
                    <ul className="text-sm list-disc ml-5 text-text-secondary space-y-1">
                      {selectedArticle.reports.map((report, idx) => (
                        <li key={idx}>
                          {report.reason} – {new Date(report.reportedAt).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
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

export default MyArticles;