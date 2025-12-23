import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  dishId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  qty: number;
  isVeg: boolean;
}

export interface IOrderAddress {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  pincode: string;
}

export interface IOrderTotals {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  grandTotal: number;
}

export type PaymentMethod = 'UPI' | 'CARD' | 'COD';
export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

export interface IOrder extends Document {
  items: IOrderItem[];
  totals: IOrderTotals;
  address: IOrderAddress;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  dishId: { type: Schema.Types.ObjectId, required: true, ref: 'Dish' },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  isVeg: { type: Boolean, required: true },
});

const OrderAddressSchema = new Schema<IOrderAddress>({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  line1: { type: String, required: true },
  line2: { type: String },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
});

const OrderTotalsSchema = new Schema<IOrderTotals>({
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    items: [OrderItemSchema],
    totals: OrderTotalsSchema,
    address: OrderAddressSchema,
    paymentMethod: {
      type: String,
      enum: ['UPI', 'CARD', 'COD'],
      required: true,
    },
    status: {
      type: String,
      enum: ['PLACED', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'],
      default: 'PLACED',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

