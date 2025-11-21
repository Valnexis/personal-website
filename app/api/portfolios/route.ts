import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// GET all active user portfolios (public endpoint)
export async function GET() {
  try {
    await connectDB();

    const users = await User.find({ 
      profileStatus: 'active',
      role: 'user'
    }).select('name bio skills portfolioItems profileImage');

    return NextResponse.json({
      portfolios: users,
      count: users.length,
    });
  } catch (error) {
    console.error('Get portfolios error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolios' },
      { status: 500 }
    );
  }
}
