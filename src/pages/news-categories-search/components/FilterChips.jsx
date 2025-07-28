import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];
    
    if (activeFilters.dateRange && activeFilters.dateRange !== 'all') {
      chips.push({
        key: 'dateRange',
        label: `Date: ${activeFilters.dateRange}`,
        value: activeFilters.dateRange
      });
    }
    
    if (activeFilters.contentType && activeFilters.contentType !== 'all') {
      chips.push({
        key: 'contentType',
        label: `Type: ${activeFilters.contentType}`,
        value: activeFilters.contentType
      });
    }
    
    if (activeFilters.language && activeFilters.language !== 'all') {
      chips.push({
        key: 'language',
        label: `Language: ${activeFilters.language}`,
        value: activeFilters.language
      });
    }
    
    if (activeFilters.credibility && activeFilters.credibility !== 'all') {
      chips.push({
        key: 'credibility',
        label: `Credibility: ${activeFilters.credibility}`,
        value: activeFilters.credibility
      });
    }
    
    if (activeFilters.sortBy && activeFilters.sortBy !== 'relevance') {
      chips.push({
        key: 'sortBy',
        label: `Sort: ${activeFilters.sortBy}`,
        value: activeFilters.sortBy
      });
    }
    
    if (activeFilters.category) {
      chips.push({
        key: 'category',
        label: `Category: ${activeFilters.category}`,
        value: activeFilters.category
      });
    }
    
    return chips;
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-surface rounded-lg">
      <span className="text-sm font-medium text-text-secondary mr-2">
        Active filters:
      </span>
      
      {chips.map((chip) => (
        <div
          key={chip.key}
          className="flex items-center space-x-2 px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20"
        >
          <span>{chip.label}</span>
          <Button
            variant="ghost"
            onClick={() => onRemoveFilter(chip.key)}
            className="p-0 h-auto hover:bg-transparent"
          >
            <Icon name="X" size={14} className="hover:text-error transition-colors duration-150" />
          </Button>
        </div>
      ))}
      
      {chips.length > 1 && (
        <Button
          variant="ghost"
          onClick={onClearAll}
          className="text-xs text-text-secondary hover:text-error px-2 py-1"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterChips;
