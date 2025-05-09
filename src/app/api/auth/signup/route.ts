// app/api/auth/signup/route.ts
import { db } from '@/database';
import { users } from '@/database/schema';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();
    
    // Check for existing user
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    await db.insert(users).values({
      id: nanoid(),
      name,
      email,
      password: hashedPassword,
      role: role as "trainee" | "instructor",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "",
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}