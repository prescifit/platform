// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/database';
import { user } from '@/database/schema';
import bcrypt from 'bcryptjs';
import { sql } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    // check database connection
    try {
      await db.execute(sql`SELECT 1`);
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database unavailable' },
        { status: 503 }
      );
    }
    // Parse request body
    const { name, email, password, role } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.email, email.trim().toLowerCase()),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const [newUser] = await db.insert(user).values({
      name,
      email,
      hashedPassword,
      role: role as 'trainee' | 'instructor',
      emailVerified: true
    }).returning();

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Full error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      raw: error
    });
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : undefined },
      { status: 500 }
    );
  }
}
