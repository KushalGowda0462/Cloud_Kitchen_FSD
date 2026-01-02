export interface OrderItem {
  price: number;
  qty: number;
}

export interface OrderTotals {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  grandTotal: number;
}

export function calculateTotals(items: OrderItem[]): OrderTotals {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.05; // 5% tax
  const deliveryFee = subtotal > 500 ? 0 : 50; // Free delivery above 500
  const grandTotal = subtotal + tax + deliveryFee;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    deliveryFee: Math.round(deliveryFee * 100) / 100,
    grandTotal: Math.round(grandTotal * 100) / 100,
  };
}

