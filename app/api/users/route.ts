import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { authMiddleware } from '@/middleware/auth';

// GET all users (admin only)
async function getUsers(request: Request, context: any) {
  try {
    await connectDB();

    const users = await User.find().select('-password');

    return NextResponse.json({
      users,
      count: users.length,
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST create new user (admin only)
async function createUser(request: Request, context: any) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password, role = 'user', bio, skills, profileImage, profileStatus = 'active' } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role,
      bio,
      skills,
      profileImage,
      profileStatus,
    });

    // Return user without password
    const userResponse = await User.findById(user._id).select('-password');

    return NextResponse.json({
      message: 'User created successfully',
      user: userResponse,
    }, { status: 201 });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(getUsers, true);
export const POST = authMiddleware(createUser, true);
