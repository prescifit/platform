// actions/profile.ts
"use server";

import { db } from "@/database";
import { userProfile } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  username: z.string().min(1),
  height: z.coerce.number().min(1),
  weight: z.coerce.number().min(1),
  age: z.coerce.number().min(1),
});

export async function updateProfile(
  userId: string,
  data: z.infer<typeof profileSchema>
) {
  try {
    // Validate input
    const validated = profileSchema.parse(data);

    // Upsert profile data
    await db
      .insert(userProfile)
      .values({
        userId,
        username: validated.username,
        height: String(validated.height),
        weight: String(validated.weight),
        age: validated.age,
      })
      .onConflictDoUpdate({
        target: userProfile.userId,
        set: {
          username: validated.username,
          height: String(validated.height),
          weight: String(validated.weight),
          age: validated.age,
        },
      });
    
    revalidatePath("/trainee/dashboard");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Failed to update profile" };
  }
}