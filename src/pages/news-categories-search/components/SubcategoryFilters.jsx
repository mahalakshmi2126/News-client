import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubcategoryFilters = ({ 
  category, 
  selectedSubcategories, 
  onSubcategoryToggle, 
  sortBy, 
  onSortChange,
  onClose 
}) => {
  if (!category) return null;

  const subcategories = {
    politics: [
      { id: 'elections', name: 'Elections', count: 1234 },
      { id: 'policy', name: 'Policy', count: 892 },
      { id: 'international', name: 'International', count: 756 },
      { id: 'local', name: 'Local Politics', count: 543 },
      { id: 'debates', name: 'Debates', count: 321 }
    ],
    technology: [
      { id: 'ai', name: 'Artificial Intelligence', count: 2341 },
      { id: 'mobile', name: 'Mobile Tech', count: 1876 },
      { id: 'software', name: 'Software', count: 1543 },
      { id: 'hardware', name: 'Hardware', count: 987 },
      { id: 'startups', name: 'Startups', count: 765 },
      { id: 'cybersecurity', name: 'Cybersecurity', count: 654 }
    ],
    sports: [
      { id: 'football', name: 'Football', count: 3456 },
      { id: 'basketball', name: 'Basketball', count: 2134 },
      { id: 'soccer', name: 'Soccer', count: 1987 },
      { id: 'baseball', name: 'Baseball', count: 1456 },
      { id: 'olympics', name: 'Olympics', count: 876 },
      { id: 'tennis', name: 'Tennis', count: 654 }
    ],
    business: [
      { id: 'markets', name: 'Stock Markets', count: 2876 },
      { id: 'economy', name: 'Economy', count: 2134 },
      { id: 'companies', name: 'Companies', count: 1765 },
      { id: 'finance', name: 'Finance', count: 1432 },
      { id: 'crypto', name: 'Cryptocurrency', count: 987 },
      { id: 'real-estate', name: 'Real Estate', count: 765 }
    ],
    entertainment: [
      { id: 'movies', name: 'Movies', count: 2345 },
      { id: 'music', name: 'Music', count: 1876 },
      { id: 'tv', name: 'Television', count: 1543 },
      { id: 'celebrities', name: 'Celebrities', count: 1234 },
      { id: 'gaming', name: 'Gaming', count: 987 },
      { id: 'books', name: 'Books', count: 654 }
    ],
    health: [
      { id: 'medical', name: 'Medical Research', count: 1876 },
      { id: 'fitness', name: 'Fitness', count: 1432 },
      { id: 'nutrition', name: 'Nutrition', count: 1234 },
      { id: 'mental-health', name: 'Mental Health', count: 987 },
      { id: 'public-health', name: 'Public Health', count: 765 },
      { id: 'wellness', name: 'Wellness', count: 543 }
    ],
    science: [
      { id: 'space', name: 'Space & Astronomy', count: 1654 },
      { id: 'climate', name: 'Climate Science', count: 1432 },
      { id: 'biology', name: 'Biology', count: 1234 },
      { id: 'physics', name: 'Physics', count: 987 },
      { id: 'chemistry', name: 'Chemistry', count: 765 },
      { id: 'environment', name: 'Environment', count: 654 }
    ],
    world: [
      { id: 'asia', name: 'Asia', count: 2876 },
      { id: 'europe', name: 'Europe', count: 2345 },
      { id: 'americas', name: 'Americas', count: 1987 },
      { id: 'africa', name: 'Africa', count: 1543 },
      { id: 'middle-east', name: 'Middle East', count: 1234 },
      { id: 'oceania', name: 'Oceania', count: 654 }
    ]
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'shared', label: 'Most Shared', icon: 'Share2' },
    { value: 'commented', label: 'Most Discussed', icon: 'MessageCircle' }
  ];

  const categorySubcategories = subcategories[category.id] || [];

  return (
    <div className="bg-background border border-border rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name={category.icon} size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              {category.name}
            </h2>
            <p className="text-sm text-text-secondary">
              {category.articleCount.toLocaleString()} articles available
            </p>
          </div>
        </div>
        <Button variant="ghost" onClick={onClose} className="p-2">
          <Icon name="X" size={20} />
        </Button>
      </div>

      {/* Subcategories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Subcategories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {categorySubcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              onClick={() => onSubcategoryToggle(subcategory.id)}
              className={`p-3 text-left rounded-lg border transition-all duration-150 hover:scale-105 ${
                selectedSubcategories.includes(subcategory.id)
                  ? 'border-accent bg-accent/10 text-accent' :'border-border bg-surface text-text-secondary hover:border-accent/50'
              }`}
            >
              <div className="text-sm font-medium">{subcategory.name}</div>
              <div className="text-xs opacity-75">
                {subcategory.count.toLocaleString()} articles
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Sort Articles By
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors duration-150 ${
                sortBy === option.value
                  ? 'border-accent bg-accent/10 text-accent' :'border-border bg-surface text-text-secondary hover:border-accent/50'
              }`}
            >
              <Icon name={option.icon} size={16} />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryFilters;