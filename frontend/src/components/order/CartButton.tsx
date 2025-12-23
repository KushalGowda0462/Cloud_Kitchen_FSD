'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center p-2 text-gray-700 hover:text-blue-600 transition-colors"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  );
}

