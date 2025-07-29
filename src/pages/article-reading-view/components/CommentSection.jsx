import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useUser } from '../../../context/UserContext';

const URL = import.meta.env.VITE_API_BASE_URL;


const CommentSection = ({ articleId, comments: initialComments }) => {
  const { user, isAuthenticated } = useUser();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showReplies, setShowReplies] = useState({});
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) {
      toast.error('Please log in and enter a comment');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/comments/${articleId}`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([res.data.comment, ...comments]);
      setNewComment('');
      toast.success('Comment posted!');
    } catch (err) {
      toast.error(`Failed to post comment`);
    }
  };

  const handleSubmitReply = async (e, parentId, parentReplyId = null) => {
    e.preventDefault();
    if (!replyText.trim() || !isAuthenticated) return;

    try {
      const res = await axios.post(
        `${URL}/comments/${articleId}/reply/${parentId}`,
        { content: replyText, parentReplyId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newReply = res.data.reply;
      setComments(comments.map(comment =>
        comment._id === parentId
          ? { ...comment, replies: updateReplies(comment.replies, parentReplyId, newReply) }
          : comment
      ));
      setReplyText('');
      setReplyingTo(null);
      toast.success('Reply posted!');
    } catch (err) {
      toast.error('Failed to post reply');
    }
  };

  const updateReplies = (replies = [], parentReplyId, newReply) => {
    if (!parentReplyId) {
      return [...replies, newReply];
    }
    return replies.map(r => {
      if (r._id.toString() === parentReplyId) {
        return { ...r, replies: [...(r.replies || []), newReply] };
      }
      if (r.replies?.length) {
        return { ...r, replies: updateReplies(r.replies, parentReplyId, newReply) };
      }
      return r;
    });
  };

  const handleLikeComment = async (commentId, isReply = false, parentId = null, parentReplyId = null) => {
    if (!isAuthenticated) {
      toast.error('Please log in to like');
      return;
    }

    try {
      const res = await axios.patch(
        `${URL}/comments/${articleId}/like/${commentId}`,
        { isReply, parentId, parentReplyId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { updatedComment, isReply: isReplyResponse, commentId: updatedCommentId, likes, isLiked } = res.data;

      setComments(prevComments => {
        if (!isReplyResponse) {
          // Update top-level comment
          return prevComments.map(comment =>
            comment._id === updatedCommentId
              ? { ...comment, likes, isLiked, likedBy: updatedComment.likedBy }
              : comment
          );
        }
        // Update reply
        return prevComments.map(comment =>
          comment._id === parentId
            ? {
                ...comment,
                replies: updateLikesInReplies(comment.replies, updatedCommentId, likes, isLiked, updatedComment.likedBy),
              }
            : comment
        );
      });
      toast.success(`Comment ${isLiked ? 'liked' : 'unliked'}!`);
    } catch (err) {
      toast.error('Failed to like comment');
    }
  };

  const updateLikesInReplies = (replies, commentId, likes, isLiked, likedBy) => {
    return replies.map(r => {
      if (r._id.toString() === commentId) {
        return { ...r, likes, isLiked, likedBy };
      }
      if (r.replies?.length) {
        return { ...r, replies: updateLikesInReplies(r.replies, commentId, likes, isLiked, likedBy) };
      }
      return r;
    });
  };

  const toggleReplies = (commentId) => {
    setShowReplies(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
      case 'popular': return b.likes - a.likes;
      default: return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const renderCommentThread = (comment, level = 0, parentCommentId = null) => (
    <div key={comment._id} className={`space-y-4 ${level > 0 ? 'pl-8 border-l border-border' : ''}`} style={{ marginLeft: `${level * 16}px` }}>
      <div className="flex space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface flex-shrink-0">
          <Image
            src={comment.author.avatar}
            alt={comment.author.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center hidden">
            {comment.author.initials || comment.author.name?.slice(0, 2).toUpperCase() || 'U'}
          </div>
        </div>
        <div className="flex-1">
          <div className={`bg-surface rounded-lg p-4 ${level > 0 ? 'border border-border' : ''}`}>
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-text-primary">{comment.author.name}</span>
              <span className="text-xs text-text-secondary">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-text-primary leading-relaxed">{comment.content}</p>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={() =>
                handleLikeComment(
                  comment._id,
                  level > 0,
                  parentCommentId || comment._id,
                  level > 0 ? comment._id : null
                )
              }
              className={`flex items-center space-x-1 ${comment.isLiked ? 'text-accent' : 'text-text-secondary'}`}
            >
              <Icon name="Heart" size={16} />
              <span>{comment.likes || 0}</span>
            </button>
            <button
              onClick={() =>
                setReplyingTo({ id: comment._id, level, parentReplyId: level > 0 ? comment._id : null })
              }
              className="text-sm text-text-secondary hover:text-accent transition-colors duration-150"
            >
              Reply
            </button>
            {comment.replies?.length > 0 && (
              <button
                onClick={() => toggleReplies(comment._id)}
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-150"
              >
                {showReplies[comment._id] ? 'Hide' : 'Show'} {comment.replies.length} replies
              </button>
            )}
          </div>

          {replyingTo?.id === comment._id && (
            <form onSubmit={(e) => handleSubmitReply(e, parentCommentId || comment._id, replyingTo?.parentReplyId)} className="mt-4">
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-surface flex-shrink-0">
                  <Image
                    src={user?.avatar || '/assets/images/no_image.png'}
                    alt={user?.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${comment.author.name}...`}
                    className="w-full mb-2"
                    disabled={!isAuthenticated}
                  />
                  <div className="flex items-center space-x-2">
                    <Button type="submit" variant="primary" className="px-3 py-1 text-sm">
                      Reply
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setReplyingTo(null)} className="px-3 py-1 text-sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {showReplies[comment._id] && comment.replies?.length > 0 && (
            <div className="mt-4 space-y-3">
              {comment.replies.map(reply => renderCommentThread(reply, level + 1, parentCommentId || comment._id))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 border-t border-border">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            Comments ({comments.length})
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-border rounded-md px-2 py-1 bg-background text-text-primary focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface flex-shrink-0">
              <Image
                src={user?.avatar || '/assets/images/no_image.png'}
                alt={user?.name || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={isAuthenticated ? 'Share your thoughts...' : 'Please log in to comment...'}
                className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 bg-background text-text-primary"
                rows="3"
                disabled={!isAuthenticated}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <Icon name="MessageCircle" size={14} />
                  <span>Be respectful and constructive</span>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!newComment.trim() || !isAuthenticated}
                  className="px-4 py-2"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </form>

        <div className="space-y-6">
          {sortedComments.map(comment => renderCommentThread(comment, 0, comment._id))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-12">
            <Icon name="MessageCircle" size={48} className="mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No comments yet</h3>
            <p className="text-text-secondary">Be the first to share your thoughts on this article.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
