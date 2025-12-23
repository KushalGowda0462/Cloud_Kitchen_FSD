'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const cuisines = [
  {
    name: 'Indian',
    categories: ['Starters', 'Main Course'],
  },
  {
    name: 'Chinese',
    categories: ['Starters', 'Main Course'],
  },
  {
    name: 'Italian',
    categories: ['Starters', 'Main Course'],
  },
  {
    name: 'Mexican',
    categories: ['Starters', 'Main Course'],
  },
  {
    name: 'Arabian',
    categories: ['Starters', 'Main Course'],
  },
  {
    name: 'Desserts',
    categories: ['Starters', 'Main Course'],
  },
];

interface CategoryDropdownProps {
  selectedCuisine: string;
  selectedCategory: string;
  onCuisineChange: (cuisine: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function CategoryDropdown({
  selectedCuisine,
  selectedCategory,
  onCuisineChange,
  onCategoryChange,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCuisine, setExpandedCuisine] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleCuisineClick = (cuisine: string) => {
    // Desserts has no subcategories, select it directly
    if (cuisine === 'Desserts') {
      onCuisineChange(cuisine);
      onCategoryChange('all');
      setIsOpen(false);
      setExpandedCuisine(null);
      return;
    }
    
    if (expandedCuisine === cuisine) {
      setExpandedCuisine(null);
    } else {
      setExpandedCuisine(cuisine);
    }
  };

  const handleCategorySelect = (cuisine: string, category: string) => {
    onCuisineChange(cuisine);
    onCategoryChange(category);
    setIsOpen(false);
    setExpandedCuisine(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Categories
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {cuisines.map((cuisine) => (
              <div key={cuisine.name}>
                <button
                  onClick={() => handleCuisineClick(cuisine.name)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-100 rounded-md transition-colors ${
                    selectedCuisine === cuisine.name && (cuisine.name === 'Desserts' || selectedCategory !== 'all')
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : ''
                  }`}
                >
                  <span className="font-medium">{cuisine.name}</span>
                  {cuisine.name !== 'Desserts' && (
                    expandedCuisine === cuisine.name ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {expandedCuisine === cuisine.name && cuisine.name !== 'Desserts' && (
                  <div className="ml-4 mt-1 space-y-1">
                    {cuisine.categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(cuisine.name, category)}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                          selectedCuisine === cuisine.name && selectedCategory === category
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

