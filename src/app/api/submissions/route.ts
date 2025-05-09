import { NextResponse } from "next/server";
import { db } from "@/database";
import { submission } from "@/database/schema";   // make sure it exports the table
import crypto from "crypto";

export async function POST(req: Request) {
  const { traineeId, videoUrl, fileName, fileSize } = await req.json();

  if (!traineeId || !videoUrl) {
    return NextResponse.json(
      { error: "traineeId and videoUrl are required" },
      { status: 400 },
    );
  }
  
  await db.insert(submission).values({
    id: crypto.randomUUID(),
    traineeId,
    videoUrl,
    status: "pending", 
  });

  /* Return 201 Created so the client knows it worked. */
  return NextResponse.json({ success: true }, { status: 201 });
}
