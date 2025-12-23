import mongoose, { Schema, Document } from 'mongoose';

export interface IDish extends Document {
  name: string;
  cuisine: string;
  category: string;
  isVeg: boolean;
  price: number;
  imageUrl: string;
  description: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DishSchema = new Schema<IDish>(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    category: { type: String, required: true },
    isVeg: { type: Boolean, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Dish || mongoose.model<IDish>('Dish', DishSchema);

