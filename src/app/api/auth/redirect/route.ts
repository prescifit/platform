import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.redirect("/");
  }

  const redirectUrl = session.user.role === "instructor" 
    ? "/instructor/dashboard" 
    : "/trainee/dashboard";

  return NextResponse.redirect(redirectUrl);
}
