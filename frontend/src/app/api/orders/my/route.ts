import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import { requireAuth } from '@/lib/auth';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Require authentication
    const authUser = requireAuth(request);

    // Fetch orders for the authenticated user
    const orders = await Order.find({
      userId: new mongoose.Types.ObjectId(authUser.userId),
    })
      .sort({ createdAt: -1 })
      .populate('userId', 'email');

    return NextResponse.json(orders);
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    console.error('Error fetching user orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

