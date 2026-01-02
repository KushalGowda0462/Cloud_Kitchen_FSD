import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import Dish from '@/lib/models/Dish';
import { requireAuth } from '@/lib/auth';
import { calculateTotals } from '@/lib/utils/totals';
import mongoose from 'mongoose';

const orderSchema = z.object({
  items: z.array(
    z.object({
      dishId: z.string(),
      qty: z.number().min(1),
    })
  ),
  address: z.object({
    fullName: z.string().min(1),
    phone: z.string().min(1),
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    pincode: z.string().min(1),
  }),
  paymentMethod: z.enum(['UPI', 'CARD', 'COD']),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Require authentication
    const authUser = requireAuth(request);

    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    // Fetch dish details
    const dishIds = validatedData.items.map((id) => new mongoose.Types.ObjectId(id.dishId));
    const dishes = await Dish.find({ _id: { $in: dishIds }, isAvailable: true });

    if (dishes.length !== validatedData.items.length) {
      return NextResponse.json(
        { error: 'Some dishes not found or unavailable' },
        { status: 400 }
      );
    }

    // Build order items with full dish details (including cuisine/category for analytics)
    const orderItems = validatedData.items.map((item) => {
      const dish = dishes.find((d) => d._id.toString() === item.dishId);
      if (!dish) {
        throw new Error(`Dish ${item.dishId} not found`);
      }
      return {
        dishId: dish._id,
        name: dish.name,
        cuisine: dish.cuisine,
        category: dish.category,
        price: dish.price,
        qty: item.qty,
        isVeg: dish.isVeg,
      };
    });

    // Calculate totals
    const totals = calculateTotals(orderItems);

    // Create order
    const order = new Order({
      userId: new mongoose.Types.ObjectId(authUser.userId),
      items: orderItems,
      totals,
      address: validatedData.address,
      paymentMethod: validatedData.paymentMethod,
      status: 'PLACED',
    });

    await order.save();

    return NextResponse.json({ orderId: order._id.toString() });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

