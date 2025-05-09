import { db } from '@/database';
import { submissions } from '@/database/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    await db.insert(submissions).values({
      traineeId: body.traineeId,
      videoUrl: body.videoUrl,
      status: 'pending',
      // fileName and fileSize removed as they are not part of the schema
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submission creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}