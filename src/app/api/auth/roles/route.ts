import { auth } from "@/auth";
import { db } from "@/database/";
import { userProfiles } from "@/database/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm"

export async function GET(req: Request) {
  const session = await auth();
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");

  if (!session?.user?.id || !role) {
    return NextResponse.redirect("/signup?error=invalid_request");
  }
  
  // Update user profile with role
  await db.update(userProfiles)
    .set({ role })
    .where(eq(userProfiles.userId, session.user.id));

  return NextResponse.redirect("/dashboard");
}
