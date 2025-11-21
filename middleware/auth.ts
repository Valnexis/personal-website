import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function authMiddleware<TContext extends Record<string, unknown>>(
  handler: (request: Request, context: TContext) => Promise<Response>,
  requireAdmin: boolean = false
) {
  return async (request: Request, context?: TContext) => {
    try {
      const authHeader = request.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Unauthorized - No token provided' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7);
      const payload = verifyToken(token);

      if (!payload) {
        return NextResponse.json(
          { error: 'Unauthorized - Invalid token' },
          { status: 401 }
        );
      }

      if (requireAdmin && payload.role !== 'admin') {
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        );
      }

      // Pass user info to the handler
      return handler(request, { ...context, user: payload } as unknown as TContext);
    } catch {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}
