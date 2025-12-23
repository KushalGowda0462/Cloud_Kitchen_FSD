import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Dish from '@/lib/models/Dish';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const cuisine = searchParams.get('cuisine');
    const category = searchParams.get('category');
    const vegMode = searchParams.get('vegMode') || 'all';

    const query: any = { isAvailable: true };

    if (cuisine && cuisine !== 'all') {
      query.cuisine = cuisine;
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (vegMode === 'veg') {
      query.isVeg = true;
    } else if (vegMode === 'nonveg') {
      query.isVeg = false;
    }

    const dishes = await Dish.find(query).sort({ createdAt: -1 });

    return NextResponse.json(dishes);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dishes' },
      { status: 500 }
    );
  }
}

