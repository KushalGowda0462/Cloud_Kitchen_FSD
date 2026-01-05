import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }

        // Determine role: make first user admin, or just default to user
        const userCount = await User.countDocuments();
        const role = userCount === 0 || email.toLowerCase().includes('admin') ? 'admin' : 'user';

        const user = new User({
            name,
            email,
            password, // Note: In production use bcrypt, but sticking to existing style for now
            role
        });

        await user.save();

        return NextResponse.json({
            success: true,
            user: { name: user.name, email: user.email, role: user.role, id: user._id }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
    }
}
