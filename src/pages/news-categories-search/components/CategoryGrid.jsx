import React from 'react';

import Icon from '../../../components/AppIcon';

const CategoryGrid = ({ categories, onCategorySelect, selectedCategory }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category)}
          className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
            selectedCategory?.id === category.id
              ? 'border-accent bg-accent/10 shadow-lg'
              : 'border-border hover:border-accent/50 bg-background hover:bg-surface'
          }`}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              selectedCategory?.id === category.id
                ? 'bg-accent text-accent-foreground'
                : 'bg-surface text-text-secondary'
            }`}>
              <Icon name={category.icon} size={24} />
            </div>
            <div>
              <h3 className={`font-medium text-sm md:text-base ${
                selectedCategory?.id === category.id
                  ? 'text-accent' :'text-text-primary'
              }`}>
                {category.name}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                {category.articleCount.toLocaleString()} articles
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;
