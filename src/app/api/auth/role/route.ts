// app/api/auth/role/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/database";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const session = await auth();
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  if (!session?.user || !role) {
    return NextResponse.redirect("/signin");
  }

  // Validate that role is one of the allowed values
  if (role !== "instructor" && role !== "trainee") {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  await db.update(users)
    .set({ role: role as "instructor" | "trainee" })
    .where(eq(users.id, session.user.id!));

  return NextResponse.redirect(`/${role}/dashboard`);
}