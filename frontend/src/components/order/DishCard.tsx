'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Plus, Minus } from 'lucide-react';

interface DishCardProps {
  dish: {
    _id: string;
    name: string;
    cuisine: string;
    category: string;
    price: number;
    isVeg: boolean;
    description: string;
    imageUrl: string;
  };
}

export default function DishCard({ dish }: DishCardProps) {
  const { dispatch } = useCart();
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        dishId: dish._id,
        name: dish.name,
        price: dish.price,
        qty: quantity,
        isVeg: dish.isVeg,
        imageUrl: dish.imageUrl,
      },
    });
    toast.success(`${dish.name} added to cart!`);
    setQuantity(1); // Reset quantity after adding
  };

  const incrementQty = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.min(prev + 1, 10));
  };

  const decrementQty = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden group">
      {/* Image Section */}
      <div className="relative aspect-[4/3] bg-slate-100 rounded-t-xl overflow-hidden">
        {!imageError && dish.imageUrl ? (
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
            <div className="text-center">
              <div className="text-4xl mb-2">🍽️</div>
              <p className="text-xs text-gray-500">Image not available</p>
            </div>
          </div>
        )}
        
        {/* Veg/Non-Veg Badge */}
        <div className="absolute top-3 right-3">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 ${
              dish.isVeg
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                dish.isVeg ? 'bg-white' : 'bg-white'
              }`}
            />
            <span>{dish.isVeg ? 'Veg' : 'Non-Veg'}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Dish Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
          {dish.name}
        </h3>

        {/* Cuisine & Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {dish.cuisine}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {dish.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          {dish.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{dish.price}</span>
          </div>
          
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2">
            <button
              onClick={decrementQty}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>
            <span className="w-8 text-center font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={incrementQty}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              disabled={quantity >= 10}
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-xl hover:from-orange-700 hover:to-red-600 transition-all font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
