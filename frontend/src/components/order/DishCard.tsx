'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface DishCardProps {
  dish: {
    _id: string;
    name: string;
    price: number;
    isVeg: boolean;
    description: string;
    imageUrl: string;
  };
}

export default function DishCard({ dish }: DishCardProps) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        dishId: dish._id,
        name: dish.name,
        price: dish.price,
        qty: 1,
        isVeg: dish.isVeg,
        imageUrl: dish.imageUrl,
      },
    });
    toast.success(`${dish.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={dish.imageUrl || 'https://via.placeholder.com/300x200?text=Dish+Image'}
          alt={dish.name}
          fill
          className="object-cover"
          unoptimized
        />
        <div
          className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
            dish.isVeg ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              dish.isVeg ? 'bg-white' : 'bg-white'
            }`}
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{dish.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dish.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">₹{dish.price}</span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

