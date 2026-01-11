import mongoose, { Schema, Document } from 'mongoose';

export interface IDish extends Document {
  source: string;
  sourceId: string;
  name: string;
  imageUrl: string;
  description?: string;
  price: number;
  cuisineKey: string;
  categoryKey: string;
  cacheKey: string;
  isVeg: boolean;
  ingredients?: string[];
  nutrition?: any;
  createdAt: Date;
  updatedAt: Date;
}

const DishSchema = new Schema<IDish>(
  {
    source: { type: String, default: 'manual' },
    sourceId: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },

    // Normalized keys
    cuisineKey: { type: String, required: true, index: true },
    categoryKey: { type: String, required: true, index: true },

    // UNIQUE COMPOSITE KEY
    cacheKey: { type: String, required: true, unique: true },
    isVeg: { type: Boolean, default: false },
    ingredients: [String],
    nutrition: Schema.Types.Mixed,
  },
  { timestamps: true }
);

// Ensure index is unique on cacheKey
DishSchema.index({ cacheKey: 1 }, { unique: true });
DishSchema.index({ cuisineKey: 1, categoryKey: 1, isVeg: 1 });

export default mongoose.models.Dish || mongoose.model<IDish>('Dish', DishSchema);
