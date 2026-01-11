import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { z } from 'zod';

// Input validation schema
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // 1. Parse Input
    const body = await req.json();
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid input data', details: result.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // 2. Connect DB (Critical Step)
    await connectDB();

    // 3. Check for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { ok: false, error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // 4. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create User (using passwordHash field as per User model)
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash: hashedPassword,
      role: 'customer',
    });

    // 6. Return Success (Avoid sending back password)
    return NextResponse.json({
      ok: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('[AUTH] Signup Error:', error);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000 || error.message?.includes('E11000')) {
      return NextResponse.json(
        { ok: false, error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { ok: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
