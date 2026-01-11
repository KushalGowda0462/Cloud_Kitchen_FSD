import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Dish from '@/lib/models/Dish';
import { getCuisineKey, getCategoryKey } from '@/lib/utils/categoryNormalizer';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cuisineParam = searchParams.get('cuisineKey') || 'all';
    const categoryParam = searchParams.get('categoryKey') || 'all';
    const vegMode = searchParams.get('vegMode') || 'all';

    await connectDB();

    // 1. Normalize Keys
    const cuisineKey = getCuisineKey(cuisineParam);
    const categoryKey = getCategoryKey(categoryParam);

    // 2. Build Query
    const query: any = {};
    if (cuisineKey !== 'all') query.cuisineKey = cuisineKey;
    if (categoryKey !== 'all') query.categoryKey = categoryKey;
    if (vegMode === 'veg') query.isVeg = true;
    if (vegMode === 'nonveg') query.isVeg = false;

    console.log(`[API] Fetching from DB: ${cuisineKey} / ${categoryKey}`);

    // 3. Simple Fetch
    const dishes = await Dish.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      ok: true,
      count: dishes.length,
      dishes
    });
  } catch (error: any) {
    console.error('[API] Menu Error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}
