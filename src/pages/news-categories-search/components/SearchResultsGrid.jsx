import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SearchResultsGrid = ({ results, searchQuery, isLoading, onBookmark }) => {
  const highlightSearchTerm = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-accent/20 text-accent font-medium">
          {part}
        </mark>
      ) : part
    );
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="bg-surface rounded-lg p-4 animate-pulse">
            <div className="w-full h-48 bg-border rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-border rounded w-3/4"></div>
              <div className="h-3 bg-border rounded w-full"></div>
              <div className="h-3 bg-border rounded w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="h-3 bg-border rounded w-1/4"></div>
                <div className="h-3 bg-border rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No results found
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          {searchQuery 
            ? `No articles found for "${searchQuery}". Try adjusting your search terms or filters.`
            : "No articles match your current filters. Try broadening your search criteria."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          {results.length.toLocaleString()} results
          {searchQuery && (
            <span> for "<strong className="text-text-primary">{searchQuery}</strong>"</span>
          )}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((article) => (
          <article
            key={article.id}
            className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            {/* Article Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                  {article.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  onClick={() => onBookmark(article.id)}
                  className="p-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <Icon 
                    name={article.isBookmarked ? "Bookmark" : "BookmarkPlus"} 
                    size={16}
                    className={article.isBookmarked ? "text-accent" : "text-text-secondary"}
                  />
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Image
                  src={article.source.logo}
                  alt={article.source.name}
                  className="w-4 h-4 rounded"
                />
                <span className="text-xs text-text-secondary">
                  {article.source.name}
                </span>
                <span className="text-xs text-text-secondary">•</span>
                <span className="text-xs text-text-secondary">
                  {formatTimeAgo(article.publishedAt)}
                </span>
              </div>

              <Link
                to={`/article-reading-view?id=${article.id}`}
                className="block group"
              >
                <h3 className="font-medium text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-150">
                  {highlightSearchTerm(article.title, searchQuery)}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-3 mb-3">
                  {highlightSearchTerm(article.excerpt, searchQuery)}
                </p>
              </Link>

              {/* Article Meta */}
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{article.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MessageCircle" size={12} />
                    <span>{article.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Share2" size={12} />
                    <span>{article.shares}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" className="px-8">
          Load More Articles
        </Button>
      </div>
    </div>
  );
};

export default SearchResultsGrid;