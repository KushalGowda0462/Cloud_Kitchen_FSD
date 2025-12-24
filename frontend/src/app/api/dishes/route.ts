import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Dish from '@/lib/models/Dish';

interface DishType {
  name: string;
  cuisine: string;
  category: string;
  isVeg: boolean;
  isAvailable: boolean;
}

function mapCategory(category: string) {
  if (category.toLowerCase() === 'main') return 'Main Course';
  if (category.toLowerCase() === 'starters') return 'Starters';
  return category;
}

function getDishImage(dish: DishType) {
  const cuisine = dish.cuisine;
  const vegType = dish.isVeg ? 'Veg' : 'Non-Veg';
  const category = mapCategory(dish.category);

  return `/Photos%20%26%20Videos/${cuisine}/${vegType}/${category}/${dish.name}.jpg`;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const cuisine = searchParams.get('cuisine');
    const category = searchParams.get('category');
    const vegMode = searchParams.get('vegMode') || 'all';

    const query: Record<string, unknown> = { isAvailable: true };

    if (cuisine && cuisine !== 'all') query.cuisine = cuisine;
    if (category && category !== 'all') query.category = category;

    if (vegMode === 'veg') query.isVeg = true;
    else if (vegMode === 'nonveg') query.isVeg = false;

    const dishes = await Dish.find(query).sort({ createdAt: -1 });

    const result = dishes.map((dish) => ({
      ...dish.toObject(),
      image: getDishImage(dish)
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dishes' },
      { status: 500 }
    );
  }
}
