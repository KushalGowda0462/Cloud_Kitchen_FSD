import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import Dish from '@/lib/models/Dish';

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

    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    // Fetch dish details
    const dishIds = validatedData.items.map((item) => item.dishId);
    const dishes = await Dish.find({ _id: { $in: dishIds } });

    if (dishes.length !== validatedData.items.length) {
      return NextResponse.json(
        { error: 'Some dishes not found' },
        { status: 400 }
      );
    }

    // Build order items with dish details
    const orderItems = validatedData.items.map((item) => {
      const dish = dishes.find((d) => d._id.toString() === item.dishId);
      if (!dish) {
        throw new Error(`Dish ${item.dishId} not found`);
      }
      return {
        dishId: dish._id,
        name: dish.name,
        price: dish.price,
        qty: item.qty,
        isVeg: dish.isVeg,
      };
    });

    // Calculate totals
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const tax = subtotal * 0.05; // 5% tax
    const deliveryFee = subtotal > 500 ? 0 : 50; // Free delivery above 500
    const grandTotal = subtotal + tax + deliveryFee;

    // Create order
    const order = new Order({
      items: orderItems,
      totals: {
        subtotal,
        tax,
        deliveryFee,
        grandTotal,
      },
      address: validatedData.address,
      paymentMethod: validatedData.paymentMethod,
      status: 'PLACED',
    });

    await order.save();

    return NextResponse.json({ orderId: order._id.toString() });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

