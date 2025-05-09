import { db } from '@/database';
import { users } from '@/database/schema';

export async function GET() {
  try {
    const result = await db.select().from(users).limit(1);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return new Response(JSON.stringify({ error: 'Connection failed' }), {
      status: 500
    });
  }
}