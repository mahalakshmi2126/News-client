import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchSuggestions = ({ 
  recentSearches, 
  trendingQueries, 
  savedSearches, 
  onSuggestionClick,
  onRemoveRecent,
  onRemoveSaved 
}) => {
  return (
    <div className="space-y-6">
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text-primary">
              Recent Searches
            </h3>
            <Button
              variant="ghost"
              className="text-xs text-text-secondary hover:text-text-primary px-2 py-1"
              onClick={() => {
                recentSearches.forEach((_, index) => onRemoveRecent(index));
              }}
            >
              Clear all
            </Button>
          </div>
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-surface rounded-lg transition-colors duration-150 group"
              >
                <button
                  onClick={() => onSuggestionClick(search.query)}
                  className="flex items-center space-x-3 flex-1 text-left"
                >
                  <Icon name="Clock" size={16} className="text-text-secondary" />
                  <span className="text-text-primary">{search.query}</span>
                  <span className="text-xs text-text-secondary">
                    {search.resultsCount} results
                  </span>
                </button>
                <Button
                  variant="ghost"
                  onClick={() => onRemoveRecent(index)}
                  className="p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                >
                  <Icon name="X" size={14} className="text-text-secondary hover:text-error" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending Queries */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Trending Now
        </h3>
        <div className="space-y-2">
          {trendingQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(query.text)}
              className="flex items-center justify-between w-full p-3 hover:bg-surface rounded-lg transition-colors duration-150 text-left group"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-6 h-6">
                  <span className={`text-xs font-bold ${
                    index < 3 ? 'text-accent' : 'text-text-secondary'
                  }`}>
                    #{index + 1}
                  </span>
                </div>
                <span className="text-text-primary group-hover:text-accent transition-colors duration-150">
                  {query.text}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={14} className="text-success" />
                <span className="text-xs text-text-secondary">
                  {query.searchCount.toLocaleString()}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">
            Saved Searches
          </h3>
          <div className="space-y-2">
            {savedSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-surface rounded-lg transition-colors duration-150 group"
              >
                <button
                  onClick={() => onSuggestionClick(search.query)}
                  className="flex items-center space-x-3 flex-1 text-left"
                >
                  <Icon name="Bookmark" size={16} className="text-accent" />
                  <div>
                    <div className="text-text-primary">{search.name}</div>
                    <div className="text-xs text-text-secondary">
                      {search.query} • {search.filtersCount} filters
                    </div>
                  </div>
                </button>
                <Button
                  variant="ghost"
                  onClick={() => onRemoveSaved(index)}
                  className="p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                >
                  <Icon name="Trash2" size={14} className="text-text-secondary hover:text-error" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Topics */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Popular Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Breaking News', 'Technology', 'Politics', 'Sports', 'Business',
            'Health', 'Science', 'Entertainment', 'World News', 'Climate'
          ].map((topic, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(topic)}
              className="px-3 py-2 bg-surface text-text-primary text-sm rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;