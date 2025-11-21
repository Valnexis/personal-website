import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { authMiddleware } from '@/middleware/auth';

// GET single user (admin only)
async function getUser(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const params = await context.params;
    const id = params.id;

    const user = await User.findById(id).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT update user (admin only)
async function updateUser(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const params = await context.params;
    const id = params.id;
    const body = await request.json();

    // Don't allow password update through this endpoint
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...updateData } = body;

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE user (admin only)
async function deleteUser(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const params = await context.params;
    const id = params.id;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(getUser, true);
export const PUT = authMiddleware(updateUser, true);
export const DELETE = authMiddleware(deleteUser, true);
