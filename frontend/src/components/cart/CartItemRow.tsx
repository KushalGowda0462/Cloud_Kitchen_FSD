'use client';

import Image from 'next/image';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/context/CartContext';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { dispatch } = useCart();

  const handleIncrease = () => {
    dispatch({
      type: 'UPDATE_QTY',
      payload: { dishId: item.dishId, qty: item.qty + 1 },
    });
  };

  const handleDecrease = () => {
    if (item.qty > 1) {
      dispatch({
        type: 'UPDATE_QTY',
        payload: { dishId: item.dishId, qty: item.qty - 1 },
      });
    }
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.dishId });
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
        <Image
          src={item.imageUrl || 'https://via.placeholder.com/80x80?text=Dish'}
          alt={item.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600">₹{item.price} each</p>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              disabled={item.qty <= 1}
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium">{item.qty}</span>
            <button
              onClick={handleIncrease}
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="font-bold text-gray-900">₹{item.price * item.qty}</span>
        </div>
      </div>
    </div>
  );
}

