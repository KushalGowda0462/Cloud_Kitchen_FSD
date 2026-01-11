'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
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
  const [selectedCuisineKey, setSelectedCuisineKey] = useState('all');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('all');
  const [vegMode, setVegMode] = useState<'all' | 'veg' | 'nonveg'>('all');

  useEffect(() => {
    fetchDishes();
  }, [selectedCuisineKey, selectedCategoryKey, vegMode]);

  const fetchDishes = async () => {
    try {
      setLoading(true);

      // Build query params using keys
      const params = new URLSearchParams();
      if (selectedCuisineKey !== 'all') params.append('cuisineKey', selectedCuisineKey);
      if (selectedCategoryKey !== 'all') params.append('categoryKey', selectedCategoryKey);
      if (vegMode !== 'all') params.append('vegMode', vegMode);

      const queryString = params.toString();
      const url = `/api/menu${queryString ? `?${queryString}` : ''}`;

      console.log('[FRONTEND] Fetching from /api/menu:', url);

      const response = await fetch(url, { cache: 'no-store' });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        const errorMessage = data.error || data.message || 'Failed to fetch dishes';
        console.error('[FRONTEND] API error:', errorMessage, data);
        toast.error(errorMessage);
        setDishes([]);
        return;
      }

      console.log('[FRONTEND] API response:', {
        count: data.count,
        debug: data.debug,
        dishCount: data.dishes?.length || 0,
      });

      // Transform to match Dish interface
      const transformedDishes = (data.dishes || []).map((dish: any) => ({
        _id: dish.id,
        name: dish.name,
        cuisine: dish.cuisineKey || '',
        category: dish.categoryKey === 'main-course' ? 'Main Course' : dish.categoryKey === 'starters' ? 'Starters' : 'Desserts',
        isVeg: dish.isVeg,
        price: dish.price,
        imageUrl: dish.imageUrl,
        description: `${dish.name} - Delicious ${dish.cuisineKey || ''} ${dish.categoryKey}`.trim(),
      }));

      setDishes(transformedDishes);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch dishes';
      console.error('[FRONTEND] Error fetching dishes:', error);
      toast.error(errorMessage);
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
            selectedCuisineKey={selectedCuisineKey}
            selectedCategoryKey={selectedCategoryKey}
            onCuisineKeyChange={setSelectedCuisineKey}
            onCategoryKeyChange={setSelectedCategoryKey}
          />
          {(selectedCuisineKey !== 'all' || selectedCategoryKey !== 'all') && (
            <button
              onClick={() => {
                setSelectedCuisineKey('all');
                setSelectedCategoryKey('all');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          )}
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
              {selectedCuisineKey !== 'all' || selectedCategoryKey !== 'all' || vegMode !== 'all'
                ? 'Try adjusting your filters or use the Admin Seed to populate data.'
                : 'No dishes available. Ask admin to run /api/admin/seed.'}
            </p>
            {(selectedCuisineKey !== 'all' || selectedCategoryKey !== 'all' || vegMode !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCuisineKey('all');
                  setSelectedCategoryKey('all');
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