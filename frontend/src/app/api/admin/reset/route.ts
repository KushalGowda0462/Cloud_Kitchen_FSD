import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Dish from '@/lib/models/Dish';

export async function POST() {
    try {
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
        }

        await connectDB();

        // Delete all dishes
        const result = await Dish.deleteMany({});

        return NextResponse.json({
            ok: true,
            message: 'All dishes deleted',
            deletedCount: result.deletedCount
        });
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}
