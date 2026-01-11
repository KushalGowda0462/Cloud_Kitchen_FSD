import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET() {
  let mongoConnected = false;
  try {
    await connectDB();
    mongoConnected = mongoose.connection.readyState === 1;
  } catch (e) {
    console.error('Health check DB error:', e);
  }

  return NextResponse.json({
    ok: mongoConnected,
    db: mongoConnected ? 'connected' : 'disconnected',
    mongoUriPresent: !!process.env.MONGODB_URI,
    jwtSecretPresent: !!process.env.JWT_SECRET,
    timestamp: new Date().toISOString()
  });
}
