import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookmarkCard = ({
  bookmark,
  isSelected,
  onSelect,
  onRemove,
  onMoveToFolder,
  showSelection = false,
  folders,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) onRemove(bookmark._id);
    setIsMenuOpen(false);
  };

  const handleMoveToFolder = (e, folderId) => {
    e.preventDefault();
    e.stopPropagation();
    if (onMoveToFolder) onMoveToFolder(bookmark._id, folderId);
    setIsMenuOpen(false);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSelect) onSelect(bookmark._id);
  };

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'N/A';
    }
  };

  const getLanguageFlag = (language) => {
    const flags = {
      en: '🇺🇸',
      es: '🇪🇸',
      fr: '🇫🇷',
      de: '🇩🇪',
      it: '🇮🇹',
      pt: '🇵🇹',
      ru: '🇷🇺',
      zh: '🇨🇳',
      ja: '🇯🇵',
      ko: '🇰🇷',
      ar: '🇸🇦',
      hi: '🇮🇳',
      ta: '🇮🇳',
    };
    return flags[language] || '🌐';
  };

  return (
    <div
      className={`group relative bg-background border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-200 ${isSelected ? 'ring-2 ring-accent border-accent' : ''
        }`}
    >
      {showSelection && (
        <div className="absolute top-3 left-3 z-10">
          <button
            onClick={handleSelect}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 ${isSelected ? 'bg-accent border-accent text-accent-foreground' : 'border-border bg-background hover:border-accent'
              }`}
          >
            {isSelected && <Icon name="Check" size={12} />}
          </button>
        </div>
      )}

      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="ghost"
          onClick={handleMenuToggle}
          className="p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 backdrop-blur-sm"
        >
          <Icon name="MoreVertical" size={16} />
        </Button>

        {isMenuOpen && (
          <div className="absolute right-0 top-8 w-48 bg-background border border-border rounded-lg shadow-modal z-20">
            <div className="py-1">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={(e) => handleMoveToFolder(e, folder.id)}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-surface"
                >
                  <Icon name="Folder" size={16} />
                  <span>Move to {folder.name}</span>
                </button>
              ))}
              {folders.length > 0 && <div className="border-t border-border my-1"></div>}
              <button
                onClick={handleRemove}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-error hover:bg-error/5"
              >
                <Icon name="Trash2" size={16} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <Link to={`/article-reading-view?id=${bookmark._id}`} className="block">
        {/* <div className="aspect-video overflow-hidden bg-surface">
          <Image
            src={bookmark.media || '/default-news.jpg'}
            alt={bookmark.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div> */}
        <div className="aspect-video overflow-hidden bg-surface">
          {typeof bookmark.media === 'object' && /\.(mp4|webm|ogg)$/i.test(bookmark.media)
            ? (
              <video    
                controls
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              > 
                <source src={bookmark.media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={bookmark.media || '/default-news.jpg'}
                alt={bookmark.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
        </div>



        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm">{getLanguageFlag(bookmark.language || 'en')}</span>
              <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                {bookmark.category || 'General'}
              </span>
            </div>
            <span className="text-xs text-text-secondary">{formatDate(bookmark.savedDate || bookmark.createdAt)}</span>
          </div>

          <h3 className="text-sm font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-150">
            {bookmark.title || 'Untitled News'}
          </h3>

          <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={12} />
              <span>{bookmark.source || 'Unknown'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{bookmark.readingTime || 1} min</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookmarkCard;