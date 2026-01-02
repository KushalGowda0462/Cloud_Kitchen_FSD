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
  }, [selectedCuisine, selectedCategory, vegMode]);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      
      // Build query params
      const params = new URLSearchParams();
      if (selectedCuisine !== 'all') params.append('cuisine', selectedCuisine);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (vegMode !== 'all') params.append('vegMode', vegMode);
      
      const queryString = params.toString();
      const url = `/api/dishes${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url, { cache: 'no-store' });
      
      if (!response.ok) {
        throw new Error('Failed to fetch dishes');
      }
      
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
      setDishes([]);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {loading ? 'Loading...' : `${dishes.length} ${dishes.length === 1 ? 'dish' : 'dishes'} found`}
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gradient-to-b from-white to-slate-50 rounded-2xl border border-black/5 shadow-sm overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-gray-200 rounded w-20" />
                  <div className="h-9 bg-gray-200 rounded w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : dishes.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No dishes found</h3>
            <p className="text-gray-600 mb-4">
              {selectedCuisine !== 'all' || selectedCategory !== 'all' || vegMode !== 'all'
                ? 'Try adjusting your filters to see more dishes.'
                : 'No dishes available at the moment. Please check back later.'}
            </p>
            {(selectedCuisine !== 'all' || selectedCategory !== 'all' || vegMode !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCuisine('all');
                  setSelectedCategory('all');
                  setVegMode('all');
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <DishCard key={dish._id} dish={dish} />
          ))}
        </div>
      )}
    </div>
  );
}