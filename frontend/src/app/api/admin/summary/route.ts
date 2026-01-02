import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import User from '@/lib/models/User';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Require admin authentication
    requireAdmin(request);

    // Total orders
    const totalOrders = await Order.countDocuments();

    // Total customers
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    // Orders per customer (aggregation)
    const ordersPerCustomer = await Order.aggregate([
      {
        $group: {
          _id: '$userId',
          ordersCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: { path: '$user', preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          email: { $ifNull: ['$user.email', 'Unknown'] },
          ordersCount: 1,
        },
      },
      {
        $sort: { ordersCount: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    // Top dishes (aggregation)
    const topDishes = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.name',
          totalQty: { $sum: '$items.qty' },
        },
      },
      {
        $sort: { totalQty: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          dishName: '$_id',
          totalQty: 1,
          _id: 0,
        },
      },
    ]);

    // Top cuisines (aggregation)
    const topCuisines = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.cuisine',
          totalQty: { $sum: '$items.qty' },
        },
      },
      {
        $sort: { totalQty: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          cuisine: '$_id',
          totalQty: 1,
          _id: 0,
        },
      },
    ]);

    return NextResponse.json({
      totalOrders,
      totalCustomers,
      ordersPerCustomer: ordersPerCustomer.map((item) => ({
        email: item.email,
        ordersCount: item.ordersCount,
      })),
      topDishes,
      topCuisines,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    console.error('Error fetching admin summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin summary' },
      { status: 500 }
    );
  }
}

