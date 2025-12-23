'use client';

import { useState, useEffect } from 'react';
import CategoryDropdown from '@/components/order/CategoryDropdown';
import VegToggle from '@/components/order/VegToggle';
import DishCard from '@/components/order/DishCard';

interface Dish {
  _id: string;
  name: string;
  cuisine: string;
  category: string;
  isVeg: boolean;
  price: number;
  imageUrl: string;
  description: string;
}

export default function OrderPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [vegMode, setVegMode] = useState<'all' | 'veg' | 'nonveg'>('all');

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dishes');
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering for real-time updates
  const filteredDishes = dishes.filter((dish) => {
    if (selectedCuisine !== 'all' && dish.cuisine !== selectedCuisine) {
      return false;
    }
    if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
      return false;
    }
    if (vegMode === 'veg' && !dish.isVeg) {
      return false;
    }
    if (vegMode === 'nonveg' && dish.isVeg) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <CategoryDropdown
            selectedCuisine={selectedCuisine}
            selectedCategory={selectedCategory}
            onCuisineChange={setSelectedCuisine}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <div className="flex items-center gap-4">
          <VegToggle vegMode={vegMode} onToggle={setVegMode} />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'} found
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredDishes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No dishes found matching your filters.</p>
          <button
            onClick={() => {
              setSelectedCuisine('all');
              setSelectedCategory('all');
              setVegMode('all');
            }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
            <DishCard key={dish._id} dish={dish} />
          ))}
        </div>
      )}
    </div>
  );
}

