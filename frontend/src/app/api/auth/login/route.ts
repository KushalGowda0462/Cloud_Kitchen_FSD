import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            user: { name: user.name, email: user.email, role: user.role, id: user._id }
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
    }
}
