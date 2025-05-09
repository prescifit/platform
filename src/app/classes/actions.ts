"use server";

import { db } from "@/database";
import { purchase } from "@/database/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

export async function buyClass(prev: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const traineeId = session.user.id;
  const classId = formData.get("classId") as string;

  /* Check if already owns */
  const exists = await db.query.purchase.findFirst({
    where: (p, { eq, and }) =>
      and(eq(p.traineeId, traineeId), eq(p.classId, classId)),
  });
  if (!exists) {
    await db.insert(purchase).values({
      id: crypto.randomUUID(),
      traineeId,
      classId,
      progress: "0",
    });
  }

  redirect("/trainee/dashboard"); // refresh shows in “Your Courses”
}