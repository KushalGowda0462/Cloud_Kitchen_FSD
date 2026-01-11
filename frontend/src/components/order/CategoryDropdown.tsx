'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Canonical structure with keys
const cuisines = [
  {
    label: 'Indian',
    key: 'indian',
    categories: [
      { label: 'Starters', key: 'starters' },
      { label: 'Main-Course', key: 'main-course' },
    ],
  },
  {
    label: 'Chinese',
    key: 'chinese',
    categories: [
      { label: 'Starters', key: 'starters' },
      { label: 'Main-Course', key: 'main-course' },
    ],
  },
  {
    label: 'Italian',
    key: 'italian',
    categories: [
      { label: 'Starters', key: 'starters' },
      { label: 'Main-Course', key: 'main-course' },
    ],
  },
  {
    label: 'Mexican',
    key: 'mexican',
    categories: [
      { label: 'Starters', key: 'starters' },
      { label: 'Main-Course', key: 'main-course' },
    ],
  },
  {
    label: 'Arabian',
    key: 'arabian',
    categories: [
      { label: 'Starters', key: 'starters' },
      { label: 'Main-Course', key: 'main-course' },
    ],
  },
];

// Desserts is a standalone category (no cuisine)
const dessertsCategory = { label: 'Desserts', key: 'desserts' };

interface CategoryDropdownProps {
  selectedCuisineKey: string;
  selectedCategoryKey: string;
  onCuisineKeyChange: (cuisineKey: string) => void;
  onCategoryKeyChange: (categoryKey: string) => void;
}

export default function CategoryDropdown({
  selectedCuisineKey,
  selectedCategoryKey,
  onCuisineKeyChange,
  onCategoryKeyChange,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCuisineKey, setExpandedCuisineKey] = useState<string | null>(null);
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

  const handleCuisineClick = (cuisineKey: string) => {
    if (expandedCuisineKey === cuisineKey) {
      setExpandedCuisineKey(null);
    } else {
      setExpandedCuisineKey(cuisineKey);
    }
  };

  const handleCategorySelect = (cuisineKey: string, categoryKey: string) => {
    onCuisineKeyChange(cuisineKey);
    onCategoryKeyChange(categoryKey);
    setIsOpen(false);
    setExpandedCuisineKey(null);
  };

  const handleDessertsClick = () => {
    onCuisineKeyChange('all');
    onCategoryKeyChange('desserts');
    setIsOpen(false);
    setExpandedCuisineKey(null);
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
              <div key={cuisine.key}>
                <button
                  onClick={() => handleCuisineClick(cuisine.key)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-100 rounded-md transition-colors ${selectedCuisineKey === cuisine.key && selectedCategoryKey !== 'all'
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : ''
                    }`}
                >
                  <span className="font-medium">{cuisine.label}</span>
                  {expandedCuisineKey === cuisine.key ?
                    <ChevronDown className="w-4 h-4" /> :
                    <ChevronRight className="w-4 h-4" />
                  }
                </button>
                {expandedCuisineKey === cuisine.key && (
                  <div className="ml-4 mt-1 space-y-1">
                    {cuisine.categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => handleCategorySelect(cuisine.key, category.key)}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${selectedCuisineKey === cuisine.key && selectedCategoryKey === category.key
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Desserts as standalone option */}
            <div className="mt-2 pt-2 border-t border-gray-200">
              <button
                onClick={handleDessertsClick}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${selectedCategoryKey === dessertsCategory.key
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {dessertsCategory.label}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}