'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface CartItem {
  dishId: string;
  name: string;
  price: number;
  qty: number;
  isVeg: boolean;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QTY'; payload: { dishId: string; qty: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.dishId === action.payload.dishId
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.dishId === action.payload.dishId
              ? { ...item, qty: item.qty + action.payload.qty }
              : item
          ),
        };
      }
      return {
        items: [...state.items, action.payload],
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((item) => item.dishId !== action.payload),
      };
    case 'UPDATE_QTY':
      if (action.payload.qty <= 0) {
        return {
          items: state.items.filter((item) => item.dishId !== action.payload.dishId),
        };
      }
      return {
        items: state.items.map((item) =>
          item.dishId === action.payload.dishId
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { items: [] };
    case 'LOAD_CART':
      return { items: action.payload };
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const getTotalItems = () => {
    return state.items.reduce((sum, item) => sum + item.qty, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  return (
    <CartContext.Provider value={{ state, dispatch, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

