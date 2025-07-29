import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
const URL = import.meta.env.VITE_API_BASE_URL;
const CategoryChips = ({ onCategorySelect, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${URL}/category/get`);
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex space-x-1 sm:space-x-2 overflow-x-auto hide-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`flex items-center space-x-1 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-accent text-accent-foreground shadow-sm'
              : 'bg-surface text-text-secondary hover:bg-accent/10 hover:text-accent'
          }`}
        >
          <Icon
            name={category.icon}
            size={
              window.innerWidth >= 1024
                ? 16 // lg and up (laptop/desktop): normal size
                : 14 // mobile/tablet: smaller
            }
            className="sm:size-6 md:size-5 lg:size-4 xl:size-5"
          />
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
