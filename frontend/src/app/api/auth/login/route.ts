import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/utils/jwt';

export async function POST(request: NextRequest) {
  try {
    console.log('[AUTH_LOGIN] Starting login process...');
    await connectDB();
    console.log('[AUTH_LOGIN] MongoDB connected');

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      console.error('[AUTH_LOGIN] Missing email or password');
      return NextResponse.json(
        { ok: false, error: 'Missing email or password', code: 'MISSING_CREDENTIALS' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.error('[AUTH_LOGIN] User not found:', email);
      return NextResponse.json(
        { ok: false, error: 'Invalid credentials', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      );
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      console.error('[AUTH_LOGIN] Invalid password for:', email);
      return NextResponse.json(
        { ok: false, error: 'Invalid credentials', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      );
    }

    console.log('[AUTH_LOGIN] Login successful for:', email);

    // Generate JWT
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      ok: true,
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[AUTH_LOGIN] Login error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to login', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}
